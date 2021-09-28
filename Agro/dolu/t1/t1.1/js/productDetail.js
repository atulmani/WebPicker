//
// const booking = document.getElementById("booking");
//
// booking.addEventListener('click', myfnc, false);
// // console.log('myfncworks');
// function myfnc() {
//   alert('hello');
//   console.log('myfncworks');
//   window.location.href = "../checkout/step1-auth.htmlid=" + docID  + "&eventid=" + eventid +"
// }

//************* Populate Event Data - Starts ******************

// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var docID = searchParams.get('id');
var eventid = searchParams.get('eventid');
console.log('Document ID: ' + docID);
console.log('Event ID: ' + eventid);


const booking = document.getElementById("booking");

booking.addEventListener('click', myfnc, false);
// console.log('myfncworks');
function myfnc() {
  alert('hello');
  console.log('myfncworks');
  window.location.href = "../checkout/step1-auth.html?id=" + docID + "&eventid=" + eventid ;
}


if (docID != null) {
  // document.getElementById('optionalFields').style.display = 'block';
  // document.getElementById('imageDiv').style.display = 'block';

  populateEventData();
}

function populateEventData() {
  const snapshot = db.collection('Events').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('Document id:' + doc.id);
      // document.getElementById("eventid").value = doc.data().EventId;
      document.getElementById("eventName").innerHTML = doc.data().EventName;
      document.getElementById("event-mode").innerHTML = doc.data().EventMode;
      document.getElementById("start-time").innerHTML = doc.data().EventStartDate;
      document.getElementById("end-time").innerHTML = doc.data().EventEndDate;
      document.getElementById("organiser-name").innerHTML = doc.data().EventOrganisationName;
      document.getElementById("organiser-email").innerHTML = doc.data().OrganiserEmail;
      document.getElementById("organiser-phone").innerHTML = doc.data().EventorganiserPhone;
      document.getElementById("event-price").innerHTML = doc.data().Price;
      document.getElementById("event-image").src = doc.data().EventImgURL;
      document.getElementById("age").innerHTML = doc.data().Age;
      document.getElementById("language").innerHTML = doc.data().Language;
      document.getElementById("eventstatus").innerHTML = doc.data().Status;
      document.getElementById("para").innerHTML = doc.data().Para;

    }
  });
}

//************* Populate Event Data - Ends ******************
