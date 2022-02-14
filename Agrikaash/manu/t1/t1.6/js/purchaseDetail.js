//const productID = document.getElementById('productID');
var userID = "";
var orderDateRange = "";
try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      orderDateRange = localStorage.getItem("PurchaseFiler");

      userID = firebaseUser.uid;
      GetProfileData();
      populatePurchaseDetails();
      localStorage.setItem("PurchaseFiler", "");
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

function populatePurchaseDetails() {
  console.log("in populatePurchaseDetails");
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
  if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null || orderDateRange === 'null') {
    orderDateRange = "week";
  }
  //DBrow = db.collection('OrderDetails').get();
  if (orderDateRange === 'today') {
    var filter = document.getElementById("dateRange");
    filter.options[0].selected = true;
    DBrows = db.collection('PurchaseBook')
      //      .where('QuantityPurchased', '>', 0)
      .where("CreatedTimestamp", ">=", toDate)
      .orderBy("CreatedTimestamp","desc")
      .get();
    fromDate = 'Today';
    toDate = 'Today';

  } else if (orderDateRange === 'yesterday') {
    var filter = document.getElementById("dateRange");
    filter.options[1].selected = true;
    todayDate.setDate(todayDate.getDate() - 1);
    DBrows = db.collection('PurchaseBook')
      //    .where('QuantityPurchased', '>', 0)
      .where("CreatedTimestamp", ">=", todayDate)
      .where("CreatedTimestamp", "<=", toDate)
      .orderBy("CreatedTimestamp","desc")
      .get();
    fromDate = todayDate;
    toDate = todayDate;

  } else if (orderDateRange === 'week') {
    var filter = document.getElementById("dateRange");
    filter.options[2].selected = true;
    refDate.setDate(refDate.getDate() - 7);
    DBrows = db.collection('PurchaseBook')
      //  .where('QuantityPurchased', '>', 0)
      .where("CreatedTimestamp", ">=", refDate)
      .orderBy("CreatedTimestamp","desc")
      .get();
    fromDate = refDate;
    toDate = 'Today';
  } else if (orderDateRange === 'month') {
    var filter = document.getElementById("dateRange");
    filter.options[3].selected = true;
    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    DBrows = db.collection('PurchaseBook')
      //    .where('QuantityPurchased', '>', 0)
      .where("CreatedTimestamp", ">=", refDate)
      .orderBy("CreatedTimestamp","desc")
      .get();
    fromDate = refDate;
    toDate = 'Today';
  } else if (orderDateRange === 'sixmonth') {
    var filter = document.getElementById("dateRange");
    filter.options[4].selected = true;
    refDate = refDate.setMonth(refDate.getMonth() - 6);
    refDate = new Date(refDate);
    DBrows = db.collection('PurchaseBook')
      //    .where('QuantityPurchased', '>', 0)
      .where("CreatedTimestamp", ">=", refDate)
      .orderBy("CreatedTimestamp","desc")
      .get();
    fromDate = refDate;
    toDate = 'Today';
  }


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if (fromDate === 'Today') {
    document.getElementById('dateRangelbl').innerHTML = "Purchase for Today";
  } else if (fromDate === toDate) {
    var displayDate = fromDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML = "Purchased on  :" + displayDate;
  } else if (toDate === 'Today') {
    var fDate = new Date(fromDate);
    var displayDate = fDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML = displayDate + " till Today";
  }

  DBrows.then((changes) => {

    var i = 0;
    document.getElementById("purchaseRow").innerHTML = "";

    changes.forEach(async change => {
      orderList = change.data();
      if (change.data().QuantityPurchased > 0) {
        const doc1 = await db.collection('Products').doc(change.data().ProductId).get();
        if (doc1.exists) {

          renderPurchaseBook(change.data(), doc1.data().ProductName, i);
          i = i + 1;

        }

      }
      document.getElementById("itemCnt").innerHTML = i + " Items";

    });

    document.getElementById("itemCnt").innerHTML = i + " Items";
    document.getElementById('loading').style.display = 'none';
  });


}

function renderPurchaseBook( purchaseDetails,productName, index) {
  // console.log(ordSummary);
  // console.log(index);
  var div0 = document.createElement("div");
  div0.setAttribute('class', 'col-sm-12');
  div0.setAttribute('style', 'padding: 5px;');

  var div1 = document.createElement("div");
  div1.setAttribute("class", "dashboard-card active");
  div1.setAttribute("style", "height: 100%;");

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
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var pDate = new Date(purchaseDetails.CreatedTimestamp.seconds * 1000);

   var small1 = document.createElement("small");
  small1.innerHTML = productName;

  div4.appendChild(small1);
  div3.appendChild(div4);

  var p1 = document.createElement("p");
  p1.setAttribute("class", "small-text dashboard-sub-heading");
  p1.innerHTML = "Puchase date: " + pDate.toLocaleDateString("en-US", options);;

  div3.appendChild(p1);

  div2.appendChild(div3);

  div1.appendChild(div2);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "dashboard-card-expand");

  var br1 = document.createElement("br");
  div6.appendChild(br1);

  var div7 = document.createElement("div");
  div7.setAttribute("class", "dashboard-card-order");

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");

  var h51 = document.createElement("h5");
  h51.setAttribute("class", "small-text");
  h51.setAttribute("style", "margin: 0 auto;");
  h51.innerHTML = "Unit Prize";
  div8.appendChild(h51);

  var small1 = document.createElement("small");
  small1.innerHTML = purchaseDetails.UnitPrize.toLocaleString('en-IN', curFormat) +" Per " + purchaseDetails.Unit ;

  div8.appendChild(small1);

  div7.appendChild(div8);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "");

  var h52 = document.createElement("h5");
  h52.setAttribute("class", "small-text");
  h52.setAttribute("style", "margin: 0 auto;");
  h52.innerHTML = "Quantity";
  div9.appendChild(h52);

  var small2 = document.createElement("small");
  small2.innerHTML =  purchaseDetails.QuantityPurchased + " " +  purchaseDetails.Unit;

  div9.appendChild(small2);

  div7.appendChild(div9);
  div6.appendChild(div7);
  div1.appendChild(div6);
  div0.appendChild(div1);
  document.getElementById("purchaseRow").appendChild(div0);

}

function dateRangeChange() {
  var dateRange = document.getElementById('dateRange');
  var value = dateRange.options[dateRange.selectedIndex].value;
  if (value === 'Today') {
    // localStorage.setItem("PurchaseFiler", "today");
    orderDateRange = "today";
    populatePurchaseDetails();
  } else if (value === 'Yesterday') {
    // localStorage.setItem("PurchaseFiler", "yesterday");
    orderDateRange = "yesterday";
    populatePurchaseDetails();
  } else if (value === 'Last 7 days') {
    orderDateRange = "week";
    // localStorage.setItem("PurchaseFiler", "week");
    populatePurchaseDetails();
  } else if (value === 'Current month') {
    orderDateRange = "month";
    // localStorage.setItem("PurchaseFiler", "month");
    populatePurchaseDetails();
  } else if (value === 'Last 6 months') {
    orderDateRange = "sixmonth";
    // localStorage.setItem("PurchaseFiler", "sixmonth");
    populatePurchaseDetails();
  }
}
