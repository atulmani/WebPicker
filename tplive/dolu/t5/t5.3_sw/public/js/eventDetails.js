var loggedinUser = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
var valList = [];

auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);
      //var ret = await getUserList();
      GetProfileData();
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
    }
    GetEventDetails();
  } catch (error) {
    console.log(error.message);
    window.location.href = "index.html";
  }
});

async function GetProfileData() {
  console.log('GetProfileData - Starts');
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile != undefined && userProfile != "" && userProfile != null) {
    var approvalStatus = document.getElementById("approvalStatus");
    if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
      console.log("in admin");
    } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
      console.log("Organizer");
    } else {
      console.log("not admin");
    }
  }
}

function GetEventDetails() {
  console.log(eventID);
  var para1 = {};
  para1 = {
    EventID: eventID
  };
  var options = {
    year: '2-digit',
    // year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  // const ret1 = firebase.functions().httpsCallable("getEventCategoryDetails");
  const ret1 = functions.httpsCallable("getEventDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);
    var valList;
    document.getElementById("eventLogo").src = result.data.EventLogo;
    if(result.data.ThumbImage1 != undefined && result.data.ThumbImage1 != null && result.data.ThumbImage1 != ""){
      document.getElementById("thumb1").src = result.data.ThumbImage1;
    } else {
      document.getElementById("thumb1").src = result.data.EventLogo;
    }
    document.getElementById("thumb1").src = result.data.EventLogo;

    if(result.data.ThumbImage2 != undefined && result.data.ThumbImage2 != null && result.data.ThumbImage2 != ""){
      document.getElementById("thumb2").src = result.data.ThumbImage2;
    } else {
      console.log('thumb2 is null');
      document.getElementById("thumb2").src = "";
      document.getElementById("thumb2").style.display= "none;" ;
    }

    if(result.data.ThumbImage3 != undefined && result.data.ThumbImage3 != null && result.data.ThumbImage3 != ""){
      document.getElementById("thumb3").src = result.data.ThumbImage3;
    } else {
      console.log('thumb3 is null');
      document.getElementById("thumb3").src = "";
      document.getElementById("thumb3").style.display= "none;" ;
    }
    if(result.data.ThumbImage4 != undefined && result.data.ThumbImage4 != null && result.data.ThumbImage4 != ""){
      document.getElementById("thumb4").src = result.data.ThumbImage4;
    } else {
      console.log('thumb4 is null');
      document.getElementById("thumb4").src = ""
      document.getElementById("thumb4").style.display= "none;" ;
    }

    // document.getElementById("thumb1").src = result.data.EventLogo;
    // document.getElementById("thumb2").src = result.data.EventLogo;
    // document.getElementById("thumb3").src = result.data.EventLogo;
    // document.getElementById("thumb4").src = result.data.EventLogo;
    document.getElementById("hfEventID").value = result.data.Eventid;
    document.getElementById("hfOrganizerID").value = result.data.OrganizerID;
    document.getElementById("eventName").innerHTML = result.data.EventName;
    document.getElementById("organisername").innerHTML = result.data.EventOwnerName;
    document.getElementById("announcement").innerHTML = result.data.Announcement;

    if (result.data.EventMode != null && result.data.EventMode != undefined && result.data.EventMode != "") {
      if (result.data.EventMode.toUpperCase() === "BOOK") {
        document.getElementById("btn1").innerHTML = "Register";
        document.getElementById("btn2").innerHTML = "Pay Now";
      } else if (result.data.EventMode.toUpperCase() === "OPEN") {
        document.getElementById("btn1").style.display = "none;";
        document.getElementById("btn2").style.display = "none;";
      } else if (result.data.EventMode.toUpperCase() === "FIXTURE") {
        document.getElementById("btn1").innerHTML = "View Draw";
        document.getElementById("btn2").style.display = "none;";
      }
    }

    if (result.data.EventStartDate != undefined && result.data.EventStartDate != null && result.data.EventStartDate != "") {
      var sDate = new Date(result.data.EventStartDate._seconds * 1000);
      document.getElementById("eventstartdate").innerHTML = sDate.toLocaleDateString("en-IN", options);;
    }
    if (result.data.EventEndDate != undefined && result.data.EventEndDate != null && result.data.EventEndDate != "") {
      var eDate = new Date(result.data.EventEndDate._seconds * 1000);
      document.getElementById("eventenddate").innerHTML = " - " + eDate.toLocaleDateString("en-IN", options);;
    } else {
      //document.getElementById("dateLink").style.display="none;";
    }
    if (result.data.MinimumFee != null && result.data.MinimumFee != undefined && result.data.MinimumFee != "") {
      if (result.data.MaximumFee != null && result.data.MaximumFee != undefined && result.data.MaximumFee != "") {
        if (result.data.MinimumFee != result.data.MaximumFee) {
          // console.log(doc.MinimumFee);
          // h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat) + " - " + doc.MaximumFee.toLocaleString('en-IN', curFormat);
          document.getElementById("eventprice").innerHTML = Number(result.data.MinimumFee).toLocaleString('en-IN', curFormat) +
            " - " + result.data.MaximumFee.toLocaleString('en-IN', curFormat);
        } else {
          // console.log(doc.MinimumFee);
          document.getElementById("eventprice").innerHTML = Number(result.data.MinimumFee).toLocaleString('en-IN', curFormat);
        }
      } else {
        // console.log(doc.MinimumFee);
        document.getElementById("eventprice").innerHTML = Number(result.data.MinimumFee).toLocaleString('en-IN', curFormat);
      }
    } else {
      // console.log(doc.MinimumFee);
      document.getElementById("eventprice").innerHTML = "-";
    }
    document.getElementById("eventVenue").innerHTML = result.data.EventVenue;

    if (result.data.WithdrawalEndDate != undefined && result.data.WithdrawalEndDate != null && result.data.WithdrawalEndDate != "") {
      var wDate = new Date(result.data.WithdrawalEndDate._seconds * 1000);
      document.getElementById("withdrawalDate").innerHTML = wDate.toLocaleDateString("en-IN", options);
    }
    // document.getElementById("eventstatus").innerHTML = result.data.EventStatus;

    document.getElementById("organiserEmail").innerHTML = result.data.EventOwnerEmail;
    document.getElementById("organiserEmail").href = "mailto: " + result.data.EventOwnerEmail;
    document.getElementById("organiserPhone").innerHTML = result.data.EventOwnerPhone;
    document.getElementById("organiserPhone").href = "tel: +" + result.data.EventOwnerPhone;

    // document.getElementById("eventDetails").innerHTML = result.data.EventDetails;
    if(result.data.RulesAndRegulations != undefined && result.data.RulesAndRegulations != null){

      document.getElementById("RulesAndRegulations").innerHTML = result.data.RulesAndRegulations.replaceAll(";", "<br>");
    }
    // console.log(result.data.RulesAndRegulations.replace(";", "<br>"));
    valList = result.data.CategoryDetails;
    if (valList != null && valList != undefined) {
      for (index = 0; index < valList.length; index++) {
        renderCategory(valList[index], index);
      }
    }
  });
}


