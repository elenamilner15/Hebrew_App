// client/src/components/auth/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Login.css';
import PasswordLayout from '../../layouts/PasswordLayout.js';
import { login } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

// function Login({ onLogin }) {
function Login() { //Login({ previousPath })
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log('Form data updated:', formData);
    };

    //back to the home
    const handleLoginClose = () => {
        navigate('/');
    };

    // const handleLoginClose = () => {
    //     navigate(previousPath || '/');
    // };
    //_______________

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Submitting form data:', formData);

            const success = await dispatch(login(formData))

            if (success) {
                console.log(`${formData.username} logged in successfully`);
                handleLoginClose();


            } else {
                console.log('Login failed. Credentials');
                setLoginError('Login failed. Check the credentials');
            }

        } catch (error) {
            console.error('Error during login:', error);
        }
    };



    return (
        <PasswordLayout>
            <div>
                < div className="login-container" >
                    <div className="login-header">
                        <h1>Login</h1>
                        <div className="close-button" onClick={handleLoginClose}>
                            <div className="close-button-image" />

                        </div>

                    </div>

                    <div className="login-content">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className={`login-input ${loginError && 'error'}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className={`login-input ${loginError && 'error'}`}
                                />
                            </div>
                            <button type="submit">LOGIN</button>
                        </form>
                        {loginError && <p className="error-message">{loginError}</p>}
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register">Register here</Link>
                        </p>
                        <p>
                            <Link to="/password">Forgot your password?</Link>
                        </p>
                    </div >
                </div>

            </div >
        </PasswordLayout>
    );
}

export default Login;







