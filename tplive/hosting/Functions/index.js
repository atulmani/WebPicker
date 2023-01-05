// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");

admin.initializeApp();
const cors = require('cors')({ origin: true });

const userProfile = require("./fnProfile.js");
const organization = require("./fnOrganization.js");
const events = require("./fnEvent.js");
const common = require("./fnCommon.js");
const entry = require("./fnEntry.js");
const registration = require("./fnRegistration.js");
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
exports.saveProfilePicture = userProfile.saveProfilePicture;
exports.getRegisteredParticant = userProfile.getRegisteredParticant;
exports.createParticipants = userProfile.createParticipants;
exports.updateParticipants = userProfile.updateParticipants;
exports.getPlayerDetails = userProfile.getPlayerDetails;
exports.getPlayerDetailsWithPlayerID = userProfile.getPlayerDetailsWithPlayerID;


exports.getOrganizationDetails = organization.getOrganizationDetails;
exports.updateOrganizationDetails = organization.updateOrganizationDetails;
exports.addOrganizationDetails = organization.addOrganizationDetails;
exports.getAllOrganizationDetails = organization.getAllOrganizationDetails;
exports.getAllOrganizationDetailsForOrganizer = organization.getAllOrganizationDetailsForOrganizer;
exports.getAllOrganizationForOrganizerWithStatus = organization.getAllOrganizationForOrganizerWithStatus;

exports.logEventAdd = events.logEventAdd;
exports.logEntryDelete = events.logEntryDelete;
exports.getEventSummaryBySport = events.getEventSummaryBySport;
exports.getEventSummaryByCity = events.getEventSummaryByCity;
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
exports.updateEventFlag_PublishSeed = events.updateEventFlag_PublishSeed;
exports.updateEventFlag_PublishSchedule = events.updateEventFlag_PublishSchedule;
exports.updateEventFlag_PublishGallery = events.updateEventFlag_PublishGallery;
exports.getAllEventForOrganizerWithStatus = events.getAllEventForOrganizerWithStatus;
exports.getAllEventWithStatus = events.getAllEventWithStatus;
exports.getEventCategoryDetails = events.getEventCategoryDetails;
exports.getAllEventDetailsForYears = events.getAllEventDetailsForYears;
exports.setEventCategoryDetails = events.setEventCategoryDetails;
exports.getAllEventDetailsByCity = events.getAllEventDetailsByCity;
exports.getAllEventWithEventStatus = events.getAllEventWithEventStatus;
exports.getAllEventWithEventStatus1 = events.getAllEventWithEventStatus1;
exports.getAllEventWithEventStatusAndLocation = events.getAllEventWithEventStatusAndLocation;
exports.updateEventDetails_EventMode = events.updateEventDetails_EventMode;
exports.updateEvent_EventDetails = events.updateEvent_EventDetails;
exports.getEventDetails_forAdmin = events.getEventDetails_forAdmin;
exports.updateEventDetails_EventStatus = events.updateEventDetails_EventStatus;
exports.updateEventFlag_ShowParticipant = events.updateEventFlag_ShowParticipant;
exports.updateEventFlag_ShowParticipantPostPayment = events.updateEventFlag_ShowParticipantPostPayment;
exports.updateEventFlag_PublishDraw = events.updateEventFlag_PublishDraw;
exports.updateEventFlag_PublishResult = events.updateEventFlag_PublishResult;









exports.logEntryAdd = entry.logEntryAdd;
exports.logEntryDelete = entry.logEntryDelete;
exports.logEntryUpdate = entry.logEntryUpdate;
exports.getAllEventEntryCount = entry.getAllEventEntryCount;
exports.getEventEntryCountForCategory = entry.getEventEntryCountForCategory;
exports.getEventsEntryCount = entry.getEventsEntryCount;

exports.getApplicableEvent = registration.getApplicableEvent;
exports.registerEvent = registration.registerEvent;
exports.getAllRegisteredEventList = registration.getAllRegisteredEventList;
exports.getParticipants = registration.getParticipants;
exports.registerAllEvent = registration.registerAllEvent;
exports.withdrawRegistration = registration.withdrawRegistration;


exports.storePostData = common.storePostData;
