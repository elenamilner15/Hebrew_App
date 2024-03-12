// client\src\components\N_Vocabulary.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { fetchInfinitive, fetchInfinitiveShuffled, updateUserProgress } from '../redux/actions/verbsActions';
import '../styles/N_Vocabulary.css';
import MenuBar from './MenuBar2.js';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';
import { calculateGroupSize } from '../utils/utils';
// import { useDrag, useDrop } from 'react-dnd';

const getUniqueMeaningParts = (verbs) => {
    return verbs.map((verb) => {
        let meaningParts = verb.meaning.split(', ');
        let uniquePart = meaningParts[0];
        let partIndex = 1;
        while (verbs.some(v => v !== verb && v.meaning.split(', ')[0] === uniquePart)) {
            uniquePart = meaningParts.slice(0, partIndex + 1).join(', ');
            partIndex++;
        }
        return uniquePart;
    });
};

const N_Vocabulary = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const user_id = useSelector((state) => state.user.id);
    // console.log('User ID:', user_id);

    const { level, category } = useParams();
    const [verbs, setVerbs] = useState([]);
    const [testVerbs, setTestVerbs] = useState([]);
    const [guessVerbs, setGuessVerbs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [verbsFetched, setVerbsFetched] = useState(false); // Track if verbs have been fetched


    const [testTaken, setTestTaken] = useState(false);
    const [droppedVerbs, setDroppedVerbs] = useState([]);
    const [isCheckComplete, setIsCheckComplete] = useState(false);

    const [selectedVerb, setSelectedVerb] = useState(null);
    const [allVerbsTested, setAllVerbsTested] = useState(false); // Check if all verbs tested

    const [totalScore, setTotalScore] = useState(0);


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
        // Reset states when currentIndex changes, to fetch/display new set of verbs
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

        // console.log('After handleTest - Current index:', currentIndex);
        // console.log('After handleTest - Group size:', groupSize);
    };

    const shuffleVerbs = (array) => {
        const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
        return shuffledArray;
    };



    const DraggableVerb = ({ verb, index }) => {
        const handleClick = () => {
            setSelectedVerb({ id: verb.id, index: index });
        };
        const isSelected = selectedVerb && selectedVerb.id === verb.id;

        return (
            <div className={`draggable ${isSelected ? 'verb-selected' : ''}`} onClick={handleClick}>
                {verb.original}
            </div>
        );
    };


    const DroppableCell = ({ index, onDrop, droppedVerb }) => {
        const handleClick = () => {
            if (selectedVerb) {
                onDrop(selectedVerb.id, index);
                setSelectedVerb(null); // Clear the selected verb after dropping
            }
        };

        const handleReturnClick = (event) => {
            event.stopPropagation(); // Prevent event propagation
            if (droppedVerb) {
                setGuessVerbs((prevGuessVerbs) => [...prevGuessVerbs, droppedVerb]);
                setDroppedVerbs((prevDroppedVerbs) => {
                    const newDroppedVerbs = [...prevDroppedVerbs];
                    newDroppedVerbs[index] = null;
                    return newDroppedVerbs;
                });
                setCellOccupancy((prevOccupancy) => {
                    const newOccupancy = [...prevOccupancy];
                    newOccupancy[index] = false; // Mark the cell as unoccupied
                    return newOccupancy;
                });
            }
        };

        const isCorrect = droppedVerb && droppedVerb.correct;
        const isAnswerDragged = droppedVerb && isCorrect === undefined;

        return (
            <tr>
                <td className={`droppable ${droppedVerb ? (isCorrect !== undefined ? (isCorrect ? 'correct' : 'incorrect') : (isAnswerDragged ? 'answer-dragged' : '')) : 'empty-cell'}`} onClick={handleClick}>
                    {droppedVerb && (
                        <div onClick={handleReturnClick}>
                            {droppedVerb.original}
                        </div>
                    )}
                </td>
                {isCorrect === false && (
                    <td className="correct-answer">{testVerbs[index].original}</td>
                )}
            </tr>
        );
    };

    // Define a state variable to track the occupancy of each droppable cell
    const [cellOccupancy, setCellOccupancy] = useState(Array(testVerbs.length).fill(false));


    const handleDrop = (verbId, cellIndex) => {

        const droppedVerb = guessVerbs.find((verb) => verb.id === verbId);

        const droppedVerbIndex = guessVerbs.findIndex((verb) => verb.id === verbId)
        // console.log("droppedVerbIndex", droppedVerbIndex)



        // Check if the cell is occupied based on cellOccupancy
        if (cellOccupancy[cellIndex]) {
            console.log('Cell is occupied. Cell Index:', cellIndex);
            console.log('Verb not dropped.');
            return;
        } else {
            // Check if the verbId is already dropped
            if (droppedVerbs.some(verb => verb && verb.id === verbId)) {
                console.log('Verb is already dropped. Verb not dropped again.');
                return;
            }

            setDroppedVerbs((prevDroppedVerbs) => {
                const newDroppedVerbs = [...prevDroppedVerbs];
                newDroppedVerbs[cellIndex] = droppedVerb; // Store the verb object at the correct cell index
                return newDroppedVerbs;
            });



            // Update cellOccupancy to mark the cell as occupied
            setCellOccupancy(prevOccupancy => {
                const updatedOccupancy = [...prevOccupancy];
                updatedOccupancy[cellIndex] = true;
                // console.log('setCellOccupancy', cellIndex)
                return updatedOccupancy;
            });

            // Update guessVerbs to remove the dropped verb
            setGuessVerbs((prevGuessVerbs) => prevGuessVerbs.filter((_, index) => index !== droppedVerbIndex));
        }

    }
    // console.log('Before handleCheck - Current index:', currentIndex);
    // console.log('Before handleCheck - Group size:', groupSize);

    const handleCheck = async () => {
        const startIndex = currentIndex * groupSize;
        const endIndex = Math.min(startIndex + groupSize, verbs.length);

        let roundScore = 0; // Score for the round

        const newDroppedVerbs = [...droppedVerbs];

        for (let index = startIndex; index < endIndex; index++) {
            const adjustedIndex = index - startIndex;
            const currentTestVerb = testVerbs[adjustedIndex];
            if (newDroppedVerbs[adjustedIndex] && currentTestVerb) {
                const isCorrect = newDroppedVerbs[adjustedIndex].meaning === currentTestVerb.meaning;
                console.log(`${isCorrect ? 'Correct' : 'Incorrect'} Match at index ${index} (displayed index ${adjustedIndex}):`, newDroppedVerbs[adjustedIndex]);

                newDroppedVerbs[adjustedIndex] = { ...newDroppedVerbs[adjustedIndex], correct: isCorrect };



                // Update user progress for the guessed verb
                const score = isCorrect ? 1 : 0; // 1:0 point score 
                const attempts = 1; // 1 attempt for each guess                
                const verb_id = currentTestVerb.id;
                const tense = 'inf';
                // dispatch(updateUserProgress({ user_id, verb_id, tense, score, attempts }));

                roundScore += score;


                // Update user progress
                console.log('User ID before dispatch:', user_id);
                dispatch(updateUserProgress({ user_id, verb_id, tense, score, attempts }));
            }
        }
        // Update state and total score
        setDroppedVerbs(newDroppedVerbs);
        setIsCheckComplete(true);
        // console.log('After handleCheck:', { newDroppedVerbs, isCheckComplete: true });
        setTotalScore(prevScore => prevScore + roundScore);


        if (endIndex >= verbs.length) {
            setAllVerbsTested(true);
        }
    };
    /////////////////////////////////////////

    const getPerformanceMessage = (percentage) => {
        if (percentage === 100) {
            return "Excellent! You nailed it!";
        } else if (percentage >= 90) {
            return "Very good, congrats!";
        } else if (percentage >= 70) {
            return "Good job, keep it up!";
        } else if (percentage >= 50) {
            return "Not bad, but you can do better!";
        } else {
            return "You need to practice more.";
        }
    };

    const percentage = verbs.length > 0 ? Math.round((totalScore / verbs.length) * 100) : 0;
    const performanceMessage = getPerformanceMessage(percentage);

    /////////////////////////////////////////


    const handleNext = () => {
        const newIndex = currentIndex + 1;
        if (newIndex * groupSize >= verbs.length) {
            setAllVerbsTested(true); // Add this line
        } else {
            setCurrentIndex(newIndex);
        }
    };


    return (
        <BasicLayout>
            <div className="page">
                <MenuBar />
            </div>
            <div>
                <div className="table-container">
                    {/* Display regular verbs */}
                    {!testTaken && (
                        <div>
                            <h2>Read and try to remember these verbs</h2>
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
                        </div>
                    )}

                    {/* Display shuffled verbs */}
                    {testVerbs.length > 0 && (
                        <div>
                            <h2>Find the correct verb</h2>
                            <table>
                                <tbody>
                                    {(() => {
                                        const uniqueMeaningParts = getUniqueMeaningParts(testVerbs);
                                        return testVerbs.map((verb, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {/* droppable comp. for {verb.original} */}
                                                    <DroppableCell index={index} onDrop={handleDrop} droppedVerb={droppedVerbs[index]} />
                                                </td>
                                                <td className="verb-meaning">{verb.meaning.split(', ')[0]}</td>
                                            </tr>
                                        ));
                                    })()}
                                </tbody>

                            </table>
                            {/* Display draggable verbs */}
                            <div className="draggable-container">
                                {guessVerbs.map((verb, index) => (
                                    <DraggableVerb key={index} verb={verb} index={index} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons container */}
                <div className="button-container">
                    {!testTaken && (
                        <button className="verb-button" onClick={handleTest}>Test</button>
                    )}
                    {testVerbs.length > 0 && !isCheckComplete && (
                        <button className="verb-button" onClick={handleCheck} disabled={guessVerbs.length > 0}>Check</button>
                    )}
                    {isCheckComplete && !allVerbsTested && ( //Stop Next
                        <button className="verb-button" onClick={handleNext}>Next</button>
                    )}
                    {allVerbsTested && (
                        <div className="congrats-message">
                            <div>Your total score: {totalScore}</div>
                            <div>You guessed {percentage}% of verbs</div>
                            <div>{performanceMessage}</div>
                        </div>
                    )}
                </div>
            </div>
        </BasicLayout >
    );
};

export default N_Vocabulary;