// Ristrict mouse right click - start
// With jQuery
$(document).on({
    "contextmenu": function(e) {
        console.log("ctx menu button:", e.which);
        e.preventDefault();
    }
});

// Ristrict mouse right click - end

// Collapse Navbar toggle menu after clicking on menu items - Start
$(document).on('click', function() {
  $('.collapse').collapse('hide');
});
// Collapse Navbar toggle menu after clicking on menu items - End

function showHideDiv(card, arrow) {
  card.classList.toggle('active');
  arrow.classList.toggle('active');
}


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
            items: 1
          },
          600: {
            items: 1
          },
          1024: {
            items: 1
          }
        }
      });
    });

    $(document).ready(function() {
      var owl = $('#team-list');
      owl.owlCarousel({
        margin: 80,
        nav: true,
        loop: true,
        autoplay: true,
        smartSpeed:3000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        nav:true,
        navText:["<div class='nav-btn prev-slide'><span class='material-icons-outlined'>arrow_back_ios</span></div>","<div class='nav-btn next-slide'><span class='material-icons-outlined'>arrow_forward_ios</span></div>"],
        dots: false,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1024: {
            items: 1
          }
        }
      });
    });

    $(document).ready(function() {
      var owl = $('#partner-list');
      owl.owlCarousel({
        margin: 80,
        nav: true,
        loop: true,
        autoplay: true,
        smartSpeed:3000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        nav:false,
        // navText:["<div class='nav-btn prev-slide'><span class='material-icons-outlined'>arrow_back_ios</span></div>","<div class='nav-btn next-slide'><span class='material-icons-outlined'>arrow_forward_ios</span></div>"],
        dots: false,
        responsive: {
          0: {
            items: 1,
            stagePadding: 150
          },
          600: {
            items: 3
          },
          1024: {
            items: 5
          }
        }
      });
    });
