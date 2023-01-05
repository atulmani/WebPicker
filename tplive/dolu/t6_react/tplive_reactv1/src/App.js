// import logo from './logo.svg';
import './App.css';
import BeforeNavbar from './components/BeforeNavbar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import BottomBar from './components/BottomBar'
import HomePage from './components/HomePage';
import More from './components/More';


import GenereHP from './components/GenereHP';
import {
  BrowserRouter as Router,
  Switch, Routes, Route, Link
} from "react-router-dom";

import BeforeFooter from './components/BeforeFooter';
import GameSection from './components/GameSection';
import PartnerSection from './components/PartnerSection';
import Footer from './components/Footer';
import Location from './components/Location'

function App() {
  return (

    <>
      <Router>
        <section style={{ background: 'linear-gradient(#333C5D 95%,rgba(0,0,0,0))' }}>

          <BeforeNavbar />
          <Navbar></Navbar>
          <NavbarMobile></NavbarMobile>
          <BottomBar />
          <Routes>
            <Route exact path='/' component={HomePage}>
            </Route>

          </Routes>
          {/* <HomePage></HomePage> */}

        </section>
        <Routes>
          <Route exact path='/More' component={More}>

          </Route>
          <Route exact path='/Location' component={Location}>

          </Route>

        </Routes>
      </Router>
      {/* <More></More> */}
      <Location></Location>
      <GenereHP></GenereHP>
      <section>
        <BeforeFooter></BeforeFooter>
      </section>
      <GameSection></GameSection>
      <PartnerSection></PartnerSection>
      <Footer></Footer>

    </>
  );
}

export default App;

// $(document).ready(function () {
//   var bigimage = $("#big");
//   var thumbs = $("#thumbs");
//   // var totalslides = 4;
//   var syncedSecondary = true;

//   bigimage
//     .owlCarousel({
//       items: 1,
//       // slideSpeed: 2000,
//       smartSpeed: 3000,

//       autoplayTimeout: 20000,
//       nav: true,
//       autoplay: true,
//       dots: false,
//       loop: true,
//       responsiveRefreshRate: 200,
//       margin: 10,
//       stagePadding: 30,
//       navText: [
//         '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
//         '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
//       ]
//     })
//     .on("changed.owl.carousel", syncPosition);

//   thumbs
//     .on("initialized.owl.carousel", function () {
//       thumbs
//         .find(".owl-item")
//         // .first()
//         .eq(0)
//         .addClass("current");
//       // console.log(thumbs.find(".owl-item")
//       // .eq(0));
//     })
//     .owlCarousel({
//       dots: false,
//       nav: false,
//       smartSpeed: 3000,
//       // loop: true,
//       // rewind: true,
//       // slideSpeed: 500,
//       autoplayTimeout: 20000,
//       margin: 0,
//       stagePadding: 30,
//       autoplay: true,
//       responsiveRefreshRate: 200,
//       navText: [
//         '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
//         '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
//       ],
//       responsive: {
//         0: {
//           items: 2,
//           slideby: 2
//         },
//         600: {
//           items: 4,
//           slideby: 4
//         },
//         1000: {
//           items: 6,
//           slideby: 6
//         },
//         1400: {
//           items: 8,
//           slideby: 8
//         }
//       },
//     })
//     .on("changed.owl.carousel", syncPosition2);
//   var prePosition = -1;
//   var firstPosition = -1;
//   function syncPosition(el) {
//     // console.log('in syncPosition');
//     //if loop is set to false, then you have to uncomment the next line
//     var current = el.item.index;
//     var count = el.item.count - 1;
//     // console.log(el);
//     var tCode = "";
//     var thumbIndex = 0;
//     // console.log('prePosition : ' + prePosition + ' :: current : '+ current );
//     // var tCount = bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes.length ;
//     // console.log(tCount);
//     if (current != null) {
//       tCode = bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[current].childNodes[0].classList[1];
//       for (j = 0; j < thumbs.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes.length; j++) {
//         if (!thumbs.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[j].classList.contains('cloned')) {
//           if (thumbs.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[j].childNodes[0].classList[1] === tCode) {
//             thumbIndex = j;
//             if (firstPosition === -1) {
//               firstPosition = thumbIndex;
//             }
//             break;
//           }
//         }
//       }
//       // console.log('=prePosition : ' + prePosition + ' :: current : '+ current + ' :: thumbIndex :' + thumbIndex +" :: tCode : " + tCode);
//       // if(current != null && prePosition > current )
//       // {
//       // //  syncedSecondary = false;
//       //   //current = 0;
//       //   thumbIndex = firstPoition;
//       //
//       // }
//       // else {
//       //   syncedSecondary = true;
//       // }
//       // prePosition = current;
//     } else {
//       // prePosition = 0;

