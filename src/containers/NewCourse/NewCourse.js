import React, {Component} from "react";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {TextField} from "../../components/Common/TextField";
import {saveCourse} from "../../services/course.service";
import {Link} from "react-router-dom";
import './NewCourse.css';
class NewCourse extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const validate = Yup.object({
            module: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            description: Yup.string().min(10, 'Must be 10 characters or more').required('Required'),
            faculty: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
        });
        return (

            <Formik {...this.props}
                    initialValues={{
                        module: '',
                        description: '',
                        faculty: this.props.user.userName
                    }}
                    validationSchema={validate}
                    onSubmit={this.saveNewCourse}
            >
                {formik => {
                    return (
                        <div className="Register">
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div>
                                            <Link to="/dashboard"> <button>Dashboard</button></Link>
                                        </div>
                                        <h1 className="my-4 font-weight-bold-display-4">Add New Course</h1>
                                        <Form>
                                            <TextField label="Module" name="module" type="text"/>
                                            <TextField label="Description" name="description" type="text"/>
                                            <TextField disabled label="Faculty" name="faculty" type="text"/>
                                            <button className="btn btn-dark mt-3" type="submit">
                                                Submit
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
    saveNewCourse = (values) => {
        /* Validate from backend to check if user exist or not */
        saveCourse(values).then(courses => {
            if(courses){
                this.props.history.push({pathname: '/dashboard'});
            }
        });
    }

}

export default NewCourse;
