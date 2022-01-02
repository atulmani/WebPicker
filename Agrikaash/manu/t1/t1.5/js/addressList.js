//const productID = document.getElementById('productID');
var userID = "";
var addressList = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      populateAddressList();
      //populateCartData();
      getCartItemNo();
    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        document.getElementById('profileName').innerHTML =  doc.data().displayName;

      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });
};

// function showAddress(flag) //true if add address to be shown,false if existing addrsss list to be shown
// {
//   console.log("in showAddress", flag);
//   var addAddress = document.getElementById('AddAddress');
//   var addressList = document.getElementById('addressListDiv');
//   var addressBtn = document.getElementById('addAddressBtn');
//   if (flag === true) {
//     addAddress.setAttribute('style', 'display:block;');
//     addressList.setAttribute('style', 'display:none;');
//     addressBtn.setAttribute('style', 'display:none');
//
//   } else {
//     console.log("in else");
//     addAddress.setAttribute('style', 'display:none;');
//     addressList.setAttribute('style', 'display:block;');
//     addressBtn.setAttribute('style', 'display:block');
//   }
// }

function saveAddress() {
  console.log('in save address1');
  addressList = [];
  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    console.log('check');
    if (doc.exists) {
      console.log("testing");
      //  console.log(doc.id);
      addressList = doc.data().AddressList;

      for (i = 0; i < addressList.length; i++) {
        addressList[i].addressSelected = 'NO';
      }

    }
  });
  console.log('before insert');
  branchID = document.getElementById("branchID");
  branchName = document.getElementById("branchName");
  branchOwnerName = document.getElementById("branchOwnerName");
  addressLine1 = document.getElementById("addressLine1");
  addressLine2 = document.getElementById("addressLine2");
  city = document.getElementById("City");
  ZipCode = document.getElementById("ZipCode");
  PhoneNumber = document.getElementById("PhoneNumber");
  //addressSelected = document.getElementById("PhoneNumber");
  console.log("branchName : ", branchName);
  console.log(branchName.value);
  if (branchID.value === "") {
    branchID = userID + Date.now();
    console.log(branchID);
    addressList.push({
      addressSelected: 'YES',
      branchID: branchID,
      branchName: branchName.value,
      branchOwnerName: branchOwnerName.value,
      addressLine1: addressLine1.value,
      addressLine2: addressLine2.value,
      city: city.value,
      ZipCode: ZipCode.value,
      PhoneNumber: PhoneNumber.value
    });

  }
  console.log(addressList);
  db.collection('AddressList')
    .doc(userID)
    .set({
      AddressList: addressList,
      CreatedBy: auth.currentUser.email,
      CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      UpdatedBy: '',
      UpdatedTimestamp: ''
    })
    .then(function(docRef) {
      console.log("Data added sucessfully in the document: ");
      populateAddressList();
      //showAddress(false);
      // console.log(Date.parse(eventstart))
    })
    .catch(function(error) {
      //  console.error("error adding document:", error.message);
    });


  //});
}

function AddAddress() {
  window.location.href = "createAddress.html";
}


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function populateAddressList() {
  var flag = true;
  var maindiv = document.getElementById("addressListDiv")
  removeAllChildNodes(maindiv);

  const cartItemsDB = db.collection("AddressList").doc(userID);
  cartItemsDB.get().then((doc1) => {
    if (doc1.exists) {
      console.log(doc1.data());
      addressList = doc1.data().AddressList;
      console.log(addressList);
      for (i = 0; i < addressList.length; i++) {
        flag = false;
        renderAddressList(addressList[i], i);

      }
      //showAddress(flag);
      // var addressList = document.getElementById('addressListDiv');
      // addressList.setAttribute('display', 'block;');
      //
      // var AddAddress = document.getElementById('AddAddress');
      // addressList.setAttribute('display', 'none;');

    }

    document.getElementById('loading').style.display = 'none';
  });


}

