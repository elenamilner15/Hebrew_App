// server\controllers\userController.js
const Userprogress = require('../models/Userprogress');
const db = require('../database/connection')

exports.getUserprogress = async (req, res) => {
    try {
        const { userId } = req.params;
        const progress = await Userprogress.getUserProgress(userId);
        res.status(200).json(progress);
    } catch (error) {
        console.error('Error fetching UserProgress:', error);
        res.status(500).json({ error: 'Error fetching UserProgress' });
    }
};
// server\controllers\userController.js
// Controller function to update user progress
exports.createUserProgress = async (req, res) => {
    try {
        const { user_id, verb_id, tense, score, attempts } = req.body;
        const newprogress = await Userprogress.createUserProgress({ user_id, verb_id, tense, score, attempts });
        res.status(200).json(newprogress);
    } catch (error) {
        console.error('Error creating user progress:', error);
        res.status(500).json({ error: 'Error creating user progress' });
    }
};


// Controller function to update user progress
exports.updateUserProgress = async (req, res) => {
    try {
        const { userId, verbId, tense, score, attempts } = req.body; // Extract data from request body
        const updateprogress = await Userprogress.updateUserProgress({ userId, verbId, tense, score, attempts });
        res.status(200).json(updateprogress);
    } catch (error) {
        console.error('Error updating user progress:', error);
        res.status(500).json({ error: 'Error updating user progress' });
    }
};

