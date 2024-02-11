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
import calculateGroups from '../utils/utils';
import { useDrag, useDrop } from 'react-dnd';



const N_Vocabulary = () => {
    const { level, category } = useParams();
    const dispatch = useDispatch();
    const [verbs, setVerbs] = useState([]);
    const [testVerbs, setTestVerbs] = useState([]);
    const [guessVerbs, setGuessVerbs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [a, b, x, y] = calculateGroups(verbs.length);
    const [verbsFetched, setVerbsFetched] = useState(false); // Track if verbs have been fetched
    const [showShuffled, setShowShuffled] = useState(false); // Track if shuffled verbs are displayed
    const [regularVerbs, setRegularVerbs] = useState([]);
    const [shuffledVerbs, setShuffledVerbs] = useState([]);
    const [testTaken, setTestTaken] = useState(false);


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
    }, [dispatch, level, category]);

    const displayVerbs = () => {
        const startIndex = currentIndex * x;
        const endIndex = startIndex + x;
        return verbs.slice(startIndex, endIndex);
    };

    const handleTest = () => {
        // Shuffle the regular verbs
        const shuffledVerbs = shuffleVerbs(displayVerbs());
        const shuffledGuess = shuffleVerbs(displayVerbs());
        // Display the shuffled verbs
        setTestVerbs(shuffledVerbs);
        setGuessVerbs(shuffledGuess);
        // Button test clicked
        setTestTaken(true);
    };


    const shuffleVerbs = (array) => {
        const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
        return shuffledArray;
    };

    // const handleNext = () => {
    //     setCurrentIndex(currentIndex + 1);
    // };

    // const handlePrevious = () => {
    //     setCurrentIndex(currentIndex - 1);
    // };

    const DraggableVerb = ({ verb, index }) => {
        const [{ isDragging }, drag] = useDrag({
            type: ItemTypes.VERB, // Ensure ItemTypes.VERB is defined and has a valid value
            item: { id: index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        return (
            <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
                {verb.original}
            </div>
        );
    };


    const DroppableCell = ({ index, onDrop }) => {
        const [{ isOver }, drop] = useDrop({
            accept: ItemTypes.VERB,
            drop: (item) => onDrop(item.id, index), // Pass the dropped item ID and cell index to the onDrop handler
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        });

        return (
            <div ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'transparent' }}>
                {/* Empty cell */}
            </div>
        );
    };

    const handleDrop = (itemId, cellIndex) => {
        // Perform actions when an item is dropped into a cell
        console.log('Item dropped into cell:', itemId, cellIndex);
        // Update the state or perform any other necessary operations
    };


    return (
        <BasicLayout>
            <div className="page">
                <MenuBar />
            </div>
            <div>
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
                                            <DroppableCell index={index} onDrop={handleDrop} />
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
                        <button>Check</button>
                    </div>
                )}
            </div>
        </BasicLayout>
    );
};

export default N_Vocabulary;