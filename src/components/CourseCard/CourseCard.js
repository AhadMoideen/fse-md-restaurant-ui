import React from 'react';
import './CourseCard.css';


const itemCard = (props) => {

    return (
        <article className="Course" onClick={props.clicked}>
            <h1>{props.courseName}</h1>
            <div className="Info">
                <p className="Description">{props.description}</p>
            </div>
            <div className="Info">
                <p className="Price">{props.price}</p>
            </div>
        </article>
    );
}
export default itemCard;
