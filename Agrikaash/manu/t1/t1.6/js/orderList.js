//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
var userType = "";
var exportData = [];
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var orderDateRange = searchParams.get('orderDateRange');

try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      UpdateCartItem();
      populateOrderDetails('Pending');
      //  GetNotificationList();
      var siteNotification = localStorage.getItem("notificationCount");
      document.getElementById("notificationCnt").innerHTML = siteNotification;
      document.getElementById("notificationCnt1").innerHTML = siteNotification;

    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }

  });
} catch (error) {

  console.log(error.message);
}
//window.location.href = "../index.html";


function UpdateCartItem() {
  var cartItemNo = document.getElementById('cartItemNo');
  //console.log(cartItemNo);
  const snapshotCart = db.collection('CartDetails').doc(userID);
  snapshotCart.get().then((doc) => {
    if (doc.exists) {
      //console.log("doc exists");
      var itemlist = doc.data().cartDetails;
      //console.log(itemlist);
      item = itemlist.length;
      cartItems = itemlist;
      // item = doc.data().cartDetails.length;
      //console.log(item[0]);
      cartItemNo.innerHTML = item;
    }
  });
}


function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        userType = doc.data().userType;

        if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        document.getElementById('profileName').innerHTML = doc.data().displayName;

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

//
// function GetNotificationList() {
//   var index = 0;
//   var flag = false;
//   var today = new Date();
//
//   const DBrows = db.collection('Notification')
//     .where("Status", '==', 'Active')
//     .where('ValidityTill', ">=", today)
//     //.orderBy('CreatedTimestamp', 'desc');
//
//   DBrows.onSnapshot((snapshot) => {
//     let changes = snapshot.docChanges();
//
//     changes.forEach(change => {
//       var userListDB = change.doc.data().UserList;
//       var userTypeDB = change.doc.data().UserType;
//
//       if (userListDB === undefined)
//         flag = true;
//       else if (userListDB[0].userID === 'All')
//         flag = true;
//       else if (userListDB.findIndex(e => e.userID === userID) >= 0)
//         flag = true;
//       else if (userTypeDB === undefined)
//         flag = true;
//       else if (userTypeDB[0] === 'All')
//         flag = true;
//       else if (userTypeDB.indexOf(userType) >= 0)
//         flag = true;
//       if (flag === true) {
//         index = index + 1;
//       }
//     });
//
//     if(flag === true)
//     {
//       document.getElementById("notificationCnt").innerHTML=index;
//     }
//
//   });
// }
function dateRangeChange() {
  var dateRange = document.getElementById('dateRange');
  var value = dateRange.options[dateRange.selectedIndex].value;
  if (value === 'Today')
    window.location.href = "orderList.html?orderDateRange=today";
  else if (value === 'Yesterday')
    window.location.href = "orderList.html?orderDateRange=yesterday";

  else if (value === 'Last 7 days')
    window.location.href = "orderList.html?orderDateRange=week";
  else if (value === 'Current month')
    window.location.href = "orderList.html?orderDateRange=month";
  else if (value === 'Last 6 months')
    window.location.href = "orderList.html?orderDateRange=sixmonth";

}

function GetOrder(filter) {
  var orderMenuListHr = document.getElementById('orderMenuListHr');
  // console.log(filter);
  if (filter === 'Pending') {
    orderMenuListHr.style.transform = 'translateX(0%)';
  } else if (filter === 'Delivered') {
    orderMenuListHr.style.transform = 'translateX(100%)';
  } else {
    orderMenuListHr.style.transform = 'translateX(200%)';
  }
  populateOrderDetails(filter);

}


function populateOrderDetails(filter) {
  var i = 0;
  var fromDate;
  var todayDate = new Date();
  var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  document.getElementById('noOrders').style.display = 'none';

  exportData = [];
  exportData.push({
    C1: "OrderID",
    C2: "OrderBy",
    C3: "OrderDate",
    C4: "DeliveryDate",
    C5: "DeliveryTime",
    C6: "OrderStatus",
    C7: "PaymentStatus",
    C8: "TotalItems",
    C9: "TotalAmount",
    C10: "DiscountedAmount"
  });
  todayDate = refDate;
  var index = 0;
  var snapshot;
  var DBrows;

  var orderstatusList = [];
  if (filter === 'Pending') {
    orderstatusList = ['Pending', 'Packed', 'On The Way'];
  } else {
    orderstatusList = [filter];
  }
  console.log(orderstatusList);
  var fromDate;
  var toDate;
  console.log('test', orderDateRange);
  if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null || orderDateRange === 'null') {
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
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", toDate)
      .where("orderStatus", "in", orderstatusList)
      .orderBy("orderDate", 'desc')
      .get();

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
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", todayDate)
      .where("orderDate", "<=", toDate)
      .where("orderStatus", "in", orderstatusList)
      .orderBy("orderDate", 'desc')
      .get();

    fromDate = todayDate;
    toDate = todayDate;

  } else if (orderDateRange === 'week') {
    var filter = document.getElementById("dateRange");
    filter.options[2].selected = true;

    refDate.setDate(refDate.getDate() - 7);
    DBrows = db.collection('OrderDetails')
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate)
      .where("orderStatus", "in", orderstatusList)
      .orderBy("orderDate", 'desc')
      .get();
    fromDate = refDate;
    toDate = 'Today';

  } else if (orderDateRange === 'month') {
    var filter = document.getElementById("dateRange");
    filter.options[3].selected = true;

    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    DBrows = db.collection('OrderDetails')
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate)
      .where("orderStatus", "in", orderstatusList)
      .orderBy("orderDate", 'desc')
      .get();
    fromDate = refDate;
    toDate = 'Today';

  } else if (orderDateRange === 'sixmonth') {
    var filter = document.getElementById("dateRange");
    filter.options[4].selected = true;

    refDate = refDate.setMonth(refDate.getMonth() - 6);
    refDate = new Date(refDate);
    DBrows = db.collection('OrderDetails')
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate)
      .where("orderStatus", "in", orderstatusList)
      .orderBy("orderDate", 'desc')
      .get();
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
  if (fromDate === 'Today') {
    document.getElementById('dateRangelbl').innerHTML = "Order Placed Today";
  } else if (fromDate === toDate) {
    var displayDate = fromDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML = "Order Placed on :" + displayDate;
  } else if (toDate === 'Today') {
    var fDate = new Date(fromDate);
    var displayDate = fDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML = displayDate + " till Today";
  }


  DBrows.then((changes) => {

    var i = 0;
    document.getElementById("orderListDiv").innerHTML = "";

    changes.forEach(change => {
      orderList = change.data();

      var orderDate = new Date(orderList.orderDate.seconds * 1000);
      var deliveryDate = new Date(orderList.deliveryDate.seconds * 1000);
      exportData.push({
        C1: orderList.orderNumber.toString(),
        C2: orderList.orderBy + ":" + orderList.orderByUserName + ":" + orderList.CreatedBy,
        C3: orderDate.toLocaleDateString("en-US", options),
        C4: deliveryDate.toLocaleDateString("en-US", options),
        C5: orderList.deliveryTime,
        C6: orderList.orderStatus,
        C7: orderList.paymentStatus,
        C8: orderList.totalItems,
        C9: orderList.totalAmount,
        C10: orderList.discountedprize
      });

      renderOrder(change.id, change.data(), i);
      i = i + 1;
    });
    //exportDataToExcel(exportData);
    document.getElementById("orderCount").innerHTML = i + " Orders";
    document.getElementById('loading').style.display = 'none';
    if (i === 0) {
      document.getElementById('noOrders').style.display = 'block';
    }
  });
  populateCartData();


}

