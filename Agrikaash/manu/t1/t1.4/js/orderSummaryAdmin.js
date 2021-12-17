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
      console.log(orderID);
      // if (orderID != '' && orderID != null) {
      //   document.getElementById('msg').innerHTML = 'Getting order details!!';
      // } else {
      //   document.getElementById('msg').innerHTML = 'Your order is placed successfully';
      // }
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      populateDeliveryDate();
      getOrderDetails();

      document.getElementById('loading-img').style.display = 'none';
      //exportToCsv();
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
console.log(deliveryDate);
console.log(new Date(deliveryDate));
  var oldDeliveryTime = '';
  var oldDeliveryDate = '';
  var oldOrderStatus = '';
  var oldPaymentStatus = '';
  var orderChanges = [];
  var blupdatedFlag = true;
  var blTrackChanges = false;
  const snapshot = db.collection('OrderDetails').doc(orderID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        //console.log('Document ref id: ' + doc.data().uid);
        //var orderDetails = doc.data().OrderDetails;
        //console.log(orderDetails);
        //var selectedOrderIndex = orderDetails.findIndex(e => e.orderID === orderID);
        //console.log(selectedOrderIndex);
        //var selectedOrder;
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
        var orderStage = 0;


         {
          selectedOrder = doc.data();
          //copy original data
          oldDeliveryTime = selectedOrder.deliveryTime;
          oldDeliveryDate = selectedOrder.deliveryDate;
          oldOrderStatus = selectedOrder.orderStatus;
          oldPaymentStatus = selectedOrder.paymentStatus;
          console.log(oldPaymentStatus);

          if (oldOrderStatus != orderStatus) {
            blTrackChanges = true;
            //1- Order Placed, 2 - Pending, 3 - Packed, 4 - On the Way, 5 - Delivered,
            if (orderStatus === 'Pending')
              orderStage = 2;
            else if (orderStatus === 'Packed')
              orderStage = 3;
            else if (orderStatus === 'On The Way')
              orderStage = 4;
            else if (orderStatus === 'Delivered')
              orderStage = 5;

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
            OrderStage: orderStage,
            OrderStatus: orderStatusChanges,
            PaymentStatus: paymentStatusChanges,
            DeliverySlot: deliverySlotChanges,
            DeliveryDate: deliveryDateChanges,
            ChangedTimeStamp: new Date()
          });

          if (blupdatedFlag === true) {
            UpdateOrderTrackingDetails(orderChanges, doc.id);
          }
          //get new data
          selectedOrder.deliveryDate = deliveryDate;
          selectedOrder.orderStatus = orderStatus;
          selectedOrder.paymentStatus = paymentStatus;
          selectedOrder.deliveryTime = deliveryTime
          //orderDetails[selectedOrderIndex] = selectedOrder;
          //order status changed is changed to cancelled,if payment status is completed, need to add the amount in user wallet
          if (oldOrderStatus != orderStatus && orderStatus === 'Cancelled' &&
            (oldPaymentStatus === 'Completed' || paymentStatus === 'Completed')) {
            document.getElementById("Message").innerHTML = "Payment of " + selectedOrder.totalAmount + " has been added to user's wallet";
            updateWalletDetails(userid_order, selectedOrder.totalAmount, 'add');
          } else if ((oldOrderStatus != orderStatus && oldOrderStatus === 'Cancelled') &&
            (oldPaymentStatus != paymentStatus && oldPaymentStatus === 'Completed')) {
            document.getElementById("Message").innerHTML = "Payment of " + selectedOrder.totalAmount + " has been deleted from to user's wallet";
            updateWalletDetails(userid_order, selectedOrder.totalAmount, 'delete');
          } else if (orderStatus === 'Delivered' && paymentStatus === 'Pending') //invalid case expression:
          {
            blupdatedFlag = false;
            document.getElementById("Message").innerHTML = "Delivered Order's payment status can not be changed to pending";

          }
        }
        if (blupdatedFlag === true) {
          db.collection("OrderDetails").doc(orderID).update({
              orderItems: OrderItems, //cartDetails,
              //totalItems: itemCount,
              //totalAmount: prize,
              //deliveryAddress: selectedAddress,
              deliveryDate: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(deliveryDate))), //deliveryDate,
              deliveryTime: deliveryTime,
              //paymentOption: paymentOption,
              discountedprize: discountedprize,
              paymentStatus: 'Pending',
              orderStatus: 'Pending',
            ///  orderDate: firebase.firestore.Timestamp.fromDate(new Date()),
              orderBy: userID,
              orderByUserName: userName,
              //OrderDetails: orderDetails,
              CreatedBy: auth.currentUser.email,
              CreatedTimestamp: (new Date()).toString(),
              UpdatedBy: '',
              UpdatedTimestamp: ''

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
  var trackdataForUpdate = [];
  var trackingID = '';
  const snapshot = db.collection('OrderTracking').where('OrderID', "==", orderID).get(); //;//

  snapshot.then((psnapshot) => {
    psnapshot.forEach((doc) => {

      console.log('existing track');
      trackingID = doc.id;
      trackData = doc.data().ChangeTrack;
    });
    for (i = 0; i < trackData.length; i++) {
      if (trackData[i].OrderStage < orderChanges[0].OrderStage)
        trackdataForUpdate.push(trackData[i]);

    }
    trackdataForUpdate.push(orderChanges[0]);
    console.log(userID);
    console.log(auth);
    db.collection("OrderTracking").doc(trackingID).set({
        OrderID: orderID,
        ChangeTrack: trackdataForUpdate,
        UpdatedTimestamp: new Date(),
        UpdatedByUser: userID,
        userID: userid_order
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
  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() +"/"+(tempDate.getMonth() + 1) +"/" + tempDate.getFullYear(); //tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML =tempDate.getDate() +"/"+(tempDate.getMonth() + 1) +"/" + tempDate.getFullYear();// tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML =tempDate.getDate() +"/"+(tempDate.getMonth() + 1) +"/" + tempDate.getFullYear();// tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML =tempDate.getDate() +"/"+(tempDate.getMonth() + 1) +"/" + tempDate.getFullYear();// tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() +"/"+(tempDate.getMonth() + 1) +"/" + tempDate.getFullYear();//tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() +"/"+(tempDate.getMonth() + 1) +"/" + tempDate.getFullYear();//tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() +"/"+(tempDate.getMonth() + 1) +"/" + tempDate.getFullYear();//tempDate.toLocaleDateString();
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
        userID = user.uid;
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }

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
  const snapshot = db.collection('OrderDetails').doc(orderID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        //console.log('Document ref id: ' + doc.data().uid);
        //var orderDetails = doc.data().OrderDetails;
        //console.log(orderDetails);
        //var selectedOrderIndex = orderDetails.findIndex(e => e.orderID === orderID);
        //console.log(selectedOrderIndex);
        //var selectedOrder;
        //if (selectedOrderIndex >= 0) {
          selectedOrder = doc.data();
          populateDeliveryAddress(selectedOrder, userID);
          populateOrderItems(selectedOrder);
        //}

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

      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };

      var deliverydt = new Date(selectedOrder.deliveryDate.seconds * 1000);
      var dt1 = deliverydt.toLocaleDateString("en-US", options);

      var orderdt = new Date(selectedOrder.orderDate.seconds * 1000);
      var dt = orderdt.toLocaleDateString("en-US", options);

  //
  // var deliverydt = new Date(selectedOrder.deliveryDate);
  // var orderdt = new Date(selectedOrder.orderDate);

  //document.getElementById('DeliveryDate').innerHTML = selectedOrder.deliveryDate;
  document.getElementById('DeliveryDate').innerHTML = deliverydt.getDate() + "-" + (deliverydt.getMonth() + 1) + "-" + deliverydt.getFullYear();
  document.getElementById('DeliveryTime').innerHTML = selectedOrder.deliveryTime;
  document.getElementById('orderStatus').innerHTML = selectedOrder.orderStatus;
  document.getElementById('PaymentStatus').innerHTML = selectedOrder.paymentStatus;
  // document.getElementById('orderDate').innerHTML = selectedOrder.orderDate;
  document.getElementById('orderDate').innerHTML = orderdt.getDate() + "/" + (orderdt.getMonth() + 1) + "/" + orderdt.getFullYear();;

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
    if (odeliveryDate.options[index].text === (deliverydt.getDate() +"/"+(deliverydt.getMonth() + 1) +"/" + deliverydt.getFullYear()))//selectedOrder.deliveryDate)
      odeliveryDate.options[index].selected = true;

  }
  for (index = 0; index < odeliveryTime.options.length; index++) {
    if (odeliveryTime.options[index].value === selectedOrder.deliveryTime)
      odeliveryTime.options[index].selected = true;
  }
  //document.getElementById("hfOrderStatus").value=selectedOrder.orderStatus;
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
  for (i = 0; i < orderItem.length; i++) {
    renderOrderItem(orderItem[i], i, selectedOrder.orderStatus);
  }
}

function renderOrderItem(orderItem, index, orderStatusValue) {
  console.log(orderItem);
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

  td1.appendChild(img1);

  var div3 = document.createElement('div');
  div3.setAttribute('class', "off-div");

  var small1 = document.createElement('small');
  small1.innerHTML = '20% OFF';

  div3.appendChild(small1);
  td1.appendChild(div3);

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

  div4.appendChild(imgVegNonVeg);
  td1.appendChild(div4);
  tr1.appendChild(td1);

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
  td2.appendChild(small2);
  td2.appendChild(small3);

  //console.log(orderItem.SelectedSubItem);
  var input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('name', '');
  input1.setAttribute("readonly", "true");
  input1.setAttribute("id", "selectedItem" + index);
  input1.value = orderItem.SelectedSubItem;
  td2.appendChild(input1);

  var div5 = document.createElement('div');
  div5.setAttribute('class', 'product-price');
  //console.log(orderItem.MRP);
  var h51 = document.createElement('h5');
  h51.innerHTML = '₹' + orderItem.MRP;
  div5.appendChild(h51);

  //console.log(orderItem.UnitPrise);
  var small4 = document.createElement('small');
  small4.innerHTML = '₹' + orderItem.UnitPrise;
  div5.appendChild(small4);
  td2.appendChild(div5);

  var table2 = document.createElement('table');
  var tr2 = document.createElement('tr');
  //console.log(orderItem.Quantity);
  var td3 = document.createElement('td');
  td3.setAttribute('width', '50%');
  //td3.setAttribute("colspan", "2");
  td3.innerHTML = 'Qty : ' + orderItem.Quantity;
  //
  // var inputQty = document.createElement("input");
  // inputQty.setAttribute("id", "inputQty" + index);
  // inputQty.setAttribute("value", orderItem.Quantity);
  // //inputQty.setAttribute("onchange", "updateQuantity(" + "inputQty" + index + "," + doc.data().MinimumQty + "," + doc.data().MaximumQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "' )");
  //
  // td3.appendChild(inputQty);
  tr2.appendChild(td3);

  var totalPrize = Number(orderItem.Quantity) * Number(orderItem.UnitPrise)
  //  console.log(totalPrize);

  //  td2.appendChild(document.createElement('br'));
  table2.appendChild(tr2);

  //tr2 = document.createElement('tr');
  var td4 = document.createElement('td');
  //td4.setAttribute("colspan", "2");
  td4.innerHTML = 'Prize : ' + totalPrize;
  tr2.appendChild(td4);
  table2.appendChild(tr2);
  tr2 = document.createElement('tr');
  //console.log(orderItem.Quantity);
  td3 = document.createElement('td');
  td3.setAttribute('width', '50%');
  //td3.setAttribute("colspan", "2");
  var hf = document.createElement("input");
  hf.setAttribute("id", "hfProdID" + index);
  hf.setAttribute("type", "hidden");
  hf.setAttribute("value", orderItem.ProductID);
  td3.appendChild(hf);

  if (orderStatusValue != 'Cancelled') {
    var span2 = document.createElement('span');
    span2.setAttribute("id", "btnDelete" + index);
    console.log("deleteCoupon(" + "hfCouponDocID " + index + ");");
    span2.setAttribute("onclick", "deleteItem(" + "hfProdID" + index + "," + "selectedItem" + index + ");");
    span2.setAttribute("class", "material-icons");
    span2.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
    span2.innerHTML = "delete_outline";
    td3.appendChild(span2);
  }
  tr2.appendChild(td3);

  table2.appendChild(tr2);
  td2.appendChild(table2)

  tr1.appendChild(td2);
  table1.appendChild(tr1);

  div2.appendChild(table1)

  div1.appendChild(div2);
  //console.log(div1);
  document.getElementById('orderItems').appendChild(div1);

}

function deleteItem(prodID, selectedItemIndex) {
  //delete from order list
  var allOrder;
  var selectedOrder;
  var selectedItem;
  var walletAmount = 0;
  var newOrder = [];
  var cancelFlag = false;
  const snapshot = db.collection('OrderDetails').doc(userid_order);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        allOrder = doc.data().OrderDetails;
        var selectIndex = allOrder.findIndex(e => e.orderID === orderID);
        if (selectIndex >= 0) {
          selectedOrder = allOrder[selectIndex];
          //get the selected item
          var selectedIIndex = selectedOrder.orderItems.findIndex(e => e.ProductID === prodID.value && e.SelectedSubItem === selectedItemIndex.value);
          //if order has only one item, then mark this as Cancelled

          console.log(selectedOrder.orderItems.length);
          if (selectedIIndex >= 0 && selectedOrder.orderItems.length === 1) {
            console.log("order Cancelled");
            cancelFlag = true;
            allOrder[selectIndex].orderStatus = "Cancelled";
            if (allOrder[selectIndex].paymentStatus === 'Completed') {
              walletAmount = allOrder[selectIndex].totalAmount;
              updateWalletDetails(userid_order, walletAmount, 'add');
            }
            newOrder = allOrder;
          } else {
            console.log("order updated");
            var totalPrise = 0;
            for (j = 0; j < allOrder.length; j++) {
              if (selectIndex != j) {

                newOrder.push(allOrder[j])
              } else {
                var items = [] ;
                var modifiedOrder = allOrder[selectIndex];

                for (i = 0; i < allOrder[selectIndex].orderItems.length; i++) {

                  if (i != selectedIIndex)
                  {
                    items.push(allOrder[selectIndex].orderItems[i]);
                    totalPrise = Number(totalPrise) +  Number(allOrder[selectIndex].orderItems[i].UnitPrise ) * Number(allOrder[selectIndex].orderItems[i].Quantity )
                  }
                }
                //check for discount promise
                var discount;
                var discountedAmount = 0;
                if(modifiedOrder.discountDetails.coupondID != 'none')
                {
                  discount =modifiedOrder.discountDetails.discountValue;
                  var discountValue  = 0;
                  if(discount.includes("%"))
                  {
                    discount = discount.replace("%","");
                    discountValue = Number(totalPrise) * Number(discount) /100;
                  }
                  else
                  {
                    discount = discount.replace("₹","");
                    discountValue = Number(discount);
                  }
                }
                discountedAmount = Number(totalPrise) - Number(discountValue);
                modifiedOrder.totalItems =items.length;
                modifiedOrder.orderItems =items;
                modifiedOrder.totalAmount =totalPrise;
                modifiedOrder.discountedprize = discountedAmount;
                newOrder.push(modifiedOrder)
              }
            }
          }
          db.collection('OrderDetails').doc(userid_order).update({
              OrderDetails: newOrder
            })
            .then(function(docRef) {
              console.log("Data added sucessfully in the document: " + userid_order);

              //update order trackData
              var orderChanges = [];
              if (cancelFlag === true)
              {
              orderChanges.push({
                OrderStage: 6,
                OrderStatus: 'Order is Cancelled',
                PaymentStatus: '',
                DeliverySlot: '',
                DeliveryDate: '',
                ChangedTimeStamp: new Date()
              });
            }else
            {
              orderChanges.push({
                OrderStage: 6,
                OrderStatus: 'Order Modified',
                PaymentStatus: '',
                DeliverySlot: '',
                DeliveryDate: '',
                ChangedTimeStamp: new Date()
            });
              console.log(orderChanges);
              console.log(orderID);
              UpdateOrderTrackingDetails(orderChanges, orderID);
            }
          })
            .catch(function(error) {
              console.error("error adding document:", error);
            });
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
