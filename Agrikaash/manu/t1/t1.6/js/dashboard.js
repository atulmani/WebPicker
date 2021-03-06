//const productID = document.getElementById('productID');
var userID = "";
var userRole = [];
var userType="";
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
        //userID = doc.data().uid;
        userRole = doc.data().UserRole;
      //  console.log(userRole);
        userType = doc.data().userType;
         if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
           document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        document.getElementById('profileName').innerHTML =  doc.data().displayName;
        PopulateOrderSummary();
        PopulateDeliverySummary();
        PopulateDeliveryCard();
        UpdateCartItem();
        GetNotificationList();
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



function GetNotificationList() {
  var index = 0;
  var flag = false;
  var today = new Date();
  var userNotification = [];
  const DBrows1 = db.collection('UserNotification')
    .doc(userID);

    const snapshot1 = db.collection('UserNotification').doc(userID);

    snapshot1.get().then(async (doc1) => {
      console.log('check');
      if (doc1.exists) {
        userNotification  = doc1.data().Notifications;
      }
    });

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

      if(userNotification.indexOf(change.doc.id) >= 0  )
          flag = false;
      if (flag === true) {
        index = index + 1;
      }
    });

    if(flag === true)
    {
      document.getElementById("notificationCnt").innerHTML=index;
      document.getElementById("notificationCnt1").innerHTML=index;

      localStorage.setItem("notificationCount", index);

    }
    else {
      localStorage.setItem("notificationCount", 0);

    }

  });
}

function UpdateCartItem()
{
  localStorage.setItem("cartItem", 0);
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
      localStorage.setItem("cartItem", item);

    }
  });
}


