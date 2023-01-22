// Your web app's Firebase configuration
// const firebaseConfig = {
//   authDomain: "tpliveapp-dev-56bb5.firebaseapp.com",
//   projectId: "tpliveapp-dev-56bb5",
//   databaseURL: "https://tpliveapp-dev-56bb5.firebaseio.com",
//   storageBucket: "tpliveapp-dev-56bb5.appspot.com",
//   messagingSenderId: "259685787158",
//   appId: "1:259685787158:web:fd3c4a7bbb3720c3d33737"
// };

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCCwcmd-j8LgBcItu7okMGNt-epPMVx9V0",
//   authDomain: "tplive-uat-f9355.firebaseapp.com",
//   projectId: "tplive-uat-f9355",
//   databaseURL: "https://tplive-uat-f9355.firebaseio.com",
//   storageBucket: "tplive-uat-f9355.appspot.com",
//   messagingSenderId: "843648698798",
//   appId: "1:843648698798:web:cab3c5393bb1645245603f",
//   measurementId: "G-ZMP4Q0QMX4"
// };

//production
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAtdZg3yc_bT8S6o24ob5B3yUjEqzP5WV0",
//   authDomain: "tpliveapp.firebaseapp.com",
//   projectId: "tpliveapp",
//   databaseURL: "https://tpliveapp.firebaseio.com",
//   storageBucket: "tpliveapp.appspot.com",
//   messagingSenderId: "401602717044",
//   appId: "1:401602717044:web:544d001d2c200e4036f821",
//   measurementId: "G-4NJJMMSPDT"
// };
// import firebase from "firebase";
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
// require('firebase/firestore');


const firebaseConfig = {
  apiKey: "AIzaSyCdr0rrIhy5OczzdSaHKaOA6tnztelN9SE",
  authDomain: "tplive-prod.firebaseapp.com",
  projectId: "tplive-prod",
  storageBucket: "tplive-prod.appspot.com",
  messagingSenderId: "67897036742",
  appId: "1:67897036742:web:2a551603b441b3c282acc7",
  measurementId: "G-FW6FG7CLNV"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
export const functions = getFunctions(app, "asia-south1");
export const auth = getAuth(app);
