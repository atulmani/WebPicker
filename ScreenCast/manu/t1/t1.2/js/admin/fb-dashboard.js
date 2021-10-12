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
      document.getElementById('displayName').innerHTML = firebaseUser.displayName;

    } else {
      console.log('User has been logged out');
      window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login";
  }
});

db.collection('CampaignList').orderBy('createdTimestamp', 'desc').get().then((snapshot) => {
  // let changes = snapshot.docChanges();
  document.getElementById('campaignCount').innerHTML = snapshot.size;
  document.getElementById('campaignActiveCount').innerHTML = snapshot.size;
  document.getElementById('campaignInActiveCount').innerHTML = '0';
});

db.collection('DeviceList').orderBy('createdTimestamp', 'desc').get().then((snapshot) => {
  // let changes = snapshot.docChanges();
  document.getElementById('deviceCount').innerHTML = snapshot.size;
  document.getElementById('deviceActiveCount').innerHTML = snapshot.size;
  document.getElementById('deviceInActiveCount').innerHTML = '0';
});
