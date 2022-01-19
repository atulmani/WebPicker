//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
var orderSummary = [];
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var orderDateRange = searchParams.get('orderDateRange');
// v
try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      userID = firebaseUser.uid;
      if (orderDateRange === "" || orderDateRange == undefined )
        orderDateRange = "week";
      GetProfileData();
      GetUserList();
      populateOrderDetails('Pending');

    } else {
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
      var name = change.data().CreatedBy;
      var strText = change.data().displayName + ":" + change.data().EmailID;
      var strValue = change.id;

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

        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        }
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


function dateRangeChange() {
  var dateRange = document.getElementById('dateRange');
  var value = dateRange.options[dateRange.selectedIndex].value;
  if (value === 'Today')
    window.location.href = "payments.html?orderDateRange=today";
  else if (value === 'Yesterday')
    window.location.href = "payments.html?orderDateRange=yesterday";

  else if (value === 'Last 7 days')
    window.location.href = "payments.html?orderDateRange=week";
  else if (value === 'Current month')
    window.location.href = "payments.html?orderDateRange=month";
  else if (value === 'Last 6 months')
    window.location.href = "payments.html?orderDateRange=sixmonth";

}

function GetOrderByUsers() {
  var index = 0;
  document.getElementById('loading').style.display = 'block';
  var users = document.getElementById('userList');
  var selecteduservalue = users.options[users.selectedIndex].value;

  var DBrows;
  if (selecteduservalue === 'All') {
    DBrows = db.collection('OrderDetails')
      .get();

  } else {
    DBrows = db.collection('OrderDetails')
      .where("orderBy", "==", selecteduservalue).get();
  }

  DBrows.then((changes) => {
    orderList = [];
    var i = 0;
    document.getElementById("orderListDiv").innerHTML = "";
    changes.forEach(change => {
      console.log("in Second loop");
      // orderList.push({
      //   orderID: change.id,
      //   orderDate: change.data().orderDate,
      //   orderNumber: change.data().orderNumber,
      //   discountedprize: change.data().discountedprize,
      //   paymentStatus: change.data().paymentStatus,
      //   totalAmount: change.data().totalAmount,
      //   totalItems: change.data().totalItems,
      //   orderBy: change.data().orderBy,
      //   orderByUserName: change.data().orderByUserName
      // });

      var name = change.data().CreatedBy;

      if (orderSummary.lenght === 0) {

        orderSummary.push({
          orderDate: change.data().orderDate,
          paymentStatus: change.data().PaymentStatus,
          discountedprize: Number(change.data().discountedprize),
          totalAmount: Number(change.data().totalAmount),
          orderDetails: {
            orderID: change.id,
            orderDate: change.data().orderDate,
            orderNumber: change.data().orderNumber,
            discountedprize: change.data().discountedprize,
            paymentStatus: change.data().paymentStatus,
            totalAmount: change.data().totalAmount,
            totalItems: change.data().totalItems,
            orderBy: change.data().orderBy,
            orderByUserName: change.data().orderByUserName
          }
        });
      } else if (orderSummary.indexOf(e => e.orderDate === change.data().orderDate && e.paymentStatus === change.data().PaymentStatus) === -1) {
        orderSummary.push({
          orderDate: change.data().orderDate,
          paymentStatus: change.data().PaymentStatus,
          discountedprize: Number(change.data().discountedprize),
          totalAmount: Number(change.data().totalAmount),
          orderDetails: {
            orderID: change.id,
            orderDate: change.data().orderDate,
            orderNumber: change.data().orderNumber,
            discountedprize: change.data().discountedprize,
            paymentStatus: change.data().paymentStatus,
            totalAmount: change.data().totalAmount,
            totalItems: change.data().totalItems,
            orderBy: change.data().orderBy,
            orderByUserName: change.data().orderByUserName
          }
        });
      } else {
        var i = orderSummary.indexOf(e => e.orderDate === change.data().orderDate && e.paymentStatus === change.data().PaymentStatus);

        var discountedprize = Number(orderSummary[i].discountedprize) + Number(change.data().discountedprize);
        var totalAmount = Number(orderSummary[i].totalAmount) + change.data().totalAmount;
        orderSummary[i].discountedprize = Number(discountedprize);
        orderSummary[i].totalAmount = Number(totalAmount);

        orderSummary[i].orderDetails.push({
          orderID: change.id,
          orderDate: change.data().orderDate,
          orderNumber: change.data().orderNumber,
          discountedprize: change.data().discountedprize,
          paymentStatus: change.data().paymentStatus,
          totalAmount: change.data().totalAmount,
          totalItems: change.data().totalItems,
          orderBy: change.data().orderBy,
          orderByUserName: change.data().orderByUserName
        });
      }
      //renderOrder(change.id, change.data(), index)

    });
    for (index = 0; index < orderSummary.length; index++) {

      renderOrderSummary(orderSummary[index], index);
    }
  });
  document.getElementById('loading').style.display = 'none';


}

