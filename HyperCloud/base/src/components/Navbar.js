import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Navbar.css'
import Temple from '../assets/img/logo.png'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  function logoutSetPadding() {
    // props.setFlag(null);
    // console.log('in function logoutSetPadding', props.setFlag);    
    logout();
  }

  return (
    <nav className="navbar sticky-top">
      <ul>
        <li className="logo">
          <img src={Temple} alt="logo" />
          {/* <span>Hyper Cloud</span> */}
        </li>

        {user && (
          <li>
            <div className='navbar-notification-div'>
              <span className="material-symbols-outlined">
                notifications
              </span>
              <div></div>
            </div>
          </li>
        )}

        {/* {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )} */}

        {/* {user && (
          <li>
            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
            {isPending && <button className="btn" disabled>Logging out...</button>}
          </li>
        )} */}
      </ul>
    </nav >
  )
}
