import axios from 'axios';
import environment from "../../src/environment";

/**
 * Register a User.
 * @param values
 * @returns {Promise<void>}
 */

export const register = async (values) => {
    /* API Call to register */
    console.log('Register',values);
    /* API: Implementation */    
    return axios.post(`${environment.baseURL}/api/authentication/restaurant/registration/`, values)
        .then(function (response) {
            console.log('Register:Success:', response.data);
                return response.data
        })
        .catch(function (error) {
            throw error;
        });
};

/**
 * Login to the application.
 * @param values
 * @returns {Promise<null>}
 */
export const login = async (values) => {
    console.log(environment.baseURL);
    console.log(process.env.REACT_APP_ENV);
    /* API Call to register */
    console.log('Login:',values);


    
    /* API: Implementation */
    return axios.post(`${environment.baseURL}/login/`, values)
        .then(function (response) {
            console.log('Login:Success:', response.data);
            if (response.data.userType !== response.data.userType) {
                throw new Error("Role not allowed");
            } else {
                /* Login successful */
                response.data.token = 'xyz43hjIm36Y';
                return response.data
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    /* API: Implementation */

};


/**
 * Logout from the application.
 * @param values
 * @returns {Promise<null>}
 */
export const logout = async () => {
    /* API Call to logout */
    localStorage.removeItem('user');
};


/**
 * Logout from the application.
 * @param values
 * @returns {Promise<null>}
 */
export const getLoggedInUser = () => {
    /* API Call to logout */
    if(localStorage.getItem('user')){
        return  JSON.parse(localStorage.getItem('user'));
    }
    else {
        return null;
    }
};
