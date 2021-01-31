import {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {TextField} from "../Common/TextField";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {login} from "../../services/user.service";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

class Login extends Component {


    constructor(props) {
        super(props);
    }

    render() {

        const user = localStorage.getItem('user');
        if (user && JSON.parse(user).token) {
            console.log(this.props)
            this.props.history.replace({pathname: '/dashboard'});
        }
        const validate = Yup.object({
            userName: Yup.string().email('Email is invalid').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            userType: Yup.string().required('Required')
        });
        return (<div>
                <Formik
                    initialValues={{
                        userName: '',
                        password: '',
                        userType: 'FACULTY'
                    }}
                    validationSchema={validate}
                    onSubmit={this.login}
                >
                    {formik => (
                        <div className="Login">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <h1 className="my-4 font-weight-bold-display-4">Login</h1>
                                        <Form>
                                            <TextField label="User Name(email)" name="userName" type="text"/>
                                            <TextField label="Password" name="password" type="password"/>
                                            <label htmlFor="userType">User Type</label>
                                            <Field as="select" name="userType" className="form-control shadow-none">
                                                <option value="FACULTY">FACULTY</option>
                                                <option value="STUDENT">STUDENT</option>
                                            </Field>
                                            <ErrorMessage component="div" name="userType" className="error"/>
                                            <button className="Btn" type="submit">
                                                Login
                                            </button>
                                            <Link className="Singup" to="/register">Sign-up</Link>
                                        </Form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </Formik>

            </div>
        );
    }

    login = (values) => {
        login(values).then(user => {
            if (user && user.userName) {
                /*Login succesful: Route to Dashboard */
                localStorage.setItem('user', JSON.stringify(user));
                toast.success("Login Successful!")
                this.props.history.push({pathname: '/dashboard'});
            } else {
                toast.error("Authentication failure");
            }
        }, err => {
            toast.error(err.message);
        });

    }
}

export default Login;
