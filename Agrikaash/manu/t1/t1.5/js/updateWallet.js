//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
var orderSummary = [];
var walletAmount = 0;
var WalletDetails = [];

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
      if (orderDateRange === "" || orderDateRange == undefined)
        orderDateRange = "week";
      GetProfileData();
      GetUserList();
      //  populateOrderDetails('Pending');

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
      var userRole = change.data().UserRole;
      if (userRole.findIndex(e => e.Text === 'Admin') === -1) {
        var name = change.data().CreatedBy;
        var strText = change.data().displayName + ":" + change.data().EmailID;
        var strValue = change.id;

        var option = document.createElement("option");
        option.setAttribute("value", strValue);
        option.innerHTML = strText;

        document.getElementById("userList").appendChild(option);
      }
    });
    document.getElementById('loading').style.display = 'none';
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

function amountChange() {
  //console.log('amountChange');
  var btnAdd = document.getElementById("btnAdd");
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  var amountDislay = document.getElementById("AddwalletAmount").value;
  amountDislay = Number(amountDislay).toLocaleString('en-IN', curFormat);
  btnAdd.innerHTML = amountDislay
}

function addAmount(amt) {
  //console.log(amt);
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  //document.getElementById("AddwalletAmount").focus();

  var amountDislay = document.getElementById("AddwalletAmount").value;
  amountDislay = Number(amountDislay) + Number(amt);
  document.getElementById("AddwalletAmount").value = amountDislay;
  amountDislay = Number(amountDislay).toLocaleString('en-IN', curFormat);
  btnAdd.innerHTML = amountDislay

}

function SaveWallet() {
  console.log('SaveWallet()');

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  var amountDislay = document.getElementById("AddwalletAmount").value;

  amountDislay = amountDislay.replace(/[₹,]+/g, "");
  console.log(amountDislay);
  console.log(walletAmount);
  var userlist = document.getElementById("userList");
  selectedUser = userlist.options[userlist.selectedIndex].value;
  WalletDetails.push({
    Date: firebase.firestore.Timestamp.fromDate(new Date()),
    WalletAmount: Number(amountDislay),
    WalletType: 'Add',
    orderID: 'Wallet Add by Admin'
  });

  db.collection("UserWallet").doc(selectedUser).set({
      UpdatedByUser: userID,
      UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      WalletAmount: Number(walletAmount) + Number(amountDislay),
      WalletDetails: WalletDetails
    })
    .then((docRef) => {
      walletAmount = Number(walletAmount) + Number(amountDislay);
      console.log("Data added sucessfully in the document: ");
      document.getElementById("walletAmount").innerHTML = Number(walletAmount).toLocaleString('en-IN', curFormat);
      document.getElementById("AddwalletAmount").value = "0";

    })
    .catch((error) => {
      console.error("error adding document:", error);
    });
    userListChange();

}

function showUpdateWallet() {
  var updateWalletFullDiv = document.getElementById('updateWalletFullDiv');
  var updateWalletArrow = document.getElementById('updateWalletArrow');

  updateWalletFullDiv.classList.toggle('updateWalletFullDivHide');
  updateWalletArrow.classList.toggle('active');
  if( updateWalletArrow.classList.contains('active'))
    document.getElementById("AddwalletAmount").focus();

}

