var loggedinUser = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var organizationID = searchParams.get('id');

auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);

      var ret = await getUserList();
      // GetProfileData();
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login/index.html";
  }
});

function onOrganizationSelection() {
  var organizer = document.getElementById("organizer");
  var val = organizer.options[organizer.selectedIndex].value;
  val = val.split(":");
  console.log(val);
  if (organizer.selectedIndex > 0) {
    var userid = val[0];
    var username = val[1];
    var email = val[2];
    var phone = val[3].replace("+91", "");
    var city = val[4];
    var state = val[5];
    document.getElementById("partnerName").value = username;
    document.getElementById("emailID").value = email;
    document.getElementById("phoneNo").value = phone;
    document.getElementById("inputCity").value = city;
    document.getElementById("hfOrganizerID").value = userid;
  }
}

async function getUserList() {
  var para2 = {};
  para2 = {
    paraRole: ['ADMIN', 'PARTICIPANT'],
  };
  var organizer = document.getElementById("organizer");

  console.log(para2);
  const ret2 = firebase.functions().httpsCallable("getUserWithRole");
  ret2(para2).then(results => {
    console.log("From Function " + results.data.length);
    // console.log("From Function " + results.data[0].resultsid);
    for (index = 0; index < results.data.length; index++) {
      // console.log(results.data[index]);
      // console.log(results.data[index]);
      var option = document.createElement("option");
      option.setAttribute("value", results.data[index].userid + ":" +
        results.data[index].UserName + ":" +
        results.data[index].Email + ":" +
        results.data[index].Phone + ":" +
        results.data[index].City + ":" +
        results.data[index].State);
      option.innerHTML = results.data[index].UserName + " : " + results.data[index].Email;
      organizer.appendChild(option);
    }
    GetProfileData();
  });
}
async function GetProfileData() {
  console.log('GetProfileData - Starts');
  var userProfile =JSON.parse( localStorage.getItem("userProfile"));

  if (userProfile != undefined && userProfile != "" && userProfile != null) {

    document.getElementById("userName").innerHTML = userProfile.UserName
    document.getElementById("Comments").innerHTML = userProfile.Comments
    var approvalStatus = document.getElementById("approvalStatus");
    if (userProfile.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
      console.log("in admin");
      // console.log(organizationID);
      document.getElementById("organizer").disabled = false;

      if (organizationID != "" && organizationID != undefined && organizationID != null) {
        document.getElementById("btnSave").innerHTML = "Update";
        GetOganizationDetails();
      } else {
        for (index = 0; index < approvalStatus.options.length; index++) {
          if (approvalStatus.options[index].value === "Approved") {
            approvalStatus.options[index].selected = true;
            break;
          }
        }
      }
      // document.getElementById("fInput").style.display="none";
    } else if (userProfile.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {

      console.log("Organizer");
      var organizationid = document.getElementById("organizer");

      organizationid.disabled = true;
      approvalStatus.disabled = true;
      document.getElementById("Comments").disabled = true;
      // console.log(loggedinUser.uid);
      document.getElementById("hfOrganizerID").value = loggedinUser.uid;
      // console.log(organizationid.options.length);
      for (index = 0; index < organizationid.options.length; index++) {
        // console.log(organizationid.options[index].value);
        // console.log(organizationid.options[index].value);
        if (organizationid.options[index].value.search(loggedinUser.uid) >= 0) {
          organizationid.options[index].selected = true;
          onOrganizationSelection();
          break;
        }
      }

      if (organizationID != "" && organizationID != undefined && organizationID != null) {
        document.getElementById("btnSave").innerHTML = "Update";
        GetOrganizationDetails();
      } else {

        ///Check for any pending OrganizationName

        var checkPending =await CheckForPendingOrganization();
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
  }
  else {
    window.location.assign('../index.html');
  }
}

// async function GetProfileData() {
//   console.log('GetProfileData - Starts');
//   //await getUserList();
//   var para1 = {};
//   para1 = {
//     userID: loggedinUser.uid
//   };
//   const ret1 = firebase.functions().httpsCallable("getProfileDetails");
//   ret1(para1).then(async (result) => {
//     var record1 = result.data;
//     console.log(result.data.UserRole.findIndex(e => e.TYPE === "ADMIN"));
//     document.getElementById("userName").innerHTML = result.data.UserName
//     document.getElementById("Comments").innerHTML = result.data.Comments
//     var approvalStatus = document.getElementById("approvalStatus");
//     if (result.data.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
//       console.log("in admin");
//       // console.log(organizationID);
//       document.getElementById("organizer").disabled = false;
//
//       if (organizationID != "" && organizationID != undefined && organizationID != null) {
//         document.getElementById("btnSave").innerHTML = "Update";
//         GetOganizationDetails();
//       } else {
//         for (index = 0; index < approvalStatus.options.length; index++) {
//           if (approvalStatus.options[index].value === "Approved") {
//             approvalStatus.options[index].selected = true;
//             break;
//           }
//         }
//       }
//       // document.getElementById("fInput").style.display="none";
//     } else if (result.data.UserRole.findIndex(e => e.TYPE === "ORGANIZER") >= 0) {
//
//       console.log("Organizer");
//       var organizationid = document.getElementById("organizer");
//
//       organizationid.disabled = true;
//       approvalStatus.disabled = true;
//       document.getElementById("Comments").disabled = true;
//       // console.log(loggedinUser.uid);
//       document.getElementById("hfOrganizerID").value = loggedinUser.uid;
//       // console.log(organizationid.options.length);
//       for (index = 0; index < organizationid.options.length; index++) {
//         // console.log(organizationid.options[index].value);
//         // console.log(organizationid.options[index].value);
//         if (organizationid.options[index].value.search(loggedinUser.uid) >= 0) {
//           organizationid.options[index].selected = true;
//           onOrganizationSelection();
//           break;
//         }
//       }
//
//       if (organizationID != "" && organizationID != undefined && organizationID != null) {
//         document.getElementById("btnSave").innerHTML = "Update";
//         GetOrganizationDetails();
//       } else {
//
//         ///Check for any pending OrganizationName
//
//         var checkPending =await CheckForPendingOrganization();
//         console.log(checkPending);
//         if (checkPending > 0) {
//           document.getElementById("fInput").style.display = "none";
//           document.getElementById("errorMessage").style.display = "block";
//           document.getElementById("errorMessage").innerHTML = "One Organization request is still Pending Approval from Admin. Please reach out to <a href=../contact/index>Admin or contact Us</a>";
//
//         } else {
//           for (index = 0; index < approvalStatus.options.length; index++) {
//             if (approvalStatus.options[index].value === "Pending Approval") {
//               approvalStatus.options[index].selected = true;
//               break;
//             }
//           }
//         }
//       }
//     } else {
//       console.log("not admin");
//       document.getElementById("fInput").style.display = "none";
//       document.getElementById("errorMessage").style.display = "block";
//     }
//   });
//
// }

async function CheckForPendingOrganization() {
  var para = {};
  // console.log(userid);
  para = {
    organizerID: loggedinUser.uid,
    approvalStatus: 'Pending Approval',
  };
  console.log(para);
  var ret = firebase.functions().httpsCallable("getAllOrganizationForOrganizerWithStatus");

  return ret(para).then(results => {
    console.log("From Function " + results.data.length);
    // console.log("From Function " + results.data[0].resultsid);
    return results.data.length;
  });
  return 0;

}

function GetOrganizationDetails() {
  console.log(organizationID);
  var para1 = {};
  para1 = {
    organizationID: organizationID
  };
  const ret1 = firebase.functions().httpsCallable("getOrganizationDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);
    document.getElementById("hfOrganizationID").value = result.data.id;
    document.getElementById("orgName").value = result.data.OrganizationName;
    document.getElementById("partnerName").value = result.data.PartnerName;
    document.getElementById("emailID").value = result.data.PartnerEmailID;
    document.getElementById("phoneNo").value = result.data.PartnerPhone;
    document.getElementById("inputCity").value = result.data.City;
    document.getElementById("Comments").value = result.data.Comments;
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
  var organizationType = "";
  const rbAcademy = document.getElementById("Academy");
  const rbCorporate = document.getElementById("Corporate");
  const rbSponsor = document.getElementById("Sponsor");
  if (rbAcademy.checked) {
    organizationType = rbAcademy.value;
  } else if (rbCorporate.checked) {
    organizationType = rbCorporate.value;
  } else if (rbSponsor.checked) {
    organizationType = rbSponsor.value;
  }
  const ddlOrganization = document.getElementById("organizer");
  var val = ddlOrganization.options[ddlOrganization.selectedIndex].value;
  val = val.split(":");
  var organizerID = document.getElementById("hfOrganizerID").value;
  var partnerName = document.getElementById("partnerName").value;
  var orgName = document.getElementById("orgName").value;
  var emailID = document.getElementById("emailID").value;
  var phoneNo = document.getElementById("phoneNo").value;
  var inputCity = document.getElementById("inputCity").value;
  var comments = document.getElementById("Comments").value;
  var state = document.getElementById("inputState").options[document.getElementById("inputState").selectedIndex].value;
  var identityType = document.getElementById("inputIdentityType").options[document.getElementById("inputIdentityType").selectedIndex].value;
  var identityNumber = document.getElementById("identityNumber").value;
  var approvalStatus = document.getElementById("approvalStatus").options[document.getElementById("approvalStatus").selectedIndex].value;
  //console.log(document.getElementById("inputState").selectedIndex);
  var confirmMessage = document.getElementById('saveMessage');
  console.log("before check");
  if ((organizerID === "" || organizerID === null) ||
    (organizationType === "" || organizationType === null) ||
    (partnerName === "" || partnerName === null) ||
    (orgName === "" || orgName === null) ||
    (emailID === "" || emailID === null) ||
    (phoneNo === "" || phoneNo === null) ||
    (inputCity === "" || inputCity === null) ||
    (state === "" || state === null) ||
    (identityType === "" || identityType === null) ||
    (identityNumber === "" || identityNumber === null)) {
    console.log("details not filled");
    document.getElementById("confirmationMessage").innerHTML = "Please enter all details to update";
    confirmMessage.style.display = "block";

    setTimeout(function() {
      confirmMessage.style.display = 'none';
    }, 5000);
  } else {

    console.log("details  filled completly");

    var para1 = {};
    para1 = {
      organizationID: organizationID,
      organizerID: organizerID,
      PartnerName: partnerName,
      OrganizationName: orgName,
      PartnerEmailID: emailID,
      PartnerPhone: phoneNo,
      City: inputCity,
      State: state,
      IdentityType: identityType,
      IdentityNumber: identityNumber,
      OrganizationType: organizationType,
      ApprovalStatus: approvalStatus,
      Comments: comments,

    };
    console.log(para1);
    if (organizationID === "" || organizationID === undefined || organizationID === null) {
      const ret1 = firebase.functions().httpsCallable("addOrganizationDetails");
      ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("organization ID: " + result.data.OrganizationID);
        if (result.data.organizationID != "0") {
          confirmMessage.style.display = "block";

          setTimeout(function() {
            confirmMessage.style.display = 'none';
          }, 5000);
        }
      });
    } else {
      console.log(para1);

      const ret1 = firebase.functions().httpsCallable("updateOrganizationDetails");
      ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("organization ID: " + result.data.retCode);
        if (result.data.retCode === "0") {
          var confirmMessage = document.getElementById('saveMessage');
          confirmMessage.style.display = "block";

          setTimeout(function() {
            confirmMessage.style.display = 'none';
          }, 5000);
        }
      });

    }
  }

})
