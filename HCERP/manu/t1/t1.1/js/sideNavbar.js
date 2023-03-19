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