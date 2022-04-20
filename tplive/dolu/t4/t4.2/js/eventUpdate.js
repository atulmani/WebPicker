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
  populateSportList();
  var userProfile =JSON.parse( localStorage.getItem("userProfile"));
  if(userProfile != undefined && underProfile != "" userProfile != null )
  {
    var approvalStatus = document.getElementById("approvalStatus");
    if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
      console.log("in admin");
      var asynccall = await populateOrganizationList("All", 'Admin');

    } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {

      console.log("Organizer");
      var asynccall = await populateOrganizationList(loggedinUser.uid, 'Organizer');

    } else {
      console.log("not admin");
      document.getElementById("fInput").style.display = "none";
      document.getElementById("errorMessage").style.display = "block";
    }
}
else {
    window.location.assign('../index.html');
  }

}

//
// async function GetProfileDataOld() {
//   console.log('GetProfileData - Starts');
//   //await getUserList();
//   var para1 = {};
//   para1 = {
//     userID: loggedinUser.uid
//   };
//   populateSportList();
//   const ret1 = firebase.functions().httpsCallable("getProfileDetails");
//   ret1(para1).then(async (result) => {
//     var record1 = result.data;
//     var approvalStatus = document.getElementById("approvalStatus");
//     if (result.data.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
//       console.log("in admin");
//       var asynccall = await populateOrganizationList("All", 'Admin');
//       // if (eventID != "" && eventID != undefined && eventID != null) {
//       //
//       //   document.getElementById("hfEventID").value = eventID;
//       //   document.getElementById("btnSave").innerHTML = "Update";
//       //   GetEventDetails();
//       // } else {
//       //   for (index = 0; index < approvalStatus.options.length; index++) {
//       //     if (approvalStatus.options[index].value === "Approved") {
//       //       approvalStatus.options[index].selected = true;
//       //       break;
//       //     }
//       //   }
//       // }
//
//     } else if (result.data.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
//
//       console.log("Organizer");
//       var asynccall = await populateOrganizationList(loggedinUser.uid, 'Organizer');
//       // var organizationid = document.getElementById("ddlOrganization");
//       // approvalStatus.disabled = true;
//       //
//       // document.getElementById("hfOrganizerID").value = loggedinUser.uid;
//       // for (index = 0; index < organizationid.options.length; index++) {
//       //   if (organizationid.options[index].value.search(loggedinUser.uid) >= 0) {
//       //     organizationid.options[index].selected = true;
//       //     onOrganizationSelection();
//       //     break;
//       //   }
//       // }
//       //
//       // if (eventID != "" && eventID != undefined && eventID != null) {
//       //
//       //   document.getElementById("hfEventID").value = eventID;
//       //   document.getElementById("btnSave").innerHTML = "Update";
//       //   GetEventDetails();
//       // } else {
//       //
//       //     for (index = 0; index < approvalStatus.options.length; index++) {
//       //       if (approvalStatus.options[index].value === "Pending Approval") {
//       //         approvalStatus.options[index].selected = true;
//       //         break;
//       //       }
//       //     }
//       //
//       // }
//     } else {
//       console.log("not admin");
//       document.getElementById("fInput").style.display = "none";
//       document.getElementById("errorMessage").style.display = "block";
//     }
//   });
//
// }
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

