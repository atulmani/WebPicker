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
      document.getElementById("userName").innerHTML = result.data.UserName
    });

}
