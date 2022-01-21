//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
var userType="";
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
const orderID = searchParams.get('id');
const action = searchParams.get('action');

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      //logic for view of div if cancel or view
      if (action === 'cancel') //if cancelled
      {
        document.getElementById("divCancel").style.display = "block";
        myFunction();
      } else { //view

        document.getElementById("divCancel").style.display = "none";
        document.getElementById("itemListDiv").style.display = "block";

      }

      GetProfileData(firebaseUser);
      populateDeliveryDate();
      getOrderDetails();
      GetCartDetails();
      //GetNotificationList();
      var siteNotification = localStorage.getItem("notificationCount");
      document.getElementById("notificationCnt").innerHTML=siteNotification;
      document.getElementById("notificationCnt1").innerHTML=siteNotification;

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

function GetCartDetails()
{
  var cartItems = [];
    const snapshot = db.collection('CartDetails').doc(userID);
    snapshot.get().then((doc) => {
      if (doc.exists) {
        cartItems = doc.data().cartDetails;

        document.getElementById("cartItemNo").innerHTML =cartItems.length
      }
    });
}
function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        userType = doc.data().userType;

        if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        document.getElementById('profileName').innerHTML = doc.data().displayName;

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

    if(flag === true)
    {
      document.getElementById("notificationCnt").innerHTML=index;
    }

  });
}
function myFunction() {
  var element = document.getElementById("detailsDiv");
  element.classList.toggle("active");

  var arrow = document.getElementById("arrow");
  arrow.classList.toggle("active");
}


function cancelOrder() {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };


  var errorMsg = "";
  var payment = 0;
  // console.log(document.getElementById('PaymentStatus').innerHTML);
  if (document.getElementById('PaymentStatus').innerHTML === 'Completed') {
    var walletAmount;
    //console.log(document.getElementById("hfDiscountFlag").value);

    if (document.getElementById("hfDiscountFlag").value === "true") {
      //console.log('in if');
      payment = document.getElementById('paymentAmount').innerHTML;
      payment = payment.replace(/[₹,]+/g, "");

      walletAmount = document.getElementById('discountValue').innerHTML;
      walletAmount = walletAmount.replace(/[₹,]+/g, "");
      walletAmount = Number(payment) - Number(walletAmount);
      walletAmount = walletAmount.toLocaleString('en-IN', curFormat);
      errorMsg = "Amount (" + walletAmount + ") has been added to your wallet.";
      walletAmount = walletAmount.replace(/[₹,]+/g, "");

    } else {
      //console.log('in else');
      walletAmount = document.getElementById('paymentAmount').innerHTML;
      errorMsg = "Amount (" + walletAmount + ") has been added to your wallet.";

      walletAmount = walletAmount.replace(/[₹,]+/g, "");

    }
    //console.log(walletAmount);
    updateWalletDetails(userID, walletAmount, 'add');
  }
  var remarks = document.getElementById('cancelreason');
  //console.log(remarks.options[remarks.selectedIndex].text);
  //console.log(remarks.options[remarks.selectedIndex].text);

  db.collection('OrderDetails')
    .doc(orderID)
    .update({
      orderStatus: 'Cancelled',
      CancelRemarks: remarks.options[remarks.selectedIndex].text,
      paymentStatus: 'Pending' //firebase.firestore.FeildValue.arrayUnion(cartItems)
    })
    .then(() => {
      //console.log("order updated");
      var orderChanges = [];
      errorMsg = "Order has been cancelled." + errorMsg;
      document.getElementById('CancelMessage').innerHTML = errorMsg;
      document.getElementById('CancelMessage').style.display = 'block';
      document.getElementById('btnCancelOrder').disabled = true;
      orderChanges.push({
        OrderStage: 6,
        OrderStatus: 'Order is Cancelled',
        PaymentStatus: '',
        DeliverySlot: '',
        DeliveryDate: '',
        ChangedTimeStamp: new Date()
      });
      //console.log(orderChanges);
      //console.log(orderID);
      UpdateOrderTrackingDetails(orderChanges, orderID);
      getOrderDetails();
      document.getElementById("itemListDiv").style.display = "none";
    })
    .catch((error) => {
      console.log("in error");

    });

}



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
  //console.log(userID);
  const snapshot = db.collection('OrderDetails').doc(orderID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        //console.log('Document ref id: ' + doc.data().uid);
        var orderDetails = doc.data();
        //console.log(orderDetails);
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
  //console.log(document.getElementById('DeliveryDate'));

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
  //console.log(selectedOrder.orderDate);
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
    maximumFractionDigits: 2
  };
  amt = amt.toLocaleString('en-IN', curFormat);

  document.getElementById('paymentAmount').innerHTML = amt;
//console.log(selectedOrder.discountedprize );
//console.log(selectedOrder.totalAmount);
  //if (selectedOrder.discountedprize === 'NaN' || selectedOrder.discountedprize === "0" || selectedOrder.discountedprize === "")
  if (isNaN(selectedOrder.discountedprize) || selectedOrder.discountedprize === '' || (selectedOrder.discountedprize === selectedOrder.totalAmount) || selectedOrder.discountedprize === 0) {
    document.getElementById('discount').style.display = "none";
    document.getElementById("hfDiscountFlag").value = "false";
  } else {
    document.getElementById("hfDiscountFlag").value = "true";
    var discountAmt = Number(selectedOrder.discountedprize);
    discountAmt = discountAmt.toLocaleString('en-IN', curFormat);
  //  console.log(discountAmt);
    var discountValue = Number(selectedOrder.totalAmount) - Number(selectedOrder.discountedprize);
    discountValue = discountValue.toLocaleString('en-IN', curFormat);
    //console.log(discountValue);

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

  //console.log(dDate);
  //console.log(tempDate);
  //console.log(selectedOrder.orderStatus);

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
    document.getElementById("DeliveryDate").disabled = true;
    document.getElementById("oDeliveryTime").disabled = true;

  }
}

