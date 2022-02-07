//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
var productCategory = [];
var isAdmin = false;
var userBusinessCategory = "";
var userLocation = "";
var productLocation = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      //        console.log(userBusinessCategory);
      // var promise = getCartItemNo();
      // var promise2 = promise.then(populateProductData('', ''));
      //promise2.then(console.log(productCategory));

      var siteNotification = localStorage.getItem("notificationCount");
      document.getElementById("notificationCnt").innerHTML = siteNotification;
      document.getElementById("notificationCnt1").innerHTML = siteNotification;


    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);


  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userRole = doc.data().UserRole;
        userLocation = doc.data().Address;
        if (userLocation != undefined)
          productLocation = ['All', userLocation];
        else {
          productLocation = ['All'];
        }
        //console.log(doc.data().CustomerType);
        userBusinessCategory = doc.data().CustomerType;
        //  console.log(userBusinessCategory);
        var business = document.getElementById("businessType");
        for (i = 0; i < business.options.length; i++) {
          //  console.log(business.options[i].value);
          if (business.options[i].value === userBusinessCategory)
            business.options[i].selected = true;
        }


        if (userRole != undefined) {
          if (userRole.findIndex(e => e.Value === "Admin") >= 0) {
            isAdmin = true;
            // document.getElementById("a4").href = "confirmRegistration.html";
            // var i4 = document.getElementById("i4");
            // i4.setAttribute("class", "fas fa-registered");
            // document.getElementById("small4").innerHTML = "Registration";
            // // var span4 = document.getElementById("cartItemNo");
            // span4.style.display = "none";

          } else {
            isAdmin = false;

            // var a5 = document.getElementById("a5");
            // a5.style.display = "none";
          }
        } else {
          {
            // var a5 = document.getElementById("a5");
            // a5.style.display = "none";
            // isAdmin = false;
          }
        }
        if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        document.getElementById('profileName').innerHTML = doc.data().displayName;

        var promise = getCartItemNo();
        // var promise2 = promise.then(populateProductData('', '', true));
        var promise2 = promise.then(populateProductData(userBusinessCategory, '', true));
        //  GetNotificationList();
        var siteNotification = localStorage.getItem("notificationCount");
        document.getElementById("notificationCnt").innerHTML = siteNotification;
        document.getElementById("notificationCnt1").innerHTML = siteNotification;


      }
    })


    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};


function GetNotificationList() {
  var index = 0;
  var flag = false;
  var today = new Date();

  const DBrows = db.collection('Notification')
    .where("Status", '==', 'Active')
    .where('ValidityTill', ">=", today)
  //.orderBy('CreatedTimestamp', 'desc');

  DBrows.onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
      var userListDB = change.doc.data().UserList;
      var userTypeDB = change.doc.data().UserType;

      if (userListDB === undefined)
        flag = true;
      else if (userListDB[0].userID === 'All')
        flag = true;
      else if (userListDB.findIndex(e => e.userID === userID) >= 0)
        flag = true;
      else if (userTypeDB === undefined)
        flag = true;
      else if (userTypeDB[0] === 'All')
        flag = true;
      else if (userTypeDB.indexOf(userBusinessCategory) >= 0)
        flag = true;
      if (flag === true) {
        index = index + 1;
      }
    });

    if (flag === true) {
      document.getElementById("notificationCnt").innerHTML = index;
    }

  });
}

async function getCartItemNo() {
  //console.log("getCartItemNo");
  var cartItemNo = document.getElementById('cartItemNo');
  //console.log(cartItemNo);
  const snapshotCart = db.collection('CartDetails').doc(userID);
  console.log('in getCartItemNo 1');
  snapshotCart.get().then((doc) => {
    if (doc.exists) {
      //console.log("doc exists");
      var itemlist = doc.data().cartDetails;
      //console.log(itemlist);
      console.log('in getCartItemNo 2');
      item = itemlist.length;
      cartItems = itemlist;
      // item = doc.data().cartDetails.length;
      //console.log(item[0]);
      cartItemNo.innerHTML = item;
    }
  });
};

