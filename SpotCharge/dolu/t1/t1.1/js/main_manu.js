
// Collapse Navbar toggle menu after clicking on menu items - Start
$(document).on('click', function() {
  document.getElementById('sideNavbar').classList.remove('open');
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

   // sideNavbar - start

   var hamberIcon = document.getElementById('hamberIcon');
   var closeBtn = document.getElementById('closeBtn');
   var sideNavbar = document.getElementById('sideNavbar');

   hamberIcon.addEventListener('click', sideNavbarOpen, false);

   function sideNavbarOpen(){
     sideNavbar.classList.add('open');
   }

   closeBtn.addEventListener('click', sideNavbarClose, false);

   function sideNavbarClose(){
     sideNavbar.classList.remove('open');
   }


   // sideNavbar - end

  $(document).ready(function() {
    var owl = $('#vehicle-list');
    owl.owlCarousel({
      margin: 20,
      loop: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      nav:false,
      dots:false,
      stagePadding: 30,
      rewind: true,
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
