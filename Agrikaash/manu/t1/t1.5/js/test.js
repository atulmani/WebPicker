// var Results = [
// ["Col1", "Col2", "Col3", "Col4"],
// ["Data", 50, 100, 500],
// ["Data", -100, 20, 100],
// ];

auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);


    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login/index.html";
  }
});



function populateOrderDetails() {
  var i = 0;
  var fromDate;
  var todayDate = new Date();
  var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var exportData = [];
  var arr = new Array (10);

    exportData.push({
    c1 : "OrderID",
    C2 : "OrderBy",
    C3 : "OrderDate",
    C4 : "DeliveryDate",
    C5 : "DeliveryTime",
    C6 : "OrderStatus",
    C7 : "PaymentStatus",
    C8 : "TotalItems",
    C9 : "TotalAmount",
    C10 : "DiscountedAmount"
  });
  console.log(exportData);
  todayDate = refDate;
  var index = 0;
  var snapshot;
  var DBrows;
 {
    DBrows = db.collection('OrderDetails')
      .orderBy("orderDate", 'desc')
      .get();
  }


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  DBrows.then((changes) => {

    var i = 0;

    changes.forEach(change => {
      orderList = change.data();
      exportData.push ({
        C1 : orderList.orderNumber ,
        C2 : orderList.orderBy + ":" + orderList.orderByUserName,
        C3 : orderList.orderDate,
        C4 : orderList.deliveryDate,
        C5 : orderList.deliveryTime,
        C6 : orderList.orderStatus ,
        C7 : orderList.paymentStatus,
        C8 : orderList.totalItems,
        C9 : orderList.totalAmount,
        C10 : orderList.discountedprize
      });

      i = i + 1;
    });
    console.log(exportData);
    exportCSVFile(exportData);
  });


}

function exportinFile()
{
  console.log('exportinFile');
  var Results = [
  ["Col1", "Col2", "Col3", "Col4"],
  ["Data", 50, 100, 500],
  ["Data", -100, 20, 100],
  ];
  exportCSVFile(Results);

}
function exportCSVFile(Results) {
  console.log(Results);
  //exportToCsv = function()
  {
    var CsvString = "";
    // Results.forEach(function(RowItem, RowIndex) {
    //   RowItem.forEach(function(ColItem, ColIndex) {
    //     CsvString += ColItem + ',';
    //   });
      var row = {};
      for (rInd = 0 ;rInd < Results.length ; rInd ++ )
      {
        row = Results[rInd];
        console.log(row);
        Object.entries(row).forEach(([key, val]) => {
          CsvString += val + ',';
        });

      CsvString += "\r\n";
      }

    console.log(CsvString);
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", "somedata.csv");
    document.body.appendChild(x);
    x.click();
  }
}