function myChangeEvent() {
  console.log('myChnageEvent');
  document.getElementById("wrongSearch").style.display="none";

  document.getElementById("productRow").innerHTML = "";
  var noFlag= false;
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.children[0].value.toUpperCase();
  div = document.getElementById("idItem");
  a = div.getElementsByTagName("button");
  var hfid = "";
  var productList = [];
  var prodCnt = 0;
  var callCount = 1;
  for (i = 0; i < a.length; i++) {
    //txtValue = a[i].textContent || a[i].innerText;
    txtValue =  a[i].innerText  + " " + document.getElementById("hfSearchID" + i).value ;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      noFlag = true;;
      a[i].style.display = "";
      hfid = a[i].getElementsByTagName("input")[0];
      productList.push(hfid.value);
      prodCnt = prodCnt + 1;
      if (prodCnt === 10) {
        RenderProductByProducrID(productList, callCount);
        productList = [];
        prodCnt = 0;
        callCount = callCount + 1;
      }
    } else {
      a[i].style.display = "none";
    }
  }
  if (productList.length > 0) {

    RenderProductByProducrID(productList, callCount);
  }
  console.log(noFlag);
  if(noFlag === false)
  {
    document.getElementById("searchKeyText").innerHTML = filter;
    document.getElementById("wrongSearch").style.display="block";

  }
  console.log("before display none");
  document.getElementById("idItem").style.display = "none";
  document.getElementById("myInput").children[0].blur();
  // myDropdown.classList.remove("show");
  // serachDiv.classList.remove("open");
}


function myChangeEventOld() {
  console.log('myChnageEvent');
  document.getElementById("productRow").innerHTML = "";

  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.children[0].value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("button");
  var hfid = "";
  var productList = [];
  var prodCnt = 0;
  var callCount = 1;
  for (i = 0; i < a.length; i++) {
    //txtValue = a[i].textContent || a[i].innerText;
    txtValue =  a[i].innerText  + " " + document.getElementById("hfSearchID" + i).value ;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
      hfid = a[i].getElementsByTagName("input")[0];
      productList.push(hfid.value);
      prodCnt = prodCnt + 1;
      if (prodCnt === 10) {
        RenderProductByProducrID(productList, callCount);
        productList = [];
        prodCnt = 0;
        callCount = callCount + 1;
      }
    } else {
      a[i].style.display = "none";
    }
  }
  if (productList.length > 0) {

    RenderProductByProducrID(productList, callCount);
  }


  myDropdown.classList.remove("show");
  serachDiv.classList.remove("open");
}

function RenderProductByProducrID(productList, callCount) {

  var DBrows = db.collection("Products")
    .where("__name__", "in", productList)
    //    .where("ProductLocation", "in", productLocation)
    //.orderBy("ProductName")
    .get();
  DBrows.then((changes) => {
    var index = Number(callCount) * 10;
    var selectedindex = -1;
    var selectdedItem;
    //productCategory.push('All');
    changes.forEach(change => {
      //console.log('in for loop');
      var pCategory = change.data().productType;
      //productCategory.push(pCategory)
      //console.log(pCategory);
      if (cartItems != null) {
        selectedIndex = cartItems.findIndex(a => a.ProductID === change.id);

        if (selectedIndex >= 0) {
          selectdedItem = cartItems[selectedIndex];
        } else {
          selectdedItem = null;
        }
      } else {
        selectdedItem = null;
      }
      renderProductNew(change, index, selectdedItem);
      index = index + 1;
    });
  });

  var myDropdown = document.getElementById('myDropdown');
  var serachDiv = document.getElementById('serachDiv');
  myDropdown.classList.remove("show");
  serachDiv.classList.remove("open");


}

