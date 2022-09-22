//
var deferredPrompt;
//
if (!window.Promise) {
  window.Promise = Promise;
}

window.addEventListener('beforeinstallpromt', function (event) {
  console.log('beforeinstallpromt fierd');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

//enable notification for web app with all button click havign class name as enable-Notification
var enableNotification = document.querySelectorAll('.enable-Notification')
if ('Notification' in window && 'serviceWorker' in navigator) {
  for (var i = 0; i < enableNotification.length; i++) {
    enableNotification[i].style.display = "block";
    enableNotification[i].addEventListener('click', askForNotification);
  }
}

function displayConfirmNotification() {
  navigator.serviceWorker.getRegistrations().then(reg => {
    reg.pushManager.subscribe({
      userVisibleOnly: true
    }).then(sub => {
      //send sub.toJSON to server
    })
  })
}

function displayConfirmNotification1() {
  // console.log('in displayConfirmNotification');
  if ('serviceWorker' in navigator) {
    var options = {
      body: "You are Successfully subscribed to our notification.",
      icon: "/img/TPLiVE-96x96.png",
      image: "/img/4.png",
      //tag:"confirm-notification",
      actions: [{
        action: "confirm",
        title: "Confirm",
        icon: "/img/TPLiVE-96x96.png"
      },
      {
        action: "cancel",
        title: "Cancel",
        icon: "/img/TPLiVE-96x96.png"
      },
      ]
    };
    navigator.serviceWorker.ready
      .then(function (swreg) {
        // console.log('before no/tification');
        swreg.showNotification("Subscription Successful!!", options);
        // new Notification("Subscription Successful!!", options);
      });
  }

}

function askForNotification() {
  Notification.requestPermission(function (result) {
    // console.log('user choice', result);
    if (result != 'granted') {
      // console.log('Permission not grated');

    } else {
      displayConfirmNotification();
    }
  });

}



function subscribePush() {
  //Subscribes user to Push notifications
  registration.pushManager.subscribe({
    userVisibleOnly: true //Set user to see every notification
  })
    .then(function (subscription) {
      toast('Subscribed successfully.');
      console.info('Push notification subscribed.');
      // console.log(subscription);
    })
    .catch(function (error) {
      console.error('Push notification subscription error: ', error);
    });
}


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


// sideNavbar - start

var hamberIcon = document.getElementById('hamberIcon');
var fullContent = document.getElementById('fullContent');
var sideNavbar = document.getElementById('sideNavbar');

//hamberIcon.addEventListener('click', sideNavbarOpen, false);

function sideNavbarOpen() {
  sideNavbar.classList.add('open');
}

fullContent.addEventListener('click', sideNavbarClose, false);

function sideNavbarClose() {
  sideNavbar.classList.remove('open');
}


// sideNavbar - end

// switch - start

function propertyToggleClick(propertyType, leftTXT, rightTXT) {

  var leftTXTVar = document.getElementById(leftTXT);
  var rightTXTVar = document.getElementById(rightTXT);
  // var propertyType = document.getElementById(objToggle);
  // console.log('propertyType', objToggle);
  leftTXTVar.classList.remove('active');
  rightTXTVar.classList.remove('active');

  if (propertyType.classList.contains('on')) {
    propertyType.classList.remove('on');
    propertyType.classList.add('off');
    rightTXTVar.classList.add('active');
  } else if (propertyType.classList.contains('off')) {
    propertyType.classList.remove('off');
    propertyType.classList.add('on');
    leftTXTVar.classList.add('active');
  }

}

// switch - end

// Menu's nav-link highlighted those are active - start
$(".nav .nav-link").on("click", function () {
  $(".nav").find(".active").removeClass("active");
  $(this).addClass("active");
});

function btclr() {
  srchcl.style.background = "#348DCB";
}

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
}, false);

// Menu's nav-link highlighted those are active - end

// fixed-top or sticky-top navbar background change on windows scrolling - start
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll < 70) {
    $('.sticky-top').removeClass("sticky");
  } else {
    $('.sticky-top').addClass("sticky");
  }
});

$(document).ready(function () {
  var owl = $('#genre-list');
  owl.owlCarousel({
    margin: 20,
    loop: true,
    autoplay: 2000,
    smartSpeed: 3000,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    nav: false,
    stagePadding: 60,
    dots: false,
    responsive: {
      0: {
        items: 3,
        margin: 120

      },
      600: {
        items: 4,
        margin: 10
      },
      1000: {
        items: 6
      }
    }
  });
});

$(document).ready(function () {
  var owl = $('#genre-location-list');
  owl.owlCarousel({
    margin: 20,
    loop: false,
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 2500,
    autoplayHoverPause: false,
    nav: false,
    stagePadding: 60,
    dots: false,
    responsive: {
      0: {
        items: 2,
        stagePadding: 30,
      },
      600: {
        items: 4
      },
      1000: {
        items: 7
      }
    }
  });
});

$(document).ready(function () {
  var owl = $('#genre-location-list-new');
  owl.owlCarousel({
    margin: 20,
    loop: true,
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 2500,
    autoplayHoverPause: false,
    nav: false,
    stagePadding: 60,
    dots: false,
    responsive: {
      0: {
        items: 4,
        stagePadding: 30,
        margin: 5,
      },
      600: {
        items: 4
      },
      1000: {
        items: 7
      }
    }
  });
});

$(document).ready(function () {
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

$(document).ready(function () {
  var owl = $('#ads-carousel');
  owl.owlCarousel({
    margin: 40,
    loop: true,
    autoplay: true,
    smartSpeed: 2000,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    nav: false,
    dots: true,
    stagePadding: 10,
    touchDrag: false,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1
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
$(document).ready(function () {
  var owl = $('#banner-list');
  owl.owlCarousel({
    margin: 10,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    // opacity: 0.1,
    stagePadding: 70,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
});

$(document).ready(function () {
  var owl = $('#banner-list-new');
  owl.owlCarousel({
    margin: 10,
    loop: true,
    autoplay: true,
    smartSpeed: 3000,
    autoplayTimeout: 15000,
    autoplayHoverPause: false,
    nav: true,
    center: true,
    dots: false,
    // opacity: 0.1,
    stagePadding: 30,
    responsive: {
      0: {
        items: 1
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