function userListChange() {

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var userlist = document.getElementById("userList");
  document.getElementById("WalletDetailsDt").innerHTML="";
  var selectedUser = userlist.options[userlist.selectedIndex].value;
  console.log(selectedUser);
  if (selectedUser != '0') {
    //getWalletDetails(selectedUser);

    const snapshot = db.collection('UserWallet').doc(selectedUser);
    snapshot.get().then(async (doc) => {
        if (doc.exists) {
          // document.getElementById('walletAmount').innerHTML = doc.data().WalletAmount;
          document.getElementById('walletAmount').innerHTML = Number(doc.data().WalletAmount).toLocaleString('en-IN', curFormat);
          walletAmount = doc.data().WalletAmount;
          WalletDetails = doc.data().WalletDetails;
        } else {
          walletAmount = 0;
          WalletDetails = [];

          document.getElementById('walletAmount').innerHTML = '0';
        }

        //get WalletDetails start

        var options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };

        var walletDetails = [];
        const snapshot = db.collection('UserWallet').doc(selectedUser);
        snapshot.get().then((doc) => {
          if (doc.exists) {
            walletDetails = doc.data().WalletDetails;
            //console.log(walletDetails);
            var oldDate = '';
            var newDate = '';
            var cnt = 0;
            var closingBalance = walletAmount;
            console.log(walletDetails.length);
            for (intcnt = walletDetails.length - 1; intcnt >= 0; intcnt--) {
              var dt = new Date(walletDetails[intcnt].Date.seconds * 1000);
              dt = dt.toLocaleDateString("en-US", options);
              if(oldDate != dt )
              {
                cnt = cnt + 1
              }
              renderWallet(walletDetails[intcnt], cnt, oldDate, dt, closingBalance);
              if ((walletDetails[intcnt].WalletType === 'Add' && Number(walletDetails[intcnt].WalletAmount) > 0) || (walletDetails[intcnt].WalletType === 'Delete' && Number(walletDetails[intcnt].WalletAmount) < 0)) {
                if (intcnt === walletDetails.length - 1) {
                  closingBalance = Number(walletAmount) - Math.abs(walletDetails[intcnt].WalletAmount);
                } else {
                  closingBalance = Number(closingBalance) - Math.abs(walletDetails[intcnt].WalletAmount);
                }

              } else {

                if (intcnt === walletDetails.length - 1) {
                  closingBalance = Number(walletAmount) + Math.abs(walletDetails[intcnt].WalletAmount);
                } else {
                  closingBalance = Number(closingBalance) + Math.abs(walletDetails[intcnt].WalletAmount);
                }
              }
              oldDate = dt;
            }

          }
        });

        //get Pending order Details
        var DBrows = db.collection('OrderDetails')
          .where('paymentStatus', '==', 'Pending')
          .where("orderBy", "==", selectedUser)
          .get();

        DBrows.then((changes) => {

          //          document.getElementById("orderListDiv").innerHTML = "";
          orderSummary = [];
          var i = 0;

          document.getElementById("orderDetailDiv").innerHTML = "";
          var noFlag = true;
          changes.forEach(change => {
            noFlag = false;
            console.log("in first loop");
            // var options = {
            //   year: 'numeric',
            //   month: 'short',
            //   day: 'numeric'
            // };
            //
            renderOrder(change.data(), change.id, i);
            i = i + 1;
          });
          if(i === 0)
          {
            document.getElementById("orderDetailDiv").innerHTML = "No Order with Payment Status as Pending";
            document.getElementById("btnSaveOrder").setAttribute("disabled","true");
          }
          else {
            document.getElementById("btnSaveOrder").removeAttribute("disabled");
          }
          document.getElementById("orderCnt").value = i;

        });
        document.getElementById("walletDiv").style.display = "block";
        document.getElementById("AddWalletDiv").style.display = "block";
        document.getElementById("AddwalletAmount").focus();
        document.getElementById("orderDetails").style.display = "block";

      })
      .catch(function(error) {
        // An error occurred
        console.log(error.message);
        // document.getElementById('errorMessage_Signup').innerHTML = error.message;
        // document.getElementById('errorMessage_Signup').style.display = 'block';
      });


  }
}

