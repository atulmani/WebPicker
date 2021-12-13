
//*********** Sign in - Email & Password - Starts ************

const btnSignin = document.getElementById('btnSignin');
const btnSignup = document.getElementById('btnSignup');

//Save users data into Users DB Collection
function setUsersProfileData(user){
  db.collection('UserList')
  .doc(user.uid)
  .set({
      uid: user.uid,
      displayName: user.displayName,
      EmailID: user.email,
      Phone: document.getElementById('txtPhone_Signup').value,
      DateOfBirth: '',
      Address: '',
      IDType: '',
      IDNo: '',
      Status: 'ACTIVE',
      CreatedTimestamp: (new Date()).toString(),
      UpdatedTimestamp: ''
  })
  .then(() => {
        // updated
        console.log ('Data saved successfully');
        window.location.href = "../sa/payments.html";
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        document.getElementById('errorMessage_Signup').innerHTML = error.message;
        document.getElementById('errorMessage_Signup').style.display = 'block';
      });
};


//Add Sign-up addEventListener
btnSignup.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  const txtFullName = document.getElementById('txtFullname_Signup');
  const txtPhoneNo = document.getElementById('txtPhone_Signup');
  const email = document.getElementById('txtEmail_Signup');
  const pass = document.getElementById('txtPass_Signup');

  //All fields are mandatory while registration
  if (txtPhoneNo.value == '' || txtFullName.value == '' || email.value === '' || pass.value == '') {
    document.getElementById('errorMessage_Signup').innerHTML = 'All fields are mandatory for registration';
    document.getElementById('errorMessage_Signup').style.display = 'block';
  } else {
    // console.log('Signup starts');
    //Sig]n in with email id & pass
    const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
    promise.then(function(firebaseUser) {
        // Success
        console.log("Logged in User");

          //Update Display name for User Profile in firebase system
          auth.currentUser.updateProfile({
            displayName: txtFullName.value,
            // phoneNumber: txtPhoneNo.value,
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
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorMessage);
        document.getElementById('errorMessage_Signup').innerHTML = errorMessage + ' Please use anyother email address to Register';
        document.getElementById('errorMessage_Signup').style.display = 'block';

      });
    // console.log('Signup ends');
  }
});

//Add a realtime Listerner
// auth.onAuthStateChanged(firebaseUser => {
//   if(firebaseUser) {
//     console.log(firebaseUser);
//     console.log("User has been logged in");
//   }else {
//     console.log('not logged in');
//   }
// });

//Add Sign-in / Login addEventListener
btnSignin.addEventListener('click', e => {
  //Get email & pass
  const email = document.getElementById('txtEmail_Signin');
  const pass = document.getElementById('txtPass_Signin');

  //Sign in with user registered email id & pass with session based in single browser
  //User will sign-out as soon as user will close to browser window or move to new browser table2
  //anyway User will signout as soon as User will press signout / logout button anywhere in the application
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      const promise = auth.signInWithEmailAndPassword(email.value, pass.value);
      promise.then(function(firebaseUser) {
          // Success
          console.log("Logged in User");

          redirectToDashboard();

        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            console.log('Wrong password.');
            document.getElementById('errorMessage_Login').innerHTML = errorMessage + ' Please use password eye to cross check the password you enter.';
            document.getElementById('errorMessage_Login').style.display = 'block';
          } else if (errorCode === 'auth/ERROR_EMAIL_ALREADY_IN_USE') {
            document.getElementById('errorMessage_Login').innerHTML = errorMessage + 'Please use differnt email id for your registration.' ;
            document.getElementById('errorMessage_Login').style.display = 'block';
          } else {
            console.log(errorMessage);
            document.getElementById('errorMessage_Login').innerHTML = errorMessage;
            document.getElementById('errorMessage_Login').style.display = 'block';
          }
          console.log(error);
        });
      // .catch(e => console.log(e.message)

      // );
    });

});

function redirectToDashboard()
{

  window.location.href = "../sa/payments.html";

}


//
// btnLogout.addEventListener('click', e => {
//   auth.signOut();
// });



//*********** Sign in - Email & Password - Ends ************

// Google authentication
function googleProvider() {
  // [START auth_google_provider_create]
  var provider = new firebase.auth.GoogleAuthProvider();
  // [END auth_google_provider_create]

  // [START auth_google_provider_scopes]
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // [END auth_google_provider_scopes]

  // [START auth_google_provider_params]
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  // [END auth_google_provider_params]
}

function googleSignInPopup(provider) {
  // [START auth_google_signin_popup]
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  // [END auth_google_signin_popup]
}

function googleSignInRedirectResult() {
  // [START auth_google_signin_redirect_result]
  firebase.auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  // [END auth_google_signin_redirect_result]
}

function googleBuildAndSignIn(id_token) {
  // [START auth_google_build_signin]
  // Build Firebase credential with the Google ID token.
  var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

  // Sign in with credential from the Google user.
  firebase.auth().signInWithCredential(credential).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  // [END auth_google_build_signin]
}

// [START auth_google_callback]
function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.getAuthResponse().id_token);

      // Sign in with credential from the Google user.
      // [START auth_google_signin_credential]
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      // [END auth_google_signin_credential]
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}
// [END auth_google_callback]

// [START auth_google_checksameuser]
function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}
// [END auth_google_checksameuser]


function makeGoogleCredential(googleUser) {
  // [START auth_make_google_credential]
  var credential = firebase.auth.GoogleAuthProvider.credential(
    googleUser.getAuthResponse().id_token);
  // [END auth_make_google_credential]
}

function makeFacebookCredential(response) {
  // [START auth_make_facebook_credential]
  var credential = firebase.auth.FacebookAuthProvider.credential(
    response.authResponse.accessToken);
  // [END auth_make_facebook_credential]
}

function makeEmailCredential(email, password) {
  // [START auth_make_email_credential]
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  // [END auth_make_email_credential]
}

function signOut() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  // [END auth_sign_out]
}

function authStateListener() {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // [END auth_state_listener]
}

function currentUser() {
  // [START auth_current_user]
  const user = firebase.auth().currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    // No user is signed in.
  }
  // [END auth_current_user]
}

function setLanguageCode() {
  // [START auth_set_language_code]
  firebase.auth().languageCode = 'it';
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();
  // [END auth_set_language_code]
}

function authWithCredential(credential) {
  // [START auth_signin_credential]
  // Sign in with the credential from the user.
  firebase.auth()
    .signInWithCredential(credential)
    .then((result) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // ...
    });
  // [END auth_signin_credential]
}

function signInRedirect(provider) {
  // [START auth_signin_redirect]
  firebase.auth().signInWithRedirect(provider);
  // [END auth_signin_redirect]
}
