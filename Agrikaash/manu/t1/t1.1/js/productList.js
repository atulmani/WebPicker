//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      //console.log(firebaseUser.uid);
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('profile-name').value = firebaseUser.displayName;
      // document.getElementById('profile-number').value = firebaseUser.Phone;
      // document.getElementById('profileEmail').value = firebaseUser.email;

      GetProfileData(firebaseUser);

      var promise = getCartItemNo();
      var promise2 = promise.then(populateProductData());
//       promise2.then(
//
//             document.getElementById('loading').style.display = 'none'
// );
      //      const promise = getCartItemNo();
      //    const promise2 = promise.then(populateProductData);


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

async function getCartItemNo() {
  //console.log("getCartItemNo");
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
    }
  });
};


async function populateProductData() {
  db.collection("Products").orderBy('CreatedTimestamp', 'desc').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    ///check cart Start
    //get already added items from cart
    var item = [];
    //console.log(cartItems);
    // const snapshotCart = db.collection('CartDetails').doc(userID);
    // snapshotCart.get().then((doc) => {
    //   if (doc.exists) {
    //     console.log("doc exists");
    //     item = doc.data().cartDetails;
    //     console.log(item);
    //   }

    var index = 0;
    var selectedindex = -1;
    var selectdedItem;
    changes.forEach(change => {
      //console.log(change.type, change.doc.id);
      //console.log(item);
      if (change.type == 'added') {
        if (cartItems != null) {
          selectedIndex = cartItems.findIndex(a => a.ProductID === change.doc.id);

          if (selectedIndex >= 0) {
            selectdedItem = cartItems[selectedIndex];

          } else {

            selectdedItem = null;
          }
        } else {

          selectdedItem = null;
        }
      }
      //console.log(change.doc, index, selectdedItem);
      renderProductNew(change.doc, index, selectdedItem);
      index = index + 1;

    });
    document.getElementById('loading').style.display = 'none';

    ////check cart end

    //});


  });


}

