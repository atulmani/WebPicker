// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// *********** UAT Config **********
const firebaseConfig = {
  apiKey: "AIzaSyDFKLjG9Z5ezzm08QWAzfag6j-rWZ_EQkI",
  projectId: "hyperclouduat",
  authDomain: "hyperclouduat.firebaseapp.com",
  databaseURL: "https://hyperclouduat.firebaseio.com",
  storageBucket: "hyperclouduat.appspot.com",
  messagingSenderId: "932262782431",
  appId: "1:932262782431:web:25c69612b0d3aaafaad06a"
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
