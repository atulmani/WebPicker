//const productID = document.getElementById('productID');
var userID = "";


auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      UpdateDeliveryDate();
      GetDeliveryAddress();

      getCartSummary();
      //      populateAddress(addressID);

    } else {
      console.log('User has been logged out');
      // const functions = require("firebase-functions");
      // functions.logger.log("Hello from info. Here's an object:", someObj);
      window.location.href = "index.html";

    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function UpdateDeliveryDate() {
  const tempDate = new Date();
  console.log(tempDate.toLocaleDateString());

  tempDate.setDate(tempDate.getDate() + 1);

  //set for 1
  document.getElementById("delDate1").value = tempDate.toLocaleDateString();
  document.getElementById('delDateSpan1').innerHTML = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);

  document.getElementById("delDate2").value = tempDate.toLocaleDateString();
  document.getElementById('delDateSpan2').innerHTML = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);

  document.getElementById("delDate3").value = tempDate.toLocaleDateString();
  document.getElementById('delDateSpan3').innerHTML = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);

  document.getElementById("delDate4").value = tempDate.toLocaleDateString();
  document.getElementById('delDateSpan4').innerHTML = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);

  document.getElementById("delDate5").value = tempDate.toLocaleDateString();
  document.getElementById('delDateSpan5').innerHTML = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);

  document.getElementById("delDate6").value = tempDate.toLocaleDateString();
  document.getElementById('delDateSpan6').innerHTML = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);

  document.getElementById("delDate7").value = tempDate.toLocaleDateString();
  document.getElementById('delDateSpan7').innerHTML = tempDate.toLocaleDateString();

}

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
    .catch((error) => {
      // An error occurred
      console.log(error.message);
    });
};

function GetDeliveryAddress() {
  var addressList = [];
  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      console.log(doc.data());
      addressList = doc.data().AddressList;

      selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
      if (selIndex >= 0) {

        document.getElementById("branchID").value = addressList[selIndex].branchID;
        document.getElementById("branch").innerHTML = addressList[selIndex].branchName;
        console.log(addressList[selIndex].addressLine1);
        console.log(addressList[selIndex].addressLine2);
        console.log(addressList[selIndex].city);
        console.log(addressList[selIndex].ZipCode);
        console.log(addressList[selIndex].PhoneNumber);

        document.getElementById("address").innerHTML = addressList[selIndex].addressLine1 + ", " +
          addressList[selIndex].addressLine2 + ", " +
          addressList[selIndex].city + " - " +
          addressList[selIndex].ZipCode + "(ph : " + addressList[selIndex].PhoneNumber + ")";
      }
    }
  });

}
var cartDetails = [];
var addressList = [];
var selectedAddress;
var orderDetails = [];
var message = "";
var iError = 0;

async function getCartDetails() {
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('get cart details');
      cartDetails = doc.data().cartDetails;
    } else {
      message = "cart is empty, add to cart";
      iError = 1;
      console.log("cart is empty, add to cart");
    }
  });
  return message;
}

async function getAddress() {
  const snapshotAddress = db.collection('AddressList').doc(userID);
  snapshotAddress.get().then(async (adoc) => {
    if (adoc.exists) {
      console.log('if address exists');
      addressList = adoc.data().AddressList;
      var selIndex = -1;
      selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
      if (selIndex >= 0) {
        selectedAddress = addressList[selIndex];
        console.log('if address selected');
      } else {
        message = message + "Select Address";
        iError = 2;
      }
    } else {
      message = message + "Add Address";
      iError = 3;

      console.log("Add Address");
    }
  });
  return message;
}

