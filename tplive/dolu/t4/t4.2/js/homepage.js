
var loggedinUser = "";
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      console.log('Logged-in user email id: ' + firebaseUser.email);
      // userID = firebaseUser.uid;
      // GetUserRole(firebaseUser);
      GetProfileData();
      //document.getElementById('ifSignedIn').innerHTML = 'Hi Sanidhya';
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});



function GetProfileData() {

  const snapshot = db.collection('UserList').doc(loggedinUser.uid);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log(doc.data());
      document.getElementById('ifSignedIn').innerHTML = 'Hi '+ doc.data().UserName;
      document.getElementById('ifSignedIn').href = "login/profile.html";
      document.getElementById("UserCity").innerHTML = doc.data().City;

      // document.getElementById('uploadFile').value = selected_value;
    }
  });
}


// var profiletag = document.getElementById('profiletag');
 function profileDirection(profiletag)
 {
  // console.log(loggedinUser.uid);
  if (loggedinUser === null || loggedinUser === '' )
  {
    window.location.href = "./login/index.html";
  }
  else{
    window.location.href = "./login/profile.html";
  }
  // auth.onAuthStateChanged(firebaseUser => {
  //   try {
  //     if (firebaseUser) {
  //       loggedinUser = firebaseUser;
  //       console.log('Logged-in user email id: ' + firebaseUser.email);
  //       // userID = firebaseUser.uid;
  //       // GetUserRole(firebaseUser);
  //
  //       document.getElementById('ifSignedIn').innerHTML = 'Hi Sanidhya'
  //     } else {
  //       loggedinUser = null;
  //       console.log('User has been logged out');
  //
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     //window.location.href = "../index.html";
  //   }
  // });
 }
