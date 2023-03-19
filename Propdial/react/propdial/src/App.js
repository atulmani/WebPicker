import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/login/Login';

function App() {
  return (
    <>
      <div className='App'>

        <Navbar></Navbar>
        <Login></Login>
        <Footer></Footer>

      </div>
    </>
  );
}

export default App;
