import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import home from './components/home';
import signUpUsingEmailPwd from './components/login/signUpUsingEmailPwd';
import signInUsingEmailPwd from './components/login/signInUsingEmailPwd';
import adminDashboard from './components/admin/adminDashboard';
import userProfile from './components/login/userProfile';
import memberDashboard from './components/member/memberDashboard';

function App() {

  return (

    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }} >
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/' Component={home}></Route>
              <Route path='/signup' Component={signUpUsingEmailPwd}></Route>
              <Route path='/signin' Component={signInUsingEmailPwd}></Route>
              <Route path='/profile' Component={userProfile}></Route>
              <Route path='/admin' Component={adminDashboard}></Route>
              <Route path='/member' Component={memberDashboard}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container >

  )
}


export default App;
