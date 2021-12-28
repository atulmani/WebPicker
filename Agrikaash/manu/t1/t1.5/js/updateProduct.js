//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
var productCategory = [];
var isAdmin = false;
var userRole = [];
var count ;
var pID ;

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      document.getElementById('loading').style.display = 'none';

      //promise2.then(console.log(productCategory));

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

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        userRole = doc.data().UserRole;
        if (userRole != undefined) {
          if (userRole.findIndex(e => e.value === "Admin") >= 0) {
            isAdmin = true;

          } else {
            isAdmin = false;
          }
        } else {
          isAdmin = false;

        }
        if (doc.data().ProfileImageURL != "" && doc.data().ProfileImageURL != undefined)
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        console.log(isAdmin);
        if (isAdmin === true) {


                console.log("in ");
                db.collection('CollectionStatistics').get().then((changes) => {
                    changes.forEach(change => {

                    count = change.data().ProductCount;
        //            count = count + 1;
                    pID = change.id;
                    console.log(count);
                    console.log(pID);
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

function populateProductData(bType, pType) {
  //var DBrows = db.collection("Products").where("OrganizationId", "==", Number(organizationid)).get();
  var divPType = document.getElementById('productCategory');
  var divPList = document.getElementById('productRow');
  emptyDiv(divPList);
  emptyDiv(divPType);
  var DBrows;
  if ((pType === '' || pType === 'All') && (bType === '' || bType === 'All')) //Select all products
  {
    DBrows = db.collection("Products").get();
  } else if ((pType === '' || pType === 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    DBrows = db.collection("Products").where("CustomerBusinessType", "==", bType).get();
  } else if ((pType != '' && pType != 'All') && (bType === '' || bType === 'All')) //select one customer businessType
  {
    DBrows = db.collection("Products").where("productType", "==", pType).get();
  } else if ((pType != '' && pType != 'All') && (bType != '' && bType != 'All')) //select one customer businessType
  {
    DBrows = db.collection("Products").where("productType", "==", pType).where("CustomerBusinessType", "==", bType).get();
  }

  DBrows.then((changes) => {
    var item = [];
    var index = 0;
    var selectedindex = -1;
    var selectdedItem;
    productCategory.push('All');
    changes.forEach(change => {
      //if (change.type == 'added')
      {
        var pCategory = change.data().productType;
        productCategory.push(pCategory)

      }
      renderProductNew(change, index);
      index = index + 1;

    });

    var unique = productCategory.filter(onlyUnique);
    renderProductCategory(unique);
    anchorlLnkClick();
    document.getElementById('loading').style.display = 'none';

    //  });
  });
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function renderProductCategory(productCategory) {

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

function callFunction(productType) {
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

  //var anchor = document.createElement("a");
  //anchor.setAttribute("href", "createProduct.html?id=" + doc.id);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("id", "mainDiv" + index);
  div1.setAttribute("style", "padding: 5px;");

  var div1_1 = document.createElement("div");
  div1_1.setAttribute("class", "product-list-div " + doc.data().productType);

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
  img1.setAttribute("alt", "Agrikaash");
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

  var i1 = document.createElement("i");
  i1.setAttribute("onclick", "GetProductDetails(" + "hfID" + index + ");");
  i1.setAttribute("class", "far fa-edit address-edit-icon");
  i1.setAttribute("style", "padding: 0 5px 0 5px;");

  td1.appendChild(i1);

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
  //selectP.addEventListener("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelectedValue" + index + ","+index+")");
  var indexnew = -1;
  var mrp = 0;
  var finalPrize = 0;
  var qtyNew = doc.data().MinimumQty;
  for (const val of productlist) {
    var option = document.createElement("option");
    option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
    option.text = val.ProductWeight + " - " + "Rs." + val.ProductFinalPrise;
    selectP.appendChild(option);
  }

  td2.appendChild(selectP);
  var div1_4 = document.createElement("div");
  div1_4.setAttribute("class", "product-price");
  //console.log(selectedItem);

  // div1_4.innerHTML = "<h5>₹" + "<span id='mrp" + index + "' >" + productlist[0].ProductMRP + "</span>" + "</h5>" +
  //   "<small>₹ " + "<span id='final" + index + "'>" + productlist[0].ProductFinalPrise + "</span></small>";

  div1_4.innerHTML = "<large>" + "<span><b>Customer Business Type :  </b>" + doc.data().CustomerBusinessType + "</span>" + "<large><br>" +
    "<large>" + "<span><b>Product Type :  </b>" + doc.data().productType + "</span>" + "<large><br>";

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

}


function GetProductDetails(productID) {
  console.log(productID.value);
  window.location.href = "createProduct.html?id=" + productID.value;
}

function deleteProduct(productID, maindiv) {
  db.collection("Products").doc(productID.value)
    .delete();
    count  = count - 1;
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
  document.getElementById("productRow").removeChild(maindiv);
}

function anchorlLnkClick() {

  // $(window).load(function(){
  console.log('Inside ready function');
  console.log(document.getElementById('anchorAll'));
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
