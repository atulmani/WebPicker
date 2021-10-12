const profileLogo = document.getElementById('profileLogo');
const profileLogoDropdown = document.getElementById('profileLogoDropdown');
const profileLogoTriangle = document.getElementById('profileLogoTriangle');
const fullContent = document.getElementById('fullContent');
// const navbar = document.getElementById('navbar');


profileLogo.addEventListener('click', profileDropdownShow, false);

function profileDropdownShow() {
  profileLogoDropdown.style.visibility = "visible";
  profileLogoTriangle.style.visibility = "visible";
}

fullContent.addEventListener('click', profileDropdownHide, false);
// navbar.addEventListener('click', profileDropdownHide, false);

function profileDropdownHide() {
  profileLogoDropdown.style.visibility = "hidden";
  profileLogoTriangle.style.visibility = "hidden";
}



// **** Firebase Services - Starts ****
//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // console.log('Logged-in user email id: ' + firebaseUser.email);
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('profile-name').value = firebaseUser.displayName;
      // document.getElementById('profile-number').value = firebaseUser.Phone;
      // document.getElementById('profileEmail').value = firebaseUser.email;

      GetProfileData(firebaseUser);

    } else {
      // console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "index.html";
  }
});



function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        // console.log ('Document ref id: ' + doc.data().uid);
        // console.log('Display Name: '+ doc.data().displayName);
        // console.log('Phone '+ doc.data().Phone);
        // console.log('Date of Birth: '+ doc.data().DateOfBirth);
        // console.log('Address: '+ doc.data().Address);

        // document.getElementById('status').innerHTML = doc.data().Status;
        // document.getElementById('myimg').src = doc.data().ImageURL;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        // document.getElementById('profile-name').value = doc.data().displayName;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
        // document.getElementById('profile-number').value = doc.data().Phone;
        // document.getElementById('profile-dob').value = doc.data().DateOfBirth;
        // document.getElementById('profile-adress').value = doc.data().Address;
        // document.getElementById('profileEmail').value = doc.data().EmailId;



        // for (var option of document.getElementById("idtype").options)
        // {
        //   if (option.value === doc.data().IDType)
        //   {
        //       option.selected = true;
        //   }
        // }
        //
        // document.getElementById('idno').value = doc.data().IDNo;
        // document.getElementById('address').value = doc.data().Address;

      }
    })
    .catch((error) => {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

//**************************SELECT/GET DATA*****************************//

db.collection("Organization").orderBy('CreatedTimestamp','desc').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  // alert('Snapsize from Homepage: ' + snapshot.size);
  // console.log(changes);
  changes.forEach(change => {
    if (change.type == 'added') {
      renderOrganization(change.doc);
    }
  });
});


function renderOrganization(doc) {
  console.log('Doc ID: ' + doc.id);
  console.log('Organization Name: ' + doc.data().OrganizationName);

  let itemCol = document.createElement("div");
  // itemCol.classList.add('col-lg-3 col-md-6 col-sm-12');
  itemCol.classList.add("col-lg-3");
  itemCol.classList.add("col-md-6");
  itemCol.classList.add("col-sm-12");
  itemCol.innerHTML = "<a style='text-decoration:none;' href='createOrganization.html?id=" + doc.id + "&Organizationid=" + doc.data().OrganizationId + "'>" +
    "<div class='item'>" +
    "<div class='post-slide'>" +
    "<div class='post-img'>" +
    "<img style='border-radius:10px;' src='" + doc.data().OrganizationImgURL + "' alt='' width='100%'>" +
    "</div>" +
    
    "<div class='post-content'>" +
    "<h3 class='post-title'>" +
    doc.data().OrganizationName + "</h3>" +
       "<span style='letter-spacing:1px;font-weight:1000;line-height:30px;'><span style='font-weight:1000;'>Organization Type: </span>" + doc.data().OrganizationType +
        "</span>" +
        "<br>" +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</a>";

  document.getElementById("eventRow").appendChild(itemCol);

}
