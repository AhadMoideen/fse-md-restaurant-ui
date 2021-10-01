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
    return axios.post(`${environment.baseURL}/api/authentication/restaurant/login/`, values)
        .then(function (response) {
            console.log('Login:Success:', response.data);
            if (!response.data.email) {
                throw new Error("Authentication Faliure");
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
    localStorage.removeItem('restaurant');
};


/**
 * Logout from the application.
 * @param values
 * @returns {Promise<null>}
 */
export const getLoggedInUser = () => {
    /* API Call to logout */
    if(localStorage.getItem('restaurant')){
        return  JSON.parse(localStorage.getItem('restaurant'));
    }
    else {
        return null;
    }
};
