// src/components/HebrewKeyboard.js
import React from 'react';

const HebrewKeyboard = ({ onKeyPress }) => {
    const keys = [
        'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
        'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר',
        'ש', 'ת'
    ];

    return (
        <div className="hebrew-keyboard">
            {keys.map((key, index) => (
                <button key={index} onClick={() => onKeyPress(key)}>
                    {key}
                </button>
            ))}
        </div>
    );
};

export default HebrewKeyboard;
