// coming soon count down

var countDownDate = new Date("Aug 1, 2021 00:00:00").getTime();


var x = setInterval(function() {
  // alert(countDownDate);

  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // document.getElementById("launch").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  document.getElementById("launch").innerHTML = "<div class='card-time-outter card-1-sec'> <div class='card-time'>" + seconds + "<div class='card-time-footer'> seconds </div> </div> </div>" + "<br> <div class='three-cards'> <div class='card-time-outter'> <div class='card-time'>" + days + "<div class='card-time-footer'> days </div> </div> </div>" + "<div class='card-time-outter'> <div class='card-time'>" + hours + "<div class='card-time-footer'> hours </div> </div> </div>" + "<div class='card-time-outter'> <div class='card-time'>" + minutes + "<div class='card-time-footer'> minutes </div> </div> </div> </div>";


  document.getElementById("launch-small").innerHTML = "<div class='card-time'>" + days + "<div class='card-time-footer'> days </div> </div>" + "<div class='card-time-outter'> <div class='card-time'>" + hours + "<div class='card-time-footer'> hours </div> </div> </div>" + "<div class='card-time-outter'> <div class='card-time'>" + minutes + "<div class='card-time-footer'> minutes </div> </div> </div>" + "<div class='card-time-outter'> <div class='card-time'>" + seconds + "<div class='card-time-footer'> seconds </div> </div> </div>";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("launch").innerHTML = "EXPIRED";
  }

}, 1000);
