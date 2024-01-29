// BasicLayout.js
import React from 'react';
import '../styles/Basic.css';




function BasicLayout({ children }) {
    return (
        <div className="basic-layout">
            <div className="header">
                <p>BINIANS</p>
            </div>
            {children}
        </div>
    );
}

export default BasicLayout;

