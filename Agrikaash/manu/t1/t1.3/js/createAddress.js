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
      window.location.href = "index.html";
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
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }

        //document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        //document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });
};

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
  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log("testing");
      addressList = doc.data().AddressList;
      var isNewAddress = true;
    }
  });


  branchID = document.getElementById("branchID").value;
  branchName = document.getElementById("branchName").value;
  branchOwnerName = document.getElementById("branchOwnerName").value;
  addressLine1 = document.getElementById("addressLine1").value;
  addressLine2 = document.getElementById("addressLine2").value;
  city = document.getElementById("City").value;
  ZipCode = document.getElementById("ZipCode").value;
  PhoneNumber = document.getElementById("PhoneNumber").value;

  for (i = 0; i < addressList.length; i++) {

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
      CreatedTimestamp: (new Date()).toString(),
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
//});
