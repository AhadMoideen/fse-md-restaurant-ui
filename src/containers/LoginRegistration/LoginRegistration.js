import {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

import './LoginRegistration.css';

class LoginRegistration extends Component {


    render() {
        /* TODO: If logged in re-direct */
        return(
            <div>
                <section className="Posts">

                </section>
                <Switch>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                </Switch>
            </div>
        );
    }
}

export default LoginRegistration;
