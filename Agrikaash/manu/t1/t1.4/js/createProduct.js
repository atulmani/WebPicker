//const productID = document.getElementById('productID');

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
      console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }
        //document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        // document.getElementById('profile-name').value = doc.data().displayName;
        //document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error)  {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

//************* Populate Event Data - Starts ******************

// var url = location.href;
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var productID = searchParams.get('id');
// var userid = searchParams.get('usertid');

if (productID != null) {
  document.getElementById('optionalFields').style.display = 'block';
  document.getElementById('imageDiv').style.display = 'block';
  //console.log(document.getElementById('productID'));
  var obj = document.getElementById('hfproductID');
  //console.log(obj);
  document.getElementById('hfproductID').value = productID;
  console.log(document.getElementById('hfproductID').value);
  populateProductData();
}

//************* Populate Event Data - Starts ******************


function populateProductData() {
  const snapshot = db.collection('Products').doc(productID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      console.log(doc.data());

      var productTypeValue = doc.data().productType;
      var customerBusinessType = doc.data().CustomerBusinessType;
      if(productTypeValue != undefined)
      {
        console.log('is not undefined');
        var productType = document.getElementById('productType');
        for ( var i = 0; i < productType.options.length; i++ ) {
                if ( productType.options[i].value == productTypeValue ) {
                    productType.options[i].selected = true;
                }
            }

      }

      if(customerBusinessType != undefined)
      {
        console.log('is not undefined');
        var businessType = document.getElementById('BusinessType');
        for ( var i = 0; i < businessType.options.length; i++ ) {
                if ( businessType.options[i].value == customerBusinessType ) {
                    businessType.options[i].selected = true;
                }
            }

      }


      document.getElementById("hfproductID").value = doc.data().id;
      document.getElementById("productName").value = doc.data().ProductName;
      document.getElementById("brand").value = doc.data().Brand;
      var vegNonVeg = doc.data().VegNonVeg;
      console.log("vegNonVeg", vegNonVeg);

      if (vegNonVeg === "Veg") {
        document.getElementById("veg").checked = true;
      } else if (vegNonVeg === "NonVeg") {
        document.getElementById("nonVeg").checked = true;
      }
      document.getElementById("minimumQty").value = doc.data().MinimumQty;
      document.getElementById("maximumQty").value = doc.data().MaximumQty;
      document.getElementById("stepQty").value = doc.data().StepQty;

      var productDetails = doc.data().ProductDetails;
      //console.log(productDetails);
      if (productDetails[0] != null) {
        document.getElementById("productWeight1").value = productDetails[0].ProductWeight;
        document.getElementById("productMRP1").value = productDetails[0].ProductMRP;
        document.getElementById("productFinalPrise1").value = productDetails[0].ProductFinalPrise;
      }
      if (productDetails[1] != null) {
        document.getElementById("productWeight2").value = productDetails[1].ProductWeight;
        document.getElementById("productMRP2").value = productDetails[1].ProductMRP;
        document.getElementById("productFinalPrise2").value = productDetails[1].ProductFinalPrise;
      }

      if (productDetails[2] != null) {
        document.getElementById("productWeight3").value = productDetails[2].ProductWeight;
        document.getElementById("productMRP3").value = productDetails[2].ProductMRP;
        document.getElementById("productFinalPrise3").value = productDetails[2].ProductFinalPrise;
      }

      if (productDetails[3] != null) {
        document.getElementById("productWeight4").value = productDetails[3].ProductWeight;
        document.getElementById("productMRP4").value = productDetails[3].ProductMRP;
        document.getElementById("productFinalPrise4").value = productDetails[3].ProductFinalPrise;
      }

      if (productDetails[4] != null) {
        document.getElementById("productWeight5").value = productDetails[4].ProductWeight;
        document.getElementById("productMRP5").value = productDetails[4].ProductMRP;
        document.getElementById("productFinalPrise5").value = productDetails[4].ProductFinalPrise;
      }
      document.getElementById("myimg").src = doc.data().ProductImageURL;
      console.log(doc.data().ProductImageURL);
    }
  });
}

//************* Populate Event Data - Ends ******************

//************* Create & Update Event Data - Starts ******************

