// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import NavbarMobileBottom from './components/NavbarMobileBottom';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Wallet from './components/Wallet';
import NavbarSide from './components/NavbarSide';
import { useState } from 'react';

function App() {
  const [showSideNavbar, setShowSideNavbar] = useState(false);

  function setNVFlag(flag){
    setShowSideNavbar(flag);
  }
  return (
    <>
      <div className="App">

        {/* <Router>
          <Routes> */}

            <Navbar setNVFlag={setNVFlag} ></Navbar>
            <NavbarMobileBottom></NavbarMobileBottom>

            <div id="fullContent" className="row no-gutters">

              <div className="col-lg-2">
                  <NavbarSide setNVFlag={setNVFlag} showSideNavbar={showSideNavbar}></NavbarSide>

              </div>

              <div className="col-lg-10">
              <Profile></Profile>
              </div>
            
            {/* <ProfileEdit></ProfileEdit> */}
            {/* <Wallet></Wallet> */}
            {/* <Route exact path="/Wallet" element={<Wallet></Wallet>}></Route>
            <Route exact path="/" element={<Profile></Profile>}></Route>
            
          </Routes>
        </Router> */}
        </div>
      </div>

     
    </>
  );
}

export default App;
