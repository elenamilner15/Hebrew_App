// server\controllers\userController.js
const Userprogress = require('../models/Userprogress');
const db = require('../database/connection')

exports.getUserprogress = async (req, res) => {
    try {
        const { user_id } = req.params;
        const progress = await Userprogress.getUserProgress(user_id);
        res.status(200).json(progress);
    } catch (error) {
        console.error('Error fetching UserProgress:', error);
        res.status(500).json({ error: 'Error fetching UserProgress' });
    }
};



// server\controllers\userController.js
// Controller function to update user progress
exports.updateUserProgress = async (req, res) => {
    try {
        console.log('updateUserProgress!!!!')
        const { user_id, verb_id, tense, score, attempts } = req.body; // Extract data from request body
        const updateprogress = await Userprogress.updateUserProgress({ user_id, verb_id, tense, score, attempts });
        res.status(200).json(updateprogress);
    } catch (error) {
        console.error('Error updating user progress:', error);
        res.status(500).json({ error: 'Error updating user progress' });
    }
};


// server\controllers\userController.js
//////////////////////////////////////////////////
exports.getProgressForLevel = async (req, res) => {
    try {
        const { user_id, level, tense } = req.params;
        // const { user_id, level, tense } = req.body; 
        const progressInf = await Userprogress.progressForLevel(user_id, level, tense);
        res.status(200).json({
            correctInfinitive: progressInf ? progressInf.count : 0
        });
    } catch (error) {
        console.error('Error fetching infinitive progress:', error);
        res.status(500).json({ error: 'Error fetching infinitive progress' });
    }
};

