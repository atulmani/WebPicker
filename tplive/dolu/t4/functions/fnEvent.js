const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.logEventAdd = functions.firestore.document('/EventList/{id}')
  .onCreate(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    var docID = "";
    var entryCount = 0;
    await admin.firestore().collection("EventSummaryBySports").where("SportName", "==", inputData.SportName)
      .get().then(async (changes) => {
        changes.forEach(doc1 => {
          docID = doc1.id;
          eventCount = Number(doc1.data().EventCount);
        });

        if (docID != "" & docID != undefined) {
          await admin.firestore().collection("EventSummaryBySports").doc(docID).set({
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
            docID = doc1.id;
            eventCount = Number(doc1.data().EventCount);
          });

          if (docID != "" & docID != undefined) {
            await admin.firestore().collection("EventSummaryByCity").doc(docID).set({
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


exports.logEventDelete = functions.firestore.document('/EventList/{id}')
  .onDelete(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    var docID = "";
    var eventCount = 0;
    await admin.firestore().collection("EventSummaryBySports").where("SportName", "==", inputData.SportName)
      .get().then(async (changes) => {
        changes.forEach(doc1 => {
          docID = doc1.id;
          eventCount = Number(doc1.data().EventCount);
        });
        if (docID != "" && docID != undefined) {
          await admin.firestore().collection("EventSummaryBySports").doc(docID).set({
            SportName: inputData.SportName,
            EventCount: eventCount - 1,
          });
        }
      });
    if (inputData.City != null && inputData.City != undefined && inputData.City != "") {
      await admin.firestore().collection("EventSummaryByCity").where("City", "==", inputData.City)
        .get().then(async (changes) => {
          changes.forEach(doc1 => {
            docID = doc1.id;
            eventCount = Number(doc1.data().EventCount);
          });
          if (docID != "" && docID != undefined) {
            await admin.firestore().collection("EventSummaryByCity").doc(docID).set({
              City: inputData.City,
              EventCount: eventCount - 1,
            });
          }
        });
    }
  });



exports.getEventSummaryBySport =
  functions.https.onCall(async (data, context) => {
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
    functions.https.onCall(async (data, context) => {
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
  functions.https.onCall((data, context) => {
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
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            EventCode: doc1.data().EventCode,
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
  functions.https.onCall((data, context) => {
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
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            EventCode: doc1.data().EventCode,
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
  functions.https.onCall(async (data, context) => {
    // if (!context.auth) {
    //   throw new functions.https.HttpError(
    //     "unauthenticatied",
    //     "only authenticated user can call this"
    //   );
    // }
    let resultList = [];

    const Year = data.year;

    var sDate = new Date(Year, 0, 1, 0,0,0,0);
    var eDate = new Date(Year, 11, 31, 23,59,0,0);

    // var dbrows = await admin.firestore().collection("PartnerList").get();
    // dbrows.then((changes) => {
    return await admin.firestore().collection("EventList")
    .where("EventStartDate",">=", sDate)
    .where("EventStartDate","<=", eDate)
    .get().then((changes) => {
      changes.forEach(doc1 => {
        resultList.push({
          Eventid: doc1.id,
          EventName: doc1.data().EventName,
          EventType: doc1.data().EventType,
          EventStatus: doc1.data().EventStatus,
          OrganizationID: doc1.data().OrganizationID,
          OrganizerID: doc1.data().OrganizerID,
          EventOwnerName: doc1.data().EventOwnerName,
          EventOwnerEmail: doc1.data().EventOwnerEmail,
          EventOwnerPhone: doc1.data().EventOwnerPhone,
          OrganizerLogo: doc1.data().OrganizerLogo,
          EventLogo: doc1.data().EventLogo,
          EventCode: doc1.data().EventCode,
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
          PublishScheduleFlag: doc1.data().PublishScheduleFlag,
          PublishGalleryFlag: doc1.data().PublishGalleryFlag,

        });
        //console.log(resultList);
      });
      return resultList;

    });
  });

exports.getAllEventDetails =
  functions.https.onCall(async (data, context) => {
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
          EventType: doc1.data().EventType,
          EventStatus: doc1.data().EventStatus,
          OrganizationID: doc1.data().OrganizationID,
          OrganizerID: doc1.data().OrganizerID,
          EventOwnerName: doc1.data().EventOwnerName,
          EventOwnerEmail: doc1.data().EventOwnerEmail,
          EventOwnerPhone: doc1.data().EventOwnerPhone,
          OrganizerLogo: doc1.data().OrganizerLogo,
          EventLogo: doc1.data().EventLogo,
          EventCode: doc1.data().EventCode,
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
          PublishScheduleFlag: doc1.data().PublishScheduleFlag,
          PublishGalleryFlag: doc1.data().PublishGalleryFlag,

        });
        //console.log(resultList);
      });
      return resultList;

    });
  });

exports.getAllEventWithEventStatusAndLocation =
  functions.https.onCall(async (data, context) => {
    // if (!context.auth) {
    //   throw new functions.https.HttpError(
    //     "unauthenticatied",
    //     "only authenticated user can call this"
    //   );
    // }
    let resultList = [];

    const City = data.City;
    const Status = data.eventStatus;

    // var dbrows = await admin.firestore().collection("PartnerList").get();
    // dbrows.then((changes) => {
    if(City === "" || City === 'All')
    {
      return await admin.firestore().collection("EventList")
      .where("EventStatus","==", Status)
      .orderBy("EventStartDate","desc").get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            Eventid: doc1.id,
            EventName: doc1.data().EventName,
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            EventCode: doc1.data().EventCode,
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
            PublishScheduleFlag: doc1.data().PublishScheduleFlag,
            PublishGalleryFlag: doc1.data().PublishGalleryFlag,

          });
          //console.log(resultList);
        });
        return resultList;

      });

    }else {
      return await admin.firestore().collection("EventList")
      .where("EventStatus","==", Status)
      .where("City","==", City)
      .orderBy("EventStartDate","desc").get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            Eventid: doc1.id,
            EventName: doc1.data().EventName,
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            EventCode: doc1.data().EventCode,
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
            PublishScheduleFlag: doc1.data().PublishScheduleFlag,
            PublishGalleryFlag: doc1.data().PublishGalleryFlag,

          });
          //console.log(resultList);
        });
        return resultList;

      });

    }
      });

  exports.getAllEventDetailsByCity =
    functions.https.onCall(async (data, context) => {
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
      .where("City","==", City)
      .orderBy("ApprovalStatus").get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            Eventid: doc1.id,
            EventName: doc1.data().EventName,
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            EventCode: doc1.data().EventCode,
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
            PublishScheduleFlag: doc1.data().PublishScheduleFlag,
            PublishGalleryFlag: doc1.data().PublishGalleryFlag,

          });
          //console.log(resultList);
        });
        return resultList;

      });
    });


