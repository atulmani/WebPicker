const functions = require("firebase-functions");
const admin = require("firebase-admin");

let jsSHA = require("jssha");

exports.payUMoneyPayment = function (req, res) {
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