function exportFile() {
  exportCSVFile(exportData, "orderDetails");
}
// function populateOrderDetailsOld() {
//   var i = 0;
//   var fromDate;
//   var todayDate = new Date();
//   var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
//   var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
//
//   todayDate = refDate;
//   var index = 0;
//   var snapshot;
//   var DBrows;
//
//   var fromDate;
//   var toDate;
//   console.log('test', orderDateRange);
//   if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null || orderDateRange === 'null') {
//     orderDateRange = "week";
//     console.log(orderDateRange);
//   }
//   console.log(orderDateRange);
//
//   //DBrow = db.collection('OrderDetails').get();
//   if (orderDateRange === 'today') {
//     var filter = document.getElementById("dateRange");
//     filter.options[0].selected = true;
//     console.log(toDate);
//     DBrows = db.collection('OrderDetails')
//       .where('orderBy', '==', userID)
//       .where("orderDate", ">=", toDate)
//       .orderBy("orderDate", 'desc')
//       .get();
//
//     fromDate = 'Today';
//     toDate = 'Today';
//
//   } else if (orderDateRange === 'yesterday') {
//     var filter = document.getElementById("dateRange");
//     filter.options[1].selected = true;
//
//     todayDate.setDate(todayDate.getDate() - 1);
//     //  toDate.setDate(toDate.getDate() + 1);
//     console.log(todayDate);
//     console.log(toDate);
//     DBrows = db.collection('OrderDetails')
//       .where('orderBy', '==', userID)
//       .where("orderDate", ">=", todayDate)
//       .where("orderDate", "<=", toDate)
//       .orderBy("orderDate", 'desc')
//       .get();
//
//     fromDate = todayDate;
//     toDate = todayDate;
//
//   } else if (orderDateRange === 'week') {
//     var filter = document.getElementById("dateRange");
//     filter.options[2].selected = true;
//
//     refDate.setDate(refDate.getDate() - 7);
//     DBrows = db.collection('OrderDetails')
//       .where('orderBy', '==', userID)
//       .where("orderDate", ">=", refDate)
//       .orderBy("orderDate", 'desc')
//       .get();
//     fromDate = refDate;
//     toDate = 'Today';
//
//   } else if (orderDateRange === 'month') {
//     var filter = document.getElementById("dateRange");
//     filter.options[3].selected = true;
//
//     refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
//     DBrows = db.collection('OrderDetails')
//       .where('orderBy', '==', userID)
//       .where("orderDate", ">=", refDate)
//       .orderBy("orderDate", 'desc')
//       .get();
//     fromDate = refDate;
//     toDate = 'Today';
//
//   } else if (orderDateRange === 'sixmonth') {
//     var filter = document.getElementById("dateRange");
//     filter.options[4].selected = true;
//
//     refDate = refDate.setMonth(refDate.getMonth() - 6);
//     refDate = new Date(refDate);
//     DBrows = db.collection('OrderDetails')
//       .where('orderBy', '==', userID)
//       .where("orderDate", ">=", refDate)
//       .orderBy("orderDate", 'desc')
//       .get();
//     fromDate = refDate;
//     toDate = 'Today';
//
//   }
//
//
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//   //console.log('fromDate' ,fromDate);
//   //console.log('toDate',toDate);
//   if (fromDate === 'Today') {
//     document.getElementById('dateRangelbl').innerHTML = "Order Placed Today";
//   } else if (fromDate === toDate) {
//     var displayDate = fromDate.toLocaleDateString("en-US", options);
//     document.getElementById('dateRangelbl').innerHTML = "Order Placed on :" + displayDate;
//   } else if (toDate === 'Today') {
//     var fDate = new Date(fromDate);
//     var displayDate = fDate.toLocaleDateString("en-US", options);
//     document.getElementById('dateRangelbl').innerHTML = displayDate + " till Today";
//   }
//
//
//   DBrows.then((changes) => {
//
//     var i = 0;
//     document.getElementById("orderListDiv").innerHTML = "";
//
//     changes.forEach(change => {
//       orderList = change.data();
//       renderOrder(change.id, change.data(), i);
//       i = i + 1;
//     });
//
//     document.getElementById("orderCount").innerHTML = i + " Orders";
//     document.getElementById('loading').style.display = 'none';
//     if(i === 0 )
//     {
//       document.getElementById('noOrders').style.display = 'block';
//     }
//   });
//   populateCartData();
//
//
// }

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

