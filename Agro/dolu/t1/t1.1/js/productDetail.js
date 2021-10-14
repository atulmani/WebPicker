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
  // alert('hello');
  console.log('myfncworks');

  if (auth.currentUser)    
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
      // document.getElementById("age").innerHTML = doc.data().Age;

      if (doc.data().Age == 'undefined'  || doc.data().Age == '' || doc.data().Age == null ) {

        document.getElementById("age").innerHTML = "any age group";
        // console.log('In If condition :' + doc.data().Age );
      }
      else {
       document.getElementById("age").innerHTML = doc.data().Age;
       // console.log('age is working in else:' + doc.data().Age );
     }

      // document.getElementById("language").innerHTML = doc.data().Language;

      if (doc.data().Language == 'undefined'  || doc.data().Language == '' || doc.data().Language == null ) {

        document.getElementById("language").innerHTML = "English";
        // console.log('In If condition :' + doc.data().Age );
      }
      else {
       document.getElementById("language").innerHTML = doc.data().Language;
       // console.log('age is working in else:' + doc.data().Age );
     }
      document.getElementById("eventstatus").innerHTML = doc.data().Status;
      // document.getElementById("para").innerHTML = doc.data().Para;

      if (doc.data().Para == 'undefined'  || doc.data().Para == '' || doc.data().Para == null ) {

        document.getElementById("para").innerHTML = "Below are the event detail";
        // console.log('In If condition :' + doc.data().Age );
      }
      else {
       document.getElementById("para").innerHTML = doc.data().Para;
       // console.log('age is working in else:' + doc.data().Age );
     }

    }
  });
}

//************* Populate Event Data - Ends ******************
