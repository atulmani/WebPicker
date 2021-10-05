

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

// let eventDocUrl = new URL(location.href);
// // console.log ('URL: ' + eventDocUrl);
// let searchParams = new URLSearchParams(eventDocUrl.search);
// var docID = searchParams.get('id');
// var eventid = searchParams.get('eventid');
// console.log('Document ID: ' + docID);
// console.log('Event ID: ' + eventid);


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

//**************************INSERT Image into Storage & get image url on ui *****************************//


var ImgName, ImgURL;
var files = [];
var reader;

//************ Select File ****************

function selectTeamImage(docID, prodID, elementID){
// function selectTeamImage(docID, prodID){
  // alert('camera button click' + prodID);
  // alert('camera button click' + docID);

  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      document.getElementById(elementID + prodID ).src = reader.result;
    }
    reader.readAsDataURL(files[0]);

  }
  input.click();

};


//************ File Upload to Cloud Storage  ****************

var docCount = 0;
db.collection('ProductList').get().then((snapshot) => {
  docCount = snapshot.size;
  console.log('Snapshot Size: ' + docCount);
});


function uploadTeamImg(docID, prodID, elementID, imageType){
  // var newProductID = 10000 + docCount;
  console.log('product id: ' + prodID);
  console.log('doc id: ' + docID);
  ImgName = elementID + prodID + '.png';
  console.log('Image Name: ' + ImgName);
  var ref = firebase.storage().ref('ProductImages/' + prodID + '/' + ImgName);
  console.log("Ref: " + ref.size);
  var uploadTask = ref.put(files[0]);
  // var uploadTask = firebase.storage().ref('ProductImages/' + prodID + '/' + ImgName).put(files[0]);

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

        if (imageType == 'THUMBNAIL')
        {
          firebase.firestore().collection("ProductList").doc(docID).update({
              // UserEmail: auth.currentUser.email,
              // ImageName: ImgName,
              ThumbnailImageURL: ImgUrl,
              // Timestamp: (new Date()).toString()
            })
            .then((docRef) => {
              console.log("Image added successful");
            })
            .catch((error) => {
              // console.error("Error adding image: ", error);
            });
        }
        else {
          firebase.firestore().collection("ProductList").doc(docID).update({
              // UserEmail: auth.currentUser.email,
              // ImageName: ImgName,
              ProductImageURL: ImgUrl,
              // Timestamp: (new Date()).toString()
            })
            .then((docRef) => {
              console.log("Image added successful");
            })
            .catch((error) => {
              // console.error("Error adding image: ", error);
            });

        }
      });
    });
}





//************* innerHTML starts *****************