async function populateOrganizationList(userid, role) {
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
    console.log("From Function populateOrganizationList" + results.data.length);
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
      if (role === 'Admin') {
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
      } else if (role === 'Organizer') {
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

          for (index = 0; index < approvalStatus.options.length; index++) {
            if (approvalStatus.options[index].value === "Pending Approval") {
              approvalStatus.options[index].selected = true;
              break;
            }
          }

        }
      }
    }
  });
}


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

    var Eventid = result.data.Eventid;
    console.log(Eventid);
    var organizationid = document.getElementById("ddlOrganization");
    document.getElementById("hfOrganizerID").value = result.data.OrganizerID;
    console.log(result.data.OrganizerID);
    console.log(organizationid.options.length);
    for (index = 0; index < organizationid.options.length; index++) {
      // console.log(organizationid.options[index].value);
      console.log(organizationid.options[index].value);
      console.log(organizationid.options[index].value.search(result.data.OrganizerID));
      if (organizationid.options[index].value.search(result.data.OrganizerID) >= 0) {
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
    var options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    //  dob = dob.toLocaleDateString("en-US", options);

    document.getElementById("eventOwnerName").value = result.data.EventOwnerName;
    document.getElementById("eventOwnerEmail").value = result.data.EventOwnerEmail;
    if (result.data.OrganizerPhone != undefined)
      document.getElementById("eventOwnerPhone").value = result.data.EventOwnerPhone;
    document.getElementById("eventVenue").value = result.data.EventVenue;
    document.getElementById("locationMap").value = result.data.LocationMap;
    document.getElementById("venueContact").value = result.data.VenueContact;

    //section 2
    if (result.data.RegistrationStartDate != "" && result.data.RegistrationStartDate != undefined && result.data.RegistrationStartDate != null)
      document.getElementById("RegistrationOpenDate").value = new Date(result.data.RegistrationStartDate._seconds * 1000).toLocaleDateString("en-US", options);
    if (result.data.RegistrationEndDate != "" && result.data.RegistrationEndDate != undefined && result.data.RegistrationEndDate != null)
      document.getElementById("RegistrationClosedDate").value = new Date(result.data.RegistrationEndDate._seconds * 1000).toLocaleDateString("en-US", options);
    if (result.data.EventStartDate != "" && result.data.EventStartDate != undefined && result.data.EventStartDate != null)

      document.getElementById("EventStartDate").value = new Date(result.data.EventStartDate._seconds * 1000).toLocaleDateString("en-US", options);
    if (result.data.EventEndDate != "" && result.data.EventEndDate != undefined && result.data.EventEndDate != null)

      document.getElementById("EventEndDate").value = new Date(result.data.EventEndDate._seconds * 1000).toLocaleDateString("en-US", options);
    if (result.data.WithdrawalEndDate != "" && result.data.WithdrawalEndDate != undefined && result.data.WithdrawalEndDate != null)

      document.getElementById("WithdrawalLastDate").value = new Date(result.data.WithdrawalEndDate._seconds * 1000).toLocaleDateString("en-US", options);
    document.getElementById("maxEntryForParticipant").value = result.data.MaxEntryForParticipant;

    //section 3
    document.getElementById("ConvenienceCharge").value = result.data.ConvenienceCharge;
    if (result.data.IsMiscellaneousChargeMandatory === "YES") {
      document.getElementById("MiscellaneousChargeMandatory").checked = true;
      // document.getElementById("MiscellaneousChargeMandatory").value = result.data.IsMiscellaneousChargeMandatory;
    }
    document.getElementById("MiscellaneousChargeRemark").value = result.data.MiscellaneousChargeRemark;
    document.getElementById("MiscellaneousChargeFee").value = result.data.MiscellaneousChargeFees;
    document.getElementById("DiscountRemark").value = result.data.DiscountRemarks;
    document.getElementById("DiscountValue").value = result.data.DiscountValue;
    if (result.data.OnlinePaymentModeFlag === "YES") {
      document.getElementById("OnlinePaymentGateway").checked = true;
      // document.getElementById("OnlinePaymentGateway").value = result.data.OnlinePaymentModeFlag;
    }
    if (result.data.RegistrationCompletePostPaymentFlag === "YES") {
      document.getElementById("RegistrationCompletePostPayment").checked = true;
      // document.getElementById("RegistrationCompletePostPayment").value = result.data.RegistrationCompletePostPayment;
    }

    //section 4
    document.getElementById("noticeBoard").value = result.data.NoticeBoard;

    //section 5
    document.getElementById("Announcement").value = result.data.Announcement;
    //section 6
    document.getElementById("RulesAndRegulation").value = result.data.RulesAndRegulations;

    //section 7
    if (result.data.CloseEventFlag === "YES") {
      document.getElementById('ClosedEvent').checked = true;
    }

    if (result.data.RegistrationOpenFlag === "YES") {
      document.getElementById('RegistrationStatusOn').checked = true;
    }

    if (result.data.RegistrationCompletePostPayment === "YES") {
      document.getElementById('RegistrationCompletePostPayment').checked = true;
    }

    if (result.data.OnlinePaymentGatewayFlag === "YES") {
      document.getElementById('OnlinePaymentGateway').checked = true;
    }

    if (result.data.PublishDrawFlag === "YES") {
      document.getElementById('PublishDraw').checked = true;
    }

    if (result.data.PublishSeedEntryFlag === "YES") {
      document.getElementById('PublishSeedEntry').checked = true;
    }

    if (result.data.PublishScheduleFlag === "YES") {
      document.getElementById('PublishMatchSchedule').checked = true;
    }

    if (result.data.PublishGalleryFlag === "YES") {
      document.getElementById('PublishGallery').checked = true;
    }
  });
}