function renderCategory(obj, index) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  /*
  <tr>
    <td>1</td>
    <td>Boys Double Under11</td>
    <td>M</td>
    <td>600</td>
  </tr>
  */
  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.innerHTML = index + 1;
  tr.appendChild(td1);
  var td2 = document.createElement("td");
  td2.innerHTML = obj.CategoryName;
  tr.appendChild(td2);

  var td3 = document.createElement("td");
  td3.innerHTML = obj.Gender + " - " + obj.EventType;
  tr.appendChild(td3);

  var td4 = document.createElement("td");
  td4.innerHTML = obj.Fees.toLocaleString('en-IN', curFormat);
  tr.appendChild(td4);
  // var refdate = new Date(obj.ReferenceDate.seconds * 1000);
  var refdate = new Date(obj.ReferenceDate._seconds * 1000);
  //  span2.innerHTML = "Born " + obj.DateRefType + " : " + refdate.toLocaleDateString("en-US", options);


  // var span3 = document.createElement("span");
  // span3.setAttribute("style", "letter-spacing:1px;");
  // span3.innerHTML = "Max Team Size :" + obj.MaxTeamSize;
  document.getElementById("eventCategoryDetails").appendChild(tr);
}

// js for product gallery

var ProductImg = document.getElementById("eventLogo");
var SmallImg = document.getElementsByClassName("small-img");

SmallImg[0].onclick = function() {
  ProductImg.src = SmallImg[0].src;
}
SmallImg[1].onclick = function() {
  ProductImg.src = SmallImg[1].src;
}
SmallImg[2].onclick = function() {
  ProductImg.src = SmallImg[2].src;
}
SmallImg[3].onclick = function() {
  ProductImg.src = SmallImg[3].src;
}


// js for toggle form
