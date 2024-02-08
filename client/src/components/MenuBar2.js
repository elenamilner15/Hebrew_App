// client/src/components/MenuBar2.js
import React, { useState, useEffect } from 'react';

import AccountDropdown from './styles/AccountDropdown.js';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions.js';

const MenuBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [previousPath, setPreviousPath] = useState(null); //previous path



    console.log('Is logged in:', isLoggedIn); //login state


    const handleLogout = async () => {
        console.log('Logout function in MenuBar component');

        try {
            await dispatch(logout());
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            setShowLogin(false);
            if (previousPath) {
                navigate(previousPath);
                setPreviousPath(null); // Reset previousPath after navigating back
            }
        }
    }, [isLoggedIn, dispatch, navigate, previousPath]);


    const openLogin = () => {
        setPreviousPath(window.location.pathname); // Store the current path before opening login
        navigate('/login');
        setShowLogin(true);
    };

    //back to the home
    const handleBackToHome = () => {
        navigate('/');
    };


    return (
        <div className="menu-bar">
            <button onClick={handleBackToHome} className="home-button">
                HOME
            </button>
            <div className="abc">
                {isLoggedIn ? (
                    // <AccountDropdown />
                    <AccountDropdown onLogout={() => handleLogout()} />
                ) : (
                    <button onClick={openLogin} className="login-button">
                        LOGIN
                    </button>
                )}
            </div>

        </div>
    );
};

export default MenuBar;
