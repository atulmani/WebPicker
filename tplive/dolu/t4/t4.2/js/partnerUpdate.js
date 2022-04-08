var loggedinUser = "";

auth.onAuthStateChanged(async firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      //console.log(firebaseUser.uid);
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);

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

  var para1 = {};
  para1 = {
    userID: loggedinUser.uid
  };
    const ret1 = firebase.functions().httpsCallable("getProfileDetails");
    ret1(para1).then((result) => {
      var record1 = result.data;
      console.log(result.data.UserRole.findIndex(e=> e.TYPE==="ADMIN"));
      if(result.data.UserRole.findIndex(e=> e.TYPE==="ADMIN") >= 0){
        console.log("in admin");
        document.getElementById("userName").innerHTML = result.data.UserName
        // document.getElementById("fInput").style.display="none";
      }else {
        console.log("not admin");
        document.getElementById("fInput").style.display="none";
        document.getElementById("errorMessage").style.display="block";
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
  if(rbAcademy.checked){
    partnerType = rbAcademy.value;
  }
  else if(rbCorporate.checked){
    partnerType = rbCorporate.value;
  }
  else if(rbSponsor.checked){
    partnerType = rbSponsor.value;
  }
  console.log(document.getElementById("inputState").selectedIndex);
  var para1 = {};
  para1 = {
    PartnerName: document.getElementById("partnerName").value,
    OrganizationName: document.getElementById("orgName").value,
    PartnerEmailID: document.getElementById("emailID").value,
    PartnerPhone: document.getElementById("phoneNo").value,
    City: document.getElementById("inputCity").value,
    State: document.getElementById("inputState").options[document.getElementById("inputState").selectedIndex].value,
    IdentityType: document.getElementById("inputIdentityType").options[document.getElementById("inputIdentityType").selectedIndex].value,
    IdentityNumber: document.getElementById("identityNumber").value,
    PartnerType: partnerType,

  };
    const ret1 = firebase.functions().httpsCallable("addPartnerDetails");
    ret1(para1).then((result) => {
      var record1 = result.data;
      console.log("partner ID: " + result.data.partnerID);

    });

})