function PopulateOrderSummary() {
  console.log('in PopulateTodaysOrder');
  var amount = 0;

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
  amount = amount.toLocaleString('en-IN', curFormat);
  //console.log(amount);
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
  lastweek.setDate(todayDate.getDate() - 8);


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
  lastweek.setDate(todayDate.getDate() - 8);

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

  var orderdate = new Date();
  var snapshot;
  currentMonth = todayDate;
  var currentMonth = currentMonth.setMonth(currentMonth.getMonth() - 2);
  currentMonth = new Date(currentMonth);
  todayDate = new Date();
  //console.log(currentMonth, userID, todayDate, currentMonth);
  var DBrows;
  //    DBrows =
  var flag = false;

  var statusList = ['Pending', 'Packed','On The Way', 'Delivered'];
  console.log(userID);
  db.collection('OrderDetails')
     .where("orderBy", "==", userID)
     .where("orderStatus","in",statusList)
    //  .where("orderDate", "<=", todayDate)
    .where("orderDate", ">=", currentMonth)
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      //  console.log("populatePayments: ");

      changes.forEach(change => {
        flag = true;
        //  console.log('in loop');
        var orderDetails = change.doc.data();

        var orderdate = new Date(orderDetails.orderDate.seconds * 1000);
        //console.log(orderdate.getYear(), todayDate.getYear());
        //orderdate = oorderdate.toLocaleDateString("en-US", options);
        //orderdate = new Date(Date.parse(orderDetails.orderDate));
        // console.log(orderdate);
        // console.log(todayDate);
        if (orderdate.getDate() === todayDate.getDate() && orderdate.getMonth() === todayDate.getMonth() && orderdate.getYear() === todayDate.getYear()) {
          todayCnt = todayCnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            todayAmount = Number(todayAmount) + Number(orderDetails.totalAmount);
          }else {
            todayAmount = Number(todayAmount) + Number(orderDetails.discountedprize)
          }

//          todayAmount = Number(todayAmount) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === yesterdayDate.getDate() && orderdate.getMonth() === yesterdayDate.getMonth() && orderdate.getYear() === yesterdayDate.getYear()) {

          yesterdayCnt = yesterdayCnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            yesterdayAmount = Number(yesterdayAmount) + Number(orderDetails.totalAmount);
          }else {
            yesterdayAmount = Number(yesterdayAmount) + Number(orderDetails.discountedprize)
          }

//          yesterdayAmount = Number(yesterdayAmount) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day3.getDate() && orderdate.getMonth() === day3.getMonth() && orderdate.getYear() === day3.getYear()) {

          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            day3Amt = Number(day3Amt) + Number(orderDetails.totalAmount);
          }else {
            day3Amt = Number(day3Amt) + Number(orderDetails.discountedprize)
          }
          //day3Amt = Number(day3Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day4.getDate() && orderdate.getMonth() === day4.getMonth() && orderdate.getYear() === day4.getYear()) {
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            day4Amt = Number(day4Amt) + Number(orderDetails.totalAmount);
          }else {
            day4Amt = Number(day4Amt) + Number(orderDetails.discountedprize)
          }
          //day4Amt = Number(day4Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day5.getDate() && orderdate.getMonth() === day5.getMonth() && orderdate.getYear() === day5.getYear()) {
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            day5Amt = Number(day5Amt) + Number(orderDetails.totalAmount);
          }else {
            day5Amt = Number(day5Amt) + Number(orderDetails.discountedprize)
          }
          //day5Amt = Number(day5Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day6.getDate() && orderdate.getMonth() === day6.getMonth() && orderdate.getYear() === day6.getYear()) {
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            day6Amt = Number(day6Amt) + Number(orderDetails.totalAmount);
          }else {
            day6Amt = Number(day6Amt) + Number(orderDetails.discountedprize)
          }
          //day6Amt = Number(day6Amt) + Number(orderDetails.totalAmount);
        } else if (orderdate.getDate() === day7.getDate() && orderdate.getMonth() === day7.getMonth() && orderdate.getYear() === day7.getYear()) {
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            day7Amt = Number(day7Amt) + Number(orderDetails.totalAmount);
          }else {
            day7Amt = Number(day7Amt) + Number(orderDetails.discountedprize)
          }
          //day7Amt = Number(day7Amt) + Number(orderDetails.totalAmount);
        }


        if (orderdate >= lastweek) {
          weekCnt = weekCnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            weekAmount = Number(weekAmount) + Number(orderDetails.totalAmount);
          }else {
            weekAmount = Number(weekAmount) + Number(orderDetails.discountedprize)
          }
          //weekAmount = Number(weekAmount) + Number(orderDetails.totalAmount);
        }
        if (orderdate.getMonth() === todayDate.getMonth() && orderdate.getYear() === todayDate.getYear()) {

          monthCnt = monthCnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            monthAmount = Number(monthAmount) + Number(orderDetails.totalAmount);
          }else {
            monthAmount = Number(monthAmount) + Number(orderDetails.discountedprize)
          }
          //monthAmount = Number(monthAmount) + Number(orderDetails.totalAmount);

        }
        dateArr = [

          todayDate,
          yesterdayDate,
          day3,
          day4,
          day5,
          day6,
          day7

        ];


        // console.log('todayCnt', todayCnt);
        arrAmt = [todayAmount,
          yesterdayAmount,
          day3Amt,
          day4Amt,
          day5Amt,
          day6Amt,
          day7Amt
        ];

        //console.log(arrAmt);
        //console.log(dateArr);
        document.getElementById('todayCount').innerHTML = todayCnt;
        document.getElementById('todayAmount').innerHTML = todayAmount.toLocaleString('en-IN', curFormat);

        document.getElementById('yesterdayCount').innerHTML = yesterdayCnt;
        document.getElementById('yesterdayAmount').innerHTML = yesterdayAmount.toLocaleString('en-IN', curFormat);

        document.getElementById('WeekCount').innerHTML = weekCnt;
        document.getElementById('WeekAmount').innerHTML = weekAmount.toLocaleString('en-IN', curFormat);

        document.getElementById('monthCount').innerHTML = monthCnt;
        document.getElementById('monthAmount').innerHTML = monthAmount.toLocaleString('en-IN', curFormat);

        orderChart(arrAmt, dateArr);
        document.getElementById("loading").style.display = "none";
        document.getElementById("cardOrder").style.display = "block";
        document.getElementById("cardDelivery").style.display = "block";
        // document.getElementById("productDiv").style.display = "block";
        //document.getElementById("userRegistration").style.display = "block";
        // document.getElementById("trendChart").style.height = "450px";
        // document.getElementById("trendChart").style.visibility = "visible";
        document.getElementById("trendChart1").style.height = "450px";
        document.getElementById("trendChart1").style.visibility = "visible";
        getLastOrder();
      });
      if (flag === false) {
        //no date
        document.getElementById("message").innerHTML = "Welcome to Agrikaash."
        document.getElementById('btnStartShopping').style.display = "block";
        document.getElementById("cardOrder").style.display = "none";
        document.getElementById("cardDelivery").style.display = "none";
        // document.getElementById("productDiv").style.display = "none";
        //document.getElementById("userRegistration").style.display = "none";
        // document.getElementById("trendChart").style.display = "none";
        // document.getElementById("trendChart1").style.display = "none";


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

  var statusList = ['Pending', 'Packed','On The Way', 'Delivered'];

  db.collection('OrderDetails')
 .where("orderStatus","in",statusList)
         .where("orderBy", "==", userID)
    .orderBy("orderDate", 'desc')
    .limit(1)
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      //console.log("populatePayments: ");

      changes.forEach(change => {
        flag = true;
        var orderDetails = change.doc.data();

         var oorderdate = new Date(orderDetails.orderDate.seconds * 1000);
        // console.log(oorderdate);
         orderdate = oorderdate.toLocaleDateString("en-US", options);
        // console.log(orderdate);
        if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
        {
          todayAmount = Number(orderDetails.totalAmount);
        }else {
          todayAmount = Number(orderDetails.discountedprize)
        }
      });
      var curFormat = { style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2 };
      todayAmount = todayAmount.toLocaleString('en-IN', curFormat);
      document.getElementById('lastOrder').innerHTML = "Last Order ["+ orderdate +"] : "+todayAmount;
    });

}
function PopulateDeliveryCard()
{
  var index = 0;
  var flag = false;
  var statusList = ['Pending', 'Packed','On The Way', 'Delivered'];

  db.collection('OrderDetails')
    .where("orderBy", "==", userID)

         .where("orderStatus","in",statusList)
    .orderBy("deliveryDate", "desc")
    .limit(4)
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      //console.log("populatePayments: ");

      changes.forEach(change => {
        flag = true;
        renderDeliveryOrder(change.doc.data(), index, change.doc.id);
        index = index + 1;
      });

      if(flag === true)
      {
        getNextDelivery();
      }
    });
}

