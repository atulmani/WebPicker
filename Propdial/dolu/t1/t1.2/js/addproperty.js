
function addPropertyMenu(menuList) {

  var menuIndicator = document.getElementById('menuIndicator');
  var Basic = document.getElementById('Basic');
  var Source = document.getElementById('Source');
  var Category = document.getElementById('Category');
  var Flag = document.getElementById('Flag');

  Basic.classList.remove('active');
  Source.classList.remove('active');
  Category.classList.remove('active');
  Flag.classList.remove('active');

  if (menuList === 'Basic') {
    menuIndicator.style.width = '25%';
    menuIndicator.style.borderRadius = '0 55px 55px 0';
    Basic.classList.add('active');
  }
  else if (menuList === 'Source') {
    menuIndicator.style.width = '50%';
    menuIndicator.style.borderRadius = '0 55px 55px 0';
    Basic.classList.add('active');
    Source.classList.add('active');
  }
  else if (menuList === 'Category') {
    menuIndicator.style.width = '75%';
    menuIndicator.style.borderRadius = '0 55px 55px 0';
    Basic.classList.add('active');
    Source.classList.add('active');
    Category.classList.add('active');
  }
  else if (menuList === 'Flag') {
    menuIndicator.style.width = '100%';
    menuIndicator.style.borderRadius = '0';
    Basic.classList.add('active');
    Source.classList.add('active');
    Category.classList.add('active');
    Flag.classList.add('active');
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
