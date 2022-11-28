var loggedinUser = "";

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);
      userID = firebaseUser.uid;
      console.log("in step1");
      //window.location.href = "/login/profileSetup.html";

    } else {
      loggedinUser = null;
      console.log('User has been logged out');

    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../index.html";
  }
});

window.onload = function () {
  render();
}

function render() {
  console.log('Captcha rendered starts taking place');
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  recaptchaVerifier.render();
  console.log('Captcha rendered');
}

var btnSendOTP = document.getElementById('btnSendOTP');

btnSendOTP.addEventListener('click', e => {
  e.preventDefault();
  // console.log('clicked');
  document.getElementById('btnSendOTPSpan').style.display = 'none';
  document.getElementById('btnSendOTPLoad').style.display = 'block';
  // function phoneAuth() {
  var number = document.getElementById('userPhoneNo').value;
  console.log(number.length);
  if (number.length < 10) {
    document.getElementById('altspan').innerHTML = "Please enter valid phone number";
    document.getElementById('altspan').style.display = 'block';

    document.getElementById('btnSendOTPSpan').style.display = 'block';
    document.getElementById('btnSendOTPLoad').style.display = 'none';

  } else {

    // if (number.search("+") < 0) {
    number = "+91" + number;
    // }
    console.log('Phone No: ' + number);

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {

        auth.signInWithPhoneNumber(number, window.recaptchaVerifier)
          .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            coderesult = confirmationResult;
            console.log('coderesult: ' + coderesult);
            console.log('confirmationResult.verificationId ' + confirmationResult.verificationId);
            console.log('Message sent');
            document.getElementById('firstslide').style.transform = 'translateX(-100%)';
            document.getElementById('secondslide').style.transform = 'translateX(-100%)';
            document.getElementById('btnSendOTPSpan').style.display = 'block';
            document.getElementById('btnSendOTPLoad').style.display = 'none';
          })
          .catch(function (error) {
            console.log('Error Sending OTP: ' + error.message);
            document.getElementById('altspan').innerHTML = error.message;
            document.getElementById('altspan').style.display = 'block';
            document.getElementById('btnSendOTPSpan').style.display = 'block';
            document.getElementById('btnSendOTPLoad').style.display = 'none';
          })
      });
  }
});

var btnSigninUsingOTP = document.getElementById('btnSigninUsingOTP');

btnSigninUsingOTP.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('btnSigninUsingOTPSpan').style.display = 'none';
  document.getElementById('btnSigninUsingOTPLoad').style.display = 'block';
  // var code = document.getElementById('txtVerificationCode').value;
  var code = document.getElementById("otpLetter1").value +
    document.getElementById("otpLetter2").value +
    document.getElementById("otpLetter3").value +
    document.getElementById("otpLetter4").value +
    document.getElementById("otpLetter5").value +
    document.getElementById("otpLetter6").value
  console.log('Code: ' + code);
  coderesult.confirm(code).then(function (result) {
    console.log('Navigate to the dashboard/profile page');
    // window.location.assign('../admin/dashboard.html');

    var user = result.user;
    console.log(user);
    console.log(result);

    var para1 = {};
    para1 = {
      userID: user.uid
    };
    // const ret1 = firebase.functions().httpsCallable("getProfileDetails");
    const ret1 = functions.httpsCallable("getProfileDetails");
    ret1(para1).then((result) => {
      var record1 = result.data;
      console.log(result.data.pID);
      var userRole = {
        id: result.data.pID,
        PlayerID: result.data.PlayerID,
        Address: result.data.Address,
        AlternatePhone: result.data.AlternatePhone,
        City: result.data.City,
        Country: result.data.Country,
        DateOfBirth: result.data.DateOfBirth,
        Email: result.data.Email,
        Gender: result.data.Gender,
        Phone: result.data.Phone,
        Pincode: result.data.Pincode,
        ProfilePicURL: result.data.ProfilePicURL,
        State: result.data.State,
        UserName: result.data.UserName,
        UserRole: result.data.UserRole,
      }
      console.log(userRole);
      localStorage.setItem("userProfile", JSON.stringify(userRole));
      if (result.data.pID != "0") {
        document.getElementById('btnSigninUsingOTPSpan').style.display = 'block';
        document.getElementById('btnSigninUsingOTPLoad').style.display = 'none';
        // window.location.assign('profile.html');
        console.log(userRole.UserRole);
        if (userRole.UserRole != undefined && userRole.UserRole != null) {
          if (userRole.UserRole.find(e => e.TYPE === "ADMIN")) {
            console.log("is admin");
            window.location.assign('/admin/eventList.html');
          }
          else if (userRole.UserRole.find(e => e.TYPE === "PARTICIPANT")) {
            console.log("is PARTICIPANT");
            console.log("in step2");
            window.location.assign('/regProfile.html');
          } else if (userRole.UserRole.find(e => e.TYPE === "ORGANIZER")) {
            console.log("is ORGANIZER");

            window.location.assign('/admin/dashboard.html');
          } else if (userRole.UserRole.find(e => e.TYPE === "REFREE")) {
            console.log("is REFREE");

            window.location.assign('/admin/dashboard.html');
          }
        }
        else {
          console.log('FistTimeUserSetup');
          window.location.assign('/regProfile.html');
          //          FistTimeUserSetup(user);
        }
      } else {
        console.log('FistTimeUserSetup');
        FistTimeUserSetup(user);
      }
    });

    // const snapshot = db.collection('UserList').doc(user.uid);
    // snapshot.get().then(async (doc) => {
    //   if (doc.exists) {
    //     window.location.assign('profile.html');
    //   } else {
    //     console.log('FistTimeUserSetup');
    //     FistTimeUserSetup(user);
    //   }
    // })

  })
    .catch(function (error) {
      // alert(error.message);
      document.getElementById('btnSigninUsingOTPSpan').style.display = 'block';
      document.getElementById('btnSigninUsingOTPLoad').style.display = 'none';
      console.error(error);
      document.getElementById('altspanotp').style.display = 'block';
      document.getElementById('altspanotp').innerHTML = error.message;
    });
});

