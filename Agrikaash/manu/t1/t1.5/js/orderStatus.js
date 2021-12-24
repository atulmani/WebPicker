//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];

// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
const orderDateRange = searchParams.get('orderDateRange');
// v
try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(userID);
      GetProfileData();
      GetUserList();
      populateOrderDetails();

    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }

  });
} catch (error) {

  console.log(error.message);
}
//window.location.href = "../index.html";
function GetUserList() {
  var DBrows = db.collection('UserList').get();

  DBrows.then((changes) => {
    var i = 0;
    changes.forEach(change => {
      orderList = change.data();
      //orderList.sort()
      //console.log(change.doc, index, selectdedItem);
      var name = change.data().CreatedBy;
      var strText = change.data().displayName + ":" + change.data().EmailID;
      var strValue = change.id;
      console.log(strValue);
      console.log(strText);
      var option = document.createElement("option");
      option.setAttribute("value", strValue);
      option.innerHTML = strText;

      document.getElementById("userList").appendChild(option);

    });
  });


}

function GetProfileData() {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(userID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        //userID = doc.data().uid;
        console.log(userID);

        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }
        //document.getElementById('headerProfilePic').src = doc.data().ProfileImageURL;
        //document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function GetOrderByUsers() {
  var index = 0;
  document.getElementById('loading').style.display = 'block';
  var users = document.getElementById('userList');
  var selecteduservalue = users.options[users.selectedIndex].value;
  console.log(selecteduservalue);
var DBrows;
  if(selecteduservalue === 'All')
{
  DBrows = db.collection('OrderDetails')
    .get();

}
  else {
    DBrows = db.collection('OrderDetails')
      .where("orderBy", "==", selecteduservalue).get();


  }

  DBrows.then((changes) => {
    console.log("populatePayments: ");

    var i = 0;
document.getElementById("orderList").innerHTML="";
    changes.forEach(change => {
      orderList = change.data();
      //orderList.sort()
      //console.log(change.doc, index, selectdedItem);
      var name = change.data().CreatedBy;
      console.log(change.id);
      //for (i = 0; i < orderList.length; i++) {
      renderOrder(orderList, index, name, change.id);
      index = index + 1;
    });
  });
  document.getElementById('loading').style.display = 'none';


}

function populateOrderDetails() {

  // const snapshot = db.collection('OrderDetails').doc(userID);
  var fromDate;
  var todayDate = new Date();
  console.log(todayDate);
  var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

  todayDate = refDate;
  console.log(toDate);
  console.log(todayDate);
  var index = 0;
  var snapshot;
  var DBrows;
  console.log(orderDateRange);
  if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null)

  {
    DBrows = db.collection('OrderDetails').get();

    //DBrow = db.collection('OrderDetails').get();
  } else if (orderDateRange === 'today') {
    console.log('in today');
    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", toDate).get();

  } else if (orderDateRange === 'yesterday') {
    console.log(todayDate);
    console.log(toDate);

    todayDate.setDate(todayDate.getDate() - 1);

    //  toDate.setDate(toDate.getDate() + 1);
    console.log(todayDate);
    console.log(toDate);
    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", todayDate)
      .where("orderDate", "<=", toDate).get();
  } else if (orderDateRange === 'week') {
    refDate.setDate(refDate.getDate() - 7);
    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", refDate).get();
  } else if (orderDateRange === 'month') {
    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", refDate).get();
  }
  console.log('before log');
  //snapshot.then((changes) => {

  DBrows.then((changes) => {
    console.log("populatePayments: ");

    var i = 0;
document.getElementById("orderList").innerHTML="";
    changes.forEach(change => {
      orderList = change.data();
      //orderList.sort()
      //console.log(change.doc, index, selectdedItem);
      var name = change.data().CreatedBy;
      console.log(change.id);
      //for (i = 0; i < orderList.length; i++) {
      renderOrder(orderList, index, name, change.id);
      index = index + 1;
    });
  });
  document.getElementById('loading').style.display = 'none';


}

