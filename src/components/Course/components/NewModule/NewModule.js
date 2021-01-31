import React, {Component} from "react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {TextField} from "../../../Common/TextField";
import './NewModule.css';
class NewModule extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const validate = Yup.object({
            name: Yup.string().max(100, 'Must be 100 or less.').required('Required'),
            description: Yup.string().min(10, 'Must be 10 or more').required('Required'),
        });
        return (

            <Formik {...this.props}
                    initialValues={{
                        name: '',
                        description: '',
                    }}
                    validationSchema={validate}
                    onSubmit={this.addModule}
            >
                {formik => {
                    return (
                        <div className="Register">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <h4 className="my-4 font-weight-bold-display-4">Add New Module</h4>
                                        
                                        <Form>
                                            <TextField label="Name of Module" name="name" type="text"/>
                                            <TextField label="Description" name="description" type="text"/>
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

    /**
     * Function called upon registration.
     * @param values from the form.
     */
    addModule = (values) => {
        /* Validate from backend to check if user exist or not */
        values.moduleId = this.getRandomInt(10, 10000);
        this.props.saveModule(values);
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}


export default NewModule;
