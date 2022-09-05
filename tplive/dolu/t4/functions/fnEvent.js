const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.logEventAdd = functions
  .region('asia-south1')
  .firestore.document('/EventList/{id}')
  .onCreate(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    var docIDSport = "";
    var docIDCity = "";
    var entryCount = 0;
    await admin.firestore().collection("EventSummaryBySports").where("SportName", "==", inputData.SportName)
      .get().then(async (changes) => {
        changes.forEach(doc1 => {
          docIDSport = doc1.id;
          eventCount = Number(doc1.data().EventCount);
        });

        if (docIDSport != "" & docIDSport != undefined) {
          await admin.firestore().collection("EventSummaryBySports").doc(docIDSport).set({
            SportName: inputData.SportName,
            EventCount: eventCount + 1,
          });
        } else {

          await admin.firestore().collection("EventSummaryBySports").add({
            SportName: inputData.SportName,
            EventCount: 1,
          });
        }

      });

    if (inputData.City != null && inputData.City != undefined && inputData.City != "") {
      await admin.firestore().collection("EventSummaryByCity").where("City", "==", inputData.City)
        .get().then(async (changes) => {
          changes.forEach(doc1 => {
            docIDCity = doc1.id;
            eventCount = Number(doc1.data().EventCount);
          });

          if (docIDCity != "" & docIDCity != undefined) {
            await admin.firestore().collection("EventSummaryByCity").doc(docIDCity).set({
              City: inputData.City,
              EventCount: eventCount + 1,
            });
          } else {

            await admin.firestore().collection("EventSummaryByCity").add({
              City: inputData.City,
              EventCount: 1,
            });
          }

        });
    }
  });


exports.logEventDelete = functions
  .region('asia-south1')
  .firestore.document('/EventList/{id}')
  .onDelete(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    var docIDSport = "";
    var docIDCity = "";

    var eventCount = 0;
    await admin.firestore().collection("EventSummaryBySports").where("SportName", "==", inputData.SportName)
      .get().then(async (changes) => {
        changes.forEach(doc1 => {
          docIDSport = doc1.id;
          eventCount = Number(doc1.data().EventCount);
        });
        if (docIDSport != "" && docIDSport != undefined) {
          await admin.firestore().collection("EventSummaryBySports").doc(docIDSport).set({
            SportName: inputData.SportName,
            EventCount: eventCount - 1,
          });
        }
      });
    if (inputData.City != null && inputData.City != undefined && inputData.City != "") {
      await admin.firestore().collection("EventSummaryByCity").where("City", "==", inputData.City)
        .get().then(async (changes) => {
          changes.forEach(doc1 => {
            docIDCity = doc1.id;
            eventCount = Number(doc1.data().EventCount);
          });
          if (docIDCity != "" && docIDCity != undefined) {
            await admin.firestore().collection("EventSummaryByCity").doc(docIDCity).set({
              City: inputData.City,
              EventCount: eventCount - 1,
            });
          }
        });
    }
  });



exports.getEventSummaryBySport =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventSummaryBySports").get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            SportName: doc1.data().SportName,
            EventCount: Number(doc1.data().EventCount),
          });
          console.log(resultList);
        });
        return resultList;

      });
    });


exports.getEventSummaryByCity =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }

      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventSummaryByCity").get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            City: doc1.data().City,
            EventCount: Number(doc1.data().EventCount),
          });
          console.log(resultList);
        });
        return resultList;

      });
    });
// exports.getEventDetails =
//   functions.https.onCall((data, context) => {
//     if (!context.auth) {
//       throw new functions.https.HttpError(
//         "unauthenticatied",
//         "only authenticated user can call this"
//       );
//     }
//     const eventID = data.EventID;
//
//     console.log("eventID ", eventID);
//     return admin.firestore().collection("EventList")
//       .doc(eventID).get().then((doc1) => {
//         if (doc1.exists) {
//           // console.log(doc1);
//           let results = {};
//           return {
//             Eventid: doc1.id,
//             EventName: doc1.data().EventName,
//             EventType: doc1.data().EventType,
//             EventStatus: doc1.data().EventStatus,
//
//             OrganizerID: doc1.data().OrganizerID,
//             OrganizerName: doc1.data().OrganizerName,
//             OrganizerEmail: doc1.data().OrganizerEmail,
//             OrganizerPhone: doc1.data().OrganizerPhone,
//             OrganizerLogo: doc1.data().OrganizerLogo,
//             EventLogo: doc1.data().EventLogo,
//
//             SportName: doc1.data().SportName,
//             EventStartDate: doc1.data().EventStartDate,
//             eventEndDate: doc1.data().EventEndDate,
//             Venue: doc1.data().Venue,
//             City: doc1.data().City,
//             State: doc1.data().State,
//             RegistrationStartDate: doc1.data().RegistrationStartDate,
//             RegistrationEndDate: doc1.data().RegistrationEndDate,
//             WithdrawalEndDate: doc1.data().WithdrawalEndDate,
//
//             PaymentMode: doc1.data().PaymentMode,
//             ApprovalStatus: doc1.data().ApprovalStatus,
//             Comments: doc1.data().Comments,
//
//             RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
//             PaymentOpenFlag: doc1.data().PaymentOpenFlag,
//             DrawPublishedFlag: doc1.data().DrawPublishedFlag,
//
//           }
//
//         } else {
//           console.log("no data");
//           return {
//             id: "0",
//             msg: "No Record"
//           };
//         }
//       });
//     console.log("before return");
//   });
//
exports.getEventDetails_forAdmin =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;

      console.log("EventID ", EventID);
      return admin.firestore().collection("EventList")
        .doc(EventID).get().then((doc1) => {
          if (doc1.exists) {
            // console.log(doc1);
            let results = {};
            return {
              Eventid: doc1.id,
              EventName: doc1.data().EventName,
              EventDetails: doc1.data().EventDetails,
              EventType: doc1.data().EventType,
              EventStatus: doc1.data().EventStatus,
              OrganizationID: doc1.data().OrganizationID,
              OrganizationName: doc1.data().OrganizationName,
              OrganizerID: doc1.data().OrganizerID,
              EventOwnerName: doc1.data().EventOwnerName,
              EventOwnerEmail: doc1.data().EventOwnerEmail,
              EventOwnerPhone: doc1.data().EventOwnerPhone,
              OrganizerLogo: doc1.data().OrganizerLogo,
              EventLogo: doc1.data().EventLogo,
              ThumbImage1: doc1.data().ThumbImage1,
              ThumbImage2: doc1.data().ThumbImage2,
              ThumbImage3: doc1.data().ThumbImage3,
              ThumbImage4: doc1.data().ThumbImage4,
              EventCode: doc1.data().EventCode,
              EventMode: doc1.data().EventMode,
              SportCode: doc1.data().SportCode,
              EntryCount: doc1.data().EntryCount,
              CategoryDetails: doc1.data().CategoryDetails,
              MinimumFee: doc1.data().MinimumFee,
              MaximumFee: doc1.data().MaximumFee,
              SportName: doc1.data().SportName,
              EventStartDate: doc1.data().EventStartDate,
              EventEndDate: doc1.data().EventEndDate,
              EventVenue: doc1.data().EventVenue,
              City: doc1.data().City,
              State: doc1.data().State,
              RegistrationStartDate: doc1.data().RegistrationStartDate,
              RegistrationEndDate: doc1.data().RegistrationEndDate,
              WithdrawalEndDate: doc1.data().WithdrawalEndDate,
              PaymentMode: doc1.data().PaymentMode,
              ApprovalStatus: doc1.data().ApprovalStatus,
              EventStatus: doc1.data().EventStatus,
              Comments: doc1.data().Comments,

              RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
              PaymentOpenFlag: doc1.data().PaymentOpenFlag,
              DrawPublishedFlag: doc1.data().DrawPublishedFlag,
              ShowParticipantFlag: doc1.data().ShowParticipantFlag,
              ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
              //to be added
              LocationMap: doc1.data().LocationMap,
              VenueContact: doc1.data().VenueContact,
              MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
              ConvenienceCharge: doc1.data().ConvenienceCharge,
              IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
              MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
              MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
              DiscountRemarks: doc1.data().DiscountRemarks,
              DiscountValue: doc1.data().DiscountValue,
              OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,
              NoticeBoard: doc1.data().NoticeBoard,
              Announcement: doc1.data().Announcement,
              RulesAndRegulations: doc1.data().RulesAndRegulations,
              CloseEventFlag: doc1.data().CloseEventFlag,

              RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
              RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
              OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
              PublishDrawFlag: doc1.data().PublishDrawFlag,
              PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
              PublishResultFlag: doc1.data().PublishResultFlag,
              PublishScheduleFlag: doc1.data().PublishScheduleFlag,
              PublishGalleryFlag: doc1.data().PublishGalleryFlag,

            }

          } else {
            console.log("no data");
            return {
              id: "0",
              msg: "No Record"
            };
          }
        });
      console.log("before return");
    });


