//client\src\components\L_Vocabulary.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchData } from '../api';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';
import Cookies from 'js-cookie';

import '../styles/L_Vocabulary.css';
import MenuBar2 from './MenuBar2.js';
import { fetchProgressForLevel, fetchTotalInfinitive } from '../redux/actions/verbsActions';

function L_Vocabulary() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(localStorage.getItem('selectedLevel') || '1'); // Retrieve the selected level from local storage or default to '1'
    const [selectedCategory, setSelectedCategory] = useState(null);


    // Mapping of levels to available categories
    const levelToCategories = {
        '1': ['1', '2', '3', '4', '5', '6', '7', '9', '13'],
        '2': ['1', '2', '3', '4', '5', '6', '8', '9'],
        '3': [] // No categories available for level 3 now
    };

    // Mapping of categories to available levels
    const categoryToLevels = {
        '1': ['1', '2'],
        '2': ['1', '2'],
        '3': ['1', '2'],
        '4': ['1', '2'],
        '5': ['1', '2'],
        '6': ['1', '2'],
        '7': ['1'],
        '8': ['2'],
        '9': ['1', '2'],
        '13': ['1'],
    };

    const categoryNames = {
        '1': 'Everyday Routine',
        '2': 'Movement',
        '3': 'Emotional',
        '4': 'Intellectual',
        '5': 'Social',
        '6': 'Commerce',
        '7': 'Hobby',
        '8': 'Adjective',
        '9': 'Occupational',
        '13': 'Medical',
    };

    const tense = 'inf';

    // const { content, level } = useParams();
    const handleLevelClick = (level) => {
        setSelectedLevel(level);
        localStorage.setItem('selectedLevel', level); // Store the selected level in local storage
        dispatch(fetchProgressForLevel(user_id, level, tense));
        dispatch(fetchTotalInfinitive(level));
    };



    const handleCatClick = (category) => {
        setSelectedCategory(category);
        navigate(`/vocabulary/${selectedLevel}/${category}`);
    };


    const user_id = useSelector((state) => state.user.id);
    console.log('User ID:', user_id);

    const progressData = useSelector((state) => state.verbs.progressData);
    const totalInfinitive = useSelector((state) => state.verbs.totalInfinitive);

    useEffect(() => {
        // console.log('Dispatching fetchProgressForLevel with:', user_id, selectedLevel, tense);
        dispatch(fetchProgressForLevel(user_id, selectedLevel, tense));
        dispatch(fetchTotalInfinitive(selectedLevel));
    }, [dispatch, user_id, selectedLevel]);

    console.log('totalInfinitive from Redux store:', totalInfinitive); // Add this log

    // console.log('Correct Infinitive:', progressData?.correctInfinitive);

    return (
        <BasicLayout>
            <div className="page">
                <MenuBar2 />
                <div className="explevel">
                    <div className="borderlevel">
                        {Object.keys(levelToCategories).map((level) => (
                            <div key={level} className={`level ${selectedLevel === level ? 'active' : ''}`} onClick={() => handleLevelClick(level)}>
                                <p>{level === '1' ? 'Beginner' : level === '2' ? 'Advanced' : 'Expert'}</p>
                            </div>
                        ))}
                    </div>
                </div>


                {progressData && (
                    <div className="progress-info">
                        {/* <p>{progressData.correctInfinitive}</p> */}
                        <div className="progress-text">
                            <p>Progress</p>
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${(progressData.correctInfinitive / totalInfinitive) * 100}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="categories">
                    {selectedCategory ? (
                        categoryToLevels[selectedCategory]?.map((level) => (
                            <div key={level} className={`cat c${level}`} onClick={() => handleLevelClick(level)}>
                                <p>{level}</p>
                            </div>
                        ))
                    ) : (
                        levelToCategories[selectedLevel]?.length > 0 ? (
                            levelToCategories[selectedLevel].map((category) => (
                                <div key={category} className={`cat c${category}`} onClick={() => handleCatClick(category)}>
                                    <p>{categoryNames[category]}</p>
                                </div>
                            ))
                        ) : (
                            <p>This level will be available soon</p>
                        )
                    )}
                </div>
            </div>
        </BasicLayout>
    );
}


export default L_Vocabulary;