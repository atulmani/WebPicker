import React, { useState } from 'react';
import '../css/Navbar.css';
import NavbarSide from './NavbarSide';

export default function Navbar(props) {
    // const [showFlag, setShowFlag] = useState(false);
    function openSideNavbar() {
        // setShowFlag(true)
        // window.localStorage.setItem('sideNavBar',true);
        // window.show = true;
        props.setNVFlag(true);
        // console.log(window.show , 'window.show');
    }
    // function closeSideNavbar(){
    //     setShowFlag(false)
    // }

    // function sideNavbarActive(){
    //     console('clicked');
    // }

    return (
        <>

            <nav className="navbar navbar-expand-lg sticky-top large">
                <a title="navbar-logo" className="navbar-brand" href="#banner">
                    <img style={{ height: '60px' }} src="./img/logo.png" alt="" />
                    <h1 className="navbar-text">Maharana Pratap Siksha Parishad</h1>
                </a>
                <button title="hamberIcon" className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" style={{ position: 'absolute', right: '20px' }} id="collapsibleNavbar">

                    <div className="navbar-tabs">
                        <div>
                            <h1><strong>Branch :</strong> Golghar Gorakhpur</h1>
                        </div>
                        <div>
                            <h1><strong>Session :</strong> </h1>
                            <select title="dateRange" name="dateRange">
                                <option value="2021-22">2021-2022</option>
                                <option value="2022-23">2022-2023</option>
                            </select>
                        </div>
                        <div>
                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                            <span className="material-symbols-outlined">
                                mail
                            </span>
                            <a href="profile.html" className="navbar-profile-icon">
                                <h2>KS</h2>
                            </a>
                        </div>
                    </div>


                </div>

            </nav>

            <div className="small navbar-mobile" style={{ padding: '0 10px' }}>
                <div className="navbar-mobile-menu">
                    {/* <div id="hamberIcon"> */}
                    <div id="hamberIcon" onClick={openSideNavbar}>
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                    </div>
                    <a title="navbar-mobile-logo" href="/">
                        <img style={{ height: '40px', position: 'relative', top: '4px' }} src="./img/logo.png" alt="" />
                    </a>

                    <a href="notification/index.html"
                        style={{ paddingRight: '10px', position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                        <span className="material-symbols-outlined">
                            notifications
                        </span>
                        <div className="notification-count">

                        </div>
                    </a>

                </div>

            </div >

        </>
    )
}
