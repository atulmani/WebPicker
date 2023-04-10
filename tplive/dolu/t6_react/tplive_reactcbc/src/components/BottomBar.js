import '../css/BottomBar.css'
import React, { Component } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function BottomBar() {
    let location = useLocation();
    // console.log(location.pathname);

    return (
        <div className="small navbar-mobile-bottom">
            <div className="navbar-mobile-bottom-menu" id="divBottomNavBar">
                <NavLink to="/" className={(location.pathname === '/' || location.pathname === '/Home') ? "navbar-mobile-bottom-menu-a active" : "navbar-mobile-bottom-menu-a"} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        home
                    </span>
                    <small>Home</small>
                </NavLink>
                <NavLink to="/Event"
                    className={"navbar-mobile-bottom-menu-a "} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        redeem
                    </span>
                    <small>Events</small>
                </NavLink>
                <div  >

                </div>
                <NavLink to="/Event" className={(location.pathname === '/') ? "navbar-mobile-bottom-menu-a active" : "navbar-mobile-bottom-menu-a"}
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        category
                    </span>
                    <small>Clubs</small>
                </NavLink>
                {/* <Link to="/more" routerlinkactive="active" className="navbar-mobile-bottom-menu-a" style={{ display: 'flex', flexDirection: 'column' }}> */}
                <NavLink to="/More" className={(location.pathname === '/More') ? "navbar-mobile-bottom-menu-a active" : "navbar-mobile-bottom-menu-a"}
                    style={{ display: 'flex', flexDirection: 'column' }}>

                    <span className="material-symbols-outlined">
                        apps
                    </span>
                    <small id='small4'>More</small>
                </NavLink>
            </div>
            <Link to="/UserProfile" className="new-user">
                <span className="material-symbols-outlined">
                    person
                </span>
            </Link>
        </div >
    )
}
