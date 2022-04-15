// const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const userProfile = require("./fnProfile.js");
const partner = require("./fnPartner.js");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.getProfileDetails = userProfile.getProfileDetails;
exports.getUserRequest = userProfile.getUserRequest;
exports.addUserDetails = userProfile.addUserDetails;
exports.saveProfileDetailsStep1 = userProfile.saveProfileDetailsStep1;
exports.saveProfileDetailsStep2 = userProfile.saveProfileDetailsStep2;
exports.saveProfileDetailsStep3 = userProfile.saveProfileDetailsStep3;
exports.saveProfileDetailsStep4 = userProfile.saveProfileDetailsStep4;
exports.updateProfileDetails = userProfile.updateProfileDetails;
exports.getUserWithRole = userProfile.getUserWithRole;

exports.getPartnerDetails = partner.getPartnerDetails;
exports.updatePartnerDetails = partner.updatePartnerDetails;
exports.addPartnerDetails = partner.addPartnerDetails;
exports.getAllPartnerDetails = partner.getAllPartnerDetails;
exports.getAllPartnerDetailsForOrganizer = partner.getAllPartnerDetailsForOrganizer;
