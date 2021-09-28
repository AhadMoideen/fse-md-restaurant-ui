import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {TextField} from "../Common/TextField";
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import './Register.css';
import MapCustom from "../Common/components/MapCustom";
import {register} from "../../services/user.service";
import {toast} from 'react-toastify';


class Register extends Component {

    constructor(props) {
        super(props);
    }

    


    render() {
        const validate = Yup.object({
            fullName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            email: Yup.string().email('Email is invalid').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm password is required.'),
            address: Yup.string().max(25, 'Must be 25 characters or less').required('Required'),
            phone: Yup.number().min(5, 'Must be 5 or more').required('Required')
        });
        return (
            <>            
            <Formik {...this.props}
                    initialValues={{
                        fullName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        address:''
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
                                            <TextField label="User Name(email)" name="email" type="text"/>
                                            <TextField label="Password" name="password" type="password" tooltip="Minimum 6 characters"/>
                                            <TextField label="Confirm Password" name="confirmPassword" type="text"/>
                                            <TextField label="Address" name="address" type="text"/>
                                            <TextField label="Phone" name="phone" type="text"/>                                          
                                            
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
                <div style={{ width: "200px", height: "200px" }}>
                    <MapCustom zoom={8} center={{ lat: 51.5287718, lng: -0.2416804 }} lattitudelongitude={this.setLatLong}/>
                </div>
            </>
        );
    }

    setLatLong = ({ lat, lng }) => {
        this.setState({
            latlang: {
                lat: lat,
                lng: lng
            }
        });
    }

    /**
     * Function called upon registration.
     * @param values from the form.
     */
    register = (values) => {
        /* Validate from backend to check if user exist or not */
        values.latitude = this.state.latlang.lat.toFixed(6);
        values.longitude = this.state.latlang.lng.toFixed(6);
        values.name = values.fullName;
        values.timestamp = Date.now();
        values.fullName = null;
        register(values)
            .then(value => {
                toast.success("Registration successful!")
                this.props.history.push({ pathname: '/login' });
            });
    }
    dateChange = (value) => {
        this.setState({date: value})
    }

}

export default Register;
