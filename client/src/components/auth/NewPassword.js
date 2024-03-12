// client/src/components/auth/NewPassword.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PasswordLayout from '../../layouts/PasswordLayout.js';
import { newPassword, setResetToken, clearResetToken, login } from '../../redux/actions/userActions.js';
import '../../styles/NewPassword.css';


function NewPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const resetToken = useSelector((state) => state.user.resetToken); // Reset token from Redux state


    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

    const [passwordError, setPasswordError] = useState('');





    useEffect(() => {
        // Extract reset token from the URL
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        // Check if the token exists before dispatching
        if (token) {
            dispatch(setResetToken(token));
        }
    }, [location.search, dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordInput !== confirmPasswordInput) {
            setPasswordError('Passwords do not match');
            return;
        }



        try {
            const response = await dispatch(newPassword({ passwordInput }, resetToken));

            if (response.success) {
                const { user } = response.payload;
                console.log('Password set successfully for user:', user.username);

                await dispatch(login({ username: user.username, password: passwordInput }));
                dispatch(clearResetToken());
                navigate('/');
            } else {
                console.log('Password setting failed');
            }
        } catch (error) {
            console.error('Error during newPassword:', error);
        }
    };












    //back to the home
    const handleBackToHome = () => {
        navigate('/');
    };



    return (
        <PasswordLayout>
            <div className="new-password-container">

                <div className="new-password-header">
                    <h1>Set New Password</h1>
                    <div className="close-button" onClick={handleBackToHome}>
                        <div className="close-button-image" />
                    </div>
                </div>

                <div className="new-password-content">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="passwordInput">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                required
                                className={`new-password-input`}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPasswordInput">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPasswordInput}
                                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                                required
                                className={`new-password-input ${passwordError && 'error'}`}
                            />
                        </div>
                        <button type="submit" className="new-password-content button">Set Password</button>
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </form>
                </div>
            </div>
        </PasswordLayout>
    );
}

export default NewPassword;
