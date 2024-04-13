//client\src\components\MainContent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { fetchData } from '../api';

import BasicLayout from '../layouts/BasicLayout';
import '../styles/L_Grammar.css';
import MenuBar2 from './MenuBar2.js';
import { fetchProgressForLevel, fetchTotalPresent1 } from '../redux/actions/verbsActions';


function L_Grammar() {

    const { content, level } = useParams();
    const [contentData, setContentData] = useState([]);
    const [showContent, setShowContent] = useState(false); // State to track button click
    /////////////////////////

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(localStorage.getItem('selectedLevel') || '1'); // Retrieve the selected level from local storage or default to '1'
    const [selectedTense, setSelectedTense] = useState(null);
    const [selectedBinian, setSelectedBinian] = useState(null);

    const tenses = {
        present: 'Present',
        past: 'Past',
        future: 'Future',
        imp: 'Imperative',
    };


    // const binians = {
    //     '1': 'Paal',
    //     '2': 'Piel',
    //     '3': 'Hifil',
    //     '4': 'Hitpael',
    //     '5': 'Nifal',
    // };

    // const { content, level } = useParams();
    const handleLevelClick = (level) => {
        setSelectedLevel(level);
        localStorage.setItem('selectedLevel', level);

    };

    const handleTenseClick = (tense) => {
        setSelectedTense(tense);
        console.log("Selected Tense before navigation:", tense);


        // localStorage.setItem('selectedTense', tense);

        // dispatch(fetchProgressForLevel(user_id, level, tense));
        // dispatch(fetchTotalPresent1(level));
        console.log("navigate", `/grammar/${selectedLevel}/${tense}`)
        navigate(`/grammar/${selectedLevel}/${tense}`);
    };





    const user_id = useSelector((state) => state.user.id);
    console.log('User ID:', user_id);

    const progressData = useSelector((state) => state.verbs.progressData);
    const totalPresent1 = useSelector((state) => state.verbs.totalPresent1);





    useEffect(() => {
        dispatch(fetchProgressForLevel(user_id, selectedLevel, selectedTense));
        dispatch(fetchTotalPresent1(selectedLevel, selectedTense));
    }, [dispatch, user_id, selectedLevel, selectedTense]);

    return (
        <BasicLayout>
            <div className="page">
                <MenuBar2 />
                <div className="expmenu">
                    <div className="borderlevel">
                        {['1', '2', '3'].map((level) => (
                            <div key={level} className={`level ${selectedLevel === level ? 'active' : ''}`} onClick={() => handleLevelClick(level)}>
                                <p>{level === '1' ? 'Beginner' : level === '2' ? 'Advanced' : 'Expert'}</p>
                            </div>
                        ))}
                    </div>

                    {/* <div className="borderbinian">
                        {Object.keys(binians).map((binian) => (
                            <div key={binian} className={`binian ${binian}`} onClick={() => handleBinianClick(binian)}>
                                <p>{binians[binian]}</p>
                            </div>
                        ))}
                    </div> */}

                </div>

                {progressData && (
                    <div className="progress-info">
                        <div className="progress-text">
                            <p>Progress</p>
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${(progressData.correctPresent1 / totalPresent1) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="tenses">
                    {Object.keys(tenses).map((tense) => (
                        <div key={tense} className={`tense ${tense}`} onClick={() => handleTenseClick(tense)}>
                            <p>{tenses[tense]}</p>
                        </div>
                    ))}
                </div>



            </div>
        </BasicLayout>
    );
}

export default L_Grammar;