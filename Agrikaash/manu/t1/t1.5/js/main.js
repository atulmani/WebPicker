

// Ristrict mouse right click - start
// document.addEventListener("contextmenu", function(e){
//     e.preventDefault();
// }, false);
//
// // With jQuery
// $(document).on({
//     "contextmenu": function(e) {
//         console.log("ctx menu button:", e.which);
//
//         // Stop the context menu
//         e.preventDefault();
//     },
//     "mousedown": function(e) {
//         console.log("normal mouse down:", e.which);
//     },
//     "mouseup": function(e) {
//         console.log("normal mouse up:", e.which);
//     }
// });

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
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll < 70) {
    $('.sticky-top').removeClass("sticky");
  } else {
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

$(document).ready(function() {
  var owl = $('#before-login-carousel');
  owl.owlCarousel({
    margin: 30,
    loop: true,
    autoplay: true,
    smartSpeed:2500,
    autoplayTimeout: 2700,
    autoplayHoverPause: true,
    nav:false,
    dots:false,
    center: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 50,
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
});


$(document).ready(function() {
  var owl = $('#designs-list');
  owl.owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 8500,
    autoplayHoverPause: true,
    nav: false,
    // dots:true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });
});


$(document).ready(function() {
  var owl = $('#event-list');
  owl.owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 8500,
    autoplayHoverPause: true,
    nav: false,
    // dots:true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4,
        stagePadding: 70,
      }
    }
  });
});



$(document).ready(function() {
  var owl = $('#category-list');
  owl.owlCarousel({
    margin: 8,
    stagePadding: 30,
    nav: false,
    loop: false,
    center: false,
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 4
      },
      1024: {
        items: 5
      }
    }
  });
});


$(document).ready(function() {
  var owl = $('#partners-carousel');
  owl.owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      1000: {
        items: 6
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

// jQuery(document).ready(function() {
//   $(window).scroll(function() {
//     if ($(window).scrollTop() > 80) {
//       $('.main_header').addClass('sticky');
//     } else {
//       $('.main_header').removeClass('sticky');
//     }
//   });
//
//
//   $('.mobile-toggle').click(function() {
//     if ($('.main_header').hasClass('open-nav')) {
//       $('.main_header').removeClass('open-nav');
//     } else {
//       $('.main_header').addClass('open-nav');
//     }
//   });
//
//
//   $('.main_header li a').click(function() {
//     if ($('.main_header').hasClass('open-nav')) {
//       $('.navigation').removeClass('open-nav');
//       $('.main_header').removeClass('open-nav');
//     }
//   });
//
//
//   $('nav a').click(function(event) {
//     var id = $(this).attr("href");
//     var offset = 0;
//     var target = $(id).offset().top - offset;
//     $('html, body').animate({
//       scrollTop: target
//     }, 600);
//     event.preventDefault();
//   });
//
//   new WOW().init();
// });



function exportCSVFile(Results, FileName) {
  // console.log(Results);
  //exportToCsv = function()
  {
    var CsvString = "";
    // Results.forEach(function(RowItem, RowIndex) {
    //   RowItem.forEach(function(ColItem, ColIndex) {
    //     CsvString += ColItem + ',';
    //   });
      var row = {};
      for (rInd = 0 ;rInd < Results.length ; rInd ++ )
      {
        row = Results[rInd];
        // console.log(row);
        Object.entries(row).forEach(([key, val]) => {
          if(val === undefined)
          {
            CsvString += " ,";
          }
          else {
            CsvString += val.toString().replace(",", "") + ',';
          }
        });

      CsvString += "\r\n";
      }

//    console.log(CsvString);
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", FileName  +".csv");
    document.body.appendChild(x);
    x.click();
  }
}
