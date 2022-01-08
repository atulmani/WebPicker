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
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        }
        //  document.getElementById('headerProfilePic').src = doc.data().ImageURL;
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

function GetUserList() {

  var ddl = document.getElementById("userList");
  const snapshot = db.collection('UserList').get();
  snapshot.then((changes) => {
    changes.forEach(change => {
      //console.log('Document ref id: ' + doc.data().uid);
      var option1 = document.createElement("option");
      option1.setAttribute("value", change.id);
      option1.innerHTML = change.data().displayName + " : " + change.data().EmailID
      ddl.appendChild(option1);
    });

  });
}

function SaveCoupon() {
  var discountType = "";
  var discount = document.getElementById("DiscountPercentage");
  var userList = document.getElementById("userList");
  var couponID = document.getElementById("hfCouponID");
  var couponName = document.getElementById("couponName");
  var description = document.getElementById("description");
  var termsandCondition = document.getElementById("termsAndCondition");
  var userTypeAll = document.getElementById("All");
  var userTypeSmall = document.getElementById("Small");
  var userTypeMedium = document.getElementById("Medium");
  var userTypeLage = document.getElementById("Large");
  var validity = document.getElementById("validTill");

  var userTypes = [];
  var users = [];
  var couponCode = Date.now();
  if (document.getElementById("absoluteAmount").checked) {
    discountType = "Absolute";
  } else if (document.getElementById("percentage").checked) {
    discountType = "Percentage";
  }

    if (userTypeAll.checked) {
      userTypes.push("All");
    }
  if (userTypeSmall.checked) {
    userTypes.push("Small");
  }
  if (userTypeMedium.checked) {
    userTypes.push("Medium");
  }
  if (userTypeLage.checked) {
    userTypes.push("Large");
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
  console.log(validity.value);

  if (couponID.value != null && couponID.value != '') {
    db.collection("Coupons").doc(couponID.value).update({
        CouponName: couponName.value,
        Description: description.value,
        TermsAndCondition: termsandCondition.value,
        UserType: userTypes,
        ValidityTill: validity.value,
        DiscountValue: discount.value,
        UserList: users,
        ValidityTill: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(validity.value))),
        DiscountType: discountType,
        Status: 'Active',
        UpdatedBy: auth.currentUser.email,
        UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
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
        CouponName: couponName.value,
        CouponCode: couponCode,
        Description: description.value,
        TermsAndCondition: termsandCondition.value,
        UserType: userTypes,
        ValidityTill: validity.value,
        DiscountValue: discount.value,
        UserList: users,
        ValidityTill: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(validity.value))),
        DiscountType: discountType,
        Status: 'Active',
        CreatedBy: auth.currentUser.email,
        CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        UpdatedBy: '',
        UpdatedTimestamp: ''
      })
      .then(function(docRef) {
        console.log("Data added sucessfully in the document: " + docRef.id);
        couponID.value = docRef.id;
        console.log("eventstart");

        // console.log(Date.parse(eventstart))
      })
      .catch(function(error) {
        console.error("error adding document:");
      });

  }
  GetCouponList();
  document.getElementById("createCouponDiv").style.display="none";
  document.getElementById("mapCouponDiv").style.display="none";
  document.getElementById("divSaveButton").style.display="none";
}

