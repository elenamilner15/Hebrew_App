// client/src/components/auth/RestorePassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RestorePassword.css';
import { useDispatch } from 'react-redux';
import PasswordLayout from '../../layouts/PasswordLayout.js';
import { restorePassword } from '../../redux/actions/userActions.js';

function RestorePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Clear any previous error when the user starts typing
    };


    const handleRestorePassword = async (e) => {
        e.preventDefault();

        try {
            const success = await dispatch(restorePassword({ email }));

            if (success) {
                setResetSuccess(true);

            } else {
                setError('Email not found. Please check your email address');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            setError('Email not found. Please check your email address');
        }
    };

    //back to the login
    const handleBackToLogin = () => {
        navigate('/login');
    };
    //back to the home
    const handleBackToHome = () => {
        navigate('/');
    };
    //_______________


    return (
        <PasswordLayout>
            <div className={`restore-container ${resetSuccess ? 'fade-out' : ''}`}>
                <div className="restore-header">
                    <div className="left-button" onClick={handleBackToLogin}>
                        <div className="left-button-image" />
                    </div>
                    <h1>Restore Password</h1>
                    <div className="close-button" onClick={handleBackToHome}>
                        <div className="close-button-image" />
                    </div>
                </div>
                {resetSuccess ? (
                    <div className="success-message">
                        Password reset link sent successfully.
                        Please check your email.
                    </div>

                ) : (
                    <form className="restore-content" onSubmit={handleRestorePassword}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className={`restore-input ${error && 'error'}`}
                        />
                        <button type="submit" className="restore-content button">Reset Password</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                )
                }
                {/* <button className="back-button" onClick={handleBackToLogin}>
                    Back to Login
                </button> */}


            </div >


        </PasswordLayout>
    );
}


export default RestorePassword;