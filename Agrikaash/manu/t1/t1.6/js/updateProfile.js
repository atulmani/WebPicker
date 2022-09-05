//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
var isAdmin = true;
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      //Response.Cookies["googtrans"].Value = '/en/hi';
      //      GetProfileData(firebaseUser);
      GetRegistrationRequest();

      var siteNotification = localStorage.getItem("notificationCount");
      if(document.getElementById("notificationCnt") != undefined)
        document.getElementById("notificationCnt").innerHTML = siteNotification;

      f(document.getElementById("notificationCnt1") != undefined)

      document.getElementById("notificationCnt1").innerHTML = siteNotification;

    } else {
      // console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetRegistrationRequest() {
  // console.log(userID);
  const snapshot = db.collection('UserList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      // console.log(doc.data());
      var displayName = doc.data().displayName;
      var userEmail = doc.data().EmailID;
      var address = doc.data().Address;
      var CustomerType = doc.data().CustomerType;
      var cartIem = 0;
      var DateOfBirth = doc.data().DateOfBirth;
      var IDNo = doc.data().IDNo;
      var IDType = doc.data().IDType;
      var phone = doc.data().Phone;
      var profileImageURL = doc.data().ProfileImageURL;
      var userRole = doc.data().UserRole;
      var companyName = doc.data().CompanyName;
      var gstNumber = doc.data().GSTNumber;
      var preferredTimeSlot = doc.data().PreferredTimeSlot;

      document.getElementById('userName').value = displayName;
      document.getElementById('profileName').innerHTML = displayName;
      document.getElementById('userEmail').innerHTML = userEmail;
      if (phone != undefined)
        document.getElementById('userPhone').value = phone;



      //  document.getElementById('Profilename').value = displayName;
      //  document.getElementById('phone').value = phone;

      if (profileImageURL != '' && profileImageURL != undefined) {
        //  document.getElementById('myimg').src = profileImageURL;
        document.getElementById('profilePic').src = profileImageURL;
        document.getElementById('profilePic_LeftNav').src = profileImageURL;
      }
      var ocity = document.getElementById('cityList');
      for (i = 0; i < ocity.options.length; i++) {
        if (ocity.options[i].value === address)
          ocity.options[i].selected = true;
      }

      if (userRole != undefined && userRole.findIndex(e => e.Text === 'Admin') < 0 ) {
        UpdateCartItem();
        isAdmin = false;
        updateWallet();
        if (companyName != undefined) {
          var compName = document.getElementById('companyName')
          for (i = 0; i < compName.options.length; i++)
            if (compName.options[i].text === companyName)
              compName.options[i].selected = true;
        }
        if (preferredTimeSlot != undefined) {
          var timeSlot = document.getElementById('DeliveryTime');
          for (i = 0; i < timeSlot.options.length; i++) {
            if (timeSlot.options[i].text === preferredTimeSlot) {
              timeSlot.options[i].selected = true;
            }
          }
        }
        if (gstNumber != undefined) {
          document.getElementById('userGST').value =gstNumber;
        }

        document.getElementById("City").value = address;
        document.getElementById("branchOwnerName").value = displayName;

        var addressDoc =  await db.collection("AddressList").doc(userID).get();
        if( addressDoc.exists)
        {
          console.log( "in address");
          var addressList  =addressDoc.data().AddressList;
          for (index = 0; index < addressList.length ; index ++)
          {
            if(addressList[index].addressSelected === 'YES')
            {
              document.getElementById("branchNameHeader").innerHTML = addressList[index].branchName;
              document.getElementById("branchID").value = addressList[index].branchID;
              document.getElementById("branchName").value = addressList[index].branchName;
              document.getElementById("branchOwnerName").value = addressList[index].branchOwnerName;
              document.getElementById("addressLine1").value = addressList[index].addressLine1;
              document.getElementById("addressLine2").value = addressList[index].addressLine2;
              document.getElementById("City").value = addressList[index].city;
              document.getElementById("ZipCode").value = addressList[index].ZipCode;
            }

          }
        }

      }
      //   var userType1 = document.getElementById("userType1");
      //   var userType2 = document.getElementById("userType2");
      //
      //   //for (i = 0; i < userTypeCnt.options.length; i++) {
      //   if (userRole.findIndex(e => e.text === document.getElementById('userType1Text').innerHTML) >= 0)
      //     userType1.checked = true;
      //   if (userRole.findIndex(e => e.text === document.getElementById('userType2Text').innerHTML) >= 0)
      //     userType2.checked = true;
      //   if (userRole.findIndex(e => e.text === document.getElementById('userType0Text').innerHTML) >= 0)
      //     {
      //       userType0.checked = true;
      // //      document.getElementById("divFooterAdmin").style.display="block";
      //
      //
      //     }
      //   else {
      //     document.getElementById("adminDiv").style.display = "none";
      //     // document.getElementById("divFooterPartner").style.display="block";
      //     const snapshotCart = db.collection('CartDetails').doc(userID);
      //
      //     // snapshotCart.get().then(async (docCart) => {
      //     //   if (docCart.exists) {
      //     //       var cartIemDetails = docCart.data().cartDetails;
      //     //       if( cartIemDetails != undefined)
      //     //         cartIem = cartIemDetails.length;
      //     //       document.getElementById('cartitemcount').innerHTML = cartIem;
      //     //   }
      //     // });
      //
      //   }
      //

      var userCat = document.getElementById('customerType');
      for (i = 0; i < userCat.options.length; i++) {
        if (CustomerType === userCat.options[i].text)
          userCat.options[i].selected = true;
        else
          userCat.options[i].selected = false;
      }

      //
      // var IDTypeCnt = document.getElementById('IDType');
      // for (i = 0; i < IDTypeCnt.options.length; i++) {
      //   if (IDType === IDTypeCnt.options[i].text)
      //     IDTypeCnt.options[i].selected = true;
      //   else
      //     IDTypeCnt.options[i].selected = false;
      // }
      //
      // document.getElementById('txtID').value = IDNo

      document.getElementById('loading').style.display = 'none';
    } else {
      document.getElementById('loading').style.display = 'none';
    }
    console.log("5");
  });

  // UpdateCartItem();
  //  updateWallet();
}

