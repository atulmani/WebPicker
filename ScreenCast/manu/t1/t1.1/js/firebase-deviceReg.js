
// ****************** Starts - SetData **********************

//Create Ads
function createDevice() {
  console.log('Device Reg Starts');

  db.collection('DeviceList').get().then((snapshot) => {
    count = snapshot.size;

    // console.log('No of document3: ' + count);
    var select = document.getElementById('ddClientList');
    var selectedClient = select.options[select.selectedIndex].value;


    db.collection('DeviceList')
      .add({
        ID: count + 1,
        Client_Name: selectedClient,
        Device_Name: document.getElementById('txtName').value,
        Device_IMEINo: document.getElementById('txtIMEINo').value,
        Device_Location_City: document.getElementById('txtLocationCity').value,
        Device_Location_Area: document.getElementById('txtLocationArea').value,
        Device_Location_Address: document.getElementById('txtLocationAddress').value,
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
        console.log('Error while creating document in collection');
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
  const txtIMEINo = document.getElementById('txtIMEINo');
  const txtLocationCity = document.getElementById('txtLocationCity');
  const txtLocationArea = document.getElementById('txtLocationArea');
  const txtLocationAddress = document.getElementById('txtLocationAddress');

  //All fields are mandatory while registration
  if (txtName.value == '' || txtIMEINo.value == '' || txtLocationCity.value == '' || txtLocationArea.value == '' || txtLocationAddress.value == '' ) {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    // console.log('Create Ads Starts');
    // console.log(' Current user: '  + auth.currentUser.email);
    createDevice();
    // console.log('Create Ads Ends');
  }
});

// ****************** Ends - SetData **********************
