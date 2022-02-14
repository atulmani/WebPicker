//const productID = document.getElementById('productID');
var userID = "";
var userName = "";
var OrderItems = [];
var userType = "";

var cartItems = [];
var cartLength = 0;
var ArrProduct = [];
var unitPrise = 0;
var prise = 0;
var totalPrize = 0;


auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(userID);
      GetProfileData(firebaseUser);
      console.log("after firebaseUser");
      UpdateDeliveryDate();
      console.log("after UpdateDeliveryDate");
      GetDeliveryAddress();

      GetCartList();
      getAllProducts();

      //createOrderItems();


      GetCouponDetails();

      //GetNotificationList();
      var siteNotification = localStorage.getItem("notificationCount");

      document.getElementById("notificationCnt").innerHTML = siteNotification;
      document.getElementById("notificationCnt1").innerHTML = siteNotification;
      console.log(siteNotification);
      document.getElementById('btnProceedToPay').removeAttribute("disabled");

      //getCartSummary();
      //      populateAddress(addressID);

    } else {
      console.log('User has been logged out');
      // const functions = require("firebase-functions");
      // functions.logger.log("Hello from info. Here's an object:", someObj);
      window.location.href = "../login/index.html";

    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});



function GetCartList() {
  console.log('GetCartList - Starts');

  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then((doc) => {
    if (doc.exists) {
      cartItems = doc.data().cartDetails;
      cartLength = cartItems.length;

      console.log('Cart Length', cartLength);
      console.log(cartItems);
      console.log('GetCartList - Ends');

      //GetProductList();

    }
  });
}


function getAllProducts() {

  DBrows = db.collection("Products").get();

  DBrows.then((changes) => {
    changes.forEach(change => {
      var obj = {};

      obj.productID = change.id;
      obj.productDetails = change.data();

      ArrProduct.push(obj);
    });

    //createOrderItems();
    getCartItemNo();

  });

}



function getCartItemNo() {
  console.log('in getCartItemNo');
  document.getElementById('itemCount').innerHTML = cartItems.length + ' Items';
  document.getElementById('cartItemNo').innerHTML = cartItems.length;
  prise = 0;
  for (i = 0; i < cartItems.length; i++) {
    var qty = cartItems[i].Quantity;
    var selectedsubItem = cartItems[i].SelectedsubItem;
    var weight = selectedsubItem.split('-');
    var index = ArrProduct.findIndex(e => e.productID === cartItems[i].ProductID);
    var selectedProduct = ArrProduct[index].productDetails;
    if (selectedProduct.ProductDetails != undefined && selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
      var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
      prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);

      var purchasePrice = 0;
      if(unitPrise.ProductPurchasePrice === undefined || unitPrise.ProductPurchasePrice === "")
      {
        purchasePrice = unitPrise.ProductFinalPrise;
      }
      else {
        purchasePrice = unitPrise.ProductPurchasePrice;
      }
     console.log(selectedProduct);
      console.log(cartItems[i]);
          OrderItems.push({
            ProductID: cartItems[i].ProductID,
            ProductName: cartItems[i].ItemName,
            SelectedSubItem: cartItems[i].SelectedsubItem,
            ImageURL: selectedProduct.ProductImageURL,
            VegNonVeg: selectedProduct.VegNonVeg,
            UnitPrise: unitPrise.ProductFinalPrise,
            MRP: unitPrise.ProductMRP,
            PurchasePrice : purchasePrice,
            Quantity: cartItems[i].Quantity
          });
          console.log(OrderItems);
    }

  }
  document.getElementById('hftotalAmount').value = prise;
  document.getElementById('hfdiscountedAmount').value = prise;

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  prise = prise.toLocaleString('en-IN', curFormat);

  document.getElementById("totalAmount").innerHTML = prise;

}

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userName = doc.data().displayName;
        userType = doc.data().CustomerType;
        if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        document.getElementById('profileName').innerHTML = doc.data().displayName;

        //  document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
        document.getElementById('EmailID').value = doc.data().EmailID;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });
};


