//const productID = document.getElementById('productID');
var userID = "";
var userRole = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(userID);
      const promise = GetProfileData(firebaseUser);

    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        userRole = doc.data().UserRole;
        console.log(userRole);

        // if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
        //   document.getElementById('navUser').src = doc.data().ProfileImageURL;
        PopulateOrderSummary();
        PopulateDeliverySummary();

        //document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      console.log('in catch');
      // An error occurred
      console.log(error.message);
    });
};

var arrAmt = [];
var dateArr = [];
var chart1;
var chart2;

var arrAmtDelivery = [];
var dateArrDelivery = [];
var chart1Delivery;

function PopulateOrderSummary() {
  console.log('in PopulateTodaysOrder');
  var amount = 239990;
  var curFormat = { style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 };
amount = amount.toLocaleString('en-IN', curFormat);
console.log(amount);
  var todayDate = new Date();

  var yesterdayDate = new Date();
  yesterdayDate.setDate(todayDate.getDate() - 1);

  var day3 = new Date();
  day3.setDate(todayDate.getDate() - 2);

  var day4 = new Date();
  day4.setDate(todayDate.getDate() - 3);

  var day5 = new Date();
  day5.setDate(todayDate.getDate() - 4);

  var day6 = new Date();
  day6.setDate(todayDate.getDate() - 5);

  var day7 = new Date();
  day7.setDate(todayDate.getDate() - 6);

  var lastweek = new Date();
  lastweek.setDate(todayDate.getDate() - 7);


  var dayP1 = new Date();
  dayP1.setDate(todayDate.getDate() + 1);

  var dayP2 = new Date();
  dayP2.setDate(todayDate.getDate() + 2);

  var dayP3 = new Date();
  dayP3.setDate(todayDate.getDate() + 3);

  var dayP4 = new Date();
  dayP4.setDate(todayDate.getDate() + 4);

  var dayP5 = new Date();
  dayP5.setDate(todayDate.getDate() + 5);

  var dayP6 = new Date();
  dayP6.setDate(todayDate.getDate() + 6);

  var dayP7 = new Date();
  dayP7.setDate(todayDate.getDate() + 7);

  var lastweek = new Date();
  lastweek.setDate(todayDate.getDate() - 7);

  var todayCnt = 0;
  var yesterdayCnt = 0;
  var weekCnt = 0;
  var monthCnt = 0;

  var todayAmount = 0;
  var yesterdayAmount = 0;
  var day3Amt = 0;
  var day4Amt = 0;
  var day5Amt = 0;
  var day6Amt = 0;
  var day7Amt = 0;

  var dayP1Amt = 0;
  var dayP2Amt = 0;
  var dayP3Amt = 0;
  var dayP4Amt = 0;
  var dayP5Amt = 0;
  var dayP6Amt = 0;
  var dayP7Amt = 0;
  var weekAmount = 0;
  var monthAmount = 0;

  dateArr = [

    todayDate,
    yesterdayDate,
    day3,
    day4,
    day5,
    day6,
    day7

  ];


  var orderdate = new Date();
  var snapshot;
  var currentMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
  console.log(currentMonth, userID, todayDate, currentMonth);
  var DBrows;
  //    DBrows =
  var flag = false;
  db.collection('OrderDetails')
    .where("orderBy", "==", userID)
    .where("orderDate", "<=", todayDate)
    .where("orderDate", ">=", currentMonth)
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      console.log("populatePayments: ");

      changes.forEach(change => {
        flag = true;
        console.log('in loop');
        var orderDetails = change.doc.data();

        var orderdate = new Date(orderDetails.orderDate.seconds * 1000);

        //orderdate = new Date(Date.parse(orderDetails.orderDate));
        if (orderdate.getDate() === todayDate.getDate() && orderdate.getMonth() === todayDate.getMonth() && orderdate.getYear() === todayDate.getYear()) {
          todayCnt = todayCnt + 1;
          todayAmount = Number(todayAmount) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === yesterdayDate.getDate() && orderdate.getMonth() === yesterdayDate.getMonth() && orderdate.getYear() === yesterdayDate.getYear()) {

          yesterdayCnt = yesterdayCnt + 1;
          yesterdayAmount = Number(yesterdayAmount) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day3.getDate() && orderdate.getMonth() === day3.getMonth() && orderdate.getYear() === day3.getYear()) {

          day3Amt = Number(day3Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day4.getDate() && orderdate.getMonth() === day4.getMonth() && orderdate.getYear() === day4.getYear()) {

          day4Amt = Number(day4Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day5.getDate() && orderdate.getMonth() === day5.getMonth() && orderdate.getYear() === day5.getYear()) {

          day5Amt = Number(day5Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day6.getDate() && orderdate.getMonth() === day6.getMonth() && orderdate.getYear() === day6.getYear()) {

          day6Amt = Number(day6Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day7.getDate() && orderdate.getMonth() === day7.getMonth() && orderdate.getYear() === day7.getYear()) {

          day7Amt = Number(day7Amt) + Number(orderDetails.totalAmount);
        }


        if (orderdate >= lastweek) {
          weekCnt = weekCnt + 1;
          weekAmount = Number(weekAmount) + Number(orderDetails.totalAmount);
        }
        if (orderdate.getMonth() === todayDate.getMonth() && orderdate.getYear() === todayDate.getYear()) {

          monthCnt = monthCnt + 1;
          monthAmount = Number(monthAmount) + Number(orderDetails.totalAmount);

        }

        // console.log('todayCnt', todayCnt);
        arrAmt = [todayAmount,
          yesterdayAmount,
          day3Amt,
          day4Amt,
          day5Amt,
          day6Amt,
          day7Amt
        ];

        console.log(arrAmt);
        document.getElementById('todayCount').innerHTML = todayCnt;
        document.getElementById('todayAmount').innerHTML = todayAmount.toLocaleString('en-IN', curFormat);

        document.getElementById('yesterdayCount').innerHTML = yesterdayCnt;
        document.getElementById('yesterdayAmount').innerHTML = yesterdayAmount.toLocaleString('en-IN', curFormat);

        document.getElementById('WeekCount').innerHTML = weekCnt;
        document.getElementById('WeekAmount').innerHTML = weekAmount.toLocaleString('en-IN', curFormat);

        document.getElementById('monthCount').innerHTML = monthCnt;
        document.getElementById('monthAmount').innerHTML = monthAmount.toLocaleString('en-IN', curFormat);

        orderChart(arrAmt, dateArr);
        document.getElementById("loading").style.display="none";
        document.getElementById("cardOrder").style.display="block";
        document.getElementById("trendChart").style.display="block";
        getLastOrder();
      });
      if(flag === false)
      {
        //no date
        document.getElementById("message").innerHTML="Welcome to Agrikaash."
        document.getElementById('btnStartShopping').style.display="block";
        document.getElementById("cardOrder").style.display="none";
        document.getElementById("trendChart").style.display="none";

      }
    });

}

function getLastOrder()
{
  var orderdate ;
  var todayAmount=0;
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


  db.collection('OrderDetails')
    .where("orderBy", "==", userID)
    .orderBy("orderDate", 'desc')
    .limit(1)
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      console.log("populatePayments: ");

      changes.forEach(change => {
        flag = true;
        var orderDetails = change.doc.data();

         var oorderdate = new Date(orderDetails.orderDate.seconds * 1000);
         console.log(oorderdate);
         orderdate = oorderdate.toLocaleDateString("en-US", options);
         console.log(orderdate);
        todayAmount = Number(orderDetails.totalAmount);
      });
      var curFormat = { style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 };
      todayAmount = todayAmount.toLocaleString('en-IN', curFormat);
      document.getElementById('lastOrder').innerHTML = "Last Order ["+ orderdate +"] : "+todayAmount;
    });

}

