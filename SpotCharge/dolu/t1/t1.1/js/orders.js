$(document).ready(function () {
        if($(window).width() > 850) {
           // $("#collapsibleNavbar1").removeClass("collapse");
           $("#order1").addClass("active");
           // $("#eventArrow").addClass("active");
           $("#order2").addClass("active");
           $("#order3").addClass("active");
           $("#order4").addClass("active");
           $("#order5").addClass("active");
           $("#order6").addClass("active");
           $("#order7").addClass("active");
           // $("#order8").addClass("active");
           // $("#order9").addClass("active");
           // $("#CardAnalytics").addClass("active");
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
