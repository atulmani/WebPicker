// ********** Firebase Services - Starts ************

const btnLogout = document.getElementById ('btnLogout');

btnLogout.addEventListener('click', e => {
  auth.signOut().then(() => {
    // Sign-out successful.
    window.location.href = "../login";
    // console.log('Successfully Logged Out');
  }).catch((error) => {
    // An error happened.
    console.log('Error: ' + error.message);
    window.location.href = "../login";
  });
});

// ********** Firebase Services - Ends ************
