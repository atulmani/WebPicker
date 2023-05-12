const functions = require("firebase-functions");
const genericFunctions = require("./genericfunctions");
const cors = require("cors")({ origin: true })
// const cors = require('cors')({
//     origin: ['http://localhost:3000/', 'https://www.hyperclouddigital.com'],
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

exports.sendAppEmail = genericFunctions.sendAppEmail;
