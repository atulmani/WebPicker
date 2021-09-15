// js for product gallery

   var ProductImg = document.getElementById("ProductImg");
   var SmallImg = document.getElementsByClassName("second-section-small-img");
   var playbtn = document.getElementById("playbtn");

     SmallImg[0].onclick = function()
     {
       ProductImg.src = SmallImg[0].src;
       playbtn.style.display = "none";
     }
     SmallImg[1].onclick = function()
     {
       ProductImg.src = SmallImg[1].src;
       playbtn.style.display = "none";
     }
     SmallImg[2].onclick = function()
     {
       ProductImg.src = SmallImg[2].src;
       playbtn.style.display = "block";
     }
     SmallImg[3].onclick = function()
     {
       ProductImg.src = SmallImg[3].src;
       playbtn.style.display = "none";
     }

    var videoPlayer = document.getElementById("videoPlayer");
    var myVideo = document.getElementById("myVideo");
    var videoPlayer = document.getElementById("videoPlayer");

    function stopVideo(){
      videoPlayer.style.display = "none";
    }

    function playVideo(file){
      myVideo.src = file;
      videoPlayer.style.display = "block";
    }
