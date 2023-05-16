import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyByqHHAbLnO3G4DTVMqIQNSYczqIkN5Csk",
    authDomain: "slotify-dev.firebaseapp.com",
    projectId: "slotify-dev",
    storageBucket: "slotify-dev.appspot.com",
    messagingSenderId: "555164640938",
    appId: "1:555164640938:web:e15dd4c8ca4331738452d3"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize Services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp }