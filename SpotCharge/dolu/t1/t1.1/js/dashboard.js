$(document).ready(function () {
        if($(window).width() > 850) {
           // $("#collapsibleNavbar1").removeClass("collapse");
           $("#arrowOrg").addClass("active");
           // $("#eventArrow").addClass("active");
           $("#EventRevenue").addClass("active");
           $("#openEvents").addClass("active");
           $("#CardTransaction").addClass("active");
           $("#CardNotification").addClass("active");
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
