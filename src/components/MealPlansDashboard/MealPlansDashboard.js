import React, {Component} from "react";
import Items from "../../containers/Items/Items";
import MealPlans from "../../containers/MealPlans/MealPlans";
import {getLoggedInUser} from "../../services/user.service";
import './MealPlansDashboard.css';

class MealPlansDashboard extends Component {

    render(){
        let restaurant = getLoggedInUser();
        return (
            <article className="MealPlanDashboard">
                <h1>Meal Plans</h1>
                <div className="Info">
                    <MealPlans {...this.props} restaurant={restaurant}/>
                </div>
            </article>
        );
    }
}
export default MealPlansDashboard;