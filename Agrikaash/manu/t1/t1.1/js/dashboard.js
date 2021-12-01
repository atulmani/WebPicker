//const productID = document.getElementById('productID');
var userID = "";
var addressList = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);
      PopulateTodaysOrder();
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

function PopulateTodaysOrder() {
  console.log('in PopulateTodaysOrder');
  var todayDate = new Date();

  var yesterdayDate = new Date();
  yesterdayDate.setDate(todayDate.getDate() - 1);

  var lastweek = new Date();
  lastweek.setDate(todayDate.getDate() - 7);

  var todayCnt = 0;
  var yesterdayCnt = 0;
  var weekCnt = 0;
  var monthCnt = 0;

  var todayAmount = 0;
  var yesterdayAmount = 0;
  var weekAmount = 0;
  var monthAmount = 0;

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
          }else if (orderdate.getDate() === yesterdayDate.getDate() && orderdate.getMonth() === yesterdayDate.getMonth() && orderdate.getYear() === yesterdayDate.getYear()) {

            yesterdayCnt = yesterdayCnt + 1;
            yesterdayAmount = Number(yesterdayAmount) + Number(orderDetails[i].totalAmount);
          }
          if(orderdate >= lastweek)
          {
            weekCnt = weekCnt + 1;
            weekAmount = Number(weekAmount) + Number(orderDetails[i].totalAmount);
          }
          if (orderdate.getMonth() === todayDate.getMonth() && orderdate.getYear() === todayDate.getYear())
          {

            monthCnt = monthCnt + 1;
            monthAmount = Number(monthAmount) + Number(orderDetails[i].totalAmount);

          }

        }
        // console.log('todayCnt', todayCnt);

        document.getElementById('todayCount').innerHTML = todayCnt;
        document.getElementById('todayAmount').innerHTML = todayAmount;

        document.getElementById('yesterdayCount').innerHTML = yesterdayCnt;
        document.getElementById('yesterdayAmount').innerHTML = yesterdayAmount;

        document.getElementById('WeekCount').innerHTML = weekCnt;
        document.getElementById('WeekAmount').innerHTML = weekAmount;

        document.getElementById('monthCount').innerHTML = monthCnt;
        document.getElementById('monthAmount').innerHTML = monthAmount;

        // console.log('yesterdayCnt', yesterdayCnt);



      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });
}