function SaveOrder() {

  var orderDetails = [];
  var message = "";
  var iError = 0;
  console.log('SaveOrder');
  getCartDetails()
    .then(async (message) => {
      getAddress()
      .then(async (message) =>{

          var deliveryDate = '';

          if (document.getElementById("delDate1").checked) {
            deliveryDate = document.getElementById("delDate1").value;
          } else if (document.getElementById("delDate2").checked) {
            deliveryDate = document.getElementById("delDate2").value;
          } else if (document.getElementById("delDate3").checked) {
            deliveryDate = document.getElementById("delDate3").value;
          } else if (document.getElementById("delDate4").checked) {
            deliveryDate = document.getElementById("delDate4").value;
          } else if (document.getElementById("delDate5").checked) {
            deliveryDate = document.getElementById("delDate5").value;
          } else if (document.getElementById("delDate6").checked) {
            deliveryDate = document.getElementById("delDate6").value;
          } else if (document.getElementById("delDate7").checked) {
            deliveryDate = document.getElementById("delDate7").value;
          }
          var deliveryTime = '';
          if (document.getElementById("delTime1").checked) {
            deliveryTime = document.getElementById("delTime1").value;
          } else if (document.getElementById("delTime2").checked) {
            deliveryTime = document.getElementById("delTime2").value;
          } else if (document.getElementById("delTime3").checked) {
            deliveryTime = document.getElementById("delTime3").value;
          } else if (document.getElementById("delTime4").checked) {
            deliveryTime = document.getElementById("delTime4").value;
          }

          var paymentOption = "";
          if (document.getElementById("PayOption1").checked) {
            paymentOption = document.getElementById("PayOption1").value;
          } else if (document.getElementById("PayOption2").checked) {
            paymentOption = document.getElementById("PayOption2").value;
          } else if (document.getElementById("PayOption3").checked) {
            paymentOption = document.getElementById("PayOption3").value;
          }

          var prize = document.getElementById("totalAmount").innerHTML;
          var itemCount = document.getElementById("itemCount").innerHTML;
          const snapshotOrder = db.collection('OrderDetails').doc(userID);
          console.log("before insert");
          snapshotOrder.get().then(async (aOrder) => {
            if (aOrder.exists) {
              console.log('if order exists');
              orderDetails = aOrder.data().OrderDetails;
            }
            orderDetails.push({
              orderID: 'Ord-' + userID + Date.now(),
              orderItems: cartDetails,
              totalItems: itemCount,
              totalAmount: prize,
              deliveryAddress: selectedAddress,
              deliveryDate: deliveryDate,
              deliveryTime: deliveryTime,
              paymentOption: paymentOption,
              paymentStatus: 'Pending',
              orderStatus: 'Pending',
              orderDate: (new Date()).toString(),
              orderBy: userID

            });

            console.log('insert order');
            db.collection('OrderDetails')
              .doc(userID)
              .set({
                OrderDetails: orderDetails,
                CreatedBy: auth.currentUser.email,
                CreatedTimestamp: (new Date()).toString(),
                UpdatedBy: '',
                UpdatedTimestamp: ''
              })
              .then((docRef) => {
                console.log("Data added sucessfully in the document: ");
                //showAddress(false);
                //delete from cart after order places
                cartDetails = [];
                db.collection('CartDetails')
                  .doc(userID)
                  .update({
                    cartDetails: cartDetails
                  })
                  .then((docred) => {
                    console.log('cart details made blank');

                  });

                // console.log(Date.parse(eventstart))
              })
              .catch((error) => {
                console.log(error);
                //  console.error("error adding document:", error.message);
              });

          });
      });
      console.log("after address");
    })
    .finally()
    {
      console.log("in finally");
    };
    window.location.href = "orderList.html";

}
/*
function SaveOrder1() {
  var cartDetails = [];
  var addressList = [];
  var selectedAddress;
  var orderDetails = [];
  console.log('SaveOrder');
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('get cart details');
      cartDetails = doc.data().cartDetails;
    }

    const snapshotAddress = db.collection('AddressList').doc(userID);
    snapshotAddress.get().then(async (adoc) => {
        if (adoc.exists) {
          console.log('if address exists');
          addressList = adoc.data().AddressList;
          var selIndex = -1;
          selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
          if (selIndex >= 0) {
            selectedAddress = addressList[selIndex];
            console.log('if address selected');
            //save orders
            //get delivery timeout
            var deliveryDate = '';

            if (document.getElementById("delDate1").checked) {
              deliveryDate = document.getElementById("delDate1").value;
            } else if (document.getElementById("delDate2").checked) {
              deliveryDate = document.getElementById("delDate2").value;
            } else if (document.getElementById("delDate3").checked) {
              deliveryDate = document.getElementById("delDate3").value;
            } else if (document.getElementById("delDate4").checked) {
              deliveryDate = document.getElementById("delDate4").value;
            } else if (document.getElementById("delDate5").checked) {
              deliveryDate = document.getElementById("delDate5").value;
            } else if (document.getElementById("delDate6").checked) {
              deliveryDate = document.getElementById("delDate6").value;
            } else if (document.getElementById("delDate7").checked) {
              deliveryDate = document.getElementById("delDate7").value;
            }
            var deliveryTime = '';
            if (document.getElementById("delTime1").checked) {
              deliveryTime = document.getElementById("delTime1").value;
            } else if (document.getElementById("delTime2").checked) {
              deliveryTime = document.getElementById("delTime2").value;
            } else if (document.getElementById("delTime3").checked) {
              deliveryTime = document.getElementById("delTime3").value;
            } else if (document.getElementById("delTime4").checked) {
              deliveryTime = document.getElementById("delTime4").value;
            }

            var paymentOption = "";
            if (document.getElementById("PayOption1").checked) {
              paymentOption = document.getElementById("PayOption1").value;
            } else if (document.getElementById("PayOption2").checked) {
              paymentOption = document.getElementById("PayOption2").value;
            } else if (document.getElementById("PayOption3").checked) {
              paymentOption = document.getElementById("PayOption3").value;
            }

            var prize = document.getElementById("totalAmount").innerHTML;
            var itemCount = document.getElementById("itemCount").innerHTML;
            const snapshotOrder = db.collection('OrderDetails').doc(userID);


          }

      }


    });
  }
    else {
      console.log('please select address');
      //go to address
    }


  });
  else {
    //go to add address
    console.log('nned to add adress');
  }


});

});


}
*/
function getCartSummary() {
  var arr = [];
  var prise = 0;

  console.log(userID);
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {

      //  console.log(doc.id);
      cartItems = doc.data().cartDetails;


      console.log(cartItems);
      for (var i = 0; i < cartItems.length; i++) {
        arr.push(cartItems[i].ProductID);
      }
      var parr = [];
      console.log(arr);
      if (arr != null && arr.length > 0) {
        db.collection('Products').where("__name__", 'in', arr)
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
            var len = cartItems.length;
            document.getElementById('itemCount').innerHTML = len;
            document.getElementById('totalAmount').innerHTML = prise;
            document.getElementById('CartitemCount').innerHTML = len;
          });
      } else {
        document.getElementById('itemCount').innerHTML = '0';
        document.getElementById('totalAmount').innerHTML = '0';
        document.getElementById('CartitemCount').innerHTML ='0';
      }
    }

  });
}
