// server\controllers\verbController.js
const Verb = require('../models/Verb');
const db = require('../database/connection');
const calculateGroups = require('../utils/calculateGroups');

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

// Function to update user progress
exports.updateUserProgressController = async (req, res) => {
    const { user_id, verb_id, tense, score, attempts } = req.body;
    try {
        const progress = await updateUserProgress({ user_id, verb_id, tense, score, attempts });
        res.status(200).json({ progress });
    } catch (error) {
        console.error('Error updating user progress:', error);
        res.status(500).json({ error: 'Error updating user progress' });
    }
};


// Controller function to shuffle X Verbs
exports.shuffleXVerbs = async (req, res) => {
    try {
        const { level, category } = req.params;


        const { totalVerbs } = await countInfinitive(level, category);
        const groups = calculateGroups(totalVerbs);

        res.status(200).json({ groups });
    } catch (error) {
        console.error('Error shuffling X verbs:', error);
        res.status(500).json({ error: 'Error shuffling X verbs' });
    }
};











///////////////////////////////////////////////////////////////////////



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



