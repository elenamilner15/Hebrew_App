// client\src\components\G_Vocabulary.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInfinitive } from '../api';
import MenuBar from './MenuBar2.js';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';
import calculateGroups from '../utils';
import '../styles/G_Vocabulary.css';


function G_Vocabulary() {
    const { level, category } = useParams();
    const [verbs, setVerbs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page of verbs
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [verbsPerPage, setVerbsPerPage] = useState(0); // Number of verbs per page
    const [showContent, setShowContent] = useState(false);
    const [showTestMode, setShowTestMode] = useState(false);
    const [testPairs, setTestPairs] = useState([]);
    const [selectedOriginal, setSelectedOriginal] = useState(null);
    const [selectedMeaning, setSelectedMeaning] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedVerbs = await fetchInfinitive(`/verbs/infinitive/${level}/${category}`);
                setVerbs(fetchedVerbs);
            } catch (error) {
                console.error('Error fetching verbs:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const totalVerbs = verbs.length;
        const { a, b, x, y } = calculateGroups(totalVerbs);
        setVerbsPerPage(x);
        setTotalPages(a + b);
    }, [verbs]);

    const handleStartClick = () => {
        setShowContent(true);
        setShowTestMode(false);
    };

    const handleTestClick = () => {
        setShowTestMode(true);
        setShowContent(false); // Hide display mode
        generateTestPairs();
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        setShowTestMode(false);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setShowTestMode(false);
    };

    const generateTestPairs = () => {
        const startIndex = (currentPage - 1) * verbsPerPage;
        const endIndex = startIndex + verbsPerPage;
        const currentVerbs = verbs.slice(startIndex, endIndex);

        const shuffledOriginals = currentVerbs.map(verb => verb.original).sort(() => Math.random() - 0.5);
        const shuffledMeanings = currentVerbs.map(verb => verb.meaning).sort(() => Math.random() - 0.5);

        const pairs = shuffledOriginals.map((original, index) => ({
            original,
            meaning: shuffledMeanings[index],
            selected: false // For tracking selection state
        }));
        setTestPairs(pairs);
    };

    const handlePairClick = (index, group) => {
        const updatedPairs = [...testPairs];
        const pair = updatedPairs[index];
        if (group === 'original') {
            if (pair.selected) {
                setSelectedOriginal(null);
                pair.selected = false;
            } else {
                setSelectedOriginal(index);
                pair.selected = true;
            }
        } else {
            if (pair.selected) {
                setSelectedMeaning(null);
                pair.selected = false;
            } else {
                setSelectedMeaning(index);
                pair.selected = true;
            }
        }
        setTestPairs(updatedPairs);
    };

    const handleCheckClick = () => {
        // Check if selected pairs are correct
        // Implement this logic
    };

    const displayVerbs = () => {
        const startIndex = (currentPage - 1) * verbsPerPage;
        const endIndex = startIndex + verbsPerPage;
        const currentVerbs = verbs.slice(startIndex, endIndex);
        return currentVerbs.map((verb, index) => (
            <div key={index}>
                {/* Display each verb */}
                <p>{verb.original}</p>
            </div>
        ));
    };


    return (
        <BasicLayout>
            <div className="page">
                <MenuBar />
                <div className="inf"></div>
                <div className="catinf">
                    <div className="course-container">
                        <div className="course-block">
                            <h2> Level {level} </h2>
                        </div>
                    </div>
                    {!showTestMode && (
                        <>
                            <button onClick={handleStartClick} disabled={showContent}>Start</button>
                            {showContent && (
                                <>
                                    {displayVerbs()}
                                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                                    <button onClick={handleTestClick}>Test</button>
                                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                                </>
                            )}
                        </>
                    )}
                    {showTestMode && (
                        <div>
                            {testPairs.map((pair, index) => (
                                <div key={index}>
                                    <p
                                        onClick={() => handlePairClick(index, 'original')}
                                        className={pair.selected && selectedOriginal === index ? 'selected' : ''}
                                    >{pair.original}</p>
                                    <p
                                        onClick={() => handlePairClick(index, 'meaning')}
                                        className={pair.selected && selectedMeaning === index ? 'selected' : ''}
                                    >{pair.meaning}</p>
                                </div>
                            ))}
                            <button onClick={handleCheckClick} disabled={!selectedOriginal || !selectedMeaning}>Check</button>
                        </div>
                    )}
                </div>
            </div>
        </BasicLayout>
    );
}

export default G_Vocabulary;