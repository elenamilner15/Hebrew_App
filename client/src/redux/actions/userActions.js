// client\src\redux\actions\userActions.js

import { login as apiLogin, fetchUserProfile } from '../../api';
import { restorePassword as apiRestorePassword } from '../../api';
import { logout as apiLogout } from '../../api';
import { newPassword as apiNewPassword } from '../../api';

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
            dispatch(updateToken(''));

            return true;

        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    };
};



// client\src\redux\actions\userActions.js
export const setResetToken = (token) => ({
    type: 'RESET_TOKEN',
    payload: token,
});

export const clearResetToken = () => ({
    type: 'CLEAR_RESET_TOKEN',
});


export const newPassword = (formData, resetToken) => {
    console.log('userActions.js');
    console.log('newPassword called', formData.passwordInput);
    console.log('resetToken called', resetToken);

    console.log('!!!', formData);

    //     return async (dispatch) => {
    //         try {
    //             const response = await apiNewPassword(formData, resetToken);
    //             // const success = await apiNewPassword(formData, resetToken);

    //             // if (success) {
    //             if (response.success) {
    //                 // const { user } = response.data;  //
    //                 const { user } = success.data;  //
    //                 console.log('userActions.js Password changed successfully!');

    //                 dispatch(setUserData({ isLoggedIn: true, username: user.username }));
    //                 dispatch(updateProfile(user.profile));
    //                 dispatch({ type: 'NEW_PASSWORD', payload: { user } });


    //                 // dispatch({ type: 'NEW_PASSWORD', payload: true });

    //                 // dispatch({ type: 'NEW_PASSWORD', payload: true });

    //             } else {
    //                 console.log('userActions.js Password change failed');
    //                 dispatch({ type: 'NEW_PASSWORD', payload: false });
    //             }
    //             return success;
    //             // return response.success;
    //         } catch (error) {
    //             console.error('Error changing password:', error);
    //             throw error;
    //         }
    //     };
    // };
    return async (dispatch) => {
        try {
            const response = await apiNewPassword(formData.passwordInput, resetToken);

            if (response.success) {
                const { user } = response.data; // Retrieve the user object from the payload
                console.log('Password changed successfully for user:', user.username);

                dispatch({
                    type: 'NEW_PASSWORD',
                    payload: { user },
                });

                return { success: true, payload: { user } };
            } else {
                console.log('Password change failed');
                dispatch({
                    type: 'NEW_PASSWORD',
                    payload: { user: null },
                });

                return { success: false, payload: null };
            }
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    };
};