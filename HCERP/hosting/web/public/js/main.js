// sideNavbar - start

var hamberIcon = document.getElementById('hamberIcon');
var closeBtn = document.getElementById('closeBtn');
var sideNavbar = document.getElementById('sideNavbar');

hamberIcon.addEventListener('click', sideNavbarOpen, false);

function sideNavbarOpen() {
    sideNavbar.classList.add('open');
}

closeBtn.addEventListener('click', sideNavbarClose, false);

function sideNavbarClose() {
    sideNavbar.classList.remove('open');
}


// sideNavbar - end

// sideNavbar options - start

function sideNavbarActive(collapseDivHead, collapseDiv, collapseArrow) {
    collapseDiv.classList.toggle('side-active');
    collapseArrow.classList.toggle('collapse-side');

    if (collapseDiv.classList.contains('side-active') || collapseDivHead.classList.contains('page-active')) {
        collapseDivHead.classList.add('active');
    } else {
        collapseDivHead.classList.remove('active');
    }
}

// sideNavbar options - end

// owl carousel - start

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