function renderAddressList(item, index) {
  console.log(item);
  console.log(item.branchName);
  var div1 = document.createElement("div");
  div1.setAttribute('class', 'col-sm-12');

  var div1_1 = document.createElement("div");
  div1_1.setAttribute('class', 'address-card');

  var div1_1_1 = document.createElement("div");
  div1_1_1.setAttribute('class', '');

  var inp1 = document.createElement('input');
  inp1.setAttribute('type', "radio");
  inp1.setAttribute('id', "rbpreferedAddress" + index);
  inp1.setAttribute('value', item.branchName);

  inp1.setAttribute('name', "address");
  inp1.setAttribute('onchange', "OnSelectionChange(" + index + " )");
  console.log(item.addressSelected);
  if (item.addressSelected === 'YES') {
    console.log('on select', index);
    inp1.checked = true;
  } else {
    inp1.checked = false;
  }
  var h51 = document.createElement('h5');
  h51.innerHTML = item.branchName;
  var edit = document.createElement("i");
  edit.setAttribute('class', 'far fa-edit address-edit-icon');
  edit.setAttribute('onclick', "editform(" + "hfID" + index + ");");

  var hf = document.createElement("input");
  hf.setAttribute("type", "hidden");
  hf.setAttribute("id", "hfID" + index);
  hf.setAttribute("value", item.branchID);

  div1_1_1.appendChild(inp1);
  div1_1_1.appendChild(hf);
  div1_1_1.appendChild(h51);
  div1_1_1.appendChild(edit);
  var p1 = document.createElement('p');
  p1.setAttribute('style', 'font-weight:bold;');
  p1.innerHTML = item.branchOwnerName;


  var p2 = document.createElement('p');
  p2.innerHTML = item.addressLine1 + " ," + item.addressLine2 + " ," + item.city + " - " + item.ZipCode;

  var p3 = document.createElement('p');
  p3.innerHTML = "ph: " + item.PhoneNumber;

  var hr1 = document.createElement('hr');
  hr1.setAttribute('class', 'address-hr');

  var itemId = document.createElement("input");
  itemId.setAttribute("id", "addID" + index);
  itemId.setAttribute("type", "hidden");
  itemId.setAttribute("value", item.branchID);

  div1_1.appendChild(itemId);
  div1_1.appendChild(div1_1_1);
  div1_1.appendChild(p1);
  div1_1.appendChild(p2);
  div1_1.appendChild(p3);

  div1.appendChild(div1_1);
  div1.appendChild(hr1);
  document.getElementById("addressListDiv").appendChild(div1);

}

function getCartItemNo() {
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log("testing");
      var arr = [];

      //  console.log(doc.id);
      cartItems = doc.data().cartDetails;

      var prise = 0;
      //console.log(item);
      for (var i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i].ProductID);
        arr.push(cartItems[i].ProductID);
      }
      console.log(arr);
      //for (var i = 0; i < item.length; i++)
      {
        var parr = [];
        //const prodDetails = db.collection('Products').doc(item[i].ProductID);
        console.log(arr);
        if (arr != null && arr.length > 0) {
          db.collection('Products').where("__name__", 'in', arr)
            //const prodDetails = db.collection('Products').where ("__name__" , '==', 'O1RMEcLeeaHt9cXoAT33')
            .get()
            .then((psnapshot) => {
              psnapshot.forEach((doc) => {
                parr.push({
                  ProductID: doc.id,
                  ProductDetails: doc.data().ProductDetails
                });
              });
              for (i = 0; i < cartItems.length; i++) {
                var qty = cartItems[i].Quantity;
                var selectedsubItem = cartItems[i].SelectedsubItem;
                var weight = selectedsubItem.split('-');

                var selectedProduct = parr[parr.findIndex(e => e.ProductID === cartItems[i].ProductID)];
                if (selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
                  var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
                  prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
                }
              }
              cartItemCount.innerHTML = cartItems.length;
              document.getElementById('itemCount').innerHTML = cartItems.length;

              document.getElementById('Totalprise').innerHTML = prise;

            });
        } else {

          cartItemCount.innerHTML = 0;
          document.getElementById('itemCount').innerHTML = '0';

          document.getElementById('Totalprise').innerHTML = '0';
        }
      }
    }
  });

}

function editform(obj) {
  console.log(obj);
  window.location.href = "createAddress.html?addressid=" + obj.value;
}

function OnSelectionChange(index) {
  console.log("OnSelectionChange", index);
  var itemID = document.getElementById("addID" + index).value;
  console.log(itemID);

  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log("OnSelectionChange : testing");
      //  console.log(doc.id);
      addressList = doc.data().AddressList;


      for (i = 0; i < addressList.length; i++) {
        if (addressList[i].branchID === itemID) {
          addressList[i].addressSelected = 'YES';
        } else {
          addressList[i].addressSelected = 'NO';
        }
      }


      //update address list
      db.collection('AddressList')
        .doc(userID)
        .update({
          AddressList: addressList
        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: ");
          // console.log(Date.parse(eventstart))
        })
        .catch(function(error) {
          console.error("error adding document:", error.message);
        });
    }
  });
}
