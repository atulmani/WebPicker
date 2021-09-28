// ********** Note: Realtime Listener is not required on this page as redirecting this
// page to customerCreationSuccess.html page once new user has been created *************

// //A realtime Listerner
// auth.onAuthStateChanged(firebaseUser => {
//   try {
//     if (firebaseUser) {
//       // console.log(firebaseUser);
//       console.log('User: ' + firebaseUser.email + ' is logged-In');
//       // console.log("UID: " + firebaseUser.uid);
//       // console.log("Display Name: " + firebaseUser.displayName);
//       // console.log("Email ID: " + firebaseUser.email);
//       // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
//     } else {
//       console.log('User has been logged out');
//       window.location.href = "../login";
//     }
//   } catch (error) {
//     console.log(error.message);
//     window.location.href = "../login";
//   }
// });

// ****************** Populate Customer Data - Starts **********************
// var url = location.href;
let url = new URL(location.href);
console.log('URL: ' + url);
let searchParams = new URLSearchParams(url.search);
var docID = searchParams.get('id');
console.log('Document ID: ' + docID);

if (docID != null) {
  console.log('Update Customer');
  populateCustomerDetails(docID);
} else {
  console.log('Create New Customer');
  // console.log ('Current user: ' + auth.currentUser);
  document.getElementById('loading').style.display = 'none';
}

function populateCustomerDetails(docID) {
  const snapshot = db.collection('CustomerList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Doc: ' + doc.data().Customer_Name);
      document.getElementById('txtOrgDisplayName').value = doc.data().Organization_DisplayName;
      document.getElementById('txtOrgName').value = doc.data().Organization_Name;
      document.getElementById('txtOrgAddress').value = doc.data().Organization_Address;
      document.getElementById('txtName').value = doc.data().ContactPerson_Name;
      document.getElementById('txtEmail').value = doc.data().Primary_Email;
      document.getElementById('txtContact').value = doc.data().Primary_Contact;
      document.getElementById('txtAdditionalContact').value = doc.data().Additional_Contacts;

      document.getElementById('loading').style.display = 'none';
    }
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElementById('errorMessage').style.display = 'block';
  });
}

// ****************** Populate Customer Data - Ends **********************

// ****************** Create and Update Customer Data - Starts **********************

function createCustomerProfile()
{
  console.log('Customer Reg Starts');

  const orgDisplayName = document.getElementById('txtOrgDisplayName').value.trim();
  const customerContactAsPassword = document.getElementById('txtContact').value.trim();
  const customerEmail = document.getElementById('txtEmail').value.trim();
  // const customerPassword = document.getElementById('txtContact').value.trim();
  // const customerAddress = document.getElementById('txtAddress').value.trim();

    //Create first User in Firebase for any Customer
  const promise = auth.createUserWithEmailAndPassword(customerEmail, customerContactAsPassword);
  promise.then(function(firebaseUser) {
            console.log('New User email id: ' + auth.currentUser.email );

        //Update Display name for User Profile in firebase system
        auth.currentUser.updateProfile({
          displayName: orgDisplayName,
          // phoneNumber: txtPhoneNo.value,
          photoURL: ""
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          // Update successful
          console.log('New User Successfully Created');
          auth.signOut().then(() => {
            console.log('New User Successfully logged out');
            // Sign-out successful.
            window.location.href = "customerCreationSuccess.html";
            // console.log('Successfully Logged Out');
          }).catch((error) => {
            // An error happened.
            console.log('Error: ' + error.message);
            window.location.href = "../login";
          });
        }).catch((error) => {
          // An error occurred
          document.getElementById('errorMessage').innerHTML = error.message;
          document.getElementById('errorMessage').style.display = 'block';
        });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorMessage);
      document.getElementById('errorMessage').innerHTML = errorMessage + ' Please use anyother email address to Register';
      document.getElementById('errorMessage').style.display = 'block';

    });
}