function cityChange()
{
  console.log('in cityChange');
  var cityList = document.getElementById("cityList");
  if( document.getElementById("branchID").value === "")
  {
    document.getElementById("City").value = cityList.options[cityList.selectedIndex].value;
  }
}
function editName()
{
  if( document.getElementById("branchOwnerName").value === "")
  {
    document.getElementById("branchOwnerName").value = document.getElementById("userName").value;
  }
}

function showHideCard(card, cardArrow) {
  card.classList.toggle("active");
  cardArrow.classList.toggle("active");
}

function updateWallet() {

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var WalletDetails = document.getElementById('WalletDetails');
  //console.log(cartItemNo);
  const snapshotCart = db.collection('UserWallet').doc(userID);
  snapshotCart.get().then((doc) => {
    if (doc.exists) {
      //console.log("doc exists");
      var wallerAmount = doc.data().WalletAmount;
      //console.log(itemlist);
      wallerAmount = wallerAmount.toLocaleString('en-IN', curFormat);
      WalletDetails.innerHTML = wallerAmount;
      document.getElementById("divWalletDetails").style.display = "block";
    }
  });
}
function UpdateCartItem() {
  var cartItemNo = document.getElementById('cartItemNo');
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

    }
  });
}


function editName() {
  document.getElementById('userName').readOnly = false;
  //var language=Request.Cookies["googtrans"].Value
  //console.log(google.translate.TranslateElement);
  // var lang = document.getElementById("google_translate_element");
  // console.log(lang);
  // console.log(document.getElementById("0:targetLanguage"));
}

function editMobile() {
  document.getElementById('userPhone').readOnly = false;
}

function editGST() {
  document.getElementById('userGST').readOnly = false;
}

