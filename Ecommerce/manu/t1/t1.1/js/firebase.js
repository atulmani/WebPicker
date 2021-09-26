

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHDCa8DvA28DeF4J1jnPfniXre-XSnPvE",
  authDomain: "ecom-testdemo.firebaseapp.com",
  projectId: "ecom-testdemo",
  databaseURL: "https://ecom-testdemo.firebaseio.com",
  storageBucket: "ecom-testdemo.appspot.com",
  messagingSenderId: "910795481414",
  appId: "1:910795481414:web:c599737be5bd9c594f8547"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
