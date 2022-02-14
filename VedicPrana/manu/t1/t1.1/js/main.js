// Ristrict mouse right click - start
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
}, false);

$(document).on({
  "contextmenu": function(e) {
    console.log("ctx menu button:", e.which);

    // Stop the context menu
    e.preventDefault();
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
  var owl = $('#clients-list');
  owl.owlCarousel({
    margin: 80,
    nav: true,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    nav: false,
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


jQuery(document).ready(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 80) {
      $('.main_header').addClass('sticky');
    } else {
      $('.main_header').removeClass('sticky');
    }
  })
});