/////////////////////new function
function renderProductNew(doc, index, selectedItem) {
  //console.log(selectedItem);
  //console.log('Event Name: ' + doc.data().ProductName);

  var productlist = doc.data().ProductDetails;

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("style", "padding: 5px;");

  var div1_1 = document.createElement("div");
  div1_1.setAttribute("class", "product-list-div");

  var table1 = document.createElement("table");
  var tr1 = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.setAttribute("width", "45%");
  td1.setAttribute("class", "product-img-td");;
  var hfID = document.createElement("input");
  hfID.setAttribute("id", "hfID" + index);
  hfID.setAttribute("type", "hidden");
  hfID.setAttribute("value", doc.id);
  td1.appendChild(hfID);
  var img1 = document.createElement("img");
  img1.setAttribute("src", doc.data().ProductImageURL);
  img1.setAttribute("width", "100%")
  img1.setAttribute("alt", "");
  td1.appendChild(img1);

  var div1_2 = document.createElement("div");
  div1_2.setAttribute("class", "off-div");
  div1_2.innerHTML = "<small>" + "20% OFF" + "</small>";
  td1.appendChild(div1_2);

  var div1_3 = document.createElement("div");
  div1_3.setAttribute("class", "veg-nonVeg-div");

  var imgVegNonVeg = document.createElement("img");
  if (doc.data().VegNonVeg === "Veg")
    imgVegNonVeg.setAttribute("src", "../img/veg.png");
  else if (doc.data().VegNonVeg === "NonVeg")
    imgVegNonVeg.setAttribute("src", "../img/non-veg.png");
  imgVegNonVeg.setAttribute("width", "100%");
  imgVegNonVeg.setAttribute("alt", "");

  div1_3.appendChild(imgVegNonVeg);
  td1.appendChild(div1_3);
  tr1.appendChild(td1);

  var td2 = document.createElement("td");
  td2.setAttribute("width", "55%");
  td2.setAttribute("valign", "top")
  td2.setAttribute("class", "product-names-div");
  td2.innerHTML = "<small class='product-names'>" + doc.data().ProductName + "</small><br>" +
    "<small style='font-size: 0.8rem; color: rgba(0,0,0,0.5);'>" + doc.data().Brand + "</small><br>";

  var selectP = document.createElement("select");
  selectP.name = "productDetails";
  selectP.id = "productDetails" + index;
  //console.log("mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + ")");
  selectP.setAttribute("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelectedValue" + index + "," + index + ",'" + doc.id + "'," + doc.data().MinimumQty + ")");
  //selectP.addEventListener("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelectedValue" + index + ","+index+")");
  var indexnew = -1;
  var mrp = 0;
  var finalPrize = 0;
  var qtyNew = doc.data().MinimumQty;
  for (const val of productlist) {
    var option = document.createElement("option");
    option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
    option.text = val.ProductWeight + " - " + "Rs." + val.ProductFinalPrise;
    if (selectedItem != null) {
      if (option.text === selectedItem.SelectedsubItem) {
        option.selected = true;

        if (qtyNew === doc.data().MinimumQty)
          qtyNew = selectedItem.Quantity;
        //indexnew = option.index;
        //console.log("indexnew : ", indexnew);
        if (mrp === 0)
          mrp = val.ProductMRP;
        if (finalPrize === 0)
          finalPrize = val.ProductFinalPrise
      } else {
        indexnew = -1;
        qtyNew = 1;
      }
    } else {
      mrp = 0;
      finalPrize = 0;
      indexnew = -1;
      qtyNew = 1;
    }
    selectP.appendChild(option);

  }
  //selectP.addEventListener("change", addActivityItem, false);
  //var hfSelecttion = document.createElement("input")
  var hfSelecttion = document.createElement("input");
  hfSelecttion.setAttribute("id", "hfSelectedValue" + index);
  hfSelecttion.setAttribute("type", "hidden");
  hfSelecttion.setAttribute("value", selectP[selectP.selectedIndex].text);
  //console.log("hfSelecttion : ", hfSelecttion);
  //console.log("mrp : ", mrp);
  //console.log("finalprize : ", finalPrize);

  td2.appendChild(hfSelecttion);
  td2.appendChild(selectP);
  var div1_4 = document.createElement("div");
  div1_4.setAttribute("class", "product-price");
//console.log(selectedItem);

  // div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + productlist[0].ProductMRP + "</span>" + "</h5>" +
  //   "<small>₹ " + "<span id='final" + index + "'>" + productlist[0].ProductFinalPrise + "</span></small>";
  if (selectedItem != null) {
    div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + mrp + "</span>" + "</h5>" +
      "<small>₹ " + "<span id='final" + index + "'>" + finalPrize + "</span></small>";

  } else {

    div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + productlist[0].ProductMRP + "</span>" + "</h5>" +
      "<small>₹ " + "<span id='final" + index + "'>" + productlist[0].ProductFinalPrise + "</span></small>";

  }

  var table2 = document.createElement("table");
  table2.setAttribute("style", "width:51%;position:absolute;bottom:10px;right:10px;");

  var t2tr = document.createElement("tr");
  var t2trtd = document.createElement("td");
  t2trtd.setAttribute("width", "100%");
  t2trtd.setAttribute("class", "quantity-td");
  var trdiv = document.createElement("div");
  trdiv.setAttribute("id", "quantityFullDiv" + index);
  trdiv.setAttribute("class", "quantity buttons_added");

  var buttonA = document.createElement("a");
  buttonA.setAttribute('href', '#');
  buttonA.setAttribute("id", "btnAddtoCart" + index);
  buttonA.setAttribute("onclick", "addToCart(" + doc.data().MinimumQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "'," + index + ")");

  var addToCartBtn = document.createElement('button');
  addToCartBtn.setAttribute('class', 'mybutton button5');
  addToCartBtn.setAttribute('style', 'width:90px;font-size:1.08rem;');
  addToCartBtn.innerHTML = "Add <i class='fas fa-cart-plus'></i>";

  var trinput1 = document.createElement("input");
  trinput1.setAttribute("id", "minus" + index);
  trinput1.setAttribute("type", "button");
  trinput1.setAttribute("value", "-");
  trinput1.setAttribute("class", "minus");

  trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "'," + index + ")");

  //trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ","+doc.data().ProductName+","+selectP+" ,"+doc.id+" )");
  var trinput2 = document.createElement("input");
  trinput2.setAttribute("id", "qty" + index);
  trinput2.setAttribute("type", "number");
  trinput2.setAttribute("step", "1");
  trinput2.setAttribute("name", "quantity");
  //trinput2.setAttribute("value", doc.data().MinimumQty);
  if (selectedItem != null) {
    trinput2.setAttribute("value", selectedItem.Quantity);

  } else {
    trinput2.setAttribute("value", doc.data().MinimumQty);

  }
  trinput2.setAttribute("title", "Qty");
  trinput2.setAttribute("class", "input-text qty text");
  trinput2.setAttribute("size", "4");
  trinput2.setAttribute("pattern", "");
  trinput2.setAttribute("inputmode", "");

  var trinput3 = document.createElement("input");
  trinput2.setAttribute("onchange", "updateQuantity(" + "qty" + index + "," + doc.data().MinimumQty + "," + doc.data().MaximumQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "' )");
  trinput3.setAttribute("id", "plus" + index);
  trinput3.setAttribute("type", "button");
  trinput3.setAttribute("value", "+");
  trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "')");
  trinput3.setAttribute("class", "plus");

  var trinput4 = document.createElement("input");
  trinput4.setAttribute("id", "step" + index);
  trinput4.setAttribute("type", "hidden");
  trinput4.setAttribute("value", doc.data().StepQty);

  var trinput5 = document.createElement("input");
  trinput5.setAttribute("id", "min" + index);
  trinput5.setAttribute("type", "hidden");
  trinput5.setAttribute("value", doc.data().MinimumQty);

  var trinput6 = document.createElement("input");
  trinput6.setAttribute("id", "max" + index);
  trinput6.setAttribute("type", "hidden");
  trinput6.setAttribute("value", doc.data().MaximumQty);

  if (selectedItem != null) {
    buttonA.style.display = 'none';
    trinput1.style.visibility = 'visible';
    trinput2.style.visibility = 'visible';
    trinput3.style.visibility = 'visible';
  } else {
    buttonA.style.display = 'block';
    trinput1.style.visibility = 'hidden';
    trinput2.style.visibility = 'hidden';
    trinput3.style.visibility = 'hidden';
  }

  trdiv.appendChild(trinput1);
  trdiv.appendChild(trinput2);
  trdiv.appendChild(trinput3);
  trdiv.appendChild(trinput4);
  trdiv.appendChild(trinput5);
  trdiv.appendChild(trinput6);

  buttonA.appendChild(addToCartBtn);
  trdiv.appendChild(buttonA);

  // if (selectedItem != null) {
  //   trdiv.appendChild(trinput1);
  //   trdiv.appendChild(trinput2);
  //   trdiv.appendChild(trinput3);
  //   trdiv.appendChild(trinput4);
  //   trdiv.appendChild(trinput5);
  //   trdiv.appendChild(trinput6);
  // } else {
  //   buttonA.appendChild(addToCartBtn);
  //   trdiv.appendChild(buttonA);
  // }

  t2trtd.appendChild(trdiv);
  t2tr.appendChild(t2trtd);
  table2.appendChild(t2tr);
  td2.appendChild(table2);

  td2.appendChild(div1_4);
  tr1.appendChild(td2);
  table1.appendChild(tr1);
  div1_1.appendChild(table1);
  div1.appendChild(div1_1);
  document.getElementById("productRow").appendChild(div1);

}



