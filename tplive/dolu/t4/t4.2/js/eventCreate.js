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

function populateSportList() {
  var para = {};
  //console.log(userid);
  para = {
    organizerID: loggedinUser.uid
  };
  console.log(para);
  var ret = firebase.functions().httpsCallable("getSportList");

  ret(para).then(results => {
    console.log("From Function " + results.data.length);
    var sportList = document.getElementById("ddlSports");
    // console.log("From Function " + results.data[0].resultsid);
    for (index = 0; index < results.data.length; index++) {
      // console.log(results.data[index]);
      // console.log(results.data[index]);
      var option = document.createElement("option");
      option.setAttribute("value", results.data[index].Docid + ":" +
        results.data[index].SportName + ":" +
        results.data[index].SportCode);
      option.innerHTML = results.data[index].SportName;
      sportList.appendChild(option);
    }
  });
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


//
// async function getUserList() {
//   var para2 = {};
//   para2 = {
//     paraRole: ['ADMIN', 'PARTICIPANT'],
//   };
//   var organizer = document.getElementById("organizer");
//
//   console.log(para2);
//   const ret2 = firebase.functions().httpsCallable("getUserWithRole");
//   ret2(para2).then(results => {
//     console.log("From Function " + results.data.length);
//     // console.log("From Function " + results.data[0].resultsid);
//     for (index = 0; index < results.data.length; index++) {
//       // console.log(results.data[index]);
//       // console.log(results.data[index]);
//       var option = document.createElement("option");
//       option.setAttribute("value", results.data[index].userid + ":" +
//         results.data[index].UserName + ":" +
//         results.data[index].Email + ":" +
//         results.data[index].Phone + ":" +
//         results.data[index].City + ":" +
//         results.data[index].State);
//       option.innerHTML = results.data[index].UserName + " : " + results.data[index].Email;
//       organizer.appendChild(option);
//     }
//     GetProfileData();
//   });
// }

async function GetProfileData() {
  console.log('GetProfileData - Starts');
  //await getUserList();
  var para1 = {};
  para1 = {
    userID: loggedinUser.uid
  };
  populateSportList();
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
          document.getElementById("saveMessage").style.display = "block";
          document.getElementById("confirmationMessage").innerHTML = "One Organization request is still Pending Approval from Admin. Please reach out to <a href=../contact/index>Admin or contact Us</a>";
          document.getElementById("btnSave").style.display = "none";
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
async function CheckForPendingEvent() {
  var para = {};
  // console.log(userid);
  para = {
    organizerID: loggedinUser.uid,
    approvalStatus: 'Pending Approval',
  };
  console.log(para);
  var ret = firebase.functions().httpsCallable("getAllEventForOrganizerWithStatus");

  return ret(para).then(results => {
    console.log("From Function " + results.data.length);
    // console.log("From Function " + results.data[0].resultsid);
    return results.data.length;
  });
  return 0;

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

    /*
    Eventid: doc1.id,
    EventName: doc1.data().EventName,
    EventType: doc1.data().EventType,
    EventStatus: doc1.data().EventStatus,

    OrganizerID: doc1.data().OrganizerID,
    OrganizerName: doc1.data().OrganizerName,
    OrganizerEmail: doc1.data().OrganizerEmail,
    OrganizerPhone: doc1.data().OrganizerPhone,
    OrganizerLogo: doc1.data().OrganizerLogo,
    EventLogo: doc1.data().EventLogo,

    SportName: doc1.data().SportName,
    EventStartDate: doc1.data().EventStartDate,
    eventEndDate: doc1.data().EventEndDate,
    Venue: doc1.data().Venue,
    City: doc1.data().City,
    State: doc1.data().State,
    RegistrationStartDate: doc1.data().RegistrationStartDate,
    RegistrationEndDate: doc1.data().RegistrationEndDate,
    WithdrawalEndDate: doc1.data().WithdrawalEndDate,

    PaymentMode: doc1.data().PaymentMode,
    ApprovalStatus: doc1.data().ApprovalStatus,
    Comments: doc1.data().Comments,

    RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
    PaymentOpenFlag: doc1.data().PaymentOpenFlag,
    DrawPublishedFlag: doc1.data().DrawPublishedFlag,

    */
    document.getElementById("hfEventID").value = result.data.Eventid;
    document.getElementById("eventName").value = result.data.EventName;

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

    var ddlstate = document.getElementById("inputState");
    var stateVal = result.data.State;
    for (index = 0; index < ddlstate.options.length; index++) {
      if (ddlstate.options[index].innerHTML === stateVal) {
        ddlstate.options[index].selected = true;
        break;
      }
    }

    var ddlIndentity = document.getElementById("inputIdentityType");
    var identityType = result.data.IdentityType;
    for (index = 0; index < ddlIndentity.options.length; index++) {
      if (ddlIndentity.options[index].innerHTML === identityType) {
        ddlIndentity.options[index].selected = true;
        break;
      }
    }

    document.getElementById("identityNumber").value = result.data.IdentityNumber;
    var organizationType = result.data.OrganizationType;
    const rbAcademy = document.getElementById("Academy");
    const rbCorporate = document.getElementById("Corporate");
    const rbSponsor = document.getElementById("Sponsor");
    if (rbAcademy.value === organizationType) {
      rbAcademy.checked = true;
    } else if (rbCorporate.value === organizationType) {
      rbCorporate.checked = true;
    } else if (rbSponsor.value === organizationType) {
      rbSponsor.checked = true;
    }

  });
}



