//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(userID);
      GetProfileData();

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


function GetProfileData() {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(userID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        //userID = doc.data().uid;
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

  // const snapshot = db.collection('OrderDetails').doc(userID);



  const snapshot = db.collection('OrderDetails').get();
  snapshot.then((changes) => {
    changes.forEach(change => {
      orderList = change.data().OrderDetails;
      //orderList.sort()
      //console.log(change.doc, index, selectdedItem);
      var name = change.data().CreatedBy;
      console.log(name);
      for (i = 0; i < orderList.length; i++) {
        renderOrder(orderList[i], i, name);
      }
    });
  });
  document.getElementById('loading').style.display = 'none';


}


function renderPendingPaymentOrder(order, index, createdBy) {
  console.log('createdBy', createdBy);
  var dt = new Date(order.orderDate);
  var dt1 = new Date(order.deliveryDate);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var span1 = document.createElement("span");
  span1.innerHTML = "<br><br>";

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID);

  var small1 = document.createElement("small");
  small1.setAttribute("class", "payment-pending");
  small1.innerHTML = "Delivery Date: " + dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();

  var small11 = document.createElement("small");
  small11.setAttribute("class", "payment-pending");
  small11.innerHTML = "<br>Order Date: " + dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;

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
  h1.innerHTML = "order Serial Numbe : " + index;

  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;

  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : Rs " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : Rs " + order.discountedprize;
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
  anchor.appendChild(small11);

  div3.appendChild(anchor);
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

function renderPendingOrder(order, index, createdBy) {
  var dt = new Date(order.orderDate);
  var dt1 = new Date(order.deliveryDate);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID);

  var small1 = document.createElement("small");
  small1.setAttribute("class", "delivery-pending");
  small1.innerHTML = "Delivery Date: " + dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();;


  var small11 = document.createElement("small");
  small11.setAttribute("class", "payment-pending");
  small11.innerHTML = "<br>Order Date: " + dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons delivery-pending");
  span1.innerHTML = 'schedule';

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);


  var h1 = document.createElement("h6");
  h1.innerHTML = "order Serial Numbe : " + index + 1;

  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;



  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : Rs " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : Rs " + order.discountedprize;
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
  anchor.appendChild(small11);
  div3.appendChild(anchor);

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

function renderDeliveredOrder(order, index, createdBy) {
  var dt = new Date(order.orderDate);
  var dt1 = new Date(order.deliveryDate);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");


  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID);

  var small1 = document.createElement("small");
  small1.innerHTML = "Delivery Date: " + dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();;



  var small11 = document.createElement("small");
  small11.innerHTML = "<br>Order Date: " + dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons");
  span1.innerHTML = 'task_alt';
  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);


  var h1 = document.createElement("h6");
  h1.innerHTML = "order Serial Numbe : " + index + 1;


  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;
  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : Rs " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : Rs " + order.discountedprize;
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
  anchor.appendChild(small11);
  div3.appendChild(anchor);

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

function renderCancelledOrder(order, index, createdBy) {
  var dt = new Date(order.orderDate);
  var dt1 = new Date(order.deliveryDate);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");


  var anchor = document.createElement("a");
  anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID);

  var small1 = document.createElement("small");
  small1.setAttribute('class', "cancel");
  small1.innerHTML = "Delivery Date: " + dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();

  var small11 = document.createElement("small");
  small11.setAttribute("class", "cancel");
  small11.innerHTML = "<br>Order Date: " + dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;


  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons cancel");
  span1.innerHTML = 'cancel';
  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);

  var h1 = document.createElement("h6");
  h1.innerHTML = "order Serial Numbe : " + index + 1;


  var h11 = document.createElement("h6");
  h11.innerHTML = "Order By : " + createdBy;

  var h2 = document.createElement("h6");
  if (order.discountedprize > 0) {
    h2.setAttribute("style", "padding:0;text-decoration:line-through;");
  } else {
    h2.setAttribute("style", "padding:0;");

  }
  h2.innerHTML = "TotalAmount : Rs " + order.totalAmount;


  if (order.discountedprize > 0) {
    var h21 = document.createElement("h6");
    h21.setAttribute("style", "padding:0;");
    h21.innerHTML = "Discounted Amount : Rs " + order.discountedprize;
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
  anchor.appendChild(small11);
  div3.appendChild(anchor);
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
function renderOrder(order, index, createdBy) {
  //console.log(selectedItem);
  console.log(order);
  if (order.orderStatus === 'Pending' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(order, index, createdBy);
  } else if (order.orderStatus === 'Pending' && order.paymentStatus === 'Completed') {
    renderPendingOrder(order, index, createdBy);
  } else if (order.paymentStatus === 'Completed' && order.orderStatus === 'Delivered') {
    renderDeliveredOrder(order, index, createdBy);
  } else if (order.orderStatus === 'Cancelled') {
    renderCancelledOrder(order, index, createdBy);

  }

}
