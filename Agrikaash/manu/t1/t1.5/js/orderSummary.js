//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
const orderID = searchParams.get('id');

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(orderID);
      console.log(userID);
      GetProfileData(firebaseUser);
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
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "index.html";
  }
  // document.getElementById('loading-img').style.display = 'none';
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        console.log('Document ref id: ' + doc.data().uid);
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          //document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }

        // document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        // document.getElementById('displayName').innerHTML = doc.data().displayName;

      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};



function populateDeliveryDate() {

  const tempDate = new Date();
  var delDate = document.getElementById('DeliveryDate');
  var option1;
  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); //tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); // tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); // tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); // tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); //tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); //tempDate.toLocaleDateString();
  delDate.appendChild(option1);

  tempDate.setDate(tempDate.getDate() + 1);
  option1 = document.createElement("option");
  option1.setAttribute("value", tempDate.toLocaleDateString());
  option1.innerHTML = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); //tempDate.toLocaleDateString();
  delDate.appendChild(option1);


}

function getOrderDetails() {
  console.log(userID);
  const snapshot = db.collection('OrderDetails').doc(orderID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        //console.log('Document ref id: ' + doc.data().uid);
        var orderDetails = doc.data();
        console.log(orderDetails);
        populateDeliveryAddress(orderDetails);
        populateOrderItems(orderDetails);

      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
}

function populateDeliveryAddress(selectedOrder) {
  console.log(document.getElementById('DeliveryDate'));

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var dDate = new Date(selectedOrder.deliveryDate.seconds * 1000);
  var delDate = dDate.toLocaleDateString("en-US", options);
  //document.getElementById('DeliveryDate').innerHTML = delDate;

  //document.getElementById('DeliveryTime').innerHTML = selectedOrder.deliveryTime;
  document.getElementById('orderStatus').innerHTML = selectedOrder.orderStatus;
  document.getElementById('PaymentStatus').innerHTML = selectedOrder.paymentStatus;
  console.log(selectedOrder.orderDate);
  var oDate = new Date(selectedOrder.orderDate.seconds * 1000);
  var orderDate = oDate.toLocaleDateString("en-US", options);

  var odeliveryDate = document.getElementById('DeliveryDate');
  var odeliveryTime = document.getElementById('oDeliveryTime');
  document.getElementById("orderDate").innerHTML = orderDate;
  for (index = 0; index < odeliveryDate.options.length; index++) {
    if (odeliveryDate.options[index].text === (dDate.getDate() + "/" + (dDate.getMonth() + 1) + "/" + dDate.getFullYear())) //selectedOrder.deliveryDate)
      odeliveryDate.options[index].selected = true;
  }

  for (index = 0; index < odeliveryTime.options.length; index++) {
    if (odeliveryTime.options[index].value === selectedOrder.deliveryTime)
      odeliveryTime.options[index].selected = true;
  }

  var amt = Number(selectedOrder.totalAmount);
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };
  amt = amt.toLocaleString('en-IN', curFormat);

  document.getElementById('paymentAmount').innerHTML = amt;
  console.log(selectedOrder.discountedprize);
  if (isNaN(selectedOrder.discountedprize))
    console.log('if');
  else {
    console.log('else');
  }
  //if (selectedOrder.discountedprize === 'NaN' || selectedOrder.discountedprize === "0" || selectedOrder.discountedprize === "")
  if (isNaN(selectedOrder.discountedprize) || selectedOrder.discountedprize === '') {
    document.getElementById('discount').style.display = "none";
  } else {
    var discountAmt = selectedOrder.discountedprize;
    discountAmt = discountAmt.toLocaleString('en-IN', curFormat);
    console.log(discountAmt);
    var discountValue = Number(selectedOrder.totalAmount) - Number(selectedOrder.discountedprize);
    console.log(discountValue);
    discountValue = discountValue.toLocaleString('en-IN', curFormat);

    document.getElementById('discountAmount').innerHTML = discountAmt + "(" + selectedOrder.discountDetails.discountValue + " Off)";
    document.getElementById('discountValue').innerHTML = discountValue;
  }

  document.getElementById('BranchName').innerHTML = selectedOrder.deliveryAddress.branchName;
  document.getElementById('BranchOwnerName').innerHTML = selectedOrder.deliveryAddress.branchOwnerName;
  document.getElementById('AddressLine1').innerHTML = selectedOrder.deliveryAddress.addressLine1;
  document.getElementById('AddressLine2').innerHTML = selectedOrder.deliveryAddress.addressLine2;
  document.getElementById('City').innerHTML = selectedOrder.deliveryAddress.city;
  document.getElementById('ZipCode').innerHTML = selectedOrder.deliveryAddress.ZipCode;
  document.getElementById('phoneNumber').innerHTML = selectedOrder.deliveryAddress.PhoneNumber;
  var btnSave = document.getElementById('btnSaveOrder');

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var dDate = new Date(selectedOrder.deliveryDate.seconds * 1000);

  const tempDate = new Date();
  tempDate.setDate(tempDate.getDate() + 2);

  console.log(dDate);
  console.log(tempDate);
  console.log(selectedOrder.orderStatus);

  //order can be cancelled only if order status is Pending and delivery Date is > todays date
  if (selectedOrder.orderStatus === 'Pending' && dDate >= tempDate) {
    console.log('if enabled');
    //document.getElementById('spanMsg').style.visibility = "hidden";
    //btnSave.disabled = false;
    btnSave.style.visibility = "visible";
  } else {
    console.log('if disabled');

    //document.getElementById('spanMsg').style.visibility = "visible";
    //btnSave.disabled = true;
    btnSave.style.visibility = "hidden";
    document.getElementById("DeliveryDate").style.disabled=true;

  }
}