function renderWallet(walletDetails, intcnt, oldDate, newDate, closingBalance) {
  var div0  ;
  if (oldDate != newDate) {
    div0 = document.createElement("div");
    div0.setAttribute("id","divmaster" + intcnt);
    div0.setAttribute("class","wallet-transactions");
    var h5 = document.createElement("h5");
    h5.innerHTML = newDate;
    div0.appendChild(h5);
    //document.getElementById("WalletDetailsDt").appendChild(h5);
  }
  else {
    div0 = document.getElementById("divmaster" + intcnt);
  }
  //console.log(div0);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "wallet-transactions-card");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "");
  div2.setAttribute("style", "width: 15%;");

  var img1 = document.createElement("img");
  img1.setAttribute("width", "100%");
  img1.setAttribute("alt", "");
  if ((walletDetails.WalletType === 'Add' && Number(walletDetails.WalletAmount) > 0) || (walletDetails.WalletType === 'Delete' && Number(walletDetails.WalletAmount) < 0)) {
    img1.setAttribute("src", "../img/discount2.png")
  } else {

    img1.setAttribute("src", "../img/discount1.jpg")
  }
  div2.appendChild(img1);
  div1.appendChild(div2);

  var div3 = document.createElement("div");
  div3.setAttribute("class", "details");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");

  var span1 = document.createElement("span");
  if ((walletDetails.WalletType === 'Add' && Number(walletDetails.WalletAmount) > 0) || (walletDetails.WalletType === 'Delete' && Number(walletDetails.WalletAmount) < 0)) {
    span1.innerHTML = "Added to wallet";
  } else {
    span1.innerHTML = "Deleted from wallet";

  }

  div4.appendChild(span1);
  var br = document.createElement("br");
  div4.appendChild(br);

  var small1 = document.createElement("small");
  //console.log(walletDetails.Date);
  var timedisplay = new Date(walletDetails.Date.seconds * 1000);
  timedisplay = timedisplay.toLocaleTimeString('en-US');
  small1.innerHTML = timedisplay;
  div4.appendChild(small1);

  div3.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "");


  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var span2 = document.createElement("span");
  if ((walletDetails.WalletType === 'Add' && Number(walletDetails.WalletAmount) > 0) || (walletDetails.WalletType === 'Delete' && Number(walletDetails.WalletAmount) < 0)) {
    span2.setAttribute("style", "font-size: 1rem;color: green;");
    span2.innerHTML = "+" + Number(Math.abs(walletDetails.WalletAmount)).toLocaleString('en-IN', curFormat);
  } else {
    span2.setAttribute("style", "font-size: 1rem;color: #ff5757;");
    span2.innerHTML = "-" + Number(Math.abs(walletDetails.WalletAmount)).toLocaleString('en-IN', curFormat);
  }
  div5.appendChild(span2);

  var br2 = document.createElement("br");
  div5.appendChild(br2);

  var small2 = document.createElement("small");
  small2.innerHTML = "Closing Balance : " + Number(closingBalance).toLocaleString('en-IN', curFormat);

  div5.appendChild(small2);
  div3.appendChild(div5);
  div1.appendChild(div3);
  div0.appendChild(div1);
  if (oldDate === newDate) {
  //  var div0 = document.createElement("div");
  //  div0.setAttribute("id","divmaster" + intcnt);
  //  div0.setAttribute("class","wallet-transactions");
}
else {

  document.getElementById("WalletDetailsDt").appendChild(div0);

}


}

function renderOrder(orderDetails, orderID, index) {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var oorderdate = new Date(orderDetails.orderDate.seconds * 1000);
  oorderdate = oorderdate.toLocaleDateString("en-US", options);


  var odeliverydate = new Date(orderDetails.deliveryDate.seconds * 1000);
  odeliverydate = odeliverydate.toLocaleDateString("en-US", options);
  //
  // console.log(orderDetails);
  // console.log(orderID);
  // console.log(index);
  /*
  <div class="payment-details-div" style="display:none">
    <div class="">
      <h5 class="small-text" style="margin: 0 auto;">Spencer</h5>
      <small style="color: #666; font-weight: bold; margin: 0 auto;">Date: 23 Jun, 2022</small>
    </div>
    <div class="" style="text-align: right;">
      <h5 class="small-text" style="margin: 0 auto;">₹ 5,00,58,47,095.00</h5>
      <small style="color: #666; font-weight: bold; margin: 0 auto;">Discount: ₹ 20</small>
    </div>
  </div><br>
  */

  var div1 = document.createElement("div");
  div1.setAttribute("class", "payment-details-div");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "");

  var h1 = document.createElement("h5");
  h1.setAttribute("class", "small-text");
  h1.setAttribute("style", "margin: 0 auto;");
  h1.innerHTML = oorderdate;

  div2.appendChild(h1);
  div1.appendChild(div2);

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var h2 = document.createElement("h5");
  h2.setAttribute("class", "small-text");
  h2.setAttribute("style", "margin: 0 auto;");
  h2.innerHTML = odeliverydate;

  div3.appendChild(h2);
  div1.appendChild(div3);


  var div4 = document.createElement("div");
  div4.setAttribute("class", "");

  var h3 = document.createElement("h5");
  h3.setAttribute("class", "small-text");
  h3.setAttribute("style", "margin: 0 auto;");
  h3.innerHTML = orderDetails.discountedprize;

  div4.appendChild(h3);
  div1.appendChild(div4);


  var div5 = document.createElement("div");
  div5.setAttribute("class", "");

  var h4 = document.createElement("input");
  h4.setAttribute("type", "checkbox");
  h4.setAttribute("id", "cb" + index);
  h4.setAttribute("onclick", "addValue( cb" + index + ",hf" + index + ",hfAmount" + index + ")");
  div5.appendChild(h4);


  var hf4 = document.createElement("input");
  hf4.setAttribute("type", "hidden");
  hf4.setAttribute("id", "hf" + index);
  hf4.setAttribute("value", orderID);


  div5.appendChild(hf4);


  var hf5 = document.createElement("input");
  hf5.setAttribute("type", "hidden");
  hf5.setAttribute("id", "hfAmount" + index);
  hf5.setAttribute("value", orderDetails.discountedprize);


  div5.appendChild(hf5);

  div1.appendChild(div5);

  document.getElementById("orderDetailDiv").appendChild(div1);

}

