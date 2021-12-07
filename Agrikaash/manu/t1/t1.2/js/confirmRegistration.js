//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      //GetProfileData(firebaseUser);
      getRegistrationRequest();

    } else {
      console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
  // document.getElementById('loading-img').style.display = 'none';
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UsersList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function getRegistrationRequest() {
  var divPType = document.getElementById('productCategory');
  var divPList = document.getElementById('productRow');
  DBrows = db.collection("UserRequest").get();
  DBrows.then((changes) => {
    var index = 0;
    changes.forEach(change => {

      renderRegistrationRequest(change, index);
      index = index + 1;

    });

  });
}

function renderRegistrationRequest(doc, index) {

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("style", "padding: 5px;");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");
  var span1 = document.createElement("span");
  span1.innerHTML = "User Name : <b>" + doc.data().displayName + "</b>";
  div3.appendChild(span1);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");
  var span2 = document.createElement("span");
  span2.innerHTML = "Email ID : <b>" + doc.data().EmailID + "</b>";
  div4.appendChild(span2);
  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "");
  var span3 = document.createElement("span");
  span3.innerHTML = "Phone : <b>" + doc.data().Phone + "</b>";
  div5.appendChild(span3);
  div2.appendChild(div5);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "");
  var span4 = document.createElement("span");
  span4.innerHTML = "City : <b>" + doc.data().Address + "</b>";
  div6.appendChild(span4);
  div2.appendChild(div6);

  var usertype = doc.data().UserRole;
  console.log(usertype);


  var div7 = document.createElement("div");
  div7.setAttribute("class", "");

  var input1 = document.createElement("input");
  input1.setAttribute("type", "checkbox");
  input1.setAttribute("class", "checkbox");
  input1.setAttribute("style", "width: 0px;")
  input1.setAttribute("name", "")
  input1.setAttribute("id", "userType1" + index);
  input1.setAttribute("value", "Customer");
  input1.setAttribute("text", "Retailer/Customer");

  if (usertype === undefined)
    input1.checked = false;

  else if (usertype.findIndex(e => e.value === "Customer")) {
    input1.checked = true;
  }

  div7.appendChild(input1);

  var lable1 = document.createElement("label");
  lable1.setAttribute("class", "checkbox-label");
  lable1.setAttribute("id", "userType1-label" + index);
  lable1.setAttribute("for", "userType1" + index);

  var i1 = document.createElement("i");
  i1.setAttribute("class", "fas fa-plus");
  lable1.appendChild(i1);

  var i11 = document.createElement("i");
  i11.setAttribute("class", "fas fa-check");
  lable1.appendChild(i11);


  var span5 = document.createElement("span");
  span5.setAttribute("id", "userType1Text" + index);
  span5.innerHTML = "Retailer/Customer"
  lable1.appendChild(span5);
  div7.appendChild(lable1);
  div2.appendChild(div7);

  div7 = document.createElement("div");
  div7.setAttribute("class", "");

  input1 = document.createElement("input");
  input1.setAttribute("type", "checkbox");
  input1.setAttribute("class", "checkbox");
  input1.setAttribute("style", "width: 0px;")
  input1.setAttribute("name", "")
  input1.setAttribute("id", "userType2" + index);
  input1.setAttribute("value", "Vendor");

  if (usertype === undefined)
    input1.checked = false;

  else if (usertype.findIndex(e => e.value === "Vendor")) {
    input1.checked = true;
  }

  div7.appendChild(input1);

  lable1 = document.createElement("label");
  lable1.setAttribute("class", "checkbox-label");
  lable1.setAttribute("id", "userType2-label" + index);
  lable1.setAttribute("for", "userType2" + index);

  i1 = document.createElement("i");
  i1.setAttribute("class", "fas fa-plus");
  lable1.appendChild(i1);

  i11 = document.createElement("i");
  i11.setAttribute("class", "fas fa-check");
  lable1.appendChild(i11);


  span5 = document.createElement("span");
  span5.setAttribute("id", "userType2Text" + index);
  span5.innerHTML = "Vendor/Farmers"
  lable1.appendChild(span5);
  div7.appendChild(lable1);
  div2.appendChild(div7);

  div7 = document.createElement("div");
  div7.setAttribute("class", "");

  var lable71 = document.createElement("Label");
  lable71.innerHTML = "Comments : ";

  div7.appendChild(lable71);
  var input71 = document.createElement("input");
  input71.setAttribute("type", "text");
  input71.setAttribute("id", "comments" + index)
  input71.setAttribute("placeholder", "Enter Comments");

  div7.appendChild(input71);
  div2.appendChild(div7);

  div7 = document.createElement("div");

  var hf = document.createElement("input");
  hf.setAttribute("type", "hidden");
  hf.setAttribute("id", "hfID" + index);
  hf.setAttribute("value", doc.id);
  div7.appendChild(hf);

  var input81 = document.createElement("input");
  input81.setAttribute("type", "button");
  input81.setAttribute("onclick", "ApproveRegistration(" + index + ");");
  input81.setAttribute("value", " Approved ");

  div7.appendChild(input81);

  input81 = document.createElement("input");
  input81.setAttribute("type", "button");
  input81.setAttribute("onclick", "RejectRegistration(" + index + ");");
  input81.setAttribute("value", " Reject ");

  div7.appendChild(input81);
  div2.appendChild(div7);
  div1.appendChild(div2);
  document.getElementById("rowItem").appendChild(div1);

}

function ApproveRegistration(index) {
  var RegID = document.getElementById("hfID" + index).value;
  console.log(RegID);

  var comments = document.getElementById("comments" + index).value;
  var userRole = [];

  var userType1 = document.getElementById("userType1" + index);

  if (userType1.checked)
    userRole.push({
      Value: 'Customer',
      Text: 'Retailer/Customer'
    });

  var userType2 = document.getElementById("userType2" + index);

  if (userType2.checked)
    userRole.push({
      Value: 'Vendor',
      Text: 'Vendor/Farmers'
    });


  var dataRow;
  const snapshot = db.collection('UsersRequest').doc(RegID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        dataRow = doc.data();
        dataRow.Status = 'ACTIVE';
        console.log(dataRow );
      }
      console.log('before insert');
      db.collection("UserList").doc(RegID).set({
            Address: dataRow.Address,
            DateOfBirth: dataRow.DateOfBirth,
            EmailID: dataRow.EmailID,
            IDNo: dataRow.IDNo,
            IDType: dataRow.IDType,
            Phone: dataRow.Phone,
            displayName: dataRow.displayName,
            CustomerType: dataRow.CustomerType,
            Status: 'Active',
            ProfileImageURL: dataRow.ProfileImageURL,
            uid: RegID,
            UserRoles: userRole,
            CreatedBy: auth.currentUser.email,
            CreatedTimestamp: (new Date()).toString(),
            UpdatedBy: '',
            UpdatedTimestamp: ''
          })
          .then((docRef) => {
            console.log("Data added sucessfully in the document: ");
            console.log("eventstart")
            // console.log(Date.parse(eventstart))
          })
          .catch((error) => {
            console.error("error adding document:", error);
          });


    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
}

function RejectRegistration(index) {
  console.log(index);
  var RegID = document.getElementById("hfID" + index).value;
  console.log(RegID);
  var comments = document.getElementById("comments" + index).value;

  db.collection("UserList").doc(RegID).update({
      Status: 'Rejected',
      Comments: comments
    })

    .then((docRef) => {
      console.log("Data added sucessfully in the document: ");
      console.log("eventstart")
      // console.log(Date.parse(eventstart))
    })
    .catch((error) => {
      console.error("error adding document:", error);
    });

}
