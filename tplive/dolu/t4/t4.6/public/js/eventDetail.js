let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');
var loggedinUser = "";

window.onload = function() {
  // yourFunction(param1, param2);
  GetEventDetails();
  GetEventCategory();

  localStorage.setItem("EventID",eventID);

};

auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);

      GetProfileData();
    } else {
      loggedinUser = null;

    }

  } catch (error) {
    console.log(error.message);
    // window.location.href = "../index.html";
  }
});

async function GetProfileData() {
  console.log('GetProfileData - Starts');
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  // if (userProfile != undefined && userProfile != "" && userProfile != null) {
  //   if (userProfile.id != "0") {
  //     document.getElementById("userName").innerHTML = userProfile.UserName;
  //     document.getElementById("userlocation").innerHTML = userProfile.City;
  //
  //     if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
  //       console.log("in admin");
  //     } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
  //       console.log("organizer");
  //       // document.getElementById("fInput").style.display="none";
  //     } else {
  //       console.log("not admin");
  //       document.getElementById("containerOrgList").style.display = "none";
  //       document.getElementById("errorMessage").style.display = "block";
  //     }
  //   } else {
  //     console.log("not admin");
  //     document.getElementById("containerOrgList").style.display = "none";
  //     document.getElementById("errorMessage").style.display = "block";
  //   }
  // }

}


