import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout.js';
import '../styles/N_Grammar.css';
import MenuBar2 from './MenuBar2.js';

// import '../styles/MainContent.css';
// import '../styles/Account.css';


import { fetchProgressForLevel, fetchTotalPresent1 } from '../redux/actions/verbsActions.js';


function N_Grammar() {
    const { tense } = useParams(); // Get the tense from the URL
    // const { content, level } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // const [selectedLevel, setSelectedLevel] = useState(localStorage.getItem('selectedLevel') || '1'); 
    // const [selectedBinian, setSelectedBinian] = useState(null);

    // const progressData = useSelector((state) => state.verbs.progressData);
    // const totalPresent1 = useSelector((state) => state.verbs.totalPresent1);


    const infinitivePerLevel = useSelector((state) => state.verbs.infinitivePerLevel);

    // const handleLevelClick = (level) => {
    //     setSelectedLevel(level);
    //     localStorage.setItem('selectedLevel', level);
    //     // dispatch(fetchProgressForLevel(user_id, level, selectedTense));
    //     // dispatch(fetchTotalPresent1(level, selectedTense));
    // };

    const [selectedTense, setSelectedTense] = useState(null);

    const user_id = useSelector((state) => state.user.id);
    console.log('User ID:', user_id);

    // useEffect(() => {
    //     dispatch(fetchProgressForLevel(user_id, selectedLevel, selectedTense));
    //     dispatch(fetchTotalPresent1(selectedLevel, selectedTense));
    // }, [dispatch, user_id, selectedLevel, selectedTense]);
    const [selectedBinian, setSelectedBinian] = useState(null);

    const binians = {
        '1': 'Paal',
        '2': 'Piel',
        '3': 'Hifil',
        '4': 'Hitpael',
        '5': 'Nifal',
    };


    // useEffect(() => {
    //     dispatch(fetchProgressForLevel(user_id, selectedLevel, selectedTense));
    //     dispatch(fetchTotalPresent1(selectedLevel, selectedTense));
    // }, [dispatch, user_id, selectedLevel, selectedTense]);

    const handleBinianClick = (binian) => {
        setSelectedBinian(binian);
        navigate(`/grammar/${tense}/${binian}`);
    };

    return (
        <BasicLayout>
            <div className="page">
                <MenuBar2 />
                <div className="explevel">
                    {/* <div className="borderlevel">
                        {['1', '2', '3'].map((level) => (
                            <div key={level} className={`level ${selectedLevel === level ? 'active' : ''}`} onClick={() => handleLevelClick(level)}>
                                <p>{level === '1' ? 'Beginner' : level === '2' ? 'Advanced' : 'Expert'}</p>
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

                <div className="binians">
                    {Object.keys(binians).map((binian) => (
                        <div key={binian} className={`binian b${binian}`} onClick={() => handleBinianClick(binian)}>
                            <p>{binians[binian]}</p>
                        </div>
                    ))}
                </div>
            </div>

        </BasicLayout>
    );
}

export default N_Grammar;