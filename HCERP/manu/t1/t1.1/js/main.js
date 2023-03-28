// more options - start

function moreOptionsClick(moreOptionsDiv) {
    moreOptionsDiv.classList.add('open');
}

var closeMoreOptionsDiv = document.getElementById('closeMoreOptionsDiv');

closeMoreOptionsDiv.addEventListener('click', closeMoreOptions, false);

function closeMoreOptions() {
    document.getElementById('moreOptionsDiv').classList.remove('open');
}

// more options - end

// owl carousel - start

$(document).ready(function () {
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


$(document).ready(function () {
    var owl = $('#profile-document-list');
    owl.owlCarousel({
        margin: 0,
        loop: false,
        autoplay: false,
        smartSpeed: 3000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        nav: true,
        navText: ["<div class='nav-btn'><span class='material-symbols-outlined'>navigate_before</span></div>", "<div class='nav-btn'><span class='material-symbols-outlined'>navigate_next</span></div>"],
        dots: false,
        stagePadding: 20,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1280: {
                items: 3
            }
        }
    });
});

$(document).ready(function () {
    var owl = $('#profile-assignment-list');
    owl.owlCarousel({
        margin: 20,
        loop: false,
        autoplay: false,
        smartSpeed: 3000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        nav: true,
        navText: ["<div class='nav-btn'><span class='material-symbols-outlined'>navigate_before</span></div>", "<div class='nav-btn'><span class='material-symbols-outlined'>navigate_next</span></div>"],
        dots: false,
        stagePadding: 30,
        responsive: {
            0: {
                items: 1
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

// owl carousel - end
