import React from 'react'

export default function BottomBar() {
    return (
        <div className="small navbar-mobile-bottom">
            <div className="navbar-mobile-bottom-menu" id="divBottomNavBar">
                <a href="index.html" className="navbar-mobile-bottom-menu-a active" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        home
                    </span>
                    <small>Home</small>
                </a>
                <a href="https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA"
                    className="navbar-mobile-bottom-menu-a" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        redeem
                    </span>
                    <small>Events</small>
                </a>
                <a href="/" >

                </a>
                <a href="https://tournamentplanner.in/screens/TPLive_Orgs.aspx" className="navbar-mobile-bottom-menu-a"
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        category
                    </span>
                    <small>Clubs</small>
                </a>
                <a href="more.html" className="navbar-mobile-bottom-menu-a" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        apps
                    </span>
                    <small id='small4'>More</small>
                </a>
            </div>
            <a href="https://tournamentplanner.in/screens/TPLive_ProfileAUTH.aspx" className="new-user">
                <span className="material-symbols-outlined">
                    person
                </span>
            </a>
        </div >
    )
}