/////////////////////new function
// function renderProduct(doc, index) {
//   console.log('Doc ID: ' + doc.id);
//   console.log('Event Name: ' + doc.data().ProductName);
//
//   var productlist = doc.data().ProductDetails;
//
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-sm-12");
//   div1.setAttribute("style", "padding: 5px;");
//
//   var div1_1 = document.createElement("div");
//   div1_1.setAttribute("class", "product-list-div");
//
//   var table1 = document.createElement("table");
//   var tr1 = document.createElement("tr");
//
//   var td1 = document.createElement("td");
//   td1.setAttribute("width", "45%");
//   td1.setAttribute("class", "product-img-td");;
//   var hfID = document.createElement("input");
//   hfID.setAttribute("id", "hfID" + index);
//   hfID.setAttribute("type", "hidden");
//   hfID.setAttribute("value", doc.id);
//   td1.appendChild(hfID);
//   var img1 = document.createElement("img");
//   img1.setAttribute("src", doc.data().ProductImageURL);
//   img1.setAttribute("width", "100%")
//   img1.setAttribute("alt", "");
//   td1.appendChild(img1);
//
//   var div1_2 = document.createElement("div");
//   div1_2.setAttribute("class", "off-div");
//   div1_2.innerHTML = "<small>" + "20% OFF" + "</small>";
//   td1.appendChild(div1_2);
//
//   var div1_3 = document.createElement("div");
//   div1_3.setAttribute("class", "veg-nonVeg-div");
//
//   var imgVegNonVeg = document.createElement("img");
//   if (doc.data().VegNonVeg === "Veg")
//     imgVegNonVeg.setAttribute("src", "../img/veg.png");
//   else if (doc.data().VegNonVeg === "NonVeg")
//     imgVegNonVeg.setAttribute("src", "../img/non-veg.png");
//   imgVegNonVeg.setAttribute("width", "100%");
//   imgVegNonVeg.setAttribute("alt", "");
//
//   div1_3.appendChild(imgVegNonVeg);
//   td1.appendChild(div1_3);
//   tr1.appendChild(td1);
//
//   var td2 = document.createElement("td");
//   td2.setAttribute("width", "55%");
//   td2.setAttribute("valign", "top")
//   td2.setAttribute("class", "product-names-div");
//   td2.innerHTML = "<small class='product-names'>" + doc.data().ProductName + "</small><br>" +
//     "<small style='font-size: 0.8rem; color: rgba(0,0,0,0.5);'>" + doc.data().Brand + "</small><br>";
//
//   var selectP = document.createElement("select");
//   selectP.name = "productDetails";
//   selectP.id = "productDetails" + index;
//   selectP.setAttribute("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + ")");
//   for (const val of productlist) {
//     var option = document.createElement("option");
//     option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
//     option.text = val.ProductWeight + " - " + "Rs." + val.ProductFinalPrise;
//     selectP.appendChild(option);
//   }
//   //selectP.addEventListener("change", addActivityItem, false);
//   td2.appendChild(selectP);
//   var div1_4 = document.createElement("div");
//   div1_4.setAttribute("class", "product-price");
//   div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + productlist[0].ProductMRP + "</span>" + "</h5>" +
//     "<small>₹ " + "<span id='final" + index + "'>" + productlist[0].ProductFinalPrise + "</span></small>";
//
//   var table2 = document.createElement("table");
//   table2.setAttribute("style", "width:51%;position:absolute;bottom:10px;right:10px;");
//
//   var t2tr = document.createElement("tr");
//   var t2trtd = document.createElement("td");
//   t2trtd.setAttribute("width", "100%");
//   t2trtd.setAttribute("class", "quantity-td");
//   var trdiv = document.createElement("div");
//   trdiv.setAttribute("id", "quantityFullDiv" + index);
//   trdiv.setAttribute("class", "quantity buttons_added");
//
//   var trinput1 = document.createElement("input");
//   trinput1.setAttribute("id", "minus" + index);
//   trinput1.setAttribute("type", "button");
//   trinput1.setAttribute("value", "-");
//   trinput1.setAttribute("class", "minus");
//
//   trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "')");
//
//   //trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ","+doc.data().ProductName+","+selectP+" ,"+doc.id+" )");
//   var trinput2 = document.createElement("input");
//   trinput2.setAttribute("id", "qty" + index);
//   trinput2.setAttribute("type", "number");
//   trinput2.setAttribute("step", "1");
//   trinput2.setAttribute("name", "quantity");
//   trinput2.setAttribute("value", doc.data().MinimumQty);
//   trinput2.setAttribute("title", "Qty");
//   trinput2.setAttribute("class", "input-text qty text");
//   trinput2.setAttribute("size", "4");
//   trinput2.setAttribute("pattern", "");
//   trinput2.setAttribute("inputmode", "");
//
//   var trinput3 = document.createElement("input");
//   trinput3.setAttribute("id", "plus" + index);
//   trinput3.setAttribute("type", "button");
//   trinput3.setAttribute("value", "+");
//   trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "')");
//   trinput3.setAttribute("class", "plus");
//
//   var trinput4 = document.createElement("input");
//   trinput4.setAttribute("id", "step" + index);
//   trinput4.setAttribute("type", "hidden");
//   trinput4.setAttribute("value", doc.data().StepQty);
//
//   var trinput5 = document.createElement("input");
//   trinput5.setAttribute("id", "min" + index);
//   trinput5.setAttribute("type", "hidden");
//   trinput5.setAttribute("value", doc.data().MinimumQty);
//
//   var trinput6 = document.createElement("input");
//   trinput6.setAttribute("id", "max" + index);
//   trinput6.setAttribute("type", "hidden");
//   trinput6.setAttribute("value", doc.data().MaximumQty);
//
//   trdiv.appendChild(trinput1);
//   trdiv.appendChild(trinput2);
//   trdiv.appendChild(trinput3);
//   trdiv.appendChild(trinput4);
//   trdiv.appendChild(trinput5);
//   trdiv.appendChild(trinput6);
//
//   t2trtd.appendChild(trdiv);
//   t2tr.appendChild(t2trtd);
//   table2.appendChild(t2tr);
//   td2.appendChild(table2);
//
//   td2.appendChild(div1_4);
//   tr1.appendChild(td2);
//   table1.appendChild(tr1);
//   div1_1.appendChild(table1);
//   div1.appendChild(div1_1);
//   document.getElementById("productRow").appendChild(div1);
//
// }

