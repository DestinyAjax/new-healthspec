import React, { useState } from "react";
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';
import { Link, NavLink as RRNavLink } from "react-router-dom";
import HeaderComponentStyleWrapper from "./HeaderComponent.styles";

const HeaderComponent = props => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const yes = () => {window.open("https://ohis.ng", "_blank")}

    return (
        <HeaderComponentStyleWrapper className="HeaderStyleWrapper">
            <nav className="navContainer d-none d-md-block navbar navbar-expand-lg navbar-expand navbar-light bg-light shadow-lg" style={{padding: '15px'}}>
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src='/images/ohis_logo.png' alt="logo" />
                    </Link>

                    <div className="" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item">
                                <Link to="/" className={`nav-link mr-3 navItem`}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/guest_organization_profile_all-hospital" className={`nav-link mr-3 navItem`}>Find A Provider</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/guest_policy" className={`nav-link mr-3 navItem`}>Our Policies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/guest_benefit" className={`nav-link mr-3 navItem`}>Benefits</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signin" className={`nav-link mr-3 navItem`}>Login</Link>
                            </li>
                            <li className="nav-item" >
                                <button onClick={() => {if(window.confirm('You are about to go back to the ohis website, proceed?')){yes()};}} className="navBtn" style={{marginTop: '10px'}}>Community</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Navbar color="faded" className="d-block d-md-none shadow-lg" light>
                <NavbarBrand to="/" className="mr-auto">
                    <img src='/images/ohis_logo.png' alt="logo" />
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2 mt-4 pull-right" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem><NavLink className="navItem" to="/" activeClassName="active" tag={RRNavLink}>Home</NavLink> </NavItem>
                        <NavItem><NavLink className="navItem" to="/guest_organization_profile_all-hospital" activeClassName="active" tag={RRNavLink}>Find A Provider</NavLink> </NavItem>
                        <NavItem><NavLink className="navItem" to="/guest_policy" activeClassName="active" tag={RRNavLink}>Our Policies</NavLink> </NavItem>
                        <NavItem><NavLink className="navItem" to="/guest_benefit" activeClassName="active" tag={RRNavLink}>Benefits</NavLink> </NavItem>
                        <NavItem><NavLink className="navItem" to="/auth/" activeClassName="active" tag={RRNavLink}>Login</NavLink> </NavItem>
                        <NavItem><NavLink className="navItem" to="/register" activeClassName="active" tag={RRNavLink}>Register</NavLink> </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </HeaderComponentStyleWrapper>
    );
};

export default HeaderComponent;