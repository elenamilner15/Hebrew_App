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


    // const { content, level } = useParams();
    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    const handleCatClick = (category) => {
        navigate(`/vocabulary/${selectedLevel}/${category}`);
    };


    return (
        <BasicLayout>
            <div className="page">

                <MenuBar />
                <div className="explevel">
                    <div className="borderlevel">
                        <div className={`level ${selectedLevel === '1' ? 'active' : ''}`} onClick={() => handleLevelClick('1')}>
                            <p>Beginner</p>
                        </div>
                        <div className={`level ${selectedLevel === '2' ? 'active' : ''}`} onClick={() => handleLevelClick('2')}>
                            <p>Advanced</p>
                        </div>
                        <div className={`level ${selectedLevel === '3' ? 'active' : ''}`} onClick={() => handleLevelClick('3')}>
                            <p>Expert</p>
                        </div>
                    </div>


                    {/* <button className={selectedLevel === '1' ? 'active' : ''} onClick={() => handleLevelClick('1')}>
                        Beginner
                    </button>
                    <button className={selectedLevel === '2' ? 'active' : ''} onClick={() => handleLevelClick('2')}>
                        Advanced
                    </button>
                    <button className={selectedLevel === '3' ? 'active' : ''} onClick={() => handleLevelClick('3')}>
                        Expert
                    </button> */}
                </div>

                <div className="categories">

                    <div className="cat c1" onClick={() => handleCatClick('1')}>
                        <p>Everyday Routine</p>
                    </div>

                    <div className="cat c2" onClick={() => handleCatClick('2')}>
                        <p>Movement</p>
                    </div>

                    <div className="cat c3" onClick={() => handleCatClick('3')}>
                        <p>Emotional</p>
                    </div>

                    <div className="cat c4" onClick={() => handleCatClick('4')}>
                        <p>Intellectual</p>
                    </div>

                    <div className="cat c5" onClick={() => handleCatClick('5')}>
                        <p>Social</p>
                    </div>

                    <div className="cat c6" onClick={() => handleCatClick('6')}>
                        <p>Commerce</p>
                    </div>

                    <div className="cat c7" onClick={() => handleCatClick('7')}>
                        <p>Hobby</p>
                    </div>

                    <div className="cat c8" onClick={() => handleCatClick('8')}>
                        <p>Adjective</p>
                    </div>


                    <div className="cat c9" onClick={() => handleCatClick('9')}>
                        <p>Occupational</p>
                    </div>


                    <div className="cat c13" onClick={() => handleCatClick('13')}>
                        <p>Medical</p>
                    </div>


                </div>

            </div>
        </BasicLayout >
    );
}


export default L_Vocabulary;