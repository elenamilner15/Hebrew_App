// client\src\components\N_Vocabulary.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInfinitive, fetchInfinitiveShuffled, updateUserProgress } from '../redux/actions/verbsActions';
import { ItemTypes } from './constants/ItemTypes.js'
import '../styles/N_Vocabulary.css';
import MenuBar from './MenuBar2.js';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';
import { calculateGroupSize } from '../utils/utils';
import { useDrag, useDrop } from 'react-dnd';



const N_Vocabulary = () => {
    const { level, category } = useParams();
    const dispatch = useDispatch();
    const [verbs, setVerbs] = useState([]);
    const [testVerbs, setTestVerbs] = useState([]);
    const [guessVerbs, setGuessVerbs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [verbsFetched, setVerbsFetched] = useState(false);

    const [testTaken, setTestTaken] = useState(false);
    const [droppedVerbs, setDroppedVerbs] = useState([]);
    const [isCheckComplete, setIsCheckComplete] = useState(false);


    useEffect(() => {
        const fetchVerbs = async () => {
            try {
                const fetchedVerbs = await dispatch(fetchInfinitive(level, category));
                setVerbs(fetchedVerbs);
                setVerbsFetched(true);
                console.log('Fetched verbs:', fetchedVerbs);
            } catch (error) {
                console.error('Error fetching verbs:', error);
            }
        };

        fetchVerbs();
    }, [dispatch, level, category, currentIndex]);

    ///////////////////////////////////////////
    useEffect(() => {

        setTestVerbs([]);
        setGuessVerbs([]);
        setDroppedVerbs([]);
        setIsCheckComplete(false);
        setTestTaken(false);
    }, [currentIndex]);


    //////////////////////////////////////
    const groupSize = calculateGroupSize(verbs.length);

    const displayVerbs = () => {
        const startIndex = currentIndex * groupSize;
        const endIndex = startIndex + groupSize;
        return verbs.slice(startIndex, endIndex);
    };




    const handleTest = () => {
        // const shuffledVerbs = shuffleVerbs(displayVerbs());
        // const shuffledGuess = shuffleVerbs(displayVerbs());

        const currentDisplayVerbs = displayVerbs();
        const shuffledVerbs = shuffleVerbs([...currentDisplayVerbs]);
        const shuffledGuess = shuffleVerbs([...currentDisplayVerbs]);


        // Display the shuffled verbs
        setTestVerbs(shuffledVerbs);
        setGuessVerbs(shuffledGuess);
        setDroppedVerbs(Array(shuffledVerbs.length).fill(null)); // Reset droppedVerbs for the new test
        setCellOccupancy(Array(shuffledVerbs.length).fill(false)); // Reset cell occupancy

        // Button test clicked
        setIsCheckComplete(false);
        setTestTaken(true);
    };


    const shuffleVerbs = (array) => {
        const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
        return shuffledArray;
    };


    const DraggableVerb = ({ verb, index }) => {
        const [{ isDragging }, drag] = useDrag({
            type: ItemTypes.VERB,
            item: { id: verb.id }, // Pass the verb ID as part of the item object
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        // Log the ID of the dragged verb
        // console.log('Picked Verb ID:', verb.id);

        return (
            <div ref={drag} className="draggable" style={{ opacity: isDragging ? 0.5 : 1 }}>
                {verb.original}
            </div>
        );
    };

    const DroppableCell = ({ index, onDrop, droppedVerb }) => {
        const [{ isOver }, drop] = useDrop({
            accept: ItemTypes.VERB,
            drop: (item) => onDrop(item.id, index), // Pass the dropped item ID and cell index to the onDrop handler
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        });

        return (
            <td ref={drop} className="droppable" style={{ backgroundColor: isOver ? 'lightgray' : 'transparent' }}>
                {droppedVerb && droppedVerb.original}
            </td>
        );
    };


    // Define a state variable to track the occupancy of each droppable cell
    const [cellOccupancy, setCellOccupancy] = useState(Array(testVerbs.length).fill(false));


    const handleDrop = (verbId, cellIndex) => {

        // const guessVerbID = guessVerbs[cellIndex].id;
        const answerId = testVerbs[cellIndex].id;
        const droppedVerb = guessVerbs.find((verb) => verb.id === verbId); // verb object

        console.log('Picked Verb ID:', verbId);
        console.log('Destination Cell Index:', cellIndex);
        console.log('List of Guess Verbs before drop:', guessVerbs);


        const droppedVerbIndex = guessVerbs.findIndex((verb) => verb.id === verbId)
        console.log("droppedVerbIndex", droppedVerbIndex)






        // Update cellOccupancy to mark the cell as occupied
        setCellOccupancy(prevOccupancy => {
            const updatedOccupancy = [...prevOccupancy];
            updatedOccupancy[cellIndex] = true;
            console.log('setCellOccupancy', cellIndex)
            return updatedOccupancy;
        });

        // Check if the cell is occupied based on cellOccupancy
        if (cellOccupancy[cellIndex]) {
            console.log('Cell is occupied. Cell Index:', cellIndex);
            console.log('Verb not dropped.');
            return;
        } else {
            setDroppedVerbs(prevDroppedVerbs => {
                const newDroppedVerbs = [...prevDroppedVerbs];
                newDroppedVerbs[cellIndex] = droppedVerb; // Store the verb object at the correct cell index
                return newDroppedVerbs;
            });

        }

        // Check if the verbId is already dropped
        if (droppedVerbs.includes(verbId)) {
            console.log('Verb is already dropped. Verb not dropped again.');
            return;
        }


        // Update guessVerbs        
        const updatedGuessVerbs = guessVerbs.filter((_, index) => {
            return index !== droppedVerbIndex;
        });
        console.log('pickedVerbIndex', droppedVerbIndex);
        setGuessVerbs(updatedGuessVerbs);

        // Update droppedVerbs array
        setDroppedVerbs(prevDroppedVerbs => [...prevDroppedVerbs, verbId]);
        console.log('Guess Verbs after drop:', updatedGuessVerbs);
    };


    const handleCheck = () => {

        const startIndex = currentIndex * groupSize;
        const endIndex = Math.min(startIndex + groupSize, testVerbs.length);

        for (let index = startIndex; index < endIndex; index++) {
            // Adjusted index for droppedVerbs to correspond to current view
            const adjustedIndex = index - startIndex;
            if (droppedVerbs[adjustedIndex] && testVerbs[index] && droppedVerbs[adjustedIndex].meaning === testVerbs[index].meaning) {
                console.log(`Correct Match at index ${index} (displayed index ${adjustedIndex}):`, droppedVerbs[adjustedIndex]);
            } else {
                console.log(`Incorrect Match at index ${index} (displayed index ${adjustedIndex})`);
            }
            setIsCheckComplete(true);
        }
    };


    /////////////////////////////////////////


    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };


    return (
        <BasicLayout>
            <div className="page">
                <MenuBar />
            </div>
            <div>
                < div className="table-container">
                    {/* Display regular verbs */}
                    {!testTaken && (
                        <div>
                            <h2>Regular Verbs</h2>
                            <table>
                                <tbody>
                                    {displayVerbs().map((verb, index) => (
                                        <tr key={index}>
                                            <td>{verb.original}</td>

                                            <td>{verb.meaning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                            <button onClick={handleTest}>Test</button>
                        </div>
                    )}

                    {/* Display shuffled verbs */}
                    {testVerbs.length > 0 && (
                        <div>
                            <h2>Shuffled Verbs</h2>
                            <table>
                                <tbody>
                                    {testVerbs.map((verb, index) => (
                                        <tr key={index}>
                                            <td>
                                                {/* droppable comp. for {verb.original} */}
                                                <DroppableCell index={index} onDrop={handleDrop} droppedVerb={droppedVerbs[index]} />
                                            </td>
                                            <td>{verb.meaning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* New row with shuffled verb originals */}
                            <div>
                                {/* draggable comp. */}
                                {guessVerbs.map((verb, index) => (
                                    <DraggableVerb key={index} verb={verb} index={index} />
                                ))}
                            </div>
                            {/* Button to check the shuffled verbs */}
                            {!isCheckComplete ? (
                                <button onClick={handleCheck} disabled={guessVerbs.length > 0}>Check</button>
                            ) : (
                                <button onClick={handleNext}>Next</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </BasicLayout>
    );
};

export default N_Vocabulary;