var btnSave = document.getElementById('btnSave');
btnSave.addEventListener('click', e => {
  e.preventDefault();
  var ddlOrganization = document.getElementById("ddlOrganization");
  var val = ddlOrganization.options[ddlOrganization.selectedIndex].value;
  val = val.split(":");
  if (ddlOrganization.selectedIndex > 0) {
    var organizationID = val[0];
    var organizerID = val[1];
  }
  var EventID = document.getElementById("hfEventID").value;
  var ddlSports = document.getElementById("ddlSports");
  var sportName = ddlSports.options[ddlSports.selectedIndex].text;
  var eventName = document.getElementById("eventName").value;
  var eventOwnerName = document.getElementById("eventOwnerName").value;
  var eventOwnerEmail = document.getElementById("eventOwnerEmail").value;
  var eventOwnerPhone = document.getElementById("eventOwnerPhone").value;
  var eventVenue = document.getElementById("eventVenue").value;
  var locationMap = document.getElementById("locationMap").value;
  var venueContact = document.getElementById("venueContact").value;
  var ddlapprovalStatus = document.getElementById("approvalStatus");
  var approvalStatus = ddlapprovalStatus.options[ddlapprovalStatus.selectedIndex].value;
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    EventName: eventName,
    EventType: '',
    EventStatus: 'Open',
    OrganizationID: organizationID,
    OrganizerID: organizerID,
    SportName: sportName,
    City: '',
    State: '',
    EventOwnerName: eventOwnerName,
    EventOwnerEmail: eventOwnerEmail,
    EventOwnerPhone: eventOwnerPhone,
    EventVenue: eventVenue,
    LocationMap: locationMap,
    VenueContact: venueContact,
    ApprovalStatus: approvalStatus,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventBasicDetails");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage');
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var btnNext = document.getElementById('btnNext');
btnNext.addEventListener('click', e => {
  e.preventDefault();
  // alert("next");
  console.log("next");
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "block";
});
//
// function btnNextClick()
// {
//     document.getElementById("section1").style.display="none";
//     document.getElementById("section2").style.display="block";
//
// }
var btnSave2 = document.getElementById('btnSave2');
btnSave2.addEventListener('click', e => {
  e.preventDefault();
  //save detailes in DB
  var EventID = document.getElementById("hfEventID").value;

  var RegistrationStartDate = new Date(document.getElementById("RegistrationOpenDate").value);
  console.log(new Date(RegistrationStartDate));
  var RegistrationEndDate = new Date(document.getElementById("RegistrationClosedDate").value);
  var EventStartDate = new Date(document.getElementById("EventStartDate").value);
  var EventEndDate = new Date(document.getElementById("EventEndDate").value);
  var WithdrawalEndDate = new Date(document.getElementById("WithdrawalLastDate").value);
  var maxEntryForParticipant = document.getElementById("maxEntryForParticipant").value;
  if (maxEntryForParticipant === "" || maxEntryForParticipant === null || maxEntryForParticipant === undefined || maxEntryForParticipant === 0)
    maxEntryForParticipant = -1;
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    RegistrationStartDate: RegistrationStartDate,
    RegistrationEndDate: RegistrationEndDate,
    EventStartDate: EventStartDate,
    EventEndDate: EventEndDate,
    WithdrawalEndDate: WithdrawalEndDate,
    maxEntryForParticipant: maxEntryForParticipant,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventDetails_Dates");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage2');
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });
});

var btnNext2 = document.getElementById('btnNext2');
btnNext2.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section2").style.display = "none";
  document.getElementById("section3").style.display = "block";
});

