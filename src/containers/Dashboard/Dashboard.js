import React, {Component} from "react";
import ItemsDashboard from "../../components/ItemsDashboard/ItemsDashboard";
import {logout} from "../../services/user.service";
import './Dasboard.css';
import {Route, Switch} from "react-router-dom";
import Course from "../../components/Course/Course";
import {Redirect} from "react-router";
class Dashboard extends Component {



    render() {
        let loggedInUser = JSON.parse(localStorage.getItem('restaurant'));
        /* TODO: If logged in re-direct */
        let dashboard = null;
        if (loggedInUser && loggedInUser.email) {
            
            dashboard = (
                <div>
                <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route path="/dashboard" exact render={(props) => (
                        <ItemsDashboard {...this.props} />
                    )} />
                    <Route path="/dashboard/items" exact render={(props) => (
                        <ItemsDashboard {...props} restaurant={loggedInUser} />
                    )} />
                    <Route path="/dashboard/mealplan" exact render={(props) => (
                        <ItemsDashboard {...props} restaurant={loggedInUser} />
                    )} />
                    <Route path={this.props.match.url + '/:id'} exact component={Course} />
                </Switch>
                </div>
            )
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
