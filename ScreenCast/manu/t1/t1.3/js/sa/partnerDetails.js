var id = "";
var urlParams = "";

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      // document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;

      // GetProfileData(firebaseUser);

      // getSiteURL();

      console.log('welcome' + firebaseUser.email);

    } else {
      console.log('User has been logged out');
      // window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    // window.location.href = "../login";
  }
});



function getSiteURL() {
  var siteURL = window.location.href;
  console.log(siteURL);
  const queryString = window.location.search;
  console.log(queryString);
  urlParams = new URLSearchParams(queryString);
  // id = urlParams.get('id')
  // console.log(id);
  // const color = urlParams.get('color')
  // console.log(color);
  getParams();
  NewPartner();
}

function getParams() {
  id = urlParams.get('id')
  console.log(id);
  const color = urlParams.get('color')
  console.log(color);
  // console.log("id=", id);
}

var partnerID = document.getElementById('partnerID');
var partnerNameID = document.getElementById('partnerNameID');
var locationID = document.getElementById('locationID');
var locationSelectID = document.getElementById('locationSelectID');
var partnerDateID = document.getElementById('partnerDateID');
var partnerPOCNameID = document.getElementById('partnerPOCNameID');
var partnerPOCMobileID = document.getElementById('partnerPOCMobileID');
var partnerImg = document.getElementById('partnerImg');
var partnerDetailsID = document.getElementById('partnerDetailsID');
var activeInactiveDiv = document.getElementById('activeInactiveDiv');
var partnerDetailsDiv = document.getElementById('partnerDetailsDiv');
var partnerNameEditBtn = document.getElementById('partnerNameEditBtn');
var partnerNameCheckBtn = document.getElementById('partnerNameCheckBtn');


function NewPartner() {
  if (id === 'new') {
    console.log("new parter");
    partnerID.innerHTML = "Partner ID: NA";
    partnerNameID.value = "Enter new Partner name";
    locationID.innerHTML = "NA";
    locationSelectID.style.display = 'none';
    activeInactiveDiv.style.display = "none";
    partnerDetailsDiv.style.display = "none";
  }
  else {
    populatePartnersData();
  }
}

partnerNameEditBtn.addEventListener('click', function(e) {
  console.log("partner Edit button Clicked");
  var partnerName = partnerNameID.value;
  console.log("Partner Name: " + partnerName);
  partnerNameID.removeAttribute('readonly');
  locationID.style.display = 'none';
  locationSelectID.style.display = 'block';
  partnerNameEditBtn.style.display = "none";
  partnerNameCheckBtn.style.display = "block";

});

partnerNameCheckBtn.addEventListener('click', function(e) {
  e.preventDefault(); //Prevent to refresh the page
  try {

    console.log("partner Check button Clicked");
    var partnerName = partnerNameID.value;
    console.log("Partner Name: " + partnerName);
    document.getElementById('partnerNameID').readOnly = true;
    var locationSelectValue = locationSelectID.options[locationSelectID.selectedIndex].value;
    locationID.innerHTML = locationSelectValue;
    locationSelectID.style.display = 'none';
    locationID.style.display = 'block';
    partnerNameEditBtn.style.display = "block";
    partnerNameEditBtn.style.display = "block";
    partnerNameCheckBtn.style.display = "none";

    if (id === 'new') {
      savePartnerDetails();
    } else {
      updatePartnerDetails();
    }

  } catch (err) {
    console.log(err.message);
  }
});