function populateOrderItems(selectedOrder) {
  var orderItem = selectedOrder.orderItems;
  //console.log(orderItem);
  var i;
  document.getElementById('orderItems').innerHTML = "";
  for (i = 0; i < orderItem.length; i++) {
    renderOrderItem(orderItem[i], selectedOrder.orderStatus, selectedOrder.deliveryDate, i);
  }
  document.getElementById("itemcount").innerHTML = i;
}

function renderOrderItem(orderItem, orderStatusValue, deliveryDate, index) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

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

  // var div3 = document.createElement('div');
  // div3.setAttribute('class', "off-div");
  //
  // var small1 = document.createElement('small');
  // small1.innerHTML = '';
  //
  // div3.appendChild(small1);
  // td1.appendChild(div3);

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
  input1.setAttribute("readonly", true);
  input1.value = orderItem.SelectedSubItem;


  td2.appendChild(small2);
  td2.appendChild(small3);
  //  td2.appendChild(document.createElement('br'));
  td2.appendChild(input1);

  var div5 = document.createElement('div');
  div5.setAttribute('class', 'product-price');
  //console.log(orderItem.MRP);
  var h51 = document.createElement('h5');
  h51.innerHTML =  Number(orderItem.MRP).toLocaleString('en-IN', curFormat);

  //console.log(orderItem.UnitPrise);
  var small4 = document.createElement('small');
  small4.innerHTML =  Number(orderItem.UnitPrise).toLocaleString('en-IN', curFormat) ;

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

  //console.log(dDate.toLocaleDateString("en-US", options));
  //console.log(tempDate);

  //order can be cancelled only if order status is Pending and delivery Date is > todays date
  if (orderStatusValue === 'Pending' && dDate >= tempDate) {
    //console.log('Delete applicable');
    var tr3 = document.createElement('tr');
    //console.log(orderItem.Quantity);
    var td4 = document.createElement('td');

    var span2 = document.createElement('span');
    span2.setAttribute("id", "btnDelete" + index);

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
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

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
              if (selectedOrder.discountedprize > 0) {
                walletAmount = selectedOrder.discountedprize;
              } else {
                walletAmount = selectedOrder.totalAmount;
              }
              var walletRs = Number(walletAmount).toLocaleString('en-IN', curFormat);;

              document.getElementById("walletMessage").innerHTML = "Wallet has been added with : " + walletRs;
              document.getElementById("message").style.display = "block";
              updateWalletDetails(userID, walletAmount, 'add');
            }
            totalPrise = selectedOrder.totalAmount;
            discountedAmount = selectedOrder.discountedprize;
            modifiedOrder = selectedOrder;
            modifiedOrder.orderStatus = 'Cancelled';
            if (modifiedOrder.paymentStatus === 'Completed')
              modifiedOrder.paymentStatus = 'Pending';
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
            if (Number(totalPrise) < Number(oldPrize)) {
              refundAmount = Number(oldPrize) - Number(totalPrise);
            }
            if (Number(discountedAmount) < Number(oldDiscountPrise)) {
              refundAmount = Number(oldDiscountPrise) - Number(discountedAmount);
            }
            // console.log(refundAmount);
            // console.log(userID);

            if ((refundAmount != undefined && refundAmount > 0) && modifiedOrder.paymentStatus === 'Completed') {
              //  console.log('refundAmount : ', refundAmount);

              var walletRs = Number(refundAmount).toLocaleString('en-IN', curFormat);;

              document.getElementById("walletMessage").innerHTML = "Wallet has been added with : " + walletRs;
              document.getElementById("message").style.display = "block";

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
          paymentStatus: modifiedOrder.paymentStatus,
          totalItems: modifiedOrder.orderItems.length,
          totalAmount: totalPrise,
          discountedprize: discountedAmount
        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: " + orderID);
          document.getElementById("itemcount").innerHTML = modifiedOrder.orderItems.length;
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

          }
          UpdateOrderTrackingDetails(orderChanges, orderID);
          getOrderDetails();
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
  //console.log(parentdiv);
  parentdiv.innerHTML = "";
}



function updateWalletDetails(userID, totalamount, addDelete) {
  var currentAmount = 0;
  const snapshot = db.collection('UserWallet').doc(userID);

  var WalletDetails = [];

  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        currentAmount = doc.data().WalletAmount;
        WalletDetails = doc.data().WalletDetails;
      }
      if (addDelete === 'add')
        currentAmount = Number(currentAmount) + Number(totalamount);
      else
        currentAmount = Number(currentAmount) - Number(totalamount);
      console.log(WalletDetails);
      if (WalletDetails === undefined)
        WalletDetails = [];
      WalletDetails.push({
        orderID: orderID,
        WalletAmount: totalamount,
        WalletType: addDelete,
        Date: firebase.firestore.Timestamp.fromDate(new Date())
      });

      console.log(WalletDetails);
      db.collection("UserWallet").doc(userID).set({
          WalletAmount: currentAmount,
          UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
          WalletDetails: WalletDetails,
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
