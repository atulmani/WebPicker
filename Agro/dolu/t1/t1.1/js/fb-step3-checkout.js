// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var docID = searchParams.get('id');
var eventid = searchParams.get('eventid');
console.log('Document ID: ' + docID);
console.log('Event ID: ' + eventid);


// *********************** Firebase APIs for knowing currentUser who just logged in************************

//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // alert('i am in profile page');
      console.log('Logged-in user email id: ' + firebaseUser.email);
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('fName').value = firebaseUser.FirstName;
      // document.getElementById('phone').value = firebaseUser.Phone;
      document.getElementById('email').value = firebaseUser.email;

      GetProfileData(firebaseUser);
      getEventRegistration();
      populateEventData();
      calculatePrice();
      console.log('getting profile data');



    } else {
      // console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "index.html";
  }
});

// ******************************* Function for getting or populating user's data sarts************

function GetProfileData(user) {
  const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        // console.log ('Document ref id: ' + doc.data().uid);
        // console.log('Display Name: '+ doc.data().displayName);
        // console.log('Phone '+ doc.data().Phone);
        // console.log('Date of Birth: '+ doc.data().DateOfBirth);
        console.log('.fName: ' + doc.data().FirstName);

        // document.getElementById('status').innerHTML = doc.data().Status;
        // document.getElementById('myimg').src = doc.data().ImageURL;
        // document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('lName').value = doc.data().LastName;
        document.getElementById('fName').value = doc.data().FirstName;
        document.getElementById('phone').value = doc.data().Phone;
        document.getElementById('dob').value = doc.data().DateOfBirth;
        // document.getElementById('email').value = doc.data().DateOfBirth;

        // document.getElementById('address').value = doc.data().Address;
        // document.getElementById('city').value = doc.data().City;
        // document.getElementById('state').value = doc.data().State;
        // document.getElementById('ticket').value = doc.data().Ticket;





        // for (var option of document.getElementById("idtype").options)
        // {
        //   if (option.value === doc.data().IDType)
        //   {
        //       option.selected = true;
        //   }
        // }
        //
        // document.getElementById('idno').value = doc.data().IDNo;
        // document.getElementById('address').value = doc.data().Address;

      }
    })
    .catch((error) => {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};
// ******************************* Function for getting or populating user's data ends************


const register = document.getElementById('eventRegister');
const addMore = document.querySelector(".addMore");
const extraBox = document.getElementById('firstExtra');
const pay = document.getElementById('pay');
const saveup = document.getElementById('saveup');
const firstExtra = document.getElementById('firstExtra');
const head = document.getElementById('head');
// const del = document.getElementById(".del");



register.addEventListener('click', eventRegistration, false);
addMore.addEventListener('click', extraBoxDisplay, false);
saveup.addEventListener('click', addEventReg, false);
del.addEventListener('click', deleteEventReg, false);


//**************************Set users data into Users DB Collection starts**********************************
function eventRegistration(user) {
  // alert(' participant set started');

  // var select = document.getElementById('idtype');
  // var idtype = select.options[select.selectedIndex].value;
  const erId = docID + auth.currentUser.uid;

  db.collection('EventRegistration')
    .doc(erId)
    .set({
      uid: auth.currentUser.uid,
      EventId: docID,
      Participants: [],
      // Price: document.getElementById("eventprice").value

    })
    .then(() => {
      // updated
      console.log('data saved in EventRegistration collection');
      //
      // // Show alert
      // document.querySelector('.alert').style.display = 'block';
      //
      // // Hide alert after 3 seconds
      // setTimeout(function() {
      //   document.querySelector('.alert').style.display = 'none';
      // }, 3000);
      register.style.display = "none";
      addMore.style.display = "block";
      pay.style.display = "block";
      console.log("the event registration id is" + erId);




      // window.location.href = "../checkout/step3-checkout.html";
    })
    .catch((error) => {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage').innerHTML = error.message;
      // document.getElementById('errorMessage').style.display = 'block';
    });
};
// ******************************* set user data ends***********************************

function extraBoxDisplay() {
  extraBox.style.display = "block";
}



function addEventReg() {
  // console.log ('erid is' + erId );
  console.log('data saved in EventRegistration collection 55555555555555555555555');
  const erId = docID + auth.currentUser.uid;
  const secpfullname = document.getElementById('secpfullname').value;

  var newParticipant = {
    FullName: secpfullname,
    DOB: '01/01/2020'
  };

  var docRef1 = db.collection('EventRegistration').doc(erId);
  // docRef.child('Participants').push(newParticipant);
  // Atomically add a new region to the "regions" array field.
  docRef1.update({
    Participants: firebase.firestore.FieldValue.arrayUnion(newParticipant)
  });

  // getEventRegistration();
  firstExtra.style.display = "none";
  head.style.display = "block";
};



function deleteEventReg(ParticipantFullName) {
  // console.log ('erid is' + erId );
  console.log('deletion started');
  console.log('deletion clicked' + ParticipantFullName);
  const erId = docID + auth.currentUser.uid;
  const secpfullname = document.getElementById(ParticipantFullName).value;
  // const secpfullname = document.getElementById('fullNamelabel0').innerHTML;
  console.log('Participant Name: ' + secpfullname);

  var newParticipant = {
    FullName: secpfullname,
    DOB: "01/01/2020"
  };

  var docRef1 = db.collection('EventRegistration').doc(erId);
  // docRef.child('Participants').push(newParticipant);
  // Atomically add a new region to the "regions" array field.
  docRef1.update({
    Participants: firebase.firestore.FieldValue.arrayRemove(newParticipant)
  })
  .then(() =>{
      console.log('Deleted successfully');
      // getEventRegistration();
  });
  //

  // firstExtra.style.display = "none";
  // head.style.display = "block";
};

// ******** for populating extra box depending upon no. of participant added in EventRegistration Collection ***********

//**************************SELECT/GET DATA from EventRegistration collection*****************************//

// db.collection("EventRegistration").onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   // alert('Snapsize from Homepage: ' + snapshot.size);
//   console.log('Snapsize from Homepage: ' + snapshot.size);
//   changes.forEach(change => {
//     if (change.type == 'added') {
//       renderEventParticipation(change.doc);
//     }
//   });
// });

// db.collection("EventRegistration").doc(erId)

function getEventRegistration() {
  console.log('Inside getEventRegistration')
  const erId = docID + auth.currentUser.uid;
  console.log('Doc ID: ' + erId);
  //y136ZTein0N42r4VlINEHswtIG32siNWddYI8ihAym1yRe33
  const snapshot = db.collection('EventRegistration').doc(erId);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('Doc: ' + erId);
      renderEventParticipation(doc);
      document.getElementById("tickets").innerHTML = doc.data().Participants.length;
    }
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElementById('errorMessage').style.display = 'block';
  });
}


