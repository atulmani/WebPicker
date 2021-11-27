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


}

/////////////////////new function
function renderOrder(order, index) {
  //console.log(selectedItem);
  console.log(order);
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

  //if payment pending add checkbox, if deliveryPending, Delivered
  if (order.paymentStatus === 'Pending' && order.orderStatus === 'Pending') {
    var input1 = document.createElement("input");
    input1.setAttribute("type", "checkbox");
    input1.setAttribute("class", "checkbox");
    input1.setAttribute("name", "orderforPayment");
    input1.setAttribute("value", order.orderID);
    input1.setAttribute("id", "orderSelect" + index);
    input1.checked = true

    div3.appendChild(input1);
  } else if (order.paymentStatus === 'Success' && order.orderStatus === 'Pending') {
    var span31 = document.createElement("span");
    span31.setAttribute("class", "material-icons delivery-pending");
    span31.innerHTML = "schedule";
    div3.appendChild(span31);
  } else if (order.orderStatus === 'Delivered') {

    var span32 = document.createElement("span");
    span32.setAttribute("class", "material-icons");
    span32.innerHTML = "task_alt";
    div3.appendChild(span32);
  }

  var h1 = document.createElement("h6");
  h1.innerHTML = order.orderID;

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
  if (order.paymentStatus === 'Pending' && order.orderStatus === 'Pending') {
    //<input type="checkbox" class="checkbox" checked name="" value="">
    div4h2.innerHTML = 'Payment Pending';

  } else if (order.paymentStatus === 'Success' && order.orderStatus === 'Pending') {
    div4h2.innerHTML = 'Delivery Pending';

  } else if (order.orderStatus === 'Delivered') {
    div4h2.innerHTML = 'Delivered';

  }

  div4.appendChild(div4h1);
  div4.appendChild(div4h2);

  div2.appendChild(h1);
  div2.appendChild(h2);
  div2.appendChild(div4);
  div3.appendChild(small1);

  div2.appendChild(div3);


  div1.appendChild(div2);
  div1.appendChild(span1);
  console.log(div1);
  document.getElementById("orderList").appendChild(div1);

}