var btnPrevious2 = document.getElementById('btnPrevious2');
btnPrevious2.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section2").style.display = "none";
  document.getElementById("section1").style.display = "block";
});

var btnSave3 = document.getElementById('btnSave3');
btnSave3.addEventListener('click', e => {
  e.preventDefault();
  //save detailes in DB

  var EventID = document.getElementById("hfEventID").value;
  var ConvenienceCharge = document.getElementById("ConvenienceCharge").value;
  var IsMiscellaneousChargeMandatory = "NO";
  if (document.getElementById("MiscellaneousChargeMandatory").checked === true) {
    IsMiscellaneousChargeMandatory = "YES";
  }
  var MiscellaneousChargeRemark = document.getElementById("MiscellaneousChargeRemark").value;
  var MiscellaneousChargeFees = document.getElementById("MiscellaneousChargeFee").value;
  var DiscountRemarks = document.getElementById("DiscountRemark").value;
  var DiscountValue = document.getElementById("DiscountValue").value;
  var OnlinePaymentModeFlag = "NO";
  if (document.getElementById("OnlinePaymentGateway").checked === true) {
    OnlinePaymentModeFlag = "YES";
  }
  var RegistrationCompletePostPayment = "NO";
  if (document.getElementById("RegistrationCompletePostPayment").checked === true) {
    RegistrationCompletePostPayment = "YES";
  }
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    ConvenienceCharge: ConvenienceCharge,
    IsMiscellaneousChargeMandatory: IsMiscellaneousChargeMandatory,
    MiscellaneousChargeRemark: MiscellaneousChargeRemark,
    MiscellaneousChargeFees: MiscellaneousChargeFees,
    DiscountRemarks: DiscountRemarks,
    DiscountValue: DiscountValue,
    OnlinePaymentModeFlag: OnlinePaymentModeFlag,
    RegistrationCompletePostPayment: RegistrationCompletePostPayment,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventDetails_PaymentStatus");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage3');
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var btnNext3 = document.getElementById('btnNext3');
btnNext3.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section3").style.display = "none";
  document.getElementById("section4").style.display = "block";
});

var btnPrevious3 = document.getElementById('btnPrevious3');
btnPrevious3.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section3").style.display = "none";
  document.getElementById("section2").style.display = "block";
});

var btnSave4 = document.getElementById('btnSave4');
btnSave4.addEventListener('click', e => {
  e.preventDefault();
  //save detailes in DB
  var EventID = document.getElementById("hfEventID").value;
  var NoticeBoard = document.getElementById("noticeBoard").value;
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    NoticeBoard: NoticeBoard,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventDetails_NoticeBoard");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage4');
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var btnNext4 = document.getElementById('btnNext4');
btnNext4.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section4").style.display = "none";
  document.getElementById("section5").style.display = "block";
});

var btnPrevious4 = document.getElementById('btnPrevious4');
btnPrevious4.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section4").style.display = "none";
  document.getElementById("section3").style.display = "block";
});

var btnSave5 = document.getElementById('btnSave5');
btnSave5.addEventListener('click', e => {
  e.preventDefault();
  //save detailes in DB
  var EventID = document.getElementById("hfEventID").value;
  var Announcement = document.getElementById("Announcement").value;
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    Announcement: Announcement,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventDetails_Announcement");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage5');
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var btnNext5 = document.getElementById('btnNext5');
btnNext5.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section5").style.display = "none";
  document.getElementById("section6").style.display = "block";
});

var btnPrevious5 = document.getElementById('btnPrevious5');
btnPrevious5.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section5").style.display = "none";
  document.getElementById("section4").style.display = "block";
});

var btnSave6 = document.getElementById('btnSave6');
btnSave6.addEventListener('click', e => {
  e.preventDefault();
  //save detailes in DB

  var EventID = document.getElementById("hfEventID").value;
  var RulesAndRegulation = document.getElementById("RulesAndRegulation").value;
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    RulesAndRegulations: RulesAndRegulation,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventDetails_RulesAndRegulations");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage5');
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var btnNext6 = document.getElementById('btnNext6');
btnNext6.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section6").style.display = "none";
  document.getElementById("section7").style.display = "block";
});

