import './App.css';
// import CustomerDashboard from './pages/roles/customer/CustomerDashboard';
import CustomerServices from './pages/roles/customer/CustomerServices';
import CustomerServiceDetails from './pages/roles/customer/CustomerServiceDetails';

function App() {
  return (
    <>
      <CustomerServices></CustomerServices>
      <CustomerServiceDetails></CustomerServiceDetails>
      {/* <CustomerDashboard></CustomerDashboard> */}
    </>
  );
}

export default App;
