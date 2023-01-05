import '../css/BeforeNavbar.css'
import React, { Component } from 'react'

export default class BeforeNavbar extends Component {
    render() {
        return (
            <div>
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
                        <a href="https://tournamentplanner.in/screens/TPLive_Contactus.aspx" style={{ margin: '0 5px' }}>
                            <button type="button" className="mybutton buttonTransparent" name="button">Corporate Events</button>
                        </a>

                        <a href="https://tournamentplanner.in/screens/TPLive_Contactus.aspx" style={{ margin: '0 5px' }}>
                            <button type="button" className="mybutton buttonTransparent" name="button">List Your Events</button>
                        </a>

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

                            <a
                                href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA">
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                            </a>

                            <a href="https://tournamentplanner.in/screens/TPLive_ProfileAUTH.aspx">
                                <span className="material-symbols-outlined">
                                    person
                                </span>
                            </a>

                            {/* <a href="JavaScript:askforNotification();" className="nav-location"> */}
                            <a href="/" className="nav-location" style={{ position: 'relative' }}>
                                <span className="material-symbols-outlined">
                                    notifications
                                </span>
                                <div className='notification-dot'></div>
                            </a>

                            <a href="location.html" className="nav-location">
                                <span className="material-symbols-outlined">
                                    add_location_alt
                                </span>

                                <small id="location">Location</small>
                            </a>

                        </div>

                    </div>
                </div>

            </div >
        )
    }
}