function renderPendingPaymentOrder(order, index, createdBy, orderid) {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var dDate = new Date(order.deliveryDate.seconds * 1000);
  var dt1 = dDate.toLocaleDateString("en-US", options);

  var oDate = new Date(order.orderDate.seconds * 1000);
  var dt = oDate.toLocaleDateString("en-US", options);

  // var anchor = document.createElement("a");
  // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Pending");
  div1.setAttribute("style", "padding: 5px;");
  div1.setAttribute("id", "mainDiv" + index);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");
  div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");

  var div5 = document.createElement("div");
  div5.setAttribute("class", "order-details");

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', orderid);

  div5.appendChild(hforderid);

  var hforderby = document.createElement("input");
  hforderby.setAttribute('type', 'hidden');
  hforderby.setAttribute('id', 'hfOrderBy' + index);
  hforderby.setAttribute('value', order.orderBy);

  div5.appendChild(hforderby);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");

  div5.appendChild(i1);

  var spanDelete = document.createElement('span');
  spanDelete.setAttribute("id", "btnDelete" + index);
  spanDelete.setAttribute("onclick", "deleteOrder(" + "hfOrderID" + index + ",mainDiv" + index + ");");
  spanDelete.setAttribute("class", "material-icons");
  spanDelete.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
  spanDelete.innerHTML = "delete_outline";

  div5.appendChild(spanDelete);

  div3.appendChild(div5);

  var small1 = document.createElement("small");
  small1.setAttribute("class", "payment-pending");
  small1.innerHTML = "Delivery Date: " + dt1; //dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear() + "";

  div3.appendChild(small1);

  var small11 = document.createElement("small");
  small11.setAttribute("class", "payment-pending");
  small11.innerHTML = "Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;

  div3.appendChild(small11);
  div2.appendChild(div3);

  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);

  div2.appendChild(h1);

  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;

  div2.appendChild(h11);


  h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;
  div2.appendChild(h11);

  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;

  div2.appendChild(h2);

  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
    div2.appendChild(h21);

  }

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.setAttribute("class", "payment-pending");
  div4h1.innerHTML = order.totalItems + " Items";

  div4.appendChild(div4h1);

  var div4h2 = document.createElement("h5");
  div4h2.setAttribute("class", "payment-pending");
  div4h2.innerHTML = 'Payment Pending';
  div4.appendChild(div4h2);
  div2.appendChild(div4);

  //div2.appendChild(div5);

  //  anchor.appendChild(div2);

  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}


