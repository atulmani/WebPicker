import '../css/Navbar.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'



export default function Navbar(props) {


    return (
        <nav className="navbar navbar-expand-lg sticky-top" >
            {/* {console.log(props.isFlag)} */}
            <Link className="navbar-brand" to="/">
                <img className="large" style={{ height: '50px' }} src="/img/TPLiVE_text_white.png" alt="TPLiVE" />
            </Link>
            <div className="collapse navbar-collapse" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="">

                </div>
                <ul className="nav navbar-nav" >

                    {props.isFlag !== 'home' && <li className="nav-item">
                        <b></b>
                        <b></b>
                        <Link className="nav-link " style={{ color: '#fff' }} to="/">

                            <span className="material-symbols-outlined">
                                home
                            </span>
                            <small>Home</small>
                        </Link>
                    </li>}
                    {props.isFlag !== 'event' && <li className="nav-item">
                        <b></b>
                        <b></b>
                        <Link className="nav-link"
                            to="/Event">
                            <span className="material-symbols-outlined">
                                redeem
                            </span>
                            <small>Events</small>
                        </Link>
                        {/* <a className="nav-link"
                            href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA">
                            <span className="material-symbols-outlined">
                                redeem
                            </span>
                            <small>Events</small>
                        </a> */}

                        <Link className="nav-link"
                            to="/Event">
                            <span className="material-symbols-outlined">
                                category
                            </span>
                            <small>Clubs</small>
                        </Link>
                        {/* <a className="nav-link"
                            href="https://tournamentplanner.in/screens/TPLive_Orgs.aspx">
                            <span className="material-symbols-outlined">
                                category
                            </span>
                            <small>Clubs</small>
                        </a> */}


                    </li>}
                    {(props.isFlag !== 'contactus') && <li className="nav-item">
                        <b></b>
                        <b></b>
                        <Link className="nav-link" to="/ContactUs">
                            <span className="material-symbols-outlined">
                                group_work
                            </span>
                            <small>Contact us</small>
                        </Link>
                    </li>}

                    {(props.isFlag !== 'more') && <li className="nav-item">
                        <b></b>
                        <b></b>
                        <Link className="nav-link " style={{ color: '#fff' }} to="/more">

                            <span className="material-symbols-outlined">
                                apps
                            </span>
                            <small>More</small>
                        </Link>
                    </li>}

                </ul>

            </div>

        </nav>

    )
}
