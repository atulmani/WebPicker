//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
const orderID = searchParams.get('id');

var userid_order = searchParams.get('userID');

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(orderID);
      console.log(userID);
      //GetProfileData(firebaseUser);
      populateDeliveryDate();
      getOrderDetails();
      if (orderID != '' && orderID != null) {
        document.getElementById('msg').innerHTML = 'Getting order details!!';
      } else {
        document.getElementById('msg').innerHTML = 'Your order is placed successfully';
      }
      document.getElementById('loading-img').style.display = 'none';
    } else {
      console.log('User has been logged out');
      //window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "index.html";
  }
  // document.getElementById('loading-img').style.display = 'none';
});

function SaveOrder() {
  document.getElementById("Message").text = "";
  console.log("update order");
  var odeliveryTime = document.getElementById("odeliveryTime");
  var odeliveryDate = document.getElementById("odeliveryDate");
  var oOrderStatus = document.getElementById("oOrderStatus");
  var oPaymentStatus = document.getElementById("oPaymentStatus");

  var deliveryTime = odeliveryTime.options[odeliveryTime.selectedIndex].value;
  var deliveryDate = odeliveryDate.options[odeliveryDate.selectedIndex].value;
  var orderStatus = oOrderStatus.options[oOrderStatus.selectedIndex].value;
  var paymentStatus = oPaymentStatus.options[oPaymentStatus.selectedIndex].value;

  var oldDeliveryTime = '';
  var oldDeliveryDate = '';
  var oldOrderStatus = '';
  var oldPaymentStatus = '';
  var orderChanges = [];
  var blupdatedFlag = true;
  var blTrackChanges = false;
  const snapshot = db.collection('OrderDetails').doc(userid_order);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        //console.log('Document ref id: ' + doc.data().uid);
        var orderDetails = doc.data().OrderDetails;
        //console.log(orderDetails);
        var selectedOrderIndex = orderDetails.findIndex(e => e.orderID === orderID);
        //console.log(selectedOrderIndex);
        var selectedOrder;
        //console.log(selectedItem);
        //orderStatus : Pending, Packed, On the Way, Delivered, Cancelled
        //PaymentStatus : Pending, Completed
        //Combination orderStatus : Pending, PaymentStatus : Pending - covered
        //Combination orderStatus : Pending, PaymentStatus : Completed - covered
        //Combination orderStatus : Packed, PaymentStatus : Pending - covered
        //Combination orderStatus : Packed, PaymentStatus : Completed -covered
        //Combination orderStatus : On the Way, PaymentStatus : Pending -covered
        //Combination orderStatus : On the Way, PaymentStatus : Completed-covered
        //Combination orderStatus : Delivered, PaymentStatus : Pending -- not a valid status
        //Combination orderStatus : Delivered, PaymentStatus : Completed - covered
        //Combination orderStatus : Cancelled, PaymentStatus : Pending  -covered
        //Combination orderStatus : Cancelled, PaymentStatus : Completed - covered
        var orderStatusChanges = "";
        var paymentStatusChanges = "";
        var deliveryDateChanges = "";
        var deliverySlotChanges = "";



        if (selectedOrderIndex >= 0) {
          selectedOrder = orderDetails[selectedOrderIndex];
          //copy original data
          oldDeliveryTime = selectedOrder.deliveryTime;
          oldDeliveryDate = selectedOrder.deliveryDate;
          oldOrderStatus = selectedOrder.orderStatus;
          oldPaymentStatus = selectedOrder.paymentStatus;


          if (oldOrderStatus != oOrderStatus) {
            blTrackChanges = true;
            orderStatusChanges = "changed from " + oldOrderStatus + " to " + orderStatus;
          }
          if (oldPaymentStatus != paymentStatus) {
            blTrackChanges = true;
            paymentStatusChanges = "changed from " + oldPaymentStatus + " to " + paymentStatus;
          }

          if (oldDeliveryTime != deliveryTime) {
            blTrackChanges = true;
            deliverySlotChanges = "changed from " + oldDeliveryTime + " to " + deliveryTime;
          }
          if (oldDeliveryDate != deliveryDate) {
            blTrackChanges = true;
            deliveryDateChanges = "changed from " + oldDeliveryDate + " to " + deliveryDate;
          }
          orderChanges.push({
            OrderStatus: orderStatusChanges,
            PaymentStatus: paymentStatusChanges,
            DeliverySlot: deliverySlotChanges,
            DeliveryDate: deliveryDateChanges,
            ChangedTimeStamp: new Date()
          });

          if (blupdatedFlag === true) {
            console.log(orderDetails);
            console.log(orderDetails[selectedOrderIndex].orderID);
            UpdateOrderTrackingDetails(orderChanges, orderDetails[selectedOrderIndex].orderID);
          }
          //get new data
          selectedOrder.deliveryDate = deliveryDate;
          selectedOrder.orderStatus = orderStatus;
          selectedOrder.paymentStatus = paymentStatus;
          selectedOrder.deliveryTime = deliveryTime
          orderDetails[selectedOrderIndex] = selectedOrder;
          //order status changed is changed to cancelled,if payment status is completed, need to add the amount in user wallet
          if (oldOrderStatus != orderStatus && orderStatus === 'Cancelled' &&
            (oldPaymentStatus === 'Completed' || paymentStatus === 'Completed')) {
            console.log("Wallet");
            document.getElementById("Message").innerHTML = "Payment of " + selectedOrder.totalAmount + " has been added to user's wallet";
            updateWalletDetails(userid_order, selectedOrder.totalAmount, 'add');
          } else if ((oldOrderStatus != orderStatus && oldOrderStatus === 'Cancelled') &&
            (oldPaymentStatus != paymentStatus && oldPaymentStatus === 'Completed')) {
            console.log("Wallet");
            document.getElementById("Message").innerHTML = "Payment of " + selectedOrder.totalAmount + " has been deleted from to user's wallet";
            updateWalletDetails(userid_order, selectedOrder.totalAmount, 'delete');
          } else if (orderStatus === 'Delivered' && paymentStatus === 'Pending') //invalid case expression:
          {
            blupdatedFlag = false;
            document.getElementById("Message").innerHTML = "Delivered Order's payment status can not be changed to pending";

          }
        }
        if (blupdatedFlag === true) {
          db.collection("OrderDetails").doc(userid_order).update({
              OrderDetails: orderDetails
            })
            .then(function(docRef) {
              console.log("Data added sucessfully in the document: " + userid_order);
              //    window.location.href = "orderStatus.html"
              // console.log(Date.parse(eventstart))
            })
            .catch(function(error) {
              console.error("error updatign order:", error);
            });
        }
        //update order divDetails
        /*

        */

      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
}

