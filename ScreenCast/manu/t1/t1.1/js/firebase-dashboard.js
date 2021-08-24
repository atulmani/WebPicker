
// ********** Firebase Services - Starts ************
//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    console.log("User has been logged in");
  }else {
    console.log('not logged in');
    window.location.href = "../login/index.html";
  }
});

const btnLogout = document.getElementById ('btnLogout');

btnLogout.addEventListener('click', e => {
  auth.signOut();
  window.location.href = "../login/index.html";
  console.log('Successfully Logged Out');
});

// ********** Firebase Services - Ends ************
