//client\src\components\MainContent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';



function MainContent() {

    const { content, level } = useParams();
    const [contentData, setContentData] = useState([]);
    const [showContent, setShowContent] = useState(false); // State to track button click


    const [part_of_speech, setPartOfSpeech] = useState(null); // based on button click

    const goToPaal = () => {
        setPartOfSpeech('paal'); // Set part_of_speech to 'paal'
        setShowContent(false); // Reset showContent when changing part_of_speech
    };

    const goToPiel = () => {
        setPartOfSpeech('piel'); // Set part_of_speech to 'piel'
        setShowContent(false); // Reset showContent when changing part_of_speech
    };

    const goToHifil = () => {
        setPartOfSpeech('hifil'); // Set part_of_speech to 'piel'
        setShowContent(false); // Reset showContent when changing part_of_speech
    };

    const goToHitpael = () => {
        setPartOfSpeech('hitpael'); // Set part_of_speech to 'piel'
        setShowContent(false); // Reset showContent when changing part_of_speech
    };

    const goToNifal = () => {
        setPartOfSpeech('nifal'); // Set part_of_speech to 'piel'
        setShowContent(false); // Reset showContent when changing part_of_speech
    };




    useEffect(() => {
        fetchData(`/verbs/present/${level}`, part_of_speech)
            .then((data) => {
                console.log("Received data:", data);
                setContentData(data);
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });
    }, [content, level, part_of_speech]);

    // Function to handle the "Start" button click
    const handleStartClick = () => {
        setShowContent(true);
    };


    // Define labels for different content options
    const contentLabels = {
        present: "Present Tense",
        past: "Past Tense",
        future: "Future Tense",
        imperative: "Imperative",
        infinitive: "Infinitive",
    };

    // Determine the appropriate label based on content
    const contentLabel = contentLabels[content] || "Content";

    return (
        <BasicLayout>
            <div>

                <div className="menu-bar">

                    <div className="button-container">
                        <button className="button" onClick={goToPaal}>
                            Paal
                        </button>
                        <button className="button" onClick={goToPiel}>
                            Piel
                        </button>
                        <button className="button" onClick={goToHifil}>
                            Hifil
                        </button>
                        <button className="button" onClick={goToHitpael}>
                            Hitpael
                        </button>
                        <button className="button" onClick={goToNifal}>
                            Nifal
                        </button>
                    </div>
                </div>

                {/* Container element for the course block */}
                <div className="course-container">
                    <div className="course-block">
                        <h2> Level {level} </h2>
                        <h2> Learn {contentLabel}</h2>
                        <div id="uppercase">
                            <h2>{part_of_speech}</h2>
                        </div>

                    </div>
                </div>


                {/* Render the "Start" button */}
                <button onClick={handleStartClick}>Start</button>

                {/* Conditionally render the contentData when the button is clicked */}
                {showContent && (
                    <ul>
                        {contentData.map((item, index) => (
                            <li key={index}>
                                <div>Meaning: {item.meaning}</div>
                                <div>Root: {item.root}</div>
                                <div>ap_ms: {item.ap_ms}</div>
                                <div>ap_ms_trans: {item.ap_ms_trans}</div>
                                {/* Render other properties as needed */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </BasicLayout>
    );
}

export default MainContent;