import Fulllayout from '../layouts/fulllayout.jsx';
import  LoginRegistration  from '../containers/LoginRegistration/LoginRegistration.js';

var indexRoutes = [
    // { path:"/", name: 'Login', component: LoginRegistration },
    { path: '/dashboard', name: 'Starter', component: Fulllayout },
    { path:"/login", name: 'Login', component: LoginRegistration },
    { path: "/register", name: 'Register', component: LoginRegistration }
];

export default indexRoutes;