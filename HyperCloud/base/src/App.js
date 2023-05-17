import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useEffect, useState } from 'react'

// components
import Navbar from './components/Navbar'
import SidebarNew from './components/SidebarNew'
import NavbarBottom from './components/NavbarBottom'

// pages
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard'
import UserDashboard from './pages/dashboard/UserDashboard'
import AddProperty from './pages/property/AddProperty'
import Property from './pages/property/Property'
// import OnlineUsers from './components/OnlineUsers'

// styles
import './App.css'
import UpdatePassword from './pages/login/UpdatePassword'
import AdminSettings from './pages/settings/AdminSettings'

function App() {
  const { authIsReady, user } = useAuthContext();
  const [sideNavbar, setSideNavbar] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState(true);

  function openSideNavbar(flag) {
    // console.log('opensidenavbar flag in aap.js : ', flag);
    setSideNavbar(flag);
  }
  console.log('user in App.js', user)

  useEffect(() => {
    if (user && user.roles && user.roles.includes('user')) {
      setSideNavbar(null);
    } else if (user && user.roles && user.roles.includes('admin')) {
      setSideNavbar(true);
    } else if (user && user.roles && user.roles.includes('superadmin')) {
      setSideNavbar(true);
    } else {
      setSideNavbar(null);
    }
    // console.log('user in useEffect App.js:', user);
  }, [user])

  // console.log('user in App:', user);

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {/* {user && <Sidebar setFlag={openSideNavbar} />} */}
          <Navbar />
          {/* <Navbar setFlag={openSideNavbar} /> */}


          {user && user.roles && (user.roles.includes('admin') || user.roles.includes('superadmin')) && <SidebarNew setFlag={openSideNavbar}></SidebarNew>}


          <div className={sideNavbar === true ? 'full-content' : sideNavbar === false ? 'full-content sidebar-open' : sideNavbar === null ? 'full-content no-sidebar' : ''}>
            {/* <div style={{ padding: '0 10px 0 30px' }}> */}
            <Routes>

              <Route path='/adminsettings' element={<AdminSettings />}>
              </Route>

              <Route path='/updatepwd' element={user ? < UpdatePassword /> : <Login />}>
              </Route>

              <Route path='/' element={user ? < Profile /> : <Login />}>
              </Route>

              <Route exact path="/superadminDashboard" element={
                user && user.roles && user.roles.includes('superadmin') ? <SuperAdminDashboard /> : <Navigate to="/login" />
              }>
              </Route>

              <Route path="/adminDashboard" element={
                user && user.roles && user.roles.includes('admin') ? < AdminDashboard /> : <Navigate to="/login" />
              }>
              </Route>

              <Route path="/addproperty" element={
                user && user.roles && user.roles.includes('admin') ? < AddProperty /> : <Navigate to="/login" />
              }>
              </Route>

              <Route path="/properties/:id" element={
                user && user.roles ? < Property /> : <Navigate to="/login" />
              }>
              </Route>

              <Route path="/userDashboard" element={
                user && user.roles && user.roles.includes('user') ? < UserDashboard /> : <Navigate to="/login" />
              }>
              </Route>

              {/* <Route path="/properties/:id">
                  {!user && <Login />}
                  {user && <Property />}
                </Route> */}


              {/* <Route path="/create">
                  {!user && <Navigate to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/projects/:id">
                  {!user && <Navigate to="/login" />}
                  {user && <Project />}
                </Route> */}


              <Route path='/login' element={user ? <Navigate to="/" /> : < Login />}>
              </Route>
              <Route path='/signup' element={user ? <Navigate to="/" /> : < Signup />}>
              </Route>
              <Route path='/profile' element={user ? < Profile /> : < Login />}>
              </Route>


              {/* <Route path="/login">
                  {user && <Navigate to="/" />}
                  {!user && <Login />}
                </Route>
                <Route path="/signup">
                  {user && user.displayName && <Navigate to="/" />}
                  {!user && <Signup />}
                </Route>
                <Route path="/profile">
                  {!user && <Navigate to="/" />}
                  {user && <Profile />}
                </Route> */}
            </Routes>
            {/* </div> */}
          </div>
          {/* {user && user.roles && user.roles.includes('admin') && <OnlineUsers setFlag={openOnlineUser} />} */}


          {user && <NavbarBottom></NavbarBottom>}

        </BrowserRouter>
      )
      }
      <br /><br /><br />
    </div >
  );
}

export default App