function showHideCard(card, cardArrow) {
  card.classList.toggle("active");

  cardArrow.classList.toggle("active");
}

function renderOrder(orderid, order, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "dashboard-card order-status");
  div1.setAttribute("id", "card" + index);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "");
  div2.setAttribute("style", "display:flex;align-items: center;");
  div2.setAttribute("onclick", "showHideCard(card" + index + "," + "cardarrow" + index + ")");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "arrow-down");

  var span1 = document.createElement("span");
  span1.setAttribute("class", "material-icons-outlined");
  span1.setAttribute("id", "cardarrow" + index);
  span1.innerHTML = "keyboard_arrow_down";

  div3.appendChild(span1);

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', orderid);
  div3.appendChild(hforderid);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");

  var span2 = document.createElement("span");
  span2.setAttribute("class", "material-icons-outlined order-icon")
  if (order.orderStatus === "Delivered") {
    span2.setAttribute("style", "font-size: 3rem; color: #1D741B;");
    span2.innerHTML = "check_circle";
  } else if (order.orderStatus === "On The Way") {
    span2.setAttribute("style", "font-size: 3rem; color: #88CA5E;");
    span2.innerHTML = "local_shipping";
  } else if (order.orderStatus === "Packed") {

    span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
    span2.innerHTML = "widgets";
  } else if (order.orderStatus === "Pending") {

    span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
    span2.innerHTML = "history_toggle_off";
  } else if (order.orderStatus === "Cancelled") {

    span2.setAttribute("style", "font-size: 3rem; color: #ff5757;");
    span2.innerHTML = "cancel";
  }

  //span2.setAttribute("class","material-icons-outlined order-icon");
  //check for order statys and change the icon
  //span2.innerHTML="check_circle";

  div4.appendChild(span2);
  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "details");

  var h1 = document.createElement("h4");
  if (order.orderStatus === "Delivered") {
    h1.setAttribute("style", "color: #1D741B");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "On The Way") {
    h1.setAttribute("style", "color: #88CA5E");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Packed") {
    h1.setAttribute("style", "color: #F8D210");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Cancelled") {
    h1.setAttribute("style", "color: #ff5757");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Pending") {
    h1.setAttribute("style", "color: #F8D210");
    h1.innerHTML = order.orderStatus;
  }
  div5.appendChild(h1);


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


  var dt = order.deliveryDate;
  var odeldate = new Date(dt.seconds * 1000);
  var delDate = odeldate.toLocaleDateString("en-US", options);

  var odt = order.orderDate;
  var oOrderdate = new Date(odt.seconds * 1000);
  var orderDate = oOrderdate.toLocaleDateString("en-US", options);

  var p1 = document.createElement("p");
  p1.setAttribute("class", "small-text dashboard-sub-heading");
  p1.innerHTML = "Delivery: " + delDate + " | " + order.deliveryTime + " - " + order.totalItems + " Items";
  div5.appendChild(p1);


  var p11 = document.createElement("p");
  p11.setAttribute("class", "small-text dashboard-sub-heading");
  p11.innerHTML = "Order Date: " + orderDate;

  div5.appendChild(p11);
  div2.appendChild(div5);
  div1.appendChild(div2);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "dashboard-card-expand");
  // div6.setAttribute("id", "cardarrow" + index);

  var hr1 = document.createElement("hr");
  div6.appendChild(hr1);

  var div7 = document.createElement("div");
  div7.setAttribute("class", "dashboard-card-order");

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");

  var h2 = document.createElement("h5");
  h2.setAttribute("class", "small-text");
  h2.setAttribute("style", "margin: 0 auto;");
  h2.innerHTML = "Order Number";
  div8.appendChild(h2);

  var small1 = document.createElement("small");
  small1.innerHTML = order.orderNumber;
  div8.appendChild(small1);

  div7.appendChild(div8);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "");

  var h3 = document.createElement("h5");
  h3.setAttribute("class", "small-text");
  h3.setAttribute("style", "margin: 0 auto;");
  h3.innerHTML = "Order Date";
  div9.appendChild(h3);

  var small2 = document.createElement("small");
  small2.innerHTML = orderDate;
  div9.appendChild(small2);

  div7.appendChild(div9);

  div6.appendChild(div7);

  var br1 = document.createElement("br");
  div6.appendChild(br1);

  var div10 = document.createElement("div");
  div10.setAttribute("class", "dashboard-card-order");

  var div11 = document.createElement("div");
  div11.setAttribute("class", "");

  var h4 = document.createElement("h5");
  h4.setAttribute("class", "small-text");
  h4.setAttribute("style", "margin: 0 auto;");
  h4.innerHTML = "Total Amount";
  div11.appendChild(h4);

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var displayAmt = Number(order.totalAmount).toLocaleString('en-IN', curFormat);
  var small3 = document.createElement("small");
  small3.innerHTML = displayAmt;
  div11.appendChild(small3);

  div10.appendChild(div11);

  var div12 = document.createElement("div");
  div12.setAttribute("class", "");

  var h5 = document.createElement("h5");
  h5.setAttribute("class", "small-text");
  h5.setAttribute("style", "margin: 0 auto;");
  h5.innerHTML = "Payable Amount";
  div12.appendChild(h5);

  var displayDiscountAmt = order.discountedprize.toLocaleString('en-IN', curFormat);
  //console.log(displayDiscountAmt);
  var discount = order.discountDetails.coupondID;

  var small4 = document.createElement("small");
  if (order.discountDetails.coupondID === "none") {
    small4.innerHTML = "No Discount";
  } else {
    small4.innerHTML = "<span style='font-size: 1.2rem;color: #1D741B;'>" + displayDiscountAmt + " </span> (Off " + order.discountDetails.discountValue + ")";
  }
  div12.appendChild(small4);

  div10.appendChild(div12);
  div6.appendChild(div10);
  var br2 = document.createElement("br");
  div6.appendChild(br2);

  var dDate = new Date(order.deliveryDate.seconds * 1000);

  const tempDate = new Date();
  tempDate.setDate(tempDate.getDate() + 2);

  var flag = false;
  //order can be cancelled only if order status is Pending and delivery Date is > todays date
  if (order.orderStatus === 'Pending' && dDate >= tempDate) {
    flag = true;
  } else {
    flag = false;
  }

  var div16 = document.createElement("div");
  div16.setAttribute("class", "");
  div16.setAttribute("style", "display:flex;align-items:center;justify-content: space-between;padding-top: 10px;");

  // var anchor1 = document.createElement("span");
  // anchor1.setAttribute("onclick", "cancelOrder(" + 'hfOrderID' + index + ")");


  var anchor1 = document.createElement("a");
  anchor1.setAttribute("href", "orderSummary.html?id=" + orderid + "&action=cancel");

  var button1 = document.createElement("button");
  button1.setAttribute("class", "mybutton buttonTransparent");
  button1.setAttribute("style", "padding-bottom: 7px;");
  button1.innerHTML = "Cancel";

  var span11 = document.createElement("span");
  span11.setAttribute("class", "material-icons-outlined");
  span11.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
  span11.innerHTML = "delete_forever";
  button1.appendChild(span11);
  anchor1.appendChild(button1);
  if (flag === true)
    div16.appendChild(anchor1);

  var anchor2 = document.createElement("div");
  anchor2.setAttribute("class", "");
  anchor2.setAttribute("onclick", "CopyOrder(" + index + ");");
  //anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  var button2 = document.createElement("button");
  button2.setAttribute("class", "mybutton buttonTransparent");
  button2.setAttribute("style", "padding-bottom: 7px;");
  button2.innerHTML = "Order again";

  var span12 = document.createElement("span");
  span12.setAttribute("class", "material-icons-outlined");
  span12.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
  span12.innerHTML = "replay";
  button2.appendChild(span12);
  anchor2.appendChild(button2);
  div16.appendChild(anchor2);
  div6.appendChild(div16);

  var anchor3 = document.createElement("a");
  anchor3.setAttribute("href", "orderSummary.html?id=" + orderid + "&action=view");
  //anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  var button3 = document.createElement("button");
  button3.setAttribute("class", "mybutton buttonTransparent");
  button3.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;");
  button3.innerHTML = "More";

  var span122 = document.createElement("span");
  span122.setAttribute("class", "material-icons-outlined");
  span122.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
  span122.innerHTML = "edit";
  button3.appendChild(span122);
  anchor3.appendChild(button3);
  div16.appendChild(anchor3);
  div6.appendChild(div16);


  var hr11 = document.createElement("hr");
  div6.appendChild(hr11);

  //Added elements progress- start
  const snapshot = db.collection('OrderTracking').doc(orderid);
  var changeTrack = [];
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      changeTrack = doc.data().ChangeTrack;

      var div17 = document.createElement("div");
      div17.setAttribute("class", "progress-bar-div");

      var pendingorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 1);
      var packedorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 3);
      var onTheWayorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 4);
      var deliveredorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 5);
      var cancelledorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 6);

      if (packedorderTrackIndex === -1 && onTheWayorderTrackIndex >= 0)
        packedorderTrackIndex = onTheWayorderTrackIndex;
      else if (packedorderTrackIndex === -1 && deliveredorderTrackIndex >= 0)
        packedorderTrackIndex = deliveredorderTrackIndex;

      if (onTheWayorderTrackIndex === -1 && deliveredorderTrackIndex >= 0) {
        onTheWayorderTrackIndex = deliveredorderTrackIndex;
      }

      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      //          var displayDate = fromDate.toLocaleDateString("en-US", options);

      var div18 = document.createElement("div");
      if (pendingorderTrackIndex >= 0) {
        div18.setAttribute("class", "active");
      } else {
        div18.setAttribute("class", "");
      }

      var h55 = document.createElement("h5");
      h55.innerHTML = "Pending";
      div18.appendChild(h55);

      var div19 = document.createElement("div");
      div19.setAttribute("class", "step");
      div18.appendChild(div19);

      var small51 = document.createElement("small");
      var timedisplay = "";
      if (pendingorderTrackIndex >= 0) {
        pendingDate = new Date(changeTrack[pendingorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = pendingDate.toLocaleTimeString('en-US');

        var pendingDatedisplay = pendingDate.toLocaleDateString("en-US", options);
        small51.innerHTML = pendingDatedisplay;
      }
      div18.appendChild(small51);

      var br551 = document.createElement("br");
      div18.appendChild(br551);

      var small52 = document.createElement("small");
      small52.setAttribute("class", "time");
      if (pendingorderTrackIndex >= 0) {
        small52.innerHTML = timedisplay; // "Time";
      } else {
        small52.innerHTML = "-"
      }
      div18.appendChild(small52);

      div17.appendChild(div18);

      var div20 = document.createElement("div");
      if (packedorderTrackIndex >= 0) {
        div20.setAttribute("class", "active");
      } else if (cancelledorderTrackIndex >= 0) {
        div20.setAttribute("class", "cancelled");
      } else {
        div20.setAttribute("class", "");
      }

      var h56 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h56.innerHTML = "Cancelled";
      } else {
        h56.innerHTML = "Packed";
      }

      div20.appendChild(h56);

      var div21 = document.createElement("div");
      div21.setAttribute("class", "step center");
      div20.appendChild(div21);

      var div22 = document.createElement("div");
      div22.setAttribute("class", "line");
      div20.appendChild(div22);

      var small52 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        var cancelDate = new Date(changeTrack[cancelledorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = cancelDate.toLocaleTimeString('en-US');
        cancelDate = cancelDate.toLocaleDateString("en-US", options);
        small52.innerHTML = cancelDate;
      } else if (packedorderTrackIndex >= 0) {
        var packedDate = new Date(changeTrack[packedorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = packedDate.toLocaleTimeString('en-US');
        packedDate = packedDate.toLocaleDateString("en-US", options);
        small52.innerHTML = packedDate;
      } else {
        small52.innerHTML = "-";
        timedisplay = "-";
      }

      div20.appendChild(small52);

      var br552 = document.createElement("br");
      div20.appendChild(br552);

      var small53 = document.createElement("small");
      small53.setAttribute("class", "time");
      small53.innerHTML = timedisplay; //"Time";
      div20.appendChild(small53);

      div17.appendChild(div20);

      var div23 = document.createElement("div");
      if (cancelledorderTrackIndex >= 0) {
        div23.setAttribute("class", "");
      } else if (onTheWayorderTrackIndex >= 0) {
        div23.setAttribute("class", "active");
      } else {
        div23.setAttribute("class", "");
      }

      var h57 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h57.innerHTML = "-";
      } else {
        h57.innerHTML = "On The Way";
      }
      div23.appendChild(h57);

      var div24 = document.createElement("div");
      div24.setAttribute("class", "step center");
      div23.appendChild(div24);

      var div25 = document.createElement("div");
      div25.setAttribute("class", "line center");
      div23.appendChild(div25);

      var small53 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        timedisplay = "-";
        small53.innerHTML = "-";
      } else if (onTheWayorderTrackIndex >= 0) {
        var onTheWayDate = new Date(changeTrack[onTheWayorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = onTheWayDate.toLocaleTimeString('en-US');
        onTheWayDate = onTheWayDate.toLocaleDateString("en-US", options);
        small53.innerHTML = onTheWayDate;
      } else {
        small53.innerHTML = "-";
        timedisplay = "-";
      }

      div23.appendChild(small53);

      var br553 = document.createElement("br");
      div23.appendChild(br553);

      var small54 = document.createElement("small");
      small54.setAttribute("class", "time");
      small54.innerHTML = timedisplay; //"Time";
      div23.appendChild(small54);

      div17.appendChild(div23);

      var div26 = document.createElement("div");
      if (cancelledorderTrackIndex >= 0) {
        div26.setAttribute("class", "");
      } else if (deliveredorderTrackIndex >= 0) {
        div26.setAttribute("class", "active");
      } else {
        div26.setAttribute("class", "");
      }

      var h58 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h58.innerHTML = "-";
      } else {
        h58.innerHTML = "Delivered";
      }
      div26.appendChild(h58);

      var div27 = document.createElement("div");
      div27.setAttribute("class", "step right");
      div26.appendChild(div27);

      var div28 = document.createElement("div");
      div28.setAttribute("class", "line right");
      div26.appendChild(div28);

      var small56 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        timedisplay = "-";
        small56.innerHTML = "-";
      } else if (deliveredorderTrackIndex >= 0) {
        var delievredDate = new Date(changeTrack[deliveredorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = delievredDate.toLocaleTimeString('en-US');
        delievredDate = delievredDate.toLocaleDateString("en-US", options);
        small56.innerHTML = delievredDate;
      } else {
        small56.innerHTML = "-";
        timedisplay = "-";
      }
      div26.appendChild(small56);

      var br554 = document.createElement("br");
      div26.appendChild(br554);

      var small55 = document.createElement("small");
      small55.setAttribute("class", "time");
      small55.innerHTML = timedisplay; //"Time";
      div26.appendChild(small55);

      div17.appendChild(div26);
      div6.appendChild(div17);

    }
  });

  //Added elements progress- End


  div1.appendChild(div6);
  document.getElementById("orderListDiv").appendChild(div1);
}


