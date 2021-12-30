
var userRole = [];

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      // userID = firebaseUser.uid;
      GetUserRole(firebaseUser);


    } else {
      console.log('User has been logged out');
      document.getElementById('btnContinue').style.opacity = '1';
      document.getElementById('btnContinue').style.pointerEvents = 'all';
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});



const btnSignin = document.getElementById('btnSignin');
const btnSignup = document.getElementById('btnSignUp');

var btnTextWithLoader = document.getElementsByClassName('btnTextWithLoader');
var btnLoader = document.getElementsByClassName('btnLoader');

//Add Sign-in / Login addEventListener
btnSignin.addEventListener('click', e => {

  console.log(btnTextWithLoader);

  btnTextWithLoader[0].style.display = 'none';
  btnLoader[0].style.display = 'block';

  //Get email & pass
  console.log("in click");
  const email = document.getElementById('txtEmail_Signin');
  const pass = document.getElementById('txtPass_Signin');
  console.log('btnSignin Clicked');


  //Sign in with user registered email id & pass with session based in single browser
  //User will sign-out as soon as user will close to browser window or move to new browser table2
  //anyway User will signout as soon as User will press signout / logout button anywhere in the application
//  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //  .then(() => {
      const promise = auth.signInWithEmailAndPassword(email.value, pass.value);
      promise.then(function(firebaseUser) {
          // Success
          console.log("Logged in User: ", auth.currentUser.uid);
          GetUserRole(auth.currentUser);

          // btnTextWithLoader[0].style.display = 'block';
          // btnLoader[0].style.display = 'none';
          //checkUserRole();
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            console.log('Wrong password.');
            document.getElementById('errorMessage_Login').innerHTML = errorMessage;
            document.getElementById('errorMessage_Login').style.display = 'block';
          } else {
            console.log(errorMessage);
            document.getElementById('errorMessage_Login').innerHTML = 'The email id is not registered.';
            document.getElementById('errorMessage_Login').style.display = 'block';
          }
          btnTextWithLoader[0].style.display = 'block';
          btnLoader[0].style.display = 'none';
          console.log(error);
        });

  //  });


});


//Add Sign-in / Login addEventListener
btnSignup.addEventListener('click', e => {
  //Get email & pass
  e.preventDefault();
  console.log("in click");
  const email = document.getElementById('txtEmailReg');
  const pass = document.getElementById('txtPasswordReg');
  const name = document.getElementById('txtNameReg');
  const phone = document.getElementById('txtPhoneReg');

  console.log('btnSignUp Clicked');

  //Sign in with user registered email id & pass with session based in single browser
  //User will sign-out as soon as user will close to browser window or move to new browser table2
  //anyway User will signout as soon as User will press signout / logout button anywhere in the application
  //auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //  .then(() => {
  const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
  promise.then(function(firebaseUser) {
      // Success
      console.log("Logged in User");
      auth.currentUser.updateProfile({
        displayName: name.value,
        // phoneNumber: txtPhoneNo.value,
        photoURL: ""
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Update successful
        //Save the Users registration data in Users db Collection
        setUsersProfileData(auth.currentUser);
      }).catch((error) => {
        // An error occurred
        document.getElementById('errorMessage_Registration').innerHTML = error.message;
        document.getElementById('errorMessage_Registration').style.display = 'block';
      });
      //window.location.href = "dashboard.html";
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        console.log('Wrong password.');
        document.getElementById('errorMessage_Registration').innerHTML = errorMessage + ' Please use password eye to cross check the password you enter.';
        document.getElementById('errorMessage_Registration').style.display = 'block';
      } else {
        console.log(errorMessage);
        document.getElementById('errorMessage_Registration').innerHTML = 'The email id is not registered.';
        document.getElementById('errorMessage_Registration').style.display = 'block';
      }
      console.log(error);
    });


});


//Save users data into Users DB Collection
function setUsersProfileData(user) {
  console.log("in function 1");
  db.collection('UserRequest')
    .doc(user.uid)
    .set({
      uid: user.uid,
      displayName: user.displayName,
      EmailID: user.email,
      Phone: document.getElementById('txtPhoneReg').value,
      DateOfBirth: '',
      Address: '',
      IDType: '',
      IDNo: '',
      UserRole: [],
      CustomerType: '',
      Status: 'Pending',
      CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      UpdatedTimestamp: ''
    })
    .then(() => {
      // updated
      console.log('Data saved successfully');
      window.location.href = "Registration.html";
    })
    .catch((error) => {
      // An error occurred
      // console.log(error.message);
      document.getElementById('errorMessage_Registration').innerHTML = error.message;
      document.getElementById('errorMessage_Registration').style.display = 'block';
    });
};


function GetUserRole(user) {
  // const ref = db.collection("Users").doc(user.uid);
  // console.log(user.uid);
  console.log('in doc');
  try
  {

  const snapshot = db.collection('UserList').doc(user.uid);
  //const snapshot = db.collection('UserList').doc('M71Jn4QTuAg7pd2fWsVhQAHPJym2');
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        userID = doc.uid;
        userRole = doc.data().UserRole;
      }
      console.log('in doc');
      checkUserRole();
      document.getElementById('btnContinue').style.opacity = '1';
      document.getElementById('btnContinue').style.pointerEvents = 'all';
    })
    .catch(function(error) {
      btnTextWithLoader[0].style.display = 'block';
      btnLoader[0].style.display = 'none';
      // console.log('in catch');
      console.log(error.message);
    });
  }
  catch(err) {
    btnTextWithLoader[0].style.display = 'block';
    btnLoader[0].style.display = 'none';
    // console.log('in catch');
    // console.log(error.message);
  };
};


var btnContinue = document.getElementById('btnContinue');

function checkUserRole() {
  console.log(userRole.findIndex(e => e.value === 'Admin'));

  if (userRole === undefined || userRole.length === 0) {
    // window.location.href = "../login/Registration.html";
    //document.getElementById('errorMessage_Login').innerHTML = 'You do not have access to Application. <a href=Registration.html>Please register</a> or reach out to Agrikaash Team for Access';
    document.getElementById('errorMessage_Login').style.display = 'block';
    // document.getElementById('errorMessage_Login').innerHTML = 'User does not exists, Please register.';
    document.getElementById('login').style.display = 'block';
    document.getElementById('beforeLogin').style.display = 'none';
    // document.getElementById('register').style.display = 'block';
  } else if (userRole.findIndex(e => e.value === 'Admin') >= 0) {
    // console.log('is admin');
    window.location.href = "../admin/dashboard.html";
  } else {
    // console.log('is partner');
    window.location.href = "../partner/dashboard.html";
  }
}

btnContinue.addEventListener('click', e => {
  e.preventDefault();
  checkUserRole();
});



//Reset / Change password
// const btnResetPassword = document.getElementById('btnResetPassword');
// const btnResetPasswordMessage = document.getElementById('btnResetPasswordMessage');
//
// btnResetPassword.addEventListener('click', resetPassword, false);
//
// function resetPassword() {
//   const emailId = auth.currentUser.email;
//   btnResetPasswordMessage.style.display = 'block';
//   auth.sendPasswordResetEmail(emailId).then(function() {
//     console.log('email has been sent');
//   }).catch(function(error) {
//     console.log('error occurred while sending email: ' + error);
//   });
// }
