//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;

      GetProfileData(firebaseUser);

    } else {
      // console.log('User has been logged out');
       window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login";
  }
});


function GetProfileData (user)
{
  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then( async ( doc ) => {
    if ( doc.exists ) {        
        document.getElementById('custDisplayName').value = doc.data().displayName;
        document.getElementById('profilePic').src = doc.data().profilePicURL;
        document.getElementById('status').innerHTML = doc.data().Status;
        document.getElementById('profileEmail').value = doc.data().EmailID;
        document.getElementById('name').value = doc.data().userName;
        document.getElementById('mobile').value = doc.data().Phone;

        for (var option of document.getElementById("idtype").options)
        {
          if (option.value === doc.data().IDType)
          {
              option.selected = true;
          }
        }

        document.getElementById('idno').value = doc.data().IDNo;
        document.getElementById('address').value = doc.data().Address;

    }
    // document.getElementById('loading').style.display = 'none';
  })
  .catch((error) => {
    // An error occurred
    console.log(error.message);
    // document.getElementById('errorMessage').innerHTML = error.message;
    // document.getElementById('errorMessage').style.display = 'block';
  });
}

//Save users data into Users DB Collection
function setUsersProfileData(user){

  var select = document.getElementById('idtype');
  var idtype = select.options[select.selectedIndex].value;

  db.collection('UserList')
  .doc(user.uid)
  .update({
      // uid: user.uid,
      displayName: document.getElementById('custDisplayName').value.trim(),
      userName: document.getElementById('name').value.trim(),
      Phone: document.getElementById('mobile').value.trim(),
      DateOfBirth: '',
      Address: document.getElementById('address').value.trim(),
      IDType: idtype,
      IDNo: document.getElementById('idno').value.trim(),
       // Status: 'ACTIVE',
       // CreatedTimestamp: (new Date()).toString(),
      UpdatedTimestamp: (new Date()).toString()
  })
  .then(() => {
        // updated
        console.log ('Users data saved successfully');

        // Show alert
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function() {
          document.querySelector('.alert').style.display = 'none';
        }, 3000);


        // window.location.href = "../admin/dashboard.html";
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        document.getElementById('errorMessage').innerHTML = error.message;
        document.getElementById('errorMessage').style.display = 'block';
      });
};

const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  console.log ('btnSave clicked');

  //Update Display name for User Profile in firebase system
  auth.currentUser.updateProfile({
    displayName: document.getElementById('custDisplayName').value,
    // phoneNumber: txtPhoneNo.value,
    photoURL: ""
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    // Update successful
    //Save the Users registration data in Users db Collection
    setUsersProfileData (auth.currentUser);
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElementById('errorMessage').style.display = 'block';
  });

});


//**************************INSERT Image into Storage & get image url on ui *****************************//

var ImgName, ImgURL;
var files = [];
var reader;

//************ Select File ****************
document.getElementById("cameraIcon").onclick = function(e) {
  // alert('camera button click');
  // document.getElementById("uploadImg").style.display = 'block';
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      document.getElementById("profilePic").src = reader.result;
    }
    reader.readAsDataURL(files[0]);

  }
  input.click();
}

//************ File Upload to Cloud Storage  ****************
document.getElementById('uploadIcon').onclick = function() {
  // ImgName = document.getElementById('namebox').value;
  ImgName = auth.currentUser.email + '.png';
  console.log('Image Name: ' + ImgName);
  var uploadTask = firebase.storage().ref('UserProfilePhotos/' + ImgName).put(files[0]);

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

        auth.currentUser.updateProfile({
          displayName: document.getElementById('custDisplayName').value,
          photoURL: ImgUrl
        })

        firebase.firestore().collection("UserList").doc(auth.currentUser.uid).update({
            // UserEmail: auth.currentUser.email,
            profilePicName: ImgName,
            profilePicURL: ImgUrl
            // Timestamp: (new Date()).toString()
          })
          .then((docRef) => {
            console.log("Image added successful");
          })
          .catch((error) => {
            console.error("Error adding image: ", error);
          });

      });
    });
}
