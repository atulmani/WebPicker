//************* Create & Update Event Data - Ends ******************

// const eventForm = document.getElementById('eventForm');
// document.getElementById('optionalFields').style.display = 'block';
// document.getElementById('imageDiv').style.display = 'block';
// const createEventConformation = document.getElementById('createEventConformation');

// const btnSave = document.getElementById('btnSave');

// btnSave.addEventListener('click', CreateUpdateEventData, false);
//
// function CreateUpdateEventData() {
//   // CreateUpdateEventData.preventDefault();
//   createEventConformation.style.display = 'block';
// }
//
$(document).ready(function () {
        if($(window).width() > 850) {
           // $("#collapsibleNavbar1").removeClass("collapse");
           $("#arrowOrg").addClass("active");
           $("#eventArrow").addClass("active");
           $("#EventRevenue").addClass("active");
           $("#openEvents").addClass("active");

        }
    });





function fullcard(arrowVar)
{
  // console.log(arrowVar).;
  arrowVar.classList.toggle('active');

}

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
