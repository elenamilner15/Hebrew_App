// client\src\layouts\PasswordLayout.js
import React from 'react';
import '../styles/PasswordLayout.css';

function PasswordLayout({ children }) {
    return (
        <div className="password-layout">
            <div className="password-overlay"></div>
            <div className="password-header">
                <p>BINIANS</p>
            </div>
            <div className="password-content">
                {children}
            </div>
        </div>
    );
}
export default PasswordLayout;