var btnPrevious6 = document.getElementById('btnPrevious6');
btnPrevious6.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section6").style.display = "none";
  document.getElementById("section5").style.display = "block";
});

//
// var btnSave7 = document.getElementById('btnSave7');
// btnSave7.addEventListener('click', e => {
//    e.preventDefault();
//   //save detailes in DB
// });
var ClosedEvent = document.getElementById('ClosedEvent');
ClosedEvent.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var ClosedEvent = 'NO';
  if (document.getElementById("ClosedEvent").checked === true)
    ClosedEvent = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: EventID,
    CloseEventFlag: ClosedEvent,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_CloseEvent");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Closed Event </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});
var btnPrevious7 = document.getElementById('btnPrevious7');
btnPrevious7.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById("section7").style.display = "none";
  document.getElementById("section6").style.display = "block";
});

var registrationStatusOn = document.getElementById('RegistrationStatusOn');
registrationStatusOn.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var RegistrationStatusOn = 'NO';
  if (document.getElementById("RegistrationStatusOn").checked === true)
    RegistrationStatusOn = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    RegistrationOpenFlag: RegistrationStatusOn,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_RegistrationOn");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Registration Status </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});


var registrationCompletePostPayment = document.getElementById('RegistrationCompletePostPayment');
registrationCompletePostPayment.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var RegistrationCompletePostPaymentFlag = 'NO';
  if (document.getElementById("RegistrationCompletePostPayment").checked === true)
    RegistrationCompletePostPaymentFlag = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    RegistrationCompletePostPaymentFlag: RegistrationCompletePostPaymentFlag,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_RegistrationCompletePostPayment");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Registration Complete Post Payment </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var onlinePaymentGateway = document.getElementById('OnlinePaymentGateway');
onlinePaymentGateway.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var OnlinePaymentGatewayFlag = 'NO';
  if (document.getElementById("OnlinePaymentGateway").checked === true)
    OnlinePaymentGatewayFlag = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    OnlinePaymentGatewayFlag: OnlinePaymentGatewayFlag,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_OnlinePaymentMode");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Online Payment Gateway </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var publishDraw = document.getElementById('PublishDraw');
publishDraw.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var PublishDrawFlag = 'NO';
  if (document.getElementById("PublishDraw").checked === true)
    PublishDrawFlag = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    PublishDrawFlag: PublishDrawFlag,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_PublishDraw");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Publish Draw </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var publishSeedEntry = document.getElementById('PublishSeedEntry');
publishSeedEntry.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var PublishSeedEntryFlag = 'NO';
  if (document.getElementById("PublishSeedEntry").checked === true)
    PublishSeedEntryFlag = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    PublishSeedEntryFlag: PublishSeedEntryFlag,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_PublishSeed");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Publish Seed </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});

var publishMatchSchedule = document.getElementById('PublishMatchSchedule');
publishMatchSchedule.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var PublishScheduleFlag = 'NO';
  if (document.getElementById("PublishMatchSchedule").checked === true)
    PublishScheduleFlag = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    PublishScheduleFlag: PublishScheduleFlag,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_PublishSchedule");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Publish Match Schedule </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});


var publishGallery = document.getElementById('PublishGallery');
publishGallery.addEventListener('click', e => {
  e.preventDefault();

  var EventID = document.getElementById("hfEventID").value;
  var PublishGalleryFlag = 'NO';
  if (document.getElementById("PublishGallery").checked === true)
    PublishGalleryFlag = 'YES'
  //save detailes in DB
  var para1 = {};
  para1 = {
    EventID: eventID,
    PublishGalleryFlag: PublishGalleryFlag,
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("updateEventFlag_PublishGallery");
  ret1(para1).then((result) => {
    //var record1 = result.data;
    console.log("Event ID: " + result.data.retCode);
    if (result.data.retCode === "0") {
      var confirmMessage = document.getElementById('saveMessage7');
      document.getElementById("confirmationMessage7").value = "Flag updated for <b> Publish Gallery </b>";
      confirmMessage.style.display = "block";

      setTimeout(function() {
        confirmMessage.style.display = 'none';
      }, 5000);
    }
  });

});
