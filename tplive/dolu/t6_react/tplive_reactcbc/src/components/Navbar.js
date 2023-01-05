import '../css/Navbar.css'
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg sticky-top large ">
                <a className="navbar-brand" href="https://tplive.in">
                    <img className="large" style={{ height: '50px' }} src="/img/TPLiVE_text_white.png" alt="TPLiVE" />
                </a>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse large" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="">

                    </div>
                    <ul className="nav navbar-nav large" >
                        {/* <li className="nav-item active">
                            <b></b>
                            <b></b>
                            <a className="nav-link" href="index.html">
                                <span className="material-symbols-outlined">
                                    home
                                </span>
                                <small>Home</small>
                            </a>
                        </li> */}
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
                            <a className="nav-link" href="more.html">
                                <span className="material-symbols-outlined">
                                    apps
                                </span>
                                <small>More</small>
                            </a>
                        </li>
                    </ul>

                </div>

            </nav>

            // <nav className="navbar navbar-expand-lg sticky-top large">
            //     <div className="navbar-brand" href="https://tplive.in">
            //         <img className="large" style={{ height: '50px' }} src="/img/TPLiVE_text_white.png" alt="TPLiVE" />
            //     </div>
            //     {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            //         <span className="navbar-toggler-icon"></span>
            //     </button> */}
            //     <div className="collapse navbar-collapse" style={{
            //         display: 'flex',
            //         justifyContent: 'space-between'
            //     }}>
            //         <div className="">

            //         </div>
            //         <ul className="nav navbar-nav">
            //             <li className="nav-item">
            //                 <b></b>
            //                 <b></b>
            //                 <a className="nav-link"
            //                     href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA">
            //                     <span className="material-symbols-outlined">
            //                         redeem
            //                     </span>
            //                     <small>Events</small>
            //                 </a>
            //             </li>
            //             <li className="nav-item">
            //                 <b></b>
            //                 <b></b>
            //                 <a className="nav-link" href="https://tournamentplanner.in/screens/TPLive_Contactus.aspx">
            //                     <span className="material-symbols-outlined">
            //                         group_work
            //                     </span>
            //                     <small>Contact us</small>
            //                 </a>
            //             </li>
            //             <li className="nav-item">
            //                 <b></b>
            //                 <b></b>
            //                 <a className="nav-link" href='/'>
            //                     <span className="material-symbols-outlined">
            //                         apps
            //                     </span>
            //                     <small>More</small>
            //                 </a>
            //             </li>
            //         </ul>

            //     </div>

            // </nav>
        )
    }
}