function renderPendingOrder(order, index, createdBy, orderid) {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var dDate = new Date(order.deliveryDate.seconds * 1000);
  var dt1 = dDate.toLocaleDateString("en-US", options);

  var oDate = new Date(order.orderDate.seconds * 1000);
  var dt = oDate.toLocaleDateString("en-US", options);
  //
  // var anchor = document.createElement("a");
  // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Pending");
  div1.setAttribute("style", "padding: 5px;");
  div1.setAttribute("id", "mainDiv" + index);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");
  div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");

  var div5 = document.createElement("div");
  div5.setAttribute("class", "order-details");

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', orderid);

  div5.appendChild(hforderid);

  var hforderby = document.createElement("input");
  hforderby.setAttribute('type', 'hidden');
  hforderby.setAttribute('id', 'hfOrderBy' + index);
  hforderby.setAttribute('value', order.orderBy);

  div5.appendChild(hforderby);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");

  div5.appendChild(i1);

  var spanDelete = document.createElement('span');
  spanDelete.setAttribute("id", "btnDelete" + index);
  spanDelete.setAttribute("onclick", "deleteOrder(" + "hfOrderID" + index + ",mainDiv" + index + ");");
  spanDelete.setAttribute("class", "material-icons");
  spanDelete.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
  spanDelete.innerHTML = "delete_outline";

  div5.appendChild(spanDelete);
  div3.appendChild(div5);

  var small1 = document.createElement("small");
  small1.setAttribute("class", "delivery-pending");
  small1.innerHTML = "Delivery Date: " + dt1; //dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();;
  div3.appendChild(small1);

  var small11 = document.createElement("small");
  small11.setAttribute("class", "delivery-pending");
  small11.innerHTML = "Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;
  div3.appendChild(small11)

  div2.appendChild(div3);

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons delivery-pending");
  span1.innerHTML = 'schedule';

  div2.appendChild(span1);

  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);
  div2.appendChild(h1);

  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;
  div2.appendChild(h11);

  h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;
  div2.appendChild(h11);

  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");
  }

  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;
  div2.appendChild(h2);

  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
    div2.appendChild(h21);
  }

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.setAttribute("class", "delivery-pending");
  div4h1.innerHTML = order.totalItems + " Items";

  div4.appendChild(div4h1);

  var div4h2 = document.createElement("h5");
  div4h2.setAttribute("class", "delivery-pending");
  div4h2.innerHTML = 'Delivery Pending';
  div4.appendChild(div4h2);
  div2.appendChild(div4);
  //  anchor.appendChild(div2);
  //div1.appendChild(anchor);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}

function renderDeliveredOrder(order, index, createdBy, orderid) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var dDate = new Date(order.deliveryDate.seconds * 1000);
  var dt1 = dDate.toLocaleDateString("en-US", options);

  var oDate = new Date(order.orderDate.seconds * 1000);
  var dt = oDate.toLocaleDateString("en-US", options);


  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Delivered");
  div1.setAttribute("style", "padding: 5px;");
  div1.setAttribute("id", "mainDiv" + index);

  // var anchor = document.createElement("a");
  // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");
  div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");

  var div5 = document.createElement("div");
  div5.setAttribute("class", "order-details");

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', orderid);

  div5.appendChild(hforderid);

  var hforderby = document.createElement("input");
  hforderby.setAttribute('type', 'hidden');
  hforderby.setAttribute('id', 'hfOrderBy' + index);
  hforderby.setAttribute('value', order.orderBy);

  div5.appendChild(hforderby);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");

  div5.appendChild(i1);
  div3.appendChild(div5);

  var small1 = document.createElement("small");
  small1.innerHTML = "Delivery Date: " + dt1; // dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();;

  div3.appendChild(small1);

  var small11 = document.createElement("small");
  small11.innerHTML = "<br>Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;


  div3.appendChild(small11);
  div2.appendChild(div3);

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons");
  span1.innerHTML = 'task_alt';

  div2.appendChild(span1);

  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);
  div2.appendChild(h1);

  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;
  div2.appendChild(h11);

  h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;
  div2.appendChild(h11);

  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;
  div2.appendChild(h2);

  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
    div2.appendChild(h21);
  }

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.innerHTML = order.totalItems + " Items";

  div4.appendChild(div4h1);
  var div4h2 = document.createElement("h5");
  div4h2.innerHTML = 'Delivered';

  div4.appendChild(div4h2);
  div2.appendChild(div4);
  // anchor.appendChild(div2);
  // div1.appendChild(anchor);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}

