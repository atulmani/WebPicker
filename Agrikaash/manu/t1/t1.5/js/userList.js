var userID = "";
var exportData = [];
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
  exportData = [];
  exportData.push({
    C1: "Email",
    C2: "Phone Number",
    C3: "Name",
    C4: "Location",
    C5: "Created On"

  });
  var todayDate = new Date();
  var date6Month = new Date()
  date6Month = date6Month.setMonth(date6Month.getMonth() - 6);
  document.getElementById("userList").innerHTML = "";

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


  DBrows.then((changes) => {
    changes.forEach(change => {
      // console.log(change.data());
      // console.log(change.id);
      var createdDate = new Date(change.data().CreatedTimestamp.seconds * 1000);
      createdDate = createdDate.toLocaleDateString("en-US", options);

      exportData.push({
        C1: change.data().EmailID,
        C2: change.data().Phone,
        C3: change.data().displayName,
        C4: change.data().Address,
        C5: createdDate

      });

      renderUsers(change.data(), change.id, userCnt);
      userCnt = userCnt + 1;

    });

    document.getElementById("loading").style.display = "none";
    document.getElementById("userListDiv").style.display = "block";
  });

}


function exportFile() {
  exportCSVFile(exportData, "UserList");
}

function renderUsers(userDetails, userID, index) {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var createdDate = new Date(userDetails.CreatedTimestamp.seconds * 1000);
  createdDate = createdDate.toLocaleDateString("en-US", options);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "payment-details-div");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "");

  var h1 = document.createElement("h5");
  h1.setAttribute("class", "small-text");
  h1.setAttribute("style", "margin: 0 auto;");
  h1.innerHTML = userDetails.EmailID;

  div2.appendChild(h1);
  div1.appendChild(div2);

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var h2 = document.createElement("h5");
  h2.setAttribute("class", "small-text");
  h2.setAttribute("style", "margin: 0 auto;");
  if (userDetails.Phone === undefined)
    h2.innerHTML = "-";
  else
    h2.innerHTML = userDetails.Phone;

  div3.appendChild(h2);
  div1.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");

  var h3 = document.createElement("h5");
  h3.setAttribute("class", "small-text");
  h3.setAttribute("style", "margin: 0 auto;");
  if (userDetails.displayName === undefined) {
    h3.innerHTML = "-";
  } else {
    h3.innerHTML = userDetails.displayName;
  }

  div4.appendChild(h3);
  div1.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "");

  var h4 = document.createElement("h5");
  h4.setAttribute("class", "small-text");
  h4.setAttribute("style", "margin: 0 auto;");
  if (userDetails.Address === undefined)
    h4.innerHTML = "-";
  else
    h4.innerHTML = userDetails.Address;
  div5.appendChild(h4);

  var hf4 = document.createElement("input");
  hf4.setAttribute("type", "hidden");
  hf4.setAttribute("id", "hf" + index);
  hf4.setAttribute("value", userID);
  div5.appendChild(hf4);

  div1.appendChild(div5);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "");

  var h6 = document.createElement("h5");
  h6.setAttribute("class", "small-text");
  h6.setAttribute("style", "margin: 0 auto;");
  h6.innerHTML = createdDate;

  div6.appendChild(h6);
  div1.appendChild(div6);

  document.getElementById("userList").appendChild(div1);

}
