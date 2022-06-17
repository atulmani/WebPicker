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

// new java script

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


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ddIndustries() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function ddFeatures() {
  document.getElementById("myDropdown1").classList.toggle("show");
}

// more button click - start

  var moreButton = document.getElementById('moreButton');
  var moreButtonLinks = document.getElementById('moreButtonLinks');
  var fullContent = document.getElementById('fullContent');

  moreButton.addEventListener('click', sideNavbarOpen, false);

  function sideNavbarOpen(){
    moreButtonLinks.classList.add('open');
  }

  moreButtonLinks.addEventListener('click', sideNavbarClose, false);
  fullContent.addEventListener('click', sideNavbarClose, false);

  function sideNavbarClose(){
    moreButtonLinks.classList.remove('open');
  }



// more button click - end


// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$(document).ready(function() {
  var owl = $('#banner-list');
  owl.owlCarousel({
    margin: 0,
    loop: true,
    // center: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 5500,
    autoplayHoverPause: false,
    nav: true,
    dots: false,
    // stagePadding: 100,
    responsive: {
      0: {
        items: 1,
        // stagePadding: 50
      },
      600: {
        items: 1,
        // stagePadding: 50
      },
      1000: {
        items: 1,
        // stagePadding: 80
      }
    }
  });
});

$(document).ready(function() {
  var owl = $('#banner-ads-list');
  owl.owlCarousel({
    margin: 0,
    loop: true,
    // center: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    // stagePadding: 100,
    responsive: {
      0: {
        items: 1,
        stagePadding: 0
      },
      600: {
        items: 1,
        stagePadding: 0
      },
      1000: {
        items: 1,
        stagePadding: 0
      }
    }
  });
});

$(document).ready(function() {
  var owl = $('#industries-owl-carousel');
  owl.owlCarousel({
    stagePadding: 30,
    margin: 10,
    nav: true,
    loop: false,
    autoplay: false,
    // smartSpeed:3000,
    // autoplayTimeout: 4000,
    autoplayHoverPause: false,
    autoWidth: false,
    nav: false,
    dots: false,
    rtl: true,
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
  var owl = $('#whc-owl-carousel');
  owl.owlCarousel({
    stagePadding: 30,
    margin: 10,
    nav: true,
    loop: false,
    autoplay: false,
    // smartSpeed:3000,
    // autoplayTimeout: 4000,
    autoplayHoverPause: false,
    autoWidth: false,
    nav: false,
    dots: false,
    rtl: true,
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
  var owl = $('#services-owl-carousel');
  owl.owlCarousel({
    stagePadding: 30,
    margin: 10,
    nav: true,
    loop: false,
    autoplay: false,
    // smartSpeed:3000,
    // autoplayTimeout: 4000,
    autoplayHoverPause: false,
    autoWidth: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2
      },
      1024: {
        items: 4
      }
    }
  });
});


$(document).ready(function() {
  var owl = $('#projects-owl-carousel');
  owl.owlCarousel({
    margin: 10,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    autoWidth: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1024: {
        items: 3,
        stagePadding: 50,
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
    nav: false,
    navText:["<div class='nav-btn prev-slide'><span class='material-icons-outlined'>arrow_back_ios</span></div>","<div class='nav-btn next-slide'><span class='material-icons-outlined'>arrow_forward_ios</span></div>"],
    dots: true,
    center: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10,
      },
      600: {
        items: 3
      },
      1024: {
        items: 3,
        // stagePadding: 50
      }
    }
  });
});

// $(document).ready(function() {
//   var owl = $('#project-list-content');
//   owl.owlCarousel({
//     margin: 30,
//     nav: true,
//     loop: true,
//     autoplay: true,
//     smartSpeed: 3000,
//     autoplayTimeout: 8000,
//     autoplayHoverPause: false,
//     nav: false,
//     navText:["<div class='nav-btn prev-slide'><span class='material-icons-outlined'>arrow_back_ios</span></div>","<div class='nav-btn next-slide'><span class='material-icons-outlined'>arrow_forward_ios</span></div>"],
//     dots: true,
//     center: true,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       600: {
//         items: 1
//       },
//       1024: {
//         items: 1,
//       }
//     }
//   });
// });

$(document).ready(function() {
  var owl = $('.project-list-img');
  owl.owlCarousel({
    margin: 0,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    nav: false,
    navText:["<div class='nav-btn prev-slide'><span class='material-icons-outlined'>arrow_back_ios</span></div>","<div class='nav-btn next-slide'><span class='material-icons-outlined'>arrow_forward_ios</span></div>"],
    dots: false,
    center: true,
    touchDrag  : false,
    mouseDrag  : false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1
      },
      1024: {
        items: 1,
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
    center: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });
});

$(document).ready(function() {
  var owl = $('#partners-list');
  owl.owlCarousel({
    margin: 20,
    loop: false,
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 2,
        stagePadding: 20,
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
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

  // new WOW().init();
});


// map - start

// When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);

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