async function CopyOrder(index) {
  var cartItemToCopy = [];
  var cartItem = [];
  var cartID = "";
  var orderidToCopy = document.getElementById("hfOrderID" + index).value;
  const originalOrder = await db.collection("OrderDetails").doc(orderidToCopy).get();
  if (originalOrder.exists) {
    cartItemToCopy = originalOrder.data().orderItems;
  }
  const cartRecord = await db.collection("CartDetails").doc(userID).get();
  if (cartRecord.exists) {
    cartID = cartRecord.id;
    cartItem = cartRecord.data().cartDetails;
  }
  for (cnt = 0; cnt < cartItemToCopy.length; cnt++) {
    if (cartItem.findIndex(e => e.ProductID === cartItemToCopy[cnt].ProductID && e.SelectedsubItem === cartItemToCopy[cnt].SelectedSubItem) < 0) {
      cartItem.push({
        ItemName: cartItemToCopy[cnt].ProductName,
        ProductID: cartItemToCopy[cnt].ProductID,
        Quantity: cartItemToCopy[cnt].Quantity,
        // SelectedSubItem : cartItemToCopy[cnt].SelectedsubItem,
        SelectedsubItem: cartItemToCopy[cnt].SelectedSubItem,
        Status: 'Active'
      });
    }
  }
  if (cartID === "") {
    const addCard = await db.collection("CartDetails").doc(userID).add({
      uid: userID,
      cartDetails: cartItem,
      CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });

  } else {
    const addCard = await db.collection("CartDetails").doc(cartID).update({
      uid: userID,
      cartDetails: cartItem,
      CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });

  }

  window.location.href = "cartNew.html";

}