exports.getAllEventDetailsForOrganizer =
  functions.https.onCall(async (data, context) => {
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
          EventType: doc1.data().EventType,
          EventStatus: doc1.data().EventStatus,
          OrganizationID: doc1.data().OrganizationID,
          OrganizerID: doc1.data().OrganizerID,
          EventOwnerName: doc1.data().EventOwnerName,
          EventOwnerEmail: doc1.data().EventOwnerEmail,
          EventOwnerPhone: doc1.data().EventOwnerPhone,
          OrganizerLogo: doc1.data().OrganizerLogo,
          EventLogo: doc1.data().EventLogo,
          EventCode: doc1.data().EventCode,
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
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const OrganizationID = data.OrganizationID;
    const OrganizerID = data.OrganizerID;
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
    const SportCode = data.SportCode;
    const City = data.City;
    console.log(data);

    return admin.firestore().collection("EventList")
      .add({
        OrganizationID: OrganizationID,
        OrganizerID: OrganizerID,
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
        SportCode: SportCode,
        City: City,
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(function(docRef) {
        return {
          EventID: docRef.id
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          EventID: "0"
        };
      });

    console.log("before return");
  });

exports.updateEventBasicDetails =
  functions.https.onCall((data, context) => {
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
    const EventOwnerName = data.EventOwnerName;
    const EventOwnerEmail = data.EventOwnerEmail;
    const EventOwnerPhone = data.EventOwnerPhone;
    const SportName = data.SportName;
    const EventVenue = data.EventVenue;
    const EventCode = data.EventCode;
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
        EventOwnerName: EventOwnerName,
        EventOwnerEmail: EventOwnerEmail,
        EventOwnerPhone: EventOwnerPhone,
        SportName: SportName,
        EventVenue: EventVenue,
        EventCode: EventCode,
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });
exports.getEventCategoryDetails =
  functions.https.onCall((data, context) => {
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
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventDetails_Dates =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });


exports.updateEventDetails_Logo =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const EventID = data.EventID;

    const OrganizerLogo = data.OrganizerLogo;
    const EventLogo = data.EventLogo;

    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .update({
        OrganizerLogo: OrganizerLogo,
        EventLogo: EventLogo,

        UpdatedBy: context.auth.uid,
        UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log("Success");
        return {
          retCode: "0"
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventDetails_ApprovalStatus =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventDetails_PaymentStatus =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });
exports.updateEventDetails_NoticeBoard =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventDetails_Announcement =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventDetails_RulesAndRegulations =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventDetails_DrawLink =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventFlag_CloseEvent =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });


exports.updateEventFlag_RegistrationOn =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventFlag_RegistrationCompletePostPayment =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventFlag_OnlinePaymentMode =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventFlag_PublishDraw =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const EventID = data.EventID;
    const PublishDrawFlag = data.PublishDrawFlag;
    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(EventID)
      .update({
        PublishDrawFlag: PublishDrawFlag,

        UpdatedBy: context.auth.uid,
        UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log("Success");
        return {
          retCode: "0"
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventFlag_PublishSeed =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventFlag_PublishSchedule =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.updateEventFlag_PublishGallery =
  functions.https.onCall((data, context) => {
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
      .catch(function(error) {
        console.log("in error");
        return {
          retCode: "1"
        };;
      });
  });

exports.getAllEventForOrganizerWithStatus =
  functions.https.onCall(async (data, context) => {
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
          EventCode: doc1.data().EventCode,
          SportCode: doc1.data().SportCode,

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
  functions.https.onCall(async (data, context) => {
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
    return await admin.firestore().collection("EventList").where("EventStatus", "in", eventStatusList).orderBy("EventStartDate","desc").get()
    .then((changes) => {
      changes.forEach(doc1 => {
        resultList.push({
          Eventid: doc1.id,
          EventName: doc1.data().EventName,
          EventType: doc1.data().EventType,
          EventStatus: doc1.data().EventStatus,
          OrganizationID: doc1.data().OrganizationID,
          OrganizerID: doc1.data().OrganizerID,
          EventOwnerName: doc1.data().EventOwnerName,
          EventOwnerEmail: doc1.data().EventOwnerEmail,
          EventOwnerPhone: doc1.data().EventOwnerPhone,
          OrganizerLogo: doc1.data().OrganizerLogo,
          EventLogo: doc1.data().EventLogo,
          EventCode: doc1.data().EventCode,
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
          PublishScheduleFlag: doc1.data().PublishScheduleFlag,
          PublishGalleryFlag: doc1.data().PublishGalleryFlag,

        });
        console.log(resultList);
      });
      return resultList;

    });
  });



  exports.getAllEventWithEventStatus1 =
    functions.https.onCall(async (data, context) => {
      //   if (!context.auth) {
      //     throw new functions.https.HttpError(
      //       "unauthenticatied",
      //       "only authenticated user can call this"
      //     );
      //   }
      const eventStatus = data.eventStatus;

      var eventStatusList = [];
      if(eventStatus === 'All'){
        eventStatusList = ['Active','Inactive','Closed'];
      }
      else {
        eventStatusList = [eventStatus];
      }
      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").where("EventStatus", "in", eventStatusList).orderBy("EventStartDate","desc").get()
      .then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            Eventid: doc1.id,
            EventName: doc1.data().EventName,
            EventType: doc1.data().EventType,
            EventStatus: doc1.data().EventStatus,
            OrganizationID: doc1.data().OrganizationID,
            OrganizerID: doc1.data().OrganizerID,
            EventOwnerName: doc1.data().EventOwnerName,
            EventOwnerEmail: doc1.data().EventOwnerEmail,
            EventOwnerPhone: doc1.data().EventOwnerPhone,
            OrganizerLogo: doc1.data().OrganizerLogo,
            EventLogo: doc1.data().EventLogo,
            EventCode: doc1.data().EventCode,
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
            PublishScheduleFlag: doc1.data().PublishScheduleFlag,
            PublishGalleryFlag: doc1.data().PublishGalleryFlag,

          });
          console.log(resultList);
        });
        return resultList;

      });
    });



      exports.getAllEventWithEventStatus =
        functions.https.onCall(async (data, context) => {
          //   if (!context.auth) {
          //     throw new functions.https.HttpError(
          //       "unauthenticatied",
          //       "only authenticated user can call this"
          //     );
          //   }
          const eventStatus = data.eventStatus;

          var eventStatusList = [];
          if(eventStatus === 'All'){
            eventStatusList = ['Active','Inactive','Closed'];
          }
          else {
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
                EventType: doc1.data().EventType,
                EventStatus: doc1.data().EventStatus,
                OrganizationID: doc1.data().OrganizationID,
                OrganizerID: doc1.data().OrganizerID,
                EventOwnerName: doc1.data().EventOwnerName,
                EventOwnerEmail: doc1.data().EventOwnerEmail,
                EventOwnerPhone: doc1.data().EventOwnerPhone,
                OrganizerLogo: doc1.data().OrganizerLogo,
                EventLogo: doc1.data().EventLogo,
                EventCode: doc1.data().EventCode,
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
                PublishScheduleFlag: doc1.data().PublishScheduleFlag,
                PublishGalleryFlag: doc1.data().PublishGalleryFlag,

              });
              console.log(resultList);
            });
            return resultList;

          });
        });
