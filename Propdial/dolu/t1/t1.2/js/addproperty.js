
function addPropertyMenu(menuList) {

  var menuIndicator = document.getElementById('menuIndicator');
  var Basic = document.getElementById('Basic');
  var Details = document.getElementById('Details');
  var Occupancy = document.getElementById('Occupancy');
  var History = document.getElementById('History');

  var section1 = document.getElementById("section1");
  var section2 = document.getElementById("section2");
  var section3 = document.getElementById("section3");
  var section4 = document.getElementById("section4");

  Basic.classList.remove('active');
  Details.classList.remove('active');
  Occupancy.classList.remove('active');
  History.classList.remove('active');

  if (menuList === 'Basic') {
    menuIndicator.style.width = '25%';
    menuIndicator.style.borderRadius = '0 55px 55px 0';
    Basic.classList.add('active');
    section1.style.transform = 'translateX(0%)';
    section2.style.transform = 'translateX(0%)';
    section3.style.transform = 'translateX(0%)';
    section4.style.transform = 'translateX(0%)';
  }
  else if (menuList === 'Details') {
    menuIndicator.style.width = '50%';
    menuIndicator.style.borderRadius = '0 55px 55px 0';
    Basic.classList.add('active');
    Details.classList.add('active');
    section1.style.transform = 'translateX(-100%)';
    section2.style.transform = 'translateX(-100%)';
    section3.style.transform = 'translateX(-100%)';
    section4.style.transform = 'translateX(-100%)';
  }
  else if (menuList === 'Occupancy') {
    menuIndicator.style.width = '75%';
    menuIndicator.style.borderRadius = '0 55px 55px 0';
    Basic.classList.add('active');
    Details.classList.add('active');
    Occupancy.classList.add('active');
    section1.style.transform = 'translateX(-200%)';
    section2.style.transform = 'translateX(-200%)';
    section3.style.transform = 'translateX(-200%)';
    section4.style.transform = 'translateX(-200%)';
  }
  else if (menuList === 'History') {
    menuIndicator.style.width = '100%';
    menuIndicator.style.borderRadius = '0';
    Basic.classList.add('active');
    Details.classList.add('active');
    Occupancy.classList.add('active');
    History.classList.add('active');
    section1.style.transform = 'translateX(-300%)';
    section2.style.transform = 'translateX(-300%)';
    section3.style.transform = 'translateX(-300%)';
    section4.style.transform = 'translateX(-300%)';
  }

}


function propertyToggleClick(propertyType) {

  var ResidentialText = document.getElementById('ResidentialText');
  var CommercialText = document.getElementById('CommercialText');

  ResidentialText.classList.remove('active');
  CommercialText.classList.remove('active');

  if (propertyType.classList.contains('Residential')) {
    propertyType.classList.remove('Residential');
    propertyType.classList.add('Commercial');
    CommercialText.classList.add('active');
  } else if (propertyType.classList.contains('Commercial')) {
    propertyType.classList.remove('Commercial');
    propertyType.classList.add('Residential');
    ResidentialText.classList.add('active');
  }

}
