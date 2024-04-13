// server/models/Verb.js
const db = require('../database/connection');

////////////////////////////////////////////////////////////////////////////////
//              INFINITIVE                            //
///////////////////////////////////////////////////////////////////////////////

// get all Infinitive by level and category
const getInfinitive = async (level, category) => {
    try {
        let levelRange;
        if (level === '1') {
            levelRange = [1, 2, 3];
        } else if (level === '2') {
            levelRange = [4, 5];
        } else {
        }

        const verbs = await db.any(`
        SELECT
          id,
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

//total all Infinitive by level
const totalInfinitive = async (level) => {
    try {
        let levelRange;
        if (level === '1') {
            levelRange = [1, 2, 3];
        } else if (level === '2') {
            levelRange = [4, 5];
        } else {
            throw new Error('Invalid level');
        }

        const total = await db.one(
            `SELECT COUNT(*)
            FROM verbs
            WHERE level = ANY($1)       
            AND level2 = 1`,
            [levelRange]
        );
        return total;
    } catch (error) {
        throw error;
    }
};



////////////////////////////////////////////////////////////////////




// server/models/Verb.js
// get all Present1 by level and part_of_speech
const getPresent1 = async (level, part_of_speech1) => {
    try {
        const verbs = await db.any(`
        SELECT
          id,
          original,
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
          level2,
          gr,
          part_of_speech
          FROM verbs
          WHERE level = $1
          AND part_of_speech = $2
          AND level2 = 1`,
            [level, part_of_speech1]);

        return verbs;
    } catch (error) {
        throw error;
    }
};

// Function to count all Present1 tense
const totalPresent = async (level, tense) => {
    try {
        const total = await db.one(
            `SELECT COUNT(*)
             FROM verbs          
             WHERE level = $1
             AND part_of_speech = $2
             AND level2 = 1`,
            [level, tense]);
        return total;
    } catch (error) {
        throw error;
    }
};

// const totalPresent1 = async (level, part_of_speech) => {
//     try {
//         const total = await db.one(
//             `SELECT COUNT(*)
//              FROM verbs          
//              WHERE level = $1
//              AND part_of_speech = $2
//              AND level2 = 1`,
//             [level, part_of_speech]);
//         return total;
//     } catch (error) {
//         throw error;
//     }
// };


// get all Present2 by level and part_of_speech
const getPresent2 = async (level, part_of_speech2) => {
    try {
        const verbs = await db.any(`
        SELECT
          id,
          original,
            meaning,
            root,
            original,
            ap_ms,
            ap_ms_trans,
            ap_fs,
            ap_fs_trans,
            ap_mp,
            ap_mp_trans,
            ap_fp,
            ap_fp_trans,
            level,
            level2,
            gr,
            part_of_speech
          FROM verbs
          WHERE level = $1
          AND part_of_speech = $2
          AND level2 != 3`,
            [level, part_of_speech2]);

        return verbs;
    } catch (error) {
        throw error;
    }
};

// Function to count all Present2 tense
const totalPresent2 = async (level, part_of_speech) => {
    try {
        const total = await db.one(
            `SELECT COUNT(*)
             FROM verbs          
             WHERE level = $1
             AND part_of_speech = $2
             AND level2 != 3`,
            [level, part_of_speech]);
        return total;
    } catch (error) {
        throw error;
    }
};

//////////////////////////////////////////////
//                  PAST                  //
////////////////////////////////////////////

// get all Past1 by level and part_of_speech
const getPast1 = async (level, part_of_speech) => {
    try {
        const verbs = await db.any(`
        SELECT
         id,
         meaning,
         root,
         perf_1s,
         perf_1s_trans,
         perf_1p,
         perf_1p_trans,
         perf_2ms,
         perf_2ms_trans,
         perf_2fs,
         perf_2fs_trans,
         perf_2mp,
         perf_2mp_trans,
         perf_2fp,
         perf_2fp_trans,
         perf_3ms,
         perf_3ms_trans,
         perf_3fs,
         perf_3fs_trans,
         perf_3p,
         perf_3p_trans,        
         level,
         level2,
         gr,
         part_of_speech
         FROM verbs
         WHERE level = $1
         AND part_of_speech = $2
         AND level2 = 1`,
            [level, part_of_speech]);

        return verbs;
    } catch (error) {
        throw error;
    }
};

// Function to count all Past1 tense
const totalPast1 = async (level, part_of_speech) => {
    try {
        const total = await db.one(
            `SELECT COUNT(*)
             FROM verbs          
             WHERE level = $1
             AND part_of_speech = $2
             AND level2 = 1`,
            [level, part_of_speech]);
        return total;
    } catch (error) {
        throw error;
    }
};


// get all Past1 by level and part_of_speech
const getPast2 = async (level, part_of_speech) => {
    try {
        const verbs = await db.any(`
        SELECT
         id,
         meaning,
         root,
         perf_1s,
         perf_1s_trans,
         perf_1p,
         perf_1p_trans,
         perf_2ms,
         perf_2ms_trans,
         perf_2fs,
         perf_2fs_trans,
         perf_2mp,
         perf_2mp_trans,
         perf_2fp,
         perf_2fp_trans,
         perf_3ms,
         perf_3ms_trans,
         perf_3fs,
         perf_3fs_trans,
         perf_3p,
         perf_3p_trans,        
         level,
         level2,
         gr,
         part_of_speech
         FROM verbs
         WHERE level = $1
         AND part_of_speech = $2
         AND level2 = 1`,
            [level, part_of_speech]);

        return verbs;
    } catch (error) {
        throw error;
    }
};

// Function to count all Past1 tense
const totalPast2 = async (level, part_of_speech) => {
    try {
        const total = await db.one(
            `SELECT COUNT(*)
             FROM verbs          
             WHERE level = $1
             AND part_of_speech = $2
             AND level2 = 1`,
            [level, part_of_speech]);
        return total;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    getInfinitive,
    totalInfinitive,
    getPresent1,
    totalPresent,
    // totalPresent1,
    getPresent2,
    totalPresent2,
    getPast1,
    totalPast1,
    getPast2,
    totalPast2,
};



