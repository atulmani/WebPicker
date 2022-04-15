var loggedinUser = "";
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var partnerID = searchParams.get('id');

auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);

      GetProfileData();
      getUserList();
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

function getUserList() {
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
      console.log(results.data[index]);
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
  });


}
async function GetProfileData() {
  console.log('GetProfileData - Starts');

  var para1 = {};
  para1 = {
    userID: loggedinUser.uid
  };
  const ret1 = firebase.functions().httpsCallable("getProfileDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data.UserRole.findIndex(e => e.TYPE === "ADMIN"));
    if (result.data.UserRole.findIndex(e => e.TYPE === "ADMIN") >= 0) {
      console.log("in admin");
      document.getElementById("userName").innerHTML = result.data.UserName
      console.log(partnerID);
      if (partnerID != "" && partnerID != undefined && partnerID != null) {
        document.getElementById("btnSave").innerHTML = "Update";
        GetPartnerDetails();
      }
      // document.getElementById("fInput").style.display="none";
    } else {
      console.log("not admin");
      document.getElementById("fInput").style.display = "none";
      document.getElementById("errorMessage").style.display = "block";
    }
  });

}

function GetPartnerDetails() {
  console.log(partnerID);
  var para1 = {};
  para1 = {
    partnerID: partnerID
  };
  const ret1 = firebase.functions().httpsCallable("getPartnerDetails");
  ret1(para1).then((result) => {
    var record1 = result.data;
    console.log(result.data);
    document.getElementById("hfPartnerID").value = result.data.id;
    document.getElementById("orgName").value = result.data.OrganizationName;
    document.getElementById("partnerName").value = result.data.ParnerName;
    document.getElementById("emailID").value = result.data.PartnerEmailID;
    document.getElementById("phoneNo").value = result.data.PartnerPhone;
    document.getElementById("inputCity").value = result.data.City;
    var orgID = result.data.OrganizationID;
    // console.log(orgID);
    var organizationid = document.getElementById("organizer");
    document.getElementById("hfOrganizerID").value = orgID;
    // console.log(organizationid.options.length);
    for(index = 0;index <organizationid.options.length ; index++ )
    {
      // console.log(organizationid.options[index].value);

      if(organizationid.options[index].value.search(orgID) >= 0 )
      {
        organizationid.options[index].selected=true;
        break;
      }
    }


    var ddlstate = document.getElementById("inputState");
    var stateVal = result.data.State;
    for (index = 0; index < ddlstate.options.length; index++) {
      if (ddlstate.options[index].innerHTML === stateVal) {
        ddlstate.options[index].selected = true;
      }
    }

    var ddlIndentity = document.getElementById("inputIdentityType");
    var identityType = result.data.IdentityType;
    for (index = 0; index < ddlIndentity.options.length; index++) {
      if (ddlIndentity.options[index].innerHTML === identityType) {
        ddlIndentity.options[index].selected = true;
      }
    }

    document.getElementById("identityNumber").value = result.data.IdentityNumber;
    var partnerType = result.data.PartnerType;
    const rbAcademy = document.getElementById("Academy");
    const rbCorporate = document.getElementById("Corporate");
    const rbSponsor = document.getElementById("Sponsor");
    if (rbAcademy.value === partnerType) {
      rbAcademy.checked = true;
    } else if (rbCorporate.value === partnerType) {
      rbCorporate.checked = true;
    } else if (rbSponsor.value === partnerType) {
      rbSponsor.checked = true;
    }

  });
}

const btnSave = document.getElementById("btnSave");
btnSave.addEventListener('click', e => {
  e.preventDefault();
  console.log("in save");
  var partnerType = "";
  const rbAcademy = document.getElementById("Academy");
  const rbCorporate = document.getElementById("Corporate");
  const rbSponsor = document.getElementById("Sponsor");
  if (rbAcademy.checked) {
    partnerType = rbAcademy.value;
  } else if (rbCorporate.checked) {
    partnerType = rbCorporate.value;
  } else if (rbSponsor.checked) {
    partnerType = rbSponsor.value;
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
  var state = document.getElementById("inputState").options[document.getElementById("inputState").selectedIndex].value;
  var identityType = document.getElementById("inputIdentityType").options[document.getElementById("inputIdentityType").selectedIndex].value;
  var identityNumber = document.getElementById("identityNumber").value;
  //console.log(document.getElementById("inputState").selectedIndex);
  var confirmMessage = document.getElementById('saveMessage');
  console.log("before check");
  if ((organizerID === "" || organizerID === null) ||
    (partnerType === "" || partnerType === null) ||
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
      partnerID: partnerID,
      organizerID:organizerID,
      PartnerName: partnerName,
      OrganizationName: orgName,
      PartnerEmailID: emailID,
      PartnerPhone: phoneNo,
      City: inputCity,
      State: state,
      IdentityType: identityType,
      IdentityNumber: identityNumber,
      PartnerType: partnerType,

    };
    if (partnerID === "" || partnerID === undefined || partnerID === null) {
      const ret1 = firebase.functions().httpsCallable("addPartnerDetails");
      ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("partner ID: " + result.data.partnerID);
        if (result.data.partnerID != "0") {
          confirmMessage.style.display = "block";

          setTimeout(function() {
            confirmMessage.style.display = 'none';
          }, 5000);
        }
      });
    } else {
      console.log(para1);

      const ret1 = firebase.functions().httpsCallable("updatePartnerDetails");
      ret1(para1).then((result) => {
        //var record1 = result.data;
        console.log("partner ID: " + result.data.retCode);
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
