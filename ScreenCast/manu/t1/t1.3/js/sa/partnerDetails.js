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
    partnerNameEditBtn.style.display = "block";
    partnerNameCheckBtn.style.display = "none";

    savePartnerDetails();
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


    db.collection("Partners").add({
        uid: "user.uid",
        partnerID: partnerID + "1234",
        partnerName: document.getElementById('partnerNameID').value,
        partnerLocation: document.getElementById('locationID').innerHTML,
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
  console.log('update data');

  const snapshot = db.collection('Partners').doc(id);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('inside doc');

      console.log(doc.id);

      document.getElementById('partnerID').innerHTML = 'Partner ID: ' + doc.data().partnerID;
      document.getElementById('partnerDateID').innerHTML = doc.data().CreatedTimestamp;
    }
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
}

// function projectStateClick(state){
//   document.getElementById('PROPOSAL').classList.remove('active');
//   document.getElementById('SUBMITTED').classList.remove('active');
//   document.getElementById('OPEN').classList.remove('active');
//   document.getElementById('CLOSED').classList.remove('active');
//   state.classList.add('active');
// }
