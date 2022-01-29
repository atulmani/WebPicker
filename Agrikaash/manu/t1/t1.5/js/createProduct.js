//const productID = document.getElementById('productID');
var count = 0;
var pID;

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);

      GetProfileData(firebaseUser);

    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login/index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;

        }
      }
      db.collection('CollectionStatistics').get().then((changes) => {
        changes.forEach(change => {
          count = change.data().ProductCount;
          count = count + 1;
          pID = change.id;
        });
      });

    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });



};

//************* Populate Event Data - Starts ******************

// var url = location.href;
let eventDocUrl = new URL(location.href);
let searchParams = new URLSearchParams(eventDocUrl.search);
var productID = searchParams.get('id');
// var userid = searchParams.get('usertid');
document.getElementById("productName").focus();

if (productID != null) {

  document.getElementById('imgDiv').style.display = 'block';

  var obj = document.getElementById('hfproductID');
  //console.log(obj);
  document.getElementById('hfproductID').value = productID;
  //  console.log(document.getElementById('hfproductID').value);
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
      if (productTypeValue != undefined) {
        var productType = document.getElementById('productType');
        for (var i = 0; i < productType.options.length; i++) {
          if (productType.options[i].value == productTypeValue) {
            productType.options[i].selected = true;
          }
        }

      }

      var productLocationValue = doc.data().ProductLocation;
      if (productLocationValue != undefined) {
        var locationCity = document.getElementById('locationCity');
        for (var i = 0; i < locationCity.options.length; i++) {
          if (locationCity.options[i].value == productLocationValue) {
            locationCity.options[i].selected = true;
          }
        }

      }


      if (customerBusinessType != undefined) {
        if (customerBusinessType === 'All')
          document.getElementById("All").checked = true;
        else if (customerBusinessType === 'Small')
          document.getElementById("Small").checked = true;
        else if (customerBusinessType === 'Medium')
          document.getElementById("Medium").checked = true;
        else if (customerBusinessType === 'Large')
          document.getElementById("Large").checked = true;
      }


      document.getElementById("hfproductID").value = doc.data().id;
      document.getElementById("productName").value = doc.data().ProductName;
      document.getElementById("brand").value = doc.data().Brand;
      var vegNonVeg = doc.data().VegNonVeg;
      console.log("vegNonVeg", vegNonVeg);

      if (vegNonVeg === "Veg") {
        document.getElementById("Veg").checked = true;
      } else if (vegNonVeg === "NonVeg") {
        document.getElementById("NonVeg").checked = true;
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
        if(productDetails[0].ProductPurchasePrice === undefined)
          document.getElementById("purchasePrice1").value = productDetails[0].ProductFinalPrise;
        else
          document.getElementById("purchasePrice1").value = productDetails[0].ProductPurchasePrice;
      }
      if (productDetails[1] != null) {
        document.getElementById("row2").style.display = "block";
        document.getElementById("productWeight2").value = productDetails[1].ProductWeight;
        document.getElementById("productMRP2").value = productDetails[1].ProductMRP;
        document.getElementById("productFinalPrise2").value = productDetails[1].ProductFinalPrise;

        if(productDetails[1].ProductPurchasePrice === undefined)
          document.getElementById("purchasePrice2").value = productDetails[1].ProductFinalPrise;
        else
          document.getElementById("purchasePrice2").value = productDetails[1].ProductPurchasePrice;
      }

      if (productDetails[2] != null) {

        document.getElementById("row3").style.display = "block";
        document.getElementById("productWeight3").value = productDetails[2].ProductWeight;
        document.getElementById("productMRP3").value = productDetails[2].ProductMRP;
        document.getElementById("productFinalPrise3").value = productDetails[2].ProductFinalPrise;

        if(productDetails[2].ProductPurchasePrice === undefined)
          document.getElementById("purchasePrice3").value = productDetails[2].ProductFinalPrise;
        else
          document.getElementById("purchasePrice3").value = productDetails[2].ProductPurchasePrice;
      }

      if (productDetails[3] != null) {

        document.getElementById("row4").style.display = "block";
        document.getElementById("productWeight4").value = productDetails[3].ProductWeight;
        document.getElementById("productMRP4").value = productDetails[3].ProductMRP;
        document.getElementById("productFinalPrise4").value = productDetails[3].ProductFinalPrise;
        if(productDetails[3].ProductPurchasePrice === undefined)
          document.getElementById("purchasePrice4").value = productDetails[3].ProductFinalPrise;
        else
          document.getElementById("purchasePrice4").value = productDetails[3].ProductPurchasePrice;
      }

      if (productDetails[4] != null) {

        document.getElementById("row5").style.display = "block";
        document.getElementById("btnAddMore").disabled = "true";
        document.getElementById("productWeight5").value = productDetails[4].ProductWeight;
        document.getElementById("productMRP5").value = productDetails[4].ProductMRP;
        document.getElementById("productFinalPrise5").value = productDetails[4].ProductFinalPrise;
        if(productDetails[4].ProductPurchasePrice === undefined)
          document.getElementById("purchasePrice5").value = productDetails[4].ProductFinalPrise;
        else
          document.getElementById("purchasePrice5").value = productDetails[4].ProductPurchasePrice;
      }
      document.getElementById("myimg").src = doc.data().ProductImageURL;
      //console.log(doc.data().ProductImageURL);
    }
  });
}