function UpdateOrderTrackingDetails(orderChanges, orderID) {

  var trackData = [];
  console.log(userid_order);
  console.log(orderID);
  const snapshot = db.collection('OrderTracking').where("__name__", "==", userid_order).where('OrderID', "==", orderID).get(); //;//

  snapshot.then((psnapshot) => {
    psnapshot.forEach((doc) => {
      console.log('existing track');
      trackData = doc.data().ChangeTrack;
    });
    console.log(trackData);
    for (i = 0; i < orderChanges.length; i++) {
      trackData.push(orderChanges[i]);
    }

    db.collection("OrderTracking").doc(userid_order).set({
        OrderID: orderID,
        ChangeTrack: trackData,
        UpdatedTimestamp: new Date(),
        UpdatedByUser: userID
      })
      .then(function(docRef) {
        console.log("Data added sucessfully in the document: " + userid_order);
        //    window.location.href = "orderStatus.html"
        // console.log(Date.parse(eventstart))
      })
      .catch(function(error) {
        console.error("error updatign order:", error);
      });

  });
}

function updateWalletDetails(userid_order, totalamount, addDelete) {
  var currentAmount = 0;
  const snapshot = db.collection('UserWallet').doc(userid_order);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        currentAmount = doc.data().WalletAmount;
      }
      if (addDelete === 'add')
        currentAmount = Number(currentAmount) + Number(totalamount);
      else
        currentAmount = Number(currentAmount) - Number(totalamount);
      db.collection("UserWallet").doc(userid_order).set({
          WalletAmount: currentAmount,
          UpdatedTimestamp: new Date(),
          UpdatedByUser: userID
        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: " + userid_order);
          //    window.location.href = "orderStatus.html"
          // console.log(Date.parse(eventstart))
        })
        .catch(function(error) {
          console.error("error updatign order:", error);
        });

    })
    .catch(function(error) {
      // An error occurred
      console.log(error);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
}

function populateDeliveryDate() {

  const tempDate = new Date();
  var delDate = document.getElementById('odeliveryDate');
  var option1;
  console.log(delDate);
  console.log(tempDate.toLocaleDateString());
  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.toLocaleDateString();
  delDate.appendChild(option1);


}

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }

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

