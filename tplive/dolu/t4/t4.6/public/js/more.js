var loggedinUser = "";
auth.onAuthStateChanged(firebaseUser => {
  try {
//    var str = "Java-Script-Object-Notation";

    // console.log(acronym)


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
    getTournamentSummary();

  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData() {
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile != undefined && userProfile != "" && userProfile != null) {

    document.getElementById('profileName').innerHTML = userProfile.UserName;
    var matches = userProfile.UserName.match(/\b(\w)/g);
    var acronym = matches.join('');
    document.getElementById('profileshortName').innerHTML = acronym;
    // document.getElementById('ifSignedIn').innerHTML = 'Hi ' + userProfile.UserName;
    // document.getElementById('ifSignedIn').href = "login/profile.html";
    // document.getElementById("UserCity").innerHTML = userProfile.City;
  }

}

function getTournamentSummary() {

  var para1 = {};
  para1 = {
    userID: ""
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("/getEventSummaryBySport");
  console.log("before call");
  ret1(para1).then(results => {
      console.log("From Function " + results.data.length);
      var sportList = document.getElementById("ddlSports");
      // console.log("From Function " + results.data[0].resultsid);
      for (index = 0; index < results.data.length; index++) {
        if (results.data[index].SportName === "Badminton") {
          document.getElementById("badmintonCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("badmintonCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Table Tennis") {
          document.getElementById("ttCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("ttCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Chess") {
          document.getElementById("chessCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("chessCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Carrom") {
          document.getElementById("carromCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("carromCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Marathon") {
          document.getElementById("marathonCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("marathonCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Skating") {
          document.getElementById("skatingCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("skatingCntSmall").innerHTML = results.data[index].EventCount;
        }
      }
    }).
  catch(err => {
    console.log(err);
  });
}