//************* Populate Event Data - Ends ******************

//************* Create & Update Event Data - Starts ******************

function addRows() {
  var row2 = document.getElementById("row2");
  var row3 = document.getElementById("row3");
  var row4 = document.getElementById("row4");
  var row5 = document.getElementById("row5");

  if (row2.style.display === "none") {
    var productWeight1 = document.getElementById("productWeight1").value;
    var productMRP1 = document.getElementById("productMRP1").value;
    var productFinalPrise1 = document.getElementById("productFinalPrise1").value;
    console.log('add row');
    if (productWeight1 != '' && productMRP1 != '' && productFinalPrise1 != '') {
      row2.style.display = "block";
      // console.log('add row1');
    } else {
      // console.log('add row2');
    }
  } else if (row3.style.display === "none") {
    row3.style.display = "block";
  } else if (row4.style.display === "none") {
    row4.style.display = "block";
  } else if (row5.style.display === "none") {
    row5.style.display = "block";
    document.getElementById("btnAddMore").disabled = "true";
  }
}

function CreateUpdateProductData() {
  console.log('CreateUpdateProductData');

  var docCount = 0;
  db.collection('Products').get().then((snapshot) => {
    docCount = snapshot.size;
    console.log('Snapshot Size: ' + docCount);

    //var productID = document.getElementById("productID").value;
    var productType = document.getElementById("productType");
    var customerBusinessTypeValue = "";
    //BusinessType.options[BusinessType.selectedIndex].value;
    if (document.getElementById("All").checked)
      customerBusinessTypeValue = "All";
    else if (document.getElementById("Small").checked)
      customerBusinessTypeValue = "Small";
    else if (document.getElementById("Medium").checked)
      customerBusinessTypeValue = "Medium";
    else if (document.getElementById("Large").checked)
      customerBusinessTypeValue = "Large";

    var productLocation = document.getElementById("locationCity");
    var productLocationValue = productLocation.options[productLocation.selectedIndex].value;

    var productTypeValue = productType.options[productType.selectedIndex].value;
    var productName = document.getElementById("productName").value;
    var brand = document.getElementById("brand").value;
    var vegNonVeg = "";
    if (document.getElementById("Veg").checked) {
      vegNonVeg = "Veg";
    } else if (document.getElementById("NonVeg").checked) {
      vegNonVeg = "NonVeg";
    }
    console.log(vegNonVeg);
    var minimumQty = document.getElementById("minimumQty").value;
    var maximumQty = document.getElementById("maximumQty").value;
    var stepQty = document.getElementById("stepQty").value;
    var flag = false;
    var productDetails = [];
    if (document.getElementById("productWeight1").value != "" &&
      document.getElementById("productMRP1").value != "" &&
      document.getElementById("productFinalPrise1").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight1").value,
        ProductMRP: document.getElementById("productMRP1").value,
        ProductFinalPrise: document.getElementById("productFinalPrise1").value,
        ProductPurchasePrice: document.getElementById("purchasePrice1").value
      });
      flag = true
    }
    if (document.getElementById("productWeight2").value != "" &&
      document.getElementById("productMRP2").value != "" &&
      document.getElementById("productFinalPrise2").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight2").value,
        ProductMRP: document.getElementById("productMRP2").value,
        ProductFinalPrise: document.getElementById("productFinalPrise2").value,
        ProductPurchasePrice: document.getElementById("purchasePrice2").value
      });
      flag = true;
    }

    if (document.getElementById("productWeight3").value != "" &&
      document.getElementById("productMRP3").value != "" &&
      document.getElementById("productFinalPrise3").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight3").value,
        ProductMRP: document.getElementById("productMRP3").value,
        ProductFinalPrise: document.getElementById("productFinalPrise3").value,
        ProductPurchasePrice: document.getElementById("purchasePrice3").value
      });
      flag = true;
    }

    if (document.getElementById("productWeight4").value != "" &&
      document.getElementById("productMRP4").value != "" &&
      document.getElementById("productFinalPrise4").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight4").value,
        ProductMRP: document.getElementById("productMRP4").value,
        ProductFinalPrise: document.getElementById("productFinalPrise4").value,
        ProductPurchasePrice: document.getElementById("purchasePrice4").value
      });
      flag = true;
    }

    if (document.getElementById("productWeight5").value != "" &&
      document.getElementById("productMRP5").value != "" &&
      document.getElementById("productFinalPrise5").value != "") {
      productDetails.push({
        ProductWeight: document.getElementById("productWeight5").value,
        ProductMRP: document.getElementById("productMRP5").value,
        ProductFinalPrise: document.getElementById("productFinalPrise5").value,
        ProductPurchasePrice: document.getElementById("purchasePrice5").value
      });
      flag = true;
    }
    var ProductImageURL = document.getElementById("myimg").src;

    if (flag === true) {


      if (productID != null && productID != '') {
        db.collection("Products").doc(productID).update({
            CustomerBusinessType: customerBusinessTypeValue,
            productType: productTypeValue,
            ProductName: productName,
            Brand: brand,
            VegNonVeg: vegNonVeg,
            MinimumQty: minimumQty,
            MaximumQty: maximumQty,
            StepQty: stepQty,
            ProductLocation: productLocationValue,
            ProductDetails: productDetails,
            ProductImageURL: ProductImageURL,
            Status: 'Active',
            CreatedBy: auth.currentUser.email,
            CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            UpdatedBy: '',
            UpdatedTimestamp: ''
          })
          .then((docRef) => {
            console.log("Data added sucessfully in the document: ");
            console.log("eventstart")
            ProductDetailsAuditLog(productID, productDetails);
            // console.log(Date.parse(eventstart))
          })
          .catch((error) => {
            console.error("error adding document:", error);
          });
      } else {


        db.collection("Products").add({
            // console.log('inside db collection: ' + newEventID);
            ProductId: docCount + 1,
            CustomerBusinessType: customerBusinessTypeValue,
            productType: productTypeValue,
            ProductName: productName,
            Brand: brand,
            VegNonVeg: vegNonVeg,
            MinimumQty: minimumQty,
            MaximumQty: maximumQty,
            StepQty: stepQty,
            ProductLocation: productLocationValue,
            ProductDetails: productDetails,
            ProductImageURL: ProductImageURL,
            Status: 'Active',
            CreatedBy: auth.currentUser.email,
            CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            UpdatedBy: '',
            UpdatedTimestamp: ''
          })
          .then(function(docRef) {
            console.log("Data added sucessfully in the document: " + docRef.id);
            document.getElementById('hfproductID').value = docRef.id;
            console.log("eventstart");

            ProductDetailsAuditLog(docRef.id, productDetails);
            //add in CollectionStatistics

            console.log(pID);
            console.log(count);
            db.collection("CollectionStatistics").doc(pID).set({
                ProductCount: count,
              })
              .then(function(docRef) {
                // console.log(Date.parse(eventstart))
              })
              .catch(function(error) {
                console.error("error adding document:", error);
              });

            // console.log(Date.parse(eventstart))
          })
          .catch(function(error) {
            console.error("error adding document:", error);
          });
      }
      document.getElementById("message").innerHTML = "Product details are succsessfully updated";
    } else {

      document.getElementById("message").innerHTML = "Please enter all details to update";
    }
  });

}

