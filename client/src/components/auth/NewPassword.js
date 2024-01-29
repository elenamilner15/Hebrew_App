// client/src/components/auth/NewPassword.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PasswordLayout from '../../layouts/PasswordLayout.js';
import { setResetToken, setNewPassword } from '../../redux/actions/userActions.js';
import '../../styles/NewPassword.css';


function NewPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    // useEffect(() => {
    //     // Extract reset token from the URL
    //     const searchParams = new URLSearchParams(location.search);
    //     const token = searchParams.get('token');

    //     // Optionally, you can validate the token here

    //     // Save the token for submitting the new password
    //     // dispatch(setResetToken(token));
    //     dispatch(setResetToken(token));
    // }, [location.search, dispatch]);

    const handleSetNewPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Extract reset token from the URL
            const searchParams = new URLSearchParams(location.search);
            const resetToken = searchParams.get('token');

            // Dispatch an action to set the new password
            const success = await dispatch(setNewPassword({ password, resetToken }));

            if (success) {
                console.log('Password set successfully!');
                navigate('/');
            } else {
                console.log('trouble!!!')
                setError('Password reset failed');
            }
        } catch (error) {
            console.error('Error setting new password:', error);
            setError('Password reset failed');
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

                <form className="new-password-content" onSubmit={handleSetNewPassword}>
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`new-password-input`}
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={`new-password-input ${error && 'error'}`}
                    />
                    <button type="submit" className="new-password-content button">Set Password</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </PasswordLayout>
    );
}

export default NewPassword;
