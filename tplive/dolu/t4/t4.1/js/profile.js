var loggedinUser = "";

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      console.log('Logged-in user phone number: ' + loggedinUser.phoneNumber);

      GetProfileData();
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "index.html";
  }
});


function GetProfileData() {
 //  var e = document.getElementById("cityList");
 // var selected_value = e.options[e.selectedIndex].value;
 // var dobDate = document.getElementById("dob");
 var options = { year: 'numeric', month: 'short', day: 'numeric' };


  console.log(loggedinUser.uid);
  const snapshot = db.collection('UserList').doc(loggedinUser.uid);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log(doc.data());
      document.getElementById("userName").innerHTML = doc.data().UserName + " " + '('+ doc.data().Gender + ')'
      document.getElementById("userEmail").value = doc.data().Email;
      document.getElementById("userPhone").innerHTML =  doc.data().Phone;
      var dob = new Date(doc.data().DateOfBirth.seconds * 1000);
      dob = dob.toLocaleDateString("en-US", options);
      console.log('date is' + dob);
      document.getElementById("dob").value =  dob;

      document.getElementById("city").innerHTML =  doc.data().City;
      document.getElementById("altPh").value =  doc.data().AlternatePhone;
      document.getElementById("address").value =  doc.data().Address;
      // document.getElementById('uploadFile').value = selected_value;
    }
  });
}
