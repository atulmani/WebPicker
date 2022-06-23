
//
var deferredPrompt;
//
if (!window.Promise) {
  window.Promise = Promise;
}
//
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('\sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallpromt', function(event){
  console.log('beforeinstallpromt fierd');
  event.preventDefault();
  deferredPrompt=event;
  return false;
});

//enable notification for web app with all button click havign class name as enable-Notification
var enableNotification = document.querySelectorAll('.enable-Notification')
if('Notification' in window && 'serviceWorker' in navigator){
  for (var i = 0; i< enableNotification.length ; i++){
    enableNotification[i].style.display = "block";
    enableNotification[i].addEventListener('click', askForNotification);
  }
}

function displayConfirmNotification()
{
  navigator.serviceWorker.getRegistrations().then(reg =>{
    reg.pushManager.subscribe({
      userVisibleOnly:true
    }).then(sub => {
      //send sub.toJSON to server
    })
  })
}
function displayConfirmNotification1(){
  console.log('in displayConfirmNotification');
  if('serviceWorker' in navigator){
    var options = {
      body:"You are Successfully subscribed to our notification.",
      icon:"/img/TPLiVE-96x96.png",
      image:"/img/4.png",
      //tag:"confirm-notification",
      actions:[
        {action:"confirm", title:"Confirm",icon:"/img/TPLiVE-96x96.png"},
        {action:"cancel", title:"Cancel",icon:"/img/TPLiVE-96x96.png"},
      ]
    };
    navigator.serviceWorker.ready
    .then(function (swreg){
        console.log('before notification');
        swreg.showNotification("Subscription Successful!!", options);
        // new Notification("Subscription Successful!!", options);
    });
  }

}

function askForNotification(){
  Notification.requestPermission(function (result){
    console.log('user choice' , result);
    if(result != 'granted'){
      console.log('Permission not grated');

    }else{
      displayConfirmNotification();
    }
  });

}



function subscribePush() {
  //Subscribes user to Push notifications
  registration.pushManager.subscribe({
      userVisibleOnly: true //Set user to see every notification
    })
    .then(function(subscription) {
      toast('Subscribed successfully.');
      console.info('Push notification subscribed.');
      console.log(subscription);
    })
    .catch(function(error) {
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

// var hamberIcon = document.getElementById('hamberIcon');
var fullContent = document.getElementById('fullContent');
var sideNavbar = document.getElementById('sideNavbar');

// hamberIcon.addEventListener('click', sideNavbarOpen, false);
//
// function sideNavbarOpen(){
//   sideNavbar.classList.add('open');
// }

fullContent.addEventListener('click', sideNavbarClose, false);

function sideNavbarClose(){
  sideNavbar.classList.remove('open');
}


// sideNavbar - end

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

$(document).ready(function() {
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

$(document).ready(function() {
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

$(document).ready(function() {
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
    touchDrag  : false,
    mouseDrag  : false,
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
$(document).ready(function() {
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

$(document).ready(function() {
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

$(document).ready(function() {
  var owl = $('#event-list');
  owl.owlCarousel({
    margin: 20,
    loop: false,
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 3500,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    stagePadding: 30,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4
      },
      1000: {
        items: 8
      }
    }
  });
});

$(document).ready(function() {
  var owl = $('#event-list-new');
  owl.owlCarousel({
    margin: 30,
    loop: true,
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 3500,
    autoplayHoverPause: false,
    nav: false,
    dots:false,
    stagePadding: 150,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 20,
      },
      500: {
        items: 1,
        stagePadding: 80,
        margin: 20,
      },
      800: {
        items: 2,
        stagePadding: 30,
        margin: 20,
      },
      1000: {
        items: 3,
        margin: 10,
        stagePadding: 20,
      },
      1200: {
        stagePadding: 40
      },
      1400: {
        items: 3,
      }
    }
  });
});
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


$(document).ready(function() {
  var bigimage = $("#big");
  var thumbs = $("#thumbs");
  //var totalslides = 10;
  var syncedSecondary = true;

  bigimage
    .owlCarousel({
      items: 1,
      // slideSpeed: 2000,
      nav: false,
      autoplay: false,
      smartSpeed: 3000,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      center: true,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      margin: 10,
      stagePadding: 30,
      navText: [
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
      ]
    })
    .on("changed.owl.carousel", syncPosition);

  thumbs
    .on("initialized.owl.carousel", function() {
      thumbs
        .find(".owl-item")
        .eq(0)
        .addClass("current");
    })
    .owlCarousel({
      dots: false,
      nav: false,
      margin: 0,
      stagePadding: 30,
      autoplay: false,
      smartSpeed: 3000,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      // slideSpeed: 500,
      // slideBy: 4,
      responsiveRefreshRate: 100,

      responsive: {
        0: {
          items: 2
        },
        600: {
          items: 4
        },
        1000: {
          items: 5
        },
        1400: {
          items: 8
        }
      },


      // margin: 20,
      // loop: false,
      // autoplay: false,
      // smartSpeed: 1000,
      // autoplayTimeout: 3500,
      // autoplayHoverPause: false,
      // nav: false,
      // dots: false,
      // stagePadding: 30,

      navText: [
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
      ],
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    //if loop is set to false, then you have to uncomment the next line
    //var current = el.item.index;

    //to disable loop, comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    //to this
    thumbs
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs
      .find(".owl-item.active")
      .first()
      .index();
    var end = thumbs
      .find(".owl-item.active")
      .last()
      .index();

    if (current > end) {
      thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data("owl.carousel").to(number, 100, true);
    }
  }

  // thumbs.on("click", ".owl-item", function(e) {
  thumbs.on("click", ".owl-item", function(e) {
    console.log('thumb clicked');
    e.preventDefault();
    var number = $(this).index();
    var item = $(this).context.firstChild.firstChild;
    var parent = $(this).context.firstChild.parentElement.parentElement;
    for (index = 0 ; index < parent.childNodes.length; index++)
    {
      parent.childNodes[index].firstChild.firstChild.classList.remove("active");
      // parent.childNodes.classList.remove("active");
    }
    item.classList.add("active");
    bigimage.data("owl.carousel").to(number, 300, true);

  });

  bigimage.on("click", ".owl-item", function(e) {
    console.log('big image clicked');
    e.preventDefault();
    var number = $(this).index();
    console.log(number);
     var item = $(this).context.firstChild.firstChild;
     var parent = $(this).context.firstChild.parentElement.parentElement;
     var thumbParent = thumbs;
     console.log(parent.childNodes.length);
     console.log(thumbParent.data("owl.carousel").$element.context.firstElementChild.firstChild);
     for (index = 0 ; index < (parent.childNodes.length-1)/2; index++)
     // for (index = 0 ; index < parent.childNodes.length; index++)
     {
       parent.childNodes[index].firstChild.firstChild.classList.remove("active");
        console.log(thumbParent.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[index].firstChild);
        thumbParent.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[index].firstChild.classList.remove("active");
        // thumbParent.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[index].firstChild.firstChild.classList.remove("active");
      //console.log(thumbParent);//;.childNodes[index].firstChild.firstChild.classList.remove("active");
     }
     item.classList.add("active");
     thumbParent.data("owl.carousel").$element.context.firstElementChild.firstChild.childNodes[number].firstChild.classList.add("active");

//     thumbParent.childNodes[number].firstChild.firstChild.classList.add("active");
  //   thumbs.data("owl.carousel").to(number, 300, true);

  });
});
