auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      console.log('Logged-in user email id: ' + firebaseUser.email);
      // userID = firebaseUser.uid;
      // GetUserRole(firebaseUser);
      window.location.href = "../admin/dashboard.html";
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

window.onload = function() {
  render();
}

function render() {
  console.log('Captcha rendered starts taking place');
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  recaptchaVerifier.render();
  console.log('Captcha rendered');
}

var btnSendOTP = document.getElementById('btnSendOTP');

btnSendOTP.addEventListener('click', e => {
  e.preventDefault();
  // function phoneAuth() {
  var number = document.getElementById('userPhoneNo').value;
  var number = "+91" + number;
  console.log('Phone No: ' + number);

  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {

      auth.signInWithPhoneNumber(number, window.recaptchaVerifier)
        .then(function(confirmationResult) {
          window.confirmationResult = confirmationResult;
          coderesult = confirmationResult;
          console.log('coderesult: ' + coderesult);
          console.log('confirmationResult.verificationId ' + confirmationResult.verificationId);
          console.log('Message sent');
          document.getElementById('firstslide').style.transform = 'translateX(-100%)';
          document.getElementById('secondslide').style.transform = 'translateX(-100%)';

        })
        .catch(function(error) {
          console.log('Error Sending OTP: ' + error.message);
          document.getElementById('altspan').innerHTML = error.message;
          document.getElementById('altspan').style.display = 'block';

        })
    });
});

var btnSigninUsingOTP = document.getElementById('btnSigninUsingOTP');

btnSigninUsingOTP.addEventListener('click', e => {
  e.preventDefault();
  var code = document.getElementById('txtVerificationCode').value;
  console.log('Code: ' + code);
  coderesult.confirm(code).then(function(result) {
      console.log('Navigate to the dashboard/profile page');
      window.location.assign('../admin/dashboard.html');
      var user = result.user;
      console.log(user);
    })
    .catch(function(error) {
      // alert(error.message);
      console.error(error);
    });
});
