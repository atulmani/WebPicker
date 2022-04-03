// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8xoYejrqfJflk70HMw877vd3cbUrG3so",
  authDomain: "tpliveapp-dev-56bb5.firebaseapp.com",
  projectId: "tpliveapp-dev-56bb5",
  databaseURL: "https://tpliveapp-dev-56bb5.firebaseio.com",
  storageBucket: "tpliveapp-dev-56bb5.appspot.com",
  messagingSenderId: "259685787158",
  appId: "1:259685787158:web:fd3c4a7bbb3720c3d33737"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
