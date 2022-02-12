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
var filter = "All";
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
          // console.log("before call populateProductData 2");
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
      // console.log("before call 1");
      renderProductNew(change, index);
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
      // console.log("before call 2");

      renderProductNew(doc, 0);
      document.getElementById("idItem").style.display = "none";
      document.getElementById("myInput").children[0].blur();


    }
  });
}

function populateProductData(bType, pType) {
  console.log('populateProductData', bType, pType);
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
    console.log("in loop1");
    if (filter === "All") {
      DBrows = db.collection("Products").orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Low") {
      DBrows = db.collection("Products").where("AvailableQuantity", "<", 20).orderBy("AvailableQuantity").orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Medium") {
      DBrows = db.collection("Products").where("AvailableQuantity", ">=", 20).where("AvailableQuantity", "<", 50).orderBy("AvailableQuantity").orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "High") {
      DBrows = db.collection("Products").where("AvailableQuantity", ">=", 50).orderBy("AvailableQuantity").orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    }

  } else if ((pType === '' || pType === 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    console.log("in loop2");
    prodType = ['All', bType]
    if (filter === "All") {
      DBrows = db.collection("Products").where("CustomerBusinessType", "in", prodType).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Low") {
      DBrows = db.collection("Products").where("CustomerBusinessType", "in", prodType).where("AvailableQuantity", "<", 20).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Medium") {
      DBrows = db.collection("Products").where("CustomerBusinessType", "in", prodType).where("AvailableQuantity", ">=", 20).where("AvailableQuantity", "<", 50).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "High") {
      DBrows = db.collection("Products").where("CustomerBusinessType", "in", prodType).where("AvailableQuantity", ">=", 50).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    }
  } else if ((pType != '' && pType != 'All') && (bType === '' || bType === 'All')) //select one customer businessType
  {
    console.log("in loop3 : ", filter);
    if (filter === "All") {
      DBrows = db.collection("Products").where("productType", "==", pType).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Low") {
      DBrows = db.collection("Products").where("productType", "==", pType).where("AvailableQuantity", "<", 20).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Medium") {
      DBrows = db.collection("Products").where("productType", "==", pType).where("AvailableQuantity", ">=", 20).where("AvailableQuantity", "<", 50).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "High") {
      DBrows = db.collection("Products").where("productType", "==", pType).where("AvailableQuantity", ">=", 50).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    }
  } else if ((pType != '' && pType != 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    console.log("in loop4");
    prodType = ['All', bType];
    if (filter === "All") {
      DBrows = db.collection("Products").where("productType", "==", pType).where("CustomerBusinessType", "in", prodType).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Low") {
      DBrows = db.collection("Products").where("productType", "==", pType).where("CustomerBusinessType", "in", prodType).where("AvailableQuantity", "<", 20).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "Medium") {
      DBrows = db.collection("Products").where("productType", "==", pType).where("CustomerBusinessType", "in", prodType).where("AvailableQuantity", ">=", 20).where("AvailableQuantity", "<", 50).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    } else if (filter === "High") {
      DBrows = db.collection("Products").where("productType", "==", pType).where("CustomerBusinessType", "in", prodType).where("AvailableQuantity", ">=", 50).orderBy("Status").orderBy('CreatedTimestamp', 'desc').get();
    }

  }
  //  console.log(DBrows);
  // DBrows.then((changes) => {
  DBrows.then((snapshot) => {
    //let changes = snapshot.docChanges();

    var item = [];
    var index = 0;
    var selectedindex = -1;
    var selectdedItem;
    productCategory.push('All');
    var productName = "";
    var searchKey = "";
    snapshot.forEach(change => {
      //if (change.type == 'added')
      {
        var pCategory = change.data().productType;
        productCategory.push(pCategory)

      }
      productName = change.data().ProductName;
      if (change.data().SearchKey === undefined || change.data().SearchKey === "") {
        searchKey = productName;
      } else {
        searchKey = change.data().SearchKey;
      }

      //console.log(change.doc.data());
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
      // console.log("before call 3");

      renderProductNew(change, index);
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
//
// function callFunctionOld(productType, objid) {
//   console.log(objid);
//   clearSelection();
//   document.getElementById('loading').style.display = 'block';
//   document.getElementById('hfpType').value = productType;
//
//   var e = document.getElementById("businessType");
//   var cType = e.options[e.selectedIndex].text;
//   //console.log(cType);
//   //console.log(productType);
//   // var cType = document.getElementById('businessType').SelectedValue;
//   objid.setAttribute("class", "category-list-menu active");
//
//   populateProductData(cType, productType);
//   //renderProductNew(doc, index, selectedItem)
// }

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
  // console.log("before call populateProductData 1");
  populateProductData(cType, productType);
  //renderProductNew(doc, index, selectedItem)
}
//
// function callFunction1(productType) {
//   document.getElementById('loading').style.display = 'block';
//   document.getElementById('hfpType').value = productType;
//
//   var e = document.getElementById("businessType");
//   var cType = e.options[e.selectedIndex].text;
//
//   // var cType = document.getElementById('businessType').SelectedValue;
//   populateProductData(cType, productType);
//   //renderProductNew(doc, index, selectedItem)
// }
//
// function changCustomerType() {
//   document.getElementById('loading').style.display = 'block';
//   var productType = document.getElementById('hfpType').value;
//   var e = document.getElementById("businessType");
//   var cType = e.options[e.selectedIndex].text;
//   populateProductData(cType, productType);
//   //renderProductNew(doc, index, selectedItem)
// }
/////////////////////new function

function changeFilter() {
  var ofilter = document.getElementById("filter");

  filter = ofilter.options[ofilter.selectedIndex].value;
  console.log(filter);
  populateProductData(buisinessType, productType);
}

function renderProductNew(doc, index) {
  // console.log(doc, index);
  var productlist = doc.data().ProductDetails;
  var productWeightUnit = doc.data().ProductWeightUnit;
  var availableQty = doc.data().AvailableQuantity;
  if (productWeightUnit === undefined) {
    productWeightUnit = productlist[0].ProductWeight.split(" ")[1];
  }
  if (availableQty === undefined) {
    availableQty = 0;
  }


  // console.log( productWeightUnit);
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("id", "mainDiv" + index);

  var div2 = document.createElement("div");
  div2.setAttribute("class", "product-list-div " + doc.data().productType);
  div2.setAttribute("style", "padding: 0 0 10px 0;");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "inventory-quantity-level");
  if (availableQty < 20) {
    div3.innerHTML = "Low Vol.";
  } else if (availableQty < 50) {
    div3.setAttribute("style", "background:orange;");
    div3.innerHTML = "Medium Vol.";
  } else {
    div3.setAttribute("style", "background: #88CA5E;");
    div3.innerHTML = "High Vol.";
  }
  div2.appendChild(div3);

  var table1 = document.createElement("table");
  table1.setAttribute("width", "100%");

  var tr1 = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.setAttribute("width", "35%");
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
  tr1.appendChild(td1);

  var td2 = document.createElement("td");
  td2.setAttribute("width", "65%");
  td2.setAttribute("valign", "top")
  td2.setAttribute("class", "product-names-div");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "row no-gutters");

  var div5 = document.createElement("div");
  div5.setAttribute("class", "col-5");

  var s1 = document.createElement("small");
  s1.setAttribute("class", "product-names");
  s1.innerHTML = doc.data().ProductName;
  div5.appendChild(s1);


  var s2 = document.createElement("small");
  s2.setAttribute("style", "font-size: 0.8rem; color: rgba(0,0,0,0.5);");
  s2.innerHTML = doc.data().Brand;
  div5.appendChild(s2);

  div4.appendChild(div5);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "col-7");


  var div7 = document.createElement("div");
  div7.setAttribute("class", "");

  var s7 = document.createElement("span");
  s7.setAttribute("style", "font-size: 3rem; color: #666;");
  s7.setAttribute("id", "qty" + index);
  s7.innerHTML = availableQty;
  div7.appendChild(s7);

  var s8 = document.createElement("span");
  s8.setAttribute("style", "font-size: 0.7rem; color: #666;");
  s8.setAttribute("id", "weightUnit" + index);
  s8.innerHTML = productWeightUnit;
  div7.appendChild(s8);
  div6.appendChild(div7);

  var s9 = document.createElement("small");
  s9.setAttribute("style", "color:#666;font-size: 0.7rem;font-weight: bold;");
  s9.innerHTML = "Scrap Qty";
  div6.appendChild(s9);

  var br1 = document.createElement("br");
  div6.appendChild(br1);

  var div8 = document.createElement("div");
  div8.setAttribute("class", "inventory-scrap-input");

  var input11 = document.createElement("input");
  input11.setAttribute("maxlength", "4");

  input11.setAttribute("style", "width: 80%;font-size: 2rem;");
  input11.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
  input11.setAttribute("placeholder", "0");
  input11.setAttribute("type", "number");
  input11.setAttribute("readonly", "true");
  input11.setAttribute("onchange", "updateScrap(" + index + ")");
  input11.setAttribute("min", "0");
  input11.setAttribute("id", "scrapQty" + index);
  div8.appendChild(input11);

  var s10 = document.createElement("span");
  s10.setAttribute("style", "padding: 0 10px;font-size: 1.2rem; color: #666;");
  s10.setAttribute("class", "material-icons-outlined");
  s10.setAttribute("id", "edit" + index);

  s10.setAttribute("onclick", "editSracpQty(" + index + ")");
  s10.innerHTML = "edit";
  div8.appendChild(s10);

  div6.appendChild(div8);

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  var today = new Date();
  today = today.toLocaleDateString("en-US", options);
  var s11 = document.createElement("small");

  s11.setAttribute("style", "color:#666;font-size: 0.7rem;");
  s11.innerHTML = today;

  div6.appendChild(s11);
  div4.appendChild(div6);
  td2.appendChild(div4);
  tr1.appendChild(td2);
  table1.appendChild(tr1);

  div2.appendChild(table1);

  div1.appendChild(div2);

  document.getElementById("productRow").appendChild(div1);
}

async function updateScrap(index) {
  var weightUnit = document.getElementById("weightUnit" + index);
  var edit = document.getElementById("edit" + index);
  var scrap = document.getElementById("scrapQty" + index);
  var qty = document.getElementById("qty" + index);
  var hfID = document.getElementById("hfID" + index);
  var cntItem = 0;
  if (scrap.value != 0) {
    //update inventory
    var doc = await db.collection("ProductsInventory").doc(hfID.value).get();
    console.log(cntItem);
    if (doc.exists) {
      console.log(doc.data().AvailableQuantity);
      cntItem = Number(doc.data().AvailableQuantity) - Number(scrap.value);
      console.log(doc.id, cntItem);
      const updateInventory = await db.collection("ProductsInventory").doc(hfID.value).update({
        AvailableQuantity: Number(cntItem),
        LastUpdatedBy: auth.currentUser.email,
        LastUpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
      });
    } else {
      console.log(cntItem, doc.id);
      const addInventory = await db.collection("ProductsInventory").doc(hfID.value).set({
        AvailableQuantity: Number(cntItem),
        LastUpdatedBy: auth.currentUser.email,
        LastUpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
      });
    }
    console.log(doc.id, cntItem);
    const productawait = await db.collection("Products").doc(hfID.value).update({
      AvailableQuantity: Number(cntItem)
    });

    const purchaseQty = await db.collection("PurchaseBook").add({
      ProductId: hfID.value,
      QuantityPurchased: (-1 * Number(scrap.value)),
      Unit: weightUnit.innerHTML,
      UnitPrize: 0,
      Remarks: 'Scraped product by Admin',
      CreatedBy: auth.currentUser.email,
      CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
    console.log(purchaseQty.id);

  }
  qty.innerHTML = cntItem;
  edit.setAttribute("style", "padding: 0 10px;font-size: 1.2rem; color: #88CA5E;");
  edit.innerHTML = "check";
  scrap.value = "0";

  setTimeout(function() {
    edit.setAttribute("style", "padding: 0 10px;font-size: 1.2rem; color: #666;");
    edit.innerHTML = "edit";

  }, 5000);


}

function editSracpQty(index) {
  console.log(index);
  if (document.getElementById("edit" + index).innerHTML === "edit") {
    var scrap = document.getElementById("scrapQty" + index);
    scrap.removeAttribute("readonly");
    scrap.focus();
  }
}
// function renderProductNew11(doc, index) {
//   // console.log(doc, index);
//   var productlist = doc.data().ProductDetails;
//   var productWeightUnit = doc.data().ProductWeightUnit;
//   var availableQty = doc.data().AvailableQuantity;
//   if (productWeightUnit === undefined) {
//     productWeightUnit = productlist[0].ProductWeight.split(" ")[1];
//   }
//   if (availableQty === undefined) {
//     availableQty = 0;
//   }
//
//
//   // console.log( productWeightUnit);
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-sm-12");
//   div1.setAttribute("id", "mainDiv" + index);
//
//   var div2 = document.createElement("div");
//   div2.setAttribute("class", "product-list-div " + doc.data().productType);
//
//   var table1 = document.createElement("table");
//   table1.setAttribute("width", "100%");
//
//   var tr1 = document.createElement("tr");
//
//   var td1 = document.createElement("td");
//   td1.setAttribute("width", "45%");
//   td1.setAttribute("class", "product-img-td");;
//
//   var hfID = document.createElement("input");
//   hfID.setAttribute("id", "hfID" + index);
//   hfID.setAttribute("type", "hidden");
//   hfID.setAttribute("value", doc.id);
//   td1.appendChild(hfID);
//
//   var s1 = document.createElement("small");
//   s1.setAttribute("class", "product-names");
//   s1.innerHTML = doc.data().ProductName;
//   td1.appendChild(s1);
//
//   var br1 = document.createElement("br");
//   td1.appendChild(br1);
//
//   var s2 = document.createElement("small");
//   s2.setAttribute("style", "font-size: 0.8rem; color: rgba(0,0,0,0.5);");
//   s2.innerHTML = doc.data().Brand;
//   td1.appendChild(s2);
//
//
//   var img1 = document.createElement("img");
//   img1.setAttribute("src", doc.data().ProductImageURL);
//   img1.setAttribute("width", "100%");
//   img1.setAttribute("class", "product-img");
//   img1.setAttribute("alt", "Product");
//   td1.appendChild(img1);
//
//   tr1.appendChild(td1);
//
//   var td2 = document.createElement("td");
//   td2.setAttribute("width", "65%");
//   td2.setAttribute("valign", "top")
//   td2.setAttribute("class", "product-names-div");
//
//   var div3 = document.createElement("div");
//   div3.setAttribute("class", "row no-gutters");
//   div3.setAttribute("style", "padding: 0 5px;");
//
//   var div4 = document.createElement("div");
//   div4.setAttribute("class", "col-6");
//   div4.setAttribute("style", "padding: 0 5px;pointer-events: none");
//
//   var input1 = document.createElement("input");
//   input1.setAttribute("type", "radio");
//   if (productWeightUnit.toUpperCase() === "KG")
//     input1.setAttribute("checked", true);
//   input1.setAttribute("class", "checkbox")
//   input1.setAttribute("style", "width: 0px;disabled:true;");
//   input1.setAttribute("name", "unit" + index);
//   input1.setAttribute("id", "KG" + index);
//   input1.setAttribute("value", "KG" + index);
//   div4.appendChild(input1);
//
//   var l1 = document.createElement("label");
//   l1.setAttribute("class", "checkbox-label");
//   l1.setAttribute("id", "KG-label" + index);
//   l1.setAttribute("for", "KG" + index);
//
//   var i1 = document.createElement("i");
//   i1.setAttribute("class", "fas fa-plus");
//   l1.appendChild(i1);
//
//   var i11 = document.createElement("i");
//   i11.setAttribute("class", "fas fa-check");
//   l1.appendChild(i11);
//
//   var s3 = document.createElement("span");
//   s3.innerHTML = "KG";
//   l1.appendChild(s3);
//
//   div4.appendChild(l1);
//   div3.appendChild(div4);
//
//   var div5 = document.createElement("div");
//   div5.setAttribute("class", "col-6");
//   div5.setAttribute("style", "padding: 0 5px;pointer-events: none");
//
//   var input2 = document.createElement("input");
//   input2.setAttribute("type", "radio");
//   // input2.setAttribute("checked",true);
//   if (productWeightUnit.toUpperCase() === "DOZEN")
//     input2.setAttribute("checked", true);
//   input2.setAttribute("class", "checkbox")
//   input2.setAttribute("style", "width: 0px;");
//   input2.setAttribute("name", "unit" + index);
//   input2.setAttribute("id", "Dozen" + index);
//   input2.setAttribute("value", "Dozen" + index);
//   div5.appendChild(input2);
//
//   var l2 = document.createElement("label");
//   l2.setAttribute("class", "checkbox-label");
//   l2.setAttribute("id", "Dozen-label" + index);
//   l2.setAttribute("for", "Dozen" + index);
//
//   var i2 = document.createElement("i");
//   i2.setAttribute("class", "fas fa-plus");
//   l2.appendChild(i2);
//
//   var i21 = document.createElement("i");
//   i21.setAttribute("class", "fas fa-check");
//   l2.appendChild(i21);
//
//   var s4 = document.createElement("span");
//   s4.innerHTML = "Dozen";
//   l2.appendChild(s4);
//
//   div5.appendChild(l2);
//   div3.appendChild(div5);
//
//   var div6 = document.createElement("div");
//   div6.setAttribute("class", "col-6");
//   div6.setAttribute("style", "padding: 0 5px;pointer-events: none");
//
//   var input3 = document.createElement("input");
//   input3.setAttribute("type", "radio");
//   if (productWeightUnit.toUpperCase() === "PIECE" || productWeightUnit.toUpperCase() === "PC")
//     input3.setAttribute("checked", true);
//   input3.setAttribute("class", "checkbox")
//   input3.setAttribute("style", "width: 0px;");
//   input3.setAttribute("name", "unit" + index);
//   input3.setAttribute("id", "Piece" + index);
//   input3.setAttribute("value", "Piece" + index);
//   div6.appendChild(input3);
//
//   var l3 = document.createElement("label");
//   l3.setAttribute("class", "checkbox-label");
//   l3.setAttribute("id", "Piece-label" + index);
//   l3.setAttribute("for", "Piece" + index);
//
//   var i3 = document.createElement("i");
//   i3.setAttribute("class", "fas fa-plus");
//   l3.appendChild(i3);
//
//   var i31 = document.createElement("i");
//   i31.setAttribute("class", "fas fa-check");
//   l3.appendChild(i31);
//
//   var s5 = document.createElement("span");
//   s5.innerHTML = "Piece";
//   l3.appendChild(s5);
//
//   div6.appendChild(l3);
//   div3.appendChild(div6);
//
//   var div7 = document.createElement("div");
//   div7.setAttribute("class", "col-6");
//   div7.setAttribute("style", "padding: 0 5px;pointer-events: none;");
//
//   var input4 = document.createElement("input");
//   input4.setAttribute("type", "radio");
//
//   if (productWeightUnit === "Quintal")
//     input4.setAttribute("checked", true);
//   input4.setAttribute("class", "checkbox")
//   input4.setAttribute("style", "width: 0px;");
//   input4.setAttribute("name", "unit" + index);
//   input4.setAttribute("id", "Quintal" + index);
//   input4.setAttribute("value", "Quintal" + index);
//   div7.appendChild(input4);
//
//   var l4 = document.createElement("label");
//   l4.setAttribute("class", "checkbox-label");
//   l4.setAttribute("id", "Quintal-label" + index);
//   l4.setAttribute("for", "Quintal" + index);
//
//   var i4 = document.createElement("i");
//   i4.setAttribute("class", "fas fa-plus");
//   l4.appendChild(i4);
//
//   var i41 = document.createElement("i");
//   i41.setAttribute("class", "fas fa-check");
//   l4.appendChild(i41);
//
//   var s6 = document.createElement("span");
//   s6.innerHTML = "Quintal";
//   l4.appendChild(s6);
//
//   div7.appendChild(l4);
//   div3.appendChild(div7);
//
//   var div8 = document.createElement("div");
//   div8.setAttribute("class", "col-6");
//
//   var s7 = document.createElement("small");
//   s7.setAttribute("style", "color:#666;font-size: 0.7rem;margin: 0;");
//   s7.innerHTML = "Price per unit";
//   div8.appendChild(s7);
//
//   var div9 = document.createElement("div");
//   div9.setAttribute("class", "inventory-scrap-input");
//   div9.setAttribute("style", "margin:0;");
//
//   var span11 = document.createElement("span");
//   span11.setAttribute("style", "font-size: 2rem; color: #666;");
//   span11.innerHTML = "₹";
//   div9.appendChild(span11);
//
//   var input11 = document.createElement("input");
//   input11.setAttribute("maxlength", "4");
//   input11.setAttribute("style", "width: 80%;font-size: 2rem;");
//   input11.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
//   input11.setAttribute("placeholder", "0");
//   input11.setAttribute("type", "number");
//   input11.setAttribute("readonly", "true");
//
//   // input11.setAttribute("name", "");
//   //input11.setAttribute("value", "");
//   input11.setAttribute("min", "0");
//   input11.setAttribute("id", "unitPrize" + index);
//
//   div9.appendChild(input11);
//   div8.appendChild(div9);
//   div3.appendChild(div8);
//
//   var div10 = document.createElement("div");
//   div10.setAttribute("class", "col-6");
//
//   var s8 = document.createElement("small");
//   s8.setAttribute("style", "color:#666;font-size: 0.7rem;");
//   s8.innerHTML = "Quantity";
//   div10.appendChild(s8);
//
//   var div11 = document.createElement("div");
//   div11.setAttribute("class", "inventory-scrap-input");
//
//   var input21 = document.createElement("input");
//   input21.setAttribute("maxlength", "4");
//   input21.setAttribute("style", "width: 80%;font-size: 2rem;");
//   input21.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
//   input21.setAttribute("placeholder", "0");
//   input21.setAttribute("type", "number");
//
//   input21.setAttribute("readonly", "true");
//   // input21.setAttribute("value", "");
//   input21.setAttribute("min", "0");
//   input21.setAttribute("id", "quantity" + index);
//
//   div11.appendChild(input21);
//   div10.appendChild(div11);
//   div3.appendChild(div10);
//
//   var div12 = document.createElement("div");
//   div12.setAttribute("class", "col-12");
//   div12.setAttribute("style", "display:flex;justify-content: space-between; align-items: center;");
//
//   var div13 = document.createElement("div");
//   div13.setAttribute("class", "");
//
//   var s9 = document.createElement("small");
//   s9.setAttribute("style", "color:#666;font-size: 0.8rem;");
//   s9.innerHTML = "Available Qty :  ";
//
//   var span31 = document.createElement("span");
//   span31.setAttribute("id", "quantityDisplay" + index);
//   var availableQuantity;
//   if (doc.data().AvailableQuantity === undefined) {
//     availableQuantity = 0;
//   } else {
//     availableQuantity = doc.data().AvailableQuantity;
//   }
//   if (Number(availableQuantity) < 20) {
//     span31.setAttribute("style", "font-size: 1.4rem;color: red;font-weight: bold;");
//   } else if (availableQuantity < 50) {
//     span31.setAttribute("style", "font-size: 1.4rem;color: orange;font-weight: bold;");
//   } else {
//     span31.setAttribute("style", "font-size: 1.4rem;color: #88CA5E;font-weight: bold;");
//   }
//   span31.innerHTML = availableQuantity;
//
//   s9.appendChild(span31);
//   div13.appendChild(s9);
//
//   div12.appendChild(div13);
//
//   var button = document.createElement("button");
//   button.setAttribute("class", "mybutton button5");
//   button.setAttribute("style", "width: 80px;");
//   button.setAttribute("id", "btnSave" + index);
//   button.setAttribute("onclick", "SetPurchaseDetails(" + index + ")");
//
//   button.innerHTML = "Add";
//   div12.appendChild(button);
//
//   div3.appendChild(div12);
//
//   var divMsg = document.createElement("div");
//   divMsg.setAttribute("class", "col-12");
//
//   var msg = document.createElement("small");
//   msg.setAttribute("style", "color:red;font-size: 0.7rem;");
//   msg.setAttribute("id", "msg" + index);
//   msg.innerHTML = "";
//   divMsg.appendChild(msg);
//   div3.appendChild(divMsg);
//
//   td2.appendChild(div3);
//
//   tr1.appendChild(td2);
//   table1.appendChild(tr1);
//
//   div2.appendChild(table1);
//   div1.appendChild(div2);
//
//   document.getElementById("productRow").appendChild(div1);
// }

function SetPurchaseDetails(index) {
  // console.log(index);
  var hfid = document.getElementById("hfID" + index);
  var cbKG = document.getElementById("KG" + index);
  var cbDozen = document.getElementById("Dozen" + index);
  var cbPiece = document.getElementById("Piece" + index);
  var cbQuintal = document.getElementById("Quintal" + index);
  var inputunitPrize = document.getElementById("unitPrize" + index);
  var inputquantity = document.getElementById("quantity" + index);
  var inputquantityDisplay = document.getElementById("quantityDisplay" + index);
  var btnSave = document.getElementById("btnSave" + index);
  var msg = document.getElementById("msg" + index);
  var unit = "";
  if (cbKG.checked) {
    unit = "KG";
  } else if (cbDozen.checked) {
    unit = "Dozen";
  } else if (cbPiece.checked) {
    unit = "Piece";
  } else if (cbQuintal.checked) {
    unit = "Quintal";
  }

  var newQty = 0;
  if (btnSave.innerHTML === 'Add') {
    btnSave.innerHTML = "Save";
    inputunitPrize.removeAttribute("readonly");
    inputquantity.removeAttribute("readonly");
  } else {


    if (Number(inputunitPrize.value) <= 0 && Number(inputquantity.value) <= 0) {
      msg.innerHTML = "Unit prize and Quantity can not be 0";
      msg.setAttribute("style", "color:red;font-size: 0.7rem;");

      setTimeout(function() {
        msg.innerHTML = '';
      }, 5000);
      btnSave.innerHTML = "Add";
      inputunitPrize.setAttribute("readonly", true);
      inputquantity.setAttribute("readonly", true);

    } else if (Number(inputunitPrize.value) <= 0) {
      msg.innerHTML = "Unit prize should be more than 0";
      msg.setAttribute("style", "color:red;font-size: 0.7rem;");

      setTimeout(function() {
        msg.innerHTML = '';
      }, 5000);

    } else if (Number(inputquantity.value) <= 0) {
      msg.innerHTML = "Quantity should be more than 0";
      msg.setAttribute("style", "color:red;font-size: 0.7rem;");

      setTimeout(function() {
        msg.innerHTML = '';
      }, 5000);

    } else {
      btnSave.innerHTML = "Add";
      newQty = Number(inputquantityDisplay.innerHTML) + Number(inputquantity.value);
      inputquantityDisplay.innerHTML = newQty;

      if (newQty < 20) {
        inputquantityDisplay.setAttribute("style", "font-size: 1.4rem;color: red;font-weight: bold;")
      } else if (newQty < 50) {
        inputquantityDisplay.setAttribute("style", "font-size: 1.4rem;color: orange;font-weight: bold;");

      } else {
        inputquantityDisplay.setAttribute("style", "font-size: 1.4rem;color: #88CA5E;font-weight: bold;");

      }
      //details to be updated in PurchaseBook;

      db.collection("PurchaseBook").add({
          ProductId: hfid.value,
          Unit: unit,
          UnitPrize: Number(inputunitPrize.value),
          QuantityPurchased: Number(inputquantity.value),
          CreatedBy: auth.currentUser.email,
          CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())

        })
        .then(function(docRef) {
          console.log("Data added sucessfully in the document: " + docRef.id);

          console.log(inputunitPrize.value);
          db.collection("Products").doc(hfid.value).update({
              AvailableQuantity: firebase.firestore.FieldValue.increment(Number(inputquantity.value)),
              UnitPrice: Number(inputunitPrize.value)
            })
            .then(function(docRef1) {

              const snapshot = db.collection('ProductsInventory').doc(hfid.value);
              snapshot.get().then((doc1) => {
                if (doc1.exists) {
                  console.log('if doc exists');
                  db.collection("ProductsInventory").doc(hfid.value).update({
                      AvailableQuantity: firebase.firestore.FieldValue.increment(Number(inputquantity.value)),
                      LastUpdatedBy: auth.currentUser.email,
                      LastUpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
                    })
                    .then(function(docRef2) {
                      // console.log(Date.parse(eventstart))

                    })
                    .catch(function(error2) {
                      console.error("error adding document:", error2);
                    });
                } else {
                  console.log('if doc not exists');
                  db.collection("ProductsInventory").doc(hfid.value).set({
                      AvailableQuantity: Number(inputquantity.value),
                      LastUpdatedBy: auth.currentUser.email,
                      LastUpdatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
                    })
                    .then(function(docRef2) {
                      // console.log(Date.parse(eventstart))

                    })
                    .catch(function(error2) {
                      console.error("error adding document:", error2);
                    });
                }
              });

            })
            .catch(function(error1) {
              console.error("error adding document:", error1);
            });

          inputunitPrize.value = 0;
          inputquantity.value = 0;

        })
        .catch(function(error) {
          console.error("error adding document:", error);
        });
      msg.innerHTML = "Details updated in purchase book ";
      msg.setAttribute("style", "color:green;font-size: 0.7rem;");

      setTimeout(function() {
        msg.innerHTML = '';
      }, 5000);

      inputunitPrize.setAttribute("readonly", true);
      inputquantity.setAttribute("readonly", true);

    }
  }
}
//
// function mySelectionChange(index) {
//
//   var element = document.getElementById("productDetails" + index);
//   element.setAttribute("style", "color: black;");
//   for (int = 0; int < element.options.length; int++) {
//     //    console.log(element.options[int].style.color);
//     if (element.options[int].selected && element.options[int].style.color === "red") {
//       //    console.log("is red");
//       element.setAttribute("style", "color: red;");
//     }
//
//
//   }
// }
//
// function GetProductDetails(productID) {
//   window.location.href = "createProduct.html?id=" + productID.value;
// }
//
// function deleteProduct(productID, maindiv) {
//   db.collection("Products").doc(productID.value).update({
//       Status: "Inactive"
//     })
//     .then(function(docRef1) {
//       //.delete();
//       count = count - 1;
//       console.log(count);
//
//       db.collection("CollectionStatistics").doc(pID).update({
//           ProductCount: count,
//         })
//         .then(function(docRef) {
//           // console.log(Date.parse(eventstart))
//         })
//         .catch(function(error) {
//           console.error("error adding document:", error);
//         });
//       populateProductData(buisinessType, productType);
//     });
//   //document.getElementById("productRow").removeChild(maindiv);
// }

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
