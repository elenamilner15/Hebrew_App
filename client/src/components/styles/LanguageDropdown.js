// client\src\components\styles\LanguageDropdown.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../../styles/LanguageDropdown.css';


import Cookies from 'js-cookie';

// function LanguageDropdown({ languageOptions, selectedLanguage, handleLanguageChange }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);
//     const dropdownRef = useRef(null);


function LanguageDropdown({ handleLanguageChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onOptionClicked = (option) => {
        handleLanguageChange(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // // Language options
    // const handleLanguageChange = (selectedOption) => {
    //     setSelectedLanguage(selectedOption);
    //     Cookies.set('selectedLanguage', selectedOption ? selectedOption.value : 'en', { expires: 30 });
    // };


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
    // Language options

    return (
        <div
            className={`language-dropdown ${isHovered ? 'hovered' : ''}`}
            ref={dropdownRef}
            onClick={toggleDropdown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="dropdown-header">
                <div className="dropdown-header-text">
                    {selectedLanguage ? selectedLanguage.label : 'Select Language'}
                </div>
                {/* <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} */}
                <FontAwesomeIcon icon={faChevronDown}
                    style={{ marginLeft: '10px', fontSize: '16px', color: 'rgb(228, 89, 39)' }} />
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {languageOptions.map((option) => (
                        <li key={option.value} onClick={() => onOptionClicked(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LanguageDropdown;