//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
var orderSummary = [];
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var orderDateRange = searchParams.get('orderDate');
var paymentStatus = searchParams.get('PaymentStatus');

// v
try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      userID = firebaseUser.uid;
      if (orderDateRange === "" || orderDateRange == undefined)
        orderDateRange = "week";
      GetProfileData();
      populateOrderDetails(paymentStatus);

      var orderMenuListHr = document.getElementById('orderMenuListHr');
      // console.log(filter);
      if (paymentStatus === 'Pending') {
        orderMenuListHr.style.transform = 'translateX(0%)';
        orderMenuListHr.style.borderBottom = '4px solid #F8D210';
      } else {
        orderMenuListHr.style.transform = 'translateX(100%)';
        orderMenuListHr.style.borderBottom = '4px solid green';
      }

    } else {
      window.location.href = "../login/index.html";
    }

  });
} catch (error) {

  console.log(error.message);
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
  window.location.href = "paymentDetail.html?orderDate="+orderDateRange+"&PaymentStatus="+filter;

}
function dateRangeChange() {
  var dateRange = document.getElementById('dateRange');
  var value = dateRange.options[dateRange.selectedIndex].value;
  if (value === 'Today')
    window.location.href = "paymentDetail.html?orderDate=today&PaymentStatus="+paymentStatus;
  else if (value === 'Yesterday')
    window.location.href = "paymentDetail.html?orderDate=yesterday&PaymentStatus="+paymentStatus;

  else if (value === 'Last 7 days')
    window.location.href = "paymentDetail.html?orderDate=week&PaymentStatus="+paymentStatus;
  else if (value === 'Current month')
    window.location.href = "paymentDetail.html?orderDate=month&PaymentStatus="+paymentStatus;
  else if (value === 'Last 6 months')
    window.location.href = "paymentDetail.html?orderDate=sixmonth&PaymentStatus="+paymentStatus;

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

  } else {
    console.log(orderDateRange);
    toDate = new Date(orderDateRange);
    console.log(toDate);
    refDate =new Date(toDate);
    refDate = refDate.setDate(refDate.getDate() + 1);
    console.log(toDate);
    console.log(new Date(refDate));

    if (paymentStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        .where("orderDate", ">=", toDate)
        .where("orderDate", "<=", new Date(refDate)).get();
    } else {
      DBrows = db.collection('OrderDetails')
        .where('paymentStatus', '==', paymentStatus)
        .where("orderDate", ">=", toDate)
        .where("orderDate", "<=", new Date(refDate)).get();
    }
    fromDate = toDate;
    toDate = toDate;
  }
  console.log(fromDate);
  console.log(toDate);

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

    headerAmount = headerAmount + Number(change.data().totalAmount);
    headerDiscount = headerDiscount + Number(change.data().discountedprize);

    var oorderdate = new Date(change.data().orderDate.seconds * 1000);
    oorderdate = oorderdate.toLocaleDateString("en-US", options);
    console.log(oorderdate);
    i = i + 1;
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
    renderOrderSummary(change.data(), index);
    index = index + 1;

  });

  headerDiscount = headerAmount - headerDiscount;

  document.getElementById("headerAmount").innerHTML = Number(headerAmount).toLocaleString('en-IN', curFormat);
  document.getElementById("headerDiscount").innerHTML = Number(headerDiscount).toLocaleString('en-IN', curFormat);
  //
  // for (index = 0; index < orderSummary.length; index++) {
  //
  //   renderOrderSummary(orderSummary[index], index);
  // }

  document.getElementById("orderCount").innerHTML = i + " Orders";
  document.getElementById('loading').style.display = 'none';
});


}

function renderOrderSummary(orderSummary, index)
{
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
  var div1 = document.createElement("div");
  div1.setAttribute("class","payment-details-div");

  var div2 = document.createElement("div");
  div2.setAttribute("class","");

  var h51 = document.createElement("h5");
   h51.setAttribute("class","small-text");
   h51.setAttribute("style","margin: 0 auto;");
   h51.innerHTML =orderSummary.orderByUserName;

   div2.appendChild(h51);

   var oorderdate = new Date(orderSummary.orderDate.seconds * 1000);
   oorderdate = oorderdate.toLocaleDateString("en-US", options);

   var small1 = document.createElement("small");
    small1.setAttribute("style","color: #666; font-weight: bold; margin: 0 auto;");
    small1.innerHTML = "Date : " + oorderdate;
    div2.appendChild(small1);

    div1.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("class","");
    div3.setAttribute("style","text-align: right;");

    var h52 = document.createElement("h5");
     h52.setAttribute("class","small-text");
     h52.setAttribute("style","margin: 0 auto;");
     h52.innerHTML =Number(orderSummary.totalAmount).toLocaleString('en-IN', curFormat);
     div3.appendChild(h52);

     var discountedprize =  Number(orderSummary.discountedprize);
     var totalAmount =  Number(orderSummary.totalAmount);
     discountedprize = totalAmount - discountedprize ;

     var small2 = document.createElement("small");
      small2.setAttribute("style","color: #666; font-weight: bold; margin: 0 auto;");
      small2.innerHTML = "Discount: " + Number(discountedprize).toLocaleString('en-IN', curFormat);;
      div3.appendChild(small2);

      var br1 = document.createElement("br");

      div1.appendChild(div3);
      document.getElementById("orderDetailDiv").appendChild(div1);
      document.getElementById("orderDetailDiv").appendChild(br1);


}
