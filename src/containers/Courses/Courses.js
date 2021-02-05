import React, {Component} from 'react';

import {getCoursesForFaculty} from "../../services/course.service";
import Course from "../../components/CourseCard/CourseCard";
import './Courses.css';

class Courses extends Component {

    state = {
        courses: [],
        selectedCoursesId: null,
        error: false
    }

    componentDidMount() {
        getCoursesForFaculty(this.props.user.userName)
            .then(courses => {
                if (courses && courses.length > 0) {
                    this.setState({courses: courses});
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
            courses = this.state.courses.map(course => {
                return (

                    <Course className="Courses" key={course.courseId}
                            courseName={course.courseName}
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
                <button className="Btn" onClick={this.addNewCourse}>Add new Course</button>
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

export default Courses;
