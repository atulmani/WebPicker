// Ristrict mouse right click - start

// With jQuery
// $(document).on({
//     "contextmenu": function(e) {
//         console.log("ctx menu button:", e.which);
//
//         // Stop the context menu
//         e.preventDefault();
//     },
//     // "mousedown": function(e) {
//     //     console.log("normal mouse down:", e.which);
//     // },
//     // "mouseup": function(e) {
//     //     console.log("normal mouse up:", e.which);
//     // }
// });

// Ristrict mouse right click - end

// Collapse Navbar toggle menu after clicking on menu items - Start
// $(document).on('click', function() {
//   $('.collapse').collapse('hide');
// });
// Collapse Navbar toggle menu after clicking on menu items - End


// Menu's nav-link highlighted those are active - start
$(".nav .nav-link").on("click", function() {
  $(".nav").find(".active").removeClass("active");
  $(this).addClass("active");
});

function btclr() {
  srchcl.style.background = "#348DCB";
}

document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
}, false);

// Menu's nav-link highlighted those are active - end

// fixed-top or sticky-top navbar background change on windows scrolling - start
// $(window).scroll(function(){
//     var scroll = $(window).scrollTop();
//     if(scroll < 70){
//         $('.sticky-top').removeClass("sticky");
//     } else{
//         $('.sticky-top').addClass("sticky");
//     }
// });
// fixed-top or sticky-top navbar background change on windows scrolling - end



// jQuery(document).ready(function(){
//
//     $('#videolink').magnificPopup({
//         type:'inline',
//         midClick:true
//
//     });
// });

// $(function () {
//     $("#team-members").owlCarousel({
//         items: 2,
//         autoplay: true,
//         smartSpeed: 700,
//         loop: true,
//         autoplayHoverPause: true,
//         nav: true,
//         dots: false,
//         responsive: {
//             0: {
//                 items: 1
//             },
//             480: {
//                 items: 2
//             }
//         }
//     });
// });
//
// $(function () {
//
//     $("#progress-elements").waypoint(function () {
//
//         $(".progress-bar").each(function () {
//
//             $(this).animate({
//                 width: $(this).attr("aria-valuenow") + "%"
//             }, 2000);
//
//         });
//
//         this.destroy();
//     }, {
//         offset: 'bottom-in-view'
//     });
//
//
// });

// $(document).ready(function(){
//     $("#testimonial-slider").owlCarousel({
//        items:1,
//         itemsDesktop:[1000,1],
//         itemsDesktopSmall:[979,1],
//         itemsTablet:[768,1],
//         pagination:true,
//         autoPlay:false
//
//     });
//    $('.count').counterUp({
//               delay: 10,
//               time: 4000
//           });
// });
// $(document).ready(function() {
//   var owl = $('#patners');
//   owl.owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 8500,
//     autoplayHoverPause: true,
//     nav: false,
//     // dots:true,
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 2
//       },
//       1000: {
//         items: 4
//       }
//     }
//   });
// });

// $(document).ready(function() {
//   var owl = $('#genre-list');
//   owl.owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: 2000,
//     smartSpeed: 3000,
//     autoplayTimeout: 2500,
//     autoplayHoverPause: true,
//     nav: false,
//     stagePadding: 60,
//     dots: false,
//     responsive: {
//       0: {
//         items: 3,
//         margin: 120
//
//       },
//       600: {
//         items: 4,
//         margin: 10
//       },
//       1000: {
//         items: 6
//       }
//     }
//   });
// });
//
// $(document).ready(function() {
//   var owl = $('#designs-list');
//   owl.owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 8500,
//     autoplayHoverPause: true,
//     nav: false,
//     // dots:true,
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 2
//       },
//       1000: {
//         items: 4
//       }
//     }
//   });
// });
//
// $(document).ready(function() {
//   var owl = $('#partners-carousel');
//   owl.owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 3000,
//     autoplayHoverPause: false,
//     nav: false,
//     dots: false,
//     center: true,
//     responsive: {
//       0: {
//         items: 2
//       },
//       600: {
//         items: 3
//       },
//       1000: {
//         items: 5
//       }
//     }
//   });
// });


//
// $(document).ready(function() {
//   var owl = $('#clients-list');
//   owl.owlCarousel({
//     margin: 80,
//     nav: true,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 4000,
//     autoplayHoverPause: false,
//     nav: false,
//     // dots:true,
//     responsive: {
//       0: {
//         items: 2
//       },
//       600: {
//         items: 3
//       },
//       1024: {
//         items: 4
//       }
//     }
//   });
// });
//
// $(document).ready(function() {
//   var owl = $('#banner-list');
//   owl.owlCarousel({
//     margin: 10,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 2000,
//     autoplayHoverPause: false,
//     nav: false,
//     dots: false,
//     // opacity: 0.1,
//     stagePadding: 70,
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 2
//       },
//       1000: {
//         items: 3
//       }
//     }
//   });
// });
//
// $(document).ready(function() {
//   var owl = $('#event-list');
//   owl.owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 3500,
//     autoplayHoverPause: true,
//     nav: false,
//     // dots:true,
//     stagePadding: 70,
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 2
//       },
//       1000: {
//         items: 6
//       }
//     }
//   });
// });
//
// $(document).ready(function() {
//   var owl = $('#olist');
//   owl.owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 3500,
//     autoplayHoverPause: true,
//     nav: false,
//     // dots:true,
//     stagePadding: 70,
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 2
//       },
//       1000: {
//         items: 6
//       }
//     }
//   });
// });


//
// $(document).ready(function() {
//   var owl = $('#allevent-list');
//   owl.owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 3500,
//     autoplayHoverPause: true,
//     nav: false,
//     // dots:true,
//     stagePadding: 70,
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 2
//       },
//       1000: {
//         items: 6
//       }
//     }
//   });
// });
