//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
const orderDateRange = searchParams.get('orderDateRange');

try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);

      populateOrderDetails();

    } else {
      console.log('User has been logged out');
      window.location.href = "index.html";
    }

  });
} catch (error) {

  console.log(error.message);
}
//window.location.href = "../index.html";


function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
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


function populateOrderDetails() {
  var i = 0;
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
    DBrows = db.collection('OrderDetails').where('orderBy', '==', userID).get();

    //DBrow = db.collection('OrderDetails').get();
  } else if (orderDateRange === 'today') {
  console.log('in today');
    DBrows = db.collection('OrderDetails')
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", toDate).get();

  } else if (orderDateRange === 'yesterday') {
    console.log(todayDate);
    console.log(toDate);

    todayDate.setDate(todayDate.getDate() - 1);

  //  toDate.setDate(toDate.getDate() + 1);
    console.log(todayDate);
    console.log(toDate);
    DBrows = db.collection('OrderDetails')
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", todayDate)
      .where("orderDate", "<=", toDate).get();
  } else if (orderDateRange === 'week') {
    refDate.setDate(refDate.getDate() - 7);
    DBrows = db.collection('OrderDetails')
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate).get();
  } else if (orderDateRange === 'month') {
    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    DBrows = db.collection('OrderDetails')
      .where('orderBy', '==', userID)
      .where("orderDate", ">=", refDate).get();
  }
  console.log('before log');
  //snapshot.then((changes) => {

  DBrows.then((changes) => {
    console.log("populatePayments: ");

    var i = 0;
    changes.forEach(change => {
      orderList = change.data();
      renderOrder(change.id, change.data(), i);
      i = i + 1;
    });
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
    document.getElementById('cartItemCount').innerHTML = itemCount;

  });

}

function renderPendingPaymentOrder(orderid, order, index) {
  console.log(order);
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Pending")
  div1.setAttribute("style", "padding: 5px;")

  var span1 = document.createElement("span");
  span1.innerHTML = "<br><br>";

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  //order.deliveryDate
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var oDate = new Date(order.deliveryDate.seconds * 1000);
  var orderDate = oDate.toLocaleDateString("en-US", options);

  var small1 = document.createElement("small");
  small1.setAttribute("class", "payment-pending");
  small1.innerHTML = "Delivery Date : "+ orderDate;

   oDate = new Date(order.orderDate.seconds * 1000);
   orderDate = oDate.toLocaleDateString("en-US", options);

  var small11= document.createElement("small");
  small11.setAttribute("class", "payment-pending");
  small11.innerHTML = "Order Date : "+ orderDate;


  var input1 = document.createElement("input");
  input1.setAttribute("type", "checkbox");
  input1.setAttribute("class", "checkbox");
  input1.setAttribute("name", "orderforPayment");
  input1.setAttribute("value", order.orderID);
  input1.setAttribute("id", "orderSelect" + index + 1);
  input1.checked = true

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);

  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);


  var h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;


  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");
  }
  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + "(" + order.discountDetails.discountValue + " Off)";
  }
  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.setAttribute("class", "payment-pending");
  div4h1.innerHTML = order.totalItems + " Items";

  var div4h2 = document.createElement("h5");
  div4h2.setAttribute("class", "payment-pending");
  div4h2.innerHTML = 'Payment Pending';

  div4.appendChild(div4h1);
  div4.appendChild(div4h2);

  anchor.appendChild(small1);
  div3.appendChild(anchor);

  div3.appendChild(small11);
  div3.appendChild(input1);
  div3.appendChild(hforderid);

  div2.appendChild(div3);
  div2.appendChild(h1);
  div2.appendChild(h11);

  div2.appendChild(h2);
  if (order.discountedprize > 0)

  {
    div2.appendChild(h21);
  }
  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}

function renderPendingOrder(orderid, order, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Pending");
  div1.setAttribute("style", "padding: 5px;")

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var oDate = new Date(order.deliveryDate.seconds * 1000);
  var orderDate = oDate.toLocaleDateString("en-US", options);

  var small1 = document.createElement("small");
  small1.setAttribute("class", "delivery-pending");
  small1.innerHTML = "Delivery Date : " + orderDate;


     oDate = new Date(order.orderDate.seconds * 1000);
     orderDate = oDate.toLocaleDateString("en-US", options);

    var small11= document.createElement("small");
    small11.setAttribute("class", "payment-pending");
    small11.innerHTML = "Order Date : "+ orderDate;


  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons delivery-pending");
  span1.innerHTML = 'schedule';

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);


  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);

  var h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;


  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + "(" + order.discountDetails.discountValue + " Off)";
  }

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.setAttribute("class", "delivery-pending");
  div4h1.innerHTML = order.totalItems + " Items";

  var div4h2 = document.createElement("h5");
  div4h2.setAttribute("class", "delivery-pending");
  div4h2.innerHTML = 'Delivery Pending';

  div4.appendChild(div4h1);
  div4.appendChild(div4h2);

  anchor.appendChild(small1);
  div3.appendChild(anchor);
  div3.appendChild(small11);

  div3.appendChild(span1);
  div3.appendChild(hforderid);

  div2.appendChild(div3);

  div2.appendChild(h1);
  div2.appendChild(h11);
  div2.appendChild(h2);

  if (order.discountedprize > 0)
    div2.appendChild(h21);
  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}