function addValue(checkB, hfID, hfAmount) {
  console.log(checkB);
  console.log(hfID);
  console.log(hfAmount);
  console.log(checkB.checked);
  var amt = document.getElementById("SelectedAmount").innerHTML;
  console.log(amt);
  if (checkB.checked === true) {
    var total = Number(amt) + Number(hfAmount.value);
    var walletAmt = document.getElementById("walletAmount").innerHTML;
    walletAmt = walletAmt.replace(/[₹,]+/g, "");
    if (Number(walletAmt) >= Number(total)) {
      document.getElementById("SelectedAmount").innerHTML = Number(amt) + Number(hfAmount.value);
      document.getElementById("message").style.display = "none";
    } else {
      checkB.checked = false;
      document.getElementById("message").style.display = "block";

      // Hide alert after 4 seconds
      setTimeout(function() {
        document.getElementById("message").style.display = 'none';
      }, 4000);
    }
    console.log("1", hfAmount.value);
  } else {
    document.getElementById("SelectedAmount").innerHTML = Number(amt) - Number(hfAmount.value);
    console.log("2", hfAmount.value);

  }


}

function UpdateOrder() {
  var amt = 0;
  console.log("in UpdateOrder");
  var cnt = Number(document.getElementById("orderCnt").value);
  for (index = 0; index < cnt; index++) {
    var flag = document.getElementById("cb" + index).checked;
    if (flag === true) {
      amt = Number(amt) + Number(document.getElementById("hfAmount" + index).value);

      var orderid = document.getElementById("hf" + index).value;
      db.collection('OrderDetails').doc(orderid).update({
          paymentStatus: 'Completed',
          UpdatedBy: userID,
          UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then((docRef) => {
          console.log("Data added sucessfully in the document: ");
          console.log("eventstart")
          //update Wallet


          var userlist = document.getElementById("userList");
          selectedUser = userlist.options[userlist.selectedIndex].value;
          WalletDetails.push({
            Date: firebase.firestore.Timestamp.fromDate(new Date()),
            WalletAmount: Number(amt),
            WalletType: 'Delete',
            orderID: 'Wallet amount : (' + amt + ') adjusted for order by Admin'
          });

          db.collection("UserWallet").doc(selectedUser).set({
              UpdatedByUser: userID,
              UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
              WalletAmount: Number(walletAmount) - Number(amt),
              WalletDetails: WalletDetails
            })
            .then((docRef) => {
              console.log("Data added sucessfully in the document: ");
              document.getElementById("walletAmount").innerHTML = Number(walletAmount) + Number(document.getElementById("AddwalletAmount").value);
              document.getElementById("AddwalletAmount").value = "0";
              userListChange();

            })
            .catch((error) => {
              console.error("error adding document:", error);
            });

          // console.log(Date.parse(eventstart))
        })
        .catch((error) => {
          console.error("error adding document:", error);
        });
    }
  }

}