function renderEventParticipation(doc) {
  // console.log('Doc ID: ' + doc.id);
   console.log('Event Name: ' + doc.data().uid);
   console.log('Participant: ' + doc.data().Participants[0].FullName);
   console.log('Participant array size: ' + doc.data().Participants.length);


   for (let i = 0; i < doc.data().Participants.length; i++) {
     var fullName = "fullName" + i ;
     // console.log('the full name id are' + fullName);

  let itemCol = document.createElement("div");
  // itemCol.classList.add('col-lg-3 col-md-6 col-sm-12');
  // itemCol.classList.add("step3-checkoutbox");
  itemCol.innerHTML =
  "<div style='border: 2px solid #889;display: block; margin: 10px 0;' class='step3-checkoutbox'>" +
    "<h4 style='font-weight:1000; font-size:1.2rem;'>" + (i + 2) + " - Participant Details</h4>" +
    "<hr>" +
    "<form class='row g-3'>" +
    "<div class='col-md-6'>" +
    "<label id='fullNamelabel" + i + "' for='inputEmail4' class='form-label'>Full Name" +
    "</label>" +
    "<input id='fullName" + i + "' type='text' class='form-control' value = '" + doc.data().Participants[i].FullName + "'>"  +
    "</div>" +
    "<div class='col-md-6'>" +
      "<label for='inputPassword4' class='form-label'>Date of Birth</label>" +
      "<div class='form-group'>" +
        "<div class='input-group date datetimepicker11'>" +
          "<input type='text' class='form-control' readonly value ="+ doc.data().Participants[i].DOB +" >" +
        "<div class='input-group-addon input-group-prepend'>" +
          "<span class='input-group-text'><i class='fas fa-calendar'></i></span>" +
      "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</form>"  +
    "<button id='btnDel" + i + "' onclick='deleteEventReg(\"" + fullName + "\")' style='background-color:#fbe25f;color:#fff; float:left; display:block;' class='btn del' type='button' name='button'> Delete</button>" +
    "<br>" +
    "<br>" +
  "</div>";

  document.getElementById("bringparticipant").appendChild(itemCol);
}

}

// **************************************for populating event data************************
function populateEventData() {
  const snapshot = db.collection('Events').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('Document id:' + doc.id);
      // document.getElementById("eventid").value = doc.data().EventId;
      document.getElementById("eventName").innerHTML = doc.data().EventName;
      // document.getElementById("event-mode").innerHTML = doc.data().EventMode;
      // document.getElementById("start-time").innerHTML = doc.data().EventStartDate;
      // document.getElementById("end-time").innerHTML = doc.data().EventEndDate;
      // document.getElementById("organiser-name").innerHTML = doc.data().EventOrganisationName;
      // document.getElementById("organiser-email").innerHTML = doc.data().OrganiserEmail;
      // document.getElementById("organiser-phone").innerHTML = doc.data().EventorganiserPhone;
      document.getElementById("event-price").innerHTML = doc.data().Price;
      // document.getElementById("event-image").src = doc.data().EventImgURL;
      // document.getElementById("age").innerHTML = doc.data().Age;
      // document.getElementById("language").innerHTML = doc.data().Language;
      // document.getElementById("eventstatus").innerHTML = doc.data().Status;
      // document.getElementById("para").innerHTML = doc.data().Para;

    }
  });
}

function calculatePrice(){
  console.log("calucation started");
  var tickets = document.getElementById("tickets").innerHTML;
  console.log("the tickets are" + tickets );
  var eventcost = document.getElementById("event-price").innerHTML;
  var totalprice = document.getElementById("totalPrice").innerHTML;

  totalprice = tickets*eventcost;
}
