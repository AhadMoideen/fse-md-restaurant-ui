import React, {Component} from "react";
import Courses from "../../containers/Courses/Courses";
import {getLoggedInUser} from "../../services/user.service";
import './FacultyDashboard.css';

class FacultyDashboard extends Component {

    render(){
        let user = getLoggedInUser();
        return (
            <article className="FacultyDashboard">
                <h1>Faculty Dashboard</h1>
                <div className="Info">
                    <Courses {...this.props} user={user}/>
                </div>
            </article>
        );
    }
}
export default FacultyDashboard;
