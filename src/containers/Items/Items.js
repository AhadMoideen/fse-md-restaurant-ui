import React, {Component} from 'react';

import {getItemForRestaurant} from "../../services/restaurant.service";
import Course from "../../components/CourseCard/CourseCard";
import './Items.css';
import './Items.css';

class Items extends Component {

    state = {
        items: [],
        selectedCoursesId: null,
        error: false
    }

    componentDidMount() {
        console.log('Restaurant-Item',this.props.restaurant)
        getItemForRestaurant(this.props.restaurant.id)
            .then(items => {
                console.log(items);
                if (items && items.length > 0) {
                    this.setState({items: items});
                } else {
                    this.setState({error: true});
                }
            }).catch(err => {
            this.setState({error: true});
        });
    }

    render() {
        let courses = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            courses = this.state.items.map(course => {
                return (

                    <Course className="Courses" key={course.id}
                            price={course.price}
                            description={course.description}
                            clicked={() => this.courseSelectedHandler(course.courseId)}/>
                );
            });
        }
        else {
            courses = (<div>
                <p>No courses available</p>
            </div>);
        }

        return (
            <div>
                <section className="Courses">
                    {courses}
                </section>
                <button className="Btn" onClick={this.addNewCourse}>Add new Item</button>
            </div>

        );
    }

    courseSelectedHandler = (id) => {
        this.props.history.push({pathname: '/course/'+id });
    }

    /**
     * Re-direct to add course.
     */
    addNewCourse = ()=>{
        this.props.history.push({pathname: '/course/add'});
    }
}

export default Items;
