var userID = "";
var cartItems = [];
var productCategory = [];

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      GetUserList();
      GetCouponList();

    } else {
      console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
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

function GetUserList() {

  var ddl = document.getElementById("userList");
  const snapshot = db.collection('UserList').get();
  snapshot.then((changes) => {
    changes.forEach(change => {
      //console.log('Document ref id: ' + doc.data().uid);
      var option1 = document.createElement("option");
      option1.setAttribute("value", change.id);
      option1.innerHTML = change.data().displayName + " : " + change.data().EmailID
      console.log(change.data().EmailID);
      ddl.appendChild(option1);
    });

  });
}

function SaveCoupon() {
  var discountType = "";
  var discount = document.getElementById("DiscountPercentage");
  var userList = document.getElementById("userList");
  var couponID = document.getElementById("hfCouponID");
  var users = [];
  var couponCode = Date.now();
  console.log(document.getElementById("rbType1").checked);
  console.log(document.getElementById("rbType2").checked);
  if (document.getElementById("rbType1").checked) {
    discountType = "Absolute";
  } else if (document.getElementById("rbType2").checked) {
    discountType = "Percentage";
  }
  for (i = 0; i < userList.options.length; i++) {
    if (userList.options[i].selected) {
      users.push({
        userID: userList.options[i].value,
        userName: userList.options[i].text
      });
    }
  }

  if (users.length === 0) {
    users.push({
      userID: 'All',
      userName: 'All'
    });
  }


  if (couponID.value != null && couponID.value != '') {
    db.collection("Coupons").doc(couponID.value).update({
        DiscountValue: discount.value,
        UserList: users,
        ValidityTill: '',
        DiscountType: discountType,
        Status: 'Active',
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
  } else {
    db.collection("Coupons").add({
        DiscountValue: discount.value,
        CouponCode: couponCode,
        UserList: users,
        ValidityTill: '',
        DiscountType: discountType,
        Status: 'Active',
        CreatedBy: auth.currentUser.email,
        CreatedTimestamp: (new Date()).toString(),
        UpdatedBy: '',
        UpdatedTimestamp: ''
      })
      .then(function(docRef) {
        console.log("Data added sucessfully in the document: " + docRef.id);
        couponID.value = docRef.id;
        console.log("eventstart");
        GetCouponList();
        // console.log(Date.parse(eventstart))
      })
      .catch(function(error) {
        console.error("error adding document:");
      });

  }

}

function deleteCoupon(couponID) {
  db.collection("Coupons").doc(couponID.value)
    .delete();
  GetCouponList();

}

function GetCouponDetails(couponID) {
  console.log(couponID.value);
  var index = 0;
  var userList = [];
  const snapshot = db.collection('Coupons').doc(couponID.value);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      console.log(doc.data());
      var status = doc.data().Status;
      userList = doc.data().UserList;
      var discountType = doc.data().DiscountType;
      if (discountType === "Percentage") {
        document.getElementById("rbType2").checked = true;
      } else {
        document.getElementById("rbType1").checked = true;
      }
      document.getElementById("hfCouponID").value = doc.id;
      document.getElementById("DiscountPercentage").value = doc.data().DiscountValue;
      var userListCnt = document.getElementById("userList");
      console.log(userList);
      //if (userList[0].userName != "All")
      {


        for (i = 0; i < userListCnt.options.length; i++) {
          console.log(userListCnt.options[i].text);
          index = userList.findIndex(e => e.userName === userListCnt.options[i].text);
          console.log(index);
          if (index >= 0)
            userListCnt.options[i].selected = true;
          else
            userListCnt.options[i].selected = false;
        }
      }

    }
  });
  document.getElementById("DiscountPercentage").focus();
}


function GetCouponList() {
  var ddl = document.getElementById("userList");
  var index = 0;
  document.getElementById("divCouponList").innerHTML = "";
  const snapshot = db.collection('Coupons').get(); //.orderBy("Status");
  snapshot.then((changes) => {
    changes.forEach(change => {
      //renderCoupon(change.data(), index);
      renderCoupon(change, index);
      index = index + 1;
    });

  });
}

function renderCoupon(change, index) {
  var doc = change.data();
  var divmain = document.getElementById("divCouponList");
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "address-card");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var span1 = document.createElement("span");
  span1.innerHTML = "Is Active";

  var input1 = document.createElement("input");
  input1.setAttribute("type", "checkbox");
  input1.setAttribute("id", "isActive" + index);
  console.log("ChangeActive(" + "hfCouponDocID" + index + "," + index + ");");
  input1.setAttribute("onchange", "ChangeActive(" + "hfCouponDocID" + index + "," + index + ");");
  if (doc.Status === "Active")
    input1.checked = true;


  div3.appendChild(span1);
  div3.appendChild(input1);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetCouponDetails(" + "hfCouponDocID" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 40px 0 5px;");

  div3.appendChild(i1);

  var span2 = document.createElement('span');
  span2.setAttribute("id", "btnDelete" + index);
  console.log("deleteCoupon("+ "hfCouponDocID " + index +");");
  span2.setAttribute("onclick", "deleteCoupon("+ "hfCouponDocID" + index +");");
  span2.setAttribute("class", "material-icons");
  span2.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
  span2.innerHTML = "delete_outline";

  div3.appendChild(span2);

  var input2 = document.createElement("input");
  input2.setAttribute("type", "hidden");
  input2.setAttribute("id", "hfCouponID" + index);
  input2.value = doc.couponID;
  div3.appendChild(input2);

  var input21 = document.createElement("input");
  input21.setAttribute("type", "hidden");
  input21.setAttribute("id", "hfCouponDocID" + index);
  input21.value = change.id;

  div3.appendChild(input21);

  var h1 = document.createElement("h5");
  h1.innerHTML = "Coupon Code : " + doc.CouponCode;

  div3.appendChild(h1);

  div2.appendChild(div3);

  var p3 = document.createElement("p");
  p3.innerHTML = "<b>Discount Type : </b>" + doc.DiscountType;
  div2.appendChild(p3);

  var p4 = document.createElement("p");
  if (doc.DiscountType === "Percentage")
    p4.innerHTML = "<b>Discount Value : </b>" + doc.DiscountValue + " %";
  else
    p4.innerHTML = "<b>Discount Value : </b>₹ " + doc.DiscountValue;


  div2.appendChild(p4);

  var userlist = doc.UserList;
  var userString = "";
  for (i = 0; i < userlist.length; i++) {
    userString = userString + userlist[i].userName + "\n";
  }

  var p5 = document.createElement("p");
  p5.innerHTML = "<b>Aplicable to users : </b> " + userString;

  div2.appendChild(p5);
  div1.appendChild(div2);
  divmain.appendChild(div1);

}


function ChangeActive(hfCouponDocID, index) {
  console.log(hfCouponDocID);
  console.log("in ChangeActive", hfCouponDocID, index);

  var cbActive = document.getElementById("isActive" + index);
  var status = "";
  if (cbActive.checked)
    status = "Active";
  else
    status = "In active";
  if (hfCouponDocID.value != null && hfCouponDocID.value != '') {
    db.collection("Coupons").doc(hfCouponDocID.value).update({
        Status: status
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
}
