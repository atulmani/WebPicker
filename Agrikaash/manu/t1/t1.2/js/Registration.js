//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      GetRegistrationRequest();

    } else {
      console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});


function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function GetRegistrationRequest() {
  console.log(userID);
  const snapshot = db.collection('UserRequest').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      console.log(doc.data());
      var displayName = doc.data().displayName;
      var userEmail = doc.data().EmailID;
      var address = doc.data().Address;
      var CustomerType = doc.data().CustomerType;
      var DateOfBirth = doc.data().DateOfBirth;
      var IDNo = doc.data().IDNo;
      var IDType = doc.data().IDType;
      var phone = doc.data().Phone;
      var profileImageURL = doc.data().ProfileImageURL;
      var userRole = doc.data().UserRole;

      document.getElementById('userName').innerHTML = displayName;
      document.getElementById('userEmail').innerHTML = userEmail;
      document.getElementById('userPhone').innerHTML = phone;
      document.getElementById('myimg').src = profileImageURL;
      document.getElementById('txtCity').value = address;
      document.getElementById('navUser').src = profileImageURL;

      var userType1 = document.getElementById("userType1");
      var userType2 = document.getElementById("userType2");

      //for (i = 0; i < userTypeCnt.options.length; i++) {
      if (userRole.findIndex(e => e.text === document.getElementById('userType1Text').innerHTML) >= 0)
        userType1.checked = true;
      if (userRole.findIndex(e => e.text === document.getElementById('userType2Text').innerHTML) >= 0)
        userType2.checked = true;


      var userCat = document.getElementById('customerType');
      for (i = 0; i < userCat.options.length; i++) {
        if (CustomerType === userCat.options[i].text)
          userCat.options[i].selected = true;
        else
          userCat.options[i].selected = false;
      }


      var IDTypeCnt = document.getElementById('IDType');
      for (i = 0; i < IDTypeCnt.options.length; i++) {
        if (IDType === IDTypeCnt.options[i].text)
          IDTypeCnt.options[i].selected = true;
        else
          IDTypeCnt.options[i].selected = false;
      }

      document.getElementById('txtID').value = IDNo


    }
  });
}

function SaveDetails() {

  //e.preventDefault();
  var userType = [];
  var uType = document.getElementById("userType");
  console.log(uType);
  for (i = 0; i < uType.options.length; i++) {
    if (uType.options[i].selected)

      userType.push({
        text: uType.options[i].text,
        value: uType.options[i].value
      });
  }
  var ocustomerType = document.getElementById("customerType");
  var customerType = ocustomerType.options[ocustomerType.selectedIndex].value;

  var oIDType = document.getElementById("IDType");
  var IDType = oIDType.options[oIDType.selectedIndex].value;
  console.log(IDType);
  console.log(document.getElementById('txtCity').value);
  console.log(userID);
  console.log(document.getElementById('txtID').value);
  console.log(userType);
  console.log(customerType);
  db.collection('UserRequest')
    .doc(userID)
    .update({
      DateOfBirth: '',
      Address: document.getElementById('txtCity').value,
      IDType: IDType,
      IDNo: document.getElementById('txtID').value,
      UserRole: userType,
      CustomerType: customerType
    })
    .then(() => {
      //saved successfully
    })
    .catch(function(error) {
      console.log("in error");
      // document.getElementById('errorMessage').innerHTML = error.message;
      // document.getElementById('errorMessage').style.display = 'block';
    });

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
//************ File Upload to Cloud Storage  ****************
document.getElementById('upload').onclick = function() {
  // ImgName = document.getElementById('namebox').value;
  //  productID = document.getElementById('hfproductID').value;

  ImgName = userID + '.png';
  console.log(ImgName);
  // ImgName = document.getElementById('productID').value + '_1.png';
  //files = document.getElementById("myimg").src;

  var uploadTask = firebase.storage().ref('UserProfile/' + ImgName).put(files[0]);

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
        console.log(userID);
        db.collection("UserRequest").doc(userID).update({
            // console.log('inside db collection: ' + newEventID);
            // EventId: newEventID,
            ProfileImageURL: ImgUrl
          })
          .then(function(docRef) {
            document.getElementById("upload").disabled = true;
            document.getElementById("navUser").src=url;  
            console.log("Data added sucessfully in the document: " + userID);

          })
          .catch(function(error) {
            console.error("error adding document:", error);
          });

      });
    });
}

//************* Create & Update Event Data - End ******************
