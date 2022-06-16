// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC8xoYejrqfJflk70HMw877vd3cbUrG3so",
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
const firebaseConfig = {
  apiKey: "AIzaSyAtdZg3yc_bT8S6o24ob5B3yUjEqzP5WV0",
  authDomain: "tpliveapp.firebaseapp.com",
  projectId: "tpliveapp",
  databaseURL: "https://tpliveapp.firebaseio.com",
  storageBucket: "tpliveapp.appspot.com",
  messagingSenderId: "401602717044",
  appId: "1:401602717044:web:544d001d2c200e4036f821",
  measurementId: "G-4NJJMMSPDT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
