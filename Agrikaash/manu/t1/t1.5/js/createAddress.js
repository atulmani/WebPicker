//const productID = document.getElementById('productID');
var userID = "";

// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
const addressID = searchParams.get('addressid');
// var userid = searchParams.get('usertid');
console.log('addressID ID: ' + addressID);

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      populateAddress(addressID);

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
          //document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }
        UpdateCartItem();
        //document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        //document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });
};


function UpdateCartItem() {
  var cartItemNo = document.getElementById('cartItemCount');
  //console.log(cartItemNo);
  const snapshotCart = db.collection('CartDetails').doc(userID);
  snapshotCart.get().then((doc) => {
    if (doc.exists) {
      //console.log("doc exists");
      var itemlist = doc.data().cartDetails;
      //console.log(itemlist);
      item = itemlist.length;
      cartItems = itemlist;
      // item = doc.data().cartDetails.length;
      //console.log(item[0]);
      cartItemNo.innerHTML = item;

      // <h5 id="totalAmount">₹ </h5>
      // <small id="itemCount">Items</small>

    }
  });
}

function populateAddress(addressID) {
  var addressList = [];
  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      console.log(doc.data());
      addressList = doc.data().AddressList;

      selIndex = addressList.findIndex(e => e.branchID === addressID);
      if (selIndex >= 0) {
        document.getElementById("branchID").value = addressList[selIndex].branchID;
        document.getElementById("branchName").value = addressList[selIndex].branchName;
        document.getElementById("branchOwnerName").value = addressList[selIndex].branchOwnerName;
        document.getElementById("addressLine1").value = addressList[selIndex].addressLine1;
        document.getElementById("addressLine2").value = addressList[selIndex].addressLine2;
        document.getElementById("City").value = addressList[selIndex].city;
        document.getElementById("ZipCode").value = addressList[selIndex].ZipCode;
        document.getElementById("PhoneNumber").value = addressList[selIndex].PhoneNumber;
      }
    }
  });

}

function saveAddress() {
  console.log('in save address');
  addressList = [];
  console.log(userID);
  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log("testing");
      addressList = doc.data().AddressList;
      var isNewAddress = true;
    }

    branchID = document.getElementById("branchID").value;
    branchName = document.getElementById("branchName").value;
    branchOwnerName = document.getElementById("branchOwnerName").value;
    addressLine1 = document.getElementById("addressLine1").value;
    addressLine2 = document.getElementById("addressLine2").value;
    city = document.getElementById("City").value;
    ZipCode = document.getElementById("ZipCode").value;
    PhoneNumber = document.getElementById("PhoneNumber").value;
    var message = "";
    var flag = false;
    if (branchName.trim().length === 0) {
      flag = true;
      message = "Branch Name "
    }
    if (branchOwnerName.trim().length === 0) {
      if (flag === true) {
        message = message + ", Branch Owner Name ";
      } else {
        message = "Branch Owner Name ";
      }
      flag = true;
    }

    if (addressLine1.trim().length === 0) {
      if (flag === true) {
        message = message + ", Address ";
      } else {
        message = "Address ";
      }
      flag = true;
    }

    if (city.trim().length === 0) {
      if (flag === true) {
        message = message + ", City ";
      } else {
        message = "City ";
      }
      flag = true;
    }

    if (ZipCode.trim().length === 0) {
      if (flag === true) {
        message = message + ", ZipCode ";
      } else {
        message = "ZipCode ";
      }
      flag = true;
    }

    if (PhoneNumber.trim().length === 0) {
      if (flag === true) {
        message = message + ", PhoneNumber ";
      } else {
        message = "PhoneNumber ";
      }
      flag = true;
    }
    message = message + " can not be blank";
    if (flag === true) {

      document.getElementById("errorMessage").innerHTML = message;
    } else {

      console.log(addressList.length);
      for (i = 0; i < addressList.length; i++) {
        console.log(addressID);
        if (addressList[i].branchID === addressID) {
          isNewAddress = false;
          addressList[i].addressSelected = 'YES';
          addressList[i].branchID = branchID;
          addressList[i].branchName = branchName;
          addressList[i].branchOwnerName = branchOwnerName;
          addressList[i].addressLine1 = addressLine1;
          addressList[i].addressLine2 = addressLine2;
          addressList[i].city = city;
          addressList[i].ZipCode = ZipCode;
          addressList[i].PhoneNumber = PhoneNumber;
          addressList[i].addressSelected = 'YES';
        } else
          addressList[i].addressSelected = 'No';
      }

      //addressSelected = document.getElementById("PhoneNumber");
      console.log("branchName : ", branchName);
      console.log(branchID);
      if (branchID === "") {
        branchID = userID + Date.now();
        console.log(branchID);
        addressList.push({
          addressSelected: 'YES',
          branchID: branchID,
          branchName: branchName,
          branchOwnerName: branchOwnerName,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          ZipCode: ZipCode,
          PhoneNumber: PhoneNumber
        });

      }
      console.log(addressList);

      db.collection('AddressList')
        .doc(userID)
        .set({
          AddressList: addressList,
          CreatedBy: auth.currentUser.email,
          CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
          UpdatedBy: '',
          UpdatedTimestamp: ''
        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: ");
          window.location.href = "addressList.html";
          // console.log(Date.parse(eventstart))
        })
        .catch(function(error) {
          //  console.error("error adding document:", error.message);
        });


    }
  });



}
//});
