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
  var owl = $('#ingradients-list1');
  owl.owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    smartSpeed: 2500,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    center: true,
    responsive: {
      0: {
        items: 3,
        // stagePadding: 40,
      },
      600: {
        items: 2
      },
      1000: {
        items: 5
      }
    }
  });
});


$(document).ready(function() {
  var owl1 = $('#more-products');
  owl1.owlCarousel({
    margin: 80,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 2000,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 15,
        margin: 40,
      },
      600: {
        items: 2
      },
      1024: {
        items: 3,
        stagePadding: 50,
      }
    }
  });
});

// jQuery(document).ready(function() {
// $(window).scroll(function() {
//   if ($(window).scrollTop() > 80) {
//     $('.main_header').addClass('sticky');
//   } else {
//     $('.main_header').removeClass('sticky');
//   }
// });
//
//
// $('.mobile-toggle').click(function() {
//   if ($('.main_header').hasClass('open-nav')) {
//     $('.main_header').removeClass('open-nav');
//   } else {
//     $('.main_header').addClass('open-nav');
//   }
// });

// $('.main_header li a').click(function() {
//     if ($('.main_header').hasClass('open-nav')) {
//         $('.navigation').removeClass('open-nav');
//         $('.main_header').removeClass('open-nav');
//     }
// });

//
// $('nav a').click(function(event) {
//     var id = $(this).attr("href");
//     var offset = 0;
//     var target = $(id).offset().top - offset;
//     $('html, body').animate({
//         scrollTop: target
//     }, 600);
//     event.preventDefault();
// });

// new WOW().init();
// });


// map - start

// When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);
//
// function init() {
//   var mapOptions = {
//     zoom: 11,
//
//     center: new google.maps.LatLng(28.5859471, 77.0866421), // New York
//
//     styles: [{
//       "featureType": "all",
//       "elementType": "labels.text.fill",
//       "stylers": [{
//         "saturation": 36
//       }, {
//         "color": "#000000"
//       }, {
//         "lightness": 40
//       }]
//     }, {
//       "featureType": "all",
//       "elementType": "labels.text.stroke",
//       "stylers": [{
//         "visibility": "on"
//       }, {
//         "color": "#000000"
//       }, {
//         "lightness": 16
//       }]
//     }, {
//       "featureType": "all",
//       "elementType": "labels.icon",
//       "stylers": [{
//         "visibility": "off"
//       }]
//     }, {
//       "featureType": "administrative",
//       "elementType": "geometry.fill",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 20
//       }]
//     }, {
//       "featureType": "administrative",
//       "elementType": "geometry.stroke",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }, {
//         "weight": 1.2
//       }]
//     }, {
//       "featureType": "landscape",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 20
//       }]
//     }, {
//       "featureType": "poi",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 21
//       }]
//     }, {
//       "featureType": "road.highway",
//       "elementType": "geometry.fill",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }]
//     }, {
//       "featureType": "road.highway",
//       "elementType": "geometry.stroke",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 29
//       }, {
//         "weight": 0.2
//       }]
//     }, {
//       "featureType": "road.arterial",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 18
//       }]
//     }, {
//       "featureType": "road.local",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 16
//       }]
//     }, {
//       "featureType": "transit",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 19
//       }]
//     }, {
//       "featureType": "water",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }]
//     }]
//   };
//
//   var mapElement = document.getElementById('map');
//
//   var map = new google.maps.Map(mapElement, mapOptions);
//
//   var marker = new google.maps.Marker({
//     position: new google.maps.LatLng(28.5859471, 77.0866421),
//     map: map,
//     title: 'Chocotales'
//   });
// }
// map - end


// js for product gallery

var productImg = document.getElementById("ProductImg");
var smallImg = document.getElementsByClassName("small-img");

smallImg[0].onclick = function() {
  productImg.src = smallImg[0].src;
}
smallImg[1].onclick = function() {
  productImg.src = smallImg[1].src;
}
smallImg[2].onclick = function() {
  productImg.src = smallImg[2].src;
}
smallImg[3].onclick = function() {
  productImg.src = smallImg[3].src;
}
