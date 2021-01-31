import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {TextField} from "../Common/TextField";
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import {register} from "../../services/user.service";
import DateTimePicker from "react-datetime-picker";
import {toast} from "react-toastify";
import './Register.css';


class Register extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        date: new Date()
    }


    render() {
        const validate = Yup.object({
            fullName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            userName: Yup.string().email('Email is invalid').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm password is required.'),
            userType: Yup.string().required('Required'),
            dob: Yup.date().required('Required')
        });
        return (

            <Formik {...this.props}
                    initialValues={{
                        fullName: '',
                        userName: '',
                        password: '',
                        confirmPassword: '',
                        dob: this.state.date,
                        userType: 'FACULTY'
                    }}
                    validationSchema={validate}
                    onSubmit={this.register}
            >
                {formik => {
                    return (
                        <div className="Register">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <h1 className="my-4 font-weight-bold-display-4">Sign-Up</h1>
                                        <Form>
                                            <TextField label="Full Name" name="fullName" type="text"/>
                                            <TextField label="User Name(email)" name="userName" type="text"/>
                                            <TextField label="Password" name="password" type="text"/>
                                            <label htmlFor="userType">User Type</label>
                                            <Field as="select" name="userType" className="form-control shadow-none">
                                                <option value="FACULTY">FACULTY</option>
                                                <option value="STUDENT">STUDENT</option>
                                            </Field>
                                            <ErrorMessage component="div" name="userType" className="error"/>
                                            <TextField label="Confirm Password" name="confirmPassword" type="text"/>
                                            <label htmlFor="dob">Date of Birth</label>
                                            <DateTimePicker disableClock={true}
                                                onChange={this.dateChange}
                                                value={this.state.date} format="y-MM-dd"
                                                name="dob"/>
                                            <button className="Btn" type="submit">
                                                Register
                                            </button>
                                            <Link className="Loginlink" to="/login">Existing user</Link>
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
    register = (values) => {
        /* Validate from backend to check if user exist or not */
        console.log(values);
        register(values)
            .then(value => {
                toast.success("Registration successful!")
                this.props.history.push({pathname: '/login'});
            });
    }
    dateChange = (value) => {
        this.setState({date: value})
    }

}

export default Register;
