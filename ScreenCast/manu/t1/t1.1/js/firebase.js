// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCawRJbDHaVLUGPNX5QcKO28o4V3NEFLkA",
  projectId: "ads4-f3d81",
  authDomain: "ads4-f3d81.firebaseapp.com",
  // databaseURL: "https://webpicker-786c6-default-rtdb.firebaseio.com",
  databaseURL: "https://ads4-f3d81.firebaseio.com",
  storageBucket: "ads4-f3d81.appspot.com",
  messagingSenderId: "247978042866",
  appId: "1:247978042866:web:027c4a3a0ff7953bb9b76b",
  // measurementId: "G-GJCEDPVJQL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
