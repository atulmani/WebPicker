


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1xOdtIyoPazSMLnBau7kd5o-UZBzyi-s",
  authDomain: "agrikaash-fe92e.firebaseapp.com",
  projectId: "agrikaash-fe92e",
  storageBucket: "agrikaash-fe92e.appspot.com",
  messagingSenderId: "724640157798",
  appId: "1:724640157798:web:9ffc758c2f30f0b80f5da7",
  databaseURL: "https://agrikaash-fe92e.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
