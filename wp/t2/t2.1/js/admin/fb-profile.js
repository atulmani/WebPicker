
const cameraIcon = document.getElementById('cameraIcon');
const changeImage = document.getElementById('changeImage');
const changeImageTriangle = document.getElementById('changeImageTriangle');


cameraIcon.addEventListener('mouseover', camraIconMouseoverFunction, false);
cameraIcon.addEventListener('mouseout', camraIconMouseoutFunction, false);

function camraIconMouseoverFunction()
{
  changeImage.style.display = "block";
  changeImageTriangle.style.display = "block";
}

function camraIconMouseoutFunction()
{
  changeImage.style.display = "none";
  changeImageTriangle.style.display = "none";
}

const profileLogo = document.getElementById('profileLogo');
const profileLogoDropdown = document.getElementById('profileLogoDropdown');
const profileLogoTriangle = document.getElementById('profileLogoTriangle');
const fullContent = document.getElementById('fullContent');
const navbar = document.getElementById('navbar');


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

const btnChangePassword = document.getElementById('btnChangePassword');
const btnChangePasswordmessage = document.getElementById('btnChangePasswordmessage');


btnChangePassword.addEventListener('click', changePassword, false);

function changePassword() {
  const emailId = auth.currentUser.email;
  btnChangePasswordmessage.style.display = 'block';
  auth.sendPasswordResetEmail(emailId).then(function() {
    console.log('email has been sent');
  }).catch(function(error) {
    console.log('error occurred while sending email: ' + error);
  });
}



//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // alert('i am in profile page');
      console.log('Logged-in user email id: ' + firebaseUser.email);
      document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('profile-name').value = firebaseUser.displayName;
      // document.getElementById('profile-number').value = firebaseUser.Phone;
      document.getElementById('profileEmail').value = firebaseUser.email;


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

//********************** poppulate data - start ***************


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
        document.getElementById('myimg').src = doc.data().ImageURL;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('profile-name').value = doc.data().displayName;
        document.getElementById('profile-number').value = doc.data().Phone;
        document.getElementById('profile-dob').value = doc.data().DateOfBirth;
        document.getElementById('profile-adress').value = doc.data().Address;

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



//********************** poppulate data - end


//********************** Create data - start
//Save users data into Users DB Collection
function setUsersProfileData(user){

  // var select = document.getElementById('idtype');
  // var idtype = select.options[select.selectedIndex].value;

  db.collection('Users')
  .doc(user.uid)
  .set({
      uid: user.uid,
      displayName: document.getElementById('profile-name').value.trim(),
       // EmailID: user.email,
      Phone: document.getElementById('profile-number').value.trim(),
      DateOfBirth: document.getElementById('profile-dob').value.trim(),
      Address: document.getElementById('profile-adress').value.trim(),
      ImageName : '',
      ImageURL : '',
      // IDType: idtype,
      // IDNo: document.getElementById('idno').value.trim(),
      // Status: 'ACTIVE',
      CreatedTimestamp: '',
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


const btnSave = document.getElementById('profile-btnsave');
btnSave.addEventListener('click', saveData, false);

function saveData() {
  console.log('Save data started ');
  //Update Display name for User Profile in firebase system
  console.log('currentUser : ' + auth.currentUser.email);
  auth.currentUser.updateProfile({
    displayName: document.getElementById('profile-name').value,
    phoneNumber: document.getElementById('profile-number').value,
    photoURL: ""
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    // Update successful
    //Save the Users registration data in Users db Collection
    setUsersProfileData (auth.currentUser);
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage_Signup').innerHTML = error.message;
    document.getElementById('errorMessage_Signup').style.display = 'block';
  });
  console.log('Save data completed ');
}


//********************** Create data - end

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
      document.getElementById("myimg").src = reader.result;
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

        firebase.firestore().collection("Users").doc(auth.currentUser.uid).update({
            // UserEmail: auth.currentUser.email,
            ImageName: ImgName,
            ImageURL: ImgUrl
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