function getOrderDetails() {
  console.log(userID);
  const snapshot = db.collection('OrderDetails').doc(userid_order);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        //console.log('Document ref id: ' + doc.data().uid);
        var orderDetails = doc.data().OrderDetails;
        //console.log(orderDetails);
        var selectedOrderIndex = orderDetails.findIndex(e => e.orderID === orderID);
        //console.log(selectedOrderIndex);
        var selectedOrder;
        if (selectedOrderIndex >= 0) {
          selectedOrder = orderDetails[selectedOrderIndex];
          console.log(selectedOrder);
          populateDeliveryAddress(selectedOrder, userID);
          populateOrderItems(selectedOrder);
        }

      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
}

function populateDeliveryAddress(selectedOrder, orderPlacedBy) {
  var deliverydt = new Date(selectedOrder.deliveryDate);
  var orderdt = new Date(selectedOrder.orderDate);
  //document.getElementById('DeliveryDate').innerHTML = selectedOrder.deliveryDate;
  document.getElementById('DeliveryDate').innerHTML = deliverydt.getDate() + "-" + (deliverydt.getMonth() + 1) + "-" + deliverydt.getFullYear();
  document.getElementById('DeliveryTime').innerHTML = selectedOrder.deliveryTime;
  document.getElementById('orderStatus').innerHTML = selectedOrder.orderStatus;
  document.getElementById('PaymentStatus').innerHTML = selectedOrder.paymentStatus;
  // document.getElementById('orderDate').innerHTML = selectedOrder.orderDate;
  document.getElementById('orderDate').innerHTML = orderdt.getDate() + "-" + (orderdt.getMonth() + 1) + "-" + orderdt.getFullYear();;

  document.getElementById('BranchName').innerHTML = selectedOrder.deliveryAddress.branchName;
  document.getElementById('BranchOwnerName').innerHTML = selectedOrder.deliveryAddress.branchOwnerName;
  document.getElementById('AddressLine1').innerHTML = selectedOrder.deliveryAddress.addressLine1;
  document.getElementById('AddressLine2').innerHTML = selectedOrder.deliveryAddress.addressLine2;
  document.getElementById('City').innerHTML = selectedOrder.deliveryAddress.city;
  document.getElementById('ZipCode').innerHTML = selectedOrder.deliveryAddress.ZipCode;
  document.getElementById('phoneNumber').innerHTML = selectedOrder.deliveryAddress.PhoneNumber;
  document.getElementById('orderID').value = selectedOrder.orderID;
  document.getElementById('orderPlacedBy').value = orderPlacedBy;

  for (index = 0; index < odeliveryDate.options.length; index++) {
    if (odeliveryDate.options[index].value === selectedOrder.deliveryDate)
      odeliveryDate.options[index].selected = true;

  }
  for (index = 0; index < odeliveryTime.options.length; index++) {
    if (odeliveryTime.options[index].value === selectedOrder.deliveryTime)
      odeliveryTime.options[index].selected = true;
  }
  for (index = 0; index < oOrderStatus.options.length; index++) {
    if (oOrderStatus.options[index].value === selectedOrder.orderStatus)
      oOrderStatus.options[index].selected = true;
  }

  for (index = 0; index < oPaymentStatus.options.length; index++) {
    if (oPaymentStatus.options[index].value === selectedOrder.paymentStatus)
      oPaymentStatus.options[index].selected = true;
  }

}

