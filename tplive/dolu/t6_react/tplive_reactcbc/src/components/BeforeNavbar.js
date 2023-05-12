
import '../css/BeforeNavbar.css'
import React, { Component, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function BeforeNavbar() {

    // const { state } = useLocation();
    // const { city } = state;

    const [city, setCity] = useState();
    useEffect(() => {
        setCity(window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All');
    }, [city])
    return (
        <div>
            {/* {console.log('in BeforeNavBar', city)} */}

            <div className="before-nav">

                <div className="icons">
                    <a style={{ fontsize: '0.9rem' }} href="https://www.facebook.com/TournamentPlanner/?ti=as"> <i
                        className="fab fa-facebook-f"></i> </a>
                    <a style={{ fontsize: '0.9rem' }} href="https://twitter.com/TPLIVE7/status/1144269372854288385?s=08"> <i
                        className="fab fa-twitter"></i> </a>
                    <a style={{ fontsize: '0.9rem' }} href="https://www.youtube.com/channel/UCNkSsrEoWHJ_eWvLSQiGNug"> <i
                        className="fab fa-youtube"></i> </a>
                    <a style={{ fontsize: '0.9rem' }} href="https://www.instagram.com/tplive.in/"> <i className="fab fa-instagram"></i> </a>
                </div>

                <div className="before-nav-content">
                    <Link to="/Event" style={{ margin: '0 5px' }}>
                        <button type="button" className="mybutton buttonTransparent" name="button">Corporate Events</button>
                    </Link>

                    <Link to="/Event" style={{ margin: '0 5px' }}>
                        <button type="button" className="mybutton buttonTransparent" name="button">List Your Events</button>
                    </Link>

                    <div className="before-nav-icons">

                        <a href="/">
                            <span style={{
                                position: 'absolute',
                                padding: '0',
                                marginLeft: '20px'
                            }} className="material-symbols-outlined">
                                segment
                            </span>
                            <span className="material-symbols-outlined">
                                favorite
                            </span>
                        </a>

                        <Link
                            to="/Event">
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </Link>


                        {/* <a
                            href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA">
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </a> */}

                        <Link to="/UserProfile">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                        </Link>

                        {/* <a href="JavaScript:askforNotification();" className="nav-location"> */}
                        <a href="/" className="nav-location" style={{ position: 'relative' }}>
                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                            <div className='notification-dot' style={{ right: '9px' }}></div>
                        </a>

                        <Link to="/Location" className="nav-location">
                            <span className="material-symbols-outlined">
                                add_location_alt
                            </span>

                            {/* <small id="location">{data ? data : 'All'}</small> */}
                            {/* <small id="location">{this.state ? this.state.City : 'All'}</small> */}
                            <small id="location">{window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All'}</small>

                        </Link>

                    </div>

                </div>
            </div>

        </div >
    )
}
