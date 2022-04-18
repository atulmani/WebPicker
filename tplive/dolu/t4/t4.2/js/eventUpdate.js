var loggedinUser = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var eventID = searchParams.get('id');

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
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../index.html";
  }
});


async function GetProfileData() {
  console.log('GetProfileData - Starts');
  //await getUserList();
  var para1 = {};
  para1 = {
    userID: loggedinUser.uid
  };
  //populateSportList();
  const ret1 = firebase.functions().httpsCallable("getProfileDetails");
  ret1(para1).then(async (result) => {
    var record1 = result.data;
    var approvalStatus = document.getElementById("approvalStatus");
    if (result.data.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
      console.log("in admin");
      populateOrganizationList("All");

      if (eventID != "" && eventID != undefined && eventID != null) {

        document.getElementById("hfEventID").value = eventID;
        document.getElementById("btnSave").innerHTML = "Update";
        GetEventDetails();
      } else {
        for (index = 0; index < approvalStatus.options.length; index++) {
          if (approvalStatus.options[index].value === "Approved") {
            approvalStatus.options[index].selected = true;
            break;
          }
        }
      }
    } else if (result.data.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {

      console.log("Organizer");
      populateOrganizationList(loggedinUser.uid);
      var organizationid = document.getElementById("ddlOrganization");
      approvalStatus.disabled = true;

      document.getElementById("hfOrganizerID").value = loggedinUser.uid;
      for (index = 0; index < organizationid.options.length; index++) {
        if (organizationid.options[index].value.search(loggedinUser.uid) >= 0) {
          organizationid.options[index].selected = true;
          onOrganizationSelection();
          break;
        }
      }

      if (eventID != "" && eventID != undefined && eventID != null) {

        document.getElementById("hfEventID").value = eventID;
        document.getElementById("btnSave").innerHTML = "Update";
        GetEventDetails();
      } else {

        ///Check for any pending OrganizationName

        var checkPending = await CheckForPendingEvent();
        console.log(checkPending);
        if (checkPending > 0) {
          document.getElementById("fInput").style.display = "none";
          document.getElementById("errorMessage").style.display = "block";
          document.getElementById("errorMessage").innerHTML = "One Organization request is still Pending Approval from Admin. Please reach out to <a href=../contact/index>Admin or contact Us</a>";

        } else {
          for (index = 0; index < approvalStatus.options.length; index++) {
            if (approvalStatus.options[index].value === "Pending Approval") {
              approvalStatus.options[index].selected = true;
              break;
            }
          }
        }
      }
    } else {
      console.log("not admin");
      document.getElementById("fInput").style.display = "none";
      document.getElementById("errorMessage").style.display = "block";
    }
  });

}


function onOrganizationSelection() {
  var organizer = document.getElementById("ddlOrganization");
  var val = organizer.options[organizer.selectedIndex].value;
  val = val.split(":");
  console.log(val);

  if (organizer.selectedIndex > 0) {
    var organizationID = val[0];
    var organizerID = val[1];
    var partnerName = val[2];
    var organizationName = val[3];
    var email = val[4];
    var phone = val[5].replace("+91", "");

    document.getElementById("eventOwnerName").value = partnerName;
    document.getElementById("eventOwnerEmail").value = email;
    document.getElementById("eventOwnerPhone").value = phone;
    document.getElementById("hfOrganizerID").value = organizerID;
  }
}

function populateOrganizationList(userid) {
  var para = {};
  console.log(userid);
  para = {
    organizerID: loggedinUser.uid
  };
  console.log(para);
  var ret = "";
  if (userid === "All") {
    ret = firebase.functions().httpsCallable("getAllOrganizationDetails");

  } else {
    ret = firebase.functions().httpsCallable("getAllOrganizationDetailsForOrganizer");

  }

  ret(para).then(results => {
    console.log("From Function " + results.data.length);
    var organizer = document.getElementById("ddlOrganization");
    // console.log("From Function " + results.data[0].resultsid);
    for (index = 0; index < results.data.length; index++) {
      // console.log(results.data[index]);
      // console.log(results.data[index]);
      var option = document.createElement("option");
      option.setAttribute("value", results.data[index].resultsid + ":" +
        results.data[index].OrganizerID + ":" +
        results.data[index].PartnerName + ":" +
        results.data[index].OrganizationName + ":" +
        results.data[index].PartnerEmailID + ":" +
        results.data[index].PartnerPhone);
      option.innerHTML = results.data[index].OrganizationName + " : " + results.data[index].PartnerEmailID;
      organizer.appendChild(option);
    }
  });
}



function GetEventDetails() {
  console.log(eventID);
  var para1 = {};
  para1 = {
    EventID: eventID
  };
  const ret1 = firebase.functions().httpsCallable("getEventDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);

    document.getElementById("hfEventID").value = result.data.Eventid;
    document.getElementById("hfOrganizerID").value = result.data.OrganizerID;
    document.getElementById("eventName").value = result.data.EventName;

    var sportName = document.getElementById("ddlSports");
    var sportNameVal = result.data.SportName;
    for (index = 0; index < sportName.options.length; index++) {
      if (sportName.options[index].value === sportNameVal) {
        sportName.options[index].selected = true;
        break;
      }
    }

    var approvalStatus = document.getElementById("approvalStatus");
    var approvalS = result.data.ApprovalStatus;
    for (index = 0; index < approvalStatus.options.length; index++) {
      if (approvalStatus.options[index].value === approvalS) {
        approvalStatus.options[index].selected = true;
        break;
      }
    }

    var orgID = result.data.id;
    console.log(orgID);
    var organizationid = document.getElementById("organizer");
    document.getElementById("hfOrganizerID").value = result.data.OrganizerID;
    // console.log(organizationid.options.length);
    for (index = 0; index < organizationid.options.length; index++) {
      // console.log(organizationid.options[index].value);

      if (organizationid.options[index].value.search(orgID) >= 0) {
        organizationid.options[index].selected = true;
        break;
      }
    }
    /*
    EventType: doc1.data().EventType,
    EventStatus: doc1.data().EventStatus,

    OrganizerLogo: doc1.data().OrganizerLogo,
    EventLogo: doc1.data().EventLogo,

    City: doc1.data().City,
    State: doc1.data().State,

    RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
    PaymentOpenFlag: doc1.data().PaymentOpenFlag,
    DrawPublishedFlag: doc1.data().DrawPublishedFlag,

    */
    document.getElementById("eventOwnerName").value = result.data.OrganizerName;
    document.getElementById("eventOwnerEmail").value = result.data.OrganizerEmail;
    document.getElementById("eventOwnerPhone").value = result.data.OrganizerPhone;
    document.getElementById("eventVenue").value = result.data.Venue;
    document.getElementById("locationMap").value = result.data.LocationMap;
    document.getElementById("venueContact").value = result.data.VenueContact;
    document.getElementById("RegistrationOpenDate").value = result.data.RegistrationStartDate;
    document.getElementById("RegistrationClosedDate").value = result.data.RegistrationEndDate;
    document.getElementById("EventStartDate").value = result.data.EventStartDate;
    document.getElementById("EventEndDate").value = result.data.eventEndDate;
    document.getElementById("WithdrawalLastDate").value = result.data.WithdrawalEndDate;
    document.getElementById("maxEntryForParticipant").value = result.data.MaxEntryForParticipant;
    document.getElementById("ConvenienceCharge").value = result.data.ConvenienceCharge;
    document.getElementById("MiscellaneousChargeMandatory").value = result.data.MiscellaneousChargeMandatory;
    document.getElementById("MiscellaneousChargeRemark").value = result.data.MiscellaneousChargeRemark;
    document.getElementById("MiscellaneousChargeFee").value = result.data.MiscellaneousChargeFee;
    document.getElementById("DiscountRemark").value = result.data.DiscountRemark;
    document.getElementById("DiscountValue").value = result.data.DiscountValue;
    document.getElementById("OnlinePaymentGateway").value = result.data.OnlinePaymentGateway;
    document.getElementById("RegistrationCompletePostPayment").value = result.data.RegistrationCompletePostPayment;
    document.getElementById("noticeBoard").value = result.data.NoticeBoard;
    document.getElementById("Announcement").value = result.data.Announcement;
    document.getElementById("RulesAndRegulation").value = result.data.RulesAndRegulation;

    if (result.data.ClosedEventFlag === true) {
      document.getElementById('ClosedEvent').checked = true;
    }


    if (result.data.RegistrationStatusOnFlag === true) {
      document.getElementById('RegistrationStatusOn').checked = true;
    }

    if (result.data.RegistrationCompletePostPaymentFlag === true) {
      document.getElementById('RegistrationCompletePostPayment').checked = true;
    }

    if (result.data.OnlinePaymentGatewayFlag === true) {
      document.getElementById('OnlinePaymentGateway').checked = true;
    }

    if (result.data.PublishDrawFlag === true) {
      document.getElementById('PublishDraw').checked = true;
    }

    if (result.data.PublishSeedEntryFlag === true) {
      document.getElementById('PublishSeedEntry').checked = true;
    }

    if (result.data.PublishMatchScheduleFlag === true) {
      document.getElementById('PublishMatchSchedule').checked = true;
    }

    if (result.data.PublishGallaryFlag === true) {
      document.getElementById('PublishGallary').checked = true;
    }
  });
}

