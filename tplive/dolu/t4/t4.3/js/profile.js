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
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "index.html";
  }
});

async function GetProfileData() {
  console.log('GetProfileData - Starts');
  // var para = {};
  // para = {
  //   uid: loggedinUser.uid
  // };
  // console.log(para);
  //
  // const ret = await firebase.functions().httpsCallable("getUserRequest");
  // ret(para).then(async (result) => {
  //   var record = result.data._fieldsProto;
  //   console.log(record.UserName);
  //   console.log('GetProfileData - End');
  // });
  //

  var para1 = {};
  para1 = {
    userID: loggedinUser.uid
  };
    const ret1 = firebase.functions().httpsCallable("getProfileDetails");
    ret1(para1).then((result) => {
      var record1 = result.data;
      var userRole = {
        id:result.data.id,
        Address: result.data.Address,
        AlternatePhone: result.data.AlternatePhone,
        City: result.data.City,
        Country: result.data.Country,
        DateOfBirth: result.data.DateOfBirth,
        Email: result.data.Email,
        Gender: result.data.Gender,
        Phone: result.data.Phone,
        State: result.data.State,
        UserName: result.data.UserName,
        UserRole : result.data.UserRole,
      }
      console.log(userRole);
      console.log("UserName: " + result.data.UserName);

      if (result.data.ProfilePic != undefined)
        document.getElementById("profilePic").src = result.data.ProfilePic;
      else {
        document.getElementById("profilePic").src = "";
      }
      document.getElementById("userName").innerHTML = result.data.UserName + " " + '(' + result.data.Gender + ')'
      document.getElementById("userEmail").value = result.data.Email;
      document.getElementById("hfGender").value = result.data.Gender;
      document.getElementById("hfName").value = result.data.UserName;
      document.getElementById("userPhone").innerHTML = result.data.Phone;
      document.getElementById("state").innerHTML = result.data.State + ", " + result.data.Country;
      if(result.data.DateOfBirth != null)
      {
      var dob = new Date(result.data.DateOfBirth._seconds * 1000);
      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };

      dob = dob.toLocaleDateString("en-US", options);

      document.getElementById("dob").value = dob;
    }
      document.getElementById("city").innerHTML = result.data.City;
      document.getElementById("altPh").value = result.data.AlternatePhone;
      document.getElementById("address").value = result.data.Address;
      var roles = result.data.UserRole;
      console.log(roles);
      var roleparticipant = document.getElementById("participant");
      var roleorganiser = document.getElementById("organiser");
      var rolereferee = document.getElementById("referee");
      var rolecoach = document.getElementById("coach");
      var roleacademyOwner = document.getElementById("academyOwner");
       console.log(roles);
      for (index = 0; index < roles.length; index++) {
        console.log(roles[index].TYPE);
        if (roleparticipant.value === roles[index].TYPE) {
          roleparticipant.setAttribute("checked", "true");
        } else if (roleorganiser.value === roles[index].TYPE) {
          roleorganiser.setAttribute("checked", "true");
        } else if (rolereferee.value === roles[index].TYPE) {
          rolereferee.setAttribute("checked", "true");
        } else if (rolecoach.value === roles[index].TYPE) {
          rolecoach.setAttribute("checked", "true");
        } else if (roleacademyOwner.value === roles[index].TYPE) {
          roleacademyOwner.setAttribute("checked", "true");
        }
      }



    });

}