exports.getEventDetails =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      const EventID = data.EventID;

      console.log("EventID ", EventID);
      return admin.firestore().collection("EventList")
        .doc(EventID).get().then((doc1) => {
          if (doc1.exists) {
            console.log(doc1);
            let results = {};
            return {
              Eventid: doc1.id,
              EventName: doc1.data().EventName,
              EventDetails: doc1.data().EventDetails,
              EventType: doc1.data().EventType,
              EventStatus: doc1.data().EventStatus,
              OrganizationID: doc1.data().OrganizationID,
              OrganizerID: doc1.data().OrganizerID,
              EventOwnerName: doc1.data().EventOwnerName,
              EventOwnerEmail: doc1.data().EventOwnerEmail,
              EventOwnerPhone: doc1.data().EventOwnerPhone,
              OrganizerLogo: doc1.data().OrganizerLogo,
              CategoryDetails: doc1.data().CategoryDetails,
              EventLogo: doc1.data().EventLogo,
              ThumbImage1: doc1.data().ThumbImage1,
              ThumbImage2: doc1.data().ThumbImage2,
              ThumbImage3: doc1.data().ThumbImage3,
              ThumbImage4: doc1.data().ThumbImage4,

              EventCode: doc1.data().EventCode,
              EventMode: doc1.data().EventMode,
              SportCode: doc1.data().SportCode,
              EntryCount: doc1.data().EntryCount,
              MinimumFee: doc1.data().MinimumFee,
              MaximumFee: doc1.data().MaximumFee,

              SportName: doc1.data().SportName,
              EventStartDate: doc1.data().EventStartDate,
              EventEndDate: doc1.data().EventEndDate,
              EventVenue: doc1.data().EventVenue,
              City: doc1.data().City,
              State: doc1.data().State,
              RegistrationStartDate: doc1.data().RegistrationStartDate,
              RegistrationEndDate: doc1.data().RegistrationEndDate,
              WithdrawalEndDate: doc1.data().WithdrawalEndDate,
              PaymentMode: doc1.data().PaymentMode,
              ApprovalStatus: doc1.data().ApprovalStatus,
              EventStatus: doc1.data().EventStatus,
              Comments: doc1.data().Comments,

              RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
              PaymentOpenFlag: doc1.data().PaymentOpenFlag,
              ShowParticipantFlag: doc1.data().ShowParticipantFlag,
              ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
              DrawPublishedFlag: doc1.data().DrawPublishedFlag,
              //to be added
              LocationMap: doc1.data().LocationMap,
              VenueContact: doc1.data().VenueContact,
              MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
              ConvenienceCharge: doc1.data().ConvenienceCharge,
              IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
              MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
              MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
              DiscountRemarks: doc1.data().DiscountRemarks,
              DiscountValue: doc1.data().DiscountValue,
              OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,
              NoticeBoard: doc1.data().NoticeBoard,
              Announcement: doc1.data().Announcement,
              RulesAndRegulations: doc1.data().RulesAndRegulations,
              CloseEventFlag: doc1.data().CloseEventFlag,

              RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
              RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
              OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
              PublishDrawFlag: doc1.data().PublishDrawFlag,
              PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
              PublishResultFlag: doc1.data().PublishResultFlag,
              PublishScheduleFlag: doc1.data().PublishScheduleFlag,
              PublishGalleryFlag: doc1.data().PublishGalleryFlag,

            }

          } else {
            console.log("no data");
            return {
              id: "0",
              msg: "No Record"
            };
          }
        });
      console.log("before return");
    });

exports.getAllEventDetailsForYears =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      let resultList = [];

      const Year = data.year;

      var sDate = new Date(Year, 0, 1, 0, 0, 0, 0);
      var eDate = new Date(Year, 11, 31, 23, 59, 0, 0);

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList")
        .where("EventStartDate", ">=", sDate)
        .where("EventStartDate", "<=", eDate)
        .get().then((changes) => {
          changes.forEach(doc1 => {
            resultList.push({
              Eventid: doc1.id,
              EventName: doc1.data().EventName,
              EventDetails: doc1.data().EventDetails,
              EventType: doc1.data().EventType,
              EventStatus: doc1.data().EventStatus,
              OrganizationID: doc1.data().OrganizationID,
              OrganizerID: doc1.data().OrganizerID,
              EventOwnerName: doc1.data().EventOwnerName,
              EventOwnerEmail: doc1.data().EventOwnerEmail,
              EventOwnerPhone: doc1.data().EventOwnerPhone,
              OrganizerLogo: doc1.data().OrganizerLogo,
              EventLogo: doc1.data().EventLogo,
              ThumbImage1: doc1.data().ThumbImage1,
              ThumbImage2: doc1.data().ThumbImage2,
              ThumbImage3: doc1.data().ThumbImage3,
              ThumbImage4: doc1.data().ThumbImage4,

              EventCode: doc1.data().EventCode,
              EventMode: doc1.data().EventMode,
              SportCode: doc1.data().SportCode,
              EntryCount: doc1.data().EntryCount,
              CategoryDetails: doc1.data().CategoryDetails,

              MinimumFee: doc1.data().MinimumFee,
              MaximumFee: doc1.data().MaximumFee,

              SportName: doc1.data().SportName,
              EventStartDate: doc1.data().EventStartDate,
              EventEndDate: doc1.data().EventEndDate,
              EventVenue: doc1.data().EventVenue,
              City: doc1.data().City,
              State: doc1.data().State,
              RegistrationStartDate: doc1.data().RegistrationStartDate,
              RegistrationEndDate: doc1.data().RegistrationEndDate,
              WithdrawalEndDate: doc1.data().WithdrawalEndDate,
              PaymentMode: doc1.data().PaymentMode,
              ApprovalStatus: doc1.data().ApprovalStatus,
              EventStatus: doc1.data().EventStatus,
              Comments: doc1.data().Comments,

              RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
              PaymentOpenFlag: doc1.data().PaymentOpenFlag,
              ShowParticipantFlag: doc1.data().ShowParticipantFlag,
              ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
              DrawPublishedFlag: doc1.data().DrawPublishedFlag,
              //to be added
              LocationMap: doc1.data().LocationMap,
              VenueContact: doc1.data().VenueContact,
              MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
              ConvenienceCharge: doc1.data().ConvenienceCharge,
              IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
              MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
              MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
              DiscountRemarks: doc1.data().DiscountRemarks,
              DiscountValue: doc1.data().DiscountValue,
              OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

              NoticeBoard: doc1.data().NoticeBoard,
              Announcement: doc1.data().Announcement,
              RulesAndRegulations: doc1.data().RulesAndRegulations,
              CloseEventFlag: doc1.data().CloseEventFlag,
              //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
              RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
              OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
              PublishDrawFlag: doc1.data().PublishDrawFlag,
              PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
              PublishResultFlag: doc1.data().PublishResultFlag,
              PublishScheduleFlag: doc1.data().PublishScheduleFlag,
              PublishGalleryFlag: doc1.data().PublishGalleryFlag,

            });
            //console.log(resultList);
          });
          return resultList;

        });
    });

