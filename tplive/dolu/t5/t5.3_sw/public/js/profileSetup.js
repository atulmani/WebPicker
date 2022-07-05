var loggedinUser;

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      console.log('Logged-in user phone number: ' + firebaseUser.phoneNumber);

    } else {
      loggedinUser = null;
      console.log('User has been logged out');

    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function pofileStep1Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-100%)';
  SaveDetails_section1();
}

function pofileStep2Back(){
  document.getElementById('firstslidepro').style.transform = 'translateX(0%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(0%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(0%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(0%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(0%)';
}

function pofileStep2Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-200%)';
  SaveDetails_section2();
}

function pofileStep3Back(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-100%)';
}

function pofileStep3Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-300%)';
  SaveDetails_section3();
}

function pofileStep4Back(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-200%)';
}
function pofileStep4Skip(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-400%)';
}

function pofileStep4Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-400%)';
  SaveDetails_section4();
}
function showHideCont()
{
  console.log('ho gyaa ' + firebaseUser.email);
  var fields = document.getElementById('name');
  if (fields == ''){
    fields.style.display = 'none';
    console.log('yoyoyoyoyoyoyo' + firebaseUser.email);
  }
  else{
    fields.style.display = 'block';
    console.log('oppopopopopopopopop' + firebaseUser.email);
  }
}

function SaveDetails_section1()
{
  var male = document.getElementById('male');
  var female = document.getElementById('female');
  var genderSelected='';
  if(male.checked){
    genderSelected = male.value;
  }
  else if (female.checked) {
    genderSelected = female.value;
  }

  var para = {};
  para = {
    userID: loggedinUser.uid,
    UserName: document.getElementById('name').value,
    Email : document.getElementById('email').value,
    Gender : genderSelected,
  };
  console.log(para);

  // const ret = firebase.functions().httpsCallable("saveProfileDetailsStep1");
  const ret = functions.httpsCallable("saveProfileDetailsStep1");
  ret(para).then(result => {
    console.log("From Function " + result.data);
  });

}

function SaveDetails_section2() {
  var userRole = [];
 var participant = document.getElementById('participant');
 var organiser = document.getElementById('organiser');
 var referee = document.getElementById('referee');
 var coach = document.getElementById('coach');
 var academyOwner = document.getElementById('academyOwner');

 if(participant.checked){
     userRole.push({
       TYPE: participant.value //'PARTICIPANT'
     });
 }
 if (organiser.checked) {
     userRole.push({
       TYPE: organiser.value //'ORGANIZER'
     });
 }
 if(referee.checked){
     userRole.push({
       TYPE: referee.value //'REFEREE'
     });
 }
 if(coach.checked){
     userRole.push({
       TYPE: coach.value //'COACH'
     });
 }
 if(academyOwner.checked){
     userRole.push({
       TYPE: academyOwner.value //'ACADEMY OWNER'
     });
 }
  console.log('user role is ' + userRole);

  var para = {};
  para = {
    userID: loggedinUser.uid,
    UserRole: userRole,
  };
  console.log(para);

  // const ret = firebase.functions().httpsCallable("saveProfileDetailsStep2");
  const ret = functions.httpsCallable("saveProfileDetailsStep2");
  ret(para).then(result => {
    console.log("From Function " + result.data);
  });
}

function SaveDetails_section3() {
 var dob = document.getElementById('dob');
 console.log('the date is ' + dob.value);
 var dobval = new Date();
 if(dob.value != "")
  dobval = new Date(dob.value);

 var cityList = document.getElementById('cityList');
 var locationSelectValue = cityList.options[cityList.selectedIndex].value;
 console.log('the selected city is ' + locationSelectValue);
console.log(new Date(dob.value));
console.log(dob.value);
 var para = {};
 para = {
   userID: loggedinUser.uid,
   DateOfBirth: dobval,
   City: locationSelectValue,
   State:"Uttar Pradesh",
   Country:"India",
 };
 console.log(para);

 // const ret = firebase.functions().httpsCallable("saveProfileDetailsStep3");
 const ret = functions.httpsCallable("saveProfileDetailsStep3");
 ret(para).then(result => {
   console.log("From Function " + result.data);
 });

}