function savePartnerDetails() {
  console.log("savePartnerDetails - starts");
  // if (docID != null) {
  //   db.collection("Partners").doc(docID).update({
  //       // Remittance: remittance,
  //       // Amount: txtAmount.value,
  //       // Client: ddlClient.options[ddlClient.selectedIndex].value,
  //       // ModeOfPayment: ddlPaymentMode.options[ddlPaymentMode.selectedIndex].value,
  //       // Reason: ddlReason.options[ddlReason.selectedIndex].value,
  //       // // PaymentDate: paymentDate.value,
  //       //  // PaymentDate: (new Date(Date.parse(paymentDate.value))).toString(),
  //       //  PaymentDate: firebase.firestore.Timestamp.fromDate((new Date(Date.parse(paymentDate.value)))),
  //       // Comment: txtComments.value,
  //       // UpdatedBy: user.email,
  //       // UpdatedTimestamp: (new Date()).toString(),
  //     })
  //     .then(function(docRef) {
  //       console.log("Data added sucessfully in the document: ");
  //       // window.location.href = 'payments.html';
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //       // console.error("error adding document:");
  //     });
  // }
  // else
  {


    // db.collection("Partners").orderBy('CreatedTimestamp', 'desc')
    //   // .where('added_at', "<", paymentData.added_at)
    //   .limit(1).get().then(async (doc) => {
    //     // ...
    //     if (doc.exists) {
    //         var partnerID = doc.data().partnerID;
    //         console.log("Partner ID: " + partnerID);
    //     }
    //     console.log("Doc doesnot exists");
    //   });

    var partnerID = "";

      db.collection("Partners").orderBy('CreatedTimestamp', 'desc')
      // .where('PaymentDate', '>=', strDate)
      // .where('PaymentDate', '<=', endDate)
      // .orderBy('PaymentDate','desc')
      .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          partnerID = change.doc.data().partnerID;
          console.log("Partner ID: " + partnerID);
        })
      })




      //
      // const snapshot = db.collection('Payments').doc(docID);
      // snapshot.get().then(async (doc) => {
      //   if (doc.exists) {
      //     if (doc.data().Remittance == 'Inward') {
      //       userType1.checked = true;
      //     } else {
      //       userType2.checked = true;
      //     }
      //
      //     txtAmount.value = doc.data().Amount;
      //

      var locationSelectID = document.getElementById('locationSelectID');
      var locationSelectValue = locationSelectID.options[locationSelectID.selectedIndex].value;

      console.log(locationSelectValue);


    db.collection("Partners").add({
        uid: "user.uid",
        partnerID: partnerID + "1234",
        partnerName: partnerNameID.value,
        partnerLocation: locationSelectValue,
        partnerType: "CLIENT",
        partnerStatus: "ACTIVE",
        partnerPOCName: "",
        partnerPOCPhone: "",
        // PaymentDate: firebase.firestore.Timestamp.fromDate((new Date(Date.parse(paymentDate.value)))),
        Comment: "",
        CreatedBy: "user.email",
        // CreatedTimestamp: (new Date()).toString(),
        CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        UpdatedBy: "user.email",
        // UpdatedTimestamp: firebase.firestore.Timestamp.fromDate((new Date()).toString()),
      })
      .then(function(docRef) {
        console.log("Data added sucessfully in the document: ");

        // db.collection("Partners").orderBy('CreatedTimestamp', 'desc')
        //   // .where('added_at', "<", paymentData.added_at)
        //   .limit(1).get().then(async (doc) => {
        //     // ...
        //     if (doc.exists) {
        //         var partnerID = doc.data().partnerID;
        //         console.log("Partner ID: " + partnerID);
        //     }
        //     console.log("Doc doesnot exists");
        //   });


        // window.location.href = 'projectDetails.html?id=';
      })
      .catch(function(error) {
        console.log(error);
        // console.error("error adding document:");
      });
  }
};

function populatePartnersData(){

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const snapshot = db.collection('Partners').doc(id);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('inside doc');

      console.log(doc.id);

      var partnerToggleSwitchDiv = document.getElementById('partnerToggleSwitchDiv');
      var partnerToggleSwitch = document.getElementById('partnerToggleSwitch');
      var projectToggleSwitchDiv = document.getElementById('projectToggleSwitchDiv');
      var projectToggleSwitch = document.getElementById('projectToggleSwitch');

      var odeldate = new Date(doc.data().CreatedTimestamp.seconds * 1000);
      var delDate  = odeldate.toLocaleDateString("en-US", options);

      partnerID.innerHTML = 'Partner ID: ' + doc.data().partnerID;
      partnerNameID.value = doc.data().partnerName;
      partnerDateID.innerHTML = delDate;
      partnerImg.src = doc.data().PartnerImgURL;

      for (var i = 0; i < locationSelectID.options.length; i++) {
        if (locationSelectID.options[i].value === doc.data().partnerLocation) {
          locationSelectID.options[i].selected = true;
        }
      }

      locationID.innerHTML = doc.data().partnerLocation;
      if (doc.data().partnerType.toUpperCase() === 'CLIENT') {
        partnerToggleSwitch.innerHTML = 'toggle_off';
        partnerToggleSwitchDiv.classList.add('on');
      }
      else if (doc.data().partnerType.toUpperCase() === 'VENDOR') {
        partnerToggleSwitch.innerHTML = 'toggle_on';
        partnerToggleSwitchDiv.classList.remove('on');
      }

      if (doc.data().partnerStatus.toUpperCase() === 'ACTIVE') {
        projectToggleSwitch.innerHTML = 'toggle_off';
        projectToggleSwitchDiv.classList.add('on');
      }
      else if (doc.data().partnerStatus.toUpperCase() === 'INACTIVE') {
        projectToggleSwitch.innerHTML = 'toggle_on';
        projectToggleSwitchDiv.classList.remove('on');
      }
      partnerPOCNameID.value = doc.data().partnerPOCName;
      partnerPOCMobileID.value = doc.data().partnerPOCPhone;
      partnerDetailsID.value = doc.data().Comment;
    }
  });

};


