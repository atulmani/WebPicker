// js for toggle menu

 var MenuItems = document.getElementById("MenuItems");

 MenuItems.style.maxHeight = "0px";

 function menutoggle(){
   if ( MenuItems.style.maxHeight == "0px")
     {
         MenuItems.style.maxHeight = "200px"
     }
   else
   {
       MenuItems.style.maxHeight = "0px"
   }
 }


// js for menu end

 // js for product gallery

    var ProductImg = document.getElementById("ProductImg");
    var SmallImg = document.getElementsByClassName("small-img");

      SmallImg[0].onclick = function()
      {
        ProductImg.src = SmallImg[0].src;
      }
      SmallImg[1].onclick = function()
      {
        ProductImg.src = SmallImg[1].src;
      }
      SmallImg[2].onclick = function()
      {
        ProductImg.src = SmallImg[2].src;
      }
      SmallImg[3].onclick = function()
      {
        ProductImg.src = SmallImg[3].src;
      }


// js for toggle form

  var LoginForm1 = document.getElementById("LoginForm");
  var RegForm1 = document.getElementById("RegForm");
  var Indicator1 = document.getElementById("Indicator");

    function register(){

      RegForm1.style.transform = "translateX(0px)";
      LoginForm1.style.transform = "translateX(0px)";
    }

    function login(){

      RegForm1.style.transform = "translateX(300px)";
      LoginForm1.style.transform = "translateX(300px)";
    }
