//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // console.log(firebaseUser);
      console.log('User: ' + firebaseUser.email + ' is logged-In');
      // console.log("UID: " + firebaseUser.uid);
      // console.log("Display Name: " + firebaseUser.displayName);
      // console.log("Email ID: " + firebaseUser.email);
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
    } else {
      console.log('User has been logged out');
      window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login";
  }
});

// ****************** Populate Campaign Data - Starts **********************
// var url = location.href;
let url = new URL(location.href);
console.log('URL: ' + url);
let searchParams = new URLSearchParams(url.search);
var docID = searchParams.get('id');
console.log('Document ID: ' + docID);

if (docID != null) {
  console.log('Update Customer');
  populateCampaignDetails(docID);
} else {
  console.log('Create New Customer');
  // console.log ('Current user: ' + auth.currentUser);
  document.getElementById('loading').style.display = 'none';
}

function populateCampaignDetails(docID) {
  const snapshot = db.collection('CampaignList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Doc: ' + doc.data().Customer_Name);
      document.getElementById('txtCampaignName').value = doc.data().Campaign_Name;

      document.getElementById('loading').style.display = 'none';
    }
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElementById('errorMessage').style.display = 'block';
  });
}

// ****************** Populate Campaign Data - Ends **********************

function addCampaigninDB() {
  //Add Customer Details in database

  console.log('User Email: ' + auth.currentUser.email );

  // db.collection('CustomerList').get().then((snapshot) => {
  db.collection('CampaignList').orderBy('Created_Timestamp', 'asc').get().then((snapshot) => {
    count = snapshot.size;
    console.log('count: ' + count);

    var newCampaignID = 10000 + count;

    const txtCampaignName = document.getElementById('txtCampaignName').value.trim();

    db.collection('CampaignList')
      .add({
        ID: count + 1,
        Campaign_ID: 'CAMP' + newCampaignID,
        Campaign_Name : txtCampaignName,
        Organization_Name : '',
        Brand: '',
        Device_List: '',
        Status: 'NOT_PUBLISHED',
        Created_By: auth.currentUser.email,
        Created_Timestamp: (new Date()).toString(),
        Updated_By: auth.currentUser.email,
        Updated_Timestamp: (new Date()).toString()
      })
      .then(() => {
        // updated
        console.log('Campaign Data successfully added in Database');

        document.getElementById('errorMessage').innerHTML = "Campaign created successfully, please check Campaign List";
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


// ****************** Save Button Click to create & update Campaign - Starts **********************

//Save Customer addEventListener
const btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  const txtCampaignName = document.getElementById('txtCampaignName').value.trim();

  //All fields are mandatory while registration
  if (txtCampaignName == '') {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    console.log('Data Update Starts');
    // console.log(' Current user: '  + auth.currentUser.email);

    if (docID != null)
      updateCampaign(docID);
    else
      addCampaigninDB();

    // console.log('Data Updated Successfully');
  }
});

// ****************** Save Button Click to create & update Campaign - Ends **********************