function GetNotificationList() {
  var index = 0;
  var flag = false;
  var today = new Date();

  const DBrows = db.collection('Notification')
    .where("Status", '==', 'Active')
    .where('ValidityTill', ">=", today)
  //.orderBy('CreatedTimestamp', 'desc');

  DBrows.onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
      var userListDB = change.doc.data().UserList;
      var userTypeDB = change.doc.data().UserType;

      if (userListDB === undefined)
        flag = true;
      else if (userListDB[0].userID === 'All')
        flag = true;
      else if (userListDB.findIndex(e => e.userID === userID) >= 0)
        flag = true;
      else if (userTypeDB === undefined)
        flag = true;
      else if (userTypeDB[0] === 'All')
        flag = true;
      else if (userTypeDB.indexOf(userType) >= 0)
        flag = true;
      if (flag === true) {
        index = index + 1;
      }
    });

    if (flag === true) {
      document.getElementById("notificationCnt").innerHTML = index;
    }

  });
}

function GetCouponDetails() {
  //get coupon details
  //  var couponList = [];
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  var cnt = 0;
  var disText;
  console.log("in GetCouponDetails ");
  var userList = [];
  var couponDetails = document.getElementById("couponDetails");
  var today = new Date();
  DBrows = db.collection("Coupons")
    .where("Status", "==", 'Active')
    .where('ValidityTill', ">=", today)
    .get();
  var flag = false;
  DBrows.then((changes) => {
    changes.forEach(change => {
      userList = change.data().UserList;
      userTypeApplicable = change.data().UserType;
      console.log(userTypeApplicable);
      if (userTypeApplicable.includes(userType) || userTypeApplicable.includes('All')) {
        flag = true;
        var opt = document.createElement('option');
        opt.value = change.id;
        if (change.data().DiscountType === 'Percentage')
          disText = change.data().DiscountValue + " %";
        else
          disText =   Number(change.data().DiscountValue).toLocaleString('en-IN', curFormat);
        opt.innerHTML = disText;
        //couponDetails.appendChild(opt);
        cnt = Number(cnt) + 1;
        rendercoupon(cnt, change.data().Description, change.id, change.data().DiscountType, change.data().DiscountValue);


      } else {


        if (userList[0].userID === 'All') {
          flag = true;
          var opt = document.createElement('option');
          opt.value = change.id;
          if (change.data().DiscountType === 'Percentage')
            disText = change.data().DiscountValue + " %";
          else
            disText =  Number(change.data().DiscountValue).toLocaleString('en-IN', curFormat);
          opt.innerHTML = disText;
          //  couponDetails.appendChild(opt);
          cnt = Number(cnt) + 1;
          rendercoupon(cnt, change.data().Description, change.id, change.data().DiscountType, change.data().DiscountValue);

        }
        var index = userList.findIndex(e => e.userID === userID);
        if (index >= 0) {
          flag = true;
          var opt = document.createElement('option');
          opt.value = change.id;
          if (change.data().DiscountType === 'Percentage')
            disText = change.data().DiscountValue + " %";
          else
            disText = Number(change.data().DiscountValue).toLocaleString('en-IN', curFormat);
          opt.innerHTML = disText;
          //couponDetails.appendChild(opt);
          cnt = Number(cnt) + 1;
          rendercoupon(cnt, change.data().Description, change.id, change.data().DiscountType, change.data().DiscountValue);

        }
      }
    });
    console.log(flag);
    if (flag === false) {
      //couponDetails.style.display = "none";
      document.getElementById('nocoupons').style.display = 'block';
    } else {
      document.getElementById('couponListDiv').style.display = 'block';
      document.getElementById('divCoupon').style.display = 'block';
    }
  });

}

