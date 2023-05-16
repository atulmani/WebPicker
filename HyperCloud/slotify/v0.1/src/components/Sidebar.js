import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import Avatar from "./Avatar"

// styles & images
import "./Sidebar.css"
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

export default function Sidebar(props) {
  const { user } = useAuthContext()

  const [sideNavbar, setSideNavbar] = useState(false);
  function openSideNavbar() {
    setSideNavbar(!sideNavbar);
    props.setFlag(sideNavbar);
  }

  return (
    <div className={sideNavbar ? 'sidebar open' : 'sidebar'}>
      <div className="sidebar-arrow" onClick={openSideNavbar}>
        <span class="material-symbols-outlined" style={{ transition: '1s', transform: sideNavbar ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          arrow_forward
        </span>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content-inner">
          <div className="user">
            <Avatar src={user.photoURL} />
            <p>Hey {user.displayName}</p>
            <Link to="/profile">Profile</Link>
          </div>
          <nav className="links">
            <ul>
              <li>
                <NavLink exact to="/">
                  <img src={DashboardIcon} alt="dashboard icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/create">
                  <img src={AddIcon} alt="add project icon" />
                  <span>New Booking</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