// function GetProfileDataold() {
//   //  var e = document.getElementById("cityList");
//   // var selected_value = e.options[e.selectedIndex].value;
//   // var dobDate = document.getElementById("dob");
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//
//
//   console.log(loggedinUser.uid);
//
//   const snapshot = db.collection('UserList').doc(loggedinUser.uid);
//   snapshot.get().then(async (doc) => {
//     if (doc.exists) {
//       console.log(doc.data());
//       if (doc.data().ProfilePic != undefined)
//         document.getElementById("profilePic").src = doc.data().ProfilePic;
//       else {
//         document.getElementById("profilePic").src = "";
//       }
//       document.getElementById("userName").innerHTML = doc.data().UserName + " " + '(' + doc.data().Gender + ')'
//       document.getElementById("userEmail").value = doc.data().Email;
//       document.getElementById("hfGender").value = doc.data().Gender;
//       document.getElementById("hfName").value = doc.data().UserName;
//       document.getElementById("userPhone").innerHTML = doc.data().Phone;
//       console.log(doc.data().State);
//       console.log(doc.data().Country);
//       document.getElementById("state").innerHTML = doc.data().State + ", " + doc.data().Country;
//
//       console.log(doc.data().DateOfBirth);
//       var dob = new Date(doc.data().DateOfBirth.seconds * 1000);
//       dob = dob.toLocaleDateString("en-US", options);
//       console.log('date is' + dob);
//       document.getElementById("dob").value = dob;
//       document.getElementById("city").innerHTML = doc.data().City;
//       document.getElementById("altPh").value = doc.data().AlternatePhone;
//       document.getElementById("address").value = doc.data().Address;
//       var roles = doc.data().UserRole;
//       console.log(roles);
//       var roleparticipant = document.getElementById("participant");
//       var roleorganiser = document.getElementById("organiser");
//       var rolereferee = document.getElementById("referee");
//       var rolecoach = document.getElementById("coach");
//       var roleacademyOwner = document.getElementById("academyOwner");
//       // console.log(roleObject);
//       for (index = 0; index < roles.length; index++) {
//         console.log(roles[index].TYPE);
//         if (roleparticipant.value === roles[index].TYPE) {
//           roleparticipant.setAttribute("checked", "true");
//         } else if (roleorganiser.value === roles[index].TYPE) {
//           roleorganiser.setAttribute("checked", "true");
//         } else if (rolereferee.value === roles[index].TYPE) {
//           rolereferee.setAttribute("checked", "true");
//         } else if (rolecoach.value === roles[index].TYPE) {
//           rolecoach.setAttribute("checked", "true");
//         } else if (roleacademyOwner.value === roles[index].TYPE) {
//           roleacademyOwner.setAttribute("checked", "true");
//         }
//       }
//       // document.getElementById('uploadFile').value = selected_value;
//     }
//   });
// }
function updateDetails()
{
  console.log(loggedinUser.uid);
  var participant = document.getElementById('participant');
  var organiser = document.getElementById('organiser');
  var referee = document.getElementById('referee');
  var coach = document.getElementById('coach');
  var academyOwner = document.getElementById('academyOwner');
  var userRole = [];
  if (participant.checked) {
    userRole.push({
      TYPE: participant.value //'PARTICIPANT'
    });
  }
  if (organiser.checked) {
    userRole.push({
      TYPE: organiser.value //'ORGANIZER'
    });
  }
  if (referee.checked) {
    userRole.push({
      TYPE: referee.value //'REFEREE'
    });
  }

  if (coach.checked) {
    userRole.push({
      TYPE: coach.value //'COACH'
    });
  }

  if (academyOwner.checked) {
    userRole.push({
      TYPE: academyOwner.value //'ACADEMY OWNER'
    });
  }
  var dob = document.getElementById('dob');
  var address = document.getElementById('address');
  var altPh = document.getElementById('altPh');
  var genderSelected = document.getElementById("hfGender").value;

    var para1 = {};
    para1 = {
      userID: loggedinUser.uid,
      UserName: document.getElementById('hfName').value,
      Email: document.getElementById('userEmail').value,
      Address: address.value,
      userRole : userRole,
      AlternatePhone: altPh.value,
      Gender: genderSelected,
      DateOfBirth: new Date(Date.parse(dob.value)),
    };
    console.log(para1);
      const ret1 = firebase.functions().httpsCallable("updateProfileDetails");
      ret1(para1).then((result) => {
        createEventConformation.style.display = "block";
        setTimeout(function() {
          createEventConformation.style.display = 'none';
        }, 5000);
      console.log("updated your profile");
    })
    .catch(function(error) {
      console.log("in error", error);

    });


}
//
// function updateDetailsOld() {
//
//   console.log(loggedinUser.uid);
//   // if(male.checked){
//   //   genderSelected = male.value;
//   // }
//   // else if (female.checked) {
//   //   genderSelected = female.value;
//   // }
//
//   var participant = document.getElementById('participant');
//   var organiser = document.getElementById('organiser');
//   var referee = document.getElementById('referee');
//   var coach = document.getElementById('coach');
//   var academyOwner = document.getElementById('academyOwner');
//   var userRole = [];
//   if (participant.checked) {
//     userRole.push({
//       TYPE: participant.value //'PARTICIPANT'
//     });
//   }
//   if (organiser.checked) {
//     userRole.push({
//       TYPE: organiser.value //'ORGANIZER'
//     });
//   }
//   if (referee.checked) {
//     userRole.push({
//       TYPE: referee.value //'REFEREE'
//     });
//   }
//
//   if (coach.checked) {
//     userRole.push({
//       TYPE: coach.value //'COACH'
//     });
//   }
//
//   if (academyOwner.checked) {
//     userRole.push({
//       TYPE: academyOwner.value //'ACADEMY OWNER'
//     });
//   }
//   var dob = document.getElementById('dob');
//   var address = document.getElementById('address');
//   var altPh = document.getElementById('altPh');
//   var genderSelected = document.getElementById("hfGender").value;
//   db.collection('UserList')
//     .doc(loggedinUser.uid)
//     .update({
//       UserName: document.getElementById('hfName').value,
//       Email: document.getElementById('userEmail').value,
//       Address: address.value,
//       AlternatePhone: altPh.value,
//       Gender: genderSelected,
//       DateOfBirth: firebase.firestore.Timestamp.fromDate((new Date(Date.parse(dob.value)))),
//       UpdatedBy: loggedinUser.phoneNumber,
//       UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
//     })
//     .then(() => {
//
//       createEventConformation.style.display = "block";
//       setTimeout(function() {
//         createEventConformation.style.display = 'none';
//       }, 5000);
//       console.log("updated your profile");
//     })
//     .catch(function(error) {
//       console.log("in error");
//
//     });
//
//
//
// }
