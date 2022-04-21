// Ristrict mouse right click - start
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);

// With jQuery
$(document).on({
    "contextmenu": function(e) {
        console.log("ctx menu button:", e.which);

        // Stop the context menu
        e.preventDefault();
    },
    "mousedown": function(e) {
        console.log("normal mouse down:", e.which);
    },
    "mouseup": function(e) {
        console.log("normal mouse up:", e.which);
    }
});

// Ristrict mouse right click - end

// Collapse Navbar toggle menu after clicking on menu items - Start
$(document).on('click', function() {
  $('.collapse').collapse('hide');
});
// Collapse Navbar toggle menu after clicking on menu items - End


// Menu's nav-link highlighted those are active - start
  $(".nav .nav-link").on("click", function() {
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
  });
  // Menu's nav-link highlighted those are active - end

  // fixed-top or sticky-top navbar background change on windows scrolling - start
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll < 70){
            $('.sticky-top').removeClass("sticky");
        } else{
            $('.sticky-top').addClass("sticky");
        }
    });
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

  $(document).ready(function() {
    var owl = $('#vehicle-list');
    owl.owlCarousel({
      margin: 20,
      loop: false,
      autoplay: false,
      smartSpeed: 1000,
      // autoplayTimeout: 2000,
      autoplayHoverPause: true,
      nav:false,
      dots:false,
      stagePadding: 30,
      responsive: {
        0: {
          items: 2
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
  });


    $(document).ready(function() {
      var owl = $('#clients-list');
      owl.owlCarousel({
        margin: 80,
        nav: true,
        loop: true,
        autoplay: true,
        smartSpeed:3000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        nav:false,
        // dots:true,
        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 3
          },
          1024: {
            items: 4
          }
        }
      });
    });

// $(function(){
//     $("#clients-list").owlCarousel({
//        items:6,
//         autoPlay:false,
//         smartSpeed:700,
//         loop:true,
//         autoplayHoverPause:true,
//         nav:false,
//         dots:false,
//
//         responsive:{
//             0:{
//                 items:3
//             },
//
//              480:{
//                 items:3
//             },
//
//              768:{
//                 items:6
//             }
//         }
//     });

    // $("#news-slider").owlCarousel({
    //     items:3,
    //     itemsDesktop:[1199,3],
    //     itemsDesktopSmall:[1000,2],
    //     itemsMobile:[600,1],
    //     pagination:false,
    //     navigationText:false,
    //     autoPlay:true
    //
    //
    // });

    // $("#banner-slider").owlCarousel({
    //     items: 1,
    //     itemsDesktop: [1199, 1],
    //     itemsDesktopSmall: [1000, 1],
    //     itemsMobile: [600, 1],
    //     pagination: false,
    //     navigationText: false,
    //     autoPlay: true
    //
    //
    // });


// });