exports.getAllEventDetails =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").orderBy("ApprovalStatus").get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            Eventid: doc1.id,
            EventName: doc1.data().EventName,
            EventDetails: doc1.data().EventDetails,
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizationName: doc1.data().OrganizationName,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            ThumbImage1: doc1.data().ThumbImage1,
            ThumbImage2: doc1.data().ThumbImage2,
            ThumbImage3: doc1.data().ThumbImage3,
            ThumbImage4: doc1.data().ThumbImage4,

            EventCode: doc1.data().EventCode,
            EventMode: doc1.data().EventMode,
            SportCode: doc1.data().SportCode,
            EntryCount: doc1.data().EntryCount,
            CategoryDetails: doc1.data().CategoryDetails,

            MinimumFee: doc1.data().MinimumFee,
            MaximumFee: doc1.data().MaximumFee,

            SportName: doc1.data().SportName,
            EventStartDate: doc1.data().EventStartDate,
            EventEndDate: doc1.data().EventEndDate,
            EventVenue: doc1.data().EventVenue,
            City: doc1.data().City,
            State: doc1.data().State,
            RegistrationStartDate: doc1.data().RegistrationStartDate,
            RegistrationEndDate: doc1.data().RegistrationEndDate,
            WithdrawalEndDate: doc1.data().WithdrawalEndDate,
            PaymentMode: doc1.data().PaymentMode,
            ApprovalStatus: doc1.data().ApprovalStatus,
            EventStatus: doc1.data().EventStatus,
            Comments: doc1.data().Comments,

            RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
            PaymentOpenFlag: doc1.data().PaymentOpenFlag,
            ShowParticipantFlag: doc1.data().ShowParticipantFlag,
            ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
            DrawPublishedFlag: doc1.data().DrawPublishedFlag,
            //to be added
            LocationMap: doc1.data().LocationMap,
            VenueContact: doc1.data().VenueContact,
            MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
            ConvenienceCharge: doc1.data().ConvenienceCharge,
            IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
            MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
            MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
            DiscountRemarks: doc1.data().DiscountRemarks,
            DiscountValue: doc1.data().DiscountValue,
            OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

            NoticeBoard: doc1.data().NoticeBoard,
            Announcement: doc1.data().Announcement,
            RulesAndRegulations: doc1.data().RulesAndRegulations,
            CloseEventFlag: doc1.data().CloseEventFlag,
            //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
            RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
            OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
            PublishDrawFlag: doc1.data().PublishDrawFlag,
            PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
            PublishResultFlag: doc1.data().PublishResultFlag,
            PublishScheduleFlag: doc1.data().PublishScheduleFlag,
            PublishGalleryFlag: doc1.data().PublishGalleryFlag,

          });
          //console.log(resultList);
        });
        return resultList;

      });
    });

