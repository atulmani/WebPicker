//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      getRegistrationRequest();

    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
  // document.getElementById('loading-img').style.display = 'none';
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);
  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        console.log('Document ref id: ' + doc.data().uid);
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }
        userID = doc.data().uid;
        //  document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        //  document.getElementById('displayName').innerHTML = doc.data().displayName;
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
  console.log(doc.data());
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("style", "padding: 5px;");
  div1.setAttribute("id", "mainDiv" + index);

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
  div7.setAttribute("class", "");

  var lable71 = document.createElement("Label");
  lable71.innerHTML = "Customer Type : ";

  div7.appendChild(lable71);
  var input72 = document.createElement("label");
  input72.setAttribute("id", "CustomerType" + index)
  input72.innerHTML = "<b>" + doc.data().CustomerType + "</b>";
  div7.appendChild(input72);
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

  var hfAddress = document.createElement("input");
  hfAddress.setAttribute("type", "hidden");
  hfAddress.setAttribute("id", "hfAddress" + index);
  hfAddress.setAttribute("value", doc.data().Address);
  div7.appendChild(hfAddress);

  var hfDoB = document.createElement("input");
  hfDoB.setAttribute("type", "hidden");
  hfDoB.setAttribute("id", "hfDOB" + index);
  hfDoB.setAttribute("value", doc.data().DateOfBirth);
  div7.appendChild(hfDoB);

  var hfEmail = document.createElement("input");
  hfEmail.setAttribute("type", "hidden");
  hfEmail.setAttribute("id", "hfEmail" + index);
  hfEmail.setAttribute("value", doc.data().EmailID);
  div7.appendChild(hfEmail);



  var hfIDNo = document.createElement("input");
  hfIDNo.setAttribute("type", "hidden");
  hfIDNo.setAttribute("id", "hfIDNo" + index);
  hfIDNo.setAttribute("value", doc.data().IDNo);
  div7.appendChild(hfIDNo);

  var hfIDType = document.createElement("input");
  hfIDType.setAttribute("type", "hidden");
  hfIDType.setAttribute("id", "hfIDType" + index);
  hfIDType.setAttribute("value", doc.data().IDType);
  div7.appendChild(hfIDType);

  var hfPhone = document.createElement("input");
  hfPhone.setAttribute("type", "hidden");
  hfPhone.setAttribute("id", "hfPhone" + index);
  hfPhone.setAttribute("value", doc.data().Phone);
  div7.appendChild(hfPhone);

  var hfName = document.createElement("input");
  hfName.setAttribute("type", "hidden");
  hfName.setAttribute("id", "hfName" + index);
  hfName.setAttribute("value", doc.data().displayName);
  div7.appendChild(hfName);

  var hfCustomerType = document.createElement("input");
  hfCustomerType.setAttribute("type", "hidden");
  hfCustomerType.setAttribute("id", "hfCustomerType" + index);
  hfCustomerType.setAttribute("value", doc.data().CustomerType);
  div7.appendChild(hfCustomerType);

  var hfProfileImageURL = document.createElement("input");
  hfProfileImageURL.setAttribute("type", "hidden");
  hfProfileImageURL.setAttribute("id", "hfProfileImageURL" + index);
  hfProfileImageURL.setAttribute("value", doc.data().ProfileImageURL);
  div7.appendChild(hfProfileImageURL);

  div7.appendChild(input81);
  div2.appendChild(div7);
  div1.appendChild(div2);
  console.log(div1);
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

  console.log('before insert');
  db.collection("UserList").doc(RegID).set({
      Address: document.getElementById("hfAddress" + index).value,
      DateOfBirth: document.getElementById("hfDOB" + index).value,
      EmailID: document.getElementById("hfEmail" + index).value,
      IDNo: document.getElementById("hfIDNo" + index).value,
      IDType: document.getElementById("hfIDType" + index).value,
      Phone: document.getElementById("hfPhone" + index).value,
      displayName: document.getElementById("hfName" + index).value,
      CustomerType: document.getElementById("hfCustomerType" + index).value,
      Status: 'Active',
      ProfileImageURL: document.getElementById("hfProfileImageURL" + index).value,
      uid: RegID,
      Comments: document.getElementById("comments" + index).value,
      UserRole: userRole,
      CreatedBy: auth.currentUser.email,
      CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      UpdatedBy: '',
      UpdatedTimestamp: ''
    })
    .then((docRef) => {
      console.log("Data added sucessfully in the document: ");

      //document.getElementById("mainDiv" + index).remove();
      db.collection("UserRequest").doc(RegID)
        .delete();

    })
    .catch((error) => {
      console.error("error adding document:", error);
    });

}

function RejectRegistration(index) {
  console.log(index);
  var RegID = document.getElementById("hfID" + index).value;
  console.log(RegID);
  var comments = document.getElementById("comments" + index).value;

  db.collection("UserRequest").doc(RegID).update({
      Status: 'Rejected',
      Comments: comments
    })

    .then((docRef) => {
      console.log("Data added sucessfully in the document: ");
      console.log("eventstart")
      //document.getElementById("rowItem").removeI
      document.getElementById("mainDiv" + index).remove();

      // console.log(Date.parse(eventstart))
    })
    .catch((error) => {
      console.error("error adding document:", error);
    });

}