function AddCoupon()
{
  document.getElementById("createCouponDiv").style.display="block";
  document.getElementById("mapCouponDiv").style.display="block";
  document.getElementById("divSaveButton").style.display="block";


  document.getElementById("hfCouponID").value = "";
  document.getElementById("DiscountPercentage").value = "";
  var userListCnt = document.getElementById("userList");
    for (i = 0; i < userListCnt.options.length; i++) {
        userListCnt.options[i].selected = false;
  }
  document.getElementById("couponName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("termsAndCondition").value = "";

  document.getElementById("validTill").value = "";

}

function deleteCoupon(couponID) {
  db.collection("Coupons").doc(couponID.value)
    .delete();
  GetCouponList();

}

function GetCouponDetails(couponID) {
  var index = 0;
  var userList = [];
  console.log(couponID.value);
  const snapshot = db.collection('Coupons').doc(couponID.value);

  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      var status = doc.data().Status;
      userList = doc.data().UserList;
      var discountType = doc.data().DiscountType;
      if (discountType === "Percentage") {
        document.getElementById("percentage").checked = true;
      } else {
        document.getElementById("absoluteAmount").checked = true;
      }
      document.getElementById("hfCouponID").value = doc.id;
      document.getElementById("DiscountPercentage").value = doc.data().DiscountValue;
      var userListCnt = document.getElementById("userList");
      //if (userList[0].userName != "All")
      {
        for (i = 0; i < userListCnt.options.length; i++) {
          index = userList.findIndex(e => e.userName === userListCnt.options[i].text);
          if (index >= 0)
            userListCnt.options[i].selected = true;
          else
            userListCnt.options[i].selected = false;
        }
      }
      document.getElementById("couponName").value = doc.data().CouponName;
      document.getElementById("description").value = doc.data().Description;
      document.getElementById("termsAndCondition").value = doc.data().TermsAndCondition;

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
  document.getElementById("DiscountPercentage").focus();


    document.getElementById("createCouponDiv").style.display="block";
    document.getElementById("mapCouponDiv").style.display="block";
    document.getElementById("divSaveButton").style.display="block";

}


function GetCouponList() {
  var ddl = document.getElementById("userList");
  var index = 0;
  document.getElementById("divCouponList").innerHTML = "";
  //const snapshot = db.collection('Coupons').get(); //.orderBy("Status");
  const DBrows = db.collection('Coupons').orderBy("Status").orderBy('CreatedTimestamp', 'desc');

  DBrows.onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();

        document.getElementById("divCoupons").innerHTML="";
    changes.forEach(change => {
      //renderCoupon(change.data(), index);
      renderCoupon(change, index);
      index = index + 1;
    });

  });
}
function ChangeActive1(hfCouponDocID,index,flag)
{
  console.log('in ChangeActive', hfCouponDocID.value);


    var cbActive = document.getElementById("isActive" + index);
    var status = "";
    if (flag != true)
      status = "Active";
    else
      status = "In active";

    console.log(status);
    if (hfCouponDocID.value != null && hfCouponDocID.value != '') {
      db.collection("Coupons").doc(hfCouponDocID.value).update({
          Status: status
        })
        .then((docRef) => {
          console.log("Data added sucessfully in the document: ");
          console.log("eventstart")
          GetCouponList();
          // console.log(Date.parse(eventstart))
        })
        .catch((error) => {
          console.error("error adding document:", error);
        });
    }

}
function renderCoupon(change, index)
{
  var doc = change.doc.data();


    var curFormat = { style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0 };

    var options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

  var ValidityTill = new Date(doc.ValidityTill.seconds * 1000);
  //ValidityTill = ValidityTill.toLocaleDateString("en-US", options);
  var today = new Date();
  var div1 = document.createElement("div");
  div1.setAttribute("class","add-address-card");

  if(doc.Status === "Active" && ValidityTill >= today)
  {
    div1.setAttribute("style","margin: 10px 0;background: rgba(67, 204, 104,0.1);");
  }
  else
  {
    div1.setAttribute("style","margin: 10px 0;background: rgba(255, 87, 87,0.05);");
  }

  var div2 = document.createElement("div");
  div2.setAttribute("class","offers-card");

  var div3 = document.createElement("div");
  div3.setAttribute("class","");

  var hf = document.createElement("input");
  hf.setAttribute("type","hidden");
  hf.setAttribute("id","hfCouponDocID" + index);
  hf.setAttribute("value",change.doc.id );
  div3.appendChild(hf);

  var img1 = document.createElement("img");
  img1.setAttribute("style","width: 80px;height: 80px;");
  img1.setAttribute("alt","");

  if(doc.DiscountType === "Percentage" && ValidityTill >= today && doc.Status === "Active")
  {
    img1.setAttribute("src","../img/discount1.jpg");
  }
  else if(doc.DiscountType === "Percentage" && (ValidityTill < today || doc.Status != "Active"))
  {
    img1.setAttribute("src","../img/discount3.jpg");
  }
  else if(doc.DiscountType === "Absolute" && ValidityTill >= today && doc.Status === "Active")
  {
    img1.setAttribute("src","../img/discount2.png");
  }
  else if(doc.DiscountType === "Absolute" && (ValidityTill < today || doc.Status != "Active"))
  {
    img1.setAttribute("src","../img/discount5.jpg");
  }

  div3.appendChild(img1);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class","offers-card-details");

  var anchor1 = document.createElement("div");
  //anchor1.setAttribute("onclick","ChangeActive1();");
if(doc.Status === "Active")
    anchor1.setAttribute("onclick", "ChangeActive1(" + "hfCouponDocID" + index + "," + index + ",true);");
  else
    anchor1.setAttribute("onclick", "ChangeActive1(" + "hfCouponDocID" + index + "," + index + ",false);");

  var span1 = document.createElement("span");
  if(doc.Status === "Active" && ValidityTill >= today)
  {
    span1.setAttribute("style","color: green;");
  }
  else {
    span1.setAttribute("style","color: #ff5757;");
  }

  var span2 = document.createElement("span");
  span2.setAttribute("class","material-icons-outlined");
  if(doc.Status === "Active" && ValidityTill >= today)
  {
    span2.setAttribute("style","color: green;position: relative; top: 1.1px;");
    span2.innerHTML="check";
    span1.appendChild(span2);
    span1.innerHTML = span1.innerHTML + "ACTIVE";
  }
  else {
      span2.setAttribute("style","color: #ff5757;position: relative; top: 1.1px;");
      span2.innerHTML="close";
      span1.appendChild(span2);

      span1.innerHTML = span1.innerHTML + "INACTIVE";
  }
  anchor1.appendChild(span1);
  div4.appendChild(anchor1);

  // var br1 = document.createElement("br");
  // div4.appendChild(br1);

  var small1 =document.createElement("small");
  small1.innerHTML="Code : " + doc.CouponCode;
  div4.appendChild(small1);

  document.getElementById("divCoupons").appendChild(div1);
  var h51 = document.createElement("h5");
  h51.innerHTML= doc.CouponName;

  div4.appendChild(h51);

  var span31 = document.createElement("span");
    span31.innerHTML=doc.Description ;
  div4.appendChild(span31);
  var br21 = document.createElement("br");
  div4.appendChild(br21);
  var span3 = document.createElement("span");
  if(doc.DiscountType === "Absolute")
  {
    var displayAmt = doc.DiscountValue.toLocaleString('en-IN', curFormat);
    span3.innerHTML= displayAmt + " Discount";
  }
  else {
    span3.innerHTML= doc.DiscountValue + "% Discount";
  }
  div4.appendChild(span3);
  var br2 = document.createElement("br");
  div4.appendChild(br2);
  var span4 = document.createElement("span");
  span4.innerHTML = "Valid Till : " + ValidityTill.toLocaleDateString("en-US", options);
  div4.appendChild(span4);

  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class","offers-card-edit-delete-div");

    var span5 = document.createElement("span");
    span5.setAttribute("onclick", "GetCouponDetails(" + "hfCouponDocID" + index + ");");
    span5.setAttribute("class","material-icons-outlined");
    span5.setAttribute("style","color: green;padding-bottom: 20px;");
    span5.innerHTML = "edit";
    div5.appendChild(span5);

    var span6 = document.createElement("span");
    span6.setAttribute("class","material-icons-outlined");
    span6.setAttribute("onclick", "deleteCoupon(" + "hfCouponDocID" + index + ");");
    span6.setAttribute("style","color: red;padding-top: 20px;");
    span6.innerHTML = "delete";
    div5.appendChild(span6);

    div2.appendChild(div5);

    div1.appendChild(div2);

    document.getElementById("divCoupons").appendChild(div1);
}


// function ChangeActive(hfCouponDocID, index) {
//
//   var cbActive = document.getElementById("isActive" + index);
//   var status = "";
//   if (cbActive.checked)
//     status = "Active";
//   else
//     status = "In active";
//   if (hfCouponDocID.value != null && hfCouponDocID.value != '') {
//     db.collection("Coupons").doc(hfCouponDocID.value).update({
//         Status: status
//       })
//       .then((docRef) => {
//         console.log("Data added sucessfully in the document: ");
//         console.log("eventstart")
//         // console.log(Date.parse(eventstart))
//       })
//       .catch((error) => {
//         console.error("error adding document:", error);
//       });
//   }
// }
