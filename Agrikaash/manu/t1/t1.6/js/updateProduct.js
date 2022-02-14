//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
var productCategory = [];
var isAdmin = false;
var userRole = [];
var count;
var pID;

var buisinessType = "";
var productType = "";

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      document.getElementById('loading').style.display = 'none';

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
        userID = doc.data().uid;
        userRole = doc.data().UserRole;
        if (userRole != undefined) {
          if (userRole.findIndex(e => e.Value === "Admin") >= 0) {
            isAdmin = true;

          } else {
            isAdmin = false;
          }
        } else {
          isAdmin = false;

        }
        if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;

        document.getElementById('profileName').innerHTML = doc.data().displayName;


        if (isAdmin === true) {
          db.collection('CollectionStatistics').get().then((changes) => {
            changes.forEach(change => {

              count = change.data().ProductCount;
              //            count = count + 1;
              pID = change.id;
            });
          });

          populateProductData('', '');
        } else {
          document.getElementById('confirmationMessage').style.display = "block";
          document.getElementById('divDetails').style.display = "none";
          document.getElementById('divBottomNavBar').style.display = "none";
        }
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function createProduct() {
  window.location.href = "createProduct.html";
}

function emptyDiv(div) {
  div.innerHTML = '';
}


function inputSearchFocus() {
  document.getElementById("idItem").style.display = "block";
  document.getElementById("wrongSearch").style.display = "none";

}

function filterFunction() {
  console.log('hi');
  var input, filter, ul, li, a, i;
  var search;
  input = document.getElementById("myInput");
  filter = input.children[0].value.toUpperCase();
  //  console.log(filter);
  div = document.getElementById("idItem");
  a = div.getElementsByTagName("button");
  for (i = 0; i < a.length; i++) {
    //console.log(document.getElementById("hfSearchID" + i).value);
    //console.log(a[i].textContent);
    //console.log(a[i].innerText);
    txtValue = a[i].innerText + " " + document.getElementById("hfSearchID" + i).value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}



function myChangeEvent() {
  console.log('myChangeEvent');
  document.getElementById("wrongSearch").style.display = "none";

  document.getElementById("productRow").innerHTML = "";
  var noFlag = false;
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
    txtValue = a[i].innerText + " " + document.getElementById("hfSearchID" + i).value;
    //    txtValue = a[i].textContent || a[i].innerText;
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
  if (noFlag === false) {
    document.getElementById("searchKeyText").innerHTML = filter;
    document.getElementById("wrongSearch").style.display = "block";

  }
  console.log("before display none");
  document.getElementById("idItem").style.display = "none";
  document.getElementById("myInput").children[0].blur();
  // myDropdown.classList.remove("show");
  // serachDiv.classList.remove("open");
}



function RenderProductByProducrID(productList, callCount) {

  var DBrows = db.collection("Products")
    .where("__name__", "in", productList)
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


}


function showItem(itemname) {

  // var myDropdown = document.getElementById('myDropdown');
  // var serachDiv = document.getElementById('serachDiv');

  //console.log(itemname);

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
      renderProductNew(doc, 0);
      document.getElementById("idItem").style.display = "none";
      document.getElementById("myInput").children[0].blur();


    }
  });
}

