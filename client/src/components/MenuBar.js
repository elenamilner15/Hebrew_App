// client/src/components/MenuBar.js
import React, { useState, useEffect } from 'react';
import Overlay from './styles/Overlay.js';
import Login from './auth/Login.js';

import LanguageDropdown from './styles/LanguageDropdown.js';
import AccountDropdown from './styles/AccountDropdown.js';
import RestorePassword from './auth/RestorePassword.js';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions.js';

const MenuBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [previousPath, setPreviousPath] = useState(null); //previous path

    //______________________
    // useEffect(() => {
    //     if (isLoggedIn) {
    //         setShowLogin(false);
    //     }
    // }, [isLoggedIn, dispatch]);


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

    // const closeLogin = () => {
    //     setShowLogin(false);
    // };

    return (
        <div className="menu-bar">
            <div className="language-list">
                <LanguageDropdown />
            </div>
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
            {/* <Overlay showOverlay={showLogin} onClose={closeLogin}>
                <Login onLogin={() => { }} closeLogin={closeLogin} />
            </Overlay> */}
        </div>
    );
};


export default MenuBar;
