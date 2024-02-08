//client\src\components\Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Cookies from 'js-cookie';
import BasicLayout from '../layouts/BasicLayout';
import Login from './auth/Login';
import Register from './auth/Register';
import Overlay from './styles/Overlay.js';
import { Routes, Route } from "react-router-dom"

import LanguageDropdown from './styles/LanguageDropdown.js';
import AccountDropdown from './styles/AccountDropdown.js';
// import Account from './Account'; // Import the Account component
import '../styles/LanguageDropdown.css';
import MenuBar from './MenuBar';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function Home() {

    // // State for selected language
    // const [selectedLanguage, setSelectedLanguage] = useState(null);

    const navigate = useNavigate();


    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // const dispatch = useDispatch();

    // const [showLogin, setShowLogin] = useState(false);
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // const username = useSelector((state) => state.user.username);
    // // const [showWelcome, setShowWelcome] = useState(false);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         setShowLogin(false);
    //     }
    // }, [isLoggedIn, dispatch]);


    // const openLogin = () => {
    //     setShowLogin(true);
    // };
    // const closeLogin = () => {
    //     setShowLogin(false);
    // };


    // // Language options
    // const handleLanguageChange = (selectedOption) => {
    //     setSelectedLanguage(selectedOption);
    //     Cookies.set('selectedLanguage', selectedOption ? selectedOption.value : 'en', { expires: 30 });
    // };

    // // console.log('loggedIn:', loggedIn);
    // console.log('username:', username);

    return (
        <BasicLayout>
            <div className="page">

                <MenuBar />
                <div className="course">

                    <div className="box vocabulary" onClick={() => navigate('/vocabulary')}>
                        <p>Learn Vocabulary</p>
                    </div>

                    <div className="box grammar" onClick={() => navigate(`/grammar`)}>
                        <p>Learn Grammar</p>
                    </div>

                    <div className="box steps" onClick={() => navigate(`/steps`)}>
                        <p>Step by Step Program</p>
                    </div>
                </div>

            </div>


            {/* Overlay effect */}
            {/* <Overlay showOverlay={showLogin} onClose={closeLogin} /> */}
        </BasicLayout >

    );
}

export default Home;