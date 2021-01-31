/**
 * Register a User.
 * @param userEmail email of the Faculty for which Courses are being fetched.
 * @returns {Promise<void>}
 */
import courseCard from "../components/CourseCard/CourseCard";


export const getCoursesForFaculty = async (userEmail) => {
    /* API Call to get courses for the user  */
    let courses = getAllCourses();
    courses = courses.filter(course=>{
        return course.faculty === userEmail;
    });
    return courses;
};

/**
 * Save Course.
 * @param course to be saved.
 * @returns {Promise<void>}
 */
export const saveCourse = async (course) => {
    /* API Call to get courses for the user  */
    course.courseId = getRandomInt(10, 100000);
    let courses = getAllCourses();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    return courses;
};


export const getCourse = async (courseId) =>{
    let courses = getAllCourses();
    let courseFound = courses.find(course=>{
        return course.courseId === Number(courseId);
    });
    if(courseFound){
        return courseFound;
    }
    else {
        return null;
    }

}

export const updateCourse = async (updatedCourse)=>{

    let courses = getAllCourses();
    /*let courseFound = courses.find(course=>{
        return course.courseId === Number(updatedCourse.courseId);
    });*/
    if(courses){
        courses = courses.filter(courseFilter=>{
            return courseFilter.courseId !== updatedCourse.courseId;
        });

    }
    else {
        courses = [];
    }
    courses.push(updatedCourse);
    localStorage.setItem('courses',JSON.stringify(courses));
    return updatedCourse;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/**
 * Function to get all courses.
 * @returns {*}
 */
function getAllCourses() {
    let courses = [];
    let coursesString = localStorage.getItem('courses');
    if (coursesString) {
        courses = JSON.parse(coursesString);
    } else {
        courses = [];
    }
    return courses;
}
