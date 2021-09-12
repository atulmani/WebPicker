// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// *********** Development Config **********
var firebaseConfig = {
  apiKey: "AIzaSyB7NY05st0jH8nWmUuNmQHYJGtmp9Pe0M0",
  projectId: "hyperclouddev",
  authDomain: "hyperclouddev.firebaseapp.com",
  databaseURL: "https://hyperclouddev.firebaseio.com",
  storageBucket: "hyperclouddev.appspot.com",
  messagingSenderId: "939801651782",
  appId: "1:939801651782:web:f63ad3e0469b27838c7847",
  // measurementId: "G-GJCEDPVJQL"
};

// *********** Production Config **********
// const firebaseConfig = {
//   apiKey: "AIzaSyAbSjrm6vOca3CgLU0qAEtn9tLSwSqNdk0",
//   projectId: "hypercloudprod",
//   authDomain: "hypercloudprod.firebaseapp.com",
//   databaseURL: "https://hypercloudprod.firebaseio.com",
//   storageBucket: "hypercloudprod.appspot.com",
//   messagingSenderId: "373925918977",
//   appId: "1:373925918977:web:99a6729a8eff497faa8300",
//   measurementId: "G-RRM25JW0R6"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