function renderOrder11(orderid, order, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "dashboard-card order-status");
  div1.setAttribute("id", "card" + index);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "");
  div2.setAttribute("style", "display:flex;align-items: center;");
  div2.setAttribute("onclick", "showHideCard(card" + index + "," + "cardarrow" + index + ")");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "arrow-down");

  var span1 = document.createElement("span");
  span1.setAttribute("class", "material-icons-outlined");
  span1.setAttribute("id", "cardarrow" + index);
  span1.innerHTML = "keyboard_arrow_down";

  div3.appendChild(span1);

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', orderid);
  div3.appendChild(hforderid);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");

  var span2 = document.createElement("span");
  span2.setAttribute("class", "material-icons-outlined order-icon")
  if (order.orderStatus === "Delivered") {
    span2.setAttribute("style", "font-size: 3rem; color: #1D741B;");
    span2.innerHTML = "check_circle";
  } else if (order.orderStatus === "On The Way") {
    span2.setAttribute("style", "font-size: 3rem; color: #88CA5E;");
    span2.innerHTML = "local_shipping";
  } else if (order.orderStatus === "Packed") {

    span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
    span2.innerHTML = "widgets";
  } else if (order.orderStatus === "Pending") {

    span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
    span2.innerHTML = "history_toggle_off";
  } else if (order.orderStatus === "Cancelled") {

    span2.setAttribute("style", "font-size: 3rem; color: #ff5757;");
    span2.innerHTML = "cancel";
  }

  //span2.setAttribute("class","material-icons-outlined order-icon");
  //check for order statys and change the icon
  //span2.innerHTML="check_circle";

  div4.appendChild(span2);
  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "details");

  var h1 = document.createElement("h4");
  if (order.orderStatus === "Delivered") {
    h1.setAttribute("style", "color: #1D741B");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "On The Way") {
    h1.setAttribute("style", "color: #88CA5E");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Packed") {
    h1.setAttribute("style", "color: #F8D210");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Cancelled") {
    h1.setAttribute("style", "color: #ff5757");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Pending") {
    h1.setAttribute("style", "color: #F8D210");
    h1.innerHTML = order.orderStatus;
  }
  div5.appendChild(h1);


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


  var dt = order.deliveryDate;
  var odeldate = new Date(dt.seconds * 1000);
  var delDate = odeldate.toLocaleDateString("en-US", options);

  var p1 = document.createElement("p");
  p1.setAttribute("class", "small-text dashboard-sub-heading");
  p1.innerHTML = "Delivery: " + delDate + " | " + order.deliveryTime + " - " + order.totalItems + " Items";

  div5.appendChild(p1);
  div2.appendChild(div5);
  div1.appendChild(div2);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "dashboard-card-expand");
  // div6.setAttribute("id", "cardarrow" + index);

  var hr1 = document.createElement("hr");
  div6.appendChild(hr1);

  var div7 = document.createElement("div");
  div7.setAttribute("class", "dashboard-card-order");

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");

  var h2 = document.createElement("h5");
  h2.setAttribute("class", "small-text");
  h2.setAttribute("style", "margin: 0 auto;");
  h2.innerHTML = "Order Number";
  div8.appendChild(h2);

  var small1 = document.createElement("small");
  small1.innerHTML = order.orderNumber;
  div8.appendChild(small1);

  div7.appendChild(div8);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "");

  var h3 = document.createElement("h5");
  h3.setAttribute("class", "small-text");
  h3.setAttribute("style", "margin: 0 auto;");
  h3.innerHTML = "Order Date";
  div9.appendChild(h3);

  var odt = order.orderDate;
  var oOrderdate = new Date(odt.seconds * 1000);
  var orderDate = oOrderdate.toLocaleDateString("en-US", options);

  var small2 = document.createElement("small");
  small2.innerHTML = orderDate;
  div9.appendChild(small2);

  div7.appendChild(div9);

  div6.appendChild(div7);

  var br1 = document.createElement("br");
  div6.appendChild(br1);

  var div10 = document.createElement("div");
  div10.setAttribute("class", "dashboard-card-order");

  var div11 = document.createElement("div");
  div11.setAttribute("class", "");

  var h4 = document.createElement("h5");
  h4.setAttribute("class", "small-text");
  h4.setAttribute("style", "margin: 0 auto;");
  h4.innerHTML = "Total Amount";
  div11.appendChild(h4);

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var displayAmt = Number(order.totalAmount).toLocaleString('en-IN', curFormat);
  var small3 = document.createElement("small");
  small3.innerHTML = displayAmt;
  div11.appendChild(small3);

  div10.appendChild(div11);

  var div12 = document.createElement("div");
  div12.setAttribute("class", "");

  var h5 = document.createElement("h5");
  h5.setAttribute("class", "small-text");
  h5.setAttribute("style", "margin: 0 auto;");
  h5.innerHTML = "Payable Amount";
  div12.appendChild(h5);

  var displayDiscountAmt = order.discountedprize.toLocaleString('en-IN', curFormat);
  //console.log(displayDiscountAmt);
  var discount = order.discountDetails.coupondID;

  var small4 = document.createElement("small");
  if (order.discountDetails.coupondID === "none") {
    small4.innerHTML = "No Discount";
  } else {
    small4.innerHTML = "<span style='font-size: 1.2rem;color: #1D741B;'>" + displayDiscountAmt + " </span> (Off " + order.discountDetails.discountValue + ")";
  }
  div12.appendChild(small4);

  div10.appendChild(div12);
  div6.appendChild(div10);
  var br2 = document.createElement("br");
  div6.appendChild(br2);

  var dDate = new Date(order.deliveryDate.seconds * 1000);

  const tempDate = new Date();
  tempDate.setDate(tempDate.getDate() + 2);

  var flag = false;
  //order can be cancelled only if order status is Pending and delivery Date is > todays date
  if (order.orderStatus === 'Pending' && dDate >= tempDate) {
    flag = true;
  } else {
    flag = false;
  }

  var div16 = document.createElement("div");
  div16.setAttribute("class", "");
  div16.setAttribute("style", "display:flex;align-items:center;justify-content: space-between;padding-top: 10px;");

  // var anchor1 = document.createElement("span");
  // anchor1.setAttribute("onclick", "cancelOrder(" + 'hfOrderID' + index + ")");


  var anchor1 = document.createElement("a");
  anchor1.setAttribute("href", "orderSummary.html?id=" + orderid + "&action=cancel");

  var button1 = document.createElement("button");
  button1.setAttribute("class", "mybutton buttonTransparent");
  button1.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;");
  button1.innerHTML = "Cancel";

  var span11 = document.createElement("span");
  span11.setAttribute("class", "material-icons-outlined");
  span11.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
  span11.innerHTML = "delete_forever";
  button1.appendChild(span11);
  anchor1.appendChild(button1);
  if (flag === true)
    div16.appendChild(anchor1);

  var anchor2 = document.createElement("a");
  anchor2.setAttribute("href", "orderSummary.html?id=" + orderid + "&action=view");
  //anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  var button2 = document.createElement("button");
  button2.setAttribute("class", "mybutton buttonTransparent");
  button2.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;");
  button2.innerHTML = "More";

  var span12 = document.createElement("span");
  span12.setAttribute("class", "material-icons-outlined");
  span12.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
  span12.innerHTML = "edit";
  button2.appendChild(span12);
  anchor2.appendChild(button2);
  div16.appendChild(anchor2);
  div6.appendChild(div16);

  var hr11 = document.createElement("hr");
  div6.appendChild(hr11);

  //Added elements progress- start
  const snapshot = db.collection('OrderTracking').doc(orderid);
  var changeTrack = [];
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      changeTrack = doc.data().ChangeTrack;

      var div17 = document.createElement("div");
      div17.setAttribute("class", "progress-bar-div");

      var pendingorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 1);
      var packedorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 3);
      var onTheWayorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 4);
      var deliveredorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 5);
      var cancelledorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 6);

      if (packedorderTrackIndex === -1 && onTheWayorderTrackIndex >= 0)
        packedorderTrackIndex = onTheWayorderTrackIndex;
      else if (packedorderTrackIndex === -1 && deliveredorderTrackIndex >= 0)
        packedorderTrackIndex = deliveredorderTrackIndex;

      if (onTheWayorderTrackIndex === -1 && deliveredorderTrackIndex >= 0) {
        onTheWayorderTrackIndex = deliveredorderTrackIndex;
      }

      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      //          var displayDate = fromDate.toLocaleDateString("en-US", options);

      var div18 = document.createElement("div");
      if (pendingorderTrackIndex >= 0) {
        div18.setAttribute("class", "active");
      } else {
        div18.setAttribute("class", "");
      }

      var h55 = document.createElement("h5");
      h55.innerHTML = "Pending";
      div18.appendChild(h55);

      var div19 = document.createElement("div");
      div19.setAttribute("class", "step");
      div18.appendChild(div19);

      var small51 = document.createElement("small");
      var timedisplay = "";
      if (pendingorderTrackIndex >= 0) {
        pendingDate = new Date(changeTrack[pendingorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = pendingDate.toLocaleTimeString('en-US');

        var pendingDatedisplay = pendingDate.toLocaleDateString("en-US", options);
        small51.innerHTML = pendingDatedisplay;
      }
      div18.appendChild(small51);

      var br551 = document.createElement("br");
      div18.appendChild(br551);

      var small52 = document.createElement("small");
      small52.setAttribute("class", "time");
      if (pendingorderTrackIndex >= 0) {
        small52.innerHTML = timedisplay; // "Time";
      } else {
        small52.innerHTML = "-"
      }
      div18.appendChild(small52);

      div17.appendChild(div18);

      var div20 = document.createElement("div");
      if (packedorderTrackIndex >= 0) {
        div20.setAttribute("class", "active");
      } else if (cancelledorderTrackIndex >= 0) {
        div20.setAttribute("class", "cancelled");
      } else {
        div20.setAttribute("class", "");
      }

      var h56 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h56.innerHTML = "Cancelled";
      } else {
        h56.innerHTML = "Packed";
      }

      div20.appendChild(h56);

      var div21 = document.createElement("div");
      div21.setAttribute("class", "step center");
      div20.appendChild(div21);

      var div22 = document.createElement("div");
      div22.setAttribute("class", "line");
      div20.appendChild(div22);

      var small52 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        var cancelDate = new Date(changeTrack[cancelledorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = cancelDate.toLocaleTimeString('en-US');
        cancelDate = cancelDate.toLocaleDateString("en-US", options);
        small52.innerHTML = cancelDate;
      } else if (packedorderTrackIndex >= 0) {
        var packedDate = new Date(changeTrack[packedorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = packedDate.toLocaleTimeString('en-US');
        packedDate = packedDate.toLocaleDateString("en-US", options);
        small52.innerHTML = packedDate;
      } else {
        small52.innerHTML = "-";
        timedisplay = "-";
      }

      div20.appendChild(small52);

      var br552 = document.createElement("br");
      div20.appendChild(br552);

      var small53 = document.createElement("small");
      small53.setAttribute("class", "time");
      small53.innerHTML = timedisplay; //"Time";
      div20.appendChild(small53);

      div17.appendChild(div20);

      var div23 = document.createElement("div");
      if (cancelledorderTrackIndex >= 0) {
        div23.setAttribute("class", "");
      } else if (onTheWayorderTrackIndex >= 0) {
        div23.setAttribute("class", "active");
      } else {
        div23.setAttribute("class", "");
      }

      var h57 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h57.innerHTML = "-";
      } else {
        h57.innerHTML = "On The Way";
      }
      div23.appendChild(h57);

      var div24 = document.createElement("div");
      div24.setAttribute("class", "step center");
      div23.appendChild(div24);

      var div25 = document.createElement("div");
      div25.setAttribute("class", "line center");
      div23.appendChild(div25);

      var small53 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        timedisplay = "-";
        small53.innerHTML = "-";
      } else if (onTheWayorderTrackIndex >= 0) {
        var onTheWayDate = new Date(changeTrack[onTheWayorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = onTheWayDate.toLocaleTimeString('en-US');
        onTheWayDate = onTheWayDate.toLocaleDateString("en-US", options);
        small53.innerHTML = onTheWayDate;
      } else {
        small53.innerHTML = "-";
        timedisplay = "-";
      }

      div23.appendChild(small53);

      var br553 = document.createElement("br");
      div23.appendChild(br553);

      var small54 = document.createElement("small");
      small54.setAttribute("class", "time");
      small54.innerHTML = timedisplay; //"Time";
      div23.appendChild(small54);

      div17.appendChild(div23);

      var div26 = document.createElement("div");
      if (cancelledorderTrackIndex >= 0) {
        div26.setAttribute("class", "");
      } else if (deliveredorderTrackIndex >= 0) {
        div26.setAttribute("class", "active");
      } else {
        div26.setAttribute("class", "");
      }

      var h58 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h58.innerHTML = "-";
      } else {
        h58.innerHTML = "Delivered";
      }
      div26.appendChild(h58);

      var div27 = document.createElement("div");
      div27.setAttribute("class", "step right");
      div26.appendChild(div27);

      var div28 = document.createElement("div");
      div28.setAttribute("class", "line right");
      div26.appendChild(div28);

      var small56 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        timedisplay = "-";
        small56.innerHTML = "-";
      } else if (deliveredorderTrackIndex >= 0) {
        var delievredDate = new Date(changeTrack[deliveredorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = delievredDate.toLocaleTimeString('en-US');
        delievredDate = delievredDate.toLocaleDateString("en-US", options);
        small56.innerHTML = delievredDate;
      } else {
        small56.innerHTML = "-";
        timedisplay = "-";
      }
      div26.appendChild(small56);

      var br554 = document.createElement("br");
      div26.appendChild(br554);

      var small55 = document.createElement("small");
      small55.setAttribute("class", "time");
      small55.innerHTML = timedisplay; //"Time";
      div26.appendChild(small55);

      div17.appendChild(div26);
      div6.appendChild(div17);

    }
  });

  //Added elements progress- End


  div1.appendChild(div6);
  document.getElementById("orderListDiv").appendChild(div1);
}


