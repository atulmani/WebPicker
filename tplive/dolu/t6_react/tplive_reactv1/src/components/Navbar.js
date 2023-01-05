import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg sticky-top large ">
            <li className="navbar-brand" href="https://tplive.in">
                <img className="large" style={{ height: '50px' }} src="/img/TPLiVE_text_white.png" alt="TPLiVE" />
            </li>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div className="">

                </div>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <b></b>
                        <b></b>
                        <a className="nav-link"
                            href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA">
                            <span className="material-symbols-outlined">
                                redeem
                            </span>
                            <small>Events</small>
                        </a>
                    </li>
                    <li className="nav-item">
                        <b></b>
                        <b></b>
                        <a className="nav-link" href="https://tournamentplanner.in/screens/TPLive_Contactus.aspx">
                            <span className="material-symbols-outlined">
                                group_work
                            </span>
                            <small>Contact us</small>
                        </a>
                    </li>
                    <li className="nav-item">
                        <b></b>
                        <b></b>
                        <Link className="nav-link" to="/More">
                            <span className="material-symbols-outlined">
                                apps
                            </span>
                            <small>More</small>
                        </Link>
                    </li>
                </ul>

            </div>

        </nav>

    )
}
