auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      // document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;

      // GetProfileData(firebaseUser);

      console.log('welcome' + firebaseUser.email);

    } else {
      // console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login/index.html";
  }
});


var btnSave = document.getElementById('btnSave');

var userType1 = document.getElementById('userType1');
var userType2 = document.getElementById('userType2');
var txtAmount = document.getElementById('txtAmount');
var ddlClient = document.getElementById('ddlClient');
var ddlPaymentMode = document.getElementById('ddlPaymentMode');
var ddlReason = document.getElementById('ddlReason');
var txtComments = document.getElementById('txtComments');
var errorMessage = document.getElementById('errorMessage');

btnSave.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  if (userType1.checked || userType2.checked) {
    if ((txtAmount.value === '' || txtAmount.value === null) ||
      (ddlClient.options[ddlClient.selectedIndex].value === 'Name of Clients') ||
      (ddlPaymentMode.options[ddlPaymentMode.selectedIndex].value === 'Mode of Payment') ||
      (ddlReason.options[ddlReason.selectedIndex].value === 'Reason')) {
      errorMessage.style.display = 'block';
      console.log('unsuccessful');
    } else {
      errorMessage.style.display = 'none';
      console.log('Successfull');
      addUpdatePayment(auth.currentUser);
    }
  } else {
    errorMessage.style.display = 'block';
    console.log('unsuccessful full form');
  }

});

let paymentDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(paymentDocUrl.search);
var docID = searchParams.get('id');

console.log(docID);

if (docID != null) {
  console.log('docid :' + docID);
  populatePaymentData();
}


function populatePaymentData(){
  const snapshot = db.collection('Payments').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      if (doc.data().Remittance == 'Inward') {
        userType1.checked = true;
      } else {
        userType2.checked = true;
      }

      txtAmount.value = doc.data().Amount;

      for (var option of ddlClient.options)
      {
        if (option.value === doc.data().Client)
        {
            option.selected = true;
        }
      }

      for (var option of ddlPaymentMode.options)
      {
        if (option.value === doc.data().ModeOfPayment)
        {
            option.selected = true;
        }
      }

      for (var option of ddlReason.options)
      {
        if (option.value === doc.data().Reason)
        {
            option.selected = true;
        }
      }

      txtComments.innerHTML = doc.data().Comment;
    }
  });
}


function addUpdatePayment(user) {
  var remittance = '';

  if (userType1.checked) {
    remittance = 'Inward';
  } else {
    remittance = 'Outward';
  }


  if (docID != null) {

    console.log ("docid = " + docID);

    db.collection("Payments").doc(docID).update({
        Remittance: remittance,
        Amount: txtAmount.value,
        Client: ddlClient.options[ddlClient.selectedIndex].value,
        ModeOfPayment: ddlPaymentMode.options[ddlPaymentMode.selectedIndex].value,
        Reason: ddlReason.options[ddlReason.selectedIndex].value,
        PaymentDate: '',
        Comment: txtComments.value,
        UpdatedBy: user.email,
        UpdatedTimestamp: (new Date()).toString(),
      })
      .then(function(docRef) {
        console.log("Data added sucessfully in the document: ");
        window.location.href = 'payments.html';
      })
      .catch(function(error) {
        console.log(error);
        // console.error("error adding document:");
      });
  }
  else {
    db.collection("Payments").add({
        uid: user.uid,
        Remittance: remittance,
        Amount: txtAmount.value,
        Client: ddlClient.options[ddlClient.selectedIndex].value,
        ModeOfPayment: ddlPaymentMode.options[ddlPaymentMode.selectedIndex].value,
        Reason: ddlReason.options[ddlReason.selectedIndex].value,
        PaymentDate: '',
        Comment: txtComments.value,
        CreatedBy: user.email,
        CreatedTimestamp: (new Date()).toString(),
        UpdatedBy: user.email,
        UpdatedTimestamp: (new Date()).toString(),
      })
      .then(function(docRef) {
        console.log("Data added sucessfully in the document: ");
        window.location.href = 'payments.html';
      })
      .catch(function(error) {
        console.log(error);
        // console.error("error adding document:");
      });
  }
}
