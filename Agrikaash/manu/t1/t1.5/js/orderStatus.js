//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];

// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var orderDateRange = searchParams.get('orderDateRange');
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
      //console.log(strValue);
      //console.log(strText);
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


function dateRangeChange()
{
  var dateRange = document.getElementById('dateRange');
  var value=dateRange.options[dateRange.selectedIndex].value;
  if(value === 'Today' )
    window.location.href="orderStatus.html?orderDateRange=today";
  else if(value === 'Yesterday' )
    window.location.href="orderStatus.html?orderDateRange=yesterday";

  else if(value === 'Last 7 days' )
    window.location.href="orderStatus.html?orderDateRange=week";
  else if(value === 'Current month' )
    window.location.href="orderStatus.html?orderDateRange=month";
  else if(value === 'Last 6 months' )
      window.location.href="orderStatus.html?orderDateRange=sixmonth";

}
function GetOrderByUsers() {
  var index = 0;
  document.getElementById('loading').style.display = 'block';
  var users = document.getElementById('userList');
  var selecteduservalue = users.options[users.selectedIndex].value;
  console.log(selecteduservalue);
  var DBrows;
  if (selecteduservalue === 'All') {
    DBrows = db.collection('OrderDetails')
      .get();

  } else {
    DBrows = db.collection('OrderDetails')
      .where("orderBy", "==", selecteduservalue).get();


  }

  DBrows.then((changes) => {
    console.log("populatePayments: ");

    var i = 0;
    document.getElementById("orderList").innerHTML = "";
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

function populateOrderDetailsBackup() {

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
    document.getElementById("orderList").innerHTML = "";
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
function renderOrderbackup(order, index, createdBy, orderid) {
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



function populateOrderDetails() {
  var i = 0;
  var fromDate;
  var todayDate = new Date();
  var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

  todayDate = refDate;
  var index = 0;
  var snapshot;
  var DBrows;

  var fromDate ;
  var toDate;
  console.log('test',orderDateRange);
  if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null || orderDateRange === 'null')
  {
    orderDateRange = "week";
    console.log(orderDateRange);
  }
  console.log(orderDateRange);

    //DBrow = db.collection('OrderDetails').get();
   if (orderDateRange === 'today') {
    var filter = document.getElementById("dateRange");
    filter.options[0].selected = true;
    console.log(toDate);
    DBrows = db.collection('OrderDetails')
      //.where('orderBy', '==', userID)
      .where("orderDate", ">=", toDate).get();

      fromDate = 'Today';
      toDate = 'Today';

  } else if (orderDateRange === 'yesterday') {
    var filter = document.getElementById("dateRange");
    filter.options[1].selected = true;

      todayDate.setDate(todayDate.getDate() - 1);
  //  toDate.setDate(toDate.getDate() + 1);
  console.log(todayDate);
  console.log(toDate);
    DBrows = db.collection('OrderDetails')
      //.where('orderBy', '==', userID)
      .where("orderDate", ">=", todayDate)
      .where("orderDate", "<=", toDate).get();

      fromDate = todayDate;
      toDate=todayDate;

  } else if (orderDateRange === 'week') {
    var filter = document.getElementById("dateRange");
    filter.options[2].selected = true;

    refDate.setDate(refDate.getDate() - 7);
    DBrows = db.collection('OrderDetails')
      //.where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate).get();
      fromDate = refDate;
      toDate='Today';

  } else if (orderDateRange === 'month') {
    var filter = document.getElementById("dateRange");
    filter.options[3].selected = true;

    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    DBrows = db.collection('OrderDetails')
      //.where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate).get();
      fromDate = refDate;
      toDate ='Today';

  }else if(orderDateRange === 'sixmonth')
  {
    var filter = document.getElementById("dateRange");
    filter.options[4].selected = true;

    refDate = refDate.setMonth(refDate.getMonth() - 6);
    refDate = new Date(refDate);
      DBrows = db.collection('OrderDetails')
      //.where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate).get();
      fromDate = refDate;
      toDate = 'Today';

  }


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  //console.log('fromDate' ,fromDate);
  //console.log('toDate',toDate);
  if(fromDate ==='Today')
  {
  document.getElementById('dateRangelbl').innerHTML="Order Placed Today";
  }
  else if(fromDate === toDate)
  {
    var displayDate  = fromDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML="Order Placed on :" + displayDate;
  }else if(toDate==='Today')
  {
    var fDate = new Date(fromDate);
    var displayDate  = fDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML= displayDate +" till Today";
  }


  DBrows.then((changes) => {

    var i = 0;
    document.getElementById("orderListDiv").innerHTML="";

    changes.forEach(change => {
      orderList = change.data();
      renderOrder(change.id, change.data(), i);
      i = i + 1;
    });

    document.getElementById("orderCount").innerHTML=i + " Orders";
    document.getElementById('loading').style.display = 'none';
  });
  populateCartData();


}

function populateCartData() {
  var itemCount = 0;
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      cartDetails = doc.data().cartDetails;
      itemCount = cartDetails.length;
      //console.log(change.doc, index, selectdedItem);
    }
    //document.getElementById('cartItemCount').innerHTML = itemCount;

  });

}

function renderOrder(orderid, order, index)
{
  var div1 = document.createElement("div");
  div1.setAttribute("class","dashboard-card order-status");

  var div2 = document.createElement("div");
  div2.setAttribute("class","");
  div2.setAttribute("style","display:flex;align-items: center;");

  var div3 = document.createElement("div");
  div3.setAttribute("class","arrow-down");

  var span1 = document.createElement("span");
  span1.setAttribute("class","material-icons-outlined");
  span1.innerHTML="keyboard_arrow_down";

  div3.appendChild(span1);

    var hforderid = document.createElement("input");
    hforderid.setAttribute('type', 'hidden');
    hforderid.setAttribute('id', 'hfOrderID' + index);
    hforderid.setAttribute('value', order.orderID);
    div3.appendChild(hforderid);
  div2.appendChild(div3);

  var div4=document.createElement("div");
  div4.setAttribute("class","");

  var span2=document.createElement("span");
  span2.setAttribute("class","material-icons-outlined order-icon")
  if(order.orderStatus==="Delivered")
  {
    span2.setAttribute("style","font-size: 3rem; color: #1D741B;");
    span2.innerHTML="check_circle";
  }
  else if(order.orderStatus==="On The Way")
  {
    span2.setAttribute("style","font-size: 3rem; color: #88CA5E;");
    span2.innerHTML="local_shipping";
  }
  else if(order.orderStatus==="Packed" )
  {

      span2.setAttribute("style","font-size: 3rem; color: #F8D210;");
      span2.innerHTML="widgets";
  }
  else if(order.orderStatus==="Pending" )
  {

      span2.setAttribute("style","font-size: 3rem; color: #F8D210;");
      span2.innerHTML="history_toggle_off";
  }
  else if(order.orderStatus==="Cancelled")
  {

      span2.setAttribute("style","font-size: 3rem; color: #ff5757;");
      span2.innerHTML="cancel";
  }

  //span2.setAttribute("class","material-icons-outlined order-icon");
  //check for order statys and change the icon
  //span2.innerHTML="check_circle";

  div4.appendChild(span2);
  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class","details");

  var h1 = document.createElement("h4");
  if(order.orderStatus === "Delivered")
  {
    h1.setAttribute("style","color: #1D741B" );
    h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "On The Way")
  {
      h1.setAttribute("style","color: #88CA5E" );
      h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "Packed")
  {
      h1.setAttribute("style","color: #F8D210" );
      h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "Cancelled")
  {
      h1.setAttribute("style","color: #ff5757" );
      h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "Pending")
  {
      h1.setAttribute("style","color: #F8D210" );
      h1.innerHTML = order.orderStatus;
  }
  div5.appendChild(h1);


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


    var dt =   order.deliveryDate ;
    var odeldate = new Date(dt.seconds * 1000);
    var delDate  = odeldate.toLocaleDateString("en-US", options);

  var p1 = document.createElement("p");
  p1.setAttribute("class","small-text dashboard-sub-heading");
  p1.innerHTML="Delivery date: " + delDate+ " [ " +  order.deliveryTime + " ] - " + order.totalItems +" Items" ;

  div5.appendChild(p1);
  div2.appendChild(div5);
  div1.appendChild(div2);

  var div6 = document.createElement("div");
  div6.setAttribute("class","dashboard-card-expand");

  var hr1 = document.createElement("hr");
  div6.appendChild(hr1);

  var div7 = document.createElement("div");
  div7.setAttribute("class","dashboard-card-order");

  var div8=document.createElement("div");
  div8.setAttribute("class","");

  var h2= document.createElement("h5");
  h2.setAttribute("class","small-text");
  h2.setAttribute("style","margin: 0 auto;");
  h2.innerHTML="Order Number";
  div8.appendChild(h2);

  var small1 = document.createElement("small");
  small1.innerHTML=order.orderNumber;
  div8.appendChild(small1);

  div7.appendChild(div8);

  var div9= document.createElement("div");
  div9.setAttribute("class","");

  var h3= document.createElement("h5");
  h3.setAttribute("class","small-text");
  h3.setAttribute("style","margin: 0 auto;");
  h3.innerHTML="Order Date";
  div9.appendChild(h3);

  var odt =   order.orderDate ;
  var oOrderdate = new Date(odt.seconds * 1000);
  var orderDate  = oOrderdate.toLocaleDateString("en-US", options);

  var small2 = document.createElement("small");
  small2.innerHTML=orderDate;
  div9.appendChild(small2);

  div7.appendChild(div9);

  div6.appendChild(div7);

  var br1 = document.createElement("br");
  div6.appendChild(br1);

  var div10 = document.createElement("div");
  div10.setAttribute("class","dashboard-card-order");

  var div11 = document.createElement("div");
  div11.setAttribute("class","");

    var h4= document.createElement("h5");
    h4.setAttribute("class","small-text");
    h4.setAttribute("style","margin: 0 auto;");
    h4.innerHTML="Total Amount";
    div11.appendChild(h4);

      var curFormat = { style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 };

      var displayAmt = Number(order.totalAmount).toLocaleString('en-IN', curFormat);
      var small3 = document.createElement("small");
    small3.innerHTML=displayAmt;
    div11.appendChild(small3);

    div10.appendChild(div11);

    var div12 = document.createElement("div");
    div12.setAttribute("class","");

    var h5= document.createElement("h5");
    h5.setAttribute("class","small-text");
    h5.setAttribute("style","margin: 0 auto;");
    h5.innerHTML="Discount";
    div12.appendChild(h5);

    var displayDiscountAmt = order.discountedprize.toLocaleString('en-IN', curFormat);
    //console.log(displayDiscountAmt);
      var discount = order.discountDetails.coupondID;

    var small4 = document.createElement("small");
    if(order.discountDetails.coupondID === "none"){
      small4.innerHTML="No Discount";
    }
    else {
      small4.innerHTML=displayDiscountAmt + "(Off " + order.discountDetails.discountValue + ")";
    }
    div12.appendChild(small4);

    div10.appendChild(div12);
    div6.appendChild(div10);
      var br2 = document.createElement("br");
      div6.appendChild(br2);

      ///to be updated only in Admin module - Start

        var div13 = document.createElement("div");
        div13.setAttribute("class","dashboard-card-order");

        var div14 = document.createElement("div");
        div14.setAttribute("class","");


          var h5= document.createElement("h5");
          h5.setAttribute("class","small-text");
          h5.setAttribute("style","margin: 0 auto;");
          h5.innerHTML="Order By";
          div14.appendChild(h5);
          //console.log(order);
          var small4 = document.createElement("small");
          small4.innerHTML= order.orderByUserName + " : "+ order.CreatedBy;
          div14.appendChild(small4);

          div13.appendChild(div14);

          var div15 = document.createElement("div");
          div15.setAttribute("class","");

          div13.appendChild(div15);
          div6.appendChild(div13);
            var br3 = document.createElement("br");
            div6.appendChild(br2);

                  ///to be updated only in Admin module - End


    var dDate = new Date(order.deliveryDate.seconds * 1000);

    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() + 2);

    var flag= false;
    //order can be cancelled only if order status is Pending and delivery Date is > todays date
    if (order.orderStatus === 'Pending' && dDate >= tempDate) {
      flag = true;
    } else {
      flag = false;
    }

      var div16 = document.createElement("div");
      div16.setAttribute("class","");
      div16.setAttribute("style","display:flex;align-items:center;justify-content: space-between;padding-top: 10px;");

      var anchor1 = document.createElement("a");
      anchor1.setAttribute("href","#trend");

      var button1 = document.createElement("button");
      button1.setAttribute("class","mybutton buttonTransparent");
      button1.setAttribute("style","padding-bottom: 7px;margin: auto 10px;");
      button1.innerHTML = "Delete";

      var span11 = document.createElement("span");
      span11.setAttribute("class","material-icons-outlined");
      span11.setAttribute("style","position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
      span11.innerHTML= "delete_forever";
      button1.appendChild(span11);
      anchor1.appendChild(button1);
      if(flag === true)
        div16.appendChild(anchor1);

      var anchor2 = document.createElement("a");
      anchor2.setAttribute("href","orderDetails.html?id=" + orderid +"&userID=" + order.orderBy);
      //anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

      var button2 = document.createElement("button");
      button2.setAttribute("class","mybutton buttonTransparent");
      button2.setAttribute("style","padding-bottom: 7px;margin: auto 10px;");
      button2.innerHTML = "Edit";

      var span12 = document.createElement("span");
      span12.setAttribute("class","material-icons-outlined");
      span12.setAttribute("style","position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
      span12.innerHTML= "edit";
      button2.appendChild(span12);
      anchor2.appendChild(button2);
      div16.appendChild(anchor2);
      div6.appendChild(div16);
      div1.appendChild(div6);
      document.getElementById("orderListDiv").appendChild(div1);
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