exports.getAllEventWithEventStatusAndLocation =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      let resultList = [];
      var cntResult = 0;
      const City = data.City;
      const Status = data.eventStatus;

      if (City === "" || City === 'All') {
        //console.log(resultList);
        return await admin.firestore().collection("EventList")
          .where("EventStatus", "==", Status)
          .orderBy("EventStartDate", "desc").get().then((changes) => {
            changes.forEach(doc1 => {
              resultList.push({
                Eventid: doc1.id,
                EventName: doc1.data().EventName,
                EventDetails: doc1.data().EventDetails,
                EventType: doc1.data().EventType,
                EventStatus: doc1.data().EventStatus,
                OrganizationID: doc1.data().OrganizationID,
                OrganizerID: doc1.data().OrganizerID,
                EventOwnerName: doc1.data().EventOwnerName,
                EventOwnerEmail: doc1.data().EventOwnerEmail,
                EventOwnerPhone: doc1.data().EventOwnerPhone,
                OrganizerLogo: doc1.data().OrganizerLogo,
                EventLogo: doc1.data().EventLogo,
                ThumbImage1: doc1.data().ThumbImage1,
                ThumbImage2: doc1.data().ThumbImage2,
                ThumbImage3: doc1.data().ThumbImage3,
                ThumbImage4: doc1.data().ThumbImage4,

                EventCode: doc1.data().EventCode,
                EventMode: doc1.data().EventMode,
                EntryCount: doc1.data().EntryCount,
                CategoryDetails: doc1.data().CategoryDetails,

                SportCode: doc1.data().SportCode,

                MinimumFee: doc1.data().MinimumFee,
                MaximumFee: doc1.data().MaximumFee,

                SportName: doc1.data().SportName,
                EventStartDate: doc1.data().EventStartDate,
                EventEndDate: doc1.data().EventEndDate,
                EventVenue: doc1.data().EventVenue,
                City: doc1.data().City,
                State: doc1.data().State,
                RegistrationStartDate: doc1.data().RegistrationStartDate,
                RegistrationEndDate: doc1.data().RegistrationEndDate,
                WithdrawalEndDate: doc1.data().WithdrawalEndDate,
                PaymentMode: doc1.data().PaymentMode,
                ApprovalStatus: doc1.data().ApprovalStatus,
                EventStatus: doc1.data().EventStatus,
                Comments: doc1.data().Comments,

                RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
                PaymentOpenFlag: doc1.data().PaymentOpenFlag,
                ShowParticipantFlag: doc1.data().ShowParticipantFlag,
                ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
                DrawPublishedFlag: doc1.data().DrawPublishedFlag,
                //to be added
                LocationMap: doc1.data().LocationMap,
                VenueContact: doc1.data().VenueContact,
                MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
                ConvenienceCharge: doc1.data().ConvenienceCharge,
                IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
                MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
                MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
                DiscountRemarks: doc1.data().DiscountRemarks,
                DiscountValue: doc1.data().DiscountValue,
                OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

                NoticeBoard: doc1.data().NoticeBoard,
                Announcement: doc1.data().Announcement,
                RulesAndRegulations: doc1.data().RulesAndRegulations,
                CloseEventFlag: doc1.data().CloseEventFlag,
                //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
                RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
                OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
                PublishDrawFlag: doc1.data().PublishDrawFlag,
                PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
                PublishResultFlag: doc1.data().PublishResultFlag,
                PublishScheduleFlag: doc1.data().PublishScheduleFlag,
                PublishGalleryFlag: doc1.data().PublishGalleryFlag,

              });
              cntResult = cntResult + 1;

            })
          })
          .then(async function (rec) {
            if (cntResult >= 10) {
              return resultList;
            } else {
              return await admin.firestore().collection("EventList")
                .orderBy("EventStatus")
                .where("EventStatus", "not-in", ['ACTIVE', 'Active', 'active', 'INACTIVE', 'Inactive', 'inactive'])
                .orderBy("EventStartDate", "desc").limit(10 - cntResult).get().then((changes) => {
                  changes.forEach(doc1 => {
                    resultList.push({
                      Eventid: doc1.id,
                      EventName: doc1.data().EventName,
                      EventDetails: doc1.data().EventDetails,
                      EventType: doc1.data().EventType,
                      EventStatus: doc1.data().EventStatus,
                      OrganizationID: doc1.data().OrganizationID,
                      OrganizerID: doc1.data().OrganizerID,
                      EventOwnerName: doc1.data().EventOwnerName,
                      EventOwnerEmail: doc1.data().EventOwnerEmail,
                      EventOwnerPhone: doc1.data().EventOwnerPhone,
                      OrganizerLogo: doc1.data().OrganizerLogo,
                      EventLogo: doc1.data().EventLogo,
                      ThumbImage1: doc1.data().ThumbImage1,
                      ThumbImage2: doc1.data().ThumbImage2,
                      ThumbImage3: doc1.data().ThumbImage3,
                      ThumbImage4: doc1.data().ThumbImage4,

                      EventCode: doc1.data().EventCode,
                      EventMode: doc1.data().EventMode,
                      EntryCount: doc1.data().EntryCount,
                      CategoryDetails: doc1.data().CategoryDetails,

                      SportCode: doc1.data().SportCode,

                      MinimumFee: doc1.data().MinimumFee,
                      MaximumFee: doc1.data().MaximumFee,

                      SportName: doc1.data().SportName,
                      EventStartDate: doc1.data().EventStartDate,
                      EventEndDate: doc1.data().EventEndDate,
                      EventVenue: doc1.data().EventVenue,
                      City: doc1.data().City,
                      State: doc1.data().State,
                      RegistrationStartDate: doc1.data().RegistrationStartDate,
                      RegistrationEndDate: doc1.data().RegistrationEndDate,
                      WithdrawalEndDate: doc1.data().WithdrawalEndDate,
                      PaymentMode: doc1.data().PaymentMode,
                      ApprovalStatus: doc1.data().ApprovalStatus,
                      EventStatus: doc1.data().EventStatus,
                      Comments: doc1.data().Comments,

                      RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
                      PaymentOpenFlag: doc1.data().PaymentOpenFlag,
                      ShowParticipantFlag: doc1.data().ShowParticipantFlag,
                      ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
                      DrawPublishedFlag: doc1.data().DrawPublishedFlag,
                      //to be added
                      LocationMap: doc1.data().LocationMap,
                      VenueContact: doc1.data().VenueContact,
                      MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
                      ConvenienceCharge: doc1.data().ConvenienceCharge,
                      IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
                      MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
                      MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
                      DiscountRemarks: doc1.data().DiscountRemarks,
                      DiscountValue: doc1.data().DiscountValue,
                      OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

                      NoticeBoard: doc1.data().NoticeBoard,
                      Announcement: doc1.data().Announcement,
                      RulesAndRegulations: doc1.data().RulesAndRegulations,
                      CloseEventFlag: doc1.data().CloseEventFlag,
                      //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
                      RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
                      OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
                      PublishDrawFlag: doc1.data().PublishDrawFlag,
                      PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
                      PublishResultFlag: doc1.data().PublishResultFlag,
                      PublishScheduleFlag: doc1.data().PublishScheduleFlag,
                      PublishGalleryFlag: doc1.data().PublishGalleryFlag,

                    });
                    //console.log(resultList);
                  });
                  return resultList;
                });
            }
          });
      } else {
        return await admin.firestore().collection("EventList")
          .where("EventStatus", "==", Status)
          .where("City", "==", City)
          .orderBy("EventStartDate", "desc").get().then((changes) => {
            changes.forEach(doc1 => {
              resultList.push({
                Eventid: doc1.id,
                EventName: doc1.data().EventName,
                EventDetails: doc1.data().EventDetails,
                EventType: doc1.data().EventType,
                EventStatus: doc1.data().EventStatus,
                OrganizationID: doc1.data().OrganizationID,
                OrganizerID: doc1.data().OrganizerID,
                EventOwnerName: doc1.data().EventOwnerName,
                EventOwnerEmail: doc1.data().EventOwnerEmail,
                EventOwnerPhone: doc1.data().EventOwnerPhone,
                OrganizerLogo: doc1.data().OrganizerLogo,
                EventLogo: doc1.data().EventLogo,
                ThumbImage1: doc1.data().ThumbImage1,
                ThumbImage2: doc1.data().ThumbImage2,
                ThumbImage3: doc1.data().ThumbImage3,
                ThumbImage4: doc1.data().ThumbImage4,

                EventCode: doc1.data().EventCode,
                EventMode: doc1.data().EventMode,
                EntryCount: doc1.data().EntryCount,
                CategoryDetails: doc1.data().CategoryDetails,

                SportCode: doc1.data().SportCode,

                MinimumFee: doc1.data().MinimumFee,
                MaximumFee: doc1.data().MaximumFee,

                SportName: doc1.data().SportName,
                EventStartDate: doc1.data().EventStartDate,
                EventEndDate: doc1.data().EventEndDate,
                EventVenue: doc1.data().EventVenue,
                City: doc1.data().City,
                State: doc1.data().State,
                RegistrationStartDate: doc1.data().RegistrationStartDate,
                RegistrationEndDate: doc1.data().RegistrationEndDate,
                WithdrawalEndDate: doc1.data().WithdrawalEndDate,
                PaymentMode: doc1.data().PaymentMode,
                ApprovalStatus: doc1.data().ApprovalStatus,
                EventStatus: doc1.data().EventStatus,
                Comments: doc1.data().Comments,

                RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
                PaymentOpenFlag: doc1.data().PaymentOpenFlag,
                ShowParticipantFlag: doc1.data().ShowParticipantFlag,
                ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
                DrawPublishedFlag: doc1.data().DrawPublishedFlag,
                //to be added
                LocationMap: doc1.data().LocationMap,
                VenueContact: doc1.data().VenueContact,
                MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
                ConvenienceCharge: doc1.data().ConvenienceCharge,
                IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
                MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
                MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
                DiscountRemarks: doc1.data().DiscountRemarks,
                DiscountValue: doc1.data().DiscountValue,
                OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

                NoticeBoard: doc1.data().NoticeBoard,
                Announcement: doc1.data().Announcement,
                RulesAndRegulations: doc1.data().RulesAndRegulations,
                CloseEventFlag: doc1.data().CloseEventFlag,
                //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
                RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
                OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
                PublishDrawFlag: doc1.data().PublishDrawFlag,
                PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
                PublishResultFlag: doc1.data().PublishResultFlag,
                PublishScheduleFlag: doc1.data().PublishScheduleFlag,
                PublishGalleryFlag: doc1.data().PublishGalleryFlag,

              });
              cntResult = cntResult + 1;

              //console.log(resultList);
            })
          })
          .then(async function (rec) {
            if (cntResult > 10) {

              return resultList;
            } else {
              return await admin.firestore().collection("EventList")
                .orderBy("EventStatus")
                .where("EventStatus", "not-in", ['ACTIVE', 'Active', 'active', 'INACTIVE', 'Inactive', 'inactive'])
                .where("City", "==", City)
                .orderBy("EventStartDate", "desc").limit(10 - cntResult).get().then((changes) => {
                  changes.forEach(doc1 => {
                    resultList.push({
                      Eventid: doc1.id,
                      EventName: doc1.data().EventName,
                      EventDetails: doc1.data().EventDetails,
                      EventType: doc1.data().EventType,
                      EventStatus: doc1.data().EventStatus,
                      OrganizationID: doc1.data().OrganizationID,
                      OrganizerID: doc1.data().OrganizerID,
                      EventOwnerName: doc1.data().EventOwnerName,
                      EventOwnerEmail: doc1.data().EventOwnerEmail,
                      EventOwnerPhone: doc1.data().EventOwnerPhone,
                      OrganizerLogo: doc1.data().OrganizerLogo,
                      EventLogo: doc1.data().EventLogo,
                      ThumbImage1: doc1.data().ThumbImage1,
                      ThumbImage2: doc1.data().ThumbImage2,
                      ThumbImage3: doc1.data().ThumbImage3,
                      ThumbImage4: doc1.data().ThumbImage4,

                      EventCode: doc1.data().EventCode,
                      EventMode: doc1.data().EventMode,
                      EntryCount: doc1.data().EntryCount,
                      CategoryDetails: doc1.data().CategoryDetails,

                      SportCode: doc1.data().SportCode,

                      MinimumFee: doc1.data().MinimumFee,
                      MaximumFee: doc1.data().MaximumFee,

                      SportName: doc1.data().SportName,
                      EventStartDate: doc1.data().EventStartDate,
                      EventEndDate: doc1.data().EventEndDate,
                      EventVenue: doc1.data().EventVenue,
                      City: doc1.data().City,
                      State: doc1.data().State,
                      RegistrationStartDate: doc1.data().RegistrationStartDate,
                      RegistrationEndDate: doc1.data().RegistrationEndDate,
                      WithdrawalEndDate: doc1.data().WithdrawalEndDate,
                      PaymentMode: doc1.data().PaymentMode,
                      ApprovalStatus: doc1.data().ApprovalStatus,
                      EventStatus: doc1.data().EventStatus,
                      Comments: doc1.data().Comments,

                      RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
                      PaymentOpenFlag: doc1.data().PaymentOpenFlag,
                      ShowParticipantFlag: doc1.data().ShowParticipantFlag,
                      ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
                      DrawPublishedFlag: doc1.data().DrawPublishedFlag,
                      //to be added
                      LocationMap: doc1.data().LocationMap,
                      VenueContact: doc1.data().VenueContact,
                      MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
                      ConvenienceCharge: doc1.data().ConvenienceCharge,
                      IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
                      MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
                      MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
                      DiscountRemarks: doc1.data().DiscountRemarks,
                      DiscountValue: doc1.data().DiscountValue,
                      OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

                      NoticeBoard: doc1.data().NoticeBoard,
                      Announcement: doc1.data().Announcement,
                      RulesAndRegulations: doc1.data().RulesAndRegulations,
                      CloseEventFlag: doc1.data().CloseEventFlag,
                      //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
                      RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
                      OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
                      PublishDrawFlag: doc1.data().PublishDrawFlag,
                      PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
                      PublishResultFlag: doc1.data().PublishResultFlag,
                      PublishScheduleFlag: doc1.data().PublishScheduleFlag,
                      PublishGalleryFlag: doc1.data().PublishGalleryFlag,

                    });
                    //console.log(resultList);
                  });
                  return resultList;
                });
            }
          });

      }
    });

