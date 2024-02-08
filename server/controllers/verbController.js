// server\controllers\verbController.js
const Verb = require('../models/Verb');
const db = require('../database/connection')

exports.getInfinitive = async (req, res) => {
    try {
        const { level, category } = req.params;
        const verbs = await Verb.getInfinitive(level, category);
        res.status(200).json(verbs);
    } catch (error) {
        console.error('Error fetching Infinitive:', error);
        res.status(500).json({ error: 'Error fetching Infinitive' });
    }
};


exports.countInfinitive = async (req, res) => {
    try {
        const { level, category } = req.params;
        const verbsCount = await Verb.countInfinitive(level, category);
        res.status(200).json(verbsCount);
    } catch (error) {
        console.error('Error counting Infinitive:', error);
        res.status(500).json({ error: 'Error counting Infinitive' });
    }
};

exports.fetchNextWord = async (req, res) => {
    try {
        const { level, category, currentIndex } = req.params;
        const nextWord = await fetchNextWord(level, category, currentIndex);
        res.status(200).json(nextWord);
    } catch (error) {
        console.error('Error fetching next word:', error);
        res.status(500).json({ error: 'Error fetching next word' });
    }
};




exports.getPresent = async (req, res) => {
    try {
        const { level, part_of_speech } = req.params; // Get selectedLevel from query parameters
        const verbs = await Verb.getPresent(level, part_of_speech); // Pass selectedLevel to the function
        res.status(200).json(verbs);
    } catch (error) {
        console.error('Error fetching Present:', error);
        res.status(500).json({ error: 'Error fetching Present' });
    }
};



