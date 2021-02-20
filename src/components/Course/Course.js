import React, {Component} from 'react';
import './Course.css';
import {getCourse, saveModule, saveEvaluationComponent} from "../../services/course.service";
import NewEvaluationComponent from "./components/NewEvaluationComponent/NewEvaluationComponent";
import {EvaluationComponentCard} from './components/EvaluationComponentCard/EvaluationComponentCard';

import Modal from 'react-modal';
import {Link} from "react-router-dom";
import {Collapse} from "react-collapse";
import NewModule from "./components/NewModule/NewModule";
import {ModuleCard} from "./components/ModuleCard/ModuleCard";
import {StudentCard} from "./components/StudentCard/StudentCard";
class Course extends Component {


    state = {
        course: [],
        selectedCoursesId: null,
        evaluationComponent: false,
        newModuleModal: false,
        evaluationComponentCollapse: true,
        error: false
    }
    render(){
        return (
            <article className="Course">

                <h1>{this.state.course.module}</h1>
                <div className="Info">
                    <p className="Description">{this.state.course.description}</p>
                </div>
                <div>
                    <Link to="/dashboard"> <button className="Btn">Dashboard</button></Link>
                    <br/>
                    <br/>
                </div>
                <div className="d-flex">
                <div className="courseDetails col-8" >
                {
                    (this.state.course.modules && this.state.course.modules.length) &&
                    (<span className="courses">
                            {this.state.course.modules.map(module => <ModuleCard
                                module={module} key={module.moduleId}/>)}
                    </span>)
                }
                {/* Start: New Module */}
                {
                    this.state.newModuleModal &&
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.newModuleModal}
                        contentLabel="Evaluation Component"
                    >
                        <NewModule
                            close={this.closeNewModuleModal}
                            saveModule={this.saveModule}/>
                    </Modal>

                }
                {
                    !this.state.evaluationComponent &&  <div><button className="Btn" onClick={this.openNewModuleModal}>Add Module</button></div>
                }
                {/* End:New Module */}


                 <div className="Heading" onClick={this.toggleEvaluationComponents}>Evaluation Components</div>
                    <Collapse isOpened={!this.state.evaluationComponentCollapse}>
                        {
                            (this.state.course.evaluationComponents && this.state.course.evaluationComponents.length) &&
                            (<div>
                                <table>
                                    <tr>
                                        <th>Type</th>
                                        <th>Questions</th>
                                        <th>Date</th>
                                        <th>Mark</th>
                                    </tr>
                                    {this.state.course.evaluationComponents.map(evalC => <EvaluationComponentCard
                                        evalC={evalC} key={evalC.evaluationComponentId}/>)}
                                    <tr>
                                        <td> Total</td>
                                        <td> -</td>
                                        <td> -</td>
                                        <td> {this.state.course.evaluationComponents.map(e => e.marks).reduce((x, y) => x + y)} </td>
                                    </tr>
                                </table>
                            </div>)
                        }
                    </Collapse>

                {/* Start: New Evaluation Component*/}
                {
                    this.state.evaluationComponent &&
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.evaluationComponent}
                        contentLabel="Evaluation Component"
                    >
                        <NewEvaluationComponent
                            close={this.closeEvaluationComponent}
                            saveEvaluationComponent={this.saveEvaluationComponent}/>
                    </Modal>

                }
                {
                    !this.state.evaluationComponent &&  <button className="Btn" onClick={this.addEvaluationComponent}>Add Evaluation</button>
                }
                {/* End:New Evaluation Component*/}
                </div>
                <div className="studentDetails col-4">
                    <h5>Students enrolled</h5>
                    {
                        (this.state.course.students && this.state.course.students.length) &&
                        (<span className="courses">
                            {this.state.course.students.map(student => <StudentCard
                                student={student} key={student.email}/>)}
                    </span>)
                    }
                </div>
                    </div>
            </article>
        );
    }

    componentDidMount() {
        let courseId = this.props.match.params.id;
        getCourse(courseId)
            .then(course=>{
               this.setState({
                   course: course,
                   selectedCoursesId: course.courseId,
                   error:false
               });
            });
    }

    addEvaluationComponent = () => {
        this.setState({evaluationComponent:true});
    }
    toggleEvaluationComponents = () => {
        this.setState({evaluationComponentCollapse:!this.state.evaluationComponentCollapse});
    }
    closeEvaluationComponent = () => {
        this.setState({evaluationComponent: false});
    }

    closeNewModuleModal = () => {
        this.setState({newModuleModal: false});
    }
    openNewModuleModal = () => {
        this.setState({newModuleModal:true});
    }
    /**
     * Function to save Evaluation component to Course.
     * @param evaluationComponent
     */
    saveEvaluationComponent =(evaluationComponent) => {
        console.log('Save-EvalComp:',evaluationComponent);
        let course = this.state.course;
        /* API: Implementation */
        saveEvaluationComponent(course.courseId, evaluationComponent)
            .then(result=>{
                this.setState({course:result,evaluationComponent:false, evaluationComponentCollapse:false});
            });
    }

    /**
     * Function to save a Module to the Course.
     * @param module
     */
    saveModule =(module) => {
        let course = this.state.course;
        /* API: Implementation */
        saveModule(course.courseId, module)
            .then(course=>{
                this.setState({course:course,newModuleModal:false});
            });
    }


}

export default Course;
