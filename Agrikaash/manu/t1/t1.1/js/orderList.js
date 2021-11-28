//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;

      GetProfileData(firebaseUser);

      populateOrderDetails();

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
    .catch((error) => {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};


function populateOrderDetails() {

  const snapshot = db.collection('OrderDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      orderList = doc.data().OrderDetails;
      //console.log(change.doc, index, selectdedItem);
      for (i = 0; i < orderList.length; i++) {
        renderOrder(orderList[i], i);
      }
    }
  });
  populateCartData();

}

function populateCartData()
{
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
function renderPendingPaymentOrder(order, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var span1 = document.createElement("span");
  span1.innerHTML = "<br><br>";

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var small1 = document.createElement("small");
  small1.setAttribute("class", "payment-pending");
  small1.innerHTML = order.deliveryDate;

  var input1 = document.createElement("input");
  input1.setAttribute("type", "checkbox");
  input1.setAttribute("class", "checkbox");
  input1.setAttribute("name", "orderforPayment");
  input1.setAttribute("value", order.orderID);
  input1.setAttribute("id", "orderSelect" + index + 1);
  input1.checked = true

  var h1 = document.createElement("h6");
  h1.innerHTML = "order Serial Numbe : " + index;

  var h2 = document.createElement("h6");
  h2.setAttribute("style", "padding:0;");
  h2.innerHTML = "Rs " + order.totalAmount;

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


  div3.appendChild(small1);
  div3.appendChild(input1);

  div2.appendChild(div3);
  div2.appendChild(h1);
  div2.appendChild(h2);
  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}
function renderPendingOrder(order, index)
{
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var small1 = document.createElement("small");
  small1.setAttribute("class", "delivery-pending");
  small1.innerHTML = order.deliveryDate;

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons delivery-pending");
  span1.innerHTML = 'schedule';


  var h1 = document.createElement("h6");
  h1.innerHTML = "order Serial Numbe : " + index + 1;

  var h2 = document.createElement("h6");
  h2.setAttribute("style", "padding:0;");
  h2.innerHTML = "Rs " + order.totalAmount;

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


  div3.appendChild(small1);
  div3.appendChild(span1);

  div2.appendChild(div3);

  div2.appendChild(h1);
  div2.appendChild(h2);
  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}
function renderDeliveredOrder(order, index)
{
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var small1 = document.createElement("small");
  small1.innerHTML = order.deliveryDate;

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons");
  span1.innerHTML = 'task_alt';


  var h1 = document.createElement("h6");
  h1.innerHTML = "order Serial Numbe : " + index + 1;

  var h2 = document.createElement("h6");
  h2.setAttribute("style", "padding:0;");
  h2.innerHTML = "Rs " + order.totalAmount;

  var div4 = document.createElement("div");
  div4.setAttribute("class", "order-details");

  var div4h1 = document.createElement("h5");
  div4h1.innerHTML = order.totalItems + " Items";

  var div4h2 = document.createElement("h5");
  div4h2.innerHTML = 'Delivered';

  div4.appendChild(div4h1);
  div4.appendChild(div4h2);


  div3.appendChild(small1);
  div3.appendChild(span1);

  div2.appendChild(div3);

  div2.appendChild(h1);
  div2.appendChild(h2);
  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}
function renderCancelledOrder(order, index)
{
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12")
  div1.setAttribute("style", "padding: 5px;")

  var div2 = document.createElement("div");
  div2.setAttribute("class", "orders-list-div");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "");

  var small1 = document.createElement("small");
  small1.setAttribute('class', "cancel");
  small1.innerHTML = order.deliveryDate;

  var span1 = document.createElement('span');
  span1.setAttribute('class', "material-icons cancel");
  span1.innerHTML = 'cancel';

  var h1 = document.createElement("h6");
  h1.innerHTML = "order Serial Numbe : " + index + 1;

  var h2 = document.createElement("h6");
  h2.setAttribute("style", "padding:0;");
  h2.innerHTML = "Rs " + order.totalAmount;

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


  div3.appendChild(small1);
  div3.appendChild(span1);

  div2.appendChild(div3);

  div2.appendChild(h1);
  div2.appendChild(h2);
  div2.appendChild(div4);
  div1.appendChild(div2);
  document.getElementById("orderList").appendChild(div1);

}
/////////////////////new function
function renderOrder(order, index) {
  //console.log(selectedItem);
  console.log(order);
  if (order.orderStatus === 'Pending' && order.paymentStatus === 'Pending') {
    renderPendingPaymentOrder(order, index);
  } else if (order.orderStatus === 'Pending' && order.paymentStatus === 'Completed') {
    renderPendingOrder(order, index);
  } else if (order.paymentStatus === 'Completed' && order.orderStatus === 'Delivered') {
    renderDeliveredOrder(order, index);
  } else if (order.orderStatus === 'Cancelled') {
    renderCancelledOrder(order, index);

  }

}
