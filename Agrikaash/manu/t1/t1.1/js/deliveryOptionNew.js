//const productID = document.getElementById('productID');
var userID = "";

var OrderItems = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      UpdateDeliveryDate();
      GetDeliveryAddress();
      createOrderItems();
      //getCartSummary();
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
    .catch(function(error)  {
      // An error occurred
      console.log(error.message);
    });
};


function UpdateDeliveryDate() {
  const tempDate = new Date();
  console.log(tempDate.toLocaleDateString());

  var delDate = document.getElementById('DeliveryDate');
  console.log(delDate);
  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[0].text = tempDate.toLocaleDateString();
  delDate.options[0].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[1].text = tempDate.toLocaleDateString();
  delDate.options[1].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[2].text = tempDate.toLocaleDateString();
  delDate.options[2].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[3].text = tempDate.toLocaleDateString();
  delDate.options[3].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[4].text = tempDate.toLocaleDateString();
  delDate.options[4].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[5].text = tempDate.toLocaleDateString();
  delDate.options[5].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[6].text = tempDate.toLocaleDateString();
  delDate.options[6].value = tempDate.toLocaleDateString();

}

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
      //console.log('get cart details');
      cartDetails = doc.data().cartDetails;
      if (cartDetails.length === 0) {
        message = "cart is empty, add to cart";
        iError = 1;
        console.log("cart is empty, add to cart");
      }
    } else {
      message = "cart is empty, add to cart";
      iError = 1;
      console.log("cart is empty, add to cart");
    }
  });
  console.log(message);
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
  console.log(message);
  return message;

}

function SaveOrder() {

  var orderDetails = [];
  var message = "";
  var iError = 0;
  console.log('SaveOrder');
  getCartDetails()
    .then(async (message) => {
      if (message === '') {
        console.log(message);
        getAddress()
          .then(async (message) => {

            var deliveryDate = '';
            var delDateObj = document.getElementById("DeliveryDate");
            deliveryDate = delDateObj.options[delDateObj.selectedIndex].value;
            console.log(deliveryDate);

            var deliveryTime = '';
            var delTimeObj = document.getElementById("DeliveryTime");
            deliveryTime = delTimeObj.options[delTimeObj.selectedIndex].value;

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

              var orderID = userID + Date.now();
              console.log(OrderItems);
              orderDetails.push({
                orderID: orderID,
                orderItems: OrderItems,//cartDetails,
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

              console.log(orderDetails);
              if (cartDetails.length > 0 && selectedAddress != null) {
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
                  .then(function(docRef)  {
                    console.log("Data added sucessfully in the document: ");
                    //showAddress(false);
                    //delete from cart after order places
                    cartDetails = [];
                    db.collection('CartDetails')
                      .doc(userID)
                      .update({
                        cartDetails: cartDetails
                      })
                      .then(function(docred)  {
                        console.log('cart details made blank');
                        window.location.href = "orderSummary.html?orderID=" + orderID;
                      });

                    // console.log(Date.parse(eventstart))
                  })
                  .catch(function(error)  {
                    console.log(error);
                    //  console.error("error adding document:", error.message);
                  });


              }
            });
          });

        console.log("after address");
      }
    });
  //window.location.href = "orderList.html";

}

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
        console.log('in else');
        document.getElementById('itemCount').innerHTML = '0';
        document.getElementById('totalAmount').innerHTML = '0';
        document.getElementById('CartitemCount').innerHTML = '0';
        document.getElementById('btnProceedToPay').disabled = true;
      }
    }

  });
}



function createOrderItems() {
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
              console.log(doc.data().ProductImageURL);
              parr.push({
                ProductID: doc.id,
                ProductDetails: doc.data().ProductDetails,
                productImageURL : doc.data().ProductImageURL,
                VegNonVeg :doc.data().VegNonVeg
              });
            });
            for (i = 0; i < cartItems.length; i++) {


              var qty = cartItems[i].Quantity;
              var selectedsubItem = cartItems[i].SelectedsubItem;
              var weight = selectedsubItem.split('-');
              var selectedProduct = parr[parr.findIndex(e => e.ProductID === cartItems[i].ProductID)];
              var unitPrise = 0;
              var MRP = 0;
              var sellPrize = 0;
              if (selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
                var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
                prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
                MRP = unitPrise.ProductMRP;
                sellPrize = unitPrise.ProductFinalPrise;
              }
              console.log(selectedProduct);
              OrderItems.push({
                ProductID: cartItems[i].ProductID,
                ProductName: cartItems[i].ItemName,
                SelectedSubItem: cartItems[i].SelectedsubItem,
                ImageURL: selectedProduct.productImageURL,
                VegNonVeg : selectedProduct.VegNonVeg,
                UnitPrise: sellPrize,
                MRP: MRP,
                Quantity: cartItems[i].Quantity
              });
            }

            console.log(OrderItems);
            var len = cartItems.length;
            document.getElementById('itemCount').innerHTML = len;
            document.getElementById('totalAmount').innerHTML = prise;
            document.getElementById('CartitemCount').innerHTML = len;
          });
      } else {
        console.log('in else');
        document.getElementById('itemCount').innerHTML = '0';
        document.getElementById('totalAmount').innerHTML = '0';
        document.getElementById('CartitemCount').innerHTML = '0';
        document.getElementById('btnProceedToPay').disabled = true;
      }
    }

  });
}