db.collection("ProductList").orderBy('CreatedTimestamp','desc').onSnapshot(snapshot => {
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
  console.log('Product Id: ' + doc.data().ProductId);

  let itemCol = document.createElement("div");
  itemCol.classList.add("col-lg-4");
  itemCol.classList.add("col-md-6");
  itemCol.classList.add("col-sm-12");

  itemCol.innerHTML = "<div class='' style='padding: 10px;'>" +
  "<div class='item' style='border: 1px solid #fff5c0;transition: all 1s ease-in-out;'>" +
  "<div class='post-slide'>" +
  "<div class='post-info'>" +
  "<table width='100%' border='0'>" +
  "<tr>" +
  "<td style='width:50%;'>" +
  "<div class='' style='display:flex;'>" +
  "<i class='fas fa-edit update-data-edit-icon' id=''></i>" +
  "<select id='productType" + doc.id + "' name='Mode' class='update-inputs' style='font-size: 0.6rem;font-weight: bold;color: #fff5c0;text-transform: uppercase;font-family: 'Roboto Condensed', sans-serif;'>" +
  "<option value='Basic'>Basic</option>" +
  "<option value='Dynamic'>Dynamic</option>" +
  "<option value='Database'>Database</option>" +
  "</select>" +
  "</div>" +
  "</td>" +
  "<td style='text-align:right;'>" +
  "<div class='' style='display:flex;'>" +
  "<input type='text' name='' id='productSubCategory" + doc.id + "' class='update-inputs' value='" + doc.data().ProductSubCategory + "' style='text-align:right;font-size: 0.6rem;font-weight: bold;color: #fff5c0;text-transform: uppercase;font-family: 'Roboto Condensed', sans-serif'>" +
  "<i class='fas fa-edit update-data-edit-icon' id=''></i>" +
  "</div>" +
  "</td>" +
  "</tr>" +
  "</table>" +
  "</div>" +
  "<div class='post-img' style='width: 100%;'>" +
  "<div class='container1'>" +
  "<img src='" + doc.data().ProductImageURL + "' width='100%' style='height: 300px;' id='updateDesignImg" + doc.data().ProductId + "' class='image1'></img>" +
  "<div class='middle'>" +
  "<span><i class='fas fa-edit update-data-edit-icon' onclick='selectTeamImage(\"" + doc.id + "\", \"" + doc.data().ProductId +  "\", \"" + "updateDesignImg" +  "\")' id='updateDesignImgEditIcon" + doc.data().ProductId + "'></i></span>" +
  "<span><i class='fas fa-cloud-upload-alt update-data-edit-icon' style='margin: 10px 0;' onclick='uploadTeamImg(\"" + doc.id + "\", \"" + doc.data().ProductId +  "\", \"" + "updateDesignImg" +  "\", \"" + "" +  "\")' id='updateDesignImgUploadIcon" + doc.data().ProductId + "'></i></span>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "<div class='post-content'>" +
  "<span><i class='fas fa-cloud-upload-alt update-data-edit-icon' style='position:relative;bottom: 15px; left: 70%;' onclick='uploadTeamImg(\"" + doc.id + "\", \"" + doc.data().ProductId +  "\", \"" + "updateTeamImg" +  "\", \"" + "THUMBNAIL" +  "\")' id='updateTeamImgUploadIcon'></i></span>" +
  "<span class='post-author'>" +
  "<div class='container1'>" +
  "<img src='" + doc.data().ThumbnailImageURL + "' width='100%' style='position:relative;bottom: 10px;height:45px;' id='updateTeamImg" + doc.data().ProductId + "' class='image1'></img>" +
  "<div class='middle' style='top:35%;'>" +
  "<span><i class='fas fa-edit update-data-edit-icon' style='margin: 10px 0;' onclick='selectTeamImage(\"" + doc.id + "\", \"" + doc.data().ProductId +  "\", \"" + "updateTeamImg" +  "\")' id='updateTeamImgEditIcon" + doc.data().ProductId + "'></i></span>" +
  "</div>" +
  "</div>" +
  "</span>" +
  "<div style='padding-bottom:10px;'>" +
  "<input id='" + doc.data().ProductId + "' type='hidden' name='' value='" + doc.id + "'>" +
  "</div>" +
  "<h3 class='post-title' style='display:flex;'>" +
  "<span><i class='fas fa-edit update-data-edit-icon' id=''></i></span>" +
  "<select id='updateDesignName" + doc.id + "' name='Category' class='update-inputs' style='width:35%;font-weight:bold;'>" +
  "<option value='FITNESS & YOGA'>FITNESS & YOGA</option>" +
  "<option value='RESTAURANT'>RESTAURANT</option>" +
  "<option value='EDUCATION'>EDUCATION</option>" +
  "<option value='CONSRUCTION'>CONSRUCTION</option>" +
  "<option value='MUSIC'>MUSIC</option>" +
  "<option value='TRAVEL'>TRAVEL</option>" +
  "<option value='SPORTS'>SPORTS</option>" +
  "<option value='CHOCOLATE'>CHOCOLATE</option>" +
  "</select>" +
  "<span style='padding:5px 5px 5px 0;'> | </span>" +
  "<span><i class='fas fa-edit update-data-edit-icon' id=''></i></span>" +
  "<select id='updateDesignColor" + doc.id + "' name='Color Theme' class='update-inputs' style='width:35%;font-weight:bold;'>" +
  "<option value='Popular'>Popular</option>" +
  "<option value='Dark'>Dark</option>" +
  "<option value='Light'>Light</option>" +
  "<option value='Warm'>Warm</option>" +
  "<option value='Cool'>Cool</option>" +
  "</select>" +
  "</h3>" +
  "<div class='' style='display:flex;'>" +
  "<textarea type='text' name='' id='updateDesignPara" + doc.id + "' class='update-inputs description' style='height: 50px;resize:none;'>" + doc.data().ProductDetails + "</textarea>" +
  "<span><i class='fas fa-edit update-data-edit-icon' id=''></i></span>" +
  "</div>" +
  "<input type='text' id='productLinkURL" + doc.id + "' style='width:100%;background:none;margin:10px 0;border: 1px dashed #444;outline:none; color: #ededed;font-size: 0.9rem;padding:5px;' name='' value='" + doc.data().ProductLinkURL +"'>" +
  "<button type='button' class='btn btn-dark' onclick='updateChanges(\"" + doc.id + "\", \"" + doc.data().ProductId +  "\")' style='color:#fff5c0;margin-bottom:10px;opacity:1;'>" +
  "<span> Update Changes </span>" +
  "<i class='fas fa-angle-double-right'></i>" +
  "</button>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>";
  document.getElementById("allProductRow").appendChild(itemCol);



    for (var productType of document.getElementById("productType" + doc.id).options)
    {
      if (productType.value === doc.data().ProductType)
      {
          productType.selected = true;
      }
    }


    for (var updateDesignName of document.getElementById("updateDesignName" + doc.id).options)
    {
      if (updateDesignName.value === doc.data().ProductCategory)
      {
          updateDesignName.selected = true;
      }
    }

    for (var updateDesignColor of document.getElementById("updateDesignColor" + doc.id).options)
    {
      if (updateDesignColor.value === doc.data().ProductColorTheme)
      {
          updateDesignColor.selected = true;
      }
    }

};

function updateChanges(docID, prodID)
{
  // alert(doc123);
  console.log('Update Changes CLicked - doc.id = : ' + docID);
  console.log('Update Changes CLicked - Product ID = : ' + prodID);
  // 1 - start
  var updateDesignName =  document.getElementById('updateDesignName' + docID ).value;
  // 1 - end
  // 2 - start
  var productTypeSelect = document.getElementById('productType' + docID );
  var productType = productTypeSelect.options[productTypeSelect.selectedIndex].value;
  // 2 - end
  // 3 - start
  var productSubCategory =  document.getElementById('productSubCategory' + docID ).value;
  // 3 - end
  // 4 - start
  var updateDesignColorSelect = document.getElementById('updateDesignColor' + docID );
  var updateDesignColor = updateDesignColorSelect.options[updateDesignColorSelect.selectedIndex].value;
  // 4 - end
  // 5 - start
  var updateDesignPara =  document.getElementById('updateDesignPara' + docID ).value;
  // 5 - end
  // 6 - start
  var productLinkURL =  document.getElementById('productLinkURL' + docID ).value;
  // 6 - end


  // var categoryid = document.getElementById('updateDesignName').value;
  // console.log('Category id: ' + categoryid);

  // console.log('Category input id: ' + );

  db.collection("ProductList").doc(docID).update({
      // UserEmail: auth.currentUser.email,
      // ProductCategory: document.getElementById('updateDesignName').value,
      ProductCategory: updateDesignName,
      ProductType: productType,
      ProductSubCategory: productSubCategory,
      ProductColorTheme: updateDesignColor,
      ProductDetails: updateDesignPara,
      ProductLinkURL: productLinkURL,
      UpdatedBy: auth.currentUser.email
      // Timestamp: (new Date()).toString()
    })
    .then((docRef) => {
      console.log("Image added successful");
    })
    .catch((error) => {
      console.error("Error adding image: ", error);
    });


}
