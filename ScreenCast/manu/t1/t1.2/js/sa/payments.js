
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
      // document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      // document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;

      // GetProfileData(firebaseUser);

      console.log('welcome' + firebaseUser.email);
      pieChart();
      populatePayments("Inward");

    } else {
      // console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login/index.html";
  }
});

var YOYrevenue = 0.00;
var YOYoutwardAmount = 0.00;
var YOYprofit = 0.00;


var remittanceInput = document.getElementById('remittanceInput');

remittanceInput.addEventListener('click', function(e) {
  var fullDiv = document.getElementById('fullDiv');

  if (remittanceInput.checked) {
    fullDiv.style.transform = 'translateX(-50%)';
    if (document.getElementById('outwardPaymentDiv').innerHTML == '' || document.getElementById('outwardPaymentDiv').innerHTML == null ) {
      // togglePaymentData("Outward");
      populatePayments("Outward");

    } else {
      // console.log("Outward div: " + document.getElementById('outwardPaymentDiv').innerHTML);
      document.getElementById('total').innerHTML = '₹ ' + YOYoutwardAmount;
      document.getElementById('total').style.color = '#ff5757';
    }
  } else {
    fullDiv.style.transform = 'translateX(-0%)';
    document.getElementById('total').innerHTML = '₹ ' + YOYrevenue;
    document.getElementById('total').style.color = '#43cc68';
    // populatePayments("Inward");
    // togglePaymentData("Inward");
  }
});



function pieChart()
{
  var chart2 = new CanvasJS.Chart("chartContainer", {

    title: {
      text: "Payments"
    },
    axisX: {
      valueFormatString: "MMM",
      interval: 2,
      intervalType: "month"
    },
    axisY: {
      includeZero: false

    },
    data: [{
      type: "pie",

      dataPoints: [{
          x: new Date(2012, 00, 1),
          y: 4050
        },
        {
          x: new Date(2012, 01, 1),
          y: 414
        },
        // {
        //   x: new Date(2012, 02, 1),
        //   y: 520,
        //   indexLabel: "highest",
        //   markerColor: "red",
        //   markerType: "triangle"
        // },
        // {
        //   x: new Date(2012, 03, 1),
        //   y: 460
        // },
        // {
        //   x: new Date(2012, 04, 1),
        //   y: 450
        // },
        // {
        //   x: new Date(2012, 05, 1),
        //   y: 500
        // },
        // {
        //   x: new Date(2012, 06, 1),
        //   y: 480
        // },
        // {
        //   x: new Date(2012, 07, 1),
        //   y: 480
        // },
        // {
        //   x: new Date(2012, 08, 1),
        //   y: 410,
        //   indexLabel: "lowest",
        //   markerColor: "DarkSlateGrey",
        //   markerType: "cross"
        // },
        // {
        //   x: new Date(2012, 09, 1),
        //   y: 500
        // },
        // {
        //   x: new Date(2012, 10, 1),
        //   y: 480
        // },
        // {
        //   x: new Date(2012, 11, 1),
        //   y: 510
        // }
      ]
    }]
  });

  chart2.render();
}


function populatePayments(remittance) {
  db.collection("Payments").where('Remittance', '==', remittance).orderBy('UpdatedTimestamp','desc').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
      if (change.type == 'added') {

        var txtComment = change.doc.data().Comment;
        var txtCommentLenght = txtComment.length;
        var shortComment = '';

        if (txtCommentLenght < 30) {
          shortComment = txtComment;
          txtComment = '';
        } else {
          shortComment = txtComment.substring(0, 25);
          txtComment = txtComment.substring(26, txtCommentLenght);
        }

        var amountTextColor = '';
        // var  = '';

        if (remittance == "Outward") {
          amountTextColor = 'outward';
          YOYoutwardAmount = YOYoutwardAmount + Number(change.doc.data().Amount);
        } else {
          amountTextColor = 'inward';
          YOYrevenue = YOYrevenue + Number(change.doc.data().Amount);
        }

        let paymentCard = document.createElement('div');
        paymentCard.classList.add("card-div");

        paymentCard.innerHTML =
        '<div class="content-div">' +
        '<div width="60%">' +
        '<div class="name-price">' +
        '<h5>'+ change.doc.data().Client +'</h5>' +
        '<small>12 / June / 2021</small>' +
        '</div>' +
        '</div>' +

        '<div style="text-align:right;" width="40%">' +
        '<div class="price-type ' + amountTextColor + '">' +
        '<h6>₹ '+ change.doc.data().Amount + '</h6>' +
        '<small>Paid by '+ change.doc.data().ModeOfPayment + '</small>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div style="width:100%;">' +
        '<span class="payment-para1">'+ shortComment +'... </span>' +
        '<span class="show-more">show more</span>' +
        '<a href="addPayments.html?id='+ change.doc.id +'">' +
        '<span class="material-icons-outlined edit-icon">edit</span>' +
        '</a>' +
        '<div class="payment-para2">' +
        '<span>'+ txtComment + '</span>' +
        '</div>' +
        '</div>';

        if (remittance == "Inward") {
          document.getElementById('inwardPaymentDiv').appendChild(paymentCard);
          document.getElementById('outwardPaymentDiv').innerHTML = '';
        } else {
          document.getElementById('outwardPaymentDiv').appendChild(paymentCard);
          // document.getElementById('inwardPaymentDiv').innerHTML = '';
        }

      }
    })

    console.log(YOYoutwardAmount);

    if (remittance == "Inward") {
      document.getElementById('revenue').innerHTML = '₹ ' + YOYrevenue;
      document.getElementById('total').innerHTML = '₹ ' + YOYrevenue;
      document.getElementById('total').style.color = '#43cc68';
      // YOYrevenue - YOYoutwardAmount = YOYprofit;
    } else {
      document.getElementById('total').innerHTML = '₹ ' + YOYoutwardAmount;
      document.getElementById('total').style.color = '#ff5757';
    }

  });

}