function populateProductData(bType, pType) {
  buisinessType = bType;
  productType = pType;
  //var DBrows = db.collection("Products").where("OrganizationId", "==", Number(organizationid)).get();
  var divPType = document.getElementById('productCategory');
  var divPList = document.getElementById('productRow');
  emptyDiv(divPList);
  emptyDiv(divPType);
  var prodType = [];
  var cnt = document.getElementById("categoryCnt").value;
  //console.log(cnt);
  for (var i = 0; i < Number(cnt); i++) {
    $('#category-list').trigger('remove.owl.carousel', [i]).trigger('refresh.owl.carousel');
  }

  var DBrows;
  if ((pType === '' || pType === 'All') && (bType === '' || bType === 'All')) //Select all products
  {
    DBrows = db.collection("Products").orderBy("Status").orderBy('CreatedTimestamp', 'desc');
  } else if ((pType === '' || pType === 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    prodType = ['All', bType]
    DBrows = db.collection("Products").where("CustomerBusinessType", "in", prodType).orderBy("Status").orderBy('CreatedTimestamp', 'desc');
  } else if ((pType != '' && pType != 'All') && (bType === '' || bType === 'All')) //select one customer businessType
  {
    DBrows = db.collection("Products").where("productType", "==", pType).orderBy("Status").orderBy('CreatedTimestamp', 'desc');
  } else if ((pType != '' && pType != 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    prodType = ['All', bType];
    DBrows = db.collection("Products").where("productType", "==", pType).where("CustomerBusinessType", "in", prodType).orderBy("Status").orderBy('CreatedTimestamp', 'desc');
  }



  // DBrows.then((changes) => {
  DBrows.onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();

    var item = [];
    var index = 0;
    var selectedindex = -1;
    var selectdedItem;
    productCategory.push('All');
    var productName = "";
    var searchKey = "";
    changes.forEach(change => {
      //if (change.type == 'added')
      {
        var pCategory = change.doc.data().productType;
        productCategory.push(pCategory)

      }
      productName = change.doc.data().ProductName;
      if (change.doc.data().SearchKey === undefined || change.doc.data().SearchKey === "") {
        searchKey = productName;
      } else {
        searchKey = change.doc.data().SearchKey;
      }

      //console.log(change.doc.data());
      if ((pType === '' || pType === 'All') && (bType === '' || bType === 'All')) //Select all products
      {
        var anchorB = document.createElement("button");
        anchorB.setAttribute("onclick", "showItem('" + change.doc.id + "')");
        anchorB.innerHTML = productName;

        var hfID = document.createElement("input");
        hfID.setAttribute("type", "hidden");
        hfID.setAttribute("id", "hdID" + index);
        hfID.setAttribute("value", change.doc.id);

        anchorB.appendChild(hfID);

        var hfSearchID = document.createElement("input");
        hfSearchID.setAttribute("type", "hidden");
        hfSearchID.setAttribute("id", "hfSearchID" + index);
        hfSearchID.setAttribute("value", searchKey);

        anchorB.appendChild(hfSearchID);

        document.getElementById("idItem").appendChild(anchorB);
      }
      renderProductNew(change.doc, index);
      index = index + 1;

    });
    document.getElementById("itemCnt").innerHTML = index + " Items";
    var unique = productCategory.filter(onlyUnique);
    renderProductCategory(unique, pType);
    document.getElementById("categoryCnt").value = unique.length;

    //anchorlLnkClick();
    document.getElementById('loading').style.display = 'none';

    //  });
  });
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


function clearSelection() {
  var cnt = document.getElementById("categoryCnt").value;
  //console.log(document.getElementById("categoryCnt").value);
  for (i = 0; i < cnt; i++) {
    var anchor = document.getElementById("anchor" + i);
    anchor.setAttribute("class", "category-list-menu");
  }
}

function renderProductCategory(productCategory, pType) {
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

function renderProductCategory1(productCategory) {

  var div = document.getElementById('productCategory');
  for (i = 0; i < productCategory.length; i++) {
    var idename = productCategory[i];
    idename = idename.replace(" ", "");
    console.log(idename);
    var anchor = document.createElement("a");
    anchor.setAttribute("id", "anchor" + idename)
    //anchor.setAttribute("href", "javascript:callFunction('" + productCategory[i] + "');");
    //anchor.setAttribute("href", "javascript:callFunction('" + productCategory[i] + "');");
    anchor.innerHTML = productCategory[i];

    var span = document.createElement("span");
    span.innerHTML = "| ";

    div.appendChild(anchor);
    div.appendChild(span);
  }
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

  populateProductData(cType, productType);
  //renderProductNew(doc, index, selectedItem)
}

function callFunction(productType, objid) {
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

function callFunction1(productType) {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('hfpType').value = productType;

  var e = document.getElementById("businessType");
  var cType = e.options[e.selectedIndex].text;

  // var cType = document.getElementById('businessType').SelectedValue;
  populateProductData(cType, productType);
  //renderProductNew(doc, index, selectedItem)
}

function changCustomerType() {
  document.getElementById('loading').style.display = 'block';
  var productType = document.getElementById('hfpType').value;
  var e = document.getElementById("businessType");
  var cType = e.options[e.selectedIndex].text;
  populateProductData(cType, productType);
  //renderProductNew(doc, index, selectedItem)
}
/////////////////////new function
function renderProductNew(doc, index) {

  var productlist = doc.data().ProductDetails;
  var productUnitPrice = 0;
  if (doc.data().UnitPrice != undefined)
    productUnitPrice = doc.data().UnitPrice;
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("id", "mainDiv" + index);
  div1.setAttribute("style", "padding: 5px;");

  var div1_1 = document.createElement("div");
  div1_1.setAttribute("class", "product-list-div " + doc.data().productType);

  if (doc.data().Status === "Inactive") {
    var divP = document.createElement("div");
    divP.setAttribute("class", "inventory-quantity-level");
    var blink = document.createElement("blink");
    blink.innerHTML = "Inactive";
    divP.appendChild(blink);
    div1_1.appendChild(divP);
  }
  else if (doc.data().Status === "Out Of Stock") {
    var divP = document.createElement("div");
    divP.setAttribute("class", "inventory-quantity-level");
    var blink = document.createElement("blink");
    blink.innerHTML = "Out of Stock";
    divP.appendChild(blink);
    div1_1.appendChild(divP);
  } else if (doc.data().PromotionFlag === true) {
    var divP = document.createElement("div");
    divP.setAttribute("class", "inventory-quantity-level");
    divP.setAttribute("style", "background: #88CA5E;");
    var blink = document.createElement("blink");
    blink.innerHTML = doc.data().PromotionText;
    divP.appendChild(blink);
    div1_1.appendChild(divP);
  }

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

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetProductDetails(" + "hfID" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");

  td1.appendChild(i1);


  tr1.appendChild(td1);

  var td2 = document.createElement("td");
  td2.setAttribute("width", "55%");
  td2.setAttribute("valign", "top")
  td2.setAttribute("class", "product-names-div");


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
    td2.appendChild(div1_3);


      var s1 = document.createElement("small");
      s1.setAttribute("class", "product-names");
      s1.innerHTML = doc.data().ProductName;

      td2.appendChild(s1);
      var b1 = document.createElement("br");
      td2.appendChild(b1);


      var s2 = document.createElement("small");
      s2.setAttribute("style", "font-size: 0.8rem; color: rgba(0,0,0,0.5);");
      s2.innerHTML = doc.data().Brand;
      td2.appendChild(s2);
      var b2 = document.createElement("br");
      td2.appendChild(b2);
  // 
  // td2.innerHTML = "<small class='product-names'>" + doc.data().ProductName + "</small><br>" +
  //   "<small style='font-size: 0.8rem; color: rgba(0,0,0,0.5);'>" + doc.data().Brand + "</small><br>";

  var selectP = document.createElement("select");
  selectP.name = "productDetails";
  selectP.id = "productDetails" + index;
  selectP.setAttribute("id", "productDetails" + index);
  //selectP.setAttribute("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelectedValue" + index + "," + index + ",'" + doc.id + "'," + doc.data().MinimumQty + ")");
  var productWeightUnit = doc.data().ProductWeightUnit
  //  var productPurchasePrise = doc.data().ProductWeightUnit

  selectP.setAttribute("onchange", "mySelectionChange(" + index + ")");
  var indexnew = -1;
  var mrp = 0;
  var finalPrize = 0;
  var qtyNew = doc.data().MinimumQty;
  for (const val of productlist) {
    var option = document.createElement("option");
    option.setAttribute('style', 'color: black')
    option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
    // var productPurchasePrice = val.ProductPurchasePrice;
    var weights = val.ProductWeight.split(" ");
    if (productWeightUnit === undefined)
      productWeightUnit = weights[1];

    if (productUnitPrice === undefined || productUnitPrice === "" || productUnitPrice === "NA") {
      productPurchasePrice = 0
    } else {
      productPurchasePrice = Number(productUnitPrice) * Number(weights[0]);
    }
    var curFormat = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    };
    var margin = 0;
    if (productPurchasePrice === 0) {
      option.setAttribute("style", "color: red;");
      margin = "NA";
    } else {
      margin = Number(val.ProductFinalPrise) - Number(productPurchasePrice);
      margin = margin * 100 / Number(productPurchasePrice);
      if (margin < 10) {
        option.setAttribute("style", "color: red;");

      }
      margin = margin.toLocaleString('en-IN', curFormat);

      margin = margin + "%";
    }
    if (margin === "NA") {
      option.setAttribute("style", "color: red;");
    }
    // option.text = val.ProductWeight + " - " + "Rs." + productPurchasePrice + "/" + val.ProductFinalPrise + "("+margin+")";
    option.text = weights[0] + " " + productWeightUnit + " - " + "Rs." + productPurchasePrice + "/" + val.ProductFinalPrise + "(" + margin + ")";
    selectP.appendChild(option);
  }


  td2.appendChild(selectP);

  var div1_4 = document.createElement("div");
  div1_4.setAttribute("class", "product-price");

  div1_4.innerHTML = "<large>" + "<span><b>Location :  </b>" + doc.data().ProductLocation + "</span>" + "<large><br>" +
    "<large>" + "<span><b>Category :  </b>" + doc.data().productType + "</span>" + "<large><br><br>";


  var spanDelete = document.createElement('span');
  spanDelete.setAttribute("id", "btnDelete" + index);
  spanDelete.setAttribute("onclick", "deleteProduct(" + "hfID" + index + ",mainDiv" + index + ");");
  spanDelete.setAttribute("class", "material-icons");
  spanDelete.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
  spanDelete.innerHTML = "delete_outline";

  div1_4.appendChild(spanDelete);
  td2.appendChild(div1_4);
  tr1.appendChild(td2);
  table1.appendChild(tr1);
  div1_1.appendChild(table1);
  div1.appendChild(div1_1);

  var anchor = document.createElement("a");
  anchor.setAttribute("href", "createProduct.html?id=" + doc.id);

  //  anchor.appendChild(div1);
  document.getElementById("productRow").appendChild(div1);
  mySelectionChange(index)

}

function renderProductNewOld(doc, index) {

}

function mySelectionChange(index) {

  var element = document.getElementById("productDetails" + index);
  element.setAttribute("style", "color: black;");
  for (int = 0; int < element.options.length; int++) {
    //    console.log(element.options[int].style.color);
    if (element.options[int].selected && element.options[int].style.color === "red") {
      //    console.log("is red");
      element.setAttribute("style", "color: red;");
    }


  }
}

function GetProductDetails(productID) {
  window.location.href = "createProduct.html?id=" + productID.value;
}

function deleteProduct(productID, maindiv) {
  db.collection("Products").doc(productID.value).update({
      Status: "Inactive"
    })
    .then(function(docRef1) {
      //.delete();
      count = count - 1;
      console.log(count);

      db.collection("CollectionStatistics").doc(pID).update({
          ProductCount: count,
        })
        .then(function(docRef) {
          // console.log(Date.parse(eventstart))
        })
        .catch(function(error) {
          console.error("error adding document:", error);
        });
      populateProductData(buisinessType, productType);
    });
  //document.getElementById("productRow").removeChild(maindiv);
}

function anchorlLnkClick() {

  // $(window).load(function(){
  $('#anchorAll').click(function() {
    // hideall();
    // $('.all').toggle("slide");
    console.log('clicked all');
    $('.Goat').show("slide");
    $('.Vegetable').show("slide");
    $('.Pearl').show("slide");
    $('.Fruit').show("slide");
  });
  $('#anchorGoatProducts').click(function() {
    hideall();
    $('.Goat').show("fadeUp");
  });
  $('#anchorVegetable').click(function() {
    hideall();
    $('.Vegetable').show("slide");
  });
  $('#anchorPearl').click(function() {
    hideall();
    $('.Pearl').show("slide");
  });
  $('#anchorFruit').click(function() {
    hideall();
    $('.Fruit').show("slide");
  });

  function hideall() {
    $('.Goat').hide();
    $('.Vegetable').hide();
    $('.Pearl').hide();
    $('.Fruit').hide();
  };

}
