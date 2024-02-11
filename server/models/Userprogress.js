// server\models\Userprogress.js
const db = require('../database/connection');


// Function to get user progress
const getUserProgress = async (userId) => {
    try {
        const progress = await db.any(
            `
            SELECT
                up.user_id,
                up.verb_id,
                up.tense,
                up.score,
                up.attempts,
                up.last_attempted_at,
                v.verb_name
            FROM user_progress up
            JOIN verbs v ON up.verb_id = v.id
            WHERE up.user_id = $1;
            `,
            [userId]
        );
        return progress;
    } catch (error) {
        throw error;
    }
};

// Function to create user progress
const createUserProgress = async ({ user_id, verb_id, tense, score, attempts }) => {
    try {
        const newprogress = await db.one(
            `
            INSERT INTO userprogress (user_id, verb_id, tense, score, attempts, last_attempted_at)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            RETURNING *;
            `,
            [user_id, verb_id, tense, score, attempts]
        );
        return newprogress;
    } catch (error) {
        throw error;
    }
};

// Function to update user progress
const updateUserProgress = async ({ user_id, verb_id, tense, score, attempts }) => {
    try {
        const updateprogress = await db.oneOrNone(
            `
            INSERT INTO userprogress (user_id, verb_id, tense, score, attempts, last_attempted_at)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id, verb_id, tense)
            DO UPDATE SET score = EXCLUDED.score, attempts = EXCLUDED.attempts, last_attempted_at = CURRENT_TIMESTAMP
            RETURNING *;
            `,
            [user_id, verb_id, tense, score, attempts]
        );
        return updateprogress;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserProgress,
    createUserProgress,
    updateUserProgress,

};
