import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BasicLayout from '../layouts/BasicLayout';
import MenuBar2 from './MenuBar2.js';
import '../styles/N_Grammar.css';
import { fetchProgressForLevel, fetchTotalPresent1 } from '../redux/actions/verbsActions';

function N_Grammar() {
    const { level, tense } = useParams(); // Get the selected level and tense from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedBinian, setSelectedBinian] = useState(null);
    const user_id = useSelector((state) => state.user.id);
    const progressData = useSelector((state) => state.verbs.progressData);
    const totalPresent1 = useSelector((state) => state.verbs.totalPresent1);

    const binians = {
        '1': 'Paal',
        '2': 'Piel',
        '3': 'Hifil',
        '4': 'Hitpael',
        '5': 'Nifal',
    };

    const handleBinianClick = (binian) => {
        setSelectedBinian(binian);
        navigate(`/grammar/${level}/${tense}/${binian}`);
    };

    // Fetch progress and total present data when the level, tense, or binian changes
    useEffect(() => {
        if (level && tense && selectedBinian) {
            dispatch(fetchProgressForLevel(user_id, level, tense));
            dispatch(fetchTotalPresent1(level, tense));
        }
    }, [dispatch, user_id, level, tense, selectedBinian]);

    return (
        <BasicLayout>
            <div className="page">
                <MenuBar2 />
                <div className="explevel">
                    <div className="binians">
                        {Object.keys(binians).map((binian) => (
                            <div key={binian} className={`binian b${binian}`} onClick={() => handleBinianClick(binian)}>
                                <p>{binians[binian]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {progressData && (
                    <div className="progress-info">
                        <div className="progress-text">
                            <p>Progress</p>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${(progressData.correctPresent1 / totalPresent1) * 100}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
        </BasicLayout>
    );
}

export default N_Grammar;
