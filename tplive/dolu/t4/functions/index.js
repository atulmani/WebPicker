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
const events = require("./fnEvent.js");
const common = require("./fnCommon.js");
// const functions = require("firebase-functions");

exports.addMasterSportName = common.addMasterSportName;
exports.getSportList = common.getSportList;

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

exports.getEventDetails = events.getEventDetails;
exports.getAllEventDetails = events.getAllEventDetails;
exports.getAllEventDetailsForOrganizer = events.getAllEventDetailsForOrganizer;
exports.addEventDetails = events.addEventDetails;
exports.updateEventBasicDetails = events.updateEventBasicDetails;
exports.updateEventDetails_Dates = events.updateEventDetails_Dates;
exports.updateEventDetails_Logo = events.updateEventDetails_Logo;
exports.updateEventDetails_ApprovalStatus = events.updateEventDetails_ApprovalStatus;
exports.updateEventDetails_PaymentStatus = events.updateEventDetails_PaymentStatus;
exports.updateEventDetails_NoticeBoard = events.updateEventDetails_NoticeBoard;
exports.updateEventDetails_Announcement = events.updateEventDetails_Announcement;
exports.updateEventDetails_RulesAndRegulations = events.updateEventDetails_RulesAndRegulations;
exports.updateEventDetails_DrawLink = events.updateEventDetails_DrawLink;
exports.updateEventFlag_CloseEvent = events.updateEventFlag_CloseEvent;
exports.updateEventFlag_RegistrationOn = events.updateEventFlag_RegistrationOn;
exports.updateEventFlag_RegistrationCompletePostPayment = events.updateEventFlag_RegistrationCompletePostPayment;
exports.updateEventFlag_OnlinePaymentMode = events.updateEventFlag_OnlinePaymentMode;
exports.updateEventFlag_PublishDraw = events.updateEventFlag_PublishDraw;
exports.updateEventFlag_PublishSeed = events.updateEventFlag_PublishSeed;
exports.updateEventFlag_PublishSchedule = events.updateEventFlag_PublishSchedule;
exports.updateEventFlag_PublishGallery = events.updateEventFlag_PublishGallery;
exports.getAllEventForOrganizerWithStatus = events.getAllEventForOrganizerWithStatus;
exports.getAllEventWithStatus = events.getAllEventWithStatus;
exports.getEventCategoryDetails = events.getEventCategoryDetails;
exports.setEventCategoryDetails = events.setEventCategoryDetails;
