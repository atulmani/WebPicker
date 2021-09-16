
// ****************** Starts - SetAds **********************



//Create Ads
function createAds() {
  console.log('Create Ads Starts');

  var select = document.getElementById('ddMediaType');
  var mediaType = select.options[select.selectedIndex].value;

  db.collection('WebAds').get().then((snapshot) => {
    count = snapshot.size;

    // console.log('No of document3: ' + count);

    db.collection('WebAds')
      .add({
        ID: count + 1,
        Client_ID: count + 1,
        Campaign_Name: document.getElementById('txtName').value,
        Media_Type: mediaType,
        Mapped_Device_Count: document.getElementById('txtMappedDeviceCount').value,
        Schedules: document.getElementById('txtSchedules').value,
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
        console.log('Create Ads Completed Successfully');
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

  console.log('btnSave Clicked');

  const txtContent = document.getElementById('txtContent');
  const txtUploadImages = document.getElementById('uploadImages');

  //All fields are mandatory while registration
  if (txtName.value == '' || ddMediaType.value == '') {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    // console.log('Create Ads Starts');
    // console.log(' Current user: '  + auth.currentUser.email);
    createAds();
    // console.log('Create Ads Ends');
  }
});

// ****************** Ends - SetAds **********************