function populateOrderItems(selectedOrder) {
  var orderItem = selectedOrder.orderItems;
  console.log(orderItem);
  var i;
  for (i = 0; i < orderItem.length; i++) {
    renderOrderItem(orderItem[i], selectedOrder.orderStatus, selectedOrder.deliveryDate, i);
  }
  document.getElementById("itemcount").innerHTML = "(" + i + ")"
}

function renderOrderItem(orderItem, orderStatusValue, deliveryDate, index) {
  var div1 = document.createElement("div");
  div1.setAttribute('class', 'col-sm-12');
  div1.setAttribute('style', 'padding: 5px;');
  div1.setAttribute('id', 'parentDiv' + index);

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

  var hf = document.createElement("input");
  hf.setAttribute("id", "hfProdID" + index);
  hf.setAttribute("type", "hidden");
  hf.setAttribute("value", orderItem.ProductID);
  td2.appendChild(hf);

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
  input1.setAttribute("id", "selectedItem" + index);
  input1.readonly = true;
  input1.value = orderItem.SelectedSubItem;


  td2.appendChild(small2);
  td2.appendChild(small3);
  //  td2.appendChild(document.createElement('br'));
  td2.appendChild(input1);

  var div5 = document.createElement('div');
  div5.setAttribute('class', 'product-price');
  //console.log(orderItem.MRP);
  var h51 = document.createElement('h5');
  h51.innerHTML = '₹' + orderItem.MRP;

  //console.log(orderItem.UnitPrise);
  var small4 = document.createElement('small');
  small4.innerHTML = '₹' + orderItem.UnitPrise;

  div5.appendChild(h51);
  div5.appendChild(small4);
  td2.appendChild(div5);

  var table2 = document.createElement('table');

  var tr2 = document.createElement('tr');
  //console.log(orderItem.Quantity);
  var td3 = document.createElement('td');
  td3.setAttribute('width', '50%');
  td3.innerHTML = 'Qty : ' + orderItem.Quantity;

  tr2.appendChild(td3);

  var totalPrize = Number(orderItem.Quantity) * Number(orderItem.UnitPrise)
  //  console.log(totalPrize);
  var td4 = document.createElement('td');
  td4.innerHTML = 'Prize : ' + totalPrize;

  tr2.appendChild(td4);

  table2.appendChild(tr2);

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var dDate = new Date(deliveryDate.seconds * 1000);

  const tempDate = new Date();
  tempDate.setDate(tempDate.getDate() + 2);

  console.log(dDate.toLocaleDateString("en-US", options));
  console.log(tempDate);

  //order can be cancelled only if order status is Pending and delivery Date is > todays date
  if (orderStatusValue === 'Pending' && dDate > tempDate) {
    console.log('Delete applicable');
    var tr3 = document.createElement('tr');
    //console.log(orderItem.Quantity);
    var td4 = document.createElement('td');

    var span2 = document.createElement('span');
    span2.setAttribute("id", "btnDelete" + index);
    console.log("deleteCoupon(" + "hfCouponDocID " + index + ");");
    span2.setAttribute("onclick", "deleteItem(" + "hfProdID" + index + "," + "selectedItem" + index + "," + 'parentDiv' + index + ");");
    span2.setAttribute("class", "material-icons");
    span2.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
    span2.innerHTML = "delete_outline";
    td4.appendChild(span2);
    tr3.appendChild(td4);
    table2.appendChild(tr3);
  }

  td2.appendChild(table2)

  tr1.appendChild(td2);
  table1.appendChild(tr1);

  div2.appendChild(table1)

  div1.appendChild(div2);
  //console.log(div1);
  document.getElementById('orderItems').appendChild(div1);

}


