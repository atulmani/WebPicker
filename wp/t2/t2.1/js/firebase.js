


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa_pWRLz6kjW6wbm84L0sPS1H4iZwpziI",
  authDomain: "webpicker-786c6.firebaseapp.com",
  databaseURL: "https://webpicker-786c6-default-rtdb.firebaseio.com",
  projectId: "webpicker-786c6",
  storageBucket: "webpicker-786c6.appspot.com",
  messagingSenderId: "517324220054",
  appId: "1:517324220054:web:e7e281a20b5e2d7b3a44b7",
  measurementId: "G-GJCEDPVJQL"
};

// import { initializeApp } from "firebase/app"

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const firebaseApp = initializeApp({ firebaseConfig });
// const analytics = getAnalytics(app);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
