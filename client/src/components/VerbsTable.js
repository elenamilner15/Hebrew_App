// client/src/components/VerbsTable.js

import React from 'react';

const VerbsTable = ({ verbs }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Original</th>
                    <th>Meaning</th>
                </tr>
            </thead>
            <tbody>
                {verbs.map((verb) => (
                    <tr key={verb.id}>
                        <td>{verb.original}</td>
                        <td>{verb.meaning}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VerbsTable;