var btnSave = document.getElementById('btnSave');
btnSave.addEventListener('click', e => {
  // e.preventDefault();
  //save detailes in DB
}

var btnNext = document.getElementById('btnNext');
btnNext.addEventListener('click', e => {
  e.preventDefault();
  alert("next");
  console.log("next");
  document.getElementById("section1").style.display="none";
  document.getElementById("section2").style.display="block";
}


var btnSave2 = document.getElementById('btnSave2');
btnSave2.addEventListener('click', e => {
  // e.preventDefault();
  //save detailes in DB
}

var btnNext2 = document.getElementById('btnNext2');
btnNext2.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section2").style.display="none";
  document.getElementById("section3").style.display="block";
}

var btnPrevious2 = document.getElementById('btnPrevious2');
btnPrevious2.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section2").style.display="none";
  document.getElementById("section1").style.display="block";
}

var btnSave3 = document.getElementById('btnSave3');
btnSave3.addEventListener('click', e => {
  // e.preventDefault();
  //save detailes in DB
}

var btnNext3 = document.getElementById('btnNext3');
btnNext3.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section3").style.display="none";
  document.getElementById("section4").style.display="block";
}

var btnPrevious3 = document.getElementById('btnPrevious3');
btnPrevious3.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section3").style.display="none";
  document.getElementById("section2").style.display="block";
}