function SaveOrder() {
  //document.getElementById("Message").text = "";
  var odeliveryTime = document.getElementById("oDeliveryTime");
  var odeliveryDate = document.getElementById("DeliveryDate")

  var deliveryTime = odeliveryTime.options[odeliveryTime.selectedIndex].value;
  var deliveryDate = odeliveryDate.options[odeliveryDate.selectedIndex].value;

  var orderStage = 0;
  var deliveryDateChanges = '';
  var deliverySlotChanges = '';

  var oldDeliveryTime = '';
  var oldDeliveryDate = '';

  var orderChanges = [];
  var blupdatedFlag = true;
  var blTrackChanges = false;

  const snapshot = db.collection('OrderDetails').doc(orderID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      selectedOrder = doc.data();
      //copy original data
      oldDeliveryTime = selectedOrder.deliveryTime;

      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      var dDate = new Date(selectedOrder.deliveryDate.seconds * 1000);
      oldDeliveryDate = dDate.getDate() + "/" + (dDate.getMonth() + 1) + "/" + dDate.getFullYear();

      if (oldDeliveryTime != deliveryTime) {
        blTrackChanges = true;
        deliverySlotChanges = "changed from " + oldDeliveryTime + " to " + deliveryTime;
      }
      if (oldDeliveryDate != deliveryDate) {
        blTrackChanges = true;
        deliveryDateChanges = "changed from " + oldDeliveryDate + " to " + deliveryDate;
      }

      orderChanges.push({
        OrderStage: 2,
        OrderStatus: '',
        PaymentStatus: '',
        DeliverySlot: deliverySlotChanges,
        DeliveryDate: deliveryDateChanges,
        ChangedTimeStamp: new Date()
      });
      if (blTrackChanges === true) {
        UpdateOrderTrackingDetails(orderChanges, doc.id);

        //added the order in Order Details
        db.collection("OrderDetails").doc(orderID).update({
            deliveryDate: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(deliveryDate))), //deliveryDate,
            deliveryTime: deliveryTime,
            UpdatedBy: auth.currentUser.email,
            UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())

          })
          .then(function(docRef) {
            console.log("Data added sucessfully in the document: " + orderID);
            //    window.location.href = "orderStatus.html"
            // console.log(Date.parse(eventstart))
            document.getElementById("Message").style.display = "block";
          })
          .catch(function(error) {
            console.error("error updatign order:", error);
          });

      }
    }
  });
}


function UpdateOrderTrackingDetails(orderChanges, orderID) {

  var trackData = [];
  var trackdataForUpdate = [];
  var trackingID = '';
  const snapshot = db.collection('OrderTracking').doc(orderID).get(); //;//

  snapshot.then(async (doc) => {
    if (doc.exists) {

      console.log('existing track');
      trackingID = doc.id;
      trackData = doc.data().ChangeTrack;
    }

    console.log(trackData);
    console.log(trackingID);
    //console.log(trackData[i].OrderStage);
    console.log(orderChanges[0].OrderStage);
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
        UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        UpdatedByUser: userID,
        userID: userID
      })
      .then(function(docRef) {
        console.log("Data added sucessfully in the document: " + userID);
        //    window.location.href = "orderStatus.html"
        // console.log(Date.parse(eventstart))
      })
      .catch(function(error) {
        console.error("error updatign order:", error);
      });

  });
}


