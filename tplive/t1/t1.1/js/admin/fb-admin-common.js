

// **** Firebase Services - Starts ****


// const btnLogout = document.getElementsByClassName('btnLogout');
const btnLogout1 = document.getElementById('btnLogout1');
const btnLogout2 = document.getElementById('btnLogout2');

btnLogout1.addEventListener('click', Logout , false);
btnLogout2.addEventListener('click', Logout , false);

function Logout() {
  auth.signOut().then(() => {
    // Sign-out successful.
    // window.location.href = "index.html";
    console.log('Successfully Logged Out');
  }).catch((error) => {
    // An error happened.
    console.log('Error: ' + error.message);
    window.location.href = "index.html";
  });
}

// btnLogout.addEventListener('click', e => {
//   auth.signOut().then(() => {
//     // Sign-out successful.
//     // window.location.href = "index.html";
//     console.log('Successfully Logged Out');
//   }).catch((error) => {
//     // An error happened.
//     console.log('Error: ' + error.message);
//     window.location.href = "index.html";
//   });
// });

// **** Firebase Services - Ends ****