var btnSave4 = document.getElementById('btnSave4');
btnSave4.addEventListener('click', e => {
  // e.preventDefault();
  //save detailes in DB
}

var btnNext4 = document.getElementById('btnNext4');
btnNext4.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section4").style.display="none";
  document.getElementById("section5").style.display="block";
}

var btnPrevious4 = document.getElementById('btnPrevious4');
btnPrevious4.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section4").style.display="none";
  document.getElementById("section3").style.display="block";
}

var btnSave5 = document.getElementById('btnSave5');
btnSave5.addEventListener('click', e => {
  // e.preventDefault();
  //save detailes in DB
}

var btnNext5 = document.getElementById('btnNext5');
btnNext5.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section5").style.display="none";
  document.getElementById("section6").style.display="block";
}

var btnPrevious5 = document.getElementById('btnPrevious5');
btnPrevious5.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section5").style.display="none";
  document.getElementById("section4").style.display="block";
}

var btnSave6 = document.getElementById('btnSave6');
btnSave6.addEventListener('click', e => {
  // e.preventDefault();
  //save detailes in DB
}

var btnNext6 = document.getElementById('btnNext6');
btnNext6.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section6").style.display="none";
  document.getElementById("section7").style.display="block";
}

var btnPrevious6 = document.getElementById('btnPrevious6');
btnPrevious6.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section6").style.display="none";
  document.getElementById("section5").style.display="block";
}


var btnSave7 = document.getElementById('btnSave7');
btnSave7.addEventListener('click', e => {
  // e.preventDefault();
  //save detailes in DB
}

var btnPrevious7 = document.getElementById('btnPrevious7');
btnPrevious7.addEventListener('click', e => {
  // e.preventDefault();
  document.getElementById("section7").style.display="none";
  document.getElementById("section6").style.display="block";
}