function editCompany() {
  document.getElementById('companyName').readOnly = false;
}


async function SaveDetailsPartner() {

  //e.preventDefault();
  var userType = [];

  //var uType1 = document.getElementById("userType1");
  //if (uType1.checked)
  {
    userType.push({
      Text: 'Retailer/Customer',
      Value: 'Customer'
    });
  }

  // var uType2 = document.getElementById("userType2");
  // if (uType2.checked) {
    userType.push({
      Text: 'Vendor/Farmers',
      Value: 'Vendor'
    });
  // }

  var ocustomerType = document.getElementById("customerType");
  var customerType = ocustomerType.options[ocustomerType.selectedIndex].value;
  var ocompanyName = document.getElementById("companyName");
  var companyName = ocompanyName.options[ocompanyName.selectedIndex].value

  // var oIDType = document.getElementById("IDType");
  // var IDType = oIDType.options[oIDType.selectedIndex].value;
  // console.log(IDType);

   var gstNumber = document.getElementById("userGST").value;

  var oCity = document.getElementById("cityList");
  var city = oCity.options[oCity.selectedIndex].value;

  var opreferredTime = document.getElementById("DeliveryTime");
  var preferredTime = opreferredTime.options[opreferredTime.selectedIndex].value;

  db.collection('UserList')
    .doc(userID)
    .update({
      DateOfBirth: '',
      displayName: document.getElementById('userName').value,
      Phone: document.getElementById('userPhone').value,
      Address: city,
      CompanyName: companyName,
      GSTNumber:gstNumber,
      PreferredTimeSlot:preferredTime,
      IDType: '',
      IDNo: '',
      // UserRole: userType,
      CustomerType: customerType,
      UpdatedBy: auth.currentUser.email,
      UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
    })
    .then(() => {
      //saved successfully
      //
      // console.log("saved");
      //save address
      var docAddress = saveAddress();
      if(document.getElementById("errorMessage").innerHTML === "")
      {
        document.getElementById("confirmationMessage").style.display = 'block';
      }


    })
    .catch(function(error) {
      console.log("in error");
      // document.getElementById('errorMessage').innerHTML = error.message;
      // document.getElementById('errorMessage').style.display = 'block';
    });


  document.getElementById('userName').readOnly = true;
  document.getElementById('userPhone').readOnly = true
}

async function saveAddress() {
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

    var branchID = document.getElementById("branchID").value;
    var branchName = document.getElementById("branchName").value;
    var branchOwnerName = document.getElementById("branchOwnerName").value;
    var addressLine1 = document.getElementById("addressLine1").value;
    var addressLine2 = document.getElementById("addressLine2").value;
    var city = document.getElementById("City").value;
    var ZipCode = document.getElementById("ZipCode").value;
    var PhoneNumber = document.getElementById("userPhone").value;
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
        console.log(branchID);
        if (addressList[i].branchID === branchID) {
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
          // console.log(Date.parse(eventstart))
        })
        .catch(function(error) {
          //  console.error("error adding document:", error.message);
        });
    }
  });
}
function SaveDetails() {

  //e.preventDefault();
  var userType = [];
  // var uType0 = document.getElementById("userType0");
  // if (uType0 != undefined && uType0.checked) {
  //   userType.push({
  //     Text: 'Admin',
  //     Value: 'Admin'
  //   });
  // }

  //var uType1 = document.getElementById("userType1");
  //if (uType1.checked)
  {
    userType.push({
      Text: 'Admin',
      Value: 'Admin'
    });
  }

  // var uType2 = document.getElementById("userType2");
  // if (uType2.checked) {
  //   userType.push({
  //     Text: 'Vendor/Farmers',
  //     Value: 'Vendor'
  //   });
  // }

  var ocustomerType = document.getElementById("customerType");
  var customerType = ocustomerType.options[ocustomerType.selectedIndex].value;
  var ocompanyName = document.getElementById("companyName");
  var companyName = ocompanyName.options[ocompanyName.selectedIndex].value

  // var oIDType = document.getElementById("IDType");
  // var IDType = oIDType.options[oIDType.selectedIndex].value;
  // console.log(IDType);

  var oCity = document.getElementById("cityList");
  var city = oCity.options[oCity.selectedIndex].value;
  db.collection('UserList')
    .doc(userID)
    .update({
      DateOfBirth: '',
      displayName: document.getElementById('userName').value,
      Phone: document.getElementById('userPhone').value,
      Address: city,
      CompanyName: companyName,
      IDType: '',
      IDNo: '',
      // UserRole: userType,
      CustomerType: customerType,
      UpdatedBy: auth.currentUser.email,
      UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
    })
    .then(() => {
      //saved successfully
      //
      // console.log("saved");
      document.getElementById("confirmationMessage").style.display = 'block';
    })
    .catch(function(error) {
      console.log("in error");
      // document.getElementById('errorMessage').innerHTML = error.message;
      // document.getElementById('errorMessage').style.display = 'block';
    });


  document.getElementById('userName').readOnly = true;
  document.getElementById('userPhone').readOnly = true
}