function deleteItem(prodID, selectedItemIndex, parentdiv) {
  //delete from order list
  var selectedOrder;
  var selectedItem;
  var oldDiscountPrise;
  var oldPrize;
  var walletAmount = 0;
  var newOrder = [];
  var cancelFlag = false;
  var discountedAmount = 0;
  var totalPrise = 0;
  const snapshot = db.collection('OrderDetails').doc(orderID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        {
          selectedOrder = doc.data();
          oldPrize = selectedOrder.totalAmount;
          oldDiscountPrise = selectedOrder.discountedprize;
          //get the selected item
          var selectedIIndex = selectedOrder.orderItems.findIndex(e => e.ProductID === prodID.value && e.SelectedSubItem === selectedItemIndex.value);
          //if order has only one item, then mark this as Cancelled

          console.log(selectedOrder.orderItems.length);
          var modifiedOrder = selectedOrder;

          if (selectedOrder.orderItems.length === 1) {
            console.log("order Cancelled");
            cancelFlag = true;
            selectedOrder.orderStatus = "Cancelled";
            if (selectedOrder.paymentStatus === 'Completed') {
              walletAmount = selectedOrder.totalAmount;
              updateWalletDetails(userID, walletAmount, 'add');
            }
            totalPrise = selectedOrder.totalAmount;
            discountedAmount = selectedOrder.discountedprize;
            modifiedOrder = selectedOrder;

          } else {
            console.log("order updated");

            //for (j = 0; j < allOrder.length; j++)

            var items = [];

            for (i = 0; i < selectedOrder.orderItems.length; i++) {

              if (i != selectedIIndex) {
                items.push(selectedOrder.orderItems[i]);
                totalPrise = Number(totalPrise) + Number(selectedOrder.orderItems[i].UnitPrise) * Number(selectedOrder.orderItems[i].Quantity)
              }
            }
            //check for discount promise
            var discount;

            if (modifiedOrder.discountDetails.coupondID != 'none') {
              discount = modifiedOrder.discountDetails.discountValue;
              var discountValue = 0;
              if (discount.includes("%")) {
                discount = discount.replace("%", "");
                discountValue = Number(totalPrise) * Number(discount) / 100;
              } else {
                discount = discount.replace("₹", "");
                discountValue = Number(discount);
              }
            }
            discountedAmount = Number(totalPrise) - Number(discountValue);
            var refundAmount;
            console.log(totalPrise);
            console.log(oldPrize);
            console.log(discountedAmount);
            console.log(oldDiscountPrise);
            if (Number(totalPrise) < Number(oldPrize)) {
              refundAmount = Number(oldPrize) - Number(totalPrise);
            }
            if (Number(discountedAmount) < Number(oldDiscountPrise)) {
              refundAmount = Number(oldDiscountPrise) - Number(discountedAmount);
            }
            console.log(refundAmount);
            console.log(userID);

            if (refundAmount != undefined && refundAmount > 0) {
              console.log('refundAmount : ', refundAmount);
              updateWalletDetails(userID, refundAmount, 'add');
            }
            modifiedOrder.totalItems = items.length;
            modifiedOrder.orderItems = items;
            modifiedOrder.totalAmount = totalPrise;
            modifiedOrder.discountedprize = discountedAmount;

          }
        }
      }
      console.log(modifiedOrder.orderItems,
        modifiedOrder.orderItems.length,
        totalPrise,
        discountedAmount);
      db.collection('OrderDetails').doc(orderID).update({
          orderStatus: modifiedOrder.orderStatus,
          orderItems: modifiedOrder.orderItems,
          totalItems: modifiedOrder.orderItems.length,
          totalAmount: totalPrise,
          discountedprize: discountedAmount
        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: " + orderID);

          //update order trackData
          var orderChanges = [];
          if (cancelFlag === true) {
            orderChanges.push({
              OrderStage: 6,
              OrderStatus: 'Order is Cancelled',
              PaymentStatus: '',
              DeliverySlot: '',
              DeliveryDate: '',
              ChangedTimeStamp: new Date()
            });
          } else {
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

    })
    .catch(function(error) {
      // An error occurred
      console.log(error);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });

  document.getElementById(parentdiv).innerHTML = "";
}



function updateWalletDetails(userID, totalamount, addDelete) {
  var currentAmount = 0;
  const snapshot = db.collection('UserWallet').doc(userID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        currentAmount = doc.data().WalletAmount;
      }
      if (addDelete === 'add')
        currentAmount = Number(currentAmount) + Number(totalamount);
      else
        currentAmount = Number(currentAmount) - Number(totalamount);
      db.collection("UserWallet").doc(userID).set({
          WalletAmount: currentAmount,
          UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
          UpdatedByUser: userID
        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: " + userID);
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
