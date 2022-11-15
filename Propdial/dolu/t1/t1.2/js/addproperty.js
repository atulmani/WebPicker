function openPropertyDetails(propertyDetails){
  propertyDetails.classList.toggle('open');
}


function addPropertyMenu(menuList) {

  var menuIndicator = document.getElementById('menuIndicator');
  var Basic = document.getElementById('Basic');
  var Details = document.getElementById('Details');
  var Occupancy = document.getElementById('Occupancy');

  var section1 = document.getElementById("section1");
  var section2 = document.getElementById("section2");
  var section3 = document.getElementById("section3");

  Basic.classList.remove('active');
  Details.classList.remove('active');
  Occupancy.classList.remove('active');

  if (menuList === 'Basic') {
    menuIndicator.style.transform = 'translateX(0%)';
    Basic.classList.add('active');
    section1.style.transform = 'translateX(0%)';
    section2.style.transform = 'translateX(0%)';
    section3.style.transform = 'translateX(0%)';
  }
  else if (menuList === 'Details') {
    menuIndicator.style.transform = 'translateX(100%)';
    Details.classList.add('active');
    section1.style.transform = 'translateX(-100%)';
    section2.style.transform = 'translateX(-100%)';
    section3.style.transform = 'translateX(-100%)';
  }
  else if (menuList === 'Occupancy') {
    menuIndicator.style.transform = 'translateX(200%)';
    Occupancy.classList.add('active');
    section1.style.transform = 'translateX(-200%)';
    section2.style.transform = 'translateX(-200%)';
    section3.style.transform = 'translateX(-200%)';
  }

}


function propertyToggleClick(propertyType) {

  var ResidentialText = document.getElementById('ResidentialText');
  var CommercialText = document.getElementById('CommercialText');
  var section2ResidentialSection = document.getElementById('section2ResidentialSection');
  var section2CommercialSection = document.getElementById('section2CommercialSection');

  ResidentialText.classList.remove('active');
  CommercialText.classList.remove('active');

  if (propertyType.classList.contains('Residential')) {
    propertyType.classList.remove('Residential');
    propertyType.classList.add('Commercial');
    CommercialText.classList.add('active');
    section2ResidentialSection.style.display = 'none';
    section2CommercialSection.style.display = 'block';
  } else if (propertyType.classList.contains('Commercial')) {
    propertyType.classList.remove('Commercial');
    propertyType.classList.add('Residential');
    ResidentialText.classList.add('active');
    section2ResidentialSection.style.display = 'block';
    section2CommercialSection.style.display = 'none';
  }

}

function openRentSection(cb1, cb2, objType) {
  var rentSection = document.getElementById('rentSection');
  var saleSection = document.getElementById('saleSection');
  var cb1Cnt = document.getElementById(cb1);
  var cb2Cnt = document.getElementById(cb2);


  if (cb1Cnt.checked && !cb2Cnt.checked) {
    console.log(cb1Cnt.checked);
    console.log(cb2Cnt.checked);
    cb1Cnt.checked = false;
    cb1Cnt.setAttribute('checked', true);
  }
  //  console.log("cb1.checked", cb1.checked)
  if (objType === 'Rent' && !cb1Cnt.checked) {
    rentSection.style.display = 'none';
    //console.log('openRentSection');

  } else {
    rentSection.style.display = 'block';
  }


  if (objType === 'Sale' && !cb1Cnt.checked) {
    saleSection.style.display = 'none';
    //console.log('openRentSection');

  } else {
    saleSection.style.display = 'block';
  }


}

function openSaleSection() {
  var saleSection = document.getElementById('saleSection');
  var businessTypeRent = document.getElementById('businessTypeRent');
  var businessTypeSale = document.getElementById('businessTypeSale');

  if (businessTypeSale.checked) {
    saleSection.style.display = 'none';
  } else {
    saleSection.style.display = 'block';
  }
}

function closeCarParkingClosedDiv() {
  var extraCarParkingClosed = document.getElementById('extraCarParkingClosed');
  extraCarParkingClosed.classList.remove('open');
}

function openCarParkingClosedDiv() {
  var extraCarParkingClosed = document.getElementById('extraCarParkingClosed');
  extraCarParkingClosed.classList.add('open');
}

function ageOfPropertyCalc() {
  var yearOfConstructionSelect = document.getElementById('yearOfConstructionSelect');
  var ageOfPropertyCount = document.getElementById('ageOfPropertyCount');

  var yearValue = yearOfConstructionSelect.options[yearOfConstructionSelect.selectedIndex].text;
  var dt = new Date();

  ageOfPropertyCount.innerHTML = dt.getFullYear() - Number(yearValue);

}