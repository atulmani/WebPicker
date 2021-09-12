// ****************** Starts - GetData **********************

const table = document.getElementById('adsList');
// const tbody = document.getElementById('');
let tbody = document.createElement('tbody');

// db.collection('WebAds').orderBy('Updated_Timestamp', 'desc').onSnapshot(snapshot => {
  // db.collection('WebAds').onSnapshot(snapshot => {
db.collection('WebAds').orderBy('Updated_Timestamp', 'desc').get().then((snapshot) => {
  let changes = snapshot.docChanges();
  // console.log(changes);
  try {
    // document.getElementById('loading').style.display = 'block';
    //
    // // Show alert
    // document.querySelector('.alert').style.display = 'block';
    //
    // // Hide alert after 3 seconds
    // setTimeout(function() {
    //   document.querySelector('.alert').style.display = 'none';
    // }, 3000);

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
  var Client_ID = doc.data().Client_ID;
  var Campaign_Name = doc.data().Campaign_Name;
  var Media_Type = doc.data().Media_Type;
  var Mapped_Device_Count = doc.data().Mapped_Device_Count;
  var Schedules = doc.data().Schedules;
  var Status = doc.data().Status;
  var Created_By = doc.data().Created_By;
  var Created_Timestamp = doc.data().Created_Timestamp;
  var Updated_By = doc.data().Updated_By;
  var Updated_Timestamp = doc.data().Updated_Timestamp;

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
  cell3.innerHTML = "<a href='adsCreate.html?id=" + ID +"'>" + Campaign_Name + "</a>";
  row.appendChild(cell3);

  var cell4 = document.createElement("td");
  cell4.innerHTML = Media_Type;
  row.appendChild(cell4);

  var cell5 = document.createElement("td");
  cell5.innerHTML = Mapped_Device_Count;
  row.appendChild(cell5);

  var cell6 = document.createElement("td");
  cell6.innerHTML = Schedules;
  row.appendChild(cell6);

  var cell7 = document.createElement("td");
  cell7.innerHTML = Status;
  row.appendChild(cell7);

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

  var cell8 = document.createElement("td");
  cell8.innerHTML = Updated_By + '<br>' + formattedTimeStamp;
  row.appendChild(cell8);

  tbody.appendChild(row);

};

// ****************** Ends - GetData **********************
