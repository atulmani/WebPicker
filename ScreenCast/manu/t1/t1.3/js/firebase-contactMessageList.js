// ****************** Starts - GetData **********************

const table = document.getElementById('messageList');
// const tbody = document.getElementById('');
let tbody = document.createElement('tbody');

// db.collection('WebAds').orderBy('Updated_Timestamp', 'desc').onSnapshot(snapshot => {
  // db.collection('WebAds').onSnapshot(snapshot => {
db.collection('ContactusMessageList').orderBy('Created_Timestamp', 'desc').get().then((snapshot) => {
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
  var ID = doc.data().ID;
  var Organization = doc.data().Organization;
  var Name = doc.data().Name;
  var Phone = doc.data().Phone;
  var Email = doc.data().Email;
  var City = doc.data().City;
  var Country = doc.data().Country;
  var Message = doc.data().Message;
  var Status = doc.data().Status;
  var Created_Timestamp = doc.data().Created_Timestamp;

  // console.log('data received from db');

  let row = document.createElement('tr');
  // row.classList.add("item");
  var cell1 = document.createElement("td");
  cell1.innerHTML = ID;
  // var cellText = document.createTextNode("cell in row "+i+", column "+j);
  // cell.appendChild(cellText);
  row.appendChild(cell1);

  // var count = 1;

  var cell2 = document.createElement("td");
  cell2.innerHTML =  count ;
  row.appendChild(cell2);

  var cell3 = document.createElement("td");
  // cell3.innerHTML = "<a href='adsCreate.html?id=" + ID +"'>" + Organization + "</a>";
  cell3.innerHTML = Organization;
  row.appendChild(cell3);

  var cell4 = document.createElement("td");
  cell4.innerHTML = Name;
  row.appendChild(cell4);

  var cell5 = document.createElement("td");
  cell5.innerHTML = Phone;
  row.appendChild(cell5);

  var cell6 = document.createElement("td");
  cell6.innerHTML = Email;
  row.appendChild(cell6);

  var cell7 = document.createElement("td");
  cell7.innerHTML = City;
  row.appendChild(cell7);

  var cell8 = document.createElement("td");
  cell8.innerHTML = Country;
  row.appendChild(cell8);


  var cell9 = document.createElement("td");
  cell9.innerHTML = Message;
  row.appendChild(cell9);

  var cell10 = document.createElement("td");
  cell10.innerHTML = Status;
  row.appendChild(cell10);

  var options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const ut = new Date(Created_Timestamp);
  var formattedDate = ut.toLocaleDateString("en-US", options);
  var formattedTime = ut.toLocaleTimeString("en-US");
  var formattedTimeStamp = formattedDate + ' ' + formattedTime;

  var cell11 = document.createElement("td");
  cell11.innerHTML = formattedTimeStamp;
  row.appendChild(cell11);

  tbody.appendChild(row);

};

// ****************** Ends - GetData **********************
