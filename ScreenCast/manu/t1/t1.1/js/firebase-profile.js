//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      document.getElementById('name').value = firebaseUser.displayName;

      GetProfileData(firebaseUser);

    } else {
      // console.log('User has been logged out');
       window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login";
  }
});


function GetProfileData (user)
{
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then( async ( doc ) => {
    if ( doc.exists ) {
      // let blogPost = doc.data();
        console.log ('User UID: ' + user.uid);
        console.log ('Document ref id: ' + doc.data().uid);
        console.log('Display Name: '+ doc.data().displayName);

        document.getElementById('status').innerHTML = doc.data().Status;
        document.getElementById('name').value = doc.data().displayName;
        document.getElementById('mobile').value = doc.data().Phone;

        for (var option of document.getElementById("idtype").options)
        {
          if (option.value === doc.data().IDType)
          {
              option.selected = true;
          }
        }

        document.getElementById('idno').value = doc.data().IDNo;
        document.getElementById('address').value = doc.data().Address;

    }
  })
  .catch((error) => {
    // An error occurred
    console.log(error.message);
    // document.getElementById('errorMessage_Signup').innerHTML = error.message;
    // document.getElementById('errorMessage_Signup').style.display = 'block';
  });
};

//Save users data into Users DB Collection
function setUsersProfileData(user){

  var select = document.getElementById('idtype');
  var idtype = select.options[select.selectedIndex].value;

  db.collection('Users')
  .doc(user.uid)
  .update({
      // uid: user.uid,
      displayName: document.getElementById('name').value.trim(),
       // EmailID: user.email,
      Phone: document.getElementById('mobile').value.trim(),
      DateOfBirth: '',
      Address: document.getElementById('address').value.trim(),
      IDType: idtype,
      IDNo: document.getElementById('idno').value.trim(),
       // Status: 'ACTIVE',
       // CreatedTimestamp: (new Date()).toString(),
      UpdatedTimestamp: (new Date()).toString()
  })
  .then(() => {
        // updated
        console.log ('Users data saved successfully');

        // Show alert
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function() {
          document.querySelector('.alert').style.display = 'none';
        }, 3000);


        // window.location.href = "../admin/dashboard.html";
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        document.getElementById('errorMessage_Signup').innerHTML = error.message;
        document.getElementById('errorMessage_Signup').style.display = 'block';
      });
};

const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  console.log ('btnSave clicked');

  //Update Display name for User Profile in firebase system
  auth.currentUser.updateProfile({
    displayName: document.getElementById('name').value,
    // phoneNumber: txtPhoneNo.value,
    photoURL: ""
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    // Update successful
    //Save the Users registration data in Users db Collection
    setUsersProfileData (auth.currentUser);
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage_Signup').innerHTML = error.message;
    document.getElementById('errorMessage_Signup').style.display = 'block';
  });

});




// db.collection('Users').orderBy('Timestamp').onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   // console.log(changes);
//   changes.forEach (change => {
//     // console.log(change.doc.data());
//     if (change.type == 'added') {
//       renderDataList(change.doc);
//     }
//     else if (change.type == 'removed') {
//       let li = contactMessageList.querySelector('[data-id=' + change.doc.id + ']');
//       dataListList.removeChild(li);
//     }
//   })
// })
