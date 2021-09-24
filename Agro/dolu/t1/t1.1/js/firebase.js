
const firebaseConfig = {
  apiKey: "AIzaSyB1aolfQdhrv3SBX-QbP2LN_2O_ZakP7Yo",
  authDomain: "cropqueens.firebaseapp.com",
  projectId: "cropqueens",
  storageBucket: "cropqueens.appspot.com",
  messagingSenderId: "687130150015",
  appId: "1:687130150015:web:c99b920aa94a561f38ab4a",
  measurementId: "G-MEQ1D1YLMR",
  databaseURL: "https://cropqueens.firebaseio.com"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Refrence to create firebase database//
const db = firebase.firestore();
const auth = firebase.auth();
