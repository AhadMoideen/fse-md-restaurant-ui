import React from 'react';
//import { useDispatch, useSelector } from "react-redux";
import {
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    Collapse,
    DropdownItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import logodarkicon from '../../../assets/images/logo-icon.png';
import logodarktext from '../../../assets/images/logo-text.png';
import profilephoto from '../../../assets/images/users/1.jpg';
import {logout} from '../../../services/user.service';
//redux action
//import { increaseCounter } from '../../../store/actions/counter.action';


const Header = props => {
    let loggedInUser = JSON.parse(localStorage.getItem('restaurant'));
    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const showMobilemenu = () => {
        document.getElementById('main-wrapper').classList.toggle('show-sidebar');
    }

    const updateToPro = () => {
        console.log("XXX");
        //dispatch(increaseCounter());
    }

    const logoutClick = () => {
        console.log(props);
        logout().then(success => {
            props.history.push({pathname: '/login'});
        });
    }
    function showMap(lat,lng){
        var url = "https://maps.google.com/?q=" + loggedInUser.latitude + "," + loggedInUser.longitude;
        window.open(url);
     }

    return (
        <header className="topbar navbarbg" data-navbarbg="skin1">
            <Navbar className="top-navbar" dark expand="md">
                <div className="navbar-header" id="logobg" data-logobg="skin6">
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/">
                        <b className="logo-icon">
                            <img src={logodarkicon} alt="homepage" className="dark-logo" />
                        </b>
                        <span className="logo-text">
                            <img src={logodarktext} alt="homepage" className="dark-logo" />
                        </span>
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <button className="btn btn-link nav-toggler d-block d-md-none" onClick={() => showMobilemenu()}>
                        <i className="fas fa-bars" />
                    </button>
                </div>
                <Collapse className="navbarbg" navbar data-navbarbg="skin1" >
                    <Nav className="ml-auto float-right" navbar>

                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Profile Dropdown                                                         */}
                        {/*--------------------------------------------------------------------------------*/}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img
                                    src={profilephoto}
                                    alt="user"
                                    className="rounded-circle"
                                    width="31"
                                />
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <DropdownItem>
                                    <i className="ti-user mr-1 ml-1" /> {loggedInUser.name}
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="ti-mobile mr-1 ml-1" /> {loggedInUser.phone}
                                </DropdownItem>
                                <DropdownItem onClick={showMap}>
                                    <i className="ti-home mr-1 ml-1" /> {loggedInUser.address}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={logoutClick}>
                                    <i className="fa fa-power-off mr-1 ml-1" /> Logout
                                </DropdownItem>


                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Profile Dropdown                                                           */}
                        {/*--------------------------------------------------------------------------------*/}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
    
}
export default Header;
