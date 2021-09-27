const btnSignin = document.getElementById('btnSignin');


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
          window.location.href = "../cart/index.html";
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
            document.getElementById('errorMessage_Login').innerHTML = errorMessage;
            document.getElementById('errorMessage_Login').style.display = 'block';
          }
          console.log(error);
        });

    });

});
