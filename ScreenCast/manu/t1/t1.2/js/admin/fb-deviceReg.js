//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // console.log(firebaseUser);
      console.log('User: ' + firebaseUser.email + ' is logged-In');
      // console.log("UID: " + firebaseUser.uid);
      // console.log("Display Name: " + firebaseUser.displayName);
      // console.log("Email ID: " + firebaseUser.email);
      document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;
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
  console.log('Update Device Details');
  populateDeviceDetails(docID);
} else {
  console.log('Create New Device');
  // console.log ('Current user: ' + auth.currentUser);
  document.getElementById('loading').style.display = 'none';
}

function populateDeviceDetails(docID) {
  const snapshot = db.collection('DeviceList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Doc: ' + doc.data().Customer_Name);
      document.getElementById('txtDeviceId').value = doc.id;
      document.getElementById('txtDownloadMediaFreq').value = doc.data().downloadMediaFrequency;
      document.getElementById('txtDeviceOwner').value = doc.data().deviceOwnerName;
      document.getElementById('txtDeviceCity').value = doc.data().deviceCity;
      for (var option of document.getElementById("deviceType").options)
      {
        if (option.value === doc.data().deviceType)
        { option.selected = true; }
      }
      for (var option of document.getElementById("deviceSize").options)
      {
        if (option.value === doc.data().deviceSize)
        { option.selected = true; }
      }
      for (var option of document.getElementById("locationType").options)
      {
        if (option.value === doc.data().locationType)
        { option.selected = true; }
      }
      document.getElementById('txtDeviceAreaLocationName').value = doc.data().locationArea;
      document.getElementById('txtDeviceAddress').value = doc.data().completeAddress;

      document.getElementById('loading').style.display = 'none';
      document.getElementById('btnRegister').innerHTML = "Update <i class='fas fa-arrow-right'></i>";
    }
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElementById('errorMessage').style.display = 'block';
  });
}

// ****************** Populate Campaign Data - Ends **********************

function addDeviceInDatabase() {
  //Add Customer Details in database

  console.log('User Email: ' + auth.currentUser.email );

  // db.collection('CustomerList').get().then((snapshot) => {
  db.collection('DeviceList').get().then((snapshot) => {
    count = snapshot.size;

    console.log('count: ' + count);

    sqNo = count + 1;
    var newDeviceID = 10000 + count;

    var selectDeviceType = document.getElementById('deviceType');
    var deviceType = selectDeviceType.options[selectDeviceType.selectedIndex].value;
    var selectDeviceSize = document.getElementById('deviceSize');
    var deviceSize = selectDeviceSize.options[selectDeviceSize.selectedIndex].value;
    var selectlocationType = document.getElementById('locationType');
    var locationType = selectlocationType.options[selectlocationType.selectedIndex].value;

    db.collection('DeviceList')
      .add({
        sqNo: sqNo,
        deviceID: "",
        deviceName: 'DEV' + newDeviceID,
        downloadMediaFrequency: document.getElementById('txtDownloadMediaFreq').value.trim(),
        deviceOwnerName : document.getElementById('txtDeviceOwner').value.trim(),
        deviceCity : document.getElementById('txtDeviceCity').value.trim(),
        deviceType: deviceType,
        deviceSize: deviceSize,
        locationType: locationType,
        locationArea: document.getElementById('txtDeviceAreaLocationName').value.trim(),
        completeAddress: document.getElementById('txtDeviceAddress').value.trim(),
        status: 'ACTIVE',
        createdBy: auth.currentUser.email,
        createdTimestamp: (new Date()).toString(),
        updatedBy: auth.currentUser.email,
        updatedTimestamp: (new Date()).toString()
      })
      .then(() => {
        // updated
        console.log('Device added successfully in Database');

        db.collection("DeviceList").where("sqNo", "==", sqNo)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                db.collection('DeviceCampaignList').doc(doc.id)
                  .set({
                    sqNo: sqNo,
                    deviceID: doc.id,
                    deviceName: 'DEV' + newDeviceID,
                    type: true,
                    downloadMediaFrequency: document.getElementById('txtDownloadMediaFreq').value.trim(),
                    msg: "data fetch successfully",
                    data:[],
                    downloadurl:[]
                  })
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        document.getElementById('errorMessage').innerHTML = "Device added successfully, please check Device List";
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        document.getElementById('errorMessage').innerHTML = error.message;
        document.getElementById('errorMessage').style.display = 'block';
        console.log('Error while saving data');
      });

  });

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

}

function updateDeviceDetails(docID)
{
  console.log("Update device details...");

  db.collection('DeviceCampaignList').doc(docID)
    .update({
      downloadMediaFrequency: document.getElementById('txtDownloadMediaFreq').value
    })
    .then(() => {
      console.log("DeviceCampaignList updated successfully");
    })
    .catch((error) => {
      // An error occurred
      // console.log(error.message);
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
      console.log('Error while updating data');
    });


    var selectDeviceType = document.getElementById('deviceType');
    var deviceType = selectDeviceType.options[selectDeviceType.selectedIndex].value;
    var selectDeviceSize = document.getElementById('deviceSize');
    var deviceSize = selectDeviceSize.options[selectDeviceSize.selectedIndex].value;
    var selectlocationType = document.getElementById('locationType');
    var locationType = selectlocationType.options[selectlocationType.selectedIndex].value;

  db.collection('DeviceList').doc(docID)
    .update({
      deviceID: document.getElementById('txtDeviceId').value,
      downloadMediaFrequency: document.getElementById('txtDownloadMediaFreq').value,
      deviceOwnerName: document.getElementById('txtDeviceOwner').value,
      deviceCity: document.getElementById('txtDeviceCity').value,
      deviceType: deviceType,
      deviceSize: deviceSize,
      locationType: locationType,
      locationArea: document.getElementById('txtDeviceAreaLocationName').value.trim(),
      completeAddress: document.getElementById('txtDeviceAddress').value.trim(),
      updatedBy: auth.currentUser.email,
      updatedTimestamp: (new Date()).toString()
    })
    .then(() => {
      console.log("DeviceList updated successfully");
    })
    .catch((error) => {
      // An error occurred
      // console.log(error.message);
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
      console.log('Error while updating data');
    });



  // console.log("Update device details completed");
}

// ****************** Save Button Click to create & update Campaign - Starts **********************

//Save Customer addEventListener
const btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  const txtDownloadMediaFreq = document.getElementById('txtDownloadMediaFreq').value.trim();
  const txtOwnerName = document.getElementById('txtDeviceOwner').value.trim();
  const txtDeviceCity = document.getElementById('txtDeviceCity').value.trim();

  //All fields are mandatory while registration
  if (txtOwnerName == '' || txtDeviceCity == '' || txtDownloadMediaFreq == '') {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else if ( parseInt(txtDownloadMediaFreq) < 2 || parseInt(txtDownloadMediaFreq) > 525600) {
    document.getElementById('errorMessage').innerHTML = 'Download Frequency should be in between minimum 2 mins to maximum 52560 mins (1 year)';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    console.log('Data Update Starts');
    // console.log(' Current user: '  + auth.currentUser.email);

    if (docID != null)
      updateDeviceDetails(docID);
    else
      addDeviceInDatabase();

    // console.log('Data Updated Successfully');
  }
});

// ****************** Save Button Click to create & update Campaign - Ends **********************
