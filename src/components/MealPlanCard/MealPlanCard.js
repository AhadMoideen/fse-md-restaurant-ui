import React from 'react';
import './MealPlanCard.css';


const MealPlanCard = (props) => {

    

    return (
        <article className="Course" onClick={props.clicked}>
            <h1>{props.courseName}</h1>
            <span className="Info">
                <span className="Description">{props.description}</span>
            </span>
            <span className="Info">
                <span className="Price">{props.actual_price}</span>
            </span>
            <span className="Info">
                <span className="Price">{props.final_price}</span>
            </span>
            <span className="Info">
                <span className="Price">{props.status}</span>
            </span>
            
            {(props.status == "PENDING") && (
            <span>
                <i className="ti-check mr-1 ml-1" onClick={()=>props.accept(props.mealPlanId)}/>
            <i className="ti-close mr-1 ml-1" onClick={()=> props.reject(props.mealPlanId)} /></span>)}
        </article>
    );
}
export default MealPlanCard;