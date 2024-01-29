//client\src\components\MainContent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api';
import BasicLayout from '../layouts/BasicLayout';
import '../styles/MainContent.css';
import Cookies from 'js-cookie';
import LanguageDropdown from './styles/LanguageDropdown.js';
import '../styles/LanguageDropdown.css';


function Vocabulary() {



    // State for selected language
    const [selectedLanguage, setSelectedLanguage] = useState(null);




    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
        Cookies.set('selectedLanguage', selectedOption ? selectedOption.value : 'en', { expires: 30 });
    };

    // Language options
    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
    ];

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            const selectedOption = languageOptions.find((option) => option.value === savedLanguage);
            setSelectedLanguage(selectedOption);
        }
    }, [languageOptions]);


    // const onOptionClicked = (option) => {
    //     // Define the logic you want to execute when an option is clicked
    //     console.log(`Option clicked: ${option.label}`);
    // };


    return (
        <BasicLayout>
            <div className="page">
                <div className="menu-bar">
                    <LanguageDropdown
                        languageOptions={languageOptions}
                        selectedLanguage={selectedLanguage}
                        handleLanguageChange={handleLanguageChange}
                    />
                </div>
            </div>
        </BasicLayout>
    );
}


export default Vocabulary;