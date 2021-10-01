import React, {Component} from "react";
import Items from "../../containers/Items/Items";
import {getLoggedInUser} from "../../services/user.service";
import './ItemsDashboard.css';

class ItemsDashboard extends Component {

    render(){
        let restaurant = getLoggedInUser();
        return (
            <article className="FacultyDashboard">
                <h1>Items</h1>
                <div className="Info">
                    <Items {...this.props} restaurant={restaurant}/>
                </div>
            </article>
        );
    }
}
export default ItemsDashboard;