function cancelOrder(hfOrderID) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  console.log(hfOrderID);
  console.log("order Cancelled");
  //selectedOrder.orderStatus = "Cancelled";
  // if (selectedOrder.paymentStatus === 'Completed') {
  //   walletAmount = selectedOrder.totalAmount;
  //   updateWalletDetails(userID, walletAmount, 'add');
  // }
  // totalPrise = selectedOrder.totalAmount;
  // discountedAmount = selectedOrder.discountedprize;
  // modifiedOrder = selectedOrder;


  var DBrows = db.collection('OrderDetails')
    .doc(hfOrderID.value)
    .get();

  DBrows.then((changes) => {
    orderList = changes.data();
    console.log(orderList.totalAmount);
    if (orderList.paymentStatus === 'Completed') {
      walletAmount = orderList.totalAmount;
      updateWalletDetails(userID, walletAmount, 'add');
    }

    db.collection('OrderDetails')
      .doc(hfOrderID.value)
      .update({
        orderStatus: 'Cancelled',
        paymentStatus: 'Pending' //firebase.firestore.FeildValue.arrayUnion(cartItems)
      })
      .then(() => {
        console.log("order updated");
        var orderChanges = [];

        orderChanges.push({
          OrderStage: 6,
          OrderStatus: 'Order is Cancelled',
          PaymentStatus: '',
          DeliverySlot: '',
          DeliveryDate: '',
          ChangedTimeStamp: new Date()
        });
        console.log(orderChanges);
        console.log(hfOrderID.value);
        UpdateOrderTrackingDetails(orderChanges, hfOrderID.value);
        //populateOrderDetails();
        GetOrder('Cancelled');
      })
      .catch((error) => {
        console.log("in error");

      });





  })


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
