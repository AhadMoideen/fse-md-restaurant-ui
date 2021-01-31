import React from 'react';
import './EvaluationComponentCard.css';

export const EvaluationComponentCard = ({evalC}) => {
    return (
        <tr>
            <td >{evalC.type}</td>
            <td >{evalC.noOfQuestions}</td>
            <td >{`${evalC.dateTime}`}</td>
            <td >{evalC.marks}</td>
        </tr>
    );
}
