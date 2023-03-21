import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import NavbarSide from './components/NavbarSide';
import Footer from './components/Footer';
import Login from './components/login/Login';
import Profile from './components/login/Profile';
import { UserAuthContextProvider } from './context/UserAuthcontext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
      <div className='App'>
        <Router>

          <UserAuthContextProvider>

            <Navbar></Navbar>
            <div className="row no-gutters">
              <div className="col-lg-2 col-md-12 col-sm-12">
                <Routes>
                  <Route exact path='/Login' element={<> </>} />

                  <Route exact path='/*' element={<NavbarSide />} />

                </Routes>
              </div>
              <div className="col-lg-10 col-md-12 col-sm-12">

                <Routes>
                  <Route exact path='/Login' element={<Login />} />
                  <Route exact path='/Profile' element={<Profile />} />
                  <Route exact path='*' element={<Login />} />

                </Routes>
              </div>
            </div>
            {/* <Profile></Profile> */}
            <Footer></Footer>
          </UserAuthContextProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