function renderCancelledOrder(order, index, createdBy, orderid) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var dDate = new Date(order.deliveryDate.seconds * 1000);
  var dt1 = dDate.toLocaleDateString("en-US", options);

  var oDate = new Date(order.orderDate.seconds * 1000);
  var dt = oDate.toLocaleDateString("en-US", options);


  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Cancelled");
  div1.setAttribute("style", "padding: 5px;");
  div1.setAttribute("id", "mainDiv" + index);
  //
  // var anchor = document.createElement("a");
  // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");
  div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");

  var div5 = document.createElement("div");
  div5.setAttribute("class", "order-details");

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', orderid);

  div5.appendChild(hforderid);

  var hforderby = document.createElement("input");
  hforderby.setAttribute('type', 'hidden');
  hforderby.setAttribute('id', 'hfOrderBy' + index);
  hforderby.setAttribute('value', order.orderBy);

  div5.appendChild(hforderby);

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");

  div5.appendChild(i1);
  div3.appendChild(div5);

  var small1 = document.createElement("small");
  small1.setAttribute('class', "cancel");
  small1.innerHTML = "Delivery Date: " + dt1; //dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();
  div3.appendChild(small1);

  var small11 = document.createElement("small");
  small11.setAttribute("class", "cancel");
  small11.innerHTML = "<br>Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;
  div3.appendChild(small11);

  div2.appendChild(div3);

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons cancel");
  span1.innerHTML = 'cancel';
  div2.appendChild(span1);

  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);
  div2.appendChild(h1);

  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;
  div2.appendChild(h11);

  h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;
  div2.appendChild(h11);

  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;
  div2.appendChild(h2);

  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
    div2.appendChild(h21);
  }

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.setAttribute('class', 'cancel');
  div4h1.innerHTML = order.totalItems + " Items";
  div4.appendChild(div4h1);

  var div4h2 = document.createElement("h5");
  div4h2.setAttribute('class', 'cancel');
  div4h2.innerHTML = 'Cancelled';
  div4.appendChild(div4h2);

  div2.appendChild(div4);
  // anchor.appendChild(div2);
  // div1.appendChild(anchor);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}
/////////////////////new function
function renderOrder(order, index, createdBy, orderid) {
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
  if (order.orderStatus === 'Pending' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(order, index, createdBy, orderid);
  } else if (order.orderStatus === 'Pending' && order.paymentStatus === 'Completed') {
    renderPendingOrder(order, index, createdBy, orderid);
  } else if (order.paymentStatus === 'Completed' && order.orderStatus === 'Delivered') {
    renderDeliveredOrder(order, index, createdBy, orderid);
  } else if (order.orderStatus === 'Packed' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(order, index, createdBy, orderid);
  } else if (order.orderStatus === 'Packed' && order.paymentStatus === 'Completed') {
    renderPendingOrder(order, index, createdBy, orderid);
  } else if (order.orderStatus === 'On The Way' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(order, index, createdBy, orderid);
  } else if (order.orderStatus === 'On The Way' && order.paymentStatus === 'Completed') {
    renderPendingOrder(order, index, createdBy, orderid);
  } else if (order.orderStatus === 'Cancelled') {
    renderCancelledOrder(order, index, createdBy, orderid);
  }

}


function GetOrderDetails(orderID, userID) {
  console.log(orderID);

  window.location.href = "orderDetails.html?id=" + orderID.value + "&userID=" + userID.value;
}



//function anchorlLnkClick() {

// $(window).load(function(){
console.log('Inside ready function');
console.log(document.getElementById('anchorAll'));
$('#anchorAll').click(function() {
  // hideall();
  // $('.all').toggle("slide");
  console.log('clicked all');
  $('.Pending').show("slide");
  $('.Delivered').show("slide");
  $('.Cancelled').show("slide");
  // $('.Fruit').show("slide");
});
$('#anchorPending').click(function() {
  hideall();
  $('.Pending').show("fadeUp");
});
$('#anchorDelivered').click(function() {
  hideall();
  $('.Delivered').show("slide");
});

$('#anchorCancelled').click(function() {
  hideall();
  $('.Cancelled').show("slide");
});
// $('#anchorPearl').click(function() {
//   hideall();
//   $('.Pearl').show("slide");
// });
// $('#anchorFruit').click(function() {
//   hideall();
//   $('.Fruit').show("slide");
// });

function hideall() {
  $('.Pending').hide();
  $('.Delivered').hide();
  $('.Cancelled').hide();
  // $('.Fruit').hide();
};

//}
