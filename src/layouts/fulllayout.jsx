import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './layout-components/header/header.jsx';
import Sidebar from './layout-components/sidebar/sidebar.jsx';
import Footer from './layout-components/footer/footer.jsx';
import ThemeRoutes from '../routes/routes.js';


import ItemsDashboard from "../components/ItemsDashboard/ItemsDashboard";



import Course from '../components/Course/Course';


const Fulllayout = (props) => {
    /*--------------------------------------------------------------------------------*/
    /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
    /*--------------------------------------------------------------------------------*/
    const [width, setWidth] = useState(window.innerWidth);
    let loggedInUser = JSON.parse(localStorage.getItem('restaurant'));
    props.history.listen((location, action) => {
        if (
            window.innerWidth < 767 &&
            document
                .getElementById('main-wrapper')
                .className.indexOf('show-sidebar') !== -1
        ) {
            document
                .getElementById('main-wrapper')
                .classList.toggle('show-sidebar');
        }
    });

    /*--------------------------------------------------------------------------------*/
    /*Function that handles sidebar, changes when resizing App                        */
    /*--------------------------------------------------------------------------------*/
    useEffect(() => {
        const updateDimensions = () => {
            let element = document.getElementById('main-wrapper');
            setWidth(window.innerWidth)
            if (width < 1170) {
                element.setAttribute("data-sidebartype", "mini-sidebar");
                element.classList.add("mini-sidebar");
            } else {
                element.setAttribute("data-sidebartype", "full");
                element.classList.remove("mini-sidebar");
            }
        }
        if (document.readyState === "complete") {
            updateDimensions();
        }
        window.addEventListener("resize", updateDimensions.bind(this));
        window.addEventListener("load", updateDimensions.bind(this));
        return () => {
            window.removeEventListener("load", updateDimensions.bind(this));
            window.removeEventListener("resize", updateDimensions.bind(this));
        };
    }, [width]);

    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    return (
        <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
        >
            {/*--------------------------------------------------------------------------------*/}
            {/* Header                                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <Header {...props} />
            {/*--------------------------------------------------------------------------------*/}
            {/* Sidebar                                                                        */}
            {/*--------------------------------------------------------------------------------*/}
            <Sidebar {...props} routes={ThemeRoutes} />
            {/*--------------------------------------------------------------------------------*/}
            {/* Page Main-Content                                                              */}
            {/*--------------------------------------------------------------------------------*/}
            <div className="page-wrapper d-block">
                <div className="page-content container-fluid">
                <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route path="/dashboard" exact render={(props) => (
                        <ItemsDashboard {...props} restaurant={loggedInUser} />
                    )} />
                    <Route path="/dashboard/items" exact render={(props) => (
                        <ItemsDashboard {...props} restaurant={loggedInUser} />
                    )} />
                    <Route path="/dashboard/mealplan" exact render={(props) => (
                        <div><h1>Meal Plan</h1>
                            <ItemsDashboard {...props} restaurant={loggedInUser} />
                            </div>
                    )} />
                    {/* <Route path={this.props.match.url + '/:id'} exact component={Course} /> */}
                </Switch>
                </div>
                <Footer />
            </div>
        </div>
    );
}
export default Fulllayout;
