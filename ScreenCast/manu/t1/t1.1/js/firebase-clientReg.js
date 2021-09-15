
// ****************** Starts - SetData **********************

//Create Ads
function createClient() {
  console.log('Client Reg Starts');

  db.collection('ClientList').get().then((snapshot) => {
    count = snapshot.size;

    // console.log('No of document3: ' + count);

    db.collection('ClientList')
      .add({
        ID: count + 1,
        Client_Name: document.getElementById('txtName').value,
        Client_Contact: document.getElementById('txtContact').value,
        Client_Address: document.getElementById('txtAddress').value,
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
        // console.log('Client Registrations Completed Successfully');
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

};

//Update Ads Document
function updateAds(user) {
  db.collection('WebAds')
    .doc(user.uid)
    .update({
      ID: '',
      Name: document.getElementById('txtName').value,
      Phone: document.getElementById('txtPhone_Signup').value,
      ImageCount: '5',
      ImageURL: '', //image url with semi colons
      IMEI: '',
      Schedule: '',
      Status: 'ACTIVE',
      // CreatedBy: auth.currentUser,
      // CreatedTimestamp: (new Date()).toString(),
      UpdatedBy: auth.currentUser,
      UpdatedTimestamp: (new Date()).toString()
    })
    .then(() => {
      // updated
      console.log('Data saved successfully');
      // window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // An error occurred
      // console.log(error.message);
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
    });
};


//Add Sign-up addEventListener
const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  // console.log('btnSave Clicked');

  const txtName = document.getElementById('txtName');
  const txtContact = document.getElementById('txtContact');
  const txtAddress = document.getElementById('txtAddress');

  //All fields are mandatory while registration
  if (txtName.value == '' || txtContact.value == '' || txtAddress.value == '') {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    // console.log('Create Ads Starts');
    // console.log(' Current user: '  + auth.currentUser.email);
    createClient();
    // console.log('Create Ads Ends');
  }
});

// ****************** Ends - SetData **********************
