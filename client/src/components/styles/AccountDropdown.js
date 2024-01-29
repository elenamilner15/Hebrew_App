// client\src\components\styles\AccountDropdown.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/AccountDropdown.css';

function AccountDropdown({ userOptions, handleUserAction, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dropdownRef = useRef(null);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const username = useSelector((state) => state.user.username);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onOptionClicked = (option) => {
        handleUserAction(option);
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

    const handleLogout = () => {
        console.log('Attempting to logout...');
        setIsOpen(false);
        onLogout();
    };

    return (
        <div
            className={`account-dropdown ${isHovered ? 'hovered' : ''}`}
            ref={dropdownRef}
            onClick={toggleDropdown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="dropdown-header">
                <div className="dropdown-header-text">
                    {/* {userOptions ? userOptions.label : 'LOGIN1'} */}
                    {isLoggedIn ? username : 'LOGIN'}
                </div>
                <FontAwesomeIcon icon={faChevronDown}
                    style={{ marginLeft: '10px', fontSize: '16px', color: 'rgb(228, 89, 39)' }} />
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    <li onClick={handleLogout}>Log out</li>
                    <li><Link to="/account">Profile</Link></li>
                    <li><Link to="/rating">Rating</Link></li>
                </ul>
            )}
        </div>
    );
}

export default AccountDropdown;
