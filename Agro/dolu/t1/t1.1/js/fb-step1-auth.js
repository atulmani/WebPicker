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

if (docID != null) {
  // document.getElementById('optionalFields').style.display = 'block';
  // document.getElementById('imageDiv').style.display = 'block';
  // console.log('Event ID: ' + eventid);

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


//************* User Registration - Starts ******************

const signin = document.getElementById("signin");
//
signin.addEventListener('click', myfnc, false);
// console.log('myfncworks');
function myfnc() {
  console.log('myfncworks');
  // window.location.href = "../checkout/step2-auth.html?id=" + docID + "&eventid=" + eventid ;

  const email = document.getElementById('txtEmail_Signin');
  const pass = document.getElementById('txtPass_Signin');

  console.log('btnSignin Clicked');


  // Sign in with user registered email id & pass with session based in single browser
  // User will sign-out as soon as user will close to browser window or move to new browser table2
  // anyway User will signout as soon as User will press signout / logout button anywhere in the application
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // *********************for user creation*********************
      const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
      promise.then(function(firebaseUser) {
          // Success
          console.log("user created");
          // window.location.href = "profile.html";
          //Save users data into Users DB Collection
          // UserEvent();
          window.location.href = "../checkout/step2-auth.html?id=" + docID + "&eventid=" + eventid ;
            // CreateUserData();

        });

         // *********************for user creation*********************
        const lpromise = auth.signInWithEmailAndPassword(email.value, pass.value);
        lpromise.then(function(firebaseUser) {
            // Success
            console.log("Logged in User");
            // alert('test');
            // UserEvent();
            window.location.href = "../checkout/step2-auth.html?id=" + docID + "&eventid=" + eventid ;
            // window.location.href = "profile.html";
          })

    });

};


//************* User Registration - Ends ******************





//**************************Set users data into Users DB Collection starts**********************************
function UserEvent(){
  alert(' userEvent set started');

  // var select = document.getElementById('idtype');
  // var idtype = select.options[select.selectedIndex].value;

  db.collection('userEvent')
  .doc(auth.currentUser.uid)
  .set({
      uid: auth.currentUser.uid,
      EventId: '',

  })
  .then(() => {
        // updated
        console.log ('Users data saved successfully');
        //
        // // Show alert
        // document.querySelector('.alert').style.display = 'block';
        //
        // // Hide alert after 3 seconds
        // setTimeout(function() {
        //   document.querySelector('.alert').style.display = 'none';
        // }, 3000);


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
