auth.onAuthStateChanged(firebaseUser => {
  try {
    populatePartnersList();
    if (firebaseUser) {
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      // document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;

      // GetProfileData(firebaseUser);

      // getSiteURL();



      console.log('welcome' + firebaseUser.email);

    } else {
      console.log('User has been logged out');
      // window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    // window.location.href = "../login";
  }
});

function populatePartnersList() {

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


  db.collection("Partners")
  .get()
    .then((changes) => {

      changes.forEach(doc => {

        var odeldate = new Date(doc.data().CreatedTimestamp.seconds * 1000);
        var delDate  = odeldate.toLocaleDateString("en-US", options);

        console.log(delDate);

        let partnersCard = document.createElement('a');
        partnersCard.setAttribute('href', 'partnerDetails.html?id=' + doc.id);
        partnersCard.setAttribute('class', 'ticket-card');

          partnersCard.innerHTML =
          '<div class="">' +
            '<img src="../img/clients/8.png" alt="">' +
          '</div>' +
          '<div class="details">' +
            '<small>Partner ID: ' + doc.data().partnerID + '</small>' +
            '<h5>' + doc.data().partnerName + '</h5>' +
            '<span>' + doc.data().partnerLocation + '</span>' +
            '<br>' +
            '<small>' + delDate + '</small>' +
          '</div>';

          document.getElementById('populateDataDiv').appendChild(partnersCard);

          // paymentCard.innerHTML =
          //   '<div class="content-div">' +
          //   '<div width="60%">' +
          //   '<div class="name-price">' +
          //   '<h5>' + change.doc.data().Client + '</h5>' +
          //   '<small>' + pDate + '</small>' +
          //   // '<small>' + pDate + '</small>' +
          //   '</div>' +
          //   '</div>' +
          //
          //   '<div style="text-align:right;" width="40%">' +
          //   '<div class="price-type ' + amountTextColor + '">' +
          //   '<h6>₹ ' + change.doc.data().Amount + '</h6>' +
          //   '<small>Paid by ' + change.doc.data().ModeOfPayment + '</small>' +
          //   '</div>' +
          //   '</div>' +
          //   '</div>' +
          //
          //   '<div style="width:100%;">' +
          //   '<span class="payment-para1">' + shortComment + '... </span>' +
          //   '<span class="show-more">show more</span>' +
          //   '<a href="addPayments.html?id=' + change.doc.id + '">' +
          //   '<span class="material-icons-outlined edit-icon">edit</span>' +
          //   '</a>' +
          //   '<div class="payment-para2">' +
          //   '<span>' + txtComment + '</span>' +
          //   '</div>' +
          //   '</div>';

      })

    })
}



function menuListClick(filter) {
  var MenuListHr = document.getElementById('partnerMenuListHr');

  if (filter === 'CLIENTS') {
    MenuListHr.style.transform = 'translateX(0%)';
  } else if (filter === 'VENDORS') {
    MenuListHr.style.transform = 'translateX(100%)';
  } else if (filter === 'INACTIVE') {
    MenuListHr.style.transform = 'translateX(200%)';
    // } else {
    //   MenuListHr.style.transform = 'translateX(300%)';
    // }
  }
}
var btnCreatePartner = document.getElementById('btnCreatePartner');

btnCreatePartner.addEventListener('click', function(e) {
  try {
    console.log("button clied");
    window.location.href = "partnerdetails.html?id=new";
    // var siteURL = localStorage.getItem("siteURL");
    // localStorage.setItem("siteURL", siteURL);
  } catch (err) {
    console.error(err.message);
  }
});
