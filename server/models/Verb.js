// server/models/Verb.js
const db = require('../database/connection');

const countInfinitive = async (level, category) => {
    try {
        let levelRange;
        if (level === '1') {
            // For level 1 where gr is 1, 2, or 3
            levelRange = [1, 2, 3];
        } else if (level === '2') {
            // For level 2 where gr is 4 or 5
            levelRange = [4, 5];
        } else {
            // Handle other levels if needed
            throw new Error('Invalid level');
        }

        const verbsCount = await db.one(`
            SELECT COUNT(*)
            FROM verbs
            WHERE level = ANY($1)
            AND level2 = 1
            AND gr = $2
        `, [levelRange, category]);

        return verbsCount.count;
    } catch (error) {
        throw error;
    }
};


// Function to fetch all Infinitive
const getInfinitive = async (level, category) => {
    try {
        let levelRange;
        if (level === '1') {
            // For level 1 where gr is 1, 2, or 3
            levelRange = [1, 2, 3];
        } else if (level === '2') {
            // For level 2where gr is 4 or 5
            levelRange = [4, 5];
        } else {
            // Handle other levels if needed
        }

        const verbs = await db.any(`
        SELECT
          transcription,
          original,          
          root,
          meaning, 
          hebrew,         
          level,
          level2,
          gr        
        FROM verbs
        WHERE level = ANY($1)       
        AND level2 = 1
        AND gr = $2
        `, [levelRange, category]);

        return verbs;
    } catch (error) {
        throw error;
    }
};




// Function to fetch the next word from the list
const fetchNextWord = async (level, category, currentIndex) => {
    try {
        const verbs = await getInfinitive(level, category);
        const nextIndex = (currentIndex + 1) % verbs.length;
        return verbs[nextIndex];
    } catch (error) {
        throw error;
    }
};



// Function to fetch all Present tense
const getPresent = async (level, part_of_speech) => {
    try {
        const verbs = await db.any(`
        SELECT
          meaning,
          root,
          ap_ms,
          ap_ms_trans,
          ap_fs,
          ap_fs_trans,
          ap_mp,
          ap_mp_trans,
          ap_fp,
          ap_fp_trans,
          level,
          part_of_speech
        FROM verbs
        WHERE level = $1
        AND part_of_speech = $2
        LIMIT 5`, [level, part_of_speech]);

        return verbs;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    countInfinitive,
    getInfinitive,
    fetchNextWord,
    getPresent,

};