function updateQuantity(oqty, iMin, iMax, itemName, productID, itemSizeObj) {
  var qty = Number(oqty.value);
  if (qty < iMin)
    qty = iMin;
  if (qty > iMax)
    qty = iMax;
  //console.log(qty);

  oqty.value = qty;
  AddUpdateCart(itemName, itemSizeObj, Number(qty), productID, 'active');
  getCartItemNo();
}

function incrementQty(oqty, omax, step, itemName, productID, itemSizeObj) {

  var qty = Number(oqty.value);
  //console.log(oqty);
  //console.log(qty);
  var max = Number(omax.value);

  if ((qty + step) <= max) {
    qty = Number(qty) + Number(step);
  } else {
    qty = max;
  }

  oqty.value = qty;
  //var str = itemSizeObj[itemSizeObj.selectedIndex].text;

  AddUpdateCart(itemName, itemSizeObj, qty, productID, 'active');

}

function ChangeAddButtonVisible(index, blflag) {
  //console.log(index, blflag);
  var buttonA = document.getElementById("btnAddtoCart" + index);
  var minB = document.getElementById("minus" + index);
  var qtyB = document.getElementById("qty" + index);
  var plusB = document.getElementById("plus" + index);

  if (blflag === true) {
    //console.log(buttonA);
    buttonA.style.display = 'block';

    minB.style.visibility = 'hidden';
    qtyB.style.visibility = 'hidden';
    plusB.style.visibility = 'hidden';
  } else {
    buttonA.style.display = 'none';

    minB.style.visibility = 'visible';
    qtyB.style.visibility = 'visible';
    plusB.style.visibility = 'visible';
  }
}

