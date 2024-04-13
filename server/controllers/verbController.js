// server\controllers\verbController.js
const Verb = require('../models/Verb');
const db = require('../database/connection');
const Userprogress = require('../models/Userprogress');

const calculateGroups = require('../utils/calculateGroups');

// Function to update user progress
exports.updateUserProgressController = async (req, res) => {
    const { user_id, verb_id, tense, score, attempts } = req.body;
    try {
        const progress = await Userprogress.updateUserProgress({ user_id, verb_id, tense, score, attempts });
        res.status(200).json({ progress });
    } catch (error) {
        console.error('Error updating user progress:', error);
        res.status(500).json({ error: 'Error updating user progress' });
    }
};

///////////////////////////////////////////////////////////////////////

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


exports.totalInfinitive = async (req, res) => {
    try {
        const { level } = req.params;
        const total = await Verb.totalInfinitive(level);
        res.status(200).json({ total: total.count });
    } catch (error) {
        console.error('Error fetching infinitive per level:', error);
        res.status(500).json({ error: 'Error fetching infinitive per level' });
    }
};

///////////////////////////////////////////////////////////////////////

// exports.getPresent1 = async (req, res) => {
//     try {
//         const { level, part_of_speech1 } = req.params;
//         const verbs = await Verb.getPresent1(level, part_of_speech1);
//         res.status(200).json(verbs);
//     } catch (error) {
//         console.error('Error fetching Present:', error);
//         res.status(500).json({ error: 'Error fetching Present' });
//     }
// };

exports.getPresent = async (req, res) => {
    try {
        const { level, binian } = req.params;
        let verbs;
        if (['paal', 'piel'].includes(binian)) {
            verbs = await Verb.getPresent1(level, binian);
        } else if (['hifil', 'hitpael', 'nifal'].includes(binian)) {
            verbs = await Verb.getPresent2(level, binian);
        } else {
            throw new Error('Invalid binian');
        }
        res.status(200).json(verbs);
    } catch (error) {
        console.error('Error fetching Present:', error);
        res.status(500).json({ error: 'Error fetching Present' });
    }
};


exports.totalPresent = async (req, res) => {
    try {
        const { level, tense } = req.params;
        const total = await Verb.totalPresent(level, tense);
        res.status(200).json({ total: total.count });
    } catch (error) {
        console.error('Error fetching infinitive per level:', error);
        res.status(500).json({ error: 'Error fetching infinitive per level' });
    }
};

// exports.totalPresent1 = async (req, res) => {
//     try {
//         const { level } = req.params;
//         const total = await Verb.totalPresent1(level);
//         res.status(200).json({ total: total.count });
//     } catch (error) {
//         console.error('Error fetching infinitive per level:', error);
//         res.status(500).json({ error: 'Error fetching infinitive per level' });
//     }
// };


// exports.getPresent2 = async (req, res) => {
//     try {
//         const { level, part_of_speech2 } = req.params;
//         const verbs = await Verb.getPresent2(level, part_of_speech2);
//         res.status(200).json(verbs);
//     } catch (error) {
//         console.error('Error fetching Present:', error);
//         res.status(500).json({ error: 'Error fetching Present' });
//     }
// };

exports.totalPresent2 = async (req, res) => {
    try {
        const { level } = req.params;
        const total = await Verb.totalPresent2(level);
        res.status(200).json({ total: total.count });
    } catch (error) {
        console.error('Error fetching infinitive per level:', error);
        res.status(500).json({ error: 'Error fetching infinitive per level' });
    }
};