function getNextDelivery()
{
  console.log("getNextDelivery");
  var deliveryDate ;
  var deliveryTime ;

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var pendingStatus =['Pending','On The Way','Packed'];
  var today = new Date();
  var flag=false;
  db.collection('OrderDetails')
    .where("orderBy", "==", userID)
    .where("deliveryDate",">=", today)
    .where("orderStatus","in",pendingStatus)
    .orderBy("deliveryDate")
    .limit(1)
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      console.log("populatePayments: ");

      changes.forEach(change => {
        flag = true;
        console.log("in first for");
        var oorderdate = new Date(change.doc.data().deliveryDate.seconds * 1000);
        deliveryDate = oorderdate.toLocaleDateString("en-US", options);

        deliveryTime = change.doc.data().deliveryTime;
        document.getElementById("nextDelivery").innerHTML="Next Delivery : "+ deliveryDate +" [ "  + deliveryTime + " ] ";

      });

      if(flag === false)
      {
        var statusList = ['Pending', 'Packed','On The Way', 'Delivered'];

        console.log("in second for");
        db.collection('OrderDetails')
          .where("orderStatus","in",statusList)
          .where("orderBy", "==", userID)
          .where("deliveryDate","<=", today)
          .orderBy("deliveryDate", "desc")
          .limit(1)
          .onSnapshot(snapshot1 => {
            let changes1 = snapshot1.docChanges();

            console.log("populatePayments: ");

            changes1.forEach(change1 => {
              console.log("in for");
              var oorderdate = new Date(change1.doc.data().deliveryDate.seconds * 1000);
              deliveryDate = oorderdate.toLocaleDateString("en-US", options);

              deliveryTime = change1.doc.data().deliveryTime;
              document.getElementById("nextDelivery").innerHTML="Last Delivery : "+ deliveryDate +" [ "  + deliveryTime + " ] ";

            });

          });
        }
    });
}
function renderDeliveryOrder(order, index, orderid)
{

  var curFormat = { style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2 };

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var div1 = document.createElement("div");
  div1.setAttribute("class","dashboard-card-delivery");
  if(order.orderStatus==="Delivered")
    div1.setAttribute("style","border-left: 2px solid #1D741B;");
  else if(order.orderStatus==="On The Way")
    div1.setAttribute("style","border-left: 2px solid #88CA5E;");
  else if(order.orderStatus==="Packed" || order.orderStatus==="Pending")
    div1.setAttribute("style","border-left: 2px solid #F8D210;");
  else if(order.orderStatus==="Cancelled")
    div1.setAttribute("style","border-left: 2px solid #ff5757;");

    var div2 = document.createElement("div");
    div2.setAttribute("class","");

    var div3 = document.createElement('div');
    div3.setAttribute("class","");
    div3.setAttribute("style","display:flex;align-items:center;");

    var span1 =document.createElement("span");
    span1.setAttribute("class","material-icons-outlined");
    if(order.orderStatus==="Delivered")
    {
      span1.setAttribute("style","font-size: 2rem; color: #1D741B;");
      span1.innerHTML="check_circle";
    }
    else if(order.orderStatus==="On The Way")
    {
      span1.setAttribute("style","font-size: 2rem; color: #88CA5E;");
      span1.innerHTML="local_shipping";
    }
    else if(order.orderStatus==="Packed" )
    {

        span1.setAttribute("style","font-size: 2rem; color: #F8D210;");
        span1.innerHTML="widgets";
    }
    else if(order.orderStatus==="Pending" )
    {

        span1.setAttribute("style","font-size: 2rem; color: #F8D210;");
        span1.innerHTML="history_toggle_off";
    }
    else if(order.orderStatus==="Cancelled")
    {

        span1.setAttribute("style","font-size: 2rem; color: #ff5757;");
        span1.innerHTML="cancel";
    }
    div3.appendChild(span1);

    var dt =   order.deliveryDate ;
    var odeldate = new Date(dt.seconds * 1000);
    var delDate  = odeldate.toLocaleDateString("en-US", options);

    var h1 = document.createElement("h5");
    h1.innerHTML=delDate  + " [ " +order.deliveryTime + " ] ";
    div3.appendChild(h1);

    div2.appendChild(div3);

    var div4 = document.createElement("div");
    div4.setAttribute("class","");
    div4.setAttribute("style","display:flex;align-items:center;justify-content: space-between;");

    var small1 = document.createElement("small");
    small1.setAttribute("class","small-text dashboard-sub-heading");
    var discamt  = order.discountedprize;
    var totalamt  = order.totalAmount;
    var displayAmt ;
    if(discamt === undefined || discamt === null || discamt === "" || discamt === 'NaN' || discamt === 0)
    {
      displayAmt = totalamt;
    }
    else {
      displayAmt = discamt;
    }
    displayAmt = Number(displayAmt).toLocaleString('en-IN', curFormat);
    small1.innerHTML="Items : " + order.totalItems + " - " + displayAmt;

    div4.appendChild(small1);

    var small2 = document.createElement("small");
    small2.setAttribute("class","small-text dashboard-sub-heading");

    if(order.orderStatus==="Delivered")
    {
      small2.setAttribute("style","color: #1D741B;font-weight: bold;");
    }
    else if(order.orderStatus==="On The Way")
    {
      small2.setAttribute("style","color: #88CA5E;font-weight: bold;");
    }
    else if(order.orderStatus==="Packed" || order.orderStatus==="Pending" )
    {
        small2.setAttribute("style","color: #F8D210;font-weight: bold;");
    }
    else if(order.orderStatus==="Cancelled")
    {
        small2.setAttribute("style","color: #ff5757;font-weight: bold;");
    }
    small2.innerHTML=order.orderStatus;

    div4.appendChild(small2);

    div2.appendChild(div4);
    div1.appendChild(div2);

    var div5 = document.createElement("div");
    div5.setAttribute("class","");
    div5.setAttribute("style","text-align: center;");
    var aa = document.createElement("a");
    aa.setAttribute("href","orderSummary.html?id="+orderid)

    var span2 = document.createElement("span");
    span2.setAttribute("class","material-icons-outlined");
    span2.setAttribute("style", "font-size: 3.6rem;color: #aaa; position:relative;right: 8px;width: 30px;height:30px;");
    span2.innerHTML="arrow_right";
    aa.appendChild(span2);
    div5.appendChild(aa);

    div1.appendChild(div5);

    document.getElementById("deliveryDetailsCard").appendChild(div1);

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



  //console.log(dateArrDelivery);
  var deliverydate = new Date();

  //    DBrows =
  var statusList = ['Pending', 'Packed','On The Way', 'Delivered'];

  db.collection('OrderDetails')
    .where("orderBy", "==", userID)
     .where("orderStatus","in",statusList)
    .where("deliveryDate", "<=", dayP7)
    .where("deliveryDate", ">=", dayM7)
    .onSnapshot(snapshot => {


      let changes = snapshot.docChanges();

      console.log("populatePayments: ");

      changes.forEach(change => {

        var orderDetails = change.doc.data();

        deliverydate = new Date(orderDetails.deliveryDate.seconds * 1000);
        //console.log(orderDetails[i].totalAmount);
        if (deliverydate.getDate() === todayDate.getDate() && deliverydate.getMonth() === todayDate.getMonth() && deliverydate.getYear() === todayDate.getYear()) {
          todayCnt = todayCnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            todayAmount = Number(todayAmount) + Number(orderDetails.totalAmount);
          }else {
            todayAmount = Number(todayAmount) +Number(orderDetails.discountedprize)
          }
          //todayAmount = Number(todayAmount) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayP1.getDate() && deliverydate.getMonth() === dayP1.getMonth() && deliverydate.getYear() === dayP1.getYear()) {
          dayP1Cnt = dayP1Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayP1Amt = Number(dayP1Amt) + Number(orderDetails.totalAmount);
          }else {
            dayP1Amt = Number(dayP1Amt) +Number(orderDetails.discountedprize)
          }
          //dayP1Amt = Number(dayP1Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayP2.getDate() && deliverydate.getMonth() === dayP2.getMonth() && deliverydate.getYear() === dayP2.getYear()) {
          dayP2Cnt = dayP2Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayP2Amt = Number(dayP2Amt) + Number(orderDetails.totalAmount);
          }else {
            dayP2Amt = Number(dayP2Amt) +Number(orderDetails.discountedprize)
          }
          //dayP2Amt = Number(dayP2Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayP3.getDate() && deliverydate.getMonth() === dayP3.getMonth() && deliverydate.getYear() === dayP3.getYear()) {
          dayP3Cnt = dayP3Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayP3Amt = Number(dayP3Amt) + Number(orderDetails.totalAmount);
          }else {
            dayP3Amt = Number(dayP3Amt) +Number(orderDetails.discountedprize)
          }
          //dayP3Amt = Number(dayP3Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayP4.getDate() && deliverydate.getMonth() === dayP4.getMonth() && deliverydate.getYear() === dayP4.getYear()) {
          dayP4Cnt = dayP4Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayP4Amt = Number(dayP4Amt) + Number(orderDetails.totalAmount);
          }else {
            dayP4Amt = Number(dayP4Amt) +Number(orderDetails.discountedprize)
          }
          //dayP4Amt = Number(dayP4Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayP5.getDate() && deliverydate.getMonth() === dayP5.getMonth() && deliverydate.getYear() === dayP5.getYear()) {
          dayP5Cnt = dayP5Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayP5Amt = Number(dayP5Amt) + Number(orderDetails.totalAmount);
          }else {
            dayP5Amt = Number(dayP5Amt) +Number(orderDetails.discountedprize)
          }
          //dayP5Amt = Number(dayP5Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayP6.getDate() && deliverydate.getMonth() === dayP6.getMonth() && deliverydate.getYear() === dayP6.getYear()) {
          dayP6Cnt = dayP6Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayP6Amt = Number(dayP6Amt) + Number(orderDetails.totalAmount);
          }else {
            dayP6Amt = Number(dayP6Amt) +Number(orderDetails.discountedprize)
          }
          //dayP6Amt = Number(dayP6Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayP7.getDate() && deliverydate.getMonth() === dayP7.getMonth() && deliverydate.getYear() === dayP7.getYear()) {
          dayP7Cnt = dayP7Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayP7Amt = Number(dayP7Amt) + Number(orderDetails.totalAmount);
          }else {
            dayP7Amt = Number(dayP7Amt) +Number(orderDetails.discountedprize)
          }
          //dayP7Amt = Number(dayP7Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayM1.getDate() && deliverydate.getMonth() === dayM1.getMonth() && deliverydate.getYear() === dayM1.getYear()) {
          dayM1Cnt = dayM1Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayM1Amt = Number(dayM1Amt) + Number(orderDetails.totalAmount);
          }else {
            dayM1Amt = Number(dayM1Amt) +Number(orderDetails.discountedprize)
          }
          //dayM1Amt = Number(dayM1Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayM2.getDate() && deliverydate.getMonth() === dayM2.getMonth() && deliverydate.getYear() === dayM2.getYear()) {
          dayM2Cnt = dayM2Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayM2Amt = Number(dayM2Amt) + Number(orderDetails.totalAmount);
          }else {
            dayM2Amt = Number(dayM2Amt) +Number(orderDetails.discountedprize)
          }
          //dayM2Amt = Number(dayM2Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayM3.getDate() && deliverydate.getMonth() === dayM3.getMonth() && deliverydate.getYear() === dayM3.getYear()) {
          dayM3Cnt = dayM3Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayM3Amt = Number(dayM3Amt) + Number(orderDetails.totalAmount);
          }else {
            dayM3Amt = Number(dayM3Amt) +Number(orderDetails.discountedprize)
          }
          //dayM3Amt = Number(dayM3Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayM4.getDate() && deliverydate.getMonth() === dayM4.getMonth() && deliverydate.getYear() === dayM4.getYear()) {
          dayM4Cnt = dayM4Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayM4Amt = Number(dayM4Amt) + Number(orderDetails.totalAmount);
          }else {
            dayM4Amt = Number(dayM4Amt) +Number(orderDetails.discountedprize)
          }
          //dayM4Amt = Number(dayM4Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayM5.getDate() && deliverydate.getMonth() === dayM5.getMonth() && deliverydate.getYear() === dayM5.getYear()) {
          dayM5Cnt = dayM5Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayM5Amt = Number(dayM5Amt) + Number(orderDetails.totalAmount);
          }else {
            dayM5Amt = Number(dayM5Amt) +Number(orderDetails.discountedprize)
          }

          //dayM5Amt = Number(dayM5Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayM6.getDate() && deliverydate.getMonth() === dayM6.getMonth() && deliverydate.getYear() === dayM6.getYear()) {
          dayM6Cnt = dayM6Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayM6Amt = Number(dayM6Amt) + Number(orderDetails.totalAmount);
          }else {
            dayM6Amt = Number(dayM6Amt) +Number(orderDetails.discountedprize)
          }
          //dayM6Amt = Number(dayM6Amt) + Number(orderDetails.totalAmount);
        } else if (deliverydate.getDate() === dayM7.getDate() && deliverydate.getMonth() === dayM7.getMonth() && deliverydate.getYear() === dayM7.getYear()) {
          dayM7Cnt = dayM7Cnt + 1;
          if(orderDetails.discountedprize === '' || orderDetails.discountedprize === '0' || orderDetails.discountedprize === undefined || orderDetails.discountedprize === 'NaN')
          {
            dayM7Amt = Number(dayM7Amt) + Number(orderDetails.totalAmount);
          }else {
            dayM7Amt = Number(dayM7Amt) +Number(orderDetails.discountedprize)
          }
          //dayM7Amt = Number(dayM7Amt) + Number(orderDetails.totalAmount);
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

      deliveryChart(arrAmtDelivery, dateArrDelivery);
    });



}

function changeGraphType(type) {
  var chartType = document.getElementById('chartContainer');

  if (type === 2)
    chart1.options.data[0].type = 'column';
  if (type === 1)
    chart1.options.data[0].type = 'line';


  chart1.render();
}


function changeGraphType1(type) {
  var chartType = document.getElementById('chartContainer1');

  if (type === 2)
    chart2.options.data[0].type = 'column';
  if (type === 1)
    chart2.options.data[0].type = 'line';


  chart2.render();
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
      valueFormatString: "DD",
      interval: 1
      //intervalType: "day"
    },
    axisY: {
      includeZero: false

    },
    data: [{
      type: "column",

      dataPoints: datapoints
    }]
  });

  // chart1.canvas.parentNode.style.width = '100%';
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
      valueFormatString: "DD",
      interval: 1//,
      //intervalType: "month"
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

function showHideCard(card, cardArrow) {
  card.classList.toggle("active");

  cardArrow.classList.toggle("active");
}
