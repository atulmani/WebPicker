import '../css/BottomBar.css'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class BottomBar extends Component {
    render() {
        return (
            <div className="small navbar-mobile-bottom">
                <div className="navbar-mobile-bottom-menu" id="divBottomNavBar">
                    <NavLink to="/" className="navbar-mobile-bottom-menu-a " activeclassname="active" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                        <small>Home</small>
                    </NavLink>
                    <NavLink to="/"
                        className="navbar-mobile-bottom-menu-a" activeclassname="active" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="material-symbols-outlined">
                            redeem
                        </span>
                        <small>Events</small>
                    </NavLink>
                    <Link to="/" >

                    </Link>
                    <a href="/" className="navbar-mobile-bottom-menu-a"
                        style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="material-symbols-outlined">
                            category
                        </span>
                        <small>Clubs</small>
                    </a>
                    {/* <Link to="/more" routerlinkactive="active" className="navbar-mobile-bottom-menu-a" style={{ display: 'flex', flexDirection: 'column' }}> */}
                    <NavLink to="/more" className="navbar-mobile-bottom-menu-a " activeclassname="active" style={{ display: 'flex', flexDirection: 'column' }}>

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
}
