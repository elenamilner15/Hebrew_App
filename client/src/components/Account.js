import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BasicLayout from '../layouts/BasicLayout';
import MenuBar2 from './MenuBar2.js';
import '../styles/MainContent.css';
import '../styles/Account.css';
import { fetchProgressForLevel, fetchTotalInfinitive } from '../redux/actions/verbsActions';

function Account() {
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.user.id);

    const [selectedLevel, setSelectedLevel] = useState('1');
    const [selectedTense, setSelectedTense] = useState('inf');
    const progressData = useSelector((state) => state.verbs.progressData);
    const infinitivePerLevel = useSelector((state) => state.verbs.infinitivePerLevel);

    useEffect(() => {
        dispatch(fetchProgressForLevel(user_id, selectedLevel, selectedTense));
        dispatch(fetchTotalInfinitive(selectedLevel));
    }, [dispatch, user_id, selectedLevel, selectedTense]);

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    const handleTenseClick = (tense) => {
        setSelectedTense(tense);
    };

    return (
        <BasicLayout>
            <div className="page">
                <MenuBar2 />
                <div className="levels">
                    {['1', '2', '3'].map((level) => (
                        <button
                            key={level}
                            className={`level-button ${selectedLevel === level ? 'active' : ''}`}
                            onClick={() => handleLevelClick(level)}
                        >
                            Level {level}
                        </button>
                    ))}
                </div>
                <div className="tenses">
                    {['inf', 'prs', 'past', 'fut', 'imp'].map((tense) => (
                        <button
                            key={tense}
                            className={`tense-button ${selectedTense === tense ? 'active' : ''}`}
                            onClick={() => handleTenseClick(tense)}
                        >
                            {tense}
                        </button>
                    ))}
                </div>
                {progressData && (
                    <div className="progress-info">
                        <p>Correct: {progressData.correctInfinitive}</p>
                        <p>Total: {infinitivePerLevel}</p>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${(progressData.correctInfinitive / infinitivePerLevel) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>

        </BasicLayout >
    );
}

export default Account;