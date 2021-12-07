const btnSignin = document.getElementById('btnSignin');
const btnSignup = document.getElementById('btnSignUp');

//Add Sign-in / Login addEventListener
btnSignin.addEventListener('click', e => {
  //Get email & pass
  console.log("in click");
  const email = document.getElementById('txtEmail_Signin');
  const pass = document.getElementById('txtPass_Signin');
  console.log('btnSignin Clicked');


  //Sign in with user registered email id & pass with session based in single browser
  //User will sign-out as soon as user will close to browser window or move to new browser table2
  //anyway User will signout as soon as User will press signout / logout button anywhere in the application
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      const promise = auth.signInWithEmailAndPassword(email.value, pass.value);
      promise.then(function(firebaseUser) {
          // Success
          console.log("Logged in User");
          window.location.href = "dashboard.html";
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            console.log('Wrong password.');
            document.getElementById('errorMessage_Login').innerHTML = errorMessage + ' Please use password eye to cross check the password you enter.';
            document.getElementById('errorMessage_Login').style.display = 'block';
          } else {
            console.log(errorMessage);
            document.getElementById('errorMessage_Login').innerHTML = 'The email id is not registered.';
            document.getElementById('errorMessage_Login').style.display = 'block';
          }
          console.log(error);
        });

    });

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
            setUsersProfileData (auth.currentUser);
          }).catch((error) => {
            // An error occurred
            document.getElementById('errorMessage_Signup').innerHTML = error.message;
            document.getElementById('errorMessage_Signup').style.display = 'block';
          });
          //window.location.href = "dashboard.html";
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            console.log('Wrong password.');
            document.getElementById('errorMessage_Login').innerHTML = errorMessage + ' Please use password eye to cross check the password you enter.';
            document.getElementById('errorMessage_Login').style.display = 'block';
          } else {
            console.log(errorMessage);
            document.getElementById('errorMessage_Login').innerHTML = 'The email id is not registered.';
            document.getElementById('errorMessage_Login').style.display = 'block';
          }
          console.log(error);
        });

  //  });

});


//Save users data into Users DB Collection
function setUsersProfileData(user){
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
      UserRole:[],
      CustomerType:'',
      Status: 'Pending',
      CreatedTimestamp: (new Date()).toString(),
      UpdatedTimestamp: ''
  })
  .then(() => {
        // updated
        console.log ('Data saved successfully');
        window.location.href = "Registration.html";
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        document.getElementById('errorMessage_Signup').innerHTML = error.message;
        document.getElementById('errorMessage_Signup').style.display = 'block';
      });
};