function GetOrderDetails(orderID, userID) {

  window.location.href = "orderDetails.html?id=" + orderID.value + "&userID=" + userID.value;
}

function renderOrderSummary(ordSummary, index) {
  console.log(ordSummary);
  console.log(index);
  var div1 = document.createElement("div");
  div1.setAttribute("class", "dashboard-card active");
  div1.setAttribute("style","height: 100%;");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "");
  div2.setAttribute("style", "display:flex;align-items: center;justify-content: space-between;");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "details");
  div3.setAttribute("style", "position: relative; right: 4%;");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");
  div4.setAttribute("style", "display: flex;align-items: center;");

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };


    var h41 = document.createElement("h4");
    if (ordSummary.paymentStatus === 'Pending') {
      h41.setAttribute("style", "color: #F8D210");
    } else {
      h41.setAttribute("style", "color: green");
    }
    h41.innerHTML = ordSummary.totalAmount.toLocaleString('en-IN', curFormat);

    div4.appendChild(h41);

    var small1 = document.createElement("small");
    small1.innerHTML = "( " + ordSummary.orderDetails.length ;
    if(ordSummary.orderDetails.length <= 1 )
    {
      small1.innerHTML = small1.innerHTML + " Order )"
    }
    else {
      small1.innerHTML = small1.innerHTML + " Orders )"
    }
    div4.appendChild(small1);
    div3.appendChild(div4);

    var p1 = document.createElement("p");
    p1.setAttribute("class","small-text dashboard-sub-heading");
    p1.innerHTML = "Order date: " + ordSummary.orderDate;

    div3.appendChild(p1);

    div2.appendChild(div3);

    var div5 = document.createElement("div");
    div5.setAttribute("class","");

    var anchor = document.createElement("a");
    anchor.setAttribute("href", "paymentDetail.html?orderDate=" + ordSummary.orderDate+"&PaymentStatus="+ordSummary.paymentStatus);

    var button1 = document.createElement("button");
    button1.setAttribute("class", "mybutton buttonTransparent");
    button1.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;height: 30px;");

    var span3 = document.createElement("span");
    span3.setAttribute("class", "material-icons-outlined");
    span3.setAttribute("style", "position: relative;font-size: 1.2rem;");
    span3.innerHTML = "keyboard_double_arrow_right";

    button1.appendChild(span3);
    anchor.appendChild(button1);

    div5.appendChild(anchor);

    div2.appendChild(div5);
    div1.appendChild(div2);

    var div6 = document.createElement("div");
    div6.setAttribute("class","dashboard-card-expand");

    var br1 = document.createElement("br");
    div6.appendChild(br1);

    var div7 = document.createElement("div");
    div7.setAttribute("class","dashboard-card-order");

    var div8 = document.createElement("div");
    div8.setAttribute("class","");

    var h51 = document.createElement("h5");
    h51.setAttribute("class", "small-text");
    h51.setAttribute("style", "margin: 0 auto;");
    h51.innerHTML = "Amount";
    div8.appendChild(h51);

    var small1 = document.createElement("small");
    small1.innerHTML = ordSummary.totalAmount.toLocaleString('en-IN', curFormat);

    div8.appendChild(small1);

    div7.appendChild(div8);

    var div9 = document.createElement("div");
    div9.setAttribute("class", "");

    var h52 = document.createElement("h5");
    h52.setAttribute("class", "small-text");
    h52.setAttribute("style", "margin: 0 auto;");
    h52.innerHTML = "Discount";
    var discountedValue = Number(ordSummary.totalAmount) - Number(ordSummary.discountedprize);
    div9.appendChild(h52);

    var small2 = document.createElement("small");
    small2.innerHTML = "( Off " + discountedValue.toLocaleString('en-IN', curFormat) + ")";

    div9.appendChild(small2);

    div7.appendChild(div9);
    div6.appendChild(div7);
    div1.appendChild(div6);
    document.getElementById("orderListDiv").appendChild(div1);

}

