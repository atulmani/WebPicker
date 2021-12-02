//const productID = document.getElementById('productID');
var userID = "";
var addressList = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      PopulateOrderSummary();
      //  populateAddressList();
      //populateCartData();
      //  getCartItemNo();
    } else {
      console.log('User has been logged out');
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
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
function PopulateOrderSummary() {
  console.log('in PopulateTodaysOrder');
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

  console.log(dateArr);

  var orderdate = new Date();
  const snapshot = db.collection('OrderDetails').doc(userID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        var orderDetails = doc.data().OrderDetails;
        //console.log(doc.data().OrderDetails.getDate());
        for (i = 0; i < orderDetails.length; i++) {
          //console.log( orderDetails[i].orderDate);
          orderdate = new Date(Date.parse(orderDetails[i].orderDate));
          //console.log(orderDetails[i].totalAmount);
          if (orderdate.getDate() === todayDate.getDate() && orderdate.getMonth() === todayDate.getMonth() && orderdate.getYear() === todayDate.getYear()) {
            todayCnt = todayCnt + 1;
            todayAmount = Number(todayAmount) + Number(orderDetails[i].totalAmount);
          } else if (orderdate.getDate() === yesterdayDate.getDate() && orderdate.getMonth() === yesterdayDate.getMonth() && orderdate.getYear() === yesterdayDate.getYear()) {

            yesterdayCnt = yesterdayCnt + 1;
            yesterdayAmount = Number(yesterdayAmount) + Number(orderDetails[i].totalAmount);
          } else if (orderdate.getDate() === day3.getDate() && orderdate.getMonth() === day3.getMonth() && orderdate.getYear() === day3.getYear()) {

            day3Amt = Number(day3Amt) + Number(orderDetails[i].totalAmount);
          } else if (orderdate.getDate() === day4.getDate() && orderdate.getMonth() === day4.getMonth() && orderdate.getYear() === day4.getYear()) {

            day4Amt = Number(day4Amt) + Number(orderDetails[i].totalAmount);
          } else if (orderdate.getDate() === day5.getDate() && orderdate.getMonth() === day5.getMonth() && orderdate.getYear() === day5.getYear()) {

            day5Amt = Number(day5Amt) + Number(orderDetails[i].totalAmount);
          } else if (orderdate.getDate() === day6.getDate() && orderdate.getMonth() === day6.getMonth() && orderdate.getYear() === day6.getYear()) {

            day6Amt = Number(day6Amt) + Number(orderDetails[i].totalAmount);
          } else if (orderdate.getDate() === day7.getDate() && orderdate.getMonth() === day7.getMonth() && orderdate.getYear() === day7.getYear()) {

            day7Amt = Number(day7Amt) + Number(orderDetails[i].totalAmount);
          }
          if (orderdate >= lastweek) {
            weekCnt = weekCnt + 1;
            weekAmount = Number(weekAmount) + Number(orderDetails[i].totalAmount);
          }
          if (orderdate.getMonth() === todayDate.getMonth() && orderdate.getYear() === todayDate.getYear()) {

            monthCnt = monthCnt + 1;
            monthAmount = Number(monthAmount) + Number(orderDetails[i].totalAmount);

          }

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
        document.getElementById('todayAmount').innerHTML = todayAmount;

        document.getElementById('yesterdayCount').innerHTML = yesterdayCnt;
        document.getElementById('yesterdayAmount').innerHTML = yesterdayAmount;

        document.getElementById('WeekCount').innerHTML = weekCnt;
        document.getElementById('WeekAmount').innerHTML = weekAmount;

        document.getElementById('monthCount').innerHTML = monthCnt;
        document.getElementById('monthAmount').innerHTML = monthAmount;

        columnChart(arrAmt, dateArr);


      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });
}

function changeGraphType(type)
{
  console.log(type);
  var chartType = document.getElementById('chartContainer');

  if(type === 2 )
    chart1.options.data[0].type = 'column';
  if(type=== 1)
  chart1.options.data[0].type = 'line';


    console.log(chart1.options.data[0].type);
    chart1.render();
  }

function columnChart(arrAmt, dateArr) {
  // window.onload = function() {
  var min = arrAmt[0];
  var max = arrAmt[0];

  for (i = 1; i < 7; i++) {
    if (min > arrAmt[i])
      min = arrAmt[i];
    if (max < arrAmt[i])
      max = arrAmt[i];

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
      text: "Orders - Daily"
    },
    axisX: {
    //  valueFormatString: "DD-MMM",
      interval: 1//,
    // intervalType: "Days"
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
