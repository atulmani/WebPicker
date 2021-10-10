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


// ****************** Starts - GetData **********************

const table = document.getElementById('deviceList');
// const tbody = document.getElementById('');
let tbody = document.createElement('tbody');

// db.collection('WebAds').orderBy('Updated_Timestamp', 'desc').onSnapshot(snapshot => {
  // db.collection('WebAds').onSnapshot(snapshot => {
db.collection('DeviceList').orderBy('createdTimestamp', 'desc').get().then((snapshot) => {
  let changes = snapshot.docChanges();
  // console.log(changes);
  try {

    var count = 0;
    changes.forEach(change => {
      // console.log(change.doc.data());
      if (change.type == 'added') {
        // console.log('New Document Added: ' + change.doc.data());
        renderList(change.doc, ++count);
      } else if (change.type == 'removed') {
        // let li = contactMessageList.querySelector('[data-id=' + change.doc.id + ']');
        // dataListList.removeChild(li);
      }
    });

    // tbody.appendChild(row);
    table.appendChild(tbody);
    // console.log('table append tbody');

    document.getElementById('loading').style.display = 'none';

  } catch (error) {
    // ERR_INTERNET_DISCONNECTED
    // ERR_QUIC_PROTOCOL_ERROR
    console.log('Error: ' + error.message);
  }

});

function renderList(doc, count) {
  // var ID = doc.data().ID;

  var deviceID = doc.id;
  var deviceName = doc.data().deviceName;
  var downloadMediaFrequency = doc.data().downloadMediaFrequency;
  var deviceOwnerName = doc.data().deviceOwnerName;
  var deviceCity = doc.data().deviceCity;
  var deviceType = doc.data().deviceType;
  var deviceSize = doc.data().deviceSize;
  var locationType = doc.data().locationType;
  var locationArea = doc.data().locationArea;
  var completeAddress = doc.data().completeAddress;
  var status = doc.data().status;
  var createdBy = doc.data().createdBy;
  var createdTimestamp = doc.data().createdTimestamp;
  var updatedBy = doc.data().updatedBy;
  var updatedTimestamp = doc.data().updatedTimestamp;

  let row = document.createElement('tr');
  // row.classList.add("item");
  var cell1 = document.createElement("td");
  cell1.innerHTML =  count ;
  row.appendChild(cell1);

  var cell2 = document.createElement("td");
  cell2.innerHTML = "<a href='deviceReg.html?id=" + doc.id +"'>" + deviceID + "</a>";;
  row.appendChild(cell2);

  var cell3 = document.createElement("td");
  cell3.innerHTML = "<a href='deviceReg.html?id=" + doc.id +"'>" + deviceName + "</a>";
  row.appendChild(cell3);

  var cell4 = document.createElement("td");
  cell4.innerHTML = downloadMediaFrequency;
  row.appendChild(cell4);

  var cell5 = document.createElement("td");
  cell5.innerHTML = deviceOwnerName;
  row.appendChild(cell5);

  var cell6 = document.createElement("td");
  cell6.innerHTML = locationType;
  row.appendChild(cell6);

  var cell7 = document.createElement("td");
  cell7.innerHTML = deviceCity + "<br>" +  locationArea + "<br>" + completeAddress;
  row.appendChild(cell7);

  var cell8 = document.createElement("td");
  cell8.innerHTML = deviceType + "<br>" + deviceSize ;
  row.appendChild(cell8);

  var cell9 = document.createElement("td");
  cell9.innerHTML = status;
  row.appendChild(cell9);

  var options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const ut = new Date(updatedTimestamp);
  var formattedDate = ut.toLocaleDateString("en-US", options);
  var formattedTime = ut.toLocaleTimeString("en-US");
  var formattedTimeStamp = formattedDate + ' ' + formattedTime;

  var cell10 = document.createElement("td");
  cell10.innerHTML = updatedBy + '<br>' + formattedTimeStamp;
  row.appendChild(cell10);

  tbody.appendChild(row);
};

// ****************** Ends - GetData **********************
