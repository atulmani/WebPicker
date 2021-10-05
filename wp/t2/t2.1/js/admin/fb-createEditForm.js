
const profileLogo = document.getElementById('profileLogo');
const profileLogoDropdown = document.getElementById('profileLogoDropdown');
const profileLogoTriangle = document.getElementById('profileLogoTriangle');
const fullContent = document.getElementById('fullContent');
// const navbar = document.getElementById('navbar');


profileLogo.addEventListener('click', profileDropdownShow, false);

function profileDropdownShow()
{
  profileLogoDropdown.style.visibility = "visible";
  profileLogoTriangle.style.visibility = "visible";
}

fullContent.addEventListener('click', profileDropdownHide, false);
// navbar.addEventListener('click', profileDropdownHide, false);

function profileDropdownHide()
{
  profileLogoDropdown.style.visibility = "hidden";
  profileLogoTriangle.style.visibility = "hidden";
}


//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // alert('i am in profile page');
      console.log('Logged-in user email id: ' + firebaseUser.email);
      document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('profile-name').value = firebaseUser.displayName;
      // document.getElementById('profile-number').value = firebaseUser.Phone;
      // document.getElementById('profileEmail').innerHTML = firebaseUser.email;


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

//********************** poppulate data - start ***************


function GetProfileData (user)
{
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then( async ( doc ) => {
    if ( doc.exists ) {
      // let blogPost = doc.data();

        // document.getElementById('status').innerHTML = doc.data().Status;
        // document.getElementById('myimg').src = doc.data().ImageURL;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        // document.getElementById('profile-name').value = doc.data().displayName;
        // document.getElementById('profile-number').value = doc.data().Phone;
        // document.getElementById('profile-dob').value = doc.data().DateOfBirth;
        // document.getElementById('profile-adress').value = doc.data().Address;

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



//********************** poppulate data - end *************

//************* Create & Update Event Data - Starts ******************

var docCount = 0;
db.collection('ProductList').get().then((snapshot) => {
  docCount = snapshot.size;
  console.log('Snapshot Size: ' + docCount);
});

function CreateEventData() {
  // console.log('CreateEventData');

    var productLinkURL = document.getElementById("productLinkURL").value;

    var select = document.getElementById('productCategory');
    var productCategory = select.options[select.selectedIndex].value;
    // var productMode = document.getElementById("productMode").value;
    // var productColorTheme = document.getElementById("productColorTheme").value;
    // var productDesignDetails = document.getElementById("productDesignDetails").value;
    // var productStatus = document.getElementById("productStatus").value;
    // var para = document.getElementById("para").value;

    var newProductID = 10000 + docCount;

    db.collection("ProductList").add({
        // console.log('inside db collection: ' + newEventID);
        ProductId: 'WP' + newProductID,
        ProductLinkURL: productLinkURL,
        ProductCategory: productCategory,
        ProductSubCategory: '',
        ProductType: '',
        ProductMRPPrice: '',
        ProductSellingPrice: '',
        ProductColorTheme: '',
        Offer: '',
        ProductDetails: '',
        ProductImageURL: '',
        ThumbnailImageURL: '',
        ImgURL1: '',
        ImgURL2: '',
        ImgURL3: '',
        ImgURL4: '',
        ImgURL5: '',
        Status: '',
        CreatedBy: auth.currentUser.email,
        CreatedTimestamp: (new Date()).toString(),
        UpdatedBy: '',
        UpdatedTimestamp: '',
        // Age: age,
        // Language: language,
        // Para: para


      })
      .then((docRef) => {
        console.log("Data added sucessfully in the document: " + docRef.toString());
        console.log("eventstart")
        // console.log(Date.parse(eventstart))
      })
      .catch((error) => {
        console.error("error adding document:", error);
      });

}

const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', CreateUpdateEventData, false);

function CreateUpdateEventData() {
  // CreateUpdateEventData.preventDefault();
  createEventConformation.style.display = 'block';
  console.log('button clicked');
  CreateEventData();
  console.log("data sending to db-completed");
}

// ******************** select img ***************

// const teamBtnSelect = document.getElementById("teamBtnSelect");
//
// teamBtnSelect.addEventListener('click', selectImage, false );
//
// function selectImage(){
//   // alert('camera button click');
//   // document.getElementById("uploadImg").style.display = 'block';
//   var input = document.createElement('input');
//   input.type = 'file';
//
//   input.onchange = e => {
//     files = e.target.files;
//     reader = new FileReader();
//     reader.onload = function() {
//       document.getElementById("teamImage").src = reader.result;
//     }
//     reader.readAsDataURL(files[0]);
//
//   }
//   input.click();
//
// }

//************ File Upload to Cloud Storage  ****************
// document.getElementById('teamBtnUpload').onclick = function() {
//   // ImgName = document.getElementById('namebox').value;
//   ImgName = docCount + 1 + '.png';
//   console.log('Image Name: ' + ImgName);
//   var uploadTask = firebase.storage().ref('EventDetailsImages/' + docCount + 1 + '/' + ImgName).put(files[0]);
//
//   //Progress of the image upload into storageBucket
//   uploadTask.on('state_changed', function(snapshot) {
//       // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
//       // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
//     },
//
//     function(error) {
//       alert('error in saving the image');
//     },
//
//     function() {
//       uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
//         ProductImgURL = url;
//         alert('ProductImgURL: ' + ProductImgURL);
//         firebase.firestore().collection("DesignData").doc(auth.currentUser.uid).update({
//             // UserEmail: auth.currentUser.email,
//             // ImageName: ImgName,
//             ProductImgURL: ProductImgURL
//             // Timestamp: (new Date()).toString()
//           })
//           .then((docRef) => {
//             console.log("Image added successful");
//           })
//           .catch((error) => {
//             // console.error("Error adding image: ", error);
//           });
//
//       });
//     });
// }