const btnSave = document.getElementById("btnSave");
btnSave.addEventListener('click', e => {
  e.preventDefault();
  console.log("in save");

  const ddlOrganization = document.getElementById("ddlOrganization");
  const ddlSport = document.getElementById("ddlSports");
  var organizerID = document.getElementById("hfOrganizerID").value;
  var eventID = document.getElementById("hfEventID").value;

  var val = ddlOrganization.options[ddlOrganization.selectedIndex].value;
  val = val.split(":");
  var organizationID = val[0];
  var sportName = ddlSport.options[ddlSport.selectedIndex].innerHTML;
  var eventName = document.getElementById("eventName").value;
  var eventOwnerName = document.getElementById("eventOwnerName").value;
  var eventOwnerEmail = document.getElementById("eventOwnerEmail").value;
  var eventOwnerPhone = document.getElementById("eventOwnerPhone").value;
  var eventVenue = document.getElementById("eventVenue").value;

  var locationMap = document.getElementById("locationMap").value;
  var venueContact = document.getElementById("venueContact").value;

  var approvalStatus = document.getElementById("approvalStatus").options[document.getElementById("approvalStatus").selectedIndex].value;
  var confirmMessage = document.getElementById('saveMessage');
  console.log("before check");
  if ((organizerID === "" || organizerID === null) ||
    (organizationID === "" || organizationID === null) ||
    (sportName === "" || sportName === null) ||
    (eventName === "" || eventName === null) ||
    (eventOwnerName === "" || eventOwnerName === null) ||
    (eventOwnerEmail === "" || eventOwnerEmail === null) ||
    (eventOwnerPhone === "" || eventOwnerPhone === null) ||
    (eventVenue === "" || eventVenue === null) ||
    (locationMap === "" || locationMap === null)) {
    console.log("details not filled");
    document.getElementById("confirmationMessage").innerHTML = "Please enter all details to update";
    confirmMessage.style.display = "block";

    setTimeout(function() {
      confirmMessage.style.display = 'none';

    }, 5000);

    window.location.href = "eventList.html";
  } else {

    console.log("details  filled completly");

    var para1 = {};
    para1 = {
      EventID : eventID,
      OrganizationID: organizationID,
      OrganizerID: organizerID,
      SportName: sportName,
      EventName: eventName,
      EventOwnerName: eventOwnerName,
      EventOwnerEmail: eventOwnerEmail,
      EventOwnerPhone: eventOwnerPhone,
      EventVenue: eventVenue,
      LocationMap: locationMap,
      VenueContact: venueContact,
      // OrganizationType: organizationType,
      ApprovalStatus: approvalStatus,
    };
    console.log(para1);
    if (eventID === "" || eventID === undefined || eventID === null) {
      const ret1 = firebase.functions().httpsCallable("addEventDetails");
      ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("Event ID: " + result.data.EventID);
        if (result.data.EventID != "0") {
          confirmMessage.style.display = "block";

          setTimeout(function() {
            confirmMessage.style.display = 'none';
          }, 5000);
          window.location.href = "eventList.html";

        }
      });
    } else {
      console.log(para1);

      const ret1 = firebase.functions().httpsCallable("updateEventDetails");
      ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("organization ID: " + result.data.retCode);
        if (result.data.retCode === "0") {
          var confirmMessage = document.getElementById('saveMessage');
          confirmMessage.style.display = "block";

          setTimeout(function() {
            confirmMessage.style.display = 'none';
          }, 5000);
          window.location.href = "eventList.html";

        }
      });

    }
  }

})