function emptyDiv(div) {
  div.innerHTML = '';
}
async function populateProductData(bType, pType, flag) {
  //var DBrows = db.collection("Products").where("OrganizationId", "==", Number(organizationid)).get();
  var divPType = document.getElementById('productCategory');
  var divPList = document.getElementById('productRow');
  var divPCList = document.getElementById('category-list');
  emptyDiv(divPList);
  emptyDiv(divPType);
  var prodType = [];

  var cnt = document.getElementById("categoryCnt").value;
  //console.log(cnt);
  for (var i = 0; i < Number(cnt); i++) {
    $('#category-list').trigger('remove.owl.carousel', [i]).trigger('refresh.owl.carousel');
  }
  var DBrows;
  //bType = userBusinessCategory;
  //console.log(bType);
  if ((pType === '' || pType === 'All') && (bType === '' || bType === 'All')) //Select all products
  {
    document.getElementById("idItem").innerHTML = "";

    console.log('All', 'All');
    DBrows = db.collection("Products")
      .where("ProductLocation", "in", productLocation)
      .where("Status", "==", "Active")
      .orderBy("ProductName").get();
  } else if ((pType === '' || pType === 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    console.log('All', bType);
    prodType = ['All', bType];
    DBrows = db.collection("Products")
      .where("CustomerBusinessType", "in", prodType)
      .where("ProductLocation", "in", productLocation)
      .where("Status", "==", "Active")
      .orderBy("ProductName").get();
  } else if ((pType != '' && pType != 'All') && (bType === '' || bType === 'All')) //select one customer businessType
  {

    //console.log(pType, 'All');
    DBrows = db.collection("Products")
      .where("productType", "==", pType)
      .where("ProductLocation", "in", productLocation)
      .where("Status", "==", "Active")
      .orderBy("ProductName").get();
  } else if ((pType != '' && pType != 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    console.log(pType, 'All');
    prodType = ['All', bType];
    DBrows = db.collection("Products")
      .where("productType", "==", pType)
      .where("CustomerBusinessType", "in", prodType)
      .where("ProductLocation", "in", productLocation)
      .where("Status", "==", "Active")
      .orderBy("ProductName").get();
  }

  DBrows.then((changes) => {
    var item = [];
    var index = 0;
    var selectedindex = -1;
    var selectdedItem;
    var productName ;
    var searchKey;
    productCategory.push('All');
    changes.forEach(change => {
      //if (change.type == 'added')
      {
        var pCategory = change.data().productType;
        productCategory.push(pCategory)

        if (cartItems != null) {
          selectedIndex = cartItems.findIndex(a => a.ProductID === change.id);

          if (selectedIndex >= 0) {
            selectdedItem = cartItems[selectedIndex];
          } else {
            selectdedItem = null;
          }
        } else {
          selectdedItem = null;
        }
      }

      productName = change.data().ProductName;
      if(change.data().SearchKey === undefined || change.data().SearchKey === "")
      {
        searchKey = productName;
      }
      else {
          searchKey = change.data().SearchKey;
      }


      if ((pType === '' || pType === 'All') && (bType === '' || bType === 'All')) //Select all products
      {
        var anchorB = document.createElement("button");
        anchorB.setAttribute("onclick", "showItem('" + change.id + "')");
        anchorB.innerHTML = productName;

        var hfID = document.createElement("input");
        hfID.setAttribute("type", "hidden");
        hfID.setAttribute("id", "hdID" + index);
        hfID.setAttribute("value", change.id);
        anchorB.appendChild(hfID);

          var hfSearchID = document.createElement("input");
          hfSearchID.setAttribute("type", "hidden");
          hfSearchID.setAttribute("id", "hfSearchID" + index);
          hfSearchID.setAttribute("value", searchKey);
          anchorB.appendChild(hfSearchID);

        document.getElementById("idItem").appendChild(anchorB);
      }
      renderProductNew(change, index, selectdedItem);
      index = index + 1;

    });
    document.getElementById("itemCnt").innerHTML = index + " Items";
    //if (flag === true)

    {
      // const myNode = document.getElementById("category-list");
      // while (myNode.lastElementChild) {
      //   console.log(myNode.lastElementChild);
      //   myNode.removeChild(myNode.lastElementChild);
      // }
      var unique = productCategory.filter(onlyUnique);

      //console.log(unique);
      renderProductCategory(unique, pType);
      document.getElementById("categoryCnt").value = unique.length;
    }
    document.getElementById('loading').style.display = 'none';

    //    init_carousel();
    //  });
  });
  console.log("before remove");
  // var myDropdown = document.getElementById('myDropdown');
  // var serachDiv = document.getElementById('serachDiv');
  // myDropdown.classList.remove("show");
  // serachDiv.classList.remove("open");

}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// function init_carousel() {
//     //$('.owl-carousel').owlCarousel();
//
//     $("#owl-carousel").owlCarousel({
//   navigation: true,
//   pagination: true,
//   slideSpeed: 1000,
//   stopOnHover: true,
//   autoPlay: true,
//   items: 7,
//   itemsDesktopSmall: [1024, 3],
//   itemsTablet: [600, 1],
//   itemsMobile: [479, 1]
// });
//  };

//  jQuery(document).ready(function() {
//    init_carousel();
// });

function renderProductCategory(productCategory, pType) {
  //console.log(pType);
  //var div = document.getElementById('category-list');

  for (i = 0; i < productCategory.length; i++) {
    var item = document.createElement("div");
    //div1.setAttribute("class","item");
    item.classList.add("item");

    var anchor = document.createElement("a");
    if (i === 0 && (pType === 'All' || pType === '')) {
      anchor.setAttribute("class", "category-list-menu active");
    } else if (productCategory[i] === pType) {
      anchor.setAttribute("class", "category-list-menu active");
    } else {
      anchor.setAttribute("class", "category-list-menu");
    }
    anchor.setAttribute("href", "javascript:callFunction('" + productCategory[i] + "'," + "anchor" + i + ");");
    anchor.setAttribute("id", "anchor" + i);
    anchor.setAttribute("style", "text-decoration:none;");

    var h11 = document.createElement("h5");
    h11.innerHTML = productCategory[i];

    anchor.appendChild(h11);
    item.appendChild(anchor);

    //div.carousel-inner
    //div.appendChild (div1);
    $('#category-list').trigger('add.owl.carousel', [item]).trigger('refresh.owl.carousel');

  }

}

function clearSelectionOld() {
  console.log('in clearSelection');
  var cnt = document.getElementById("categoryCnt").value;
  //console.log(document.getElementById("categoryCnt").value);
  for (i = 0; i < cnt; i++) {
    var anchor = document.getElementById("anchor" + i);
    anchor.setAttribute("class", "category-list-menu");
  }
}

function clearSelection() {
  console.log('in clearSelection');
  //console.log(document.getElementById("categoryCnt").value);
  var anchor = document.getElementById("allAnchor");
  anchor.setAttribute("class", "");

  anchor = document.getElementById("FruitAnchor");
  anchor.setAttribute("class", "");

  anchor = document.getElementById("VegetableAnchor");
  anchor.setAttribute("class", "");

}

function callFunctionOld(productType, objid) {
  console.log(objid);
  clearSelection();
  document.getElementById('loading').style.display = 'block';
  document.getElementById('hfpType').value = productType;

  var e = document.getElementById("businessType");
  var cType = e.options[e.selectedIndex].text;
  //console.log(cType);
  //console.log(productType);
  // var cType = document.getElementById('businessType').SelectedValue;
  objid.setAttribute("class", "category-list-menu active");

  populateProductData(cType, productType, false);
  //renderProductNew(doc, index, selectedItem)
}

function callFunction(productType, objid) {
  //console.log('objid');
  //console.log('productType');
  //clearSelection();
  document.getElementById('loading').style.display = 'block';
  document.getElementById('hfpType').value = productType;

  var e = document.getElementById("businessType");
  var cType = e.options[e.selectedIndex].text;
  //console.log(cType);
  //console.log(productType);
  // var cType = document.getElementById('businessType').SelectedValue;
  //objid.setAttribute("class", "category-list-menu active");
  if (productType === 'All') {
    var anchor = document.getElementById("allAnchor");
    anchor.setAttribute("class", "active");

    anchor = document.getElementById("FruitAnchor");
    anchor.setAttribute("class", "");

    anchor = document.getElementById("VegetableAnchor");
    anchor.setAttribute("class", "");

  } else if (productType === 'Vegetable') {
    var anchor = document.getElementById("allAnchor");
    anchor.setAttribute("class", "");

    anchor = document.getElementById("FruitAnchor");
    anchor.setAttribute("class", "");

    anchor = document.getElementById("VegetableAnchor");
    anchor.setAttribute("class", "active");

  } else if (productType === 'Fruit') {
    var anchor = document.getElementById("allAnchor");
    anchor.setAttribute("class", "");

    anchor = document.getElementById("FruitAnchor");
    anchor.setAttribute("class", "active");

    anchor = document.getElementById("VegetableAnchor");
    anchor.setAttribute("class", "");

  }
  populateProductData(cType, productType, false);
  //renderProductNew(doc, index, selectedItem)
}


function changCustomerType() {
  document.getElementById('loading').style.display = 'block';
  var productType = document.getElementById('hfpType').value;
  //console.log(productType);
  var e = document.getElementById("businessType");
  var cType = e.options[e.selectedIndex].text;
  //console.log(cType);
  populateProductData(cType, productType, false);
  //renderProductNew(doc, index, selectedItem)
}
/////////////////////new function
function renderProductNew(doc, index, selectedItem) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };


  var productlist = doc.data().ProductDetails;

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("style", "padding: 5px;");

  var div1_1 = document.createElement("div");
  div1_1.setAttribute("class", "product-list-div");

  var table1 = document.createElement("table");
  table1.setAttribute("width", "100%");
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
  img1.setAttribute("width", "100%");
  img1.setAttribute("class", "product-img");
  img1.setAttribute("alt", "Product");
  td1.appendChild(img1);


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
  //console.log(doc.data().ProductName);
  //console.log(doc.id);
  var td2 = document.createElement("td");
  td2.setAttribute("width", "55%");
  td2.setAttribute("valign", "top")
  td2.setAttribute("class", "product-names-div product-select");
  td2.innerHTML = "<small class='product-names'>" + doc.data().ProductName + "</small><br>" +
    "<small style='font-size: 0.8rem; color: rgba(0,0,0,0.5);'>" + doc.data().Brand + "</small><br>";

  var selectP = document.createElement("select");
  selectP.setAttribute("name", "productDetails" + index);
  //selectP.setAttribute("disabled", false);
  selectP.setAttribute("id", "productDetails" + index);
  selectP.setAttribute("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelectedValue" + index + "," + index + ",'" + doc.id + "'," + doc.data().MinimumQty + ")");
  //selectP.addEventListener("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelectedValue" + index + ","+index+")");
  var indexnew = -1;
  var mrp = 0;
  var finalPrize = 0;
  var qtyNew = doc.data().MinimumQty;
  //console.log(productlist.length);

  for (const val of productlist) {
    var option = document.createElement("option");
    option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
    option.text = val.ProductWeight + " - " + "Rs." + val.ProductFinalPrise;
    if (selectedItem != null) {
      if (option.text === selectedItem.SelectedsubItem) {
        option.selected = true;

        if (qtyNew === doc.data().MinimumQty)
          qtyNew = selectedItem.Quantity;
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

    //console.log(option);
    selectP.add(option, undefined);
    // selectP.appendChild(option);

  }
  var hfSelecttion = document.createElement("input");
  hfSelecttion.setAttribute("id", "hfSelectedValue" + index);
  hfSelecttion.setAttribute("type", "hidden");
  //console.log(selectP[0]);
  if (selectP.selectedIndex >= 0)
    hfSelecttion.setAttribute("value", selectP[selectP.selectedIndex].text);
  else {
    hfSelecttion.setAttribute("value", "");

  }
  //console.log("hfSelecttion : ", hfSelecttion);
  //console.log("mrp : ", mrp);
  //console.log("finalprize : ", finalPrize);

  td2.appendChild(hfSelecttion);
  td2.appendChild(selectP);
  var div1_4 = document.createElement("div");
  div1_4.setAttribute("class", "product-price");

  // div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + productlist[0].ProductMRP + "</span>" + "</h5>" +
  //   "<small>₹ " + "<span id='final" + index + "'>" + productlist[0].ProductFinalPrise + "</span></small>";
  if (selectedItem != null) {
    div1_4.innerHTML = "<h5>" + "<span id='mrp" + index + "' >" + Number(mrp).toLocaleString('en-IN', curFormat) + "</span>" + "</h5>" +
      "<small> " + "<span id='final" + index + "'>" + Number(finalPrize).toLocaleString('en-IN', curFormat) + "</span></small>";

  } else {

    div1_4.innerHTML = "<h5>" + "<span id='mrp" + index + "' >" + Number(productlist[0].ProductMRP).toLocaleString('en-IN', curFormat) + "</span>" + "</h5>" +
      "<small> " + "<span id='final" + index + "'>" + Number(productlist[0].ProductFinalPrise).toLocaleString('en-IN', curFormat) + "</span></small>";

  }

  var table2 = document.createElement("table");
  table2.setAttribute("style", "width:51%;position:absolute;bottom:10px;right:10px;");

  var t2tr = document.createElement("tr");
  var t2trtd = document.createElement("td");
  t2trtd.setAttribute("width", "100%");
  t2trtd.setAttribute("class", "quantity-td product-btn-div");
  var trdiv = document.createElement("div");
  // trdiv.setAttribute("id", "quantityFullDiv" + index);
  trdiv.setAttribute("class", "quantity buttons_added");

  var divNewQty = document.createElement("div");
  divNewQty.setAttribute("class", "");
  divNewQty.setAttribute("id", "quantityFullDiv" + index);

  divNewQty.setAttribute("style", "display: block;");


  var buttonA = document.createElement("a");
  buttonA.setAttribute('href', '#');
  buttonA.setAttribute("id", "btnAddtoCart" + index);
  // buttonA.setAttribute("onclick", "addToCart(" + doc.data().MinimumQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "'," + index + ")");
  buttonA.addEventListener("click", function(e) {
    addToCart(e, doc.data().MinimumQty, doc.data().ProductName, doc.id, selectP[selectP.selectedIndex].text, index)
  }, false);

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
    divNewQty.style.display = "block";
    // trinput1.style.visibility = 'visible';
    // trinput2.style.visibility = 'visible';
    // trinput3.style.visibility = 'visible';
  } else {
    buttonA.style.display = 'block';

    divNewQty.style.display = "none";
    // trinput1.style.visibility = 'hidden';
    // trinput2.style.visibility = 'hidden';
    // trinput3.style.visibility = 'hidden';
  }
  // divNewQty.appendChild()

  divNewQty.appendChild(trinput1);
  divNewQty.appendChild(trinput2);
  divNewQty.appendChild(trinput3);
  divNewQty.appendChild(trinput4);
  divNewQty.appendChild(trinput5);
  divNewQty.appendChild(trinput6);

  trdiv.appendChild(divNewQty);
  // trdiv.appendChild(trinput1);
  // trdiv.appendChild(trinput2);
  // trdiv.appendChild(trinput3);
  // trdiv.appendChild(trinput4);
  // trdiv.appendChild(trinput5);
  // trdiv.appendChild(trinput6);

  buttonA.appendChild(addToCartBtn);
  t2trtd.appendChild(buttonA);

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

  var divQty = document.getElementById("quantityFullDiv" + index);
  if (blflag === true) {
    //console.log(buttonA);
    buttonA.style.display = 'block';

    divQty.style.display = "none";
    // minB.style.visibility = 'hidden';
    // qtyB.style.visibility = 'hidden';
    // plusB.style.visibility = 'hidden';
  } else {
    buttonA.style.display = 'none';
    divQty.style.display = "block";
    // minB.style.visibility = 'visible';
    // qtyB.style.visibility = 'visible';
    // plusB.style.visibility = 'visible';
  }
  //console.log(document.getElementById("productDetails"+index));
  document.getElementById("productDetails" + index).focus();

}

function addToCart(e, minQty, itemName, productID, itemSizeObj, index) {
  e.preventDefault();
  //console.log(minQty);
  //console.log(itemName);
  //console.log(productID);
  //console.log(itemSizeObj);
  var obj = document.getElementById("hfSelectedValue" + index);
  //console.log(obj);
  //AddUpdateCart(itemName, itemSizeObj, minQty, productID, 'active');
  AddUpdateCart(itemName, obj.value, minQty, productID, 'active');
  //document.getElementById("productDetails"+index).focus();
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

  // const snapshot = db.collection('CartDetails').doc(userID);
  // snapshot.get().then((doc) => {
  // item = cartItems;

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

      //      populateProductData();
      ChangeAddButtonVisible(index, true);
    })
    .catch((error) => {
      //  return index;
      console.log("in error");
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
    });



}

