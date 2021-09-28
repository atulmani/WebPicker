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
      const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
      promise.then(function(firebaseUser) {
          // Success
          console.log("Logged in User");
          // window.location.href = "profile.html";
          //Save users data into Users DB Collection
            CreateUserData();
        });
        // alert("test");
        // window.location.href = "../checkout/step2-auth.html?id=" + docID + "&eventid=" + eventid ;
    });

};


function CreateUserData() {
  console.log('CreateUserData');

    var txtEmail_Signin = document.getElementById("txtEmail_Signin").value;

    console.log('email id:' + txtEmail_Signin);

    console.log('Current user id: ' + auth.currentUser.uid);
    //
    // db.collection("Users").doc(auth.currentUser.uid).add({
    db.collection("Users").doc(auth.currentUser.uid).set({
        // console.log('inside db collection: ' + newEventID);
        // UserId: docCount + 1,
        // .doc(user.uid).set({uid: user.uid,},
        UserEmail: txtEmail_Signin,
        CreatedTimestamp: (new Date()).toString(),
        UpdatedBy: '',
        UpdatedTimestamp: '',
        // Age: age,
        // Language: language,
        // Para: para
      })
      .then((docRef) => {
        console.log("Data added sucessfully in the document: " + docRef.toString());
        console.log("eventstart")
        // console.log(Date.parse(eventstart))
      })
      .catch((error) => {
        console.error("error adding document:", error);
      });
};

//************* User Registration - Ends ******************








//************* for checkout to nex page from step1-auth to next one ******************










//************* for checkout to nex page from step1-auth to next one - Ends ******************
