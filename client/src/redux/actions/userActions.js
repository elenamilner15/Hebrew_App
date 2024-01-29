// client\src\redux\actions\userActions.js

import { login as apiLogin, fetchUserProfile } from '../../api';
import { restorePassword as apiRestorePassword } from '../../api';
import { logout as apiLogout } from '../../api';
import { setNewPassword as apiSetNewPassword } from '../../api';

export const login = (formData) => {
    return async (dispatch) => {
        try {
            const success = await apiLogin(formData);

            if (success) {
                const userProfile = await fetchUserProfile(`/profile/${formData.username}`);
                console.log(userProfile)


                // Save user data and token to localStorage
                localStorage.setItem('user', JSON.stringify({ isLoggedIn: true, username: formData.username }));
                localStorage.setItem('token', userProfile.token);



                // Dispatch actions to update user data and profile
                dispatch(setUserData({ isLoggedIn: true, username: formData.username }));
                dispatch(updateProfile(userProfile));
            }

            return success;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };
};


export const restorePassword = (formData) => {
    return async (dispatch) => {
        try {
            const success = await apiRestorePassword(formData);
            if (success) {
                console.log('finally!')
            }
            return success; // Return the success status
        } catch (error) {
            console.error('Error during password restoration:', error);
            throw error;
        }
    };
};


export const openLogin = () => ({
    type: 'OPEN_LOGIN',
});

export const closeLogin = () => ({
    type: 'CLOSE_LOGIN',
});


export const updateToken = (token) => ({
    type: 'UPDATE_TOKEN',
    payload: token,
});



export const setUserData = (userData) => {
    return {
        type: 'SET_USER_DATA',
        payload: userData,
    };
};


export const updateProfile = (profileData) => {
    return {
        type: 'UPDATE_PROFILE',
        payload: profileData,
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            await apiLogout();

            // frontend cleanup
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            // Dispatch actions to update Redux state
            dispatch(setUserData({ isLoggedIn: false, username: '' }));
            dispatch(updateProfile({ score: null, progress: null, level: null, achievements: [] }));
            dispatch(updateToken('')); // Assuming your token state is a string

            return true;

        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    };
};

export const setResetToken = (token) => ({
    type: 'SET_RESET_TOKEN',
    payload: token,
});



export const setNewPassword = (formData) => {
    return async (dispatch, getState) => {
        try {
            const { resetToken } = getState().user; // Assuming you store the reset token in the Redux state

            // Make an API call to set the new password
            const success = await apiSetNewPassword({ ...formData, resetToken });

            dispatch({ type: 'SET_PASSWORD', payload: { success } });

            return success;
        } catch (error) {
            console.error('Error setting new password:', error);
            throw error;
        }
    };
};