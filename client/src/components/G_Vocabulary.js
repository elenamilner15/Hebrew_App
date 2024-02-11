// client/src/components/G_Vocabulary.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInfinitive } from '../api';
import MenuBar from './MenuBar2.js';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/G_Vocabulary.css';
import calculateGroups from '../utils';

function G_Vocabulary() {
    const { level, category } = useParams();
    const [verbs, setVerbs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [verbsPerPage, setVerbsPerPage] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [testPairs, setTestPairs] = useState([]);
    const [selectedMeanings, setSelectedMeanings] = useState([]);
    const [score, setScore] = useState(0);

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
        generateTestPairs();
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePairClick = (index, meaning) => {
        const updatedPairs = [...testPairs];
        updatedPairs[index].selected = meaning;
        setTestPairs(updatedPairs);
    };

    const handleCheckClick = async () => {
        const results = await Promise.all(testPairs.map(async (pair) => {
            const isCorrect = await compareMeaningsWithDatabase(pair.original, pair.meaning, pair.selected);
            return isCorrect;
        }));

        const newScore = results.filter(result => result).length;
        setScore(newScore);

        // Update user's progress in the database
        updateUserProgressInDatabase(newScore);

        // Reset selected meanings
        setSelectedMeanings([]);
    };

    const compareMeaningsWithDatabase = async (original, correctMeaning, selectedMeaning) => {
        // Implement logic to compare selectedMeaning with correctMeaning from the database
        // Return true if correct, false otherwise
    };

    const updateUserProgressInDatabase = async (newScore) => {
        // Implement logic to update user's progress in the database
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
            selected: null // For tracking selected meaning
        }));
        setTestPairs(pairs);
    };

    const renderTestPairs = () => {
        return testPairs.map((pair, index) => (
            <div key={index} className="pair">
                <div
                    className={`original ${pair.selected === 'original' ? 'selected' : ''}`}
                    onClick={() => handlePairClick(index, 'original')}
                >
                    {pair.original}
                </div>
                <div
                    className={`meaning ${pair.selected === 'meaning' ? 'selected' : ''}`}
                    onClick={() => handlePairClick(index, 'meaning')}
                >
                    {pair.meaning}
                </div>
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
                    <div className="fields">
                        {!showContent && (
                            <div className="showContent">
                                <button onClick={handleStartClick}>Start</button>
                            </div>
                        )}
                        {showContent && (
                            <>
                                <div className="testPairs">
                                    {renderTestPairs()}
                                </div>
                                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                                <button onClick={handleCheckClick}>Check</button>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default G_Vocabulary;
