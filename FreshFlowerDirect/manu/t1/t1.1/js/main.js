// Ristrict mouse right click - start
document.addEventListener("contextmenu", function(e) {
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

function showHideCard(card, cardArrow) {
  card.classList.toggle("active");

  cardArrow.classList.toggle("active");
}

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

$(function() {

  $("#progress-elements").waypoint(function() {

    $(".progress-bar").each(function() {

      $(this).animate({
        width: $(this).attr("aria-valuenow") + "%"
      }, 2000);

    });

    this.destroy();
  }, {
    offset: 'bottom-in-view'
  });


});


$(function() {

  $("#services-tabs").responsiveTabs({
    animation: 'slide'
  });



  //  $('.gallery').magnificPopup({
  //     delegate: '.popimg',
  //     type: 'image',
  //     gallery: {
  //         enabled: true
  //     }
  // });
  //   $('.gallery').isotope({
  //   // options
  //   itemSelector: '.items'
  // });
  //
  // var $gallery = $('.gallery').isotope({
  //   // options
  // });

  // filter items on button click
  $('.filtering').on('click', 'span', function() {

    var filterValue = $(this).attr('data-filter');

    $gallery.isotope({
      filter: filterValue
    });

  });

  $('.filtering').on('click', 'span', function() {

    $(this).addClass('active').siblings().removeClass('active');

  });

});

$(document).ready(function() {
  var owl = $('#CategoryList');
  owl.owlCarousel({
    margin: 0,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    center: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 50,
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

$(document).ready(function() {
  var owl = $('#bestSellingProductsList');
  owl.owlCarousel({
    margin: 30,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    nav: true,
    dots: false,
    center: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 50,
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

$(document).ready(function() {
  var owl = $('#banner-carousel');
  owl.owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    smartSpeed: 2500,
    autoplayTimeout: 4200,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    center: true,
    responsive: {
      0: {
        items: 1,
        // stagePadding: 40,
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
  var owl = $('#clients-list');
  owl.owlCarousel({
    margin: 30,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 10000,
    autoplayHoverPause: false,
    nav: true,
    dots: false,
    center: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 50,
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

jQuery(document).ready(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 80) {
      $('.main_header').addClass('sticky');
    } else {
      $('.main_header').removeClass('sticky');
    }
  });


  $('.mobile-toggle').click(function() {
    if ($('.main_header').hasClass('open-nav')) {
      $('.main_header').removeClass('open-nav');
    } else {
      $('.main_header').addClass('open-nav');
    }
  });





  $('.main_header li a').click(function() {
    if ($('.main_header').hasClass('open-nav')) {
      $('.navigation').removeClass('open-nav');
      $('.main_header').removeClass('open-nav');
    }
  });


  $('nav a').click(function(event) {
    var id = $(this).attr("href");
    var offset = 0;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
      scrollTop: target
    }, 600);
    event.preventDefault();
  });

  new WOW().init();
});


// map - start

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 11,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(18.5967323, 73.7011654), // New York

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 40
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 21
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 19
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using our element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);

  // Let's also add a marker while we're at it
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(18.5967323, 73.7011654),
    map: map,
    title: 'WebPicker'
  });
}
// map - end