function SaveDetails_section4() {
 var address = document.getElementById('address');
 var altPh = document.getElementById('altPh');


  var para = {};
  para = {
    userID: loggedinUser.uid,
    Address: address.value,
    AlternatePhone: altPh.value,
  };
  console.log(para);

  // const ret = firebase.functions().httpsCallable("saveProfileDetailsStep4");
  const ret = functions.httpsCallable("saveProfileDetailsStep4");
  ret(para).then(result => {
    console.log("From Function " + result.data);
  });

  // db.collection('UserList')
  //   .doc(loggedinUser.uid)
  //   .update({
  //     Address: address.value,
  //     AlternatePhone:altPh.value,
  //     UpdatedBy: loggedinUser.phoneNumber,
  //     UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
  //   })
  //   .then(() => {
  //
  //     console.log("updated your profile");
  //
  //   })
  //   .catch(function(error) {
  //     console.log("in error");
  //
  //   });

}

// function SaveDetails_section1Old() {
//  var male = document.getElementById('male');
//  var female = document.getElementById('female');
//  var genderSelected='';
//  if(male.checked){
//    genderSelected = male.value;
//  }
//  else if (female.checked) {
//    genderSelected = female.value;
//  }
//   db.collection('UserList')
//     .doc(loggedinUser.uid)
//     .update({
//       UserName: document.getElementById('name').value,
//       Email: document.getElementById('email').value,
//       Gender: genderSelected,
//       UpdatedBy: loggedinUser.phoneNumber,
//       UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
//     })
//     .then(() => {
//
//       console.log("updated your profile");
//     })
//     .catch(function(error) {
//       console.log("in error");
//
//     });
//
// }

// function SaveDetails_section2Old() {
//   var userRole = [];
//  var participant = document.getElementById('participant');
//  var organiser = document.getElementById('organiser');
//  var referee = document.getElementById('referee');
//  var coach = document.getElementById('coach');
//  var academyOwner = document.getElementById('academyOwner');
//
//  if(participant.checked){
//
//    {
//      userRole.push({
//        TYPE: participant.value //'PARTICIPANT'
//
//      });
//    }
//  }
//  if (organiser.checked) {
//
//    {
//      userRole.push({
//        TYPE: organiser.value //'ORGANIZER'
//
//      });
//    }
//  }
//  if(referee.checked){
//    {
//      userRole.push({
//        TYPE: referee.value //'REFEREE'
//
//      });
//    }
//  }
//
//  if(coach.checked){
//    {
//      userRole.push({
//        TYPE: coach.value //'COACH'
//
//      });
//    }
//  }
//
//  if(academyOwner.checked){
//    {
//      userRole.push({
//        TYPE: academyOwner.value //'ACADEMY OWNER'
//
//      });
//    }
//  }
//   console.log('user role is ' + userRole);
//   db.collection('UserList')
//     .doc(loggedinUser.uid)
//     .update({
//       UserRole: userRole,
//       UpdatedBy: loggedinUser.phoneNumber,
//       UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
//     })
//     .then(() => {
//
//       console.log("updated your profile");
//     })
//     .catch(function(error) {
//       console.log("in error");
//
//     });
//
// }


// function SaveDetails_section3Old() {
//  var dob = document.getElementById('dob');
//  console.log('the date is ' + dob.value);
//
//  var cityList = document.getElementById('cityList');
//  var locationSelectValue = cityList.options[cityList.selectedIndex].value;
//  console.log('the selected city is ' + locationSelectValue);
//
//  // var female = document.getElementById('female');
//  // var genderSelected='';
//  if(male.checked){
//    genderSelected = male.value;
//  }
//  else if (female.checked) {
//    genderSelected = female.value;
//  }
//  console.log(dob.value);
//   db.collection('UserList')
//     .doc(loggedinUser.uid)
//     .update({
//       DateOfBirth: firebase.firestore.Timestamp.fromDate((new Date(Date.parse(dob.value)))),
//       City: locationSelectValue,
//       UpdatedBy: loggedinUser.phoneNumber,
//       UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
//     })
//     .then(() => {
//
//       console.log("updated your profile");
//
//     })
//     .catch(function(error) {
//       console.log("in error");
//
//     });
//
// }

// function SaveDetails_section4Old() {
//  var address = document.getElementById('address');
//  var altPh = document.getElementById('altPh');
//
//  console.log('the address is ' + address.value);
//  console.log('the address is ' + altPh.value);
//
//   db.collection('UserList')
//     .doc(loggedinUser.uid)
//     .update({
//       Address: address.value,
//       AlternatePhone:altPh.value,
//       UpdatedBy: loggedinUser.phoneNumber,
//       UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
//     })
//     .then(() => {
//
//       console.log("updated your profile");
//
//     })
//     .catch(function(error) {
//       console.log("in error");
//
//     });
//
// }
