//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
const orderID = searchParams.get('id');
// var userid = searchParams.get('usertid');

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(orderID);
      console.log(userID);
      //GetProfileData(firebaseUser);

      getOrderDetails();
      document.getElementById('loading-img').style.display = 'none';
    } else {
      console.log('User has been logged out');
      //window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "index.html";
  }
  // document.getElementById('loading-img').style.display = 'none';
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('Users').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('displayName').innerHTML = doc.data().displayName;

      }
    })
    .catch(function(error)  {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function getOrderDetails() {
  console.log(userID);
  const snapshot = db.collection('OrderDetails').doc(userID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        //console.log('Document ref id: ' + doc.data().uid);
        var orderDetails = doc.data().OrderDetails;
        console.log(orderDetails);
        var selectedOrderIndex = orderDetails.findIndex(e => e.orderID === orderID);
        console.log(selectedOrderIndex);
        var selectedOrder;
        if (selectedOrderIndex >= 0) {
          selectedOrder = orderDetails[selectedOrderIndex];
          console.log(selectedOrder);
          populateDeliveryAddress(selectedOrder);
          populateOrderItems(selectedOrder);
        }

      }
    })
    .catch(function(error)  {
      // An error occurred
      console.log(error);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
}

function populateDeliveryAddress(selectedOrder) {
  console.log(document.getElementById('DeliveryDate'));
  document.getElementById('DeliveryDate').innerHTML = selectedOrder.deliveryDate;
  document.getElementById('DeliveryTime').innerHTML = selectedOrder.deliveryTime;
  document.getElementById('orderStatus').innerHTML = selectedOrder.orderStatus;
  document.getElementById('PaymentStatus').innerHTML = selectedOrder.paymentStatus;
  document.getElementById('orderDate').innerHTML = selectedOrder.orderDate;

  document.getElementById('BranchName').innerHTML = selectedOrder.deliveryAddress.branchName;
  document.getElementById('BranchOwnerName').innerHTML = selectedOrder.deliveryAddress.branchOwnerName;
  document.getElementById('AddressLine1').innerHTML = selectedOrder.deliveryAddress.addressLine1;
  document.getElementById('AddressLine2').innerHTML = selectedOrder.deliveryAddress.addressLine2;
  document.getElementById('City').innerHTML = selectedOrder.deliveryAddress.city;
  document.getElementById('ZipCode').innerHTML = selectedOrder.deliveryAddress.ZipCode;
  document.getElementById('phoneNumber').innerHTML = selectedOrder.deliveryAddress.PhoneNumber;

}

function populateOrderItems(selectedOrder) {
  var orderItem = selectedOrder.orderItems;
  console.log(orderItem);
  for (i = 0; i < orderItem.length; i++) {
    renderOrderItem(orderItem[i]);
  }
}

function renderOrderItem(orderItem) {
  var div1 = document.createElement("div");
  div1.setAttribute('class', 'col-sm-12');
  div1.setAttribute('style', 'padding: 5px;');

  var div2 = document.createElement("div");
  div2.setAttribute('class', 'product-list-div');


  var table1 = document.createElement("table");

  var tr1 = document.createElement('tr');

  var td1 = document.createElement('td');
  td1.setAttribute('width', "45%");
  td1.setAttribute('class', "product-img-td");

  var img1 = document.createElement("img");
  img1.setAttribute('src', orderItem.ImageURL);
  img1.setAttribute("width", "100%");
  img1.setAttribute("alt", "");

  var div3 = document.createElement('div');
  div3.setAttribute('class', "off-div");

  var small1 = document.createElement('small');
  small1.innerHTML = '20% OFF';

  var div4 = document.createElement('div');
  div4.setAttribute('class', "veg-nonVeg-div");

  var imgVegNonVeg = document.createElement("img");
  //console.log(orderItem.VegNonVeg);
  if (orderItem.VegNonVeg === "Veg") {
    imgVegNonVeg.setAttribute("src", "../img/veg.png");
  } else if (orderItem.VegNonVeg === "NonVeg") {
    imgVegNonVeg.setAttribute("src", "../img/non-veg.png");

  }
  imgVegNonVeg.setAttribute("width", "100%");
  imgVegNonVeg.setAttribute("alt", "");

  var td2 = document.createElement('td');
  td2.setAttribute('width', "55%");
  td2.setAttribute('valign', "top");
  td2.setAttribute('class', "product-names-div");
  //console.log(orderItem.ProductName);
  var small2 = document.createElement('small');
  small2.setAttribute('class', 'product-names');
  small2.innerHTML = orderItem.ProductName;


  var small3 = document.createElement('small');
  small3.setAttribute('style', 'style="font-size: 0.8rem; color: rgba(0,0,0,0.5);');
  small3.innerHTML = '';

  //console.log(orderItem.SelectedSubItem);
  var input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('name', '');
  input1.readonly = true;
  input1.value = orderItem.SelectedSubItem;

  var div5 = document.createElement('div');
  div5.setAttribute('class', 'product-price');
  //console.log(orderItem.MRP);
  var h51 = document.createElement('h5');
  h51.innerHTML = '₹' + orderItem.MRP;

  //console.log(orderItem.UnitPrise);
  var small4 = document.createElement('small');
  small4.innerHTML = '₹' + orderItem.UnitPrise;

  var table2 = document.createElement('table');

  var tr2 = document.createElement('tr');
  //console.log(orderItem.Quantity);
  var td3 = document.createElement('td');
  td3.setAttribute('width', '50%');
  td3.innerHTML = 'Qty : ' + orderItem.Quantity;

  var totalPrize = Number(orderItem.Quantity) * Number(orderItem.UnitPrise)
//  console.log(totalPrize);
  var td4 = document.createElement('td');
  td4.innerHTML = 'Prize : ' + totalPrize;

  td1.appendChild(img1);
  div3.appendChild(small1);
  td1.appendChild(div3);

  div4.appendChild(imgVegNonVeg);
  td1.appendChild(div4);
  tr1.appendChild(td1);

  td2.appendChild(small2);
  td2.appendChild(small3);
  //  td2.appendChild(document.createElement('br'));
  td2.appendChild(input1);

  div5.appendChild(h51);
  div5.appendChild(small4);
  td2.appendChild(div5);

  tr2.appendChild(td3);
  tr2.appendChild(td4);

  table2.appendChild(tr2);

  td2.appendChild(table2)

  tr1.appendChild(td2);
  table1.appendChild(tr1);

  div2.appendChild(table1)

  div1.appendChild(div2);
  //console.log(div1);
  document.getElementById('orderItems').appendChild(div1);

}
