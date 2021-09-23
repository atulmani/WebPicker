
const profileLogo = document.getElementById('profileLogo');
const profileLogoDropdown = document.getElementById('profileLogoDropdown');
const profileLogoTriangle = document.getElementById('profileLogoTriangle');
const fullContent = document.getElementById('fullContent');
// const navbar = document.getElementById('navbar');


profileLogo.addEventListener('click', profileDropdownShow, false);

function profileDropdownShow()
{
  profileLogoDropdown.style.visibility = "visible";
  profileLogoTriangle.style.visibility = "visible";
}

fullContent.addEventListener('click', profileDropdownHide, false);
// navbar.addEventListener('click', profileDropdownHide, false);

function profileDropdownHide()
{
  profileLogoDropdown.style.visibility = "hidden";
  profileLogoTriangle.style.visibility = "hidden";
}



// **** Firebase Services - Starts ****
//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('profile-name').value = firebaseUser.displayName;
      // document.getElementById('profile-number').value = firebaseUser.Phone;
      // document.getElementById('profileEmail').value = firebaseUser.email;

      GetProfileData(firebaseUser);

    } else {
      // console.log('User has been logged out');
       window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "index.html";
  }
});


//************* Update Event - Starts ******************

// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var docID = searchParams.get('id');
var eventid = searchParams.get('eventid');
console.log('Document ID: ' + docID);
console.log('Event ID: ' + eventid);

const snapshot = db.collection('Events').doc(docID);
snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      document.getElementById("eventname").value = doc.data().EventName;
      document.getElementById("eventmode").value = doc.data().EventMode;
      document.getElementById("eventstartdate").value = doc.data().EventStartDate;
      document.getElementById("eventenddate").value = doc.data().EventEndDate;
      document.getElementById("eventOrganisationName").value = doc.data().EventOrganisationName;
      document.getElementById("organisationEmail").value = doc.data().OrganiserEmail;
      document.getElementById("eventorganisationPhone").value = doc.data().EventorganiserPhone;
      document.getElementById("eventprice").value = doc.data().Price;
    }
  });



// if(docID != null || docID === "")
// {
//   console.log('Update Customer');
// }
// else
// {
//   console.log('Create New Customer');
// }

//************* Update Event - Ends ******************

var docCount;
db.collection('Events').get().then((snapshot) => {
  docCount = snapshot.size;

  console.log('Snapshot Size: ' + docCount);

  });

  const eventForm = document.getElementById('eventForm');
  const createEventConformation = document.getElementById('createEventConformation');


  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createEvent();
    createEventConformation.style.display = 'block';
  });

  function createEvent() {
    console.log("data sending to db-started");

    var eventname = document.getElementById("eventname").value;
    var eventmode = document.getElementById("eventmode").value;
    // alert('Event Start Date: ' + Date.parse(document.getElementById("eventstart").value));
    // var eventdate = document.getElementById("eventdate").value;
    var eventstartdate = document.getElementById("eventstartdate").value;
    var eventenddate = document.getElementById("eventenddate").value;
    var organisation = document.getElementById("eventOrganisationName").value;
    var organisationEmail= document.getElementById("organisationEmail").value;
    var organisationPhone = document.getElementById("eventorganisationPhone").value;
    var price = document.getElementById("eventprice").value;

    // alert('Image URL: ' + document.getElementById('namebox').value);
    console.log('read html data complete')



      console.log('Document Count: ' + docCount);

      let newEventID = docCount + 1;

      newEventID = newEventID.toString();

      console.log('new Event ID : ' + newEventID);

      db.collection("Events").add({
        // console.log('inside db collection: ' + newEventID);
          EventId: newEventID,
          EventName: eventname,
          EventMode: eventmode,
          EventStartDate: eventstartdate,
          EventEndDate: eventenddate,
          EventOrganisationName: organisation ,
          OrganiserEmail: organisationEmail,
          EventorganiserPhone: organisationPhone,
          Price: price,
          EventImgURL: '',
          EventImgURL1: '',
          EventImgURL2: '',
          EventImgURL3: '',
          EventImgURL4: '',
          EventImgURL5: '',
          Status: 'UPCOMING',
          Timestamp: (new Date()).toString()

        })
        .then((docRef) => {
          console.log("Data added sucessfully in the document: " + docRef.toString());
          console.log("eventstart")
          // console.log(Date.parse(eventstart))
        })
        .catch((error) => {
          console.error("error adding document:", error);
        });

      console.log("data sending to db-completed");

  }



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
        // console.log('Address: '+ doc.data().Address);

        // document.getElementById('status').innerHTML = doc.data().Status;
        // document.getElementById('myimg').src = doc.data().ImageURL;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        // document.getElementById('profile-name').value = doc.data().displayName;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
        // document.getElementById('profile-number').value = doc.data().Phone;
        // document.getElementById('profile-dob').value = doc.data().DateOfBirth;
        // document.getElementById('profile-adress').value = doc.data().Address;
        // document.getElementById('profileEmail').value = doc.data().EmailId;



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
//**************************INSERT Image into Storage & get image url on ui *****************************//


var ImgName, ImgURL;
var files = [];
var reader;

//************ Select File ****************
document.getElementById("select").onclick = function(e) {
  // alert('camera button click');
  // document.getElementById("uploadImg").style.display = 'block';
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      document.getElementById("myimg").src = reader.result;
    }
    reader.readAsDataURL(files[0]);

  }
  input.click();
}

//************ File Upload to Cloud Storage  ****************
document.getElementById('upload').onclick = function() {
  // ImgName = document.getElementById('namebox').value;
  ImgName = '2' + '.png';
  console.log('Image Name: ' + ImgName);
  var uploadTask = firebase.storage().ref('EventImages/' + ImgName).put(files[0]);

  //Progress of the image upload into storageBucket
  uploadTask.on('state_changed', function(snapshot) {
      // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
      // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
    },

    function(error) {
      alert('error in saving the image');
    },

    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
        ImgUrl = url;
        alert('ImgUrl: ' + ImgUrl);
        // document.getElementById('namebox').value = ImgUrl;

        // firebase.firestore().collection("UserProfilePhotoURLs").add({
        //     UserEmail: auth.currentUser.email,
        //     ImageName: ImgName,
        //     ImageURL: ImgUrl,
        //     Timestamp: (new Date()).toString()
        //   })
        //   .then((docRef) => {
        //     console.log("Image added successful");
        //   })
        //   .catch((error) => {
        //     console.error("Error adding image: ", error);
        //   });

        // firebase.firestore().collection("Events").doc(auth.currentUser.uid).update({
        //     // UserEmail: auth.currentUser.email,
        //     ImageName: ImgName,
        //     ImageURL: ImgUrl
        //     // Timestamp: (new Date()).toString()
        //   })
        //   .then((docRef) => {
        //     console.log("Image added successful");
        //   })
        //   .catch((error) => {
        //     console.error("Error adding image: ", error);
        //   });

      });
    });
}
