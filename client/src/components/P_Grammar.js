

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { fetchPresent, updateUserProgress } from '../redux/actions/verbsActions';


import '../styles/P_Grammar.css';
import MenuBar2 from './MenuBar2.js';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';
import { calculateGroupSize2 } from '../utils/utils';
// import '../styles/MainContent.css';
// import '../styles/Account.css';


import { fetchProgressForLevel, fetchTotalPresent } from '../redux/actions/verbsActions.js';


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

const P_Grammar = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const user_id = useSelector((state) => state.user.id);
    // console.log('User ID:', user_id);

    const { level, binian, tense } = useParams();
    const [verbs, setVerbs] = useState([]);
    const [testVerbs, setTestVerbs] = useState([]);
    const [isTestMode, setIsTestMode] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [guessVerbs, setGuessVerbs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isInputFilled, setIsInputFilled] = useState(false);



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
                const fetchedVerbs = await dispatch(fetchPresent(level, binian));
                setVerbs(fetchedVerbs);
                setUserAnswers(fetchedVerbs.map(() => ({ ap_ms: '', ap_fs: '', ap_mp: '', ap_fp: '' })));
            } catch (error) {
                console.error('Error fetching verbs:', error);
            }
        };
        fetchVerbs();
    }, [dispatch, level, binian]);


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

    // const handleInputChange = (index, field, value) => {
    //     const updatedAnswers = [...userAnswers];
    //     updatedAnswers[index][field] = value;
    //     setUserAnswers(updatedAnswers);
    //     console.log('Updated userAnswers:', updatedAnswers); // Log 1
    // };


    const handleInputChange = (index, field, value) => {
        const updatedAnswers = userAnswers.map((answer, idx) => {
            if (idx === index) {
                return { ...answer, [field]: value };
            }
            return answer;
        });
        setUserAnswers(updatedAnswers);


        const anyFilled = updatedAnswers.some(answer => {
            return answer.ap_ms || answer.ap_fs || answer.ap_mp || answer.ap_fp;
        });
        setIsTestMode(anyFilled);
    };


    const groupSize2 = calculateGroupSize2(verbs.length);
    // console.log('verbs.length', verbs.length)//
    // console.log('groupSize2', groupSize2)//

    const displayVerbs = () => {
        const startIndex = currentIndex * groupSize2;
        const endIndex = startIndex + groupSize2;
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


    // const handleDrop = (verbId, cellIndex) => {

    //     const droppedVerb = guessVerbs.find((verb) => verb.id === verbId);

    //     const droppedVerbIndex = guessVerbs.findIndex((verb) => verb.id === verbId)
    //     // console.log("droppedVerbIndex", droppedVerbIndex)

    //     // Check if the cell is occupied based on cellOccupancy
    //     if (cellOccupancy[cellIndex]) {
    //         console.log('Cell is occupied. Cell Index:', cellIndex);
    //         console.log('Verb not dropped.');
    //         return;
    //     } else {
    //         // Check if the verbId is already dropped
    //         if (droppedVerbs.some(verb => verb && verb.id === verbId)) {
    //             console.log('Verb is already dropped. Verb not dropped again.');
    //             return;
    //         }

    //         setDroppedVerbs((prevDroppedVerbs) => {
    //             const newDroppedVerbs = [...prevDroppedVerbs];
    //             newDroppedVerbs[cellIndex] = droppedVerb; // Store the verb object at the correct cell index
    //             return newDroppedVerbs;
    //         });



    //         // Update cellOccupancy to mark the cell as occupied
    //         setCellOccupancy(prevOccupancy => {
    //             const updatedOccupancy = [...prevOccupancy];
    //             updatedOccupancy[cellIndex] = true;
    //             // console.log('setCellOccupancy', cellIndex)
    //             return updatedOccupancy;
    //         });

    //         // Update guessVerbs to remove the dropped verb
    //         setGuessVerbs((prevGuessVerbs) => prevGuessVerbs.filter((_, index) => index !== droppedVerbIndex));
    //     }

    // }



    /////////////////////////////////////////
    const handleCheck = async () => {
        const startIndex = currentIndex * groupSize2;
        const endIndex = Math.min(startIndex + groupSize2, verbs.length);

        let roundScore = 0; // Score for the round

        for (let index = startIndex; index < endIndex; index++) {
            const adjustedIndex = index - startIndex;
            const currentVerb = verbs[index];
            const userAnswer = userAnswers[adjustedIndex];

            // Check each form and update the score
            const forms = ['ap_ms', 'ap_fs', 'ap_mp', 'ap_fp'];
            for (let form of forms) {
                const isCorrect = userAnswer[form] === currentVerb[form];
                const score = isCorrect ? 1 : 0;
                roundScore += score;

                // Log the result for each form
                console.log(`Form: ${form}, User answer: ${userAnswer[form]}, Correct answer: ${currentVerb[form]}, Is correct: ${isCorrect}, Score: ${score}`);

                // Update user progress
                try {
                    console.log(`Updating user progress for user_id: ${user_id}, verb_id: ${currentVerb.id}, tense: ${tense}, form: ${form}, score: ${score}, attempts: 1`);
                    await updateUserProgress({ user_id, verb_id: currentVerb.id, tense, score, attempts: 1 });
                } catch (error) {
                    console.error(`Error updating user progress for verb ${currentVerb.id} and form ${form}:`, error);
                }
            }
        }

        // Update the total score
        setTotalScore(prevScore => prevScore + roundScore);

        // Check if all verbs have been tested
        if (endIndex >= verbs.length) {
            setAllVerbsTested(true);
        } else {
            // Move to the next set of verbs
            setCurrentIndex(prevIndex => prevIndex + 1);
        }

        setIsCheckComplete(true);
    };



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
        if (newIndex * groupSize2 >= verbs.length) {
            setAllVerbsTested(true); // Add this line
        } else {
            setCurrentIndex(newIndex);
        }
    };

    const uniqueMeaningParts = getUniqueMeaningParts(displayVerbs());


    // const isAnyInputFilled = () => {
    //     const filled = userAnswers.some(answer => answer.ap_ms || answer.ap_fs || answer.ap_mp || answer.ap_fp);
    //     console.log('isAnyInputFilled:', filled); // Log 2
    //     return filled;
    // };

    const isAnyInputFilled = () => {
        const displayedAnswers = userAnswers.slice(currentIndex * groupSize2, (currentIndex + 1) * groupSize2);
        return displayedAnswers.every(answer => answer.ap_ms || answer.ap_fs || answer.ap_mp || answer.ap_fp);
    };

    // console.log('Before rendering, isAnyInputFilled:', isAnyInputFilled()); 
    // console.log('userAnswers:', userAnswers);

    return (
        <BasicLayout>
            <div className="page">
                <MenuBar2 />
            </div>
            <div>
                <div className="table-container">
                    {/* Display regular verbs */}
                    {!testTaken && (
                        <div>
                            <div className="N-header">
                                P_Gram
                                Read and try to remember these verbs
                            </div>
                            <table>

                                <thead>
                                    <tr>
                                        <th>Original</th>
                                        <th>Meaning</th>
                                        <th>AP 1MS</th>
                                        <th>AP 1FS</th>
                                        <th>AP MP</th>
                                        <th>AP FP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayVerbs().map((verb, index) => (
                                        <tr key={index}>
                                            <td>{verb.original}</td>
                                            <td>{uniqueMeaningParts[index]}</td>


                                            <td> {verb.ap_ms_trans}
                                                <br />
                                                {verb.ap_ms}
                                            </td>

                                            <td>
                                                {verb.ap_fs_trans}
                                                <br />
                                                {verb.ap_fs}
                                            </td>
                                            <td>
                                                {verb.ap_mp_trans}
                                                <br />
                                                {verb.ap_mp}
                                            </td>
                                            <td>
                                                {verb.ap_fp_trans}
                                                <br />
                                                {verb.ap_fp}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>



                                {/* <tbody>
                                    {displayVerbs().map((verb, index) => (
                                        <tr key={index}>
                                            <td>{verb.original}</td>
                                            <td>{verb.meaning}</td>
                                        </tr>
                                    ))}
                                </tbody> */}
                            </table>







                        </div>
                    )}

                    {/* Display shuffled verbs */}
                    {testVerbs.length > 0 && (
                        <div>
                            <h2>Find the correct verb</h2>
                            <table>

                                <thead>
                                    <tr>
                                        <th>Original</th>
                                        <th>Meaning</th>
                                        <th>AP MS</th>
                                        <th>AP FS</th>
                                        <th>AP MP</th>
                                        <th>AP FP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayVerbs().map((verb, index) => (
                                        <tr key={index}>
                                            <td>{verb.original}</td>
                                            <td>{uniqueMeaningParts[index]}</td>
                                            <td>
                                                {verb.ap_ms_trans}
                                                <br />
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    value={userAnswers[index].ap_ms}
                                                    onChange={(e) => handleInputChange(index, 'ap_ms', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                {verb.ap_fs_trans}
                                                <br />
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    value={userAnswers[index].ap_fs}
                                                    onChange={(e) => handleInputChange(index, 'ap_fs', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                {verb.ap_mp_trans}
                                                <br />
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    value={userAnswers[index].ap_mp}
                                                    onChange={(e) => handleInputChange(index, 'ap_mp', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                {verb.ap_fp_trans}
                                                <br />
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    value={userAnswers[index].ap_fp}
                                                    onChange={(e) => handleInputChange(index, 'ap_fp', e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>



                            </table>



                            {/* Display draggable verbs */}
                            {/* <div className="draggable-container">
                                {guessVerbs.map((verb, index) => (
                                    <DraggableVerb key={index} verb={verb} index={index} />
                                ))}
                            </div> */}


                        </div>
                    )}
                </div>

                {/* Buttons container */}
                <div className="button-container">
                    {!testTaken && (
                        <button className="verb-button" onClick={handleTest}>Test</button>
                    )}
                    {/* {testVerbs.length > 0 && !isCheckComplete && (

                        <button className="verb-button" onClick={handleCheck} disabled={!isInputFilled}>Check</button>
                    )} */}

                    {testVerbs.length > 0 && !isCheckComplete && (


                        <button className="verb-button" onClick={handleCheck} disabled={!isAnyInputFilled()}>Check</button>
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





export default P_Grammar;