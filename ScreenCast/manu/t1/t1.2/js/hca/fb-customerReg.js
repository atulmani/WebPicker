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
  document.getElementById('loading').style.display = 'none';
}

function populateCustomerDetails(docID) {
  const snapshot = db.collection('CustomerList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Doc: ' + doc.data().Customer_Name);
      document.getElementById('txtName').value = doc.data().Customer_Name;
      document.getElementById('txtContact').value = doc.data().Customer_Contact;
      document.getElementById('txtEmail').value = doc.data().Customer_Email;
      document.getElementById('txtAddress').value = doc.data().Customer_Address;

      document.getElementById('loading').style.display = 'none';
    }
  });
}

// ****************** Populate Customer Data - Ends **********************

// ****************** Create and Update Customer Data - Starts **********************

var customerName = document.getElementById('txtName').value.trim();
var customerContact = document.getElementById('txtContact').value.trim();
var customerEmail = document.getElementById('txtEmail').value.trim();
var customerPassword = document.getElementById('txtContact').value.trim();
var customerAddress = document.getElementById('txtAddress').value.trim();

function createCustomerProfile()
{
  console.log('Customer Reg Starts');
  console.log ('Email: ' + customerEmail);
  //Create first User in Firebase for any Customer
  const promise = auth.createUserWithEmailAndPassword(customerEmail, customerPassword);
  promise.then(function(firebaseUser) {
        //Update Display name for User Profile in firebase system
        auth.currentUser.updateProfile({
          displayName: customerName,
          // phoneNumber: txtPhoneNo.value,
          photoURL: ""
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          // Update successful
          //Save the Users registration data in Users db Collection
          addCustomerinDB ();
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
  // db.collection('CustomerList').get().then((snapshot) => {
  db.collection('CustomerList').orderBy('Created_Timestamp', 'asc').get().then((snapshot) => {

    count = snapshot.size;
    console.log('count: ' + count);

    // var lastCustomerID = 10000;
    var newCustomerID = 10000 + count;

    db.collection('CustomerList')
      .add({
        ID: count + 1,
        Customer_ID: 'HCA' + newCustomerID,
        Customer_Name: customerName,
        Customer_Contact: customerContact,
        Customer_Email: customerEmail,
        Customer_Address: customerAddress,
        User_Count: 0,
        Status: 'ACTIVE',
        Created_By: auth.currentUser.email,
        Created_Timestamp: (new Date()).toString(),
        Updated_By: auth.currentUser.email,
        Updated_Timestamp: (new Date()).toString()
      })
      .then(() => {
        // updated
        console.log('Data saved successfully');
        // window.location.href = "dashboard.html";
        // console.log('Customer Registrations Completed Successfully');
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
  db.collection('CustomerList')
    .doc(docID)
    .update({
      // ID: count + 1,
      // Customer_ID: 'HCA' + newCustomerID,
      Customer_Name: document.getElementById('txtName').value,
      Customer_Contact: document.getElementById('txtContact').value,
      Customer_Email: document.getElementById('txtEmail').value,
      Customer_Address: document.getElementById('txtAddress').value,
      // User_Count: 0,
      // Status: 'ACTIVE',
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
const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  // console.log('btnSave Clicked');

  const txtName = document.getElementById('txtName');
  const txtContact = document.getElementById('txtContact');
  const txtEmail = document.getElementById('txtEmail');
  const txtAddress = document.getElementById('txtAddress');

  //All fields are mandatory while registration
  if (txtName.value == '' || txtContact.value == '' || txtEmail.value == '' || txtAddress.value == '') {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    console.log('Data Update Starts');
    // console.log(' Current user: '  + auth.currentUser.email);

    if (docID != null)
      updateCustomer(docID);
    else
      createCustomerProfile();

    console.log('Data Updated Successfully');
  }
});

// ****************** Save Button Click to create & update Customer - Ends **********************