function mySelectionChange(productdetails, mrp, final, hfSelected, index, lproductID, minQty) {
  console.log("in function");
  //alert(productdetails);
  //alert(productdetails.selectedIndex);
  //console.log(productdetails);
  console.log(mrp);
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
  console.log(" selIndex", selIndex);
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

  console.log(userID);
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
      UpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
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


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

function showSearchInput() {
  var myDropdown = document.getElementById('myDropdown');
  var serachDiv = document.getElementById('serachDiv');
  myDropdown.classList.toggle("show");
  serachDiv.classList.toggle("open");
  // console.log(document.getElementById("myInput").children[0]);
  console.log(document.getElementById("myInput").children[0].value);
  if (serachDiv.classList.contains('open')) {
    document.getElementById("myInput").children[0].focus();

    if (document.getElementById("myInput").children[0].value === "") {
      console.log("get all element");
      //  myChangeEvent();
      //populateProductData(userBusinessCategory, '', true);
      //myDropdown.classList.remove("show");
      //serachDiv.classList.remove("open");

    }
  }

}

function showItem(itemname) {

  var myDropdown = document.getElementById('myDropdown');
  var serachDiv = document.getElementById('serachDiv');

  console.log(itemname);

  const snapshot = db.collection('Products').doc(itemname);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {

      var pCategory = doc.data().productType;

      if (cartItems != null) {
        selectedIndex = cartItems.findIndex(a => a.ProductID === doc.id);

        if (selectedIndex >= 0) {
          selectdedItem = cartItems[selectedIndex];
        } else {
          selectdedItem = null;
        }
      } else {
        selectdedItem = null;
      }

      document.getElementById("productRow").innerHTML = "";

      //document.getElementById("idItem").innerHTML ="";

      renderProductNew(doc, 0, selectdedItem);
      var myDropdown = document.getElementById('myDropdown');
      var serachDiv = document.getElementById('serachDiv');

      myDropdown.classList.remove("show");
      serachDiv.classList.remove("open");
      console.log("before none");
      document.getElementById("idItem").style.display = "none";
      document.getElementById("myInput").children[0].blur();


    }
  });
}

function inputSearchFocus() {
  document.getElementById("idItem").style.display = "block";
  document.getElementById("wrongSearch").style.display="none";

}

function filterFunction() {
  console.log('hi');
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.children[0].value.toUpperCase();
  //  console.log(filter);
  div = document.getElementById("idItem");
  a = div.getElementsByTagName("button");
  for (i = 0; i < a.length; i++) {
    //txtValue = a[i].textContent || a[i].innerText;
    txtValue =  a[i].innerText  + " " + document.getElementById("hfSearchID" + i).value ;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function filterFunctionOld() {
  console.log('hi');
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.children[0].value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("button");
  for (i = 0; i < a.length; i++) {
    //txtValue = a[i].textContent || a[i].innerText;
    txtValue =  a[i].innerText  + " " + document.getElementById("hfSearchID" + i).value ;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
