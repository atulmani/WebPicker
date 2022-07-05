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
    var valList ;
    document.getElementById("eventLogo").src = result.data.EventLogo;
    document.getElementById("thumb1").src = result.data.EventLogo;
    document.getElementById("hfEventID").value = result.data.Eventid;
    document.getElementById("hfOrganizerID").value = result.data.OrganizerID;
    document.getElementById("eventName").innerHTML = result.data.EventName;
    document.getElementById("organisername").innerHTML = result.data.EventOwnerName;
    if(result.data.EventStartDate != undefined && result.data.EventStartDate != null && result.data.EventStartDate != "")
    {
      var sDate = new Date(result.data.EventStartDate._seconds * 1000);
      document.getElementById("eventstartdate").innerHTML = sDate.toLocaleDateString("en-IN", options);;
    }
    if(result.data.EventEndDate != undefined && result.data.EventEndDate != null && result.data.EventEndDate != "")
    {
      var eDate = new Date(result.data.EventEndDate._seconds * 1000);
      document.getElementById("eventenddate").innerHTML = eDate.toLocaleDateString("en-IN", options);;
    }else
    {
      document.getElementById("dateLink").style.display="none;";
    }



if (result.data.MinimumFee != null && result.data.MinimumFee != undefined && result.data.MinimumFee != "") {
  if (result.data.MaximumFee != null && result.data.MaximumFee != undefined && result.data.MaximumFee != "") {
    if (result.data.MinimumFee != result.data.MaximumFee) {
        // console.log(doc.MinimumFee);
      // h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat) + " - " + doc.MaximumFee.toLocaleString('en-IN', curFormat);
      document.getElementById("eventprice").innerHTML = Number(result.data.MinimumFee).toLocaleString('en-IN', curFormat)
      + " - " + result.data.MaximumFee.toLocaleString('en-IN', curFormat);
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

if(result.data.WithdrawalEndDate != undefined && result.data.WithdrawalEndDate != null && result.data.WithdrawalEndDate != "")
{
  var wDate = new Date(result.data.WithdrawalEndDate._seconds * 1000);
  document.getElementById("withdrawalDate").innerHTML = wDate.toLocaleDateString("en-IN", options);
}
// document.getElementById("eventstatus").innerHTML = result.data.EventStatus;

document.getElementById("organiserEmail").innerHTML = result.data.EventOwnerEmail;
document.getElementById("organiserEmail").href = "mailto: " + result.data.EventOwnerEmail;
document.getElementById("organiserPhone").innerHTML = result.data.EventOwnerPhone;
document.getElementById("organiserPhone").href="tel: +" + result.data.EventOwnerPhone;


    //
    // valList = result.data.CategoryDetails;
    // console.log(valList);
    // document.getElementById("existingEventCategory").innerHTML = "";
    // if (valList != null && valList != undefined) {
    //   for (index = 0; index < valList.length; index++) {
    //     renderCategory(valList[index], index);
    //   }
    // }
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

  var div1 = document.createElement("div");
  div1.setAttribute("class", "form-group col-md-12");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "item");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "post-slide");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "post-content");

  var h1 = document.createElement("h3");
  h1.setAttribute("class", "post-title");
  h1.setAttribute("style", "font-weight:bold");
  h1.innerHTML = obj.CategoryName;

  div4.appendChild(h1);

  var p1 = document.createElement("p");
  p1.setAttribute("class", "description");

  var span1 = document.createElement("span");
  span1.setAttribute("style", "font-weight:bold");
  span1.innerHTML = obj.Gender + " - " + obj.EventType;

  p1.appendChild(span1);
  var br1 = document.createElement("br");
  p1.appendChild(br1);

  // var refdate = new Date(obj.ReferenceDate.seconds * 1000);
  var refdate = new Date(obj.ReferenceDate._seconds * 1000);
  var span2 = document.createElement("span");
  span2.setAttribute("style", "letter-spacing:1px;");
  span2.innerHTML = "Born " + obj.DateRefType + " : " + refdate.toLocaleDateString("en-US", options);

  p1.appendChild(span2);
  var br2 = document.createElement("br");
  p1.appendChild(br2);

  var span3 = document.createElement("span");
  span3.setAttribute("style", "letter-spacing:1px;");
  span3.innerHTML = "Max Team Size :" + obj.MaxTeamSize;

  p1.appendChild(span3);
  var br3 = document.createElement("br");
  p1.appendChild(br3);

  var span4 = document.createElement("span");
  span4.setAttribute("style", "letter-spacing:1px;");
  span4.innerHTML = "Fee :" + obj.Fees.toLocaleString('en-IN', curFormat);

  p1.appendChild(span4);
  var br4 = document.createElement("br");
  p1.appendChild(br4);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "EditCategoryDetails(" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");
  p1.appendChild(i1);

  var i2 = document.createElement("i");
  i2.setAttribute("onclick", "DeleteCategoryDetails(" + index + ");");
  i2.setAttribute("class", "far fa-trash address-edit-icon");
  i2.setAttribute("style", "padding: 0 5px 0 5px;");
  p1.appendChild(i2);
  //
  // var br4 = document.createElement("br");
  // p1.appendChild(br4);
  div4.appendChild(p1);
  div3.appendChild(div4);
  div2.appendChild(div3);
  div1.appendChild(div2);
  document.getElementById("existingEventCategory").appendChild(div1);
}

// js for product gallery

    var ProductImg = document.getElementById("eventLogo");
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
