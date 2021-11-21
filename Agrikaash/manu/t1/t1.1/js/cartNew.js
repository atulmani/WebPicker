//const productID = document.getElementById('productID');
var userID = "";
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
      populateCartData();
      getCartItemNo();
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
        // let blogPost = doc.data();
        // console.log ('User UID: ' + user.uid);
        console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        // console.log('Display Name: '+ doc.data().displayName);
        // console.log('Phone '+ doc.data().Phone);
        // console.log('Date of Birth: '+ doc.data().DateOfBirth);
        // console.log('Address: '+ doc.data().Address);

        // document.getElementById('status').innerHTML = doc.data().Status;
        // document.getElementById('myimg').src = doc.data().ImageURL;
        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        // document.getElementById('profile-name').value = doc.data().displayName;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
        // document.getElementById('profile-number').value = doc.data().Phone;
        // document.getElementById('profile-dob').value = doc.data().DateOfBirth;
        // document.getElementById('profile-adress').value = doc.data().Address;
        // document.getElementById('profileEmail').value = doc.data().EmailId;



        // for (var option of document.getElementById("idtype").options)
        // {
        //   if (option.value === doc.data().IDType)
        //   {
        //       option.selected = true;
        //   }
        // }
        //
        // document.getElementById('idno').value = doc.data().IDNo;
        // document.getElementById('address').value = doc.data().Address;

      }
    })
    .catch((error) => {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};
var totalPrize = 0;
var index = 0;

function populateCartData() {
  var index = 0;
  try {

    const cartItems = db.collection("CartDetails").doc(userID);
    cartItems.get().then((doc1) => {
      if (doc1.exists) {

        var cartDetail = doc1.data().cartDetails;
        for (const item of cartDetail) {
          var lProductID = item.ProductID;
          selectdedItem = item.SelectedsubItem;
          console.log(lProductID);
          const psnapshot = db.collection('Products').doc(lProductID);
          psnapshot.get().then((doc) => {
            if (doc.exists) {

              renderProduct(doc, index, item);
              index = index + 1;
              itemCount.innerHTML = (index) + " Items";
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  } finally {

  }
}

function getCartItemNo() {
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      //  console.log(doc.id);
      item = doc.data().cartDetails;
      var arr = [];
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].ProductID);
      }
      //  console.log(arr);
      //for (var i = 0; i < item.length; i++)
      {
        var parr = [];
        //const prodDetails = db.collection('Products').doc(item[i].ProductID);
        db.collection('Products').where("__name__", 'in', arr)
          //const prodDetails = db.collection('Products').where ("__name__" , '==', 'O1RMEcLeeaHt9cXoAT33')
          .get()
          .then((psnapshot) => {
            psnapshot.forEach((doc) => {
              parr.push({
                ProductID: doc.id,
                ProductDetails: doc.data().ProductDetails
              });
            });
            var prise = 0;
            for (i = 0; i < item.length; i++) {
              var qty = item[i].Quantity;
              var selectedsubItem = item[i].SelectedsubItem;
              var weight = selectedsubItem.split('-');

              var selectedProduct = parr[parr.findIndex(e => e.ProductID === item[i].ProductID)];
              if (selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
                var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
                prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
              }
            }
            cartItemNo.innerHTML = item.length;
            document.getElementById('itemCount').innerHTML = item.length + ' Items';

            document.getElementById('totalAmount').innerHTML = 'Rs. ' + prise;

          });

      }
    }
  });

}
//
// function populateCartDataOld() {
//   const snapshot = db.collection('CartDetails').doc(userID);
//
//   snapshot.get().then((doc) => {
//     if (doc.exists) {
//       console.log("doc exists");
//       item = doc.data().cartDetails;
//       console.log(item);
//
//       db.collection("Products").orderBy('CreatedTimestamp', 'desc').onSnapshot(snapshot => {
//
//         let changes = snapshot.docChanges();
//         // alert('Snapsize from Homepage: ' + snapshot.size);
//         // console.log(changes);
//
//
//         changes.forEach(change => {
//           console.log(change.doc.id);
//           index = item.findIndex(a => a.ProductID === change.doc.id);
//
//           if (index >= 0) {
//             selectdedItem = item[index];
//             renderProduct(change.doc, index, selectdedItem);
//             index = index + 1;
//             itemCount.innerHTML = (index) + " Items";
//
//           }
//         });
//       });
//     }
//   });
//
// }

/////////////////////new function
function renderProduct(doc, index, selecteditem) {
  console.log('Doc ID: ' + doc.id);
  console.log('Event Name: ' + doc.data().ProductName);

  var productlist = doc.data().ProductDetails;
  console.log(productlist);
  var mainReload = document.createElement("main");
  mainReload.setAttribute("id", "main" + index);
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

  // var selectP = document.createElement("select");
  // selectP.name = "productDetails";
  // selectP.id = "productDetails" + index;
  var MRP = "";
  var FinalPrize = "";
  // selectP.setAttribute("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelect" + index + ")");
  var hfSelected = document.createElement("input");
  hfSelected.id = "hfSelect" + index;
  hfSelected.setAttribute("type", "hidden");

  for (const val of productlist) {
    var option = document.createElement("option");
    option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
    option.text = val.ProductWeight + " - " + "Rs." + val.ProductFinalPrise;
    console.log(selecteditem.SelectedsubItem);
    if (selecteditem.SelectedsubItem === option.text) {
      option.selected = true;
      MRP = val.ProductMRP;
      FinalPrize = val.ProductFinalPrise;
      hfSelected.setAttribute("value", option.text);
    }
    // selectP.appendChild(option);
  }

  var itemUnit = document.createElement("input");
  itemUnit.setAttribute("id", "unit" + index);
  itemUnit.setAttribute("readonly", "true");
  itemUnit.setAttribute("value", selecteditem.SelectedsubItem);
  td2.appendChild(itemUnit);

  totalPrize = Number(totalPrize) + Number(FinalPrize) * Number(selecteditem.Quantity);
  //totalAmount.innerHTML = "Rs. " + totalPrize;

  console.log("prize : " + totalPrize);
  //selectP.addEventListener("change", addActivityItem, false);
  // td2.appendChild(selectP);
  td2.appendChild(hfSelected);

  var div1_4 = document.createElement("div");
  div1_4.setAttribute("class", "product-price");
  div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + MRP + "</span>" + "</h5>" +
    "<small>₹ " + "<span id='final" + index + "'>" + FinalPrize + "</span></small><br><br><br>";

  // div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + productlist[0].ProductMRP + "</span>" + "</h5>" +
  //   "<small>₹ " + "<span id='final" + index + "'>" + productlist[0].ProductFinalPrise + "</span></small>";

  // div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + productlist[0].ProductMRP + "</span>" + "</h5>" +
  //   "<small>₹ " + "<span id='final" + index + "'>" + productlist[0].ProductFinalPrise + "</span></small>";

  var table2 = document.createElement("table");
  table2.setAttribute("style", "width:51%;position:absolute;bottom:10px;right:10px;");

  var t2tr = document.createElement("tr");

  var t2trtd1 = document.createElement("td");
  t2trtd1.setAttribute("width", "30%");
  var delete_outline = document.createElement("span");
  delete_outline.setAttribute("class", "material-icons");
  delete_outline.setAttribute("style", "cursor:pointer;");

  //  delete_outline.setAttribute("onclick", "deleteCartItem('" + selecteditem.SelectedsubItem + "', '" + doc.id + "')");
  //  btnSelect1.addEventListener('click', function(e){selectImage(e,btnSelect1.id)}, false);

  delete_outline.addEventListener('click', function(e) {
    deleteCartItem(e, selecteditem.SelectedsubItem, doc.id, "main" + index)
  }, false);
  delete_outline.innerHTML = "delete_outline";
  t2trtd1.appendChild(delete_outline);

  var t2trtd2 = document.createElement("td");
  t2trtd2.setAttribute("width", "70%");
  t2trtd2.setAttribute("class", "quantity-td");
  var trdiv = document.createElement("div");
  trdiv.setAttribute("id", "quantityFullDiv" + index);
  trdiv.setAttribute("class", "quantity buttons_added");

  var trinput1 = document.createElement("input");
  trinput1.setAttribute("id", "minus" + index);
  trinput1.setAttribute("type", "button");
  trinput1.setAttribute("value", "-");
  trinput1.setAttribute("class", "minus");

  trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "'," + "hfSelect" + index + ")");

  //trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ","+doc.data().ProductName+","+selectP+" ,"+doc.id+" )");
  var trinput2 = document.createElement("input");
  trinput2.setAttribute("id", "qty" + index);
  trinput2.setAttribute("type", "number");
  trinput2.setAttribute("step", "1");
  trinput2.setAttribute("name", "quantity");
  //trinput2.setAttribute("value", doc.data().MinimumQty);
  trinput2.setAttribute("value", selecteditem.Quantity);
  trinput2.setAttribute("title", "Qty");
  trinput2.setAttribute("class", "input-text qty text");
  trinput2.setAttribute("size", "4");
  trinput2.setAttribute("pattern", "");
  trinput2.setAttribute("inputmode", "");

  var trinput3 = document.createElement("input");
  trinput3.setAttribute("id", "plus" + index);
  trinput3.setAttribute("type", "button");
  trinput3.setAttribute("value", "+");
  //trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "')");
  trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "'," + "hfSelect" + index + ")");

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

  trdiv.appendChild(trinput1);
  trdiv.appendChild(trinput2);
  trdiv.appendChild(trinput3);
  trdiv.appendChild(trinput4);
  trdiv.appendChild(trinput5);
  trdiv.appendChild(trinput6);

  t2trtd2.appendChild(trdiv);
  t2tr.appendChild(t2trtd1);
  t2tr.appendChild(t2trtd2);
  table2.appendChild(t2tr);
  td2.appendChild(table2);

  td2.appendChild(div1_4);
  tr1.appendChild(td2);
  table1.appendChild(tr1);
  div1_1.appendChild(table1);
  div1.appendChild(div1_1);
  mainReload.appendChild(div1);

  //document.getElementById("divCart").appendChild(div1);
  document.getElementById("divCart").appendChild(mainReload);

}

