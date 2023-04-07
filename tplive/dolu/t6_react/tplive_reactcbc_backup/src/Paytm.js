// const express = require("express");

// const https = require("https");
// const qs = require("querystring");

// const checksum_lib = require("./Paytm/checksum");
// const config = require("./Paytm/config");
// const sig_lib = require("./Paytm/PaytmChecksum");

// const app = express();

// const parseUrl = express.urlencoded({ extended: false });
// const parseJson = express.json({ extended: false });

// const PORT = process.env.PORT || 3407;

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.post("/paynow", [parseUrl, parseJson], (req, res) => {
//     // Route for making payment

//     var paymentDetails = {
//         amount: req.body.amount,
//         customerId: req.body.name,
//         customerEmail: req.body.email,
//         customerPhone: req.body.phone
//     }
//     if (!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
//         res.status(400).send('Payment failed')
//     } else {
//         var params = {};
//         params['MID'] = config.PaytmConfig.mid;
//         params['CHANNEL_ID'] = 'WEB';
//         params['INDUSTRY_TYPE_ID'] = 'Retail';
//         params['WEBSITE'] = config.PaytmConfig.website;
//         params['EMAIL'] = paymentDetails.customerEmail;
//         params['MOBILE_NO'] = paymentDetails.customerPhone;
//         params['CUST_ID'] = paymentDetails.customerId;

//         params['ORDER_ID'] = 'TEST_' + new Date().getTime();
//         params['TXN_AMOUNT'] = paymentDetails.amount;
//         params['CALLBACK_URL'] = 'http://localhost:3407/callback?custID=' + params['CUST_ID'] + "&orderid=" + params['ORDER_ID'];
//         // params['CALLBACK_URL'] = 'https://tplive.in';


//         checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

//             var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction" + "?orderid=" + params['ORDER_ID']; // for staging

//             // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

//             var form_fields = "";
//             for (var x in params) {
//                 form_fields += "<input type='text' name='" + x + "' value='" + params[x] + "' >";
//             }
//             form_fields += "<input type='text' name='CHECKSUMHASH' value='" + checksum + "' >";

//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>TLIVE Testing : Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
//             res.end();
//         });
//     }
// });
// app.post("/callback", (req, res) => {
//     // Route for verifiying payment

//     var body = '';
//     // console.log('from callback', res);
//     // console.log('from callback', res);
//     //res.write("from callback ", res)
//     req.on('data', function (data) {

//         body += data + req + res;

//     });

//     req.on('end', function () {
//         var html = "";
//         var post_data = qs.parse(body);

//         // received params in callback
//         // console.log('Callback Response: ', post_data, "\n");


//         // verify the checksum
//         var checksumhash = post_data.CHECKSUMHASH;
//         // delete post_data.CHECKSUMHASH;
//         var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
//         // console.log("Checksum Result => ", result, "\n");


//         // Send Server-to-Server request to verify Order Status
//         var params = { "MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID };

//         checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

//             params.CHECKSUMHASH = checksum;
//             post_data = 'JsonData=' + JSON.stringify(params);

//             var options = {
//                 hostname: 'securegw-stage.paytm.in', // for staging

//                 // hostname: 'securegw.paytm.in', // for production
//                 port: 443,
//                 path: '/merchant-status/getTxnStatus',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'Content-Length': post_data.length
//                 }
//             };


//             // Set up the request
//             var response = "";
//             var post_req = https.request(options, function (post_res) {
//                 post_res.on('data', function (chunk) {
//                     response += chunk;
//                 });

//                 post_res.on('end', function () {
//                     // console.log('S2S Response: ', response, "\n");

//                     var _result = JSON.parse(response);

//                     if (_result.STATUS == 'TXN_SUCCESS') {
//                         res.send('payment sucess' + ":" + _result.TXNAMOUNT + ":" + _result.ORDERID + ":" + ":" + _result.TXNID)
//                     } else {
//                         res.send('payment failed')
//                     }
//                 });
//             });

//             // post the data
//             post_req.write(post_data);
//             post_req.end();
//         });
//     });
// });


// app.post("/refund", (req, res) => {

//     var paytmParams = {};

//     paytmParams.body = {
//         "mid": config.PaytmConfig.mid,
//         "txnType": "REFUND",
//         "orderId": "ORDERID_98765",
//         "txnId": "202005081112128XXXXXX68470101509706",
//         "refId": "REFUNDID_98765",
//         "refundAmount": "1.00",
//     };


//     sig_lib.generateSignature(JSON.stringify(paytmParams.body), config.PaytmConfig.key).then(function (checksum) {

//         paytmParams.head = {
//             "signature": checksum
//         };

//         var post_data = JSON.stringify(paytmParams);

//         var options = {

//             /* for Staging */
//             hostname: 'securegw-stage.paytm.in',

//             /* for Production */
//             // hostname: 'securegw.paytm.in',

//             port: 443,
//             path: '/refund/apply',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': post_data.length
//             }
//         };

//         var response = "";
//         var post_req = https.request(options, function (post_res) {
//             post_res.on('data', function (chunk) {
//                 response += chunk;
//             });

//             post_res.on('end', function () {
//                 // console.log('Response: ', response);
//             });
//         });

//         post_req.write(post_data);
//         post_req.end();
//     });
// });


// app.listen(PORT, () => {
//     // console.log(`App is listening on Port ${PORT}`);
// });
