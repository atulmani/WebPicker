
const inputs = document.querySelectorAll('.input-field');

inputs.forEach(inp => {
  inp.addEventListener('focus', () => {
    inp.classList.add('active');
  });
  inp.addEventListener('blur', () => {
    if (inp.value != '') return;
    inp.classList.remove('active');
  })
});

const toggle_btn = document.querySelectorAll('.toggle');
const fullLoginMain = document.getElementById('fullLoginMain');

toggle_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    fullLoginMain.classList.toggle('sign-up-mode');
  })
});

const sign_in_btn = document.querySelector("#signin_btn");
const sign_up_btn = document.querySelector("#signup_btn");


//*********** Sign in - Phone - Starts ************

window.onload = function(){
  render();
}

function render()
{
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  recaptchaVerifier.render();
  console.log('Captcha rendered');
}


btnSendOTP.addEventListener('click', e => {
  // e.preventDefault();
// function phoneAuth() {
  var number = document.getElementById('userPhoneNo').value;
  var number = "+91" + number;
  console.log('Phone No: ' + number);
  auth.signInWithPhoneNumber(number, window.recaptchaVerifier)
  .then(function(confirmationResult){
    window.confirmationResult = confirmationResult;
    coderesult = confirmationResult;
    console.log('coderesult: ' + coderesult);
    console.log('confirmationResult.verificationId ' + confirmationResult.verificationId);
    console.log('Message sent');
  })
  .catch(function(error){
    console.log('Error Sending OTP: ' + error.message);
  })
});

btnSigninUsingOTP.addEventListener('click', e => {
  e.preventDefault();
  var code = document.getElementById('txtVerificationCode').value;
  console.log('Code: ' + code);
  coderesult.confirm(code).then(function (result) {
    console.log('Navigate to the dashboard/profile page');
    window.location.assign('../sa/dashboard.html');
    var  user = result.user;
    console.log(user);
  })
  .catch(function(error){
    // alert(error.message);
    console.error(error);
  });
});

// btnSigninUsingOTP.addEventListener('click', e => {
//   e.preventDefault();
//   const code = document.getElementById('txtVerificationCode').value;
//   const credential = auth.phoneAuthProvider.credential(coderesult, code);
//   auth.signInWithCredential(credential)
//   .then(() => {
//     // window.location.assign('./profile');
//     console.log('Navigate to the dashboard/profile page');
//   })
//   .catch(error => {
//     console.error(error);
//   })
//   ;
// });


//*********** Sign in - Phone - Ends ************