function populateOrderItems(selectedOrder) {
  var orderItem = selectedOrder.orderItems;
  console.log(orderItem);
  for (i = 0; i < orderItem.length; i++) {
    renderOrderItem(orderItem[i]);
  }
}

function renderOrderItem(orderItem) {
  var div1 = document.createElement("div");
  div1.setAttribute('class', 'col-sm-12');
  div1.setAttribute('style', 'padding: 5px;');

  var div2 = document.createElement("div");
  div2.setAttribute('class', 'product-list-div');


  var table1 = document.createElement("table");

  var tr1 = document.createElement('tr');

  var td1 = document.createElement('td');
  td1.setAttribute('width', "45%");
  td1.setAttribute('class', "product-img-td");

  var img1 = document.createElement("img");
  img1.setAttribute('src', orderItem.ImageURL);
  img1.setAttribute("width", "100%");
  img1.setAttribute("alt", "");

  var div3 = document.createElement('div');
  div3.setAttribute('class', "off-div");

  var small1 = document.createElement('small');
  small1.innerHTML = '20% OFF';

  var div4 = document.createElement('div');
  div4.setAttribute('class', "veg-nonVeg-div");

  var imgVegNonVeg = document.createElement("img");
  //console.log(orderItem.VegNonVeg);
  if (orderItem.VegNonVeg === "Veg") {
    imgVegNonVeg.setAttribute("src", "../img/veg.png");
  } else if (orderItem.VegNonVeg === "NonVeg") {
    imgVegNonVeg.setAttribute("src", "../img/non-veg.png");

  }
  imgVegNonVeg.setAttribute("width", "100%");
  imgVegNonVeg.setAttribute("alt", "");

  var td2 = document.createElement('td');
  td2.setAttribute('width', "55%");
  td2.setAttribute('valign', "top");
  td2.setAttribute('class', "product-names-div");
  //console.log(orderItem.ProductName);
  var small2 = document.createElement('small');
  small2.setAttribute('class', 'product-names');
  small2.innerHTML = orderItem.ProductName;


  var small3 = document.createElement('small');
  small3.setAttribute('style', 'style="font-size: 0.8rem; color: rgba(0,0,0,0.5);');
  small3.innerHTML = '';

  //console.log(orderItem.SelectedSubItem);
  var input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('name', '');
  input1.readonly = true;
  input1.value = orderItem.SelectedSubItem;

  var div5 = document.createElement('div');
  div5.setAttribute('class', 'product-price');
  //console.log(orderItem.MRP);
  var h51 = document.createElement('h5');
  h51.innerHTML = '₹' + orderItem.MRP;

  //console.log(orderItem.UnitPrise);
  var small4 = document.createElement('small');
  small4.innerHTML = '₹' + orderItem.UnitPrise;

  var table2 = document.createElement('table');

  var tr2 = document.createElement('tr');
  //console.log(orderItem.Quantity);
  var td3 = document.createElement('td');
  td3.setAttribute('width', '50%');
  td3.innerHTML = 'Qty : ' + orderItem.Quantity;

  var totalPrize = Number(orderItem.Quantity) * Number(orderItem.UnitPrise)
  //  console.log(totalPrize);
  var td4 = document.createElement('td');
  td4.innerHTML = 'Prize : ' + totalPrize;

  td1.appendChild(img1);
  div3.appendChild(small1);
  td1.appendChild(div3);

  div4.appendChild(imgVegNonVeg);
  td1.appendChild(div4);
  tr1.appendChild(td1);

  td2.appendChild(small2);
  td2.appendChild(small3);
  //  td2.appendChild(document.createElement('br'));
  td2.appendChild(input1);

  div5.appendChild(h51);
  div5.appendChild(small4);
  td2.appendChild(div5);

  tr2.appendChild(td3);
  tr2.appendChild(td4);

  table2.appendChild(tr2);

  td2.appendChild(table2)

  tr1.appendChild(td2);
  table1.appendChild(tr1);

  div2.appendChild(table1)

  div1.appendChild(div2);
  //console.log(div1);
  document.getElementById('orderItems').appendChild(div1);

}
