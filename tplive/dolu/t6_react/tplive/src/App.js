import logo from './logo.svg';
import './App.css';
import Navbar from './componants/Navbar';
import Header from './componants/Header';
import InputForm from './componants/InputForm';
import Footer from './componants/Footer';
import { useState } from 'react';
import Alert from './componants/Alert';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  return (
    <>
      <Navbar search="New Search" home="TPLive Home - Manu"></Navbar>
      <Header></Header>
      <Alert alert={alert}></Alert>
      <InputForm showAlert={showAlert}></InputForm>
      <Footer></Footer>

    </>
  );
}

export default App;
