import React, {Component} from "react";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {TextField} from "../../components/Common/TextField";
import {saveItem} from "../../services/restaurant.service";
import {Link} from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import './NewCourse.css';
class NewCourse extends Component {

    constructor(props) {
        console.log('Props:', props);
        super(props);
    }

    state = {
        start_time: new Date(),
        end_time: new Date()
    }
    
    render() {
        const validate = Yup.object({
            description: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
            price: Yup.number().min(5, 'Must be 5 or more').required('Required'),    
            start_time: Yup.string().required('Required'),
            end_time: Yup.string().required('Required')
        });
        
        return (

            <Formik {...this.props}
                    initialValues={{
                        description: '',
                        price: '',
                        start_time: Date.now(),
                        end_time: Date.now()
                    }}
                    validationSchema={validate}
                    onSubmit={this.saveNewItem}
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
                                            <TextField label="Description" name="description" type="text"/>
                                            <TextField label="Price" name="price" type="text"/>
                                            <label htmlFor="start_time">From:</label>
                                            <DateTimePicker disableClock={true}
                                                onChange={this.dateChangeStart}
                                                value={this.state.start_time} format="y-MM-dd"
                                                name="start_time"/>
                                                <label htmlFor="end_time">Till:</label>
                                            <DateTimePicker disableClock={true}
                                                onChange={this.dateChangeEnd}
                                                value={this.state.end_time} format="y-MM-dd"
                                                name="end_time"/>
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
    saveNewItem = (values) => {
        /* Validate from backend to check if user exist or not */
        values.status = "ACTIVE";
        saveItem(values, this.props.restaurant.id).then(courses => {
            if(courses){
                this.props.history.push({pathname: '/dashboard'});
            }
        });
    }

    dateChangeStart = (value) => {
        this.setState({start_time: value})
    }
    dateChangeEnd = (value) => {
        this.setState({end_time: value})
    }

}

export default NewCourse;