function updatePartnerDetails(){

  var locationSelectValue = locationSelectID.options[locationSelectID.selectedIndex].value;

  var partnerTypeValue = '';
  var partnerStatusValue = '';

  var partnerToggleSwitchDiv = document.getElementById('partnerToggleSwitchDiv');
  var projectToggleSwitchDiv = document.getElementById('projectToggleSwitchDiv');

  if (partnerToggleSwitchDiv.classList.contains('on')) {
    partnerTypeValue = 'CLIENT';
  } else {
    partnerTypeValue = 'VENDOR';
  };

  if (projectToggleSwitchDiv.classList.contains('on')) {
    partnerStatusValue = 'ACTIVE';
  } else {
    partnerStatusValue = 'INACTIVE';
  };

  db.collection("Partners").doc(id).update({

      partnerName: partnerNameID.value,
      partnerLocation: locationSelectValue,
      partnerType: partnerTypeValue,
      partnerStatus: partnerStatusValue,
      partnerPOCName: partnerPOCNameID.value,
      partnerPOCPhone: partnerPOCMobileID.value,
      Comment: partnerDetailsID.value,
      UpdatedBy: "user.email",
      UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    })
    .then(function(docRef) {
      console.log("Data added sucessfully in the document: ");

      // db.collection("Partners").orderBy('CreatedTimestamp', 'desc')
      //   // .where('added_at', "<", paymentData.added_at)
      //   .limit(1).get().then(async (doc) => {
      //     // ...
      //     if (doc.exists) {
      //         var partnerID = doc.data().partnerID;
      //         console.log("Partner ID: " + partnerID);
      //     }
      //     console.log("Doc doesnot exists");
      //   });


      // window.location.href = 'projectDetails.html?id=';
    })
    .catch(function(error) {
      console.log(error);
      // console.error("error adding document:");
    });
};





function toggleSwitch(toggleDivId, toggleBtnId) {
  console.log("toggleSwitch - function");
  toggleDivId.classList.toggle('on');
  if (toggleBtnId.innerHTML === 'toggle_on') {
    toggleBtnId.innerHTML = 'toggle_off';
  } else if (toggleBtnId.innerHTML === 'toggle_off') {
    toggleBtnId.innerHTML = 'toggle_on';
  }

  updatePartnerDetails();
}

// function projectStateClick(state){
//   document.getElementById('PROPOSAL').classList.remove('active');
//   document.getElementById('SUBMITTED').classList.remove('active');
//   document.getElementById('OPEN').classList.remove('active');
//   document.getElementById('CLOSED').classList.remove('active');
//   state.classList.add('active');
// }

//**************************INSERT Image into Storage & get image url on ui *****************************//


var ImgName, ImgURL;
var files = [];
var reader;

//************ Select File ****************
document.getElementById("selectBtn").onclick = function(e) {
  // alert('camera button click');
  // document.getElementById("uploadImg").style.display = 'block';
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      document.getElementById("partnerImg").src = reader.result;
    }
    reader.readAsDataURL(files[0]);

  }
  input.click();
}

//************ File Upload to Cloud Storage  ****************
document.getElementById('uploadBtn').onclick = function() {
  ImgName = id + '.png';
  console.log('Image Name: ' + ImgName);
  var uploadTask = firebase.storage().ref('PartnerImages/' + ImgName).put(files[0]);

  //Progress of the image upload into storageBucket
  uploadTask.on('state_changed', function(snapshot) {
      // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
      // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
    },

    function(error) {
      alert('error in saving the image');
    },

    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
        ImgUrl = url;
        alert('ImgUrl: ' + ImgUrl);

        db.collection("Partners").doc(id).update({
            // console.log('inside db collection: ' + newEventID);
            // EventId: newEventID,
            PartnerImgURL: ImgUrl,
            UpdatedBy: 'user.id',
            UpdatedTimestamp: (new Date()).toString(),
          })
          .then((docRef) => {
            console.log("Data added sucessfully in the document: " + docRef.toString());
            console.log("eventstart")
            // console.log(Date.parse(eventstart))
          })
          .catch((error) => {
            console.error("error adding document:", error);
          });

      });
    });
}
