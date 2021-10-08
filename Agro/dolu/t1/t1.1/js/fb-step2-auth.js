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


// const booking = document.getElementById("booking");
//
// booking.addEventListener('click', myfnc, false);
// // console.log('myfncworks');
// function myfnc() {
//   alert('hello');
//   console.log('myfncworks');
//   // window.location.href = "../checkout/step1-auth.html?id=" + docID + "&eventid=" + eventid ;
// }


if (docID != null) {
  // document.getElementById('optionalFields').style.display = 'block';
  // document.getElementById('imageDiv').style.display = 'block';

  populateEventData();
}

// ************ funtion for getting event data starts (populate event data)  **********************

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
      // document.getElementById("ticket").innerHTML = doc.data().Ticket;
    }
  });
}
//************* Populate Event Data - Ends ******************


// *********************** Firebase APIs for knowing currentUser who just logged in************************

//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // alert('i am in profile page');
      // console.log('Logged-in user email id: ' + firebaseUser.email);
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('fName').value = firebaseUser.FirstName;
      // document.getElementById('phone').value = firebaseUser.Phone;
      document.getElementById('userEmail').value = firebaseUser.email;

      GetProfileData(firebaseUser);
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

function GetProfileData (user)
{
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then( async ( doc ) => {
    if ( doc.exists ) {
      // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        // console.log ('Document ref id: ' + doc.data().uid);
        // console.log('Display Name: '+ doc.data().displayName);
        // console.log('Phone '+ doc.data().Phone);
        // console.log('Date of Birth: '+ doc.data().DateOfBirth);
        console.log('.fName: '+ doc.data().FirstName);

        // document.getElementById('status').innerHTML = doc.data().Status;
        // document.getElementById('myimg').src = doc.data().ImageURL;
        // document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('lName').value = doc.data().LastName;
        document.getElementById('fName').value = doc.data().FirstName;
        document.getElementById('phone').value = doc.data().Phone;
        document.getElementById('dob').value = doc.data().DateOfBirth;
        document.getElementById('address').value = doc.data().Address;
        document.getElementById('city').value = doc.data().City;
        document.getElementById('state').value = doc.data().State;
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


//**************************Set users data into Users DB Collection starts**********************************
function setUsersProfileData(user){
  // alert('set started');

  // var select = document.getElementById('idtype');
  // var idtype = select.options[select.selectedIndex].value;

  db.collection('Users')
  .doc(auth.currentUser.uid)
  .set({
      uid: auth.currentUser.uid,
      // // displayName: document.getElementById('profile-name').value.trim(),
      //  // EmailID: user.email,
      Phone: document.getElementById('phone').value,
      DateOfBirth: document.getElementById('dob').value,
      Address: document.getElementById('address').value,
      // ImageName : '',
      // ImageURL : '',
      EmailId : auth.currentUser.email,
      // // IDType: idtype,
      // // IDNo: document.getElementById('idno').value.trim(),
      // Status: 'ACTIVE',
      CreatedTimestamp: '',
      UpdatedTimestamp: (new Date()).toString(),
      FirstName: document.getElementById('fName').value,
      LastName: document.getElementById('lName').value,
      City: document.getElementById('city').value,
      State: document.getElementById('state').value,
      // Ticket: document.getElementId('ticket').value,
      Ticket: document.getElementById('tik').value,
  })
  .then(() => {
        // updated
        console.log ('Users data saved successfull');
        // alert('userevent set done')
        // EventRegistration();
        //
        // // Show alert
        // document.querySelector('.alert').style.display = 'block';
        //
        // // Hide alert after 3 seconds
        // setTimeout(function() {
        //   document.querySelector('.alert').style.display = 'none';
        // }, 3000);


        window.location.href = "../checkout/step3-checkout.html?id=" + docID + "&eventid=" + eventid;
      })
      .catch((error) => {
        // An error occurred
        console.log(error.message);
        // document.getElementById('errorMessage').innerHTML = error.message;
        // document.getElementById('errorMessage').style.display = 'block';
      });
};
// ******************************* set user data ends***********************************



// ******************************* Update profie starts*********************************


const btnCheckout = document.getElementById('btnCheckout');
btnCheckout.addEventListener('click', setUsersProfileData, false);

// function saveData() {
//   console.log('Save data started123 jbjhhjj ');
//   //Update Display name for User Profile in firebase system
//   console.log('currentUser : ' + auth.currentUser.email);
//   auth.currentUser.updateProfile({
//     uid: auth.currentUser.uid,
//     // displayName: document.getElementById('profile-name').value.trim(),
//      // EmailID: user.email,
//     Phone: document.getElementById('phone').value,
//     DateOfBirth: document.getElementById('dob').value,
//     Address: document.getElementById('address').value,
//     ImageName : '',
//     ImageURL : '',
//     EmailId : auth.currentUser.email,
//     // IDType: idtype,
//     // IDNo: document.getElementById('idno').value.trim(),
//     // Status: 'ACTIVE',
//     CreatedTimestamp: '',
//     UpdatedTimestamp: (new Date()).toString(),
//     FirstName: document.getElementById('fName').value,
//     LastName: document.getElementById('lName').value,
//     City: document.getElementById('city').value,
//     State: document.getElementById('state').value,
//     // Ticket: document.getElementById('ticket').value,
//     Ticket: document.getElementById('tik').value,
//
//   }).then(() => {
//     // Update successful
//     //Save the Users registration data in Users db Collection
//     setUsersProfileData (auth.currentUser);
//     window.location.href = "../checkout/step3-checkout.html";
//
//
//   }).catch((error) => {
//     console.log(error.message)
//     // An error occurred
//     // document.getElementById('errorMessage_Signup').innerHTML = error.message;
//     // document.getElementById('errorMessage_Signup').style.display = 'block';
//   });
//   console.log('Save data completed ');
// }

// ******************************* Update profie ends*********************************


//**************************Set users data into Users DB Collection starts**********************************
function EventRegistration(user){
  // alert(' userEvent set started');

  // var select = document.getElementById('idtype');
  // var idtype = select.options[select.selectedIndex].value;

  db.collection('EventRegistration')
  .doc(docID)
  .set({
      uid: auth.currentUser.uid,
      EventId: docID,
      // ParticipantCount:'',
      // SecParticipantFullname: '' ,
      // SecParticipantDob: '',
  })
  .then(() => {
        // updated
        console.log ('data saved in EventRegistration collection');
        //
        // // Show alert
        // document.querySelector('.alert').style.display = 'block';
        //
        // // Hide alert after 3 seconds
        // setTimeout(function() {
        //   document.querySelector('.alert').style.display = 'none';
        // }, 3000);


        window.location.href = "../checkout/step3-checkout.html?id=" + docID + "&eventid=" + eventid;
      })
      .catch((error) => {
        // An error occurred
        console.log(error.message);
        // document.getElementById('errorMessage').innerHTML = error.message;
        // document.getElementById('errorMessage').style.display = 'block';
      });
};
// ******************************* set user data ends***********************************
