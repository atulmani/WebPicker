
//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      document.getElementById('displayName').innerHTML = firebaseUser.displayName;
    } else {
      // console.log('User has been logged out');
      // window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login";
  }
});

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
