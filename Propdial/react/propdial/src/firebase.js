import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
// require('firebase/firestore');

//PropDial-Dev Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQ1dlizv-nwe6vtOH-Z2acQX7paKwHykw",
    authDomain: "propdial-dev-aa266.firebaseapp.com",
    projectId: "propdial-dev-aa266",
    storageBucket: "propdial-dev-aa266.appspot.com",
    messagingSenderId: "529710611415",
    appId: "1:529710611415:web:0a7ff10bb6101f986fa992"
    // measurementId: "G-FW6FG7CLNV"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
export const functions = getFunctions(app, "asia-south1");
export const auth = getAuth(app);
