// Overlay.js
import React from 'react';
import '../../styles/Overlay.css';
import Login from '../auth/Login';



const Overlay = ({ showOverlay, onClose }) => (
    <div className={`overlay ${showOverlay ? 'show' : ''}`} onClick={onClose}>
        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-button" onClick={onClose}>
                <div className="close-button-image" />
            </div>
            <Login />
        </div>
    </div>
);


export default Overlay;