function GetEventDetails() {
  console.log(eventID);
  var para1 = {};
  para1 = {
    EventID: eventID
  };
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const ret1 = firebase.functions().httpsCallable("getEventDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);

    localStorage.setItem("eventDetails", JSON.stringify(result.data));

    document.getElementById("hfEventID").value = result.data.Eventid;
    document.getElementById("hfOrganizerID").value = result.data.OrganizerID;
    document.getElementById("eventName").innerHTML = result.data.EventName;
    document.getElementById("organisername").innerHTML = result.data.EventOwnerName;

    if (result.data.EventStartDate != "" && result.data.EventStartDate != undefined && result.data.EventStartDate != null)
      document.getElementById("eventstartdate").innerHTML = new Date(result.data.EventStartDate._seconds * 1000).toLocaleDateString("en-US", options);
    if (result.data.EventEndDate != "" && result.data.EventEndDate != undefined && result.data.EventEndDate != null)
      document.getElementById("eventenddate").innerHTML = new Date(result.data.EventEndDate._seconds * 1000).toLocaleDateString("en-US", options);

    document.getElementById("eventprice").innerHTML = result.data.MinimumFee + " - " + result.data.MaximumFee;
    // document.getElementById("eventprice").value = result.data.EventPrize;

    document.getElementById("eventVenue").innerHTML = result.data.EventVenue;
    //document.getElementById("eventCategory").innerHTML = "bs;Bd";
    document.getElementById("eventstatus").innerHTML = "Upcoming";
    document.getElementById("organiserEmail").innerHTML = "Upcoming";

    if (result.data.WithdrawalEndDate != "" && result.data.WithdrawalEndDate != undefined && result.data.WithdrawalEndDate != null)
      document.getElementById("withdrawalDate").innerHTML = new Date(result.data.WithdrawalEndDate._seconds * 1000).toLocaleDateString("en-US", options);

    document.getElementById("organiserEmail").innerHTML = result.data.EventOwnerEmail;

    if (result.data.OrganizerPhone != undefined)
      document.getElementById("organiserPhone").innerHTML = result.data.EventOwnerPhone;


    document.getElementById("RulesAndRegulation").innerHTML = result.data.RulesAndRegulations;

    ///////////
    // var sportName = document.getElementById("ddlSports");
    // var sportNameVal = result.data.SportName;
    // for (index = 0; index < sportName.options.length; index++) {
    //   if (sportName.options[index].value === sportNameVal) {
    //     sportName.options[index].selected = true;
    //     break;
    //   }
    // }

    // var approvalStatus = document.getElementById("approvalStatus");
    // var approvalS = result.data.ApprovalStatus;
    // for (index = 0; index < approvalStatus.options.length; index++) {
    //   if (approvalStatus.options[index].value === approvalS) {
    //     approvalStatus.options[index].selected = true;
    //     break;
    //   }
    // }
    //
    // var organizationid = document.getElementById("ddlOrganization");
    // console.log(result.data.OrganizerID);
    // console.log(organizationid.options.length);
    // for (index = 0; index < organizationid.options.length; index++) {
    //   // console.log(organizationid.options[index].value);
    //   console.log(organizationid.options[index].value);
    //   console.log(organizationid.options[index].value.search(result.data.OrganizerID));
    //   if (organizationid.options[index].value.search(result.data.OrganizerID) >= 0) {
    //     organizationid.options[index].selected = true;
    //     break;
    //   }
    // }

    // document.getElementById("locationMap").value = result.data.LocationMap;
    // document.getElementById("venueContact").value = result.data.VenueContact;

    //section 2
    // if (result.data.RegistrationStartDate != "" && result.data.RegistrationStartDate != undefined && result.data.RegistrationStartDate != null)
    //   document.getElementById("RegistrationOpenDate").value = new Date(result.data.RegistrationStartDate._seconds * 1000).toLocaleDateString("en-US", options);
    // if (result.data.RegistrationEndDate != "" && result.data.RegistrationEndDate != undefined && result.data.RegistrationEndDate != null)
    //   document.getElementById("RegistrationClosedDate").value = new Date(result.data.RegistrationEndDate._seconds * 1000).toLocaleDateString("en-US", options);
    // document.getElementById("maxEntryForParticipant").value = result.data.MaxEntryForParticipant;

    //section 3
    // document.getElementById("ConvenienceCharge").value = result.data.ConvenienceCharge;
    // if (result.data.IsMiscellaneousChargeMandatory === "YES") {
    //   document.getElementById("MiscellaneousChargeMandatory").checked = true;
    //   // document.getElementById("MiscellaneousChargeMandatory").value = result.data.IsMiscellaneousChargeMandatory;
    // }
    // document.getElementById("MiscellaneousChargeRemark").value = result.data.MiscellaneousChargeRemark;
    // document.getElementById("MiscellaneousChargeFee").value = result.data.MiscellaneousChargeFees;
    // document.getElementById("DiscountRemark").value = result.data.DiscountRemarks;
    // document.getElementById("DiscountValue").value = result.data.DiscountValue;
    // if (result.data.OnlinePaymentModeFlag === "YES") {
    //   document.getElementById("OnlinePaymentGateway").checked = true;
    //   // document.getElementById("OnlinePaymentGateway").value = result.data.OnlinePaymentModeFlag;
    // }
    // if (result.data.RegistrationCompletePostPaymentFlag === "YES") {
    //   document.getElementById("RegistrationCompletePostPayment").checked = true;
    //   // document.getElementById("RegistrationCompletePostPayment").value = result.data.RegistrationCompletePostPayment;
    // }
    //
    // //section 4
    // document.getElementById("noticeBoard").value = result.data.NoticeBoard;
    //
    // //section 5
    // document.getElementById("Announcement").value = result.data.Announcement;
    // //section 6

    //section 7
    // if (result.data.CloseEventFlag === "YES") {
    //   document.getElementById('ClosedEvent').checked = true;
    // }
    //
    // if (result.data.RegistrationOpenFlag === "YES") {
    //   document.getElementById('RegistrationStatusOn').checked = true;
    // }
    //
    // if (result.data.RegistrationCompletePostPayment === "YES") {
    //   document.getElementById('RegistrationCompletePostPayment').checked = true;
    // }
    //
    // if (result.data.OnlinePaymentGatewayFlag === "YES") {
    //   document.getElementById('OnlinePaymentGateway').checked = true;
    // }
    //
    // if (result.data.PublishDrawFlag === "YES") {
    //   document.getElementById('PublishDraw').checked = true;
    // }
    //
    // if (result.data.PublishSeedEntryFlag === "YES") {
    //   document.getElementById('PublishSeedEntry').checked = true;
    // }

    // if (result.data.PublishScheduleFlag === "YES") {
    //   document.getElementById('PublishMatchSchedule').checked = true;
    // }
    //
    // if (result.data.PublishGalleryFlag === "YES") {
    //   document.getElementById('PublishGallery').checked = true;
    // }
  });
}



function GetEventCategory() {
  console.log(eventID);
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var para1 = {};
  para1 = {
    EventID: eventID
  };
  var catList ="";
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("getEventCategoryDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);

    localStorage.setItem("eventCategory", JSON.stringify(result.data));

    var catDetails = result.data.CategoryDetails;
    if (catDetails != null && catDetails != undefined) {

      for (index = 0; index < catDetails.length; index++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = index + 1;
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = catDetails[index].CategoryName;
        tr.appendChild(td2);
        catList = catList +  catDetails[index].CategoryName +" ,";

        var td3 = document.createElement("td");
        td3.innerHTML = catDetails[index].Gender + "-" + catDetails[index].EventType;
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.innerHTML = catDetails[index].Fees;
        tr.appendChild(td4);
        document.getElementById("eventCategoryDetails").appendChild(tr);

      }
      document.getElementById("eventCategory").innerHTML = catList;

    }
  });
}


var btnBooking = document.getElementById("btnBooking");
btnBooking.addEventListener('click', btnBookingClick, false);
function btnBookingClick()
{
  //e.preventDefault();
  window.location.href = "eventRegistration.html?id=" + document.getElementById("hfEventID").value;
};
