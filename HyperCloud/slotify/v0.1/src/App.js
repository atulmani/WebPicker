import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// styles
import './App.css'

// pages & components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Profile from './pages/profile/Profile'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'
import { useState } from 'react'


function App() {
  const { authIsReady, user } = useAuthContext()
  const [sideNavbar, setSideNavbar] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(true);

  function openSideNavbar(flag) {
    setSideNavbar(flag);
  }

  function openOnlineUser(flag) {
    setOnlineUsers(flag);
  }

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar setFlag={openSideNavbar} />}

          <div className={sideNavbar ? 'full-content' : 'full-content sidebar-open'}>
            <Navbar />
            <div style={{ padding: '0 30px' }}>
              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/login" />}
                  {user && <Dashboard />}
                </Route>
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/bookings/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <Project />}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/" />}
                  {!user && <Login />}
                </Route>
                <Route path="/signup">
                  {user && user.displayName && <Redirect to="/" />}
                  {!user && <Signup />}
                </Route>
                <Route path="/profile">
                  {!user && <Redirect to="/" />}
                  {user && <Profile />}
                </Route>
              </Switch>
            </div>
          </div>
          {user && <OnlineUsers setFlag={openOnlineUser} />}
        </BrowserRouter>
      )
      }
    </div >
  );
}

export default App
