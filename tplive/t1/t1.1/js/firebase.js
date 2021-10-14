// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfIOHLXygzxC_VkJ4XwfQelfyKfQMFJaE",
  authDomain: "tplive-dev.firebaseapp.com",
  projectId: "tplive-dev",
  storageBucket: "tplive-dev.appspot.com",
  messagingSenderId: "519739847875",
  appId: "1:519739847875:web:087eec33449182f7ad9e76",
  databaseURL: "https://tplive-dev.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Refrence to create firebase database//
const db = firebase.firestore();
const auth = firebase.auth();
