
payRoutes.post('/payment/payumoney', payController.payUMoneyPayment);

import jsSHA from "jssha";

export function payUMoneyPayment(req, res) {
    if (!req.body.txnid || !req.body.amount || !req.body.productinfo
        || !req.body.firstname || !req.body.email) {
        res.send("Mandatory fields missing");
    } else {
        var pd = req.body;
        var hashString = config.payumoney.key // Merchant Key 
            + '|' + pd.txnid
            + '|' + pd.amount + '|' + pd.productinfo + '|'
            + pd.firstname + '|' + pd.email + '|'
            + '||||||||||'
            + config.payumoney.salt // Your salt value
        var sha = new jsSHA('SHA-512', "TEXT");
        sha.update(hashString)
        var hash = sha.getHash("HEX");
        res.send({ 'hash': hash });
    }
}


function payumoney() {
    //Create a Data object that is to be passed to LAUNCH method of Bolt
    var pd = {
        key: 'rjQUPktU' /*** Merchant key from PayuMoney Dashboard ***/,
        txnid: 'trxid' + new Date()/*** Unique Transaction ID***/,
        amount: '10' /*** Amount to be paid ***/,
        firstname: 'Anita' /*** Name of the User ***/,
        email: 'anitatripathi@gmail.com'/** Email Id of User **/,
        phone: '9922112886'/** Mobile number of User **/,
        productinfo: 'test product'/* Product name */,
        surl: 'http://127.0.0.1:3408/regCategory.html?id=HtL3Gpfgq10kSF3doc72' /* Success callback URL */,
        furl: 'http://127.0.0.1:3408/regProfile.html' /* Failure callback URL */,
        hash: ''
    }

    // Data to be Sent to API to generate hash.
    let data = {
        'txnid': pd.txnid,
        'email': pd.email,
        'amount': pd.amount,
        'productinfo': pd.productinfo,
        'firstname': pd.firstname
    }
    let self = this;
    // API call to get the Hash value
    fetch(base_url + 'payment/payumoney', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (a) {
            return a.json();
        })
        .then(function (json) {
            pd.hash = json['hash']
            //  With the hash value in response, we are ready to launch the bolt overlay.
            //Function to launch BOLT   
            self.redirectToPayU(pd);
        });
}

//client Side
redirectToPayU(pd) {
    //use window.bolt.launch if you face an error in bolt.launch
    bolt.launch(pd, {
        responseHandler: function (response) {
            // your payment response Code goes here
            fetch(base_url + 'payment/payumoney/response', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(response.response)
            })
                .then(function (a) {
                    return a.json();
                })
                .then(function (json) {
                    console.log(json);
                });
        },
        catchException: function (response) {
            // the code you use to handle the integration errors goes here
            // Make any UI changes to convey the error to the user
        }
    });
}

//server side
payRoutes.post('payment/payumoney/response',
    payController.payUMoneyPaymentResponse);


//response
exports.payUMoneyPaymentResponse = function (req, res) {
    var pd = req.body;
    //Generate new Hash 
    var hashString = config.payumoney.salt + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + config.payumoney.key
    var sha = new jsSHA('SHA-512', "TEXT");
    sha.update(hashString)
    var hash = sha.getHash("HEX");
    // Verify the new hash with the hash value in response
    if (hash == pd.hash) {
        res.send({ 'status': pd.status });
    } else {
        res.send({ 'status': "Error occured" });
    }
}