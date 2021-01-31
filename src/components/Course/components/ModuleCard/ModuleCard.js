import React from 'react';
import './ModuleCard.css';

export const ModuleCard = ({module}) => {
    return (
        <div className="ModuleCard">
            <pre >
                <span>{module.name}</span> <br/>
                <span>{module.description}</span>
            </pre>
        </div>
    );
}
