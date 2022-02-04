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
    document.getElementById("userCnt").innerHTML = userCnt;

    document.getElementById("loading").style.display = "none";
    //document.getElementById("userListDiv").style.display = "block";
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
  div1.setAttribute("class", "dashboard-card user-list active");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "dashboard-card-order");
  div2.setAttribute("style", "display:flex; align-items: baseline;");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var h1 = document.createElement("h5");
  h1.setAttribute("class", "small-text")
  h1.setAttribute("style", "margin: 0 auto;");
  if (userDetails.displayName === undefined)
    h1.innerHTML = "-";
  else
    h1.innerHTML = userDetails.displayName;

  div3.appendChild(h1);
  var small1 = document.createElement("small");
  small1.innerHTML = "<span>" + +"</span>"
  if (userDetails.Address === undefined)
    small1.innerHTML = "<span>-</span>";
  else
    small1.innerHTML = "<span>" + userDetails.Address + "</span>";
  div3.appendChild(small1);

  var br1 = document.createElement("br");
  div3.appendChild(br1);

  var small2 = document.createElement("small");
  small2.innerHTML = "<span>" + +"</span>"
  if (userDetails.CompanyName === undefined)
    small2.innerHTML = "<span>-</span>";
  else
    small2.innerHTML = "<span>" + userDetails.CompanyName + "</span>";
  div3.appendChild(small2);

  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");

  var h2 = document.createElement("h5");
  h2.setAttribute("class", "small-text")
  h2.setAttribute("style", "margin: 0 auto;");
  if (userDetails.Phone === undefined)
    h2.innerHTML = "-";
  else
    h2.innerHTML = userDetails.Phone;

  div4.appendChild(h2);

  var small3 = document.createElement("small");
  small3.innerHTML = "<span>" + +"</span>"
  if (userDetails.EmailID === undefined)
    small3.innerHTML = "<span>-</span>";
  else
    small3.innerHTML = "<span>" + userDetails.EmailID + "</span>";
  div4.appendChild(small3);

  var br2 = document.createElement("br");
  div4.appendChild(br2);

  var small4 = document.createElement("small");
  small4.innerHTML = "<span>" + +"</span>"
  small4.innerHTML = "<span> since " + createdDate + "</span>";
  div4.appendChild(small4);

  div2.appendChild(div4);

  div1.appendChild(div2);

  document.getElementById("userList").appendChild(div1);

}

function showHideCard(card, cardArrow) {
  card.classList.toggle("active");

  cardArrow.classList.toggle("active");
}
