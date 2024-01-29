// server/models/Verb.js
const db = require('../database/connection');

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
    getPresent,

};



