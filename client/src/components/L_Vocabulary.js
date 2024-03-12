//client\src\components\L_Vocabulary.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';
import Cookies from 'js-cookie';

import '../styles/L_Vocabulary.css';
import MenuBar from './MenuBar2.js';

function L_Vocabulary() {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState('1');
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



    // const { content, level } = useParams();
    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    const handleCatClick = (category) => {
        setSelectedCategory(category);
        navigate(`/vocabulary/${selectedLevel}/${category}`);
    };

    return (
        <BasicLayout>
            <div className="page">
                <MenuBar />
                <div className="explevel">
                    <div className="borderlevel">
                        {Object.keys(levelToCategories).map((level) => (
                            <div key={level} className={`level ${selectedLevel === level ? 'active' : ''}`} onClick={() => handleLevelClick(level)}>
                                <p>{level === '1' ? 'Beginner' : level === '2' ? 'Advanced' : 'Expert'}</p>
                            </div>
                        ))}
                    </div>
                </div>
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