//     }
//     //current = current - 1;
//     // if(thumbIndex < 0 )
//     // {
//     //   thumbIndex = count;
//     // }
//     // console.log('thumbIndex :: ' ,thumbIndex);
//     // if(thumbIndex >= count )
//     // {
//     //   thumbIndex = 0;
//     // }

//     thumbs
//       .find(".owl-item")
//       .removeClass("current")
//       .eq(thumbIndex)
//       .addClass("current");
//     //.addClass("active");

//     //  thumbs.data("owl.carousel").to(thumbIndex, 100, true);

//     var onscreen = thumbs.find(".owl-item.active").length - 1;
//     var start = thumbs
//       .find(".owl-item.active")
//       .first()
//       .index();

//     var end = thumbs
//       .find(".owl-item.active")
//       .last()
//       .index();
//     // console.log('thumbIndex : '+ thumbIndex + " :: firstPosition : " + firstPosition + " :: start : " + start + " :: end : " + end );
//     // console.log('thumbIndex : '+ thumbIndex + " :: start : " + start + " :: end : " + end );
//     if (thumbIndex === firstPosition) {
//       thumbs.data("owl.carousel").to(0, 100, true);
//     }
//     else if (thumbIndex > end) {
//       thumbs.data("owl.carousel").to(thumbIndex, 100, true);
//     }
//     else if (thumbIndex < start) {
//       // syncedSecondary=false;
//       thumbs.data("owl.carousel").to(thumbIndex - onscreen, 100, true);
//       // thumbs.data("owl.carousel").to(0, 100, true);
//     }
//   }

//   function syncPosition2(el) {
//     // console.log('in syncPosition2');
//     var number = el.item.index;
//     // console.log('number : ', number, ":: syncedSecondary" , syncedSecondary);
//     // console.log(el);

//     ////
//     if (number != null) {
//       // console.log(number);
//       var thumbList = thumbs.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[number];
//       // console.log(thumbList);
//       var tCode = thumbList.firstChild.classList[1];
//       // console.log(tCode);
//       var bigList = bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild;
//       var bigIndex = 0;
//       for (j = 0; j < bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes.length; j++) {
//         if (!bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[j].classList.contains('cloned')) {
//           if (bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[j].childNodes[0].classList[1] === tCode) {
//             bigIndex = j;

//             break;
//           }
//         }
//       }
//       // console.log(bigIndex);
//       bigimage
//         .find(".owl-item")
//         .removeClass("active")
//         .eq(bigIndex)
//         .addClass("active");
//     }
//     else {
//       if (syncedSecondary) {
//         bigimage.data("owl.carousel").to(number, 100, true);
//         // bigimage.data("owl.carousel").to(0, 100, true);
//       }
//     }
//     /////


//     // else{
//     //   // bigimage.data("owl.carousel").to(0, 100, true);
//     // }
//   }

//   thumbs.on("click", ".owl-item", function (e) {
//     e.preventDefault();
//     var number = $(this).index();
//     if (number != 0)
//       bigimage.data("owl.carousel").to(number, 300, true);
//   });


// });
