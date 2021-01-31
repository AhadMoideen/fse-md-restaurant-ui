/**
 * Register a User.
 * @param values
 * @returns {Promise<void>}
 */
export const register = async (values) => {
    /* API Call to register */
    console.log('Register',values);
    let users = [];
    let usersString = localStorage.getItem('users');
    if(usersString){
        users = JSON.parse(usersString);
    }
    else{
        users = [];
    }
    users.push(values);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('RegisterFinish',values);
};

/**
 * Login to the application.
 * @param values
 * @returns {Promise<null>}
 */
export const login = async (values) => {
    /* API Call to register */
    console.log('Login',values);
    let users = [];
    let usersString = localStorage.getItem('users');
    if(usersString){
        users = JSON.parse(usersString);
        let userFound = null;
        users.forEach(user=>{
            if(user.userName==values.userName && user.password ==values.password && user.userType === values.userType){
                /* Login successful */
                user.token = 'xyz43hjIm36Y';
                userFound = user;
            }
            else if (user.userName==values.userName && user.password ==values.password && user.userType !== values.userType){
                throw new Error("Role not allowed");
            }
        });
        return userFound;
    }
    else{
        /* No existing users */
        let users = [{
            fullName: 'Ahad Moideen',
            userName: 'ahad@tripworld.com',
            password: '123456',
            userType: 'FACULTY'
        }];
        localStorage.setItem('users', JSON.stringify(users));
        return null;
    }
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
