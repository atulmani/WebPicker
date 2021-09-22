// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-analytics.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyAbSjrm6vOca3CgLU0qAEtn9tLSwSqNdk0",
   projectId: "hypercloudprod",
   authDomain: "hypercloudprod.firebaseapp.com",
   databaseURL: "https://hypercloudprod.firebaseio.com",
   storageBucket: "hypercloudprod.appspot.com",
   messagingSenderId: "373925918977",
   appId: "1:373925918977:web:99a6729a8eff497faa8300",
   measurementId: "G-RRM25JW0R6"
 };


 // Initialize Firebase
 // const app = initializeApp(firebaseConfig);
 // const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
