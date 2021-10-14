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
      console.log('Logged-in user email id: ' + firebaseUser.email);
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


//************* Populate Event Data - Starts ******************

// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var docID = searchParams.get('id');
var organizationid = searchParams.get('Organizationid');
console.log('Document ID: ' + docID);
console.log('Event ID: ' + organizationid);

if (docID != null) {
  document.getElementById('optionalFields').style.display = 'block';
  document.getElementById('imageDiv').style.display = 'block';
  populateOrganizationData();
}

function populateOrganizationData() {
  const snapshot = db.collection('Organization').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      console.log(doc.data().OrganizationId);
      document.getElementById("organizationid").value = doc.data().OrganizationId;
      document.getElementById("organizationName").value = doc.data().OrganizationName;
      document.getElementById("organisationEmail").value = doc.data().OrganisationEmail;
      document.getElementById("organisationPhone").value = doc.data().OrganisationPhone;
      document.getElementById("organiseraltphone").value = doc.data().OrganisationAltPhone;
      document.getElementById("organizationCity").value = doc.data().City;
      document.getElementById("organizationDetail").value = doc.data().OrganizationDetail;

      for (var option of document.getElementById('organizationType').options)
      {
        if(option.value === doc.data().OrganizationType)
        {option.selected=true;}
      }
      console.log(doc.data().OrganizationImgURL);
      document.getElementById("myimg").src = doc.data().OrganizationImgURL;
      console.log("organization id" + doc.data().OrganizationId);
      var eventlink = document.getElementById("eventLink");
      console.log(eventlink);
      eventlink.href="createEvent.html?OrganizationId=" + doc.data().OrganizationId;
      console.log("OrganizationID : ", doc.data().OrganizationId);

      console.log("eventlink : ", eventLink);
      populateEventForOrganization(doc.data().OrganizationId);
      }
  });
}

function populateEventForOrganization(OrganizationId) {
  console.log("in function");
  // var mycol = db.collection("Events").where("OrganizationID" ,"==", OrganizationId)
  let itemCol = document.createElement("div");
  console.log("org levele : ", OrganizationId);
  itemCol.innerHTML ="<a href='createEvent.html?OrganizationId="+ OrganizationId.toString(10) +
      "' id='eventLink0' style='text-decoration:none;'>"+
    "<div class='add-event'>"+
      "<i class='fas fa-plus'></i>"+
      "<h4>Add a New Event</h4>"+
    "</div>"+
    "</a>";
    console.log(itemCol.innerHTML);
    document.getElementById("eventRow").appendChild(itemCol);

    //  var colGr = db.collection("Events").where("OrganizationID", "==", OrganizationId);
     var colGr = db.collection("Events").where("OrganizationID", "==", OrganizationId.toString(10));
      colGr.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              renderEvent(doc , OrganizationId);

          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

}

function renderEvent(doc, OrganizationID) {
  console.log('Doc ID: ' + doc.id);
  console.log('Event Name: ' + doc.data().EventName);

  let itemCol = document.createElement("div");
  // itemCol.classList.add('col-lg-3 col-md-6 col-sm-12');
  itemCol.classList.add("col-lg-3");
  itemCol.classList.add("col-md-6");
  itemCol.classList.add("col-sm-12");
  itemCol.innerHTML = "<a style='text-decoration:none;' href='createEvent.html?id=" + doc.id +"&OrganizationId=" + OrganizationID+ "&EventId=" + doc.data().EventId + "'>" +
    "<div class='item'>" +
    "<div class='post-slide'>" +
    "<div class='post-img'>" +
    "<img style='border-radius:10px;' src='" + doc.data().EventImgURL + "' alt='' width='100%'>" +
    "</div>" +

    "<div class='post-content'>" +
    "<h3 class='post-title'>" +
    doc.data().EventName + "</h3>" +
       "<span style='letter-spacing:1px;font-weight:1000;line-height:30px;'><span style='font-weight:1000;'>Event Start Date: </span>" + doc.data().EventStartDate +
        "</span>" +
        "<br>" +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</a>";

  document.getElementById("eventRow").appendChild(itemCol);

}

//************* Populate Event Data - Ends ******************


//************* Create & Update Event Data - Starts ******************

function CreateOrganizationData  () {
  console.log('CreateOrganizationData');

  var docCount = 0;
  db.collection('Organization').get().then((snapshot) => {
    docCount = snapshot.size;
    console.log('Snapshot Size: ' + docCount);

    var organizationname = document.getElementById("organizationName").value;
    var organisationEmail = document.getElementById("organisationEmail").value;
    var organisationPhone = document.getElementById("organisationPhone").value;
    var organisationAltPhone = document.getElementById("organiseraltphone").value;
    var city = document.getElementById("organizationCity").value;
    var varOrganizationType = document.getElementById("organizationType");
    var organizationType = varOrganizationType.options[varOrganizationType.selectedIndex].value;
    console.log("before insert");
    var organizationDetail = document.getElementById("organizationDetail").value;
    db.collection("Organization").add({
        // console.log('inside db collection: ' + newEventID);
        OrganizationId: docCount + 1,
        OrganizationName: organizationname,
        OrganisationEmail: organisationEmail,
        OrganisationPhone : organisationPhone,
        OrganisationAltPhone: organisationAltPhone,
        City: city,
        OrganizationType: organizationType,
        OrganizationDetail: organizationDetail,
        OrganizationImgURL:"",
        Status: "Active",
        CreatedBy: auth.currentUser.email,
        CreatedTimestamp: (new Date()).toString(),
        UpdatedBy: auth.currentUser.email,
        UpdatedTimestamp: (new Date()).toString()

      })
      .then((docRef) => {
        console.log("Data added sucessfully in the document: " + docRef.toString());
        console.log("docuement start")
        // console.log(Date.parse(eventstart))
      })
      .catch((error) => {
        console.error("error adding document:", error);
      });

  });

}

