import React from 'react';
import './StudentCard.css';

export const StudentCard = ({student}) => {
    return (
        <div className="StudentCard">
            <pre >
                <span>{student.name} ({student.email})</span>
            </pre>
        </div>
    );
}
