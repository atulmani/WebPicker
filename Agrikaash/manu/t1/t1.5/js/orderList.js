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
    //document.getElementById('cartItemCount').innerHTML = itemCount;

  });

}

function renderOrderNew(orderid, order, index)
{
  var div1 = document.createElement("div");
  div1.setAttribute("class","dashboard-card order-status");

  var div2 = document.createElement("div");
  div2.setAttribute("class","");
  div2.setAttribute("style","display:flex;align-items: center;");

  var div3 = document.createElement("div");
  div3.setAttribute("class","arrow-down");

  var span1 = document.createElement("span");
  span1.setAttribute("class","material-icons-outlined");
  span1.innerHTML="keyboard_arrow_down";

  div3.appendChild(span1);


    var hforderid = document.createElement("input");
    hforderid.setAttribute('type', 'hidden');
    hforderid.setAttribute('id', 'hfOrderID' + index);
    hforderid.setAttribute('value', order.orderID);
    div3.appendChild(hforderid);
  div2.appendChild(div3);

  var div4=document.createElement("div");
  div4.setAttribute("class","");

  var span2=document.createElement("span");
  span2.setAttribute("class","material-icons-outlined order-icon")
  if(order.orderStatus==="Delivered")
  {
    span2.setAttribute("style","font-size: 3rem; color: #1D741B;");
    span2.innerHTML="check_circle";
  }
  else if(order.orderStatus==="On The Way")
  {
    span2.setAttribute("style","font-size: 3rem; color: #88CA5E;");
    span2.innerHTML="local_shipping";
  }
  else if(order.orderStatus==="Packed" )
  {

      span2.setAttribute("style","font-size: 3rem; color: #F8D210;");
      span2.innerHTML="widgets";
  }
  else if(order.orderStatus==="Pending" )
  {

      span2.setAttribute("style","font-size: 3rem; color: #F8D210;");
      span2.innerHTML="history_toggle_off";
  }
  else if(order.orderStatus==="Cancelled")
  {

      span2.setAttribute("style","font-size: 3rem; color: #ff5757;");
      span2.innerHTML="cancel";
  }

  //span2.setAttribute("class","material-icons-outlined order-icon");
  //check for order statys and change the icon
  //span2.innerHTML="check_circle";

  div4.appendChild(span2);
  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class","details");

  var h1 = document.createElement("h4");
  if(order.orderStatus === "Delivered")
  {
    h1.setAttribute("style","color: #1D741B" );
    h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "On The Way")
  {
      h1.setAttribute("style","color: #88CA5E" );
      h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "Packed")
  {
      h1.setAttribute("style","color: #F8D210" );
      h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "Cancelled")
  {
      h1.setAttribute("style","color: #ff5757" );
      h1.innerHTML = order.orderStatus;
  }
  else if(order.orderStatus === "Pending")
  {
      h1.setAttribute("style","color: #F8D210" );
      h1.innerHTML = order.orderStatus;
  }
  div5.appendChild(h1);


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


    var dt =   order.deliveryDate ;
    var odeldate = new Date(dt.seconds * 1000);
    var delDate  = odeldate.toLocaleDateString("en-US", options);

  var p1 = document.createElement("p");
  p1.setAttribute("class","small-text dashboard-sub-heading");
  p1.innerHTML="Delivery date: " + delDate+ " [ " +  order.deliveryTime + " ] - " + order.totalItems +" Items" ;

  div5.appendChild(p1);
  div2.appendChild(div5);
  div1.appendChild(div2);

  var div6 = document.createElement("div");
  div6.setAttribute("class","dashboard-card-expand");

  var hr1 = document.createElement("hr");
  div6.appendChild(hr1);

  var div7 = document.createElement("div");
  div7.setAttribute("class","dashboard-card-order");

  var div8=document.createElement("div");
  div8.setAttribute("class","");

  var h2= document.createElement("h5");
  h2.setAttribute("class","small-text");
  h2.setAttribute("style","margin: 0 auto;");
  h2.innerHTML="Order Number";
  div8.appendChild(h2);

  var small1 = document.createElement("small");
  small1.innerHTML=order.orderNumber;
  div8.appendChild(small1);

  div7.appendChild(div8);

  var div9= document.createElement("div");
  div9.setAttribute("class","");

  var h3= document.createElement("h5");
  h3.setAttribute("class","small-text");
  h3.setAttribute("style","margin: 0 auto;");
  h3.innerHTML="Order Date";
  div9.appendChild(h3);

  var odt =   order.orderDate ;
  var oOrderdate = new Date(odt.seconds * 1000);
  var orderDate  = oOrderdate.toLocaleDateString("en-US", options);

  var small2 = document.createElement("small");
  small2.innerHTML=orderDate;
  div9.appendChild(small2);

  div7.appendChild(div9);

  div6.appendChild(div7);

  var br1 = document.createElement("br");
  div6.appendChild(br1);

  var div10 = document.createElement("div");
  div10.setAttribute("class","dashboard-card-order");

  var div11 = document.createElement("div");
  div11.setAttribute("class","");

    var h4= document.createElement("h5");
    h4.setAttribute("class","small-text");
    h4.setAttribute("style","margin: 0 auto;");
    h4.innerHTML="Total Amount";
    div11.appendChild(h4);

      var curFormat = { style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 };

      var displayAmt = Number(order.totalAmount).toLocaleString('en-IN', curFormat);
      console.log(displayAmt);
      console.log(order.totalAmount);
    var small3 = document.createElement("small");
    small3.innerHTML=displayAmt;
    div11.appendChild(small3);

    div10.appendChild(div11);

    var div12 = document.createElement("div");
    div12.setAttribute("class","");

    var h5= document.createElement("h5");
    h5.setAttribute("class","small-text");
    h5.setAttribute("style","margin: 0 auto;");
    h5.innerHTML="Discount";
    div12.appendChild(h5);

    var displayDiscountAmt = order.discountedprize.toLocaleString('en-IN', curFormat);
    console.log(displayDiscountAmt);
      var discount = order.discountDetails.coupondID;

    var small4 = document.createElement("small");
    if(order.discountDetails.coupondID === "none"){
      small4.innerHTML="No Discount";
    }
    else {
      small4.innerHTML=displayDiscountAmt + "(Off " + order.discountDetails.discountValue + ")";
    }
    div12.appendChild(small4);

    div10.appendChild(div12);
    div6.appendChild(div10);
      var br2 = document.createElement("br");
      div6.appendChild(br2);

      ///to be updated only in Admin module - Start
/*
        var div13 = document.createElement("div");
        div13.setAttribute("class","dashboard-card-order");

        var div14 = document.createElement("div");
        div14.setAttribute("class","");


          var h5= document.setAttribute("h5");
          h5.setAttribute("class","small-text");
          h5.setAttribute("style","margin: 0 auto;");
          h5.innerHTML="Order By";
          div14.appendChild(h5);

          var small4 = document.createElement("small");
          small4.innerHTML= order.orderBy;
          div14.appendChild(small4);

          div13.appendChild(div14);

          var div15 = document.createElement("div");
          div15.setAttribute("class","");

          div13.appendChild(div15);
          div6.appendChild(div13);
            var br3 = document.createElement("br");
            div6.appendChild(br2);
            */
                  ///to be updated only in Admin module - End


    var dDate = new Date(order.deliveryDate.seconds * 1000);

    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() + 2);

    var flag= false;
    //order can be cancelled only if order status is Pending and delivery Date is > todays date
    if (order.orderStatus === 'Pending' && dDate >= tempDate) {
      flag = true;
    } else {
      flag = false;
    }

      var div16 = document.createElement("div");
      div16.setAttribute("class","");
      div16.setAttribute("style","display:flex;align-items:center;justify-content: space-between;padding-top: 10px;");

      var anchor1 = document.createElement("a");
      anchor1.setAttribute("href","#trend");

      var button1 = document.createElement("button");
      button1.setAttribute("class","mybutton buttonTransparent");
      button1.setAttribute("style","padding-bottom: 7px;margin: auto 10px;");
      button1.innerHTML = "Delete";

      var span11 = document.createElement("span");
      span11.setAttribute("class","material-icons-outlined");
      span11.setAttribute("style","position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
      span11.innerHTML= "delete_forever";
      button1.appendChild(span11);
      anchor1.appendChild(button1);
      if(flag === true)
        div16.appendChild(anchor1);

      var anchor2 = document.createElement("a");
      anchor2.setAttribute("href","orderSummary.html?id=" + orderid);
      //anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

      var button2 = document.createElement("button");
      button2.setAttribute("class","mybutton buttonTransparent");
      button2.setAttribute("style","padding-bottom: 7px;margin: auto 10px;");
      button2.innerHTML = "Edit";

      var span12 = document.createElement("span");
      span12.setAttribute("class","material-icons-outlined");
      span12.setAttribute("style","position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
      span12.innerHTML= "edit";
      button2.appendChild(span12);
      anchor2.appendChild(button2);
      div16.appendChild(anchor2);
      div6.appendChild(div16);
      div1.appendChild(div6);
      document.getElementById("orderListDiv").appendChild(div1);
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
console.log(orderID);
console.log(order);
console.log(index);
renderOrderNew(orderID, order, index);

/*  if (order.orderStatus === 'Pending' && order.paymentStatus === 'Pending') {
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
*/

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
