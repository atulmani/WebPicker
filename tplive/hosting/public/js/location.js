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
    userLocation = localStorage['userLocation'];
    if (userLocation === "" || userLocation === undefined || userLocation === null) {
      document.getElementById('location').innerHTML = userLocation;
      document.getElementById('location1').innerHTML = userLocation;
    } else {

      document.getElementById('location').innerHTML = userLocation;
      document.getElementById('location1').innerHTML = userLocation;
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
  }

}

function getTournamentSummary() {

  var para2 = {};
  para2 = {
    userID: ""
  };
  console.log(para2);
  // const ret2 = firebase.functions().httpsCallable("getEventSummaryByCity");
  const ret2 = functions.httpsCallable("getEventSummaryByCity");
  ret2(para2).then(results => {
    console.log("From Function " + results.data.length);
    var allCnt = 0;

    var cityList = document.getElementById("genre-location-list");
    // console.log("From Function " + results.data[0].resultsid);
    for (index = 0; index < results.data.length; index++) {
      console.log(results.data[index].City);
      console.log(results.data[index].EventCount);
      allCnt = allCnt + Number(results.data[index].EventCount);
      if (results.data[index].City === "Pune") {
        document.getElementById("puneCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("puneCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Bangalore") {
        document.getElementById("bangaloreCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("bangaloreCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Mysore") {
        document.getElementById("mysoreCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("mysoreCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Chennai") {
        document.getElementById("chennaiCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("chennaiCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Mumbai") {
        document.getElementById("mumbaiCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("mumbaiCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Hyderabad") {
        document.getElementById("hyderabadCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("hyderabadCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Delhi") {
        document.getElementById("delhiCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("delhiCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Lucknow") {
        document.getElementById("lucknowCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("lucknowCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Jaipur") {
        document.getElementById("jaipurCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("jaipurCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Ahemdabad") {
        document.getElementById("ahemdabadCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("ahemdabadCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Chandigarh") {
        document.getElementById("chandigarhCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("chandigarhCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Kolkata") {
        document.getElementById("kolkataCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("kolkataCnt").innerHTML = results.data[index].EventCount;
      } else if (results.data[index].City === "Mankapur") {
        document.getElementById("mankapurCnt1").innerHTML = results.data[index].EventCount;
        document.getElementById("mankapurCnt").innerHTML = results.data[index].EventCount;
      }

      document.getElementById("allCnt1").innerHTML = allCnt;
      document.getElementById("allCnt").innerHTML = allCnt;

    }
  })
    .catch(err => {
      console.log(err);
    });
}

function locationSelect(location) {
  console.log(location);
  var locationlist = '{"userLocation" :"' + location + '"}';
  console.log(locationlist);
  // console.log(JSON.parse(locationlist));
  localStorage['userLocation'] = location;
  window.location.href = "index.html";
  // caches.open('userDetails').then(function(cache) {
  //   console.log("userLocation", JSON.parse(locationlist));
  //     // cache.put("userLocation", JSON.parse(locationlist));
  //     // cache.put("userLocation", locationlist);
  // });
}