function PopulateDeliverySummary() {
  console.log('in PopulateDeliverySummary');
  var todayDate = new Date();

  var dayM1 = new Date();
  dayM1.setDate(todayDate.getDate() - 1);

  var dayM2 = new Date();
  dayM2.setDate(todayDate.getDate() - 2);

  var dayM3 = new Date();
  dayM3.setDate(todayDate.getDate() - 3);

  var dayM4 = new Date();
  dayM4.setDate(todayDate.getDate() - 4);

  var dayM5 = new Date();
  dayM5.setDate(todayDate.getDate() - 5);

  var dayM6 = new Date();
  dayM6.setDate(todayDate.getDate() - 6);

  var dayM7 = new Date();
  dayM7.setDate(todayDate.getDate() - 7);

  var dayP1 = new Date();
  dayP1.setDate(todayDate.getDate() + 1);

  var dayP2 = new Date();
  dayP2.setDate(todayDate.getDate() + 2);

  var dayP3 = new Date();
  dayP3.setDate(todayDate.getDate() + 3);

  var dayP4 = new Date();
  dayP4.setDate(todayDate.getDate() + 4);

  var dayP5 = new Date();
  dayP5.setDate(todayDate.getDate() + 5);

  var dayP6 = new Date();
  dayP6.setDate(todayDate.getDate() + 6);

  var dayP7 = new Date();
  dayP7.setDate(todayDate.getDate() + 7);

  var todayCnt = 0;
  var dayM1Cnt = 0;
  var dayM2Cnt = 0;
  var dayM3Cnt = 0;
  var dayM4Cnt = 0;
  var dayM5Cnt = 0;
  var dayM6Cnt = 0;
  var dayM7Cnt = 0;
  var dayP1Cnt = 0;
  var dayP2Cnt = 0;
  var dayP3Cnt = 0;
  var dayP4Cnt = 0;
  var dayP5Cnt = 0;
  var dayP6Cnt = 0;
  var dayP7Cnt = 0;

  var todayAmount = 0;
  var dayM1Amt = 0;
  var dayM2Amt = 0;
  var dayM3Amt = 0;
  var dayM4Amt = 0;
  var dayM5Amt = 0;
  var dayM6Amt = 0;
  var dayM7Amt = 0;
  var dayP1Amt = 0;
  var dayP2Amt = 0;
  var dayP3Amt = 0;
  var dayP4Amt = 0;
  var dayP5Amt = 0;
  var dayP6Amt = 0;
  var dayP7Amt = 0;



  dateArrDelivery = [
    dayP7,
    dayP6,
    dayP5,
    dayP4,
    dayP3,
    dayP2,
    dayP1,
    todayDate,
    dayM1,
    dayM2,
    dayM3,
    dayM4,
    dayM5,
    dayM6,
    dayM7
  ];
  console.log(dateArrDelivery);
  var deliverydate = new Date();

  //    DBrows =
  db.collection('OrderDetails')
    .where("orderBy", "==", userID)
    .where("deliveryDate", "<=", dayP7)
    .where("deliveryDate", ">=", dayM7)
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      console.log("populatePayments: ");

      changes.forEach(change => {

        console.log('in loop');
        var orderDetails = change.doc.data();

        deliverydate = new Date(orderDetails.deliveryDate.seconds * 1000);
//console.log(orderDetails[i].totalAmount);
          if (deliverydate.getDate() === todayDate.getDate() && deliverydate.getMonth() === todayDate.getMonth() && deliverydate.getYear() === todayDate.getYear()) {
            todayCnt = todayCnt + 1;
            todayAmount = Number(todayAmount) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayP1.getDate() && deliverydate.getMonth() === dayP1.getMonth() && deliverydate.getYear() === dayP1.getYear()) {
            dayP1Cnt = dayP1Cnt + 1;
            dayP1Amt = Number(dayP1Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayP2.getDate() && deliverydate.getMonth() === dayP2.getMonth() && deliverydate.getYear() === dayP2.getYear()) {
            dayP2Cnt = dayP2Cnt + 1;
            dayP2Amt = Number(dayP2Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayP3.getDate() && deliverydate.getMonth() === dayP3.getMonth() && deliverydate.getYear() === dayP3.getYear()) {
            dayP3Cnt = dayP3Cnt + 1;
            dayP3Amt = Number(dayP3Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayP4.getDate() && deliverydate.getMonth() === dayP4.getMonth() && deliverydate.getYear() === dayP4.getYear()) {
            dayP4Cnt = dayP4Cnt + 1;
            dayP4Amt = Number(dayP4Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayP5.getDate() && deliverydate.getMonth() === dayP5.getMonth() && deliverydate.getYear() === dayP5.getYear()) {
            dayP5Cnt = dayP5Cnt + 1;
            dayP5Amt = Number(dayP5Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayP6.getDate() && deliverydate.getMonth() === dayP6.getMonth() && deliverydate.getYear() === dayP6.getYear()) {
            dayP6Cnt = dayP6Cnt + 1;
            dayP6Amt = Number(dayP6Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayP7.getDate() && deliverydate.getMonth() === dayP7.getMonth() && deliverydate.getYear() === dayP7.getYear()) {
            dayP7Cnt = dayP7Cnt + 1;
            dayP7Amt = Number(dayP7Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayM1.getDate() && deliverydate.getMonth() === dayM1.getMonth() && deliverydate.getYear() === dayM1.getYear()) {
            dayM1Cnt = dayM1Cnt + 1;
            dayM1Amt = Number(dayM1Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayM2.getDate() && deliverydate.getMonth() === dayM2.getMonth() && deliverydate.getYear() === dayM2.getYear()) {
            dayM2Cnt = dayM2Cnt + 1;
            dayM2Amt = Number(dayM2Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayM3.getDate() && deliverydate.getMonth() === dayM3.getMonth() && deliverydate.getYear() === dayM3.getYear()) {
            dayM3Cnt = dayM3Cnt + 1;
            dayM3Amt = Number(dayM3Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayM4.getDate() && deliverydate.getMonth() === dayM4.getMonth() && deliverydate.getYear() === dayM4.getYear()) {
            dayM4Cnt = dayM4Cnt + 1;
            dayM4Amt = Number(dayM4Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayM5.getDate() && deliverydate.getMonth() === dayM5.getMonth() && deliverydate.getYear() === dayM5.getYear()) {
            dayM5Cnt = dayM5Cnt + 1;
            dayM5Amt = Number(dayM5Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayM6.getDate() && deliverydate.getMonth() === dayM6.getMonth() && deliverydate.getYear() === dayM6.getYear()) {
            dayM6Cnt = dayM6Cnt + 1;
            dayM6Amt = Number(dayM6Amt) + Number(orderDetails.totalAmount);
          } else if (deliverydate.getDate() === dayM7.getDate() && deliverydate.getMonth() === dayM7.getMonth() && deliverydate.getYear() === dayM7.getYear()) {
            dayM7Cnt = dayM7Cnt + 1;
            dayM7Amt = Number(dayM7Amt) + Number(orderDetails.totalAmount);
          }


        });

      arrAmtDelivery = [dayP7Amt,
        dayP6Amt,
        dayP5Amt,
        dayP4Amt,
        dayP3Amt,
        dayP2Amt,
        dayP1Amt,
        todayAmount,
        dayM1Amt,
        dayM2Amt,
        dayM3Amt,
        dayM4Amt,
        dayM5Amt,
        dayM6Amt,
        dayM7Amt

      ];
      console.log(arrAmtDelivery);
      deliveryChart(arrAmtDelivery, dateArrDelivery);
    });



}

function changeGraphType(type) {
  console.log(type);
  var chartType = document.getElementById('chartContainer');

  if (type === 2)
    chart1.options.data[0].type = 'column';
  if (type === 1)
    chart1.options.data[0].type = 'line';


  console.log(chart1.options.data[0].type);
  chart1.render();
}

function orderChart(arrAmt, dateArr) {
  // window.onload = function() {
  var min = arrAmt[0];
  var max = arrAmt[0];

  for (i = 1; i < 7; i++) {
    if (arrAmt[i] > 0) {
      if (min > arrAmt[i])
        min = arrAmt[i];
      if (max < arrAmt[i])
        max = arrAmt[i];
    }
  }
  var datapoints = [];
  var item;
  var minFlag = false;
  for (i = 0; i < 7; i++) {
    if (arrAmt[i] === min && minFlag === false) {
      item = {
        x: dateArr[i],
        y: arrAmt[i],
        indexLabel: "lowest",
        markerColor: "DarkSlateGrey",
        markerType: "cross"
      };
      minFlag = true;
    } else if (arrAmt[i] === max) {
      item = {
        x: dateArr[i],
        y: arrAmt[i],
        indexLabel: "highest",
        markerColor: "red",
        markerType: "triangle"
      };
    } else {
      item = {
        x: dateArr[i],
        y: arrAmt[i]
      };
    }

    datapoints.push(item);
  }


  //  var chart1 = new CanvasJS.Chart("chartContainer", {
  chart1 = new CanvasJS.Chart("chartContainer", {

    title: {
      text: "Orders - Weekly"
    },
    axisX: {
      valueFormatString: "MMM",
      interval: 2,
      intervalType: "month"
    },
    axisY: {
      includeZero: false

    },
    data: [{
      type: "column",

      dataPoints: datapoints
    }]
  });

  chart1.render();
  // }

}



function deliveryChart(arrAmt, dateArr) {
  // window.onload = function() {
  var min = arrAmt[0];
  var max = arrAmt[0];

  for (i = 1; i < 15; i++) {
    if (arrAmt[i] > 0) {
      if (min > arrAmt[i])
        min = arrAmt[i];
      if (max < arrAmt[i])
        max = arrAmt[i];
    }
  }
  var datapoints = [];
  var item;
  var minFlag = false;
  for (i = 0; i < 15; i++) {
    if (arrAmt[i] === min && minFlag === false) {
      item = {
        x: dateArr[i],
        y: arrAmt[i],
        indexLabel: "lowest",
        markerColor: "DarkSlateGrey",
        markerType: "cross"
      };
      minFlag = true;
    } else if (arrAmt[i] === max) {
      item = {
        x: dateArr[i],
        y: arrAmt[i],
        indexLabel: "highest",
        markerColor: "red",
        markerType: "triangle"
      };
    } else {
      item = {
        x: dateArr[i],
        y: arrAmt[i]
      };
    }

    datapoints.push(item);
  }


  //  var chart1 = new CanvasJS.Chart("chartContainer", {
  chart2 = new CanvasJS.Chart("chartContainer1", {

    title: {
      text: "Delivery - Trend"
    },
    axisX: {
      valueFormatString: "MMM",
      interval: 2,
      intervalType: "month"
    },
    axisY: {
      includeZero: false

    },
    data: [{
      type: "column",

      dataPoints: datapoints
    }]
  });

  chart2.render();
  // }

}