function populateOrderDetails(paymentStatus) {
  var i = 0;
  var fromDate;
  var todayDate = new Date();
  var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

  todayDate = refDate;
  var index = 0;
  var snapshot;
  var DBrows;
  var orderStatusList = ['Pending', 'Packed', 'On The Way'];
  var fromDate;
  var toDate;
  var headerAmount = 0;
  var headerDiscount = 0;

  if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null || orderDateRange === 'null') {
    orderDateRange = "week";
  }
  if (orderDateRange === 'today') {
    var filter = document.getElementById("dateRange");
    filter.options[0].selected = true;

    if (paymentStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        .where("orderDate", ">=", toDate).get();
    } else {
      DBrows = db.collection('OrderDetails')
        .where('paymentStatus', '==', paymentStatus)
        .where("orderDate", ">=", toDate).get();
    }

    fromDate = 'Today';
    toDate = 'Today';

  } else if (orderDateRange === 'yesterday') {
    var filter = document.getElementById("dateRange");
    filter.options[1].selected = true;


    todayDate.setDate(todayDate.getDate() - 1);

    if (paymentStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        .where("orderDate", ">=", todayDate)
        .where("orderDate", "<=", toDate).get();
    } else {
      DBrows = db.collection('OrderDetails')
        .where('paymentStatus', '==', paymentStatus)
        .where("orderDate", ">=", todayDate)
        .where("orderDate", "<=", toDate).get();
    }
    fromDate = todayDate;
    toDate = todayDate;

  } else if (orderDateRange === 'week') {
    var filter = document.getElementById("dateRange");
    filter.options[2].selected = true;
    refDate.setDate(refDate.getDate() - 7);

    if (paymentStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        .where("orderDate", ">=", refDate).get();
    } else {
      DBrows = db.collection('OrderDetails')
        .where('paymentStatus', '==', paymentStatus)
        .where("orderDate", ">=", refDate).get();
    }
    fromDate = refDate;
    toDate = 'Today';

  } else if (orderDateRange === 'month') {
    var filter = document.getElementById("dateRange");
    filter.options[3].selected = true;

    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    if (paymentStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        .where("orderDate", ">=", refDate).get();
    } else {
      DBrows = db.collection('OrderDetails')
        .where('paymentStatus', '==', paymentStatus)
        .where("orderDate", ">=", refDate).get();
    }
    fromDate = refDate;
    toDate = 'Today';

  } else if (orderDateRange === 'sixmonth') {
    var filter = document.getElementById("dateRange");
    filter.options[4].selected = true;

    refDate = refDate.setMonth(refDate.getMonth() - 6);
    refDate = new Date(refDate);
    if (paymentStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        .where("orderDate", ">=", refDate).get();
    } else {
      DBrows = db.collection('OrderDetails')
        .where('paymentStatus', '==', paymentStatus)
        .where("orderDate", ">=", refDate).get();
    }
    fromDate = refDate;
    toDate = 'Today';

  }


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
  //orderSummary
  DBrows.then((changes) => {

    document.getElementById("orderListDiv").innerHTML = "";
    orderSummary = [];
    var i = 0;

    changes.forEach(change => {

      console.log("in first loop");
        var options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };

        headerAmount = headerAmount +Number(change.data().totalAmount);
        headerDiscount = headerDiscount +Number(change.data().discountedprize);

        var oorderdate = new Date(change.data().orderDate.seconds * 1000);
        oorderdate = oorderdate.toLocaleDateString("en-US", options);
        console.log (oorderdate) ;
        i = i  +1;
        console.log(orderSummary);
        console.log(orderSummary.findIndex(e => e.orderDate === oorderdate && e.paymentStatus === change.data().paymentStatus));
      if (orderSummary.lenght === 0) {

        orderSummary.push({
          orderDate: oorderdate,
          paymentStatus: change.data().paymentStatus,
          discountedprize: Number(change.data().discountedprize),
          totalAmount: Number(change.data().totalAmount),
          orderDetails: [{
            orderID: change.id,
            orderDate: oorderdate,
            orderNumber: change.data().orderNumber,
            discountedprize: change.data().discountedprize,
            paymentStatus: change.data().paymentStatus,
            totalAmount: change.data().totalAmount,
            totalItems: change.data().totalItems,
            orderBy: change.data().orderBy,
            orderByUserName: change.data().orderByUserName
          }]
        });
      } else if (orderSummary.findIndex(e => e.orderDate === oorderdate && e.paymentStatus === change.data().paymentStatus) === -1) {
        orderSummary.push({
          orderDate: oorderdate,
          paymentStatus: change.data().paymentStatus,
          discountedprize: Number(change.data().discountedprize),
          totalAmount: Number(change.data().totalAmount),
          orderDetails: [{
            orderID: change.id,
            orderDate: oorderdate,
            orderNumber: change.data().orderNumber,
            discountedprize: change.data().discountedprize,
            paymentStatus: change.data().paymentStatus,
            totalAmount: change.data().totalAmount,
            totalItems: change.data().totalItems,
            orderBy: change.data().orderBy,
            orderByUserName: change.data().orderByUserName
          }]
        });
      } else {
        var jj = orderSummary.findIndex(e => e.orderDate === oorderdate && e.paymentStatus === change.data().paymentStatus);
        console.log(jj);
        console.log(oorderdate);
        console.log(change.data().paymentStatus);

        var discountedprize = Number(orderSummary[jj].discountedprize) + Number(change.data().discountedprize);
        var totalAmount = Number(orderSummary[jj].totalAmount) + Number(change.data().totalAmount);
        orderSummary[jj].discountedprize = Number(discountedprize);
        orderSummary[jj].totalAmount = Number(totalAmount);

        orderSummary[jj].orderDetails.push({
          orderID: change.id,
          orderDate: oorderdate,
          orderNumber: change.data().orderNumber,
          discountedprize: change.data().discountedprize,
          paymentStatus: change.data().paymentStatus,
          totalAmount: change.data().totalAmount,
          totalItems: change.data().totalItems,
          orderBy: change.data().orderBy,
          orderByUserName: change.data().orderByUserName
        });
      }

//      renderOrder(change.id, change.data(), i);
  //    i = i + 1;
    });

            headerDiscount =headerAmount -  headerDiscount;

            document.getElementById("headerAmount").innerHTML = Number(headerAmount).toLocaleString('en-IN', curFormat);
            document.getElementById("headerDiscount").innerHTML = Number(headerDiscount).toLocaleString('en-IN', curFormat);

    for (index = 0; index < orderSummary.length; index++) {

      renderOrderSummary(orderSummary[index], index);
    }

/*
*/
    document.getElementById("orderCount").innerHTML = i + " Orders";
    document.getElementById('loading').style.display = 'none';
  });
  //populateCartData();


}