function rendercoupon(index, comments, couponID, discountType, discountValue) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var disText = "";
  if (discountType === 'Percentage')
    disText = discountValue + " %";
  else
    disText =  Number(discountValue).toLocaleString('en-IN', curFormat);

  console.log(disText);
  var divcoupon = document.getElementById("couponListDiv");

  var div1 = document.createElement("div");
  div1.setAttribute("class", "");

  var input1 = document.createElement("input");
  input1.setAttribute("type", "radio");
  input1.setAttribute("class", "checkbox");
  input1.setAttribute("onchange", "applyCouponNew(" + index + ");");

  input1.setAttribute("id", "coupon" + index);
  input1.setAttribute("name", "coupon");
  div1.appendChild(input1);

  var hf1 = document.createElement("input");
  hf1.setAttribute("type", "hidden");
  hf1.setAttribute("id", "hfDiscountType" + index);
  hf1.setAttribute("value", discountType);
  div1.appendChild(hf1);

  var hf2 = document.createElement("input");
  hf2.setAttribute("type", "hidden");
  hf2.setAttribute("id", "hfDiscountValue" + index);
  hf2.setAttribute("value", discountValue);
  div1.appendChild(hf2);

  var hf3 = document.createElement("input");
  hf3.setAttribute("type", "hidden");
  hf3.setAttribute("id", "hfCouponID" + index);
  hf3.setAttribute("value", couponID);
  div1.appendChild(hf3);

  var lable1 = document.createElement("label");
  lable1.setAttribute("class", "checkbox-label");
  lable1.setAttribute("id", "coupon_label" + index);
  lable1.setAttribute("for", "coupon" + index);
  lable1.setAttribute("style", "height: 55px;");


  var i1 = document.createElement("i");
  i1.setAttribute("class", "fas fa-plus");
  lable1.appendChild(i1);

  var i2 = document.createElement("i");
  i2.setAttribute("class", "fas fa-check");
  lable1.appendChild(i2);

  var span1 = document.createElement("span");
  span1.setAttribute("class", "coupon-heading");
  span1.innerHTML = "Get " + disText + " discount";
  lable1.appendChild(span1);

  var br1 = document.createElement("br");

  lable1.appendChild(br1);
  var small1 = document.createElement("small");
  small1.setAttribute("class", "coupon-detail");
  small1.innerHTML = comments;
  lable1.appendChild(small1);
  div1.appendChild(lable1);

  divcoupon.appendChild(div1);
}

function applyCouponNew(index) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  console.log(index);
  var disValue = document.getElementById("hfDiscountValue" + index);
  var disType = document.getElementById("hfDiscountType" + index);
  console.log(disValue.value);
  console.log(disType.value);
  var originalAmount = document.getElementById('hftotalAmount').value;
  var discountedAmount = 0;

  if (disType.value === 'Percentage') {
    var discountPercentage = disValue.value.trim();
    console.log(discountPercentage, originalAmount);
    discountedAmount = Number(originalAmount) - (Number(originalAmount) * Number(discountPercentage.trim())) / 100;
  } else {
    var discountAbsolute = disValue.value.trim();
    discountedAmount = (Number(originalAmount) - Number(discountAbsolute));;
  }

  document.getElementById("hfdiscountedAmount").value = discountedAmount;
  document.getElementById("totalAmount").innerHTML = "<span style='text-decoration:line-through;'>" + Number(originalAmount).toLocaleString('en-IN', curFormat) + "</span>" + "    " + Number(discountedAmount).toLocaleString('en-IN', curFormat);

}

function applyCoupon() {
  console.log("in applyCoupon");
  var originalAmount = document.getElementById('hftotalAmount').value;
  console.log(originalAmount);
  var discountedAmount = 0;
  var discount = document.getElementById('couponDetails');
  if (discount.selectedIndex > 0) {
    var discountText = discount.options[discount.selectedIndex].text;
    console.log(discountText);
    if (discountText.search("%") >= 0) //if percentage
    {
      var discountPercentage = discountText.replace(" %", "").trim();
      console.log(discountPercentage, originalAmount);
      discountedAmount = Number(originalAmount) - (Number(originalAmount) * Number(discountPercentage.trim())) / 100;
    } else //absolute discount
    {
      var discountAbsolute = discountText.replace("₹ ", "").trim();
      discountedAmount = (Number(originalAmount) - Number(discountAbsolute));
    }

    document.getElementById("hfdiscountedAmount").value = discountedAmount;
    document.getElementById("totalAmount").innerHTML = "<span style='text-decoration:line-through;'>" + Number(originalAmount).toLocaleString('en-IN', curFormat); + "</span>" + "    " + Number(discountedAmount).toLocaleString('en-IN', curFormat);;
  }

}

