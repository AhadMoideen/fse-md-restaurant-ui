import React from 'react';
import './CourseCard.css';


const courseCard = (props) => {

    return (
        <article className="Course" onClick={props.clicked}>
            <h1>{props.module}</h1>
            <div className="Info">
                <p className="Description">{props.description}</p>
            </div>
        </article>
    );
}
export default courseCard;
