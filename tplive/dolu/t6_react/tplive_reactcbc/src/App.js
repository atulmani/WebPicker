import '../src/css/App.css';
import React, { Component, useState, useEffect } from 'react';

import BeforeNavbar from './components/BeforeNavbar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import BottomBar from './components/BottomBar';
import HomePage from './components/HomePage';
import HPGenere from './components/HPGenere';
import HPGrowWithUs from './components/HPGrowWithUs';
import HPGameSection from './components/HPGameSection';
import PartnerSection from './components/PartnerSection';
import Footer from './components/Footer';
import Location from './components/Location';
import More from './components/More';
import EventDetails from './components/EventDetails';
import Login from './components/Login'
import HPLastSection from './components/HPLastSection';
import UserProfile from './components/UserProfile';
import PhoneSignUp from './components/PhoneSignUp';
import RegistrationCategory from './components/RegistrationCategory';
import { UserAuthContextProvider } from './context/UserAuthcontext';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import EventRegistration from './components/EventRegistration';
import RegisteredProfile from './components/RegisteredProfile';
// import { render } from '@testing-library/react';

// 1.constructor
// 2.render
// 2.componentDidMount


function App() {
  // class App extends Component() {
  const [city, setCity] = useState();
  useEffect(() => {
    setCity(window.localStorage.getItem('userLocation') ? window.localStorage.getItem('userLocation') : 'All');
  }, [city])

  return (
    <>

      <Router>
        <BeforeNavbar City={city} />
        <UserAuthContextProvider>
          <Routes>
            <Route exact path='/More' element={<Navbar isMore={true} />} />
            <Route path='*' element={<Navbar isMore={false} />} />
          </Routes>
          <Routes>
            <Route path='*' element={<NavbarMobile City={city}></NavbarMobile>} />
          </Routes>
          <BottomBar></BottomBar>
          <Routes>
            <Route exact path='/More' element={<More />} />
            <Route exact path='/Location' element={<Location City="All" />} />
            <Route exact path='/Event' element={<HomePage />} />
            <Route exact path='/EventDetails' element={<EventDetails eventID='2tqmnKdNy1TQzqaebQqa' />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/EventRegistration' element={<ProtectedRoute> <EventRegistration /> </ProtectedRoute>} />
            {/* <Route exact path='/PhoneSignUp' element={<PhoneSignUp url='EventRegistration' />} /> */}
            <Route exact path='/PhoneSignUp' element={<PhoneSignUp />} />
            <Route exact path='/UserProfile' element={<UserProfile />} />
            {/* <Route exact path='/RegisteredProfile' element={<ProtectedRoute> <RegisteredProfile /> </ProtectedRoute>} /> */}
            <Route exact path='/RegisteredProfile' element={<RegisteredProfile />} />
            {/* <Route exact path='/RegistrationCategory' element={<ProtectedRoute> <RegistrationCategory /> </ProtectedRoute>} /> */}
            <Route exact path='/RegistrationCategory' element={<RegistrationCategory />} />

            <Route path='/' element={<HomePage />} />


          </Routes>

          <HPGenere></HPGenere>
          <section>
            <HPGrowWithUs></HPGrowWithUs>
          </section>
          <HPGameSection></HPGameSection>
          <PartnerSection></PartnerSection>
          <Footer />
        </UserAuthContextProvider>
        {/* <HPLastSection></HPLastSection> */}
      </Router>
    </>
  );
}
export default App;
