import React from "react";
import {ErrorMessage, useField} from "formik";
import './TextField.css';
import ReactTooltip from 'react-tooltip';
export const TextField = ({label, ...props})=>{
    let fooRef = null;
    const [field, meta] = useField(props);

    return (
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            <input {...field} {...props}
                   className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                   autoComplete="off"
                   data-tip={props.tooltip}
                   data-event='click focus'/>
            <ErrorMessage component="div" name={field.name} className="error"/>
            {
                (props.tooltip) && <ReactTooltip delayHide={1000}/>
            }

        </div>
    );
}
