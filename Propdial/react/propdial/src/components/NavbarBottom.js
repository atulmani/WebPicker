import React from 'react'
import { Link } from 'react-router-dom'

import './NavbarBottom.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function NavbarBottom() {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const showProfile = () => {
        navigate("/profile")
    }

    const showDashboard = () => {
        if (user && user.roles && user.roles.includes('superadmin')) {
            // console.log('in superadmin', user.roles)
            navigate('/superadmindashboard')
        }

        if (user && user.roles && user.roles.includes('admin')) {
            // console.log('in admin', user.roles)
            navigate('/admindashboard')
        }

        if (user && user.roles && user.roles.includes('owner')) {
            // console.log('in user', user.roles)
            navigate('/ownerdashboard')
        }

        if (user && user.roles && user.roles.includes('tenant')) {
            // console.log('in user', user.roles)
            navigate('/tenantdashboard')
        }
        if (user && user.roles && user.roles.includes('executive')) {
            // console.log('in user', user.roles)
            navigate('/executivedashboard')
        }
    }

    //Menus as per roles
    let firstMenu = 'Dashboard' //This is for all user type
    let secondMenu = ''
    let thirdMenu = ''
    let fourthMenu = ''
    if (user && user.roles && user.roles.includes('superadmin')) {
        secondMenu = 'Properties'
        thirdMenu = 'Users'
        fourthMenu = 'More'
    }
    if (user && user.roles && user.roles.includes('admin')) {
        secondMenu = 'Properties'
        thirdMenu = 'Users'
        fourthMenu = 'More'
    }
    if (user && user.roles && user.roles.includes('owner')) {
        secondMenu = 'Bills'
        thirdMenu = 'Tickets'
        fourthMenu = 'More'
    }
    if (user && user.roles && user.roles.includes('tenant')) {
        secondMenu = 'Rent'
        thirdMenu = 'Tickets'
        fourthMenu = 'More'
    }
    if (user && user.roles && user.roles.includes('executive')) {
        secondMenu = 'Bills'
        thirdMenu = 'Tickets'
        fourthMenu = 'More'
    }


    return (
        <div className="small navbar-mobile-bottom">
            <div className="navbar-mobile-bottom-menu" id="divBottomNavBar">
                <div className="navbar-mobile-bottom-menu-a"
                    style={{ display: 'flex', flexDirection: 'column' }} onClick={showDashboard} >
                    <span className="material-symbols-outlined">
                        home
                    </span>
                    <small>Dashboard</small>
                </div>
                <Link to="/" className="navbar-mobile-bottom-menu-a "
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        analytics
                    </span>
                    <small>{secondMenu}</small>
                </Link>
                <a href="/">
                </a>
                <Link to="/" className="navbar-mobile-bottom-menu-a " style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        confirmation_number
                    </span>
                    <small>{thirdMenu}</small>
                </Link>
                <Link to="/" className="navbar-mobile-bottom-menu-a" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="material-symbols-outlined">
                        article
                    </span>
                    <small>{fourthMenu}</small>
                </Link>
            </div>
            <Link to="/profile" className="new-user " >
                <span className="material-symbols-outlined">
                    person
                </span>
            </Link>
        </div>
    )
}
