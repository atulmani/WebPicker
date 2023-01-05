import '../src/css/App.css';
import BeforeNavbar from './components/BeforeNavbar';
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';
import HomePage from './components/HomePage';
import HPGenere from './components/HPGenere';
import HPGrowWithUs from './components/HPGrowWithUs';
import HPGameSection from './components/HPGameSection';
import PartnerSection from './components/PartnerSection';
import Footer from './components/Footer';
import Location from './components/Location';
import More from './components/More';
// 1.constructor
// 2.render
// 2.componentDidMount

function App() {
  return (
    <>
      <BeforeNavbar></BeforeNavbar>
      <Navbar></Navbar>
      <BottomBar></BottomBar>
      <HomePage></HomePage>
      {/* <Location /> */}
      {/* <More></More> */}
      <HPGenere></HPGenere>
      {/* <section> */}
      <HPGrowWithUs></HPGrowWithUs>
      {/* </section> */}
      <HPGameSection></HPGameSection>
      <PartnerSection></PartnerSection>
      {/* <Footer /> */}

    </>
  );
}

export default App;
