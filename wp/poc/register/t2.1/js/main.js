// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCa_pWRLz6kjW6wbm84L0sPS1H4iZwpziI",
    authDomain: "webpicker-786c6.firebaseapp.com",
    databaseURL: "https://webpicker-786c6-default-rtdb.firebaseio.com",
    projectId: "webpicker-786c6",
    storageBucket: "webpicker-786c6.appspot.com",
    messagingSenderId: "517324220054",
    appId: "1:517324220054:web:e7e281a20b5e2d7b3a44b7",
    measurementId: "G-GJCEDPVJQL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  // Reference messages collection
  var messageRef = firebase.database().ref('ContactMessages');

// Listen for form Submit
document.getElementById ('contactForm').addEventListener('submit', submitForm);

// Submit Form
function submitForm(e) {
  e.preventDefault(); //prevent to reload/refresh form by default

  var fName = getInputVal('fName');
  var lName = getInputVal('lName');
  var phone = getInputVal('phone');
  var emailid = getInputVal('email');
  var message = getInputVal('message');

  console.log(fName);
  console.log(lName);
  console.log(phone);
  console.log(emailid);
  console.log(message);

  //call function to save data in Firestore
  saveMessage(fName, lName, phone, emailid, message);

  console.log('Your data has been saved to Firestore');

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout (function(){
      document.querySelector('.alert').style.display = 'none';
  }, 5000);

  // Clear Form
  // document.getElementById('contactForm').reset();
}

// Funcation to get form values
// to avoid writing everytime as document.getElementById,
// to get values for the form fields
function getInputVal (id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fName, lName, phone, email, message) {
  var  newMessageRef = messageRef.push();
  newMessageRef.set({
    FirstName: fName,
    LastName: lName,
    Phone: phone,
    Email: email,
    Messages: message
  });

}
