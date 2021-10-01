import React, {Component} from 'react';

import {getItemForRestaurant, getMealPlansForRestaurant, updateMealPlanForRestaurant} from "../../services/restaurant.service";
import Course from "../../components/CourseCard/CourseCard";
import './MealPlans.css';
import MealPlanCard from '../../components/MealPlanCard/MealPlanCard';

class MealPlans extends Component {

    state = {
        mealPlans: [],
        selectedCoursesId: null,
        error: false
    }

    componentDidMount() {
        console.log('Restaurant-Item',this.props.restaurant)
        getMealPlansForRestaurant(this.props.restaurant.id)
            .then(mealPlan => {
                console.log(mealPlan);
                if (mealPlan && mealPlan.length > 0) {
                    this.setState({mealPlans: mealPlan});
                } else {
                    this.setState({error: true});
                }
            }).catch(err => {
            this.setState({error: true});
        });
    }

    render() {
        let mealPlans = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            mealPlans = this.state.mealPlans.map(course => {
                return (

                    <MealPlanCard className="Courses" key={course.id}
                            actual_price={course.actual_price}
                            final_price={course.final_price}
                            status={course.status}
                            description={course.description}
                            mealPlanId={course.id}
                            accept={this.accept} reject={this.reject}/>
                );
            });
        }
        else {
            mealPlans = (<div>
                <p>No Meal-plans available</p>
            </div>);
        }

        return (
            <div>
                <section className="Courses">
                    {mealPlans}
                </section>
            </div>

        );
    }

    courseSelectedHandler = (id) => {
        this.props.history.push({pathname: '/course/'+id });
    }

    accept = (id) => {
        updateMealPlanForRestaurant(this.props.restaurant.id, id, { status: "ACCEPTED" })
            .then(updatedMealPlan => {
                if (updatedMealPlan) {
                    getMealPlansForRestaurant(this.props.restaurant.id)
                        .then(mealPlan => {
                            if (mealPlan && mealPlan.length > 0) {
                                this.setState({ mealPlans: mealPlan });
                            } else {
                                this.setState({ error: true });
                            }
                        }).catch(err => {
                            this.setState({ error: true });
                        });
                } else {
                    this.setState({ error: true });
                }
            }).catch(err => {
                this.setState({ error: true });
            });
    }

    reject = (id)=>{
        updateMealPlanForRestaurant(this.props.restaurant.id, id, { status: "REJECTED" })
            .then(updatedMealPlan => {
                if (updatedMealPlan) {
                    getMealPlansForRestaurant(this.props.restaurant.id)
                        .then(mealPlan => {
                            if (mealPlan && mealPlan.length > 0) {
                                this.setState({ mealPlans: mealPlan });
                            } else {
                                this.setState({ error: true });
                            }
                        }).catch(err => {
                            this.setState({ error: true });
                        });
                } else {
                    this.setState({ error: true });
                }
            }).catch(err => {
                this.setState({ error: true });
            });
    }
}

export default MealPlans;
