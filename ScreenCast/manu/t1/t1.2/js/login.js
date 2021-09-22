const sign_in_btn = document.querySelector("#signin_btn");
const sign_up_btn = document.querySelector("#signup_btn");
const container1 = document.querySelector(".full-content");

sign_up_btn.addEventListener('click', () => {
  container1.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
  container1.classList.remove("sign-up-mode");
});


// const toggleLoginEye = document.querySelector('#toggleLoginEye');
// const passwordSignin = document.querySelector('#txtPass_Signin');
//
// toggleLoginEye.addEventListener('click', function (e) {
//     // toggle the type attribute
//     const type = passwordSignin.getAttribute('type') === 'password' ? 'text' : 'password';
//     passwordSignin.setAttribute('type', type);
//     // toggle the eye / eye slash icon
//     // this.classList.toggle('fa-eye');
//     toggleLoginEye.classList.toggle('fa-eye');
// });
//
// const toggleSignupEye = document.querySelector('#toggleSignupEye');
// const passwordSignup = document.querySelector('#txtPass_Signup');
//
// toggleSignupEye.addEventListener('click', function (e) {
//     // toggle the type attribute
//     const type = passwordSignup.getAttribute('type') === 'password' ? 'text' : 'password';
//     passwordSignup.setAttribute('type', type);
//     // toggle the eye / eye slash icon
//     // this.classList.toggle('fa-eye');
//     toggleSignupEye.classList.toggle('fa-eye');
// });