exports.getAllEventDetailsByCity =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      let resultList = [];

      const City = data.City;


      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList")
        .where("City", "==", City)
        .orderBy("ApprovalStatus").get().then((changes) => {
          changes.forEach(doc1 => {
            resultList.push({
              Eventid: doc1.id,
              EventName: doc1.data().EventName,
              EventDetails: doc1.data().EventDetails,
              EventType: doc1.data().EventType,
              EventStatus: doc1.data().EventStatus,
              OrganizationID: doc1.data().OrganizationID,
              OrganizationName: doc1.data().OrganizationName,
              OrganizerID: doc1.data().OrganizerID,
              EventOwnerName: doc1.data().EventOwnerName,
              EventOwnerEmail: doc1.data().EventOwnerEmail,
              EventOwnerPhone: doc1.data().EventOwnerPhone,
              OrganizerLogo: doc1.data().OrganizerLogo,
              EventLogo: doc1.data().EventLogo,
              ThumbImage1: doc1.data().ThumbImage1,
              ThumbImage2: doc1.data().ThumbImage2,
              ThumbImage3: doc1.data().ThumbImage3,
              ThumbImage4: doc1.data().ThumbImage4,

              EventCode: doc1.data().EventCode,
              EventMode: doc1.data().EventMode,
              EntryCount: doc1.data().EntryCount,
              CategoryDetails: doc1.data().CategoryDetails,

              SportCode: doc1.data().SportCode,

              MinimumFee: doc1.data().MinimumFee,
              MaximumFee: doc1.data().MaximumFee,

              SportName: doc1.data().SportName,
              EventStartDate: doc1.data().EventStartDate,
              EventEndDate: doc1.data().EventEndDate,
              EventVenue: doc1.data().EventVenue,
              City: doc1.data().City,
              State: doc1.data().State,
              RegistrationStartDate: doc1.data().RegistrationStartDate,
              RegistrationEndDate: doc1.data().RegistrationEndDate,
              WithdrawalEndDate: doc1.data().WithdrawalEndDate,
              PaymentMode: doc1.data().PaymentMode,
              ApprovalStatus: doc1.data().ApprovalStatus,
              EventStatus: doc1.data().EventStatus,
              Comments: doc1.data().Comments,

              RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
              PaymentOpenFlag: doc1.data().PaymentOpenFlag,
              ShowParticipantFlag: doc1.data().ShowParticipantFlag,
              ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
              DrawPublishedFlag: doc1.data().DrawPublishedFlag,
              //to be added
              LocationMap: doc1.data().LocationMap,
              VenueContact: doc1.data().VenueContact,
              MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
              ConvenienceCharge: doc1.data().ConvenienceCharge,
              IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
              MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
              MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
              DiscountRemarks: doc1.data().DiscountRemarks,
              DiscountValue: doc1.data().DiscountValue,
              OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

              NoticeBoard: doc1.data().NoticeBoard,
              Announcement: doc1.data().Announcement,
              RulesAndRegulations: doc1.data().RulesAndRegulations,
              CloseEventFlag: doc1.data().CloseEventFlag,
              //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
              RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
              OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
              PublishDrawFlag: doc1.data().PublishDrawFlag,
              PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
              PublishResultFlag: doc1.data().PublishResultFlag,
              PublishScheduleFlag: doc1.data().PublishScheduleFlag,
              PublishGalleryFlag: doc1.data().PublishGalleryFlag,

            });
            //console.log(resultList);
          });
          return resultList;

        });
    });


exports.getAllEventDetailsForOrganizer =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const organizerID = data.organizerID;

      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").where("OrganizerID", "==", organizerID).get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            Eventid: doc1.id,
            EventName: doc1.data().EventName,
            EventDetails: doc1.data().EventDetails,
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizationName: doc1.data().OrganizationName,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            ThumbImage1: doc1.data().ThumbImage1,
            ThumbImage2: doc1.data().ThumbImage2,
            ThumbImage3: doc1.data().ThumbImage3,
            ThumbImage4: doc1.data().ThumbImage4,

            EventCode: doc1.data().EventCode,
            EventMode: doc1.data().EventMode,
            EntryCount: doc1.data().EntryCount,
            CategoryDetails: doc1.data().CategoryDetails,

            SportCode: doc1.data().SportCode,

            MinimumFee: doc1.data().MinimumFee,
            MaximumFee: doc1.data().MaximumFee,

            SportName: doc1.data().SportName,
            EventStartDate: doc1.data().EventStartDate,
            EventEndDate: doc1.data().EventEndDate,
            EventVenue: doc1.data().EventVenue,
            City: doc1.data().City,
            State: doc1.data().State,
            RegistrationStartDate: doc1.data().RegistrationStartDate,
            RegistrationEndDate: doc1.data().RegistrationEndDate,
            WithdrawalEndDate: doc1.data().WithdrawalEndDate,
            PaymentMode: doc1.data().PaymentMode,
            ApprovalStatus: doc1.data().ApprovalStatus,
            EventStatus: doc1.data().EventStatus,
            Comments: doc1.data().Comments,

            RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
            PaymentOpenFlag: doc1.data().PaymentOpenFlag,
            ShowParticipantFlag: doc1.data().ShowParticipantFlag,
            ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
            DrawPublishedFlag: doc1.data().DrawPublishedFlag,
            //to be added
            LocationMap: doc1.data().LocationMap,
            VenueContact: doc1.data().VenueContact,
            MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
            ConvenienceCharge: doc1.data().ConvenienceCharge,
            IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
            MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
            MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
            DiscountRemarks: doc1.data().DiscountRemarks,
            DiscountValue: doc1.data().DiscountValue,
            OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,

            NoticeBoard: doc1.data().NoticeBoard,
            Announcement: doc1.data().Announcement,
            RulesAndRegulations: doc1.data().RulesAndRegulations,
            CloseEventFlag: doc1.data().CloseEventFlag,
            //RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
            RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
            OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
            PublishDrawFlag: doc1.data().PublishDrawFlag,
            PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
            PublishResultFlag: doc1.data().PublishResultFlag,
            PublishScheduleFlag: doc1.data().PublishScheduleFlag,
            PublishGalleryFlag: doc1.data().PublishGalleryFlag,

          });
          console.log(resultList);
        });
        return resultList;

      });
    });

// exports.addEventDetails =
//   functions.https.onCall((data, context) => {
//     if (!context.auth) {
//       throw new functions.https.HttpError(
//         "unauthenticatied",
//         "only authenticated user can call this"
//       );
//     }
//
//     const EventName = data.EventName;
//     const EventType =  data.EventType;
//     const EventStatus= data.EventStatus;
//
//     const OrganizerID = data.OrganizerID;
//     const OrganizerName =  data.OrganizerName;
//     const OrganizerEmail =  data.OrganizerEmail;
//     const OrganizerPhone =  data.OrganizerPhone;
//     const OrganizerLogo =  data.OrganizerLogo;
//     const EventLogo =  data.EventLogo;
//
//     const SportName = data.SportName;
//     const EventStartDate = data.EventStartDate;
//     const eventEndDate= data.EventEndDate;
//     const Venue= data.Venue;
//     const City= data.City
//     const State= data.State;
//     const RegistrationStartDate= data.RegistrationStartDate;
//     const RegistrationEndDate= data.RegistrationEndDate;
//     const WithdrawalEndDate= data.WithdrawalEndDate;
//
//     const PaymentMode= data.PaymentMode;
//     const ApprovalStatus= data.ApprovalStatus;
//     const Comments= data.Comments;
//
//     const RegistrationOpenFlag= data.RegistrationOpenFlag;
//     const PaymentOpenFlag= data.PaymentOpenFlag;
//     const DrawPublishedFlag= data.DrawPublishedFlag;
//
//
//     return admin.firestore().collection("EventList")
//       .add({
//         EventName :EventName,
//         EventType: EventType,
//         EventStatus: EventStatus,
//
//         OrganizerID:OrganizerID,
//         OrganizerName:OrganizerName,
//         OrganizerEmail:OrganizerEmail,
//         OrganizerPhone:OrganizerPhone,
//         OrganizerLogo:OrganizerLogo,
//         EventLogo:EventLogo,
//
//         SportName: SportName,
//         EventStartDate: EventStartDate,
//         eventEndDate: EventEndDate,
//         Venue: Venue,
//         City: City,
//         State: State,
//         RegistrationStartDate: RegistrationStartDate,
//         RegistrationEndDate: RegistrationEndDate,
//         WithdrawalEndDate: WithdrawalEndDate,
//
//         PaymentMode: PaymentMode,
//         ApprovalStatus: ApprovalStatus,
//         Comments: Comments,
//
//         RegistrationOpenFlag: RegistrationOpenFlag,
//         PaymentOpenFlag: PaymentOpenFlag,
//         DrawPublishedFlag: DrawPublishedFlag,
//         CreatedBy: context.auth.uid,
//         CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
//       })
//       .then(function(docRef) {
//         return {
//           EventID: docRef.id
//         };
//       })
//       .catch(function(error) {
//         console.log("in error");
//         return {
//           EventID: "0"
//         };
//       });
//
//     console.log("before return");
//   });
//