function addToCart(minQty, itemName, productID, itemSizeObj, index) {
  //console.log(minQty);
  //console.log(itemName);
  //console.log(productID);
  //console.log(itemSizeObj);
  var obj = document.getElementById("hfSelectedValue" + index);
  //console.log(obj);
  //AddUpdateCart(itemName, itemSizeObj, minQty, productID, 'active');
  AddUpdateCart(itemName, obj.value, minQty, productID, 'active');

  ChangeAddButtonVisible(index, false);
}
//function decrementQty(oqty, omin, step, itemName, itemSizeObj, productID) {
function decrementQty(oqty, omin, step, itemName, productID, itemSizeObj, index) {

  var qty = oqty.value;

  var min = omin.value;

  if ((qty - step) >= min) {
    qty = qty - step;
  } else {
    qty = min;

  }

  oqty.value = qty;

  if (qty === min) {
    var promise = deleteFromCart(itemSizeObj, productID, index);
    promise.then(ChangeAddButtonVisible(index, true));

  } else {
    AddUpdateCart(itemName, itemSizeObj, qty, productID, 'active');
  }

}

async function deleteFromCart(itemSizeObj, productID, index) {

  //const snapshot = db.collection('CartDetails').doc(userID);
  //snapshot.get().then((doc) => {
  //item = cartItems;

  //console.log(cartItems);

  itemIndex = cartItems.findIndex(a => a.ProductID === productID && a.SelectedsubItem === itemSizeObj);
  if (itemIndex >= 0) {
    cartItems.splice(itemIndex, 1);
  }

  db.collection('CartDetails')
    .doc(userID)
    .update({
      cartDetails: cartItems //firebase.firestore.FeildValue.arrayUnion(cartItems)
    })
    .then(() => {
      //console.log('manu');
      // location.reload();
      document.getElementById('cartItemNo').innerHTML = cartItems.length;

      populateProductData();
      ChangeAddButtonVisible(index, true);
    })
    .catch((error) => {
      return index;
      console.log("in error");
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
    });


  //});
  // populateProductData();
  return index;
}

