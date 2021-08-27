
lnkLogout.addEventListener('click', e => {
  auth.signOut().then(() => {
    // Sign-out successful.
    window.location.href = "../login";
    console.log('Successfully Logged Out');
  }).catch((error) => {
    // An error happened.
    console.log('Error: ' + error.message);
    window.location.href = "../login";
  });
});

//
// // ********** Firebase Services - Starts ************
// //A realtime Listerner
// auth.onAuthStateChanged(firebaseUser => {
//   if(firebaseUser) {
//     console.log(firebaseUser);
//     console.log("User has been logged in");
//   }else {
//     console.log('not logged in');
//     window.location.href = "../signup.html";
//   }
// });
//
// const btnLogout = document.getElementById ('btnLogout');
//
// btnLogout.addEventListener('click', e => {
//   auth.signOut();
//   window.location.href = "../signup.html";
//   console.log('Successfully Logged Out');
// });

// ********** Firebase Services - Ends ************