function UpdateOrganizationData() {
  console.log('updateOrganizationData');
  var organizationName = document.getElementById("organizationName").value;
  var organisationEmail = document.getElementById("organisationEmail").value;
  var organisationPhone = document.getElementById("organisationPhone").value;
  var organisationAltPhone = document.getElementById("organiseraltphone").value;
  var City = document.getElementById("organizationCity").value;
  var varOrganizationType = document.getElementById("organizationType");
  var organizationType = varOrganizationType.options[OrganizationType.selectedIndex].value;
  var organisationDetail = document.getElementById("organisationDetail").value;

  db.collection("Organization").doc(docID).update({
      // console.log('inside db collection: ' + newEventID);
      // EventId: newEventID,

      OrganizationName: organizationName,
      OrganisationEmail: organisationEmail,
      OrganisationPhone : organisationPhone,
      OrganisationAltPhone: organisationAltPhone,
      City: City,
      OrganizationType: organizationType,
      OrganizationDetail : organizationDetail,
      Status: "Active",
      UpdatedBy: auth.currentUser.email,
      UpdatedTimestamp: (new Date()).toString()

    })
    .then((docRef) => {
      console.log("Data updated sucessfully in the document: " + docRef.toString());
      console.log("docuementstart")
      // console.log(Date.parse(eventstart))
    })
    .catch((error) => {
      console.error("error adding document:", error);
    });
}

//************* Create & Update Event Data - Ends ******************

// const eventForm = document.getElementById('eventForm');
const CreateOrganizationConformation = document.getElementById('createOrganizationConformation');

const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', CreateUpdateOrganizationData, false);

function CreateUpdateOrganizationData() {
  // CreateUpdateEventData.preventDefault();
  createOrganizationConformation.style.display = 'block';

  console.log('button clicked');

  if (docID != null)
    UpdateOrganizationData();
  else
    CreateOrganizationData();

  console.log("data sending to db-completed");

}


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
//**************************INSERT Image into Storage & get image url on ui *****************************//


var ImgName, ImgURL;
var files = [];
var reader;

//************ Select File ****************
document.getElementById("select").onclick = function(e) {
  // alert('camera button click');
  // document.getElementById("uploadImg").style.display = 'block';
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      document.getElementById("myimg").src = reader.result;
    }
    reader.readAsDataURL(files[0]);

  }
  input.click();
}

//************ File Upload to Cloud Storage  ****************
document.getElementById('upload').onclick = function() {
  // ImgName = document.getElementById('namebox').value;
  console.log(document.getElementById('organizationid').value);
  ImgName = document.getElementById('organizationid').value + '_1.png';
  var organizationid=   document.getElementById('organizationid').value
  console.log('Image Name: ' + ImgName);
  var uploadTask = firebase.storage().ref('OrganizationImages/' + organizationid + '/' + ImgName).put(files[0]);

  //Progress of the image upload into storageBucket
  uploadTask.on('state_changed', function(snapshot) {
      // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
      // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
    },

    function(error) {
      alert('error in saving the image');
    },

    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
        ImgUrl = url;
        alert('ImgUrl: ' + ImgUrl);

        db.collection("Organization").doc(docID).update({
            // console.log('inside db collection: ' + newEventID);
            // EventId: newEventID,
            OrganizationImgURL: ImgUrl,
            UpdatedBy: auth.currentUser.email,
            UpdatedTimestamp: (new Date()).toString()
          })
          .then((docRef) => {
            console.log("Data added sucessfully in the document: " + docRef.toString());
            console.log("organization image update");
            // console.log(Date.parse(eventstart))
          })
          .catch((error) => {
            console.error("error adding document:", error);
          });


        // document.getElementById('namebox').value = ImgUrl;

        // firebase.firestore().collection("UserProfilePhotoURLs").add({
        //     UserEmail: auth.currentUser.email,
        //     ImageName: ImgName,
        //     ImageURL: ImgUrl,
        //     Timestamp: (new Date()).toString()
        //   })
        //   .then((docRef) => {
        //     console.log("Image added successful");
        //   })
        //   .catch((error) => {
        //     console.error("Error adding image: ", error);
        //   });

        // firebase.firestore().collection("Events").doc(auth.currentUser.uid).update({
        //     // UserEmail: auth.currentUser.email,
        //     ImageName: ImgName,
        //     ImageURL: ImgUrl
        //     // Timestamp: (new Date()).toString()
        //   })
        //   .then((docRef) => {
        //     console.log("Image added successful");
        //   })
        //   .catch((error) => {
        //     console.error("Error adding image: ", error);
        //   });

      });
    });
}
