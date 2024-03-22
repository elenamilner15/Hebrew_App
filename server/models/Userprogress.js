// server\models\Userprogress.js
const db = require('../database/connection');


// Function to get user progress
const getUserProgress = async (user_id) => {
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
            [user_id]
        );
        return progress;
    } catch (error) {
        throw error;
    }
};


const updateUserProgress = async ({ user_id, verb_id, tense, score, attempts }) => {
    try {
        const updatedProgress = await db.oneOrNone(
            `
            INSERT INTO userprogress (user_id, verb_id, tense, score, attempts, last_attempted_at)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id, verb_id, tense)
            DO UPDATE SET score = userprogress.score + $4, attempts = userprogress.attempts + $5, last_attempted_at = CURRENT_TIMESTAMP
            RETURNING *;
            `,
            [user_id, verb_id, tense, score, attempts]
        );
        return updatedProgress;
    } catch (error) {
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
// INFINITIVE PROGRESS //
//////////////////////////////////////////////////////////////////////////////
// server\models\Userprogress.js
const progressForLevel = async (user_id, level, tense) => {
    try {
        let levelRange;
        if (level === '1') {
            levelRange = [1, 2, 3];
        } else if (level === '2') {
            levelRange = [4, 5];
        } else {
            throw new Error('Invalid level');
        }

        const progressInf = await db.oneOrNone(
            `SELECT COUNT(*)
            FROM userprogress
            JOIN verbs ON userprogress.verb_id = verbs.id
            WHERE userprogress.user_id = $1 
            AND verbs.level = ANY($2) 
            AND verbs.level2 = 1
            AND  userprogress.tense = $3
            AND  userprogress.score > 0`,
            [user_id, levelRange, tense]
        );
        return progressInf;
    } catch (error) {
        throw error;
    }
};

// const progressForLevel = async (user_id, tense) => {
//     try {    
//         const progressInf = await db.one(
//             `SELECT COUNT(*)
//             FROM userprogress
//             JOIN verbs ON userprogress.verb_id = verbs.id
//             WHERE userprogress.user_id = $1 
//             // AND verbs.level = ANY($2) 
//             // AND verbs.level2 = 1
//             AND  userprogress.tense = $3
//             AND  userprogress.score > 0`,
//             [user_id, tense]
//         );
//         return progressInf;
//     } catch (error) {
//         throw error;
//     }
// };



module.exports = {
    getUserProgress,
    updateUserProgress,
    progressForLevel,
};