function incrementQty(oqty, omax, step, itemName, productID, itemSizeObj) {

  console.log(itemSizeObj);
  var qty = Number(oqty.value);

  var max = Number(omax.value);

  if ((qty + step) <= max) {
    qty = Number(qty) + Number(step);
  } else {
    qty = max;
  }

  oqty.value = qty;
  //var str = itemSizeObj[itemSizeObj.selectedIndex].text;
  console.log(oqty, omax, step, itemName, productID, itemSizeObj);
  AddUpdateCart(itemName, itemSizeObj, qty, productID, 'active');
  getCartItemNo();
}

//function decrementQty(oqty, omin, step, itemName, itemSizeObj, productID) {
function decrementQty(oqty, omin, step, itemName, productID, itemSizeObj) {

  var qty = oqty.value;

  var min = omin.value;

  if ((qty - step) >= min) {
    qty = qty - step;
  } else {
    qty = min;
  }

  oqty.value = qty;

  //var str = itemSizeObj[itemSizeObj.selectedIndex].text;
  console.log(itemName, productID, itemSizeObj.value);
  AddUpdateCart(itemName, itemSizeObj, qty, productID, 'active');
  getCartItemNo();
}

function deleteCartItem(e, itemSizeObj, productID, deleteID) {
  e.preventDefault();
  console.log("deleteID : ", deleteID);

  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then((doc) => {
    item = doc.data().cartDetails;

    console.log(item);

    itemIndex = item.findIndex(a => a.ProductID === productID && a.SelectedsubItem === itemSizeObj);
    if (itemIndex >= 0) {
      item.splice(itemIndex, 1);
    }

    console.log(item);

    db.collection('CartDetails')
      .doc(userID)
      .update({
        cartDetails: item//firebase.firestore.FeildValue.arrayUnion(item)
      })
      .then(() => {
        console.log('manu');
        itemdelete = document.getElementById(deleteID);
        getCartItemNo();
        itemdelete.remove();
        //itemdelete.load(location.href + itemdelete); //to relooad a page
        //var but = document.createElement("button");
        //but.setAttribute
        //$("#main").load(location.href + " #main"); to relooad a page
        //location.reload();
        // populateCartData();
        getCartItemNo();
      })
      .catch((error) => {
        console.log("in error");
        // document.getElementById('errorMessage').innerHTML = error.message;
        // document.getElementById('errorMessage').style.display = 'block';
      });


  });
}


