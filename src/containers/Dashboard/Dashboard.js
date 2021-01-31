import React, {Component} from "react";
import FacultyDashboard from "../../components/FacultyDashboard/FacultyDashboard";
import StudentDashboard from "../../components/StudentDashboard/StudentDashboard";
import {logout} from "../../services/user.service";
import './Dasboard.css';
class Dashboard extends Component {



    render() {
        let loggedInUser = JSON.parse(localStorage.getItem('user'));
        /* TODO: If logged in re-direct */
        let dashboard = null;
        if (loggedInUser && loggedInUser.userType === 'FACULTY') {
            dashboard = (
                <div>
                    <FacultyDashboard {...this.props}/>
                </div>
            );
        } else if (loggedInUser && loggedInUser.userType === 'STUDENT') {
            dashboard = (
                <div>
                    <StudentDashboard {...this.props}/>
                </div>
            );
        } else {
            localStorage.removeItem('user');
            this.props.history.push({pathname: '/login'});
        }
        return (
            <div>
                <button className="BtnLogout" onClick={this.logout}>Logout</button>
                <section>
                    {dashboard}
                </section>
            </div>
        );
    }

    /**
     * Function to logout.
     */
    logout = () => {
        logout().then(success => {
            this.props.history.push({pathname: '/login'});
        });
    }




}

export default Dashboard;