function GetOrder(filter) {
  var orderMenuListHr = document.getElementById('orderMenuListHr');
  // console.log(filter);
  if (filter === 'Pending') {
    orderMenuListHr.style.transform = 'translateX(0%)';
    orderMenuListHr.style.borderBottom = '4px solid #F8D210';
  } else {
    orderMenuListHr.style.transform = 'translateX(100%)';
    orderMenuListHr.style.borderBottom = '4px solid green';
  }
  populateOrderDetails(filter);

}

// function populateCartData() {
//   var itemCount = 0;
//   const snapshot = db.collection('CartDetails').doc(userID);
//   snapshot.get().then(async (doc) => {
//     if (doc.exists) {
//       cartDetails = doc.data().cartDetails;
//       itemCount = cartDetails.length;
//       //console.log(change.doc, index, selectdedItem);
//     }
//     //document.getElementById('cartItemCount').innerHTML = itemCount;
//
//   });
//
// }

//
// function renderOrder(orderid, order, index) {
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "dashboard-card order-status");
//   div1.setAttribute("id", "orderDiv" + index);
//   // div1.setAttribute("onclick","showHideCard(orderDiv" + index + ", orderDiv" + index + "arrow)");
//
//   var div2 = document.createElement("div");
//   div2.setAttribute("class", "");
//   div2.setAttribute("style", "display:flex;align-items: center;");
//   // div2.setAttribute("id","orderDiv" + index);
//   div2.setAttribute("onclick", "showHideCard(orderDiv" + index + ", orderDiv" + index + "arrow)");
//
//   var div3 = document.createElement("div");
//   div3.setAttribute("class", "arrow-down");
//
//   var span1 = document.createElement("span");
//   span1.setAttribute("class", "material-icons-outlined");
//   span1.setAttribute("id", "orderDiv" + index + "arrow");
//   span1.innerHTML = "keyboard_arrow_down";
//
//   div3.appendChild(span1);
//
//   var hforderid = document.createElement("input");
//   hforderid.setAttribute('type', 'hidden');
//   hforderid.setAttribute('id', 'hfOrderID' + index);
//   hforderid.setAttribute('value', order.orderID);
//   div3.appendChild(hforderid);
//   div2.appendChild(div3);
//
//   var div4 = document.createElement("div");
//   div4.setAttribute("class", "");
//
//   var span2 = document.createElement("span");
//   span2.setAttribute("class", "material-icons-outlined order-icon")
//   if (order.orderStatus === "Delivered") {
//     span2.setAttribute("style", "font-size: 3rem; color: #1D741B;");
//     span2.innerHTML = "check_circle";
//   } else if (order.orderStatus === "On The Way") {
//     span2.setAttribute("style", "font-size: 3rem; color: #88CA5E;");
//     span2.innerHTML = "local_shipping";
//   } else if (order.orderStatus === "Packed") {
//
//     span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
//     span2.innerHTML = "widgets";
//   } else if (order.orderStatus === "Pending") {
//
//     span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
//     span2.innerHTML = "history_toggle_off";
//   } else if (order.orderStatus === "Cancelled") {
//
//     span2.setAttribute("style", "font-size: 3rem; color: #ff5757;");
//     span2.innerHTML = "cancel";
//   }
//
//   //span2.setAttribute("class","material-icons-outlined order-icon");
//   //check for order statys and change the icon
//   //span2.innerHTML="check_circle";
//
//   div4.appendChild(span2);
//   div2.appendChild(div4);
//
//   var div5 = document.createElement("div");
//   div5.setAttribute("class", "details");
//
//   var h1 = document.createElement("h4");
//   if (order.orderStatus === "Delivered") {
//     h1.setAttribute("style", "color: #1D741B");
//     h1.innerHTML = order.orderStatus;
//   } else if (order.orderStatus === "On The Way") {
//     h1.setAttribute("style", "color: #88CA5E");
//     h1.innerHTML = order.orderStatus;
//   } else if (order.orderStatus === "Packed") {
//     h1.setAttribute("style", "color: #F8D210");
//     h1.innerHTML = order.orderStatus;
//   } else if (order.orderStatus === "Cancelled") {
//     h1.setAttribute("style", "color: #ff5757");
//     h1.innerHTML = order.orderStatus;
//   } else if (order.orderStatus === "Pending") {
//     h1.setAttribute("style", "color: #F8D210");
//     h1.innerHTML = order.orderStatus;
//   }
//   div5.appendChild(h1);
//
//
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//
//
//   var dt = order.deliveryDate;
//   var odeldate = new Date(dt.seconds * 1000);
//   var delDate = odeldate.toLocaleDateString("en-US", options);
//
//   var p1 = document.createElement("p");
//   p1.setAttribute("class", "small-text dashboard-sub-heading");
//   p1.innerHTML = "Delivery date: " + delDate + " [ " + order.deliveryTime + " ] - " + order.totalItems + " Items";
//
//   div5.appendChild(p1);
//   div2.appendChild(div5);
//   div1.appendChild(div2);
//
//   var div6 = document.createElement("div");
//   div6.setAttribute("class", "dashboard-card-expand");
//
//   var hr1 = document.createElement("hr");
//   div6.appendChild(hr1);
//
//   var div7 = document.createElement("div");
//   div7.setAttribute("class", "dashboard-card-order");
//
//   var div8 = document.createElement("div");
//   div8.setAttribute("class", "");
//
//   var h2 = document.createElement("h5");
//   h2.setAttribute("class", "small-text");
//   h2.setAttribute("style", "margin: 0 auto;");
//   h2.innerHTML = "Order Number";
//   div8.appendChild(h2);
//
//   var small1 = document.createElement("small");
//   small1.innerHTML = order.orderNumber;
//   div8.appendChild(small1);
//
//   div7.appendChild(div8);
//
//   var div9 = document.createElement("div");
//   div9.setAttribute("class", "");
//
//   var h3 = document.createElement("h5");
//   h3.setAttribute("class", "small-text");
//   h3.setAttribute("style", "margin: 0 auto;");
//   h3.innerHTML = "Order Date";
//   div9.appendChild(h3);
//
//   var odt = order.orderDate;
//   var oOrderdate = new Date(odt.seconds * 1000);
//   var orderDate = oOrderdate.toLocaleDateString("en-US", options);
//
//   var small2 = document.createElement("small");
//   small2.innerHTML = orderDate;
//   div9.appendChild(small2);
//
//   div7.appendChild(div9);
//
//   div6.appendChild(div7);
//
//   var br1 = document.createElement("br");
//   div6.appendChild(br1);
//
//   var div10 = document.createElement("div");
//   div10.setAttribute("class", "dashboard-card-order");
//
//   var div11 = document.createElement("div");
//   div11.setAttribute("class", "");
//
//   var h4 = document.createElement("h5");
//   h4.setAttribute("class", "small-text");
//   h4.setAttribute("style", "margin: 0 auto;");
//   h4.innerHTML = "Total Amount";
//   div11.appendChild(h4);
//
//   var curFormat = {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2
//   };
//
//   var displayAmt = Number(order.totalAmount).toLocaleString('en-IN', curFormat);
//   var small3 = document.createElement("small");
//   small3.innerHTML = displayAmt;
//   div11.appendChild(small3);
//
//   div10.appendChild(div11);
//
//   var div12 = document.createElement("div");
//   div12.setAttribute("class", "");
//
//   var h5 = document.createElement("h5");
//   h5.setAttribute("class", "small-text");
//   h5.setAttribute("style", "margin: 0 auto;");
//   h5.innerHTML = "Discount";
//   div12.appendChild(h5);
//
//   var displayDiscountAmt = order.discountedprize.toLocaleString('en-IN', curFormat);
//   //console.log(displayDiscountAmt);
//   var discount = order.discountDetails.coupondID;
//
//   var small4 = document.createElement("small");
//   if (order.discountDetails.coupondID === "none" || order.discountDetails.discountValue === "none") {
//     small4.innerHTML = "No Discount";
//   } else {
//     small4.innerHTML = displayDiscountAmt + "(Off " + order.discountDetails.discountValue + ")";
//   }
//   div12.appendChild(small4);
//
//   div10.appendChild(div12);
//   div6.appendChild(div10);
//   var br2 = document.createElement("br");
//   div6.appendChild(br2);
//
//   ///to be updated only in Admin module - Start
//
//   var div13 = document.createElement("div");
//   div13.setAttribute("class", "dashboard-card-order");
//
//   var div14 = document.createElement("div");
//   div14.setAttribute("class", "");
//
//   var br4 = document.createElement("br");
//   div14.appendChild(br4);
//
//   var h5 = document.createElement("h5");
//   h5.setAttribute("class", "small-text");
//   h5.setAttribute("style", "margin: 0 auto;");
//   h5.innerHTML = "Order By";
//   div14.appendChild(h5);
//   //console.log(order);
//   var small4 = document.createElement("small");
//   small4.innerHTML = order.orderByUserName + " : " + order.CreatedBy;
//   div14.appendChild(small4);
//
//   div13.appendChild(div14);
//
//   var div15 = document.createElement("div");
//   div15.setAttribute("class", "");
//
//   div13.appendChild(div15);
//   div6.appendChild(div13);
//   var br3 = document.createElement("br");
//   div6.appendChild(br2);
//
//   ///to be updated only in Admin module - End
//
//
//   var dDate = new Date(order.deliveryDate.seconds * 1000);
//
//   const tempDate = new Date();
//   tempDate.setDate(tempDate.getDate() + 2);
//
//   var flag = false;
//   //order can be cancelled only if order status is Pending and delivery Date is > todays date
//   if (order.orderStatus === 'Pending' && dDate >= tempDate) {
//     flag = true;
//   } else {
//     flag = false;
//   }
//
//   var div16 = document.createElement("div");
//   div16.setAttribute("class", "");
//   div16.setAttribute("style", "display:flex;align-items:center;justify-content: space-between;padding-top: 10px;");
//
//   var anchor1 = document.createElement("a");
//   anchor1.setAttribute("href", "#trend");
//
//   var button1 = document.createElement("button");
//   button1.setAttribute("class", "mybutton buttonTransparent");
//   button1.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;");
//   button1.innerHTML = "Delete";
//
//   var span11 = document.createElement("span");
//   span11.setAttribute("class", "material-icons-outlined");
//   span11.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
//   span11.innerHTML = "delete_forever";
//   button1.appendChild(span11);
//   anchor1.appendChild(button1);
//   if (flag === true)
//     div16.appendChild(anchor1);
//
//   var anchor2 = document.createElement("a");
//   anchor2.setAttribute("href", "orderDetails.html?id=" + orderid + "&userID=" + order.orderBy);
//   //anchor.setAttribute("href", "orderSummary.html?id=" + orderid);
//
//   var button2 = document.createElement("button");
//   button2.setAttribute("class", "mybutton buttonTransparent");
//   button2.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;");
//   button2.innerHTML = "Edit";
//
//   var span12 = document.createElement("span");
//   span12.setAttribute("class", "material-icons-outlined");
//   span12.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
//   span12.innerHTML = "edit";
//   button2.appendChild(span12);
//   anchor2.appendChild(button2);
//   div16.appendChild(anchor2);
//   div6.appendChild(div16);
//   div1.appendChild(div6);
//   document.getElementById("orderListDiv").appendChild(div1);
// }

$('#anchorAll').click(function() {

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

function populateOrderFilter() {
  var orderFilter = document.getElementById('orderFilter');

  // orderFilter.style.opacity = '1';
  orderFilter.style.pointerEvents = 'all';
  orderFilter.style.height = '100vh';
}

function closeOrderFilter() {
  var orderFilter = document.getElementById('orderFilter');

  // orderFilter.style.opacity = '0';
  orderFilter.style.pointerEvents = 'none';
  orderFilter.style.height = '0';
}

function showHideCard(card, cardArrow) {
  console.log(card);
  console.log(cardArrow);
  card.classList.toggle("active");

  cardArrow.classList.toggle("active");
}
