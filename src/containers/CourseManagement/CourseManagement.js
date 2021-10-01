import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import NewCourse from "../NewCourse/NewCourse";
import {getLoggedInUser} from '../../services/user.service';
import Course from "../../components/Course/Course";
import './CourseManagement.css';

class CourseManagement extends Component {


    render() {
        /* TODO: If NOT logged in re-direct TO LOGIN*/
        let restaurant = getLoggedInUser();
        console.log('Url', this.props.match.url);
        return (
            <div>
                <h1>Course Management </h1>
                <section className="Posts">
                    Test
                </section>
                <Switch>                    
                    <Route path={this.props.match.url} exact render={(props) => (
                        <NewCourse {...props} restaurant={restaurant}/>
                    )}/>
                    <Route path={this.props.match.url + '/:id'} exact component={Course}/>
                </Switch>
            </div>
        );
    }
}

export default CourseManagement;
