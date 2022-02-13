// var Results = [
// ["Col1", "Col2", "Col3", "Col4"],
// ["Data", 50, 100, 500],
// ["Data", -100, 20, 100],
// ];



//
// function populateOrderDetails() {
//   var i = 0;
//   var fromDate;
//   var todayDate = new Date();
//   var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
//   var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
//   var exportData = [];
//   var arr = new Array (10);
//
//     exportData.push({
//     c1 : "OrderID",
//     C2 : "OrderBy",
//     C3 : "OrderDate",
//     C4 : "DeliveryDate",
//     C5 : "DeliveryTime",
//     C6 : "OrderStatus",
//     C7 : "PaymentStatus",
//     C8 : "TotalItems",
//     C9 : "TotalAmount",
//     C10 : "DiscountedAmount"
//   });
//   console.log(exportData);
//   todayDate = refDate;
//   var index = 0;
//   var snapshot;
//   var DBrows;
//  {
//     DBrows = db.collection('OrderDetails')
//       .orderBy("orderDate", 'desc')
//       .get();
//   }
//   C10 : orderList.discountedprize
//
//
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//
//   DBrows.then((changes) => {
//
//     var i = 0;
//
//     changes.forEach(change => {
//       orderList = change.data();
//       exportData.push ({
//         C1 : orderList.orderNumber ,
//         C2 : orderList.orderBy + ":" + orderList.orderByUserName,
//         C3 : orderList.orderDate,
//         C4 : orderList.deliveryDate,
//         C5 : orderList.deliveryTime,
//         C6 : orderList.orderStatus ,
//         C7 : orderList.paymentStatus,
//         C8 : orderList.totalItems,
//         C9 : orderList.totalAmount,
//       });
//
//       i = i + 1;
//     });
//     console.log(exportData);
//     // exportCSVFile(exportData);
//     exportCSVFile();
//   });
//
//
// }
import xlsx;

function exportCSVFile()
{

    console.log(0);


  console.log(1);
  const XLSX = require('xlsx');
console.log(2);
  // array of objects to save in Excel
  let binary_univers = [{'name': 'Hi','value':1},{'name':'Bye','value':0}]
console.log(3);
  let binaryWS = XLSX.utils.json_to_sheet(binary_univers);
console.log(4);
  // Create a new Workbook
  var wb = XLSX.utils.book_new()
console.log(5);
  // Name your sheet
  XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values')
console.log(6);
  // export your excel
  XLSX.writeFile(wb, 'Binaire.xlsx');
  console.log(7);
}
function exportinFileOld()
{
  console.log('exportinFile');
  var Results = [
  ["Col1", "Col2", "Col3", "Col4"],
  ["Data", 50, 100, 500],
  ["Data", -100, 20, 100],
  ];
  exportCSVFile(Results);

}
function exportCSVFileOld(Results) {
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
