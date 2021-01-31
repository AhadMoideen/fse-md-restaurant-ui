import React, {Component} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {TextField} from "../../../Common/TextField";
import DateTimePicker from "react-datetime-picker";
import './NewEvaluationComponent.css';
class NewEvaluationComponent extends Component {

    state = {
        date: new Date()
    }

    constructor(props) {
        super(props);
    }

    render() {
        const validate = Yup.object({
            marks: Yup.number().max(100, 'Must be 100 or less.').required('Required'),
            noOfQuestions: Yup.number().min(10, 'Must be 10 or more').required('Required'),
            dateTime: Yup.date().required('Confirm password is required.'),
            type: Yup.string().required('Required')
        });
        return (

            <Formik {...this.props}
                    initialValues={{
                        marks: 0,
                        noOfQuestions: 10,
                        dateTime: new Date(),
                        type: 'QUIZ'
                    }}
                    validationSchema={validate}
                    onSubmit={this.addEvaluationComponent}
            >
                {formik => {
                    return (
                        <div className="Register">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <h4 className="my-4 font-weight-bold-display-4">Add Evaluation component</h4>
                                        
                                        <Form>
                                            <label htmlFor="type">Component Type</label>
                                            <Field as="select" name="type" className="form-control shadow-none">
                                                <option value="QUIZ">Quiz</option>
                                                <option value="ASSIGNMENT">Assignment</option>
                                                <option value="EXAM">Exam</option>
                                            </Field>
                                            <ErrorMessage component="div" name="type" className="error"/>
                                            <TextField label="Number of Questions" name="noOfQuestions" type="number"/>
                                            <TextField label="Marks" name="marks" type="number"/>
                                            <DateTimePicker
                                                onChange={this.dateChange}
                                                value={this.state.date} format="y-MM-dd h:mm:ss a"
                                                name="dateTime"/>
                                            <button className="Btn" type="submit">
                                                Add
                                            </button>
                                            <button className="Btn" onClick={this.props.close}>
                                            Back
                                        </button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                }
            </Formik>
        );
    }

    dateChange = (value) => {
        this.setState({date: value})
    }

    /**
     * Function called upon registration.
     * @param values from the form.
     */
    addEvaluationComponent = (values) => {
        /* Validate from backend to check if user exist or not */
        values.dateTime = this.state.date.toString();
        values.evaluationComponentId = this.getRandomInt(10, 10000);
        this.props.saveEvaluationComponent(values);
    }

    /**
     * Function to get Randon-int as Id
     * @param min
     * @param max
     * @returns {number}
     */
    getRandomInt= (min, max) =>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}


export default NewEvaluationComponent;
