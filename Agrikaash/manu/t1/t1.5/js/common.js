var Results = [
["Col1", "Col2", "Col3", "Col4"],
["Data", 50, 100, 500],
["Data", -100, 20, 100],
];

exportToCsv = function() {
var CsvString = "";
Results.forEach(function(RowItem, RowIndex) {
  RowItem.forEach(function(ColItem, ColIndex) {
    CsvString += ColItem + ',';
  });
  CsvString += "\r\n";
});
CsvString = "data:application/csv," + encodeURIComponent(CsvString);
var x = document.createElement("A");
x.setAttribute("href", CsvString );
x.setAttribute("download","somedata.csv");
document.body.appendChild(x);
x.click();
}


// the simplest way to read excel is to use sheetjs
// https://github.com/SheetJS/sheetjs

// A. in nodejs
var XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xlsx');
/* DO SOMETHING WITH workbook HERE */

// B. in browser
// 1. first include the library
// <script src="dist/xlsx.full.min.js"></script>

// 2. handle the file upload in a script

function handleFile(e) {
  var files = e.target.files, f = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, {type: 'array'});

    /* DO SOMETHING WITH workbook HERE */
  };
  reader.readAsArrayBuffer(f);
}
input_dom_element.addEventListener('change', handleFile, false);