function ProductDetailsAuditLog(docid, ProductDetails) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const snapshot = db.collection('ProductAuditLog').doc(docid);
  var today = new Date();
  today = today.toLocaleDateString("en-US", options);
  var flagExists = false;
  var productDetailsLog = [];
  var productDetailsLogChanged = [];
  var productDetails;
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log(doc.data());
      flagExists = true;
      productDetailsLog = doc.data().productDetailLog;


    }
    console.log(flagExists);
    if (flagExists === true) {
      for (index = 0; index < productDetailsLog.length; index++) {
        var cnt = productDetailsLog.findIndex(e => e.updatedDate === today);
        if (index != cnt) {
          productDetailsLogChanged.push(productDetailsLog[index]);
        }
      }
    }
    productDetailsLogChanged.push({
      updatedDate: today,
      FinalPrice: ProductDetails[0].ProductFinalPrise,
      MRP: ProductDetails[0].ProductMRP,
      ProductPurchasePrice : ProductDetails[0].ProductPurchasePrice,
      ProductWeight: ProductDetails[0].ProductWeight
    });
    if (flagExists === true) {
      db.collection("ProductAuditLog").doc(docid).update({
          productID: docid,
          productDetailLog: productDetailsLogChanged,
          UpdatedBy: auth.currentUser.email,
          UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),

        })
        .then((docRef) => {
          console.log("Data added sucessfully in the document: ");
          console.log("eventstart")
          // console.log(Date.parse(eventstart))
        })
        .catch((error) => {
          console.error("error adding document:", error);
        });
    } else {
      db.collection("ProductAuditLog")
      .doc(docid)
      .set({
          productID: docid,
          productDetailLog: productDetailsLogChanged,
          UpdatedBy: auth.currentUser.email,
          UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),

        })
        .then((docRef) => {
          console.log("Data added sucessfully in the document: ");
          console.log("eventstart")
          // console.log(Date.parse(eventstart))
        })
        .catch((error) => {
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

  // Hide alert after 3 seconds
  setTimeout(function() {
    createEventConformation.style.display = 'none';
  }, 3000);

  CreateUpdateProductData();

  document.getElementById('imgDiv').style.display = 'block';

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
if (productID === null || productID === '')
  productID = document.getElementById('hfproductID').value;

//************ File Upload to Cloud Storage  ****************
document.getElementById('upload').onclick = function() {
  // ImgName = document.getElementById('namebox').value;
  //  productID = document.getElementById('hfproductID').value;
  if (productID === null || productID === '')
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
        // alert('ImgUrl: ' + ImgUrl);
        alert("Image uploaded succsessfully");
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
            console.log("metadata added on image url: " + url);
          }).catch((error) => {
            // Uh-oh, an error occurred!
          });

        //Update meta data for firebase storage resources - End

        db.collection("Products").doc(productID).update({
            // console.log('inside db collection: ' + newEventID);
            // EventId: newEventID,
            ProductImageURL: ImgUrl,
            UpdatedBy: auth.currentUser.email,
            UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
          })
          .then(function(docRef) {
            document.getElementById("upload").disabled = true;

            console.log("Data added sucessfully in the document: " + productID);
            console.log("eventstart")
            window.location.href = "updateProduct.html"
            // console.log(Date.parse(eventstart))
          })
          .catch(function(error) {
            console.error("error adding document:", error);
          });

      });
    });
}

//************* Create & Update Event Data - End ******************
