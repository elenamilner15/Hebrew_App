// server\controllers\verbController.js
const Verb = require('../models/Verb');
const db = require('../database/connection')


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