function UpdateDeliveryDate() {
  const tempDate = new Date();
  //console.log(tempDate.toLocaleDateString());

  var delDate = document.getElementById('DeliveryDate');
  //console.log(delDate);
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
  delDate.options[6].selected = true;

}

function GetDeliveryAddress() {
  var addressList = [];
  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      //console.log(doc.data());
      addressList = doc.data().AddressList;

      selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
      if (selIndex >= 0) {

        document.getElementById("branchID").value = addressList[selIndex].branchID;
        document.getElementById("branch").innerHTML = addressList[selIndex].branchName;
        // console.log(addressList[selIndex].addressLine1);
        // console.log(addressList[selIndex].addressLine2);
        // console.log(addressList[selIndex].city);
        // console.log(addressList[selIndex].ZipCode);
        // console.log(addressList[selIndex].PhoneNumber);

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

//function getCartDetails() {
function SaveOrder() {
  var btnTextWithLoader = document.getElementsByClassName('btnTextWithLoader');
  var btnLoader = document.getElementsByClassName('btnLoader');

  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      //console.log('get cart details');
      cartDetails = doc.data().cartDetails;
      if (cartDetails.length === 0) {
        message = "cart is empty, add to cart";
        iError = 1;
        document.getElementById("message").innerHTML = "Cart is empty";
        document.getElementById("message").style.display = "block";
        console.log("cart is empty, add to cart");
      } else {
        //Get Address Start
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
              SaveOrderinDB();
            } else {
              message = message + "Select Address";
              document.getElementById("message").innerHTML = "Please select address";
              document.getElementById("message").style.display = "block";
              iError = 2;
            }
          } else {
            message = message + "Add Address";

            document.getElementById("message").innerHTML = "Add delivery address";
            document.getElementById("message").style.display = "block";
            iError = 3;
            console.log("Add Address");
          }
        });

        //get address end
      }
    }
  });

  btnTextWithLoader[0].style.display = 'none';
  btnLoader[0].style.display = 'block';

  console.log(message);
  return message;
}
//
// function getAddress() {
//   const snapshotAddress = db.collection('AddressList').doc(userID);
//   console.log('in getAddress');
//   snapshotAddress.get().then(async (adoc) => {
//     if (adoc.exists) {
//       console.log('if address exists');
//       addressList = adoc.data().AddressList;
//       var selIndex = -1;
//       selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
//       if (selIndex >= 0) {
//         selectedAddress = addressList[selIndex];
//         console.log('if address selected');
//
//       } else {
//         message = message + "Select Address";
//         iError = 2;
//       }
//     } else {
//       message = message + "Add Address";
//       iError = 3;
//
//       console.log("Add Address");
//     }
//   });
//   console.log(message);
//   return message;
//
// }

