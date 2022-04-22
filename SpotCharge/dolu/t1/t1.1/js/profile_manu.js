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
