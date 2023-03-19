import React from 'react';
import '../css/NavbarMobileBottom.css'

export default function NavbarMobileBottom() {
    return (
        

            <div className="small navbar-mobile-bottom">
                <div className="navbar-mobile-bottom-menu" id="divBottomNavBar">
                    <a href="/" className="navbar-mobile-bottom-menu-a " style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                        <small>Home</small>
                    </a>
                    <a href="/" className="navbar-mobile-bottom-menu-a " style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="material-symbols-outlined">
                            receipt_long
                        </span>
                        <small>List</small>
                    </a>
                    <a title="empty-space" href="/">

                    </a>
                    <a href="/" className="navbar-mobile-bottom-menu-a " style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="material-symbols-outlined">
                            person
                        </span>
                        <small>Owners</small>
                    </a>
                    <a href="/" className="navbar-mobile-bottom-menu-a" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="material-symbols-outlined">
                            handyman
                        </span>
                        <small>Enquiries</small>
                    </a>
                </div>
                <a className="new-user active" href="profile.html">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                </a>
            </div>

    )
}
