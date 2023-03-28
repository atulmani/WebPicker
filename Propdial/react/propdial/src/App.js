// import logo from './logo.svg';
// import './App.css';
// import Navbar from './components/Navbar';
// import NavbarSide from './components/NavbarSide';
// import Footer from './components/Footer';
// import Login from './components/login/Login';
// import Profile from './components/login/Profile';
// import { UserAuthContextProvider } from './context/UserAuthcontext';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   // useLocation,
//   Link
// } from "react-router-dom";

// function App() {
//   return (
//     <>
//       <div className='App'>
//         <Router>

//           <UserAuthContextProvider>

//             <Navbar></Navbar>
//             <div className="row no-gutters">
//               <div className="col-lg-2 col-md-12 col-sm-12">
//                 <Routes>
//                   <Route exact path='/Login' element={<> </>} />

//                   <Route exact path='/*' element={<NavbarSide />} />

//                 </Routes>
//               </div>
//               <div className="col-lg-10 col-md-12 col-sm-12">

//                 <Routes>
//                   {/* <Route exact path='/Login' element={<Login />} /> */}
//                   <Route exact path='/Profile' element={<Profile />} />

//                 </Routes>
//               </div>

//               <div className="col-lg-12 col-md-12 col-sm-12">
//                 <Routes>

//                   <Route exact path='*' element={<Login />} />

//                 </Routes>

//               </div>
//             </div>
//             {/* <Profile></Profile> */}
//             <Footer></Footer>
//           </UserAuthContextProvider>
//         </Router>
//       </div>
//     </>
//   );
// }

import React from 'react';
import Signup from './components/login/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginEmail from './components/login/LoginEmail';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';

function App() {

  return (

    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }} >
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* <PrivateRoute path='/' Component={Dashboard}></PrivateRoute> */}

              <Route path='/' Component={Dashboard}></Route>
              <Route path='/profile' Component={Profile}></Route>
              {/* <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}

              {/* <Route path='/profile' element={<PrivateRoute Component={Profile} />}></Route> */}

              <Route path='/signup' Component={Signup}></Route>
              <Route path='/login' Component={LoginEmail}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container >

  )
}


export default App;
