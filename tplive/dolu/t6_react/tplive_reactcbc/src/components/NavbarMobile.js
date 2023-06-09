import '../css/NavbarMobile.css';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavbarMobile extends Component {
    constructor(props) {

        // console.log('in set constructore from BeforeNavbar ', props)
        super(props);
        // this.setState({
        //     City: localStorage.getItem("userLocation") ? localStorage.getItem("userLocation") : 'All'
        // })
    }
    render() {
        return (
            <div className="small navbar-mobile sticky-top">
                <div className="navbar-mobile-menu">
                    <div className="" style={{ display: 'flex', alignItems: 'center' }}>


                        <Link to="/">
                            <img style={{ height: '45px' }} src="/img/TPLiVE_text_white.png" alt="TPLiVE" />
                        </Link>
                    </div>

                    <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/Event"
                            style={{
                                paddingRight: '10px'
                            }} >
                            <span className="material-symbols-outlined navbar-search-icon">
                                manage_search
                            </span>
                        </Link>

                        {/* <a href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA"
                            style={{
                                paddingRight: '10px'
                            }} >
                            <span className="material-symbols-outlined navbar-search-icon">
                                manage_search
                            </span>
                        </a> */}

                        {/* <a href="JavaScript:askforNotification();"> */}
                        <a href="/" style={{ position: 'relative' }}>

                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                            <div className="notification-dot"></div>
                        </a>

                        <Link to="/Location" className="nav-location" style={{ height: '48px', color: '#fff;background:none' }}>
                            <span className="material-symbols-outlined">
                                add_location_alt
                            </span>

                            <small id="location1">{window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All'}</small>
                        </Link>
                    </div>

                </div>

            </div >

        )
    }
}
