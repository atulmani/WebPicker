//uat
// const firebaseConfig = {
//   apiKey: "AIzaSyDu3knstap4guAHD26pXrXDge7Z4nmrbHg",
//   authDomain: "agrikaash-uat.firebaseapp.com",
//   projectId: "agrikaash-uat",
// //  databaseURL: "https://agrikaash-uat.firebaseio.com",
//   storageBucket: "agrikaash-uat.appspot.com",
//   messagingSenderId: "531120657109",
//   appId: "1:531120657109:web:13d50a355ac0da2370485c"
// };

//production
const firebaseConfig = {
  apiKey: "AIzaSyCenit0gTzcMLNEZHrVdb3TrrdU1-MkJVE",
  authDomain: "agrikaashapp.firebaseapp.com",
  projectId: "agrikaashapp",
  storageBucket: "agrikaashapp.appspot.com",
  messagingSenderId: "993534029428",
  appId: "1:993534029428:web:18147f606242dca52feb21",
  measurementId: "G-C5K618E0VC"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDvjwDlU-4LvFVxRqabc4DUhoblQBZKpiI",
//   authDomain: "agrikaash-dev.firebaseapp.com",
//   projectId: "agrikaash-dev",
//   databaseURL: "https://agrikaash-dev.firebaseio.com",
//   storageBucket: "agrikaash-dev.appspot.com",
//   messagingSenderId: "190411085345",
//   appId: "1:190411085345:web:922f90f4ac29ac95d4b560"
// };

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD1xOdtIyoPazSMLnBau7kd5o-UZBzyi-s",
//   authDomain: "agrikaash-fe92e.firebaseapp.com",
//   projectId: "agrikaash-fe92e",
//   storageBucket: "agrikaash-fe92e.appspot.com",
//   messagingSenderId: "724640157798",
//   appId: "1:724640157798:web:9ffc758c2f30f0b80f5da7",
//   databaseURL: "https://agrikaash-fe92e.firebaseio.com"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
