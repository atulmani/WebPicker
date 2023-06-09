// import { auth } from "firebase.js"
// var loggedinUser = "";
// var userLocation = "";
// auth.onAuthStateChanged(firebaseUser => {
//     try {
//         //    var str = "Java-Script-Object-Notation";

//         //    getInstallationPrompt();
//         userLocation = localStorage['userLocation'];
//         if (firebaseUser) {
//             loggedinUser = firebaseUser;
//             // console.log('Logged-in user email id: ' + firebaseUser.email);
//             // userID = firebaseUser.uid;
//             // GetUserRole(firebaseUser);
//             GetProfileData()
//                 .then(function (rec) {
//                     getTournamentSummary();
//                 });


//             //document.getElementById('ifSignedIn').innerHTML = 'Hi Sanidhya';
//         } else {
//             loggedinUser = null;
//             // console.log('User has been logged out');
//             getTournamentSummary();
//         }


//     } catch (error) {
//         console.log(error.message);
//         //window.location.href = "../index.html";
//     }
// });