function CreateUpdateProductData() {
  console.log('CreateUpdateProductData');

  var docCount = 0;
  db.collection('Products').get().then((snapshot) => {
    docCount = snapshot.size;
    console.log('Snapshot Size: ' + docCount);

    //var productID = document.getElementById("productID").value;
    var productType = document.getElementById("productType");
    var customerBusinessTypeValue = BusinessType.options[BusinessType.selectedIndex].value;

    var productTypeValue = productType.options[productType.selectedIndex].value;
    var productName = document.getElementById("productName").value;
    console.log("productName", productName);
    var brand = document.getElementById("brand").value;
    var vegNonVeg = "";
    if (document.getElementById("veg").checked) {
      vegNonVeg = "Veg";
    } else if (document.getElementById("nonVeg").checked) {
      vegNonVeg = "NonVeg";
    }
    console.log(vegNonVeg);
    var minimumQty = document.getElementById("minimumQty").value;
    var maximumQty = document.getElementById("maximumQty").value;
    var stepQty = document.getElementById("stepQty").value;

    var productDetails = [];
    if (document.getElementById("productWeight1").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight1").value,
        ProductMRP: document.getElementById("productMRP1").value,
        ProductFinalPrise: document.getElementById("productFinalPrise1").value
      });

    }
    if (document.getElementById("productWeight2").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight2").value,
        ProductMRP: document.getElementById("productMRP2").value,
        ProductFinalPrise: document.getElementById("productFinalPrise2").value
      });

    }

    if (document.getElementById("productWeight3").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight3").value,
        ProductMRP: document.getElementById("productMRP3").value,
        ProductFinalPrise: document.getElementById("productFinalPrise3").value
      });

    }

    if (document.getElementById("productWeight4").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight4").value,
        ProductMRP: document.getElementById("productMRP4").value,
        ProductFinalPrise: document.getElementById("productFinalPrise4").value
      });

    }

    if (document.getElementById("productWeight5").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight5").value,
        ProductMRP: document.getElementById("productMRP5").value,
        ProductFinalPrise: document.getElementById("productFinalPrise5").value
      });

    }
    var ProductImageURL = document.getElementById("myimg").src;
    console.log(ProductImageURL);
    if (productID != null && productID != '' ) {
      db.collection("Products").doc(productID).update({
          CustomerBusinessType : customerBusinessTypeValue,
          productType : productTypeValue,
          ProductName: productName,
          Brand: brand,
          VegNonVeg: vegNonVeg,
          MinimumQty: minimumQty,
          MaximumQty: maximumQty,
          StepQty: stepQty,
          ProductDetails: productDetails,
          ProductImageURL: ProductImageURL,
          Status: 'Active',
          CreatedBy: auth.currentUser.email,
          CreatedTimestamp: (new Date()).toString(),
          UpdatedBy: '',
          UpdatedTimestamp: ''
        })
        .then((docRef) => {
          console.log("Data added sucessfully in the document: " );
          console.log("eventstart")
          // console.log(Date.parse(eventstart))
        })
        .catch((error) => {
          console.error("error adding document:", error);
        });
    } else {
      db.collection("Products").add({
          // console.log('inside db collection: ' + newEventID);
          ProductId: docCount + 1,
          CustomerBusinessType : customerBusinessTypeValue,
          productType : productTypeValue,
          ProductName: productName,
          Brand: brand,
          VegNonVeg: vegNonVeg,
          MinimumQty: minimumQty,
          MaximumQty: maximumQty,
          StepQty: stepQty,

          ProductDetails: productDetails,
          ProductImageURL: ProductImageURL,
          Status: 'Active',
          CreatedBy: auth.currentUser.email,
          CreatedTimestamp: (new Date()).toString(),
          UpdatedBy: '',
          UpdatedTimestamp: ''
        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: " + docRef.id);
          document.getElementById('hfproductID').value = docRef.id;
          console.log("eventstart")
          // console.log(Date.parse(eventstart))
        })
        .catch(function(error) {
          console.error("error adding document:", error);
        });

    }
  });

}

// const eventForm = document.getElementById('eventForm');
const createEventConformation = document.getElementById('createEventConformation');

const btnSave = document.getElementById('btnSave');

btnSave.addEventListener('click', CreateUpdateEventData, false);

function CreateUpdateEventData() {
  // CreateUpdateEventData.preventDefault();
  createEventConformation.style.display = 'block';

  CreateUpdateProductData();
  /*if (docID != null)
    UpdateEventData();
  else
    CreateEventData();
*/

  document.getElementById('optionalFields').style.display = 'block';
  document.getElementById('imageDiv').style.display = 'block';

  console.log("data sending to db-completed");

}
//**************************INSERT Image into Storage & get image url on ui *****************************/
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
    document.getElementById("upload").disabled = false;
  }
  input.click();

}
if(productID === null || productID === '')
  productID = document.getElementById('hfproductID').value;

//************ File Upload to Cloud Storage  ****************
document.getElementById('upload').onclick = function() {
  // ImgName = document.getElementById('namebox').value;
//  productID = document.getElementById('hfproductID').value;
if(productID === null || productID === '')
  productID = document.getElementById('hfproductID').value;

  ImgName = productID + '_1.png';
  // ImgName = document.getElementById('productID').value + '_1.png';
  //files = document.getElementById("myimg").src;

  var uploadTask = firebase.storage().ref('ProductImages/' + productID + '/' + ImgName).put(files[0]);

  //Progress of the image upload into storageBucket
  uploadTask.on('state_changed', function(snapshot) {
      // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
      // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
    },

    function(error) {
      alert('error in saving the image');
    },

    function() {
      //console.log(document.getElementById('hfproductID'));
      //productID = document.getElementById('hfproductID').value;
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
        ImgUrl = url;
        alert('ImgUrl: ' + ImgUrl);
                //Update meta data for firebase storage resources - Start
          var storageRef = uploadTask.snapshot.ref;
          // console.log ("storageRef: " + storageRef );
          // Create file metadata to update to cache for 1 year
          var newMetadata = {
            cacheControl: 'public,max-age=31536000',
            contentType: 'image/png'
          };
          // Update metadata properties
          storageRef.updateMetadata(newMetadata)
            .then((metadata) => {
              // Updated metadata for storage resources is returned in the Promise
              console.log("metadata added on image url: " + url );
            }).catch((error) => {
              // Uh-oh, an error occurred!
            });

            //Update meta data for firebase storage resources - End

        db.collection("Products").doc(productID).update({
            // console.log('inside db collection: ' + newEventID);
            // EventId: newEventID,
            ProductImageURL: ImgUrl,
            UpdatedBy: auth.currentUser.email,
            UpdatedTimestamp: (new Date()).toString()
          })
          .then(function(docRef)  {
            document.getElementById("upload").disabled = true;

            console.log("Data added sucessfully in the document: " + productID);
            console.log("eventstart")
            window.location.href="updateProduct.html"
            // console.log(Date.parse(eventstart))
          })
          .catch(function(error)  {
            console.error("error adding document:", error);
          });

      });
    });
}

//************* Create & Update Event Data - End ******************
