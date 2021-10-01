import React, {Component} from "react";
import {Route, Link, NavLink, Switch} from 'react-router-dom';
import LoginRegistration from "../LoginRegistration/LoginRegistration";
import {Redirect} from "react-router";
import Dashboard from "../Dashboard/Dashboard";
import CourseManagement from "../CourseManagement/CourseManagement";
import {ToastContainer} from "react-toastify";
import './LeaeningManagementSystem.css';

class LearningManagementSystem extends Component {


    render () {
        return (
            <div className="LMS">
                <h1>Meal-Dash ...... Restaurant Management</h1>
                <Switch>
                    <Redirect exact from="/" to="/login"/>
                    <Route path="/login" component={LoginRegistration}/>
                    <Route path="/register" component={LoginRegistration}/>
                    <Route path="/dashboard" render={(props) => (
                        <Dashboard {...props}/>
                    )}/>
                    <Route path="/course" component={CourseManagement}/>
                </Switch>
                <ToastContainer hideProgressBar autoClose={2000}/>
            </div>
        );
    }}
export default LearningManagementSystem;