function renderDeliveredOrder(orderid, order, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Delivered");
  div1.setAttribute("style", "padding: 5px;");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");


  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var oDate = new Date(order.deliveryDate.seconds * 1000);
  var orderDate = oDate.toLocaleDateString("en-US", options);

  var small1 = document.createElement("small");
  small1.innerHTML = "Delivery Date : " + orderDate;


     oDate = new Date(order.orderDate.seconds * 1000);
     orderDate = oDate.toLocaleDateString("en-US", options);

    var small11= document.createElement("small");
    small11.setAttribute("class", "payment-pending");
    small11.innerHTML = "Order Date : "+ orderDate;


  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons");
  span1.innerHTML = 'task_alt';
  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);


  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);


  var h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;

  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + "(" + order.discountDetails.discountValue + " Off)";
  }

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.innerHTML = order.totalItems + " Items";

  var div4h2 = document.createElement("h5");
  div4h2.innerHTML = 'Delivered';

  div4.appendChild(div4h1);
  div4.appendChild(div4h2);

  anchor.appendChild(small1);
  div3.appendChild(anchor);
  div3.appendChild(small11);

  div3.appendChild(span1);
  div3.appendChild(hforderid);
  div2.appendChild(div3);

  div2.appendChild(h1);
  div2.appendChild(h11);
  div2.appendChild(h2);

  if (order.discountedprize > 0)
    div2.appendChild(h21);
  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}

function renderCancelledOrder(orderid, order, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 " + "Cancelled");
  div1.setAttribute("style", "padding: 5px;");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");


  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var oDate = new Date(order.deliveryDate.seconds * 1000);
  var orderDate = oDate.toLocaleDateString("en-US", options);

  var small1 = document.createElement("small");
  small1.setAttribute('class', "cancel");
  small1.innerHTML = "Delivery Date : " + orderDate;



     oDate = new Date(order.orderDate.seconds * 1000);
     orderDate = oDate.toLocaleDateString("en-US", options);

    var small11= document.createElement("small");
    small11.setAttribute("class", "payment-pending");
    small11.innerHTML = "Order Date : "+ orderDate;

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons cancel");
  span1.innerHTML = 'cancel';
  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);

  var h1 = document.createElement("h6");
  h1.innerHTML = "Order Serial Numbe : " + (index + 1);

  h11 = document.createElement("h6");
  h11.innerHTML = "Order Status : " + order.orderStatus;


  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + "(" + order.discountDetails.discountValue + " Off)";
  }

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.setAttribute('class', 'cancel');
  div4h1.innerHTML = order.totalItems + " Items";

  var div4h2 = document.createElement("h5");
  div4h2.setAttribute('class', 'cancel');
  div4h2.innerHTML = 'Cancelled';

  div4.appendChild(div4h1);
  div4.appendChild(div4h2);

  anchor.appendChild(small1);
  div3.appendChild(anchor);
  div3.appendChild(small11);
  div3.appendChild(span1);

  div3.appendChild(hforderid);

  div2.appendChild(div3);

  div2.appendChild(h1);
  div2.appendChild(h11);
  div2.appendChild(h2);
  if (order.discountedprize > 0)
    div2.appendChild(h21);

  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}
/////////////////////new function
function renderOrder(orderID, order, index) {
  //console.log(selectedItem);
  if (order.orderStatus === 'Pending' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(orderID, order, index);
  } else if (order.orderStatus === 'Pending' && order.paymentStatus === 'Completed') {
    renderPendingOrder(orderID,order, index);
  } else if (order.paymentStatus === 'Completed' && order.orderStatus === 'Delivered') {
    renderDeliveredOrder(orderID,order, index);
  } else if (order.orderStatus === 'Packed' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(orderID,order, index);
  } else if (order.orderStatus === 'Packed' && order.paymentStatus === 'Completed') {
    renderPendingOrder(orderID,order, index);
  } else if (order.orderStatus === 'On The Way' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(orderID,order, index);
  } else if (order.orderStatus === 'On The Way' && order.paymentStatus === 'Completed') {
    renderPendingOrder(orderID,order, index);
  } else if (order.orderStatus === 'Cancelled') {
    renderCancelledOrder(orderID,order, index);
  }


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
