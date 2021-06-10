import React from 'react';
import './StudentCard.css';

export const StudentCard = ({student}) => {
    return (
        <div className="StudentCard">
            <pre >
                <span>{student.fullName} ({student.userName})</span>
            </pre>
        </div>
    );
}
