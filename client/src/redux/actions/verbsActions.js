// client\src\redux\actions\verbsActions.js

import { fetchInfinitive as apiFetchInfinitive, fetchUserProfile } from '../../api.js';
import { updateUserProgress as apiUpdateUserProgress } from '../../api.js';
import calculateGroups from '../../utils/utils.js'; // Adjust the path as needed

import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchInfinitive = (level, category) => {
    return async (dispatch) => {
        try {
            const success = await apiFetchInfinitive(level, category);
            if (success) {
                console.log('finally!')
            }
            return success; // Return the success status
        } catch (error) {
            console.error('Error during fetchInfinitive:', error);
            throw error;
        }
    };
};
// client\src\redux\actions\verbsActions.js
// Action creator to shuffle X verbs
export const fetchInfinitiveShuffled = (level, category, x) => {
    return async (dispatch) => {
        try {
            const fetchedVerbs = await apiFetchInfinitive(level, category);
            if (fetchedVerbs) {
                const shuffledVerbs = fetchedVerbs.slice().sort(() => Math.random() - 0.5).slice(0, x);
                console.log('Shuffled verbs:', shuffledVerbs);
                return shuffledVerbs;
            } else {
                throw new Error('Failed to fetch shuffled verbs');
            }
        } catch (error) {
            console.error('Error during fetchInfinitiveShuffled:', error);
            throw error;
        }
    };
};


// Action creator to update user progress
export const updateUserProgress = ({ userId, verbId, tense, score, attempts }) => {
    return async (dispatch) => {
        try {
            const updatedProgress = await apiUpdateUserProgress({ userId, verbId, tense, score, attempts });

            dispatch({
                type: 'UPDATE_USER_PROGRESS_SUCCESS',
                payload: updatedProgress
            });
            console.log('User progress updated successfully:', updatedProgress);
        } catch (error) {
            console.error('Error updating user progress:', error);
            throw error;
        }
    };
};