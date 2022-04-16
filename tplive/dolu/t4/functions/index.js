// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");

admin.initializeApp();

const userProfile = require("./fnProfile.js");
const organization = require("./fnOrganization.js");
// const functions = require("firebase-functions");

exports.getProfileDetails = userProfile.getProfileDetails;
exports.getUserRequest = userProfile.getUserRequest;
exports.addUserDetails = userProfile.addUserDetails;
exports.saveProfileDetailsStep1 = userProfile.saveProfileDetailsStep1;
exports.saveProfileDetailsStep2 = userProfile.saveProfileDetailsStep2;
exports.saveProfileDetailsStep3 = userProfile.saveProfileDetailsStep3;
exports.saveProfileDetailsStep4 = userProfile.saveProfileDetailsStep4;
exports.updateProfileDetails = userProfile.updateProfileDetails;
exports.getUserWithRole = userProfile.getUserWithRole;

exports.getOrganizationDetails = organization.getOrganizationDetails;
exports.updateOrganizationDetails = organization.updateOrganizationDetails;
exports.addOrganizationDetails = organization.addOrganizationDetails;
exports.getAllOrganizationDetails = organization.getAllOrganizationDetails;
exports.getAllOrganizationDetailsForOrganizer = organization.getAllOrganizationDetailsForOrganizer;
exports.getAllOrganizationForOrganizerWithStatus = organization.getAllOrganizationForOrganizerWithStatus;
