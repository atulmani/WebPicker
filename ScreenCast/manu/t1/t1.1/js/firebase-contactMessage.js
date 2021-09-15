// ****************** Starts - SetData **********************

function saveMessage() {
  console.log('Contactus Starts');

  db.collection('ContactusMessageList').get().then((snapshot) => {
    count = snapshot.size;
    // console.log('No of document3: ' + count);
    db.collection('ContactusMessageList')
      .add({
        ID: count + 1,
        Organization: document.getElementById('txtOrganization').value,
        Name: document.getElementById('txtName').value,
        Phone: document.getElementById('txtPhone').value,
        Email: document.getElementById('txtEmail').value,
        Message: document.getElementById('txtMessage').value,
        Status: 'ACTIVE',
        Created_Timestamp: (new Date()).toString()
      })
      .then(() => {
        // updated
        console.log('Request has been submitted successfully');
        // window.location.href = "dashboard.html";
        // console.log('Client Registrations Completed Successfully');
        document.getElementById('errorMessage').style.display = 'none';
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        document.getElementById('errorMessage').innerHTML = error.message;
        document.getElementById('errorMessage').style.display = 'block';
        console.log('Error while submitting your request');
      });

  });

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

};

//Add Sign-up addEventListener
const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  // console.log('btnSave Clicked');

  const txtOrganization = document.getElementById('txtOrganization');
  const txtName = document.getElementById('txtName');
  const txtPhone = document.getElementById('txtPhone');
  const txtEmail = document.getElementById('txtEmail');
  const txtMessage = document.getElementById('txtMessage');

  //All fields are mandatory while registration
  if (txtOrganization.value == '' || txtName.value == '' ||
      txtPhone.value == '' || txtEmail.value == '' ||
      txtMessage.value == '' ) {
    document.getElementById('errorMessage').innerHTML = 'All fields are mandatory';
    document.getElementById('errorMessage').style.display = 'block';
  } else {
    // console.log('Create Ads Starts');
    // console.log(' Current user: '  + auth.currentUser.email);
    saveMessage();
    // console.log('Create Ads Ends');
  }
});

// ****************** Ends - SetData **********************