function addCustomerinDB() {
  //Add Customer Details in database

  console.log('User Email: ' + auth.currentUser.email );

  // db.collection('CustomerList').get().then((snapshot) => {
  db.collection('CustomerList').orderBy('Created_Timestamp', 'asc').get().then((snapshot) => {
    count = snapshot.size;
    console.log('count: ' + count);

    // var lastCustomerID = 10000;
    var newCustomerID = 10000 + count;

    const orgDisplayName = document.getElementById('txtOrgDisplayName').value.trim();
    const orgName = document.getElementById('txtOrgName').value.trim();
    const primaryEmail = document.getElementById('txtEmail').value.trim();
    const primaryContact = document.getElementById('txtContact').value.trim();
    const additionalEmail = document.getElementById('txtAdditionalEmail').value.trim();
    const additionalContact = document.getElementById('txtAdditionalContact').value.trim();
    const orgAddress = document.getElementById('txtOrgAddress').value.trim();
    const contactpersonName = document.getElementById('txtContactPersonName').value.trim();

    db.collection('CustomerList')
      .add({
        ID: count + 1,
        Organization_ID: 'HCA' + newCustomerID,
        Organization_DisplayName : orgDisplayName,
        Organization_Name : orgName,
        Primary_Email: primaryEmail,
        Primary_Contact: primaryContact,
        Additional_Email: additionalEmail,
        Additional_Contact: additionalContact,
        Organization_Address : orgAddress,
        ContactPerson_Name: contactpersonName,
        User_Count: 0,
        Status: 'ACTIVE',
        Created_By: auth.currentUser.email,
        Created_Timestamp: (new Date()).toString(),
        Updated_By: auth.currentUser.email,
        Updated_Timestamp: (new Date()).toString()
      })
      .then(() => {
        // updated
        createCustomerProfile();
        
        console.log('Customer Data successfully added in Database');
        // window.location.href = "dashboard.html";
        // console.log('Customer Registrations Completed Successfully');

        // document.getElementById('errorMessage').innerHTML = "Customer created successfully, please check in Customer List";
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        document.getElementById('errorMessage').innerHTML = error.message;
        document.getElementById('errorMessage').style.display = 'block';
        console.log('Error while creating Ads');
      });

  });

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

}

function updateCustomer(docID) {
  const orgDisplayName = document.getElementById('txtOrgDisplayName').value.trim();
  const orgName = document.getElementById('txtOrgName').value.trim();
  const primaryEmail = document.getElementById('txtEmail').value.trim();
  const primaryContact = document.getElementById('txtContact').value.trim();
  const additionalEmail = document.getElementById('txtAdditionalEmail').value.trim();
  const additionalContact = document.getElementById('txtAdditionalContact').value.trim();
  const orgAddress = document.getElementById('txtOrgAddress').value.trim();
  const contactpersonName = document.getElementById('txtContactPersonName').value.trim();

  db.collection('CustomerList')
    .doc(docID)
    .update({

      Organization_DisplayName : orgDisplayName,
      Organization_Name : orgName,
      Primary_Email: primaryEmail,
      Primary_Contact: primaryContact,
      Additional_Email: additionalEmail,
      Additional_Contact: additionalContact,
      Organization_Address : orgAddress,
      ContactPerson_Name: contactpersonName,
      // User_Count: 0,
       Status: 'ACTIVE',
      // Created_By: auth.currentUser.email,
      // Created_Timestamp: (new Date()).toString(),
      Updated_By: auth.currentUser.email,
      Updated_Timestamp: (new Date()).toString()
    })
    .then(() => {
      // updated
      console.log('Data updated successfully');
      // window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // An error occurred
      // console.log(error.message);
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
    });

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function() {
      document.querySelector('.alert').style.display = 'none';
    }, 3000);
}


// ****************** Create and Update Customer Data - Ends **********************

// ****************** Save Button Click to create & update Customer - Starts **********************

//Save Customer addEventListener
const btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  // console.log('btnSave Clicked');
  //
  const txtOrgName = document.getElementById('txtOrgName').value.trim();
  // const txtOrgAddress = document.getElementById('txtOrgAddress').value.trim();
  // const txtName = document.getElementById('txtName').value.trim();
  const txtEmail = document.getElementById('txtEmail').value.trim();
  const txtContact = document.getElementById('txtContact').value.trim();
  // const txtAdditionalContact = document.getElementById('txtAdditionalContact').value.trim();

  //All fields are mandatory while registration
  if (txtOrgName == '' || txtContact == '' || txtEmail == '') {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    console.log('Data Update Starts');
    // console.log(' Current user: '  + auth.currentUser.email);

    if (docID != null)
      updateCustomer(docID);
    else
      addCustomerinDB();

    // console.log('Data Updated Successfully');
  }
});

// ****************** Save Button Click to create & update Customer - Ends **********************
