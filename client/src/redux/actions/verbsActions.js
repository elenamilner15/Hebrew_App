// client\src\redux\actions\verbsActions.js

import { fetchInfinitive as apiFetchInfinitive } from '../../api.js';
import { fetchTotalInfinitive as apiFetchTotalInfinitive } from '../../api.js';
import { fetchProgressForLevel as apiFetchProgressForLevel } from '../../api.js';
import { updateUserProgress as apiUpdateUserProgress } from '../../api.js';
import { fetchTotalPresent1 as apiFetchTotalPresent1 } from '../../api.js';



import calculateGroups from '../../utils/utils.js'; // Adjust the path as needed

import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchInfinitive = (level, category) => {
    return async (dispatch) => {
        try {
            const success = await apiFetchInfinitive(level, category);
            if (success) {
                // console.log('finally!')
            }
            return success; // Return the success status
        } catch (error) {
            console.error('Error during fetchInfinitive:', error);
            throw error;
        }
    };
};
// client\src\redux\actions\verbsActions.js
// shuffle X verbs
// export const fetchInfinitiveShuffled = (level, category, x) => {
//     return async (dispatch) => {
//         try {
//             const fetchedVerbs = await apiFetchInfinitive(level, category);
//             if (fetchedVerbs) {
//                 const shuffledVerbs = fetchedVerbs.slice().sort(() => Math.random() - 0.5).slice(0, x);
//                 // console.log('Shuffled verbs:', shuffledVerbs);
//                 return shuffledVerbs;
//             } else {
//                 throw new Error('Failed to fetch shuffled verbs');
//             }
//         } catch (error) {
//             console.error('Error during fetchInfinitiveShuffled:', error);
//             throw error;
//         }
//     };
// };

// client\src\redux\actions\verbsActions.js
// update user progress
export const updateUserProgress = ({ user_id, verb_id, tense, score, attempts }) => {
    console.log('Action Payload:', { user_id, verb_id, tense, score, attempts });
    return async (dispatch) => {
        try {
            // console.log('Dispatching updateUserProgress:', { user_id, verb_id, tense, score, attempts });
            const data = await apiUpdateUserProgress({ user_id, verb_id, tense, score, attempts });

            dispatch({
                type: 'UPDATE_USER_PROGRESS_SUCCESS',
                payload: data
            });
            console.log('User progress updated successfully:', data);
        } catch (error) {
            console.error('Error updating user progress:', error);
            dispatch({
                type: 'UPDATE_USER_PROGRESS_FAILURE',
                payload: error
            });
        }
    };
};



// Action creator to fetch progress for a level
export const fetchProgressForLevel = (user_id, level, tense) => {
    return async (dispatch) => {
        // console.log('Dispatching fetchProgressForLevel:', user_id, level, tense); 
        try {
            const data = await apiFetchProgressForLevel(user_id, level, tense);
            // console.log('Received data:', data);
            dispatch({
                type: 'FETCH_PROGRESS_SUCCESS',
                payload: data
            });
        } catch (error) {
            console.error('Error fetching progress data:', error);
            dispatch({
                type: 'FETCH_PROGRESS_FAILURE',
                payload: error
            });
        }
    };
};

//Total Infinitive for a level

export const fetchTotalInfinitive = (level) => {

    return async (dispatch) => {
        try {
            // console.log('Dispatching totalInfinitive with level:', level);
            const data = await apiFetchTotalInfinitive(level);
            dispatch({
                type: 'FETCH_TOTAL_INF_SUCCESS',
                payload: data
            });
        } catch (error) {
            console.error('Error fetching total infinitive:', error);
            dispatch({
                type: 'FETCH_TOTAL_INF_FAILURE',
                payload: error
            });
        }
    };
};



//Total Present1 for a level

export const fetchTotalPresent1 = (level) => {

    return async (dispatch) => {
        try {
            // console.log('Dispatching total Present1 with level:', level);
            const data = await apiFetchTotalPresent1(level);
            dispatch({
                type: 'FETCH_TOTAL_PRESENT1_SUCCESS',
                payload: data
            });
        } catch (error) {
            console.error('Error fetching total Present1:', error);
            dispatch({
                type: 'FETCH_TOTAL_PRESENT1_FAILURE',
                payload: error
            });
        }
    };
};