exports.addEventDetails =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const OrganizationID = data.OrganizationID;
      const OrganizerID = data.OrganizerID;
      const OrganizationName = data.OrganizationName;
      const SportName = data.SportName;
      const EventName = data.EventName;
      const EventOwnerName = data.EventOwnerName;
      const EventOwnerEmail = data.EventOwnerEmail;
      const EventOwnerPhone = data.EventOwnerPhone;
      const EventVenue = data.EventVenue;
      const LocationMap = data.LocationMap;
      const VenueContact = data.VenueContact;
      const ApprovalStatus = data.ApprovalStatus;
      const EventStatus = data.EventStatus;
      const EventCode = data.EventCode;
      const EventMode = data.EventMode;
      const EventStartDate = data.EventStartDate;
      const EventEndDate = data.EventEndDate;


      const SportCode = data.SportCode;
      const City = data.City;
      console.log(data);

      return admin.firestore().collection("EventList")
        .add({
          OrganizationID: OrganizationID,
          OrganizerID: OrganizerID,
          OrganizationName: OrganizationName,
          SportName: SportName,
          EventName: EventName,
          EventOwnerName: EventOwnerName,
          EventOwnerEmail: EventOwnerEmail,
          EventOwnerPhone: EventOwnerPhone,
          EventVenue: EventVenue,
          LocationMap: LocationMap,
          VenueContact: VenueContact,
          ApprovalStatus: ApprovalStatus,
          EventStatus: EventStatus,
          EventCode: EventCode,
          EventMode: EventMode,
          SportCode: SportCode,
          City: City,
          EntryCount: 0,
          EventLogo: '',
          ThumbImage1: '',
          ThumbImage2: '',
          ThumbImage3: '',
          ThumbImage4: '',
          EventStartDate: admin.firestore.Timestamp.fromDate(new Date(EventStartDate)),
          EventEndDate: admin.firestore.Timestamp.fromDate(new Date(EventEndDate)),

          CreatedBy: context.auth.uid,
          CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function (docRef) {
          return {
            EventID: docRef.id
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            EventID: "0"
          };
        });

      console.log("before return");
    });

exports.updateEventBasicDetails =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }


      const EventID = data.EventID;
      const EventName = data.EventName;
      const EventType = data.EventType;
      const OrganizerID = data.OrganizerID;
      const OrganizationName = data.OrganizationName;
      const EventOwnerName = data.EventOwnerName;
      const EventOwnerEmail = data.EventOwnerEmail;
      const EventOwnerPhone = data.EventOwnerPhone;
      const SportName = data.SportName;
      const EventVenue = data.EventVenue;
      const EventCode = data.EventCode;
      const EventMode = data.EventMode;
      const SportCode = data.SportCode;
      const City = data.City;
      const State = data.State;
      const OrganizationID = data.OrganizationID;
      const LocationMap = data.LocationMap;
      const VenueContact = data.VenueContact;
      const ApprovalStatus = data.ApprovalStatus;
      const EventStatus = data.EventStatus;

      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          EventName: EventName,
          EventType: EventType,
          OrganizerID: OrganizerID,
          OrganizationName: OrganizationName,
          EventOwnerName: EventOwnerName,
          EventOwnerEmail: EventOwnerEmail,
          EventOwnerPhone: EventOwnerPhone,
          SportName: SportName,
          EventVenue: EventVenue,
          EventCode: EventCode,
          EventMode: EventMode,
          SportCode: SportCode,
          City: City,
          State: State,
          OrganizationID: OrganizationID,
          LocationMap: LocationMap,
          VenueContact: VenueContact,
          ApprovalStatus: ApprovalStatus,
          EventStatus: EventStatus,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });
exports.getEventCategoryDetails =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      const EventID = data.EventID;
      var resultList = [];

      console.log("EventID ", EventID);
      return admin.firestore().collection("EventList")
        .doc(EventID).get().then((doc1) => {
          if (doc1.exists) {
            // console.log(doc1);
            let results = {};
            return {
              Eventid: doc1.id,
              CategoryDetails: doc1.data().CategoryDetails,
            }

          } else {
            console.log("no data");
            return {
              id: "0",
              msg: "No Record"
            };
          }
        });
      console.log("before return");
    });

exports.setEventCategoryDetails =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const CategoryDetails = data.CategoryDetails;
      var iMin = 0;
      var iMax = 0;
      for (index = 0; index < data.CategoryDetails.length; index++) {
        if (index === 0) {
          iMin = data.CategoryDetails[index].Fees;
          iMax = data.CategoryDetails[index].Fees;
        } else {
          if (data.CategoryDetails[index].Fees < iMin) {
            iMin = data.CategoryDetails[index].Fees;
          }
          if (data.CategoryDetails[index].Fees > iMax) {
            iMax = data.CategoryDetails[index].Fees;
          }
        }

        data.CategoryDetails[index].ReferenceDate = admin.firestore.Timestamp.fromDate(new Date(data.CategoryDetails[index].ReferenceDate));
      }
      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          CategoryDetails: CategoryDetails,
          MinimumFee: Number(iMin),
          MaximumFee: Number(iMax),
          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventDetails_Dates =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const EventStartDate = data.EventStartDate;
      const EventEndDate = data.EventEndDate;
      const RegistrationStartDate = data.RegistrationStartDate;
      const RegistrationEndDate = data.RegistrationEndDate;
      const WithdrawalEndDate = data.WithdrawalEndDate;
      const MaxEntryForParticipant = data.maxEntryForParticipant;

      console.log("eventID ", EventID);
      console.log("date", new Date(EventStartDate));

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          EventStartDate: admin.firestore.Timestamp.fromDate(new Date(EventStartDate)),
          EventEndDate: admin.firestore.Timestamp.fromDate(new Date(EventEndDate)),
          RegistrationStartDate: admin.firestore.Timestamp.fromDate(new Date(RegistrationStartDate)),
          RegistrationEndDate: admin.firestore.Timestamp.fromDate(new Date(RegistrationEndDate)),
          WithdrawalEndDate: admin.firestore.Timestamp.fromDate(new Date(WithdrawalEndDate)),
          MaxEntryForParticipant: MaxEntryForParticipant,
          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEventDetails_Logo =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;

      const OrganizerLogo = data.OrganizerLogo;
      const EventLogo = data.EventLogo;
      const ThumbImage1 = data.ThumbImage1;
      const ThumbImage2 = data.ThumbImage2;
      const ThumbImage3 = data.ThumbImage3;
      const ThumbImage4 = data.ThumbImage4;

      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(Eventid)
        .update({
          OrganizerLogo: OrganizerLogo,
          EventLogo: EventLogo,
          ThumbImage1: ThumbImage1,
          ThumbImage2: ThumbImage2,
          ThumbImage3: ThumbImage3,
          ThumbImage4: ThumbImage4,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventDetails_ApprovalStatus =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ApprovalStatus = data.ApprovalStatus;
      const Comments = data.Comments;

      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          ApprovalStatus: ApprovalStatus,
          Comments: Comments,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventDetails_PaymentStatus =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const OnlinePaymentModeFlag = data.OnlinePaymentModeFlag;
      const RegistrationCompletePostPaymentFlag = data.RegistrationCompletePostPaymentFlag;
      const ConvenienceCharge = data.ConvenienceCharge;
      const MiscellaneousChargeRemark = data.MiscellaneousChargeRemark;
      const MiscellaneousChargeFees = data.MiscellaneousChargeFees;
      const IsMiscellaneousChargeMandatory = data.IsMiscellaneousChargeMandatory;
      const DiscountRemarks = data.DiscountRemarks;
      const DiscountValue = data.DiscountValue;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          OnlinePaymentModeFlag: OnlinePaymentModeFlag,
          RegistrationCompletePostPaymentFlag: RegistrationCompletePostPaymentFlag,
          ConvenienceCharge: ConvenienceCharge,
          MiscellaneousChargeRemark: MiscellaneousChargeRemark,
          MiscellaneousChargeFees: MiscellaneousChargeFees,
          IsMiscellaneousChargeMandatory: IsMiscellaneousChargeMandatory,
          DiscountRemarks: DiscountRemarks,
          DiscountValue: DiscountValue,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });
exports.updateEventDetails_NoticeBoard =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const NoticeBoard = data.NoticeBoard;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          NoticeBoard: NoticeBoard,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventDetails_EventStatus =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const EventStatus = data.EventStatus;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          EventStatus: EventStatus,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventDetails_Announcement =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const Announcement = data.Announcement;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          Announcement: Announcement,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEventDetails_EventMode =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const Announcement = data.EventMode;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          EventMode: EventMode,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });
exports.updateEventDetails_RulesAndRegulations =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const RulesAndRegulations = data.RulesAndRegulations;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          RulesAndRegulations: RulesAndRegulations,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventDetails_DrawLink =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const DrawLink = data.DrawLink;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          DrawLink: DrawLink,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventFlag_CloseEvent =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const CloseEventFlag = data.CloseEventFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          CloseEventFlag: CloseEventFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEventFlag_RegistrationOn =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const RegistrationOpenFlag = data.RegistrationOpenFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          RegistrationOpenFlag: RegistrationOpenFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventFlag_RegistrationCompletePostPayment =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const RegistrationCompletePostPaymentFlag = data.RegistrationCompletePostPaymentFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          RegistrationCompletePostPaymentFlag: RegistrationCompletePostPaymentFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventFlag_OnlinePaymentMode =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const OnlinePaymentModeFlag = data.OnlinePaymentModeFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          OnlinePaymentModeFlag: OnlinePaymentModeFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventFlag_PublishSeed =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const PublishSeedEntryFlag = data.PublishSeedEntryFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          PublishSeedEntryFlag: PublishSeedEntryFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEventFlag_PublishResult =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const PublishResultFlag = data.PublishResultFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          PublishResultFlag: PublishResultFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEventFlag_ShowParticipantPostPayment =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ShowParticipantPostPaymentFlag = data.ShowParticipantPostPaymentFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          ShowParticipantPostPaymentFlag: ShowParticipantPostPaymentFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEventFlag_ShowParticipant =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ShowParticipantFlag = data.ShowParticipantFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          ShowParticipantFlag: ShowParticipantFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEventFlag_PublishDraw =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const DrawPublishedFlag = data.DrawPublishedFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          DrawPublishedFlag: DrawPublishedFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventFlag_PublishSchedule =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const PublishScheduleFlag = data.PublishScheduleFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          PublishScheduleFlag: PublishScheduleFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.updateEventFlag_PublishGallery =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const PublishGalleryFlag = data.PublishGalleryFlag;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          PublishGalleryFlag: PublishGalleryFlag,

          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });


exports.updateEvent_EventDetails =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const EventDetails = data.EventDetails;
      console.log("eventID ", EventID);

      return admin.firestore().collection("EventList")
        .doc(EventID)
        .update({
          EventDetails: EventDetails,
          UpdatedBy: context.auth.uid,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return {
            retCode: "0"
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            retCode: "1"
          };;
        });
    });

exports.getAllEventForOrganizerWithStatus =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const organizerID = data.organizerID;
      const approvalStatus = data.approvalStatus;


      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").where("OrganizerID", "==", organizerID).where("ApprovalStatus", "==", approvalStatus).get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            Eventid: doc1.id,
            EventName: doc1.data().EventName,
            EventDetails: doc1.data().EventDetails,
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            MinimumFee: doc1.data().MinimumFee,
            MaximumFee: doc1.data().MaximumFee,

            OrganizerID: doc1.data().OrganizerID,
            OrganizerName: doc1.data().OrganizerName,
            OrganizerEmail: doc1.data().OrganizerEmail,
            OrganizerPhone: doc1.data().OrganizerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            ThumbImage1: doc1.data().ThumbImage1,
            ThumbImage2: doc1.data().ThumbImage2,
            ThumbImage3: doc1.data().ThumbImage3,
            ThumbImage4: doc1.data().ThumbImage4,

            EventCode: doc1.data().EventCode,
            EventMode: doc1.data().EventMode,
            SportCode: doc1.data().SportCode,
            EntryCount: doc1.data().EntryCount,
            CategoryDetails: doc1.data().CategoryDetails,

            SportName: doc1.data().SportName,
            EventStartDate: doc1.data().EventStartDate,
            eventEndDate: doc1.data().EventEndDate,
            Venue: doc1.data().Venue,
            City: doc1.data().City,
            State: doc1.data().State,
            RegistrationStartDate: doc1.data().RegistrationStartDate,
            RegistrationEndDate: doc1.data().RegistrationEndDate,
            WithdrawalEndDate: doc1.data().WithdrawalEndDate,

            PaymentMode: doc1.data().PaymentMode,
            ApprovalStatus: doc1.data().ApprovalStatus,
            EventStatus: doc1.data().EventStatus,
            Comments: doc1.data().Comments,

            RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
            PaymentOpenFlag: doc1.data().PaymentOpenFlag,
            DrawPublishedFlag: doc1.data().DrawPublishedFlag,
          });
          console.log(resultList);
        });
        return resultList;

      });
    });


exports.getAllEventWithStatus =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      //   if (!context.auth) {
      //     throw new functions.https.HttpError(
      //       "unauthenticatied",
      //       "only authenticated user can call this"
      //     );
      //   }
      const approvalStatus = data.approvalStatus;
      // const range = data.selectionRange;


      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").where("EventStatus", "in", eventStatusList).orderBy("EventStartDate", "desc").get()
        .then((changes) => {
          changes.forEach(doc1 => {
            resultList.push({
              Eventid: doc1.id,
              EventName: doc1.data().EventName,
              EventDetails: doc1.data().EventDetails,
              EventType: doc1.data().EventType,
              EventStatus: doc1.data().EventStatus,
              OrganizationID: doc1.data().OrganizationID,
              OrganizerID: doc1.data().OrganizerID,
              EventOwnerName: doc1.data().EventOwnerName,
              EventOwnerEmail: doc1.data().EventOwnerEmail,
              EventOwnerPhone: doc1.data().EventOwnerPhone,
              OrganizerLogo: doc1.data().OrganizerLogo,
              EventLogo: doc1.data().EventLogo,
              ThumbImage1: doc1.data().ThumbImage1,
              ThumbImage2: doc1.data().ThumbImage2,
              ThumbImage3: doc1.data().ThumbImage3,
              ThumbImage4: doc1.data().ThumbImage4,

              EventCode: doc1.data().EventCode,
              EventMode: doc1.data().EventMode,
              SportCode: doc1.data().SportCode,
              EntryCount: doc1.data().EntryCount,
              MinimumFee: doc1.data().MinimumFee,
              MaximumFee: doc1.data().MaximumFee,
              CategoryDetails: doc1.data().CategoryDetails,

              SportName: doc1.data().SportName,
              EventStartDate: doc1.data().EventStartDate,
              EventEndDate: doc1.data().EventEndDate,
              EventVenue: doc1.data().EventVenue,
              City: doc1.data().City,
              State: doc1.data().State,
              RegistrationStartDate: doc1.data().RegistrationStartDate,
              RegistrationEndDate: doc1.data().RegistrationEndDate,
              WithdrawalEndDate: doc1.data().WithdrawalEndDate,
              PaymentMode: doc1.data().PaymentMode,
              ApprovalStatus: doc1.data().ApprovalStatus,
              EventStatus: doc1.data().EventStatus,
              Comments: doc1.data().Comments,

              RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
              PaymentOpenFlag: doc1.data().PaymentOpenFlag,
              ShowParticipantFlag: doc1.data().ShowParticipantFlag,
              ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
              DrawPublishedFlag: doc1.data().DrawPublishedFlag,
              //to be added
              LocationMap: doc1.data().LocationMap,
              VenueContact: doc1.data().VenueContact,
              MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
              ConvenienceCharge: doc1.data().ConvenienceCharge,
              IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
              MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
              MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
              DiscountRemarks: doc1.data().DiscountRemarks,
              DiscountValue: doc1.data().DiscountValue,
              OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,
              NoticeBoard: doc1.data().NoticeBoard,
              Announcement: doc1.data().Announcement,
              RulesAndRegulations: doc1.data().RulesAndRegulations,
              CloseEventFlag: doc1.data().CloseEventFlag,

              RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
              RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
              OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
              PublishDrawFlag: doc1.data().PublishDrawFlag,
              PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
              PublishResultFlag: doc1.data().PublishResultFlag,
              PublishScheduleFlag: doc1.data().PublishScheduleFlag,
              PublishGalleryFlag: doc1.data().PublishGalleryFlag,

            });
            console.log(resultList);
          });
          return resultList;

        });
    });



