var userID = "";
var cartItems = [];
var productCategory = [];
var userType = "";
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      GetNotificationList();

    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        userType = doc.data().userType;
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        }

        document.getElementById('profileName').innerHTML = doc.data().displayName;

      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function GetNotificationDetails(notificationID) {
  var index = 0;
  var userList = [];
  console.log(notificationID.value);
  const snapshot = db.collection('Notification').doc(notificationID.value);

  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      var status = doc.data().Status;
      userList = doc.data().UserList;

      document.getElementById("hfNotificationID").value = doc.id;
      var userListCnt = document.getElementById("userList"); {
        for (i = 0; i < userListCnt.options.length; i++) {
          index = userList.findIndex(e => e.userName === userListCnt.options[i].text);
          if (index >= 0)
            userListCnt.options[i].selected = true;
          else
            userListCnt.options[i].selected = false;
        }
      }
      document.getElementById("NotificationName").value = doc.data().NotificationName;
      document.getElementById("description").value = doc.data().Description;

      var userTypes = [];
      userTypes = doc.data().UserType;
      console.log(userTypes.includes("Small"));
      if (userTypes.includes("All")) {
        document.getElementById("All").checked = true;
      }
      if (userTypes.includes("Small")) {
        document.getElementById("Small").checked = true;
      }
      if (userTypes.includes("Medium")) {
        document.getElementById("Medium").checked = true;
      }
      if (userTypes.includes("Large")) {
        document.getElementById("Large").checked = true;
      }


      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };

      var dDate = new Date(doc.data().ValidityTill.seconds * 1000);
      var dt1 = dDate.toLocaleDateString("en-US", options);
      console.log(dt1);
      document.getElementById("validTill").value = dt1;


    }
  });

  document.getElementById("createNotificationDiv").style.display = "block";
  document.getElementById("mapNotificationDiv").style.display = "block";
  document.getElementById("divSaveButton").style.display = "block";

}


function GetNotificationList() {
  var ddl = document.getElementById("userList");
  var index = 0;
  var flag = false;
  var today = new Date();

  document.getElementById("divNotificationList").innerHTML = "";
  const DBrows = db.collection('Notification')
    .where("Status", '==', 'Active')
    .where('ValidityTill', ">=", today)
    //.orderBy('CreatedTimestamp', 'desc');

  DBrows.onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
      var userListDB = change.doc.data().UserList;
      var userTypeDB = change.doc.data().UserType;

      if (userListDB === undefined)
        flag = true;
      else if (userListDB[0].userID === 'All')
        flag = true;
      else if (userListDB.findIndex(e => e.userID === userID) >= 0)
        flag = true;
      else if (userTypeDB === undefined)
        flag = true;
      else if (userTypeDB[0] === 'All')
        flag = true;
      else if (userTypeDB.indexOf(userType) >= 0)
        flag = true;
      if (flag === true) {
        renderNotification(change, index);
        index = index + 1;
      }
    });

    if(flag === true)
    {
      document.getElementById("notificationCnt").innerHTML=index;
      document.getElementById("noNotificationDiv").style.display="none";
      localStorage.setItem("notificationCount", index);

    }
    else {
      document.getElementById("messageDiv").style.display="none";
    }

  });
}

function renderNotification(change, index) {
  var doc = change.doc.data();
  console.log(doc);

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var ValidityTill = new Date(doc.ValidityTill.seconds * 1000);
  //ValidityTill = ValidityTill.toLocaleDateString("en-US", options);
  var today = new Date();
  var div1 = document.createElement("div");
  div1.setAttribute("class", "add-address-card");

  if (doc.Status === "Active" && ValidityTill >= today) {
    div1.setAttribute("style", "margin: 10px 0;background: rgba(67, 204, 104,0.1);");
  } else {
    div1.setAttribute("style", "margin: 10px 0;background: rgba(255, 87, 87,0.05);");
  }

  var div2 = document.createElement("div");
  div2.setAttribute("class", "offers-card");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var hf = document.createElement("input");
  hf.setAttribute("type", "hidden");
  hf.setAttribute("id", "hfNotificationDocID" + index);
  hf.setAttribute("value", change.doc.id);
  div3.appendChild(hf);

  var img1 = document.createElement("img");
  img1.setAttribute("style", "width: 80px;height: 80px;");
  img1.setAttribute("alt", "");

  if (ValidityTill >= today && doc.Status === "Active") {
    img1.setAttribute("src", "../img/discount1.jpg");
  } else {
    img1.setAttribute("src", "../img/discount3.jpg");
  }

  div3.appendChild(img1);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "offers-card-details");

  var anchor1 = document.createElement("div");
  //anchor1.setAttribute("onclick","ChangeActive1();");
  if (doc.Status === "Active")
    anchor1.setAttribute("onclick", "ChangeActive1(" + "hfNotificationDocID" + index + "," + index + ",true);");
  else
    anchor1.setAttribute("onclick", "ChangeActive1(" + "hfNotificationDocID" + index + "," + index + ",false);");

  var span1 = document.createElement("span");
  if (doc.Status === "Active" && ValidityTill >= today) {
    span1.setAttribute("style", "color: green;");
  } else {
    span1.setAttribute("style", "color: #ff5757;");
  }

  var span2 = document.createElement("span");
  span2.setAttribute("class", "material-icons-outlined");
  if (doc.Status === "Active" && ValidityTill >= today) {
    span2.setAttribute("style", "color: green;position: relative; top: 1.1px;");
    span2.innerHTML = "check";
    span1.appendChild(span2);
    span1.innerHTML = span1.innerHTML + "ACTIVE";
  } else {
    span2.setAttribute("style", "color: #ff5757;position: relative; top: 1.1px;");
    span2.innerHTML = "close";
    span1.appendChild(span2);

    span1.innerHTML = span1.innerHTML + "INACTIVE";
  }
  anchor1.appendChild(span1);
  div4.appendChild(anchor1);

  // var br1 = document.createElement("br");
  // div4.appendChild(br1);

  var small1 = document.createElement("small");
  small1.innerHTML = "Code : " + doc.NotificationCode;
  div4.appendChild(small1);

  var h51 = document.createElement("h5");
  h51.innerHTML = doc.NotificationName;

  div4.appendChild(h51);

  var span31 = document.createElement("span");
  span31.innerHTML = doc.Description;
  div4.appendChild(span31);
  var br21 = document.createElement("br");
  div4.appendChild(br21);
  var span4 = document.createElement("span");
  span4.innerHTML = "Valid Till : " + ValidityTill.toLocaleDateString("en-US", options);
  div4.appendChild(span4);

  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "offers-card-edit-delete-div");

  var span5 = document.createElement("span");
  // span5.setAttribute("onclick", "GetNotiicationDetails(" + "hfNotificationDocID" + index + ");");
  span5.setAttribute("class", "material-icons-outlined");
  span5.setAttribute("style", "color: green;padding-bottom: 20px;");
  span5.innerHTML = "edit";
//  div5.appendChild(span5);

  var span6 = document.createElement("span");
  span6.setAttribute("class", "material-icons-outlined");
  span6.setAttribute("onclick", "deleteNotification(" + "hfNotificationDocID" + index + ");");
  span6.setAttribute("style", "color: red;padding-top: 20px;");
  span6.innerHTML = "delete";
  //div5.appendChild(span6);

  div2.appendChild(div5);

  div1.appendChild(div2);

  document.getElementById("divNotificationList").appendChild(div1);
}