function mySelectionChange(productdetails, mrp, final, hfselect) {
  //alert(productdetails);
  //alert(productdetails.selectedIndex);
  var str = productdetails[productdetails.selectedIndex].value;
  const myarr = str.split(":");
  //alert (myarr )
  mrp.innerHTML = myarr[1];
  final.innerHTML = myarr[0];
  //alert(mrp);
  hfselect.value = productdetails[productdetails.selectedIndex].text;
  //AddUpdateCart(productdetails[productdetails.selectedIndex])
}

function AddUpdateCart(itemName, itemSelect, itemQuantity, productID, itemQualityStatus) {

  var item = [];
  console.log("AddUpdateCart");
  console.log("itemSelect : ", itemSelect.value);
  console.log("itemName : ", itemName);
  console.log("itemQuantity : ", itemQuantity);
  console.log("productID : ", productID);
  console.log("itemQualityStatus : ", itemQualityStatus);

  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then((doc) => {
    if (doc.exists) {
      console.log("doc exists");
      item = doc.data().cartDetails;
    }

    if (item.findIndex(a => a.ProductID === productID) >= 0)
      item.splice(item.findIndex(a => a.ProductID === productID), 1);

    item.push({
      ItemName: itemName,
      SelectedsubItem: itemSelect.value,
      Quantity: itemQuantity,
      ProductID: productID,
      Status: itemQualityStatus
    });
    console.log(item, userID);
    db.collection('CartDetails')
      .doc(userID)
      .set({
        uid: userID,
        cartDetails: firebase.firestore.FeildValue.arrayUnion(item),
        CreatedTimestamp: '',
        UpdatedTimestamp: (new Date()).toString()
      })
      .then(() => {
        // updated
        console.log('Users data saved successfully');

        // Show alert
        //document.querySelector('.alert').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function() {
          //document.querySelector('.alert').style.display = 'none';
        }, 3000);


        // window.location.href = "../admin/dashboard.html";
      })
      .catch((error) => {
        // An error occurred
        // console.log(error.message);
        console.log("in error");
        document.getElementById('errorMessage').innerHTML = error.message;
        document.getElementById('errorMessage').style.display = 'block';
      });


  });




}

var removeByAttr = function(arr, attr, value) {
  console.log("in remove");
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