exports.getAllEventWithEventStatus1 =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      //   if (!context.auth) {
      //     throw new functions.https.HttpError(
      //       "unauthenticatied",
      //       "only authenticated user can call this"
      //     );
      //   }
      const eventStatus = data.eventStatus;

      var eventStatusList = [];
      if (eventStatus === 'All') {
        eventStatusList = ['Active', 'Inactive', 'Closed'];
      } else {
        eventStatusList = [eventStatus];
      }
      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").where("EventStatus", "in", eventStatusList).orderBy("EventStartDate", "desc").get()
        .then((changes) => {
          changes.forEach(doc1 => {
            resultList.push({
              Eventid: doc1.id,
              EventName: doc1.data().EventName,
              EventDetails: doc1.data().EventDetails,
              EventType: doc1.data().EventType,
              EventStatus: doc1.data().EventStatus,
              OrganizationID: doc1.data().OrganizationID,
              OrganizerID: doc1.data().OrganizerID,
              EventOwnerName: doc1.data().EventOwnerName,
              EventOwnerEmail: doc1.data().EventOwnerEmail,
              EventOwnerPhone: doc1.data().EventOwnerPhone,
              OrganizerLogo: doc1.data().OrganizerLogo,
              EventLogo: doc1.data().EventLogo,
              ThumbImage1: doc1.data().ThumbImage1,
              ThumbImage2: doc1.data().ThumbImage2,
              ThumbImage3: doc1.data().ThumbImage3,
              ThumbImage4: doc1.data().ThumbImage4,

              EventCode: doc1.data().EventCode,
              EventMode: doc1.data().EventMode,
              SportCode: doc1.data().SportCode,
              EntryCount: doc1.data().EntryCount,
              MinimumFee: doc1.data().MinimumFee,
              MaximumFee: doc1.data().MaximumFee,
              CategoryDetails: doc1.data().CategoryDetails,

              SportName: doc1.data().SportName,
              EventStartDate: doc1.data().EventStartDate,
              EventEndDate: doc1.data().EventEndDate,
              EventVenue: doc1.data().EventVenue,
              City: doc1.data().City,
              State: doc1.data().State,
              RegistrationStartDate: doc1.data().RegistrationStartDate,
              RegistrationEndDate: doc1.data().RegistrationEndDate,
              WithdrawalEndDate: doc1.data().WithdrawalEndDate,
              PaymentMode: doc1.data().PaymentMode,
              ApprovalStatus: doc1.data().ApprovalStatus,
              EventStatus: doc1.data().EventStatus,
              Comments: doc1.data().Comments,

              RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
              PaymentOpenFlag: doc1.data().PaymentOpenFlag,
              ShowParticipantFlag: doc1.data().ShowParticipantFlag,
              ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
              DrawPublishedFlag: doc1.data().DrawPublishedFlag,
              //to be added
              LocationMap: doc1.data().LocationMap,
              VenueContact: doc1.data().VenueContact,
              MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
              ConvenienceCharge: doc1.data().ConvenienceCharge,
              IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
              MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
              MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
              DiscountRemarks: doc1.data().DiscountRemarks,
              DiscountValue: doc1.data().DiscountValue,
              OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,
              NoticeBoard: doc1.data().NoticeBoard,
              Announcement: doc1.data().Announcement,
              RulesAndRegulations: doc1.data().RulesAndRegulations,
              CloseEventFlag: doc1.data().CloseEventFlag,

              RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
              RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
              OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
              PublishDrawFlag: doc1.data().PublishDrawFlag,
              PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
              PublishResultFlag: doc1.data().PublishResultFlag,
              PublishScheduleFlag: doc1.data().PublishScheduleFlag,
              PublishGalleryFlag: doc1.data().PublishGalleryFlag,

            });
            console.log(resultList);
          });
          return resultList;

        });
    });



exports.getAllEventWithEventStatus =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      //   if (!context.auth) {
      //     throw new functions.https.HttpError(
      //       "unauthenticatied",
      //       "only authenticated user can call this"
      //     );
      //   }
      const eventStatus = data.eventStatus;

      var eventStatusList = [];
      if (eventStatus === 'All') {
        eventStatusList = ['Active', 'Inactive', 'Closed'];
      } else {
        eventStatusList = [eventStatus];
      }
      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").where("EventStatus", "in", eventStatusList).get()
        .then((changes) => {
          changes.forEach(doc1 => {
            resultList.push({
              Eventid: doc1.id,
              EventName: doc1.data().EventName,
              EventDetails: doc1.data().EventDetails,
              EventType: doc1.data().EventType,
              EventStatus: doc1.data().EventStatus,
              OrganizationID: doc1.data().OrganizationID,
              OrganizerID: doc1.data().OrganizerID,
              EventOwnerName: doc1.data().EventOwnerName,
              EventOwnerEmail: doc1.data().EventOwnerEmail,
              EventOwnerPhone: doc1.data().EventOwnerPhone,
              OrganizerLogo: doc1.data().OrganizerLogo,
              EventLogo: doc1.data().EventLogo,
              ThumbImage1: doc1.data().ThumbImage1,
              ThumbImage2: doc1.data().ThumbImage2,
              ThumbImage3: doc1.data().ThumbImage3,
              ThumbImage4: doc1.data().ThumbImage4,

              EventCode: doc1.data().EventCode,
              EventMode: doc1.data().EventMode,
              SportCode: doc1.data().SportCode,
              EntryCount: doc1.data().EntryCount,
              MinimumFee: doc1.data().MinimumFee,
              MaximumFee: doc1.data().MaximumFee,
              CategoryDetails: doc1.data().CategoryDetails,

              SportName: doc1.data().SportName,
              EventStartDate: doc1.data().EventStartDate,
              EventEndDate: doc1.data().EventEndDate,
              EventVenue: doc1.data().EventVenue,
              City: doc1.data().City,
              State: doc1.data().State,
              RegistrationStartDate: doc1.data().RegistrationStartDate,
              RegistrationEndDate: doc1.data().RegistrationEndDate,
              WithdrawalEndDate: doc1.data().WithdrawalEndDate,
              PaymentMode: doc1.data().PaymentMode,
              ApprovalStatus: doc1.data().ApprovalStatus,
              EventStatus: doc1.data().EventStatus,
              Comments: doc1.data().Comments,

              RegistrationOpenFlag: doc1.data().RegistrationOpenFlag,
              PaymentOpenFlag: doc1.data().PaymentOpenFlag,
              ShowParticipantFlag: doc1.data().ShowParticipantFlag,
              ShowParticipantPostPaymentFlag: doc1.data().ShowParticipantPostPaymentFlag,
              DrawPublishedFlag: doc1.data().DrawPublishedFlag,
              //to be added
              LocationMap: doc1.data().LocationMap,
              VenueContact: doc1.data().VenueContact,
              MaxEntryForParticipant: doc1.data().MaxEntryForParticipant,
              ConvenienceCharge: doc1.data().ConvenienceCharge,
              IsMiscellaneousChargeMandatory: doc1.data().IsMiscellaneousChargeMandatory,
              MiscellaneousChargeRemark: doc1.data().MiscellaneousChargeRemark,
              MiscellaneousChargeFees: doc1.data().MiscellaneousChargeFees,
              DiscountRemarks: doc1.data().DiscountRemarks,
              DiscountValue: doc1.data().DiscountValue,
              OnlinePaymentModeFlag: doc1.data().OnlinePaymentModeFlag,
              NoticeBoard: doc1.data().NoticeBoard,
              Announcement: doc1.data().Announcement,
              RulesAndRegulations: doc1.data().RulesAndRegulations,
              CloseEventFlag: doc1.data().CloseEventFlag,

              RegistrationStatusOnFlag: doc1.data().RegistrationStatusOnFlag,
              RegistrationCompletePostPaymentFlag: doc1.data().RegistrationCompletePostPaymentFlag,
              OnlinePaymentGatewayFlag: doc1.data().OnlinePaymentGatewayFlag,
              PublishDrawFlag: doc1.data().PublishDrawFlag,
              PublishSeedEntryFlag: doc1.data().PublishSeedEntryFlag,
              PublishResultFlag: doc1.data().PublishResultFlag,
              PublishScheduleFlag: doc1.data().PublishScheduleFlag,
              PublishGalleryFlag: doc1.data().PublishGalleryFlag,

            });
            console.log(resultList);
          });
          return resultList;

        });
    });
