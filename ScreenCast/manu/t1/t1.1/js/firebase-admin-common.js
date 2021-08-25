// ********** Firebase Services - Starts ************
//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    console.log("User has been logged in with UID: " + firebaseUser.uid);
    console.log("User Display Name: " + firebaseUser.displayName);
  }else {
    console.log('User has been logged out');
    window.location.href = "../login";
  }
});

const btnLogout = document.getElementById ('btnLogout');

btnLogout.addEventListener('click', e => {
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

// ********** Firebase Services - Ends ************
