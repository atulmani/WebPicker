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

db.collection("Events").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  // alert('Snapsize from Homepage: ' + snapshot.size);
  // console.log(changes);
  changes.forEach(change => {
    if (change.type == 'added') {
      renderEvents(change.doc);
    }
  });
});


function renderEvents(doc) {
  console.log('Doc ID: ' + doc.id);
  console.log('Event Name: ' + doc.data().EventName);

  let itemCol = document.createElement("div");
  // itemCol.classList.add('col-lg-3 col-md-6 col-sm-12');
  itemCol.classList.add("col-lg-3");
  itemCol.classList.add("col-md-6");
  itemCol.classList.add("col-sm-12");
  itemCol.innerHTML = "<a style='text-decoration:none;' href='createEvent.html?id=" + doc.id + "&eventid=" + doc.data().EventId + "'>" +
    "<div class='item'>" +
    "<div class='post-slide'>" +
    "<div class='post-img'>" +
    "<img style='border-radius:10px;' src='" + doc.data().EventImgURL + "' alt='' width='100%'>" +
    "</div>" +
    "<div class='post-content'>" +
    "<h3 class='post-title'>" +
    doc.data().EventName + "</h3>" +
    "<p class='description'>" +
      "<span style='letter-spacing:1px;font-weight:1000;'><span style='font-size:15px;'>By: </span>" +
       doc.data().EventOrganisationName +
       "</span>" +
       "<br>" +
       "<span style='letter-spacing:1px;font-weight:1000;line-height:30px;'><span style='font-weight:1000;'>Date: </span>" + doc.data().EventStartDate + " - " + doc.data().EventEndDate +
        "</span>" +
        "<br>" +
        "<span style='letter-spacing:1px;font-weight:1000;line-height:14px;'><span style='font-weight:1000'>Price: ₹</span>" + doc.data().Price + "</span>" +
         "<br>" +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</a>";








  document.getElementById("eventRow").appendChild(itemCol);




  // itemlist = document.getElementById("firebase-event-list");
  // let item = document.createElement('div');
  // item.classList.add("item");
  // // item.innerHTML = "<div class='post-content'><h3 class='post-title'>" + change.doc.data().EventName + "</h3></div>";
  //
  //
  // var link = "<a style='text-decoration:none;' href='createEvent.html?id=" + change.doc.data().EventId + "'>";
  //
  //
  // // item.innerHTML = "<a style='text-decoration:none;' href='./Events/EventDetails.html?id=" + change.doc.data().EventId + ">" +
  // item.innerHTML = link +
  //   "<div class='item'>" +
  //     "<div class='post-slide'>" +
  //       "<div class='post-img'>" +
  //           "<img style='border-radius:10px;' src='" + change.doc.data().EventImgURL + "' alt='' width='100%'>" +
  //         "</div>" +
  //         "<div class='post-content'>" +
  //             "<h3 class='post-title' id='homepage_eventname'>" + change.doc.data().EventName +
  //             "</h3>" +
  //             "<p class='description'>" +
  //                 "<span style='font-weight:bold'>Venue: </span>" + change.doc.data().EventVenue +
  //                 "<br>" +
  //                 "<span style='letter-spacing:1px;' id='homepage_eventvenue'></span>" +
  //                 "<br>" +
  //                 "<span style='font-weight:bold'>Date: </span>" + formatDate(change.doc.data().EventStartDate) + ' to ' + formatDate(change.doc.data().EventEndDate) +
  //                 "<br>"
  //                 "<span style='letter-spacing:1px;line-height:30px;'  id='homepage_eventdate'>" +
  //                 "</span>" +
  //                 "<br>" +
  //                 "<span style='letter-spacing:1px;line-height:14px;'><span style='font-weight:bold'>Price</span>: ₹ 4999 </span>" +
  //               "</p>" +
  //             "</div>" +
  //           "</div>" +
  //         "</div>" +
  //   "</a>"


  // $('#event-list').trigger('add.owl.carousel', [item]).trigger('refresh.owl.carousel');

  // console.log(change.doc.data().EventName);




}
