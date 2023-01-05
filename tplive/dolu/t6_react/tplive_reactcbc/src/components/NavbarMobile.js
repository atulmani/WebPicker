import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavbarMobile extends Component {
    render() {
        return (
            <div className="small navbar-mobile sticky-top">
                <div className="navbar-mobile-menu">
                    <div className="" style={{ display: 'flex', alignItems: 'center' }}>


                        <a href="/">
                            <img style={{ height: '45p' }} src="/img/TPLiVE_text_white.png" alt="TPLiVE" />
                        </a>
                    </div>

                    <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                        <a href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA"
                            style={{
                                paddingRight: '10px'
                            }} >
                            <span className="material-symbols-outlined navbar-search-icon">
                                manage_search
                            </span>
                        </a>

                        {/* <a href="JavaScript:askforNotification();" style="position:relative;"> */}
                        <a href="/" style={{ position: 'relative' }}>

                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                            <div className="notification-dot"></div>
                        </a>

                        <Link to="/location" className="nav-location" style={{ height: '48px', color: '#fff;background:none' }}>
                            <span className="material-symbols-outlined">
                                add_location_alt
                            </span>

                            <small id="location1">Location</small>
                        </Link>
                    </div>

                </div>

            </div >

        )
    }
}
