import React from 'react';
import '../css/Navbar.css';

export default function Navbar() {
    return (
        <>

            <nav className="navbar navbar-expand-lg sticky-top large ">
                <a className="navbar-brand" href="#banner">
                    <img style={{ height: '60px' }} src="../img/logo.png" alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" style={{ position: 'absolute', right: '20px' }} id="collapsibleNavbar">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/admin/dashboard.html">
                                <span className="material-icons-outlined">
                                    home
                                </span>
                                <small>Home</small>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admin/propertyList.html">
                                <span className="material-symbols-outlined">
                                    groups
                                </span>
                                <small>About Us</small>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="search.html">
                                <span className="material-icons-outlined">
                                    call
                                </span>
                                <small>Contact Us</small>
                            </a>
                        </li>

                    </ul>

                </div>

            </nav>


            <div className="small navbar-mobile" style={{ padding: '0 10px' }}>
                <div className="navbar-mobile-menu">
                    <a href="/" id="hamberIcon">
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                    </a>
                    <a href="/">
                        <img style={{ height: '40px', position: 'relative', top: '4px' }} src="../img/logo.png" alt="" />
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