//**************************INSERT Image into Storage & get image url on ui *****************************/
var ImgName, ImgURL;
var files = [];
var reader;
//************ Select File ****************

// document.getElementById("select").onclick = function(e) {
document.getElementById("cameraIcon").onclick = function(e) {
  // alert('camera button click');
  // document.getElementById("uploadImg").style.display = 'block';
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      document.getElementById("profilePic").src = reader.result;
      document.getElementById("profilePic_LeftNav").src = reader.result;

      // console.log("Camera Icon Clicked", reader.result);
    }

    reader.readAsDataURL(files[0]);
    document.getElementById("uploadIcon").disabled = false;

  }
  input.click();

}
//************ File Upload to Cloud Storage  ****************
// document.getElementById('upload').onclick = function() {
document.getElementById('uploadIcon').onclick = function() {
  // ImgName = document.getElementById('namebox').value;
  //  productID = document.getElementById('hfproductID').value;

  ImgName = userID + '.png';
  // console.log(ImgName);
  // ImgName = document.getElementById('productID').value + '_1.png';
  //files = document.getElementById("myimg").src;

  var uploadTask = firebase.storage().ref('UserProfile/' + ImgName).put(files[0]);

  //Progress of the image upload into storageBucket
  uploadTask.on('state_changed', function(snapshot) {
      // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
      // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
    },

    function(error) {
      alert('error in saving the image');
    },

    function() {
      //console.log(document.getElementById('hfproductID'));
      //productID = document.getElementById('hfproductID').value;
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
        ImgUrl = url;
        // alert('ImgUrl: ' + ImgUrl);
        alert("Your image has been uploaded successfully");
        // console.log(userID);

        //Update meta data for firebase storage resources - Start
        var storageRef = uploadTask.snapshot.ref;
        // console.log ("storageRef: " + storageRef );
        // Create file metadata to update to cache for 1 year
        var newMetadata = {
          cacheControl: 'public,max-age=31536000',
          contentType: 'image/png'
        };
        // Update metadata properties
        storageRef.updateMetadata(newMetadata)
          .then((metadata) => {
            // Updated metadata for storage resources is returned in the Promise
            // console.log("metadata added on image url: " + url);
          }).catch((error) => {
            // Uh-oh, an error occurred!
          });

        //Update meta data for firebase storage resources - End

        db.collection("UserList").doc(userID).update({
            // console.log('inside db collection: ' + newEventID);
            // EventId: newEventID,
            ProfileImageURL: ImgUrl
          })
          .then(function(docRef) {
            document.getElementById("upload").disabled = true;
            //        document.getElementById("navUser").src = url;
            // console.log("Data added sucessfully in the document: " + userID);

          })
          .catch(function(error) {
            console.error("error adding document:", error);
          });

      });
    });
}

//************* Create & Update Event Data - End ******************