//
// function GetRegistrationRequest() {
//   // console.log(userID);
//   const snapshot = db.collection('UserList').doc(userID);
//   snapshot.get().then(async (doc) => {
//     if (doc.exists) {
//       // console.log('Document id:' + doc.id);
//       // console.log(doc.data());
//       var displayName = doc.data().displayName;
//       var userEmail = doc.data().EmailID;
//       var address = doc.data().Address;
//       var CustomerType = doc.data().CustomerType;
//       var cartIem = 0;
//       var DateOfBirth = doc.data().DateOfBirth;
//       var IDNo = doc.data().IDNo;
//       var IDType = doc.data().IDType;
//       var phone = doc.data().Phone;
//       var profileImageURL = doc.data().ProfileImageURL;
//       var userRole = doc.data().UserRole;
//
//       document.getElementById('userName').value = displayName;
//       document.getElementById('profileName').innerHTML = displayName;
//       document.getElementById('userEmail').innerHTML = userEmail;
//       document.getElementById('userPhone').value = phone;
//
//
//       if (profileImageURL != '' && profileImageURL != undefined) {
//
//         document.getElementById('profilePic').src = profileImageURL;
//         document.getElementById('profilePic_LeftNav').src = profileImageURL;
//       }
//       var ocity = document.getElementById('cityList');
//       for (i = 0; i < ocity.options.length; i++) {
//         if (ocity.options[i].value === address)
//           ocity.options[i].selected = true;
//       }
//
//
//       var userCat = document.getElementById('customerType');
//       for (i = 0; i < userCat.options.length; i++) {
//         if (CustomerType === userCat.options[i].text)
//           userCat.options[i].selected = true;
//         else
//           userCat.options[i].selected = false;
//       }
//
//
//       document.getElementById('loading').style.display = 'none';
//     } else {
//       document.getElementById('loading').style.display = 'none';
//     }
//   });
//
// }

//
// function SaveDetails() {
//
//   //e.preventDefault();
//   var userType = [];
//
//   {
//     userType.push({
//       Text: 'Retailer/Customer',
//       Value: 'Customer'
//     });
//   }
//
//
//   var ocustomerType = document.getElementById("customerType");
//   var customerType = ocustomerType.options[ocustomerType.selectedIndex].value;
//   var oCity = document.getElementById("cityList");
//   var city = oCity.options[oCity.selectedIndex].value;
//
//   db.collection('UserList')
//     .doc(userID)
//     .update({
//       DateOfBirth: '',
//       displayName: document.getElementById('userName').value,
//       Phone: document.getElementById('userPhone').value,
//       Address: city,
//       IDType: '',
//       IDNo: '',
//       // UserRole: userType,
//       CustomerType: customerType,
//       UpdatedBy: auth.currentUser.email,
//       UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
//     })
//     .then(() => {
//
//       document.getElementById("confirmationMessage").style.display = 'block';
//     })
//     .catch(function(error) {
//       console.log("in error");
//     });
//   document.getElementById('userName').readOnly = true;
//   document.getElementById('userPhone').readOnly = true
// }
//
async function FistTimeUserSetup(user) {
  var para = {};
  para = {
    userID: loggedinUser.uid,
    Phone: user.phoneNumber
  };
  console.log(para);
  const ret = await functions.httpsCallable("addUserDetails");
  ret(para).then(result => {
    console.log("From Function " + result);
    window.location.assign('profileSetup.html');

  });
}


function setOtp(index) {
  var val = document.getElementById('otpLetter' + (index)).value;
  // console.log('val : ' + val + " index : " + index);
  if (val === '' || val === null) {
    if (index != 1) {
      document.getElementById('otpLetter' + (index - 1)).select();
    }
  } else {
    if (index != 6) {
      document.getElementById('otpLetter' + (index + 1)).select();
    }
  }

}

// function FistTimeUserSetupOld(user) {
//
//   console.log("FistTimeUserSetup-starts");
//   console.log(auth.currentUser);
//   console.log(user.uid);
//   console.log(user.phoneNumber);
//   // var number = document.getElementById('userPhoneNo').value;
//   // var number = "+91" + number;
//
//   db.collection('UserList')
//     .doc(user.uid)
//     .set({
//       UserId: user.uid,
//       Phone: user.phoneNumber,
//       UserName: '',
//       Email: '',
//       Gender: '',
//       DateOfBirth: '',
//       Address: '',
//       City: '',
//       AlternatePhone: '',
//       State: 'Uttar Pradesh',
//       Country: 'India',
//       UserRole: '',
//       CreatedBy: user.uid,
//       CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
//
//     })
//     .then(() => {
//       window.location.assign('profileSetup.html');
//       // document.getElementById("confirmationMessage").style.display = 'block';
//       console.log("error resolved");
//     })
//     .catch(function(error) {
//       console.log("in error");
//
//     });
// }
