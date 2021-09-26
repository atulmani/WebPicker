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

const table = document.getElementById('customerList');
// const tbody = document.getElementById('');
let tbody = document.createElement('tbody');

// db.collection('WebAds').orderBy('Updated_Timestamp', 'desc').onSnapshot(snapshot => {
  // db.collection('WebAds').onSnapshot(snapshot => {
db.collection('CustomerList').orderBy('Created_Timestamp', 'desc').get().then((snapshot) => {
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
  var Customer_ID = doc.data().Customer_ID;
  var Customer_Name = doc.data().Customer_Name;
  var Customer_Contact = doc.data().Customer_Contact;
  var Customer_Email = doc.data().Customer_Email;
  var Customer_Address = doc.data().Customer_Address;
  var User_Count = doc.data().User_Count;
  var Status = doc.data().Status;
  var Created_By = doc.data().Created_By;
  var Created_Timestamp = doc.data().Created_Timestamp;
  var Updated_By = doc.data().Updated_By;
  var Updated_Timestamp = doc.data().Updated_Timestamp;

  // console.log ('document id: ' + doc.id);

  // console.log('data received from db');

  let row = document.createElement('tr');
  // row.classList.add("item");
  var cell1 = document.createElement("td");
  cell1.innerHTML =  count ;
  // var cellText = document.createTextNode("cell in row "+i+", column "+j);
  // cell.appendChild(cellText);
  row.appendChild(cell1);

  // var count = 1;

  var cell2 = document.createElement("td");
  cell2.innerHTML = Customer_ID;
  row.appendChild(cell2);

  var cell3 = document.createElement("td");
  cell3.innerHTML = "<a href='customerReg.html?id=" + doc.id +"'>" + Customer_Name + "</a>";
  row.appendChild(cell3);

  var cell4 = document.createElement("td");
  cell4.innerHTML = Customer_Contact;
  row.appendChild(cell4);

  var cell5 = document.createElement("td");
  cell5.innerHTML = Customer_Email;
  row.appendChild(cell5);

  var cell6 = document.createElement("td");
  cell6.innerHTML = Customer_Address;
  row.appendChild(cell6);

  var cell7 = document.createElement("td");
  cell7.innerHTML = User_Count;
  row.appendChild(cell7);

  var cell8 = document.createElement("td");
  cell8.innerHTML = Status;
  row.appendChild(cell8);

  var options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const ut = new Date(Updated_Timestamp);
  var formattedDate = ut.toLocaleDateString("en-US", options);
  var formattedTime = ut.toLocaleTimeString("en-US");
  var formattedTimeStamp = formattedDate + ' ' + formattedTime;

  var cell9 = document.createElement("td");
  cell9.innerHTML = Updated_By + '<br>' + formattedTimeStamp;
  row.appendChild(cell9);

  tbody.appendChild(row);

};

// ****************** Ends - GetData **********************