function mySelectionChange(productdetails, mrp, final, hfSelected, index, lproductID, minQty) {
  //alert(productdetails);
  //alert(productdetails.selectedIndex);
  //console.log(productdetails);
  //console.log(mrp);
  //console.log(final);
  //console.log(hfSelected);
  //console.log(cartItems);
  //console.log(lproductID);

  //var str = productdetails[productdetails.selectedIndex].value;
  //console.log(productdetails[productdetails.selectedIndex].text);
  hfSelected.value = productdetails[productdetails.selectedIndex].text;
  //console.log(hfSelected.value);
  str = productdetails[productdetails.selectedIndex].value;
  const myarr = str.split(":");

  //alert (myarr )
  mrp.innerHTML = myarr[1];
  final.innerHTML = myarr[0];
  //alert(mrp);
  //check if already in cartItems
  //var selIndex = cartItems.findIndex(e => e.SelectedsubItem === str  &&  e.ProductID === productID );
  var selIndex = cartItems.findIndex(a => a.ProductID === lproductID.trim() && a.SelectedsubItem === hfSelected.value);
  //console.log(" selIndex", selIndex);
  if (selIndex >= 0) { //item alreadt added
    var qtyObj = document.getElementById("qty" + index);
    qtyObj.value = cartItems[selIndex].Quantity;
    ChangeAddButtonVisible(index, false);
  } else {
    var qtyobj = document.getElementById("qty" + index);
    qtyobj.value = minQty;
    ChangeAddButtonVisible(index, true);
  }
}

function AddUpdateCart(itemName, itemSelect, itemQuantity, productID, itemQualityStatus) {


  itemIndex = cartItems.findIndex(a => a.ProductID === productID && a.SelectedsubItem === itemSelect);
  if (itemIndex >= 0)
    cartItems.splice(itemIndex, 1);

  cartItems.push({
    ItemName: itemName,
    SelectedsubItem: itemSelect,
    Quantity: itemQuantity,
    ProductID: productID,
    Status: itemQualityStatus
  });
  db.collection('CartDetails')
    .doc(userID)
    .set({
      uid: userID,
      cartDetails: cartItems, //  firebase.firestore.FeildValue.arrayUnion(cartItems),
      CreatedTimestamp: '',
      UpdatedTimestamp: (new Date()).toString()
    })
    .then(() => {
      // updated
      console.log('Users data saved successfully');
      getCartItemNo();
      // window.location.href = "../admin/dashboard.html";
    })
    .catch((error) => {
      // An error occurred
      console.log("in error");
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
    });


}

var removeByAttr = function(arr, attr, value) {
  //console.log("in remove");
  var i = arr.length;
  while (i--) {
    if (arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      (arguments.length > 2 && arr[i][attr] === value)) {

      arr.splice(i, 1);

    }
  }
  return arr;
}