function SaveOrderinDB() {

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var orderDetails = [];
  var message = "";
  var iError = 0;
  console.log('SaveOrder');
  //getCartDetails();

  //getAddress();
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

  var prize = document.getElementById("hftotalAmount").value;
  var discountedprize = document.getElementById("hfdiscountedAmount").value;
  var itemCount = document.getElementById("itemCount").innerHTML;

  console.log(document.getElementById("couponListDiv").childElementCount);
  var cnt = document.getElementById("couponListDiv").childElementCount;
  var selCouponID = "Select coupon";
  var selDiscountVal = "none";
  for (i = 1; i <= cnt; i++) {
    var select = document.getElementById("coupon" + i);
    var disType = document.getElementById("hfDiscountType" + i);
    var disValue = document.getElementById("hfDiscountValue" + i);
    var couponID = document.getElementById("hfCouponID" + i);

    if (select.checked === true) {
      selCouponID = couponID.value;
      if (disType.value === 'Percentage') {
        selDiscountVal = disValue.value + " %";
      } else {
        selDiscountVal = Number(disValue.value).toLocaleString('en-IN', curFormat);
      }
    }


  }

  var discount = {
    coupondID: selCouponID, //couponDetails.options[couponDetails.selectedIndex].value,
    discountValue: selDiscountVal //couponDetails.options[couponDetails.selectedIndex].text

  };

  var orderChanges = [];
  orderChanges.push({
    OrderStage: 1,
    OrderStatus: 'Order Placed',
    PaymentStatus: 'Pending',
    DeliverySlot: deliveryTime,
    DeliveryDate: deliveryDate,
    ChangedTimeStamp: new Date()
  });

  orderChanges.push({
    OrderStage: 2,
    OrderStatus: 'Pending',
    PaymentStatus: 'Pending',
    DeliverySlot: deliveryTime,
    DeliveryDate: deliveryDate,
    ChangedTimeStamp: new Date()
  });
  console.log(OrderItems);
  if (cartDetails.length > 0 && selectedAddress != null) {
    console.log('insert order');

    db.collection('OrderDetails')
      .add({
        orderNumber: Date.now(),
        orderItems: OrderItems, //cartDetails,
        totalItems: cartDetails.length,
        totalAmount: prize,
        deliveryAddress: selectedAddress,
        deliveryDate: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(deliveryDate))), //deliveryDate,
        deliveryTime: deliveryTime,
        paymentOption: paymentOption,
        discountedprize: discountedprize,
        discountDetails: discount,
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        orderDate: firebase.firestore.Timestamp.fromDate(new Date()),
        orderBy: userID,
        orderByUserName: userName,
        //OrderDetails: orderDetails,
        CreatedBy: auth.currentUser.email,
        CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        UpdatedBy: '',
        UpdatedTimestamp: ''
      })

      .then(function(docRef) {
        console.log("Data added sucessfully in the document: " + docRef.id);
        orderID = docRef.id;
        cartDetails = [];

        db.collection('OrderTracking')
          .doc(docRef.id)
          .set({
            OrderID: orderID,
            ChangeTrack: orderChanges,
            UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            UpdatedByUser: userID,
            UserID: userID
          })
          .then(function(docRef) {
            console.log("Data added sucessfully in the document: " + userID);
            //    window.location.href = "orderStatus.html"
            // console.log(Date.parse(eventstart))
          })
          .catch(function(error) {
            console.error("error updatign order:", error);
          });


        db.collection('CartDetails')
          .doc(userID)
          .update({
            cartDetails: cartDetails
          })
          .then(function(docred) {
            console.log('cart details made blank');
            window.location.href = "orderSummary.html?id=" + orderID;
          });
        // console.log(Date.parse(eventstart))
      })
      .catch(function(error) {
        console.log(error);
        //  console.error("error adding document:", error.message);
      });


  }

  console.log("after save");
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
            document.getElementById('hftotalAmount').value = prise;
            console.log("in set");
            document.getElementById('hfdiscountedAmount').value = prise;
            document.getElementById('CartitemCount').innerHTML = len;
          });
      } else {
        console.log('in else');
        document.getElementById('itemCount').innerHTML = '0';
        document.getElementById('totalAmount').innerHTML = '0';
        document.getElementById('CartitemCount').innerHTML = '0';
        document.getElementById('hftotalAmount').value = '0';
        document.getElementById('hfdiscountedAmount').value = '0';

        document.getElementById('btnProceedToPay').disabled = true;
      }
    }

  });
}



function createOrderItems() {
  var arr = [];
  var prise = 0;

  console.log(cartItems);
  for (i = 0; i < cartItems.length; i++) {


    var qty = cartItems[i].Quantity;
    var selectedsubItem = cartItems[i].SelectedsubItem;
    var weight = selectedsubItem.split('-');
    var selectedProduct = ArrProduct[ArrProduct.findIndex(e => e.ProductID === cartItems[i].ProductID)];
    var unitPrise = 0;
    var MRP = 0;
    var sellPrize = 0;
        console.log(selectedProduct);
    OrderItems.push({
      ProductID: cartItems[i].ProductID,
      ProductName: cartItems[i].ItemName,
      SelectedSubItem: cartItems[i].SelectedsubItem,
      ImageURL: selectedProduct.productImageURL,
      VegNonVeg: selectedProduct.VegNonVeg,
      UnitPrise: sellPrize,
      MRP: MRP,
      PurchasePrice : 0,
      Quantity: cartItems[i].Quantity
    });

    console.log(OrderItems);
  }
}
