var userID = "";

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData();

    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});


function GetProfileData() {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(userID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {

        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        }
        document.getElementById('profileName').innerHTML = doc.data().displayName;
        getUserReports();
        //document.getElementById('headerProfilePic').src = doc.data().ProfileImageURL;
        //document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function getUserReports() {
  var DBrows = db.collection('UserList').get();
  var userCnt = 0;
  var userCntMonth = 0;
  var userCnt6Month = 0;

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var todayDate = new Date();
  var date6Month = new Date()
  date6Month = date6Month.setMonth(date6Month.getMonth() - 6);
  DBrows.then((changes) => {
    changes.forEach(change => {
      userCnt = userCnt + 1;
      //console.log(change.data());
      var createdDate = change.data().CreatedTimestamp;
      createdDate = new Date(createdDate.seconds * 1000);
      if (createdDate.getMonth() === todayDate.getMonth() && createdDate.getYear() === todayDate.getYear()) {
        userCntMonth = userCntMonth + 1;
      }
      if (createdDate >= date6Month)
        userCnt6Month = userCnt6Month + 1;

    })
    document.getElementById("totalCnt").innerHTML = userCnt;
    document.getElementById("monthCnt").innerHTML = userCntMonth;
    document.getElementById("sixmonthCnt").innerHTML = userCnt6Month;
    document.getElementById("loading").style.display="none";
    document.getElementById("cardOrder").style.display="block";
  });

}

function showHideCard(card, cardArrow) {
  card.classList.toggle("active");

  cardArrow.classList.toggle("active");
}
