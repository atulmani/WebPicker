const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
exports.getEventDetails =
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


exports.getAllEventDetails =
  functions.https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
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
    const EventStatus = data.EventStatus;
    const OrganizerID = data.OrganizerID;
    const EventOwnerName = data.EventOwnerName;
    const EventOwnerEmail = data.EventOwnerEmail;
    const EventOwnerPhone = data.EventOwnerPhone;
    const SportName = data.SportName;
    const EventVenue = data.EventVenue;
    const City = data.City;
    const State = data.State;
    const OrganizationID = data.OrganizationID;
    const LocationMap = data.LocationMap;
    const VenueContact = data.VenueContact;
    const ApprovalStatus = data.ApprovalStatus;

    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(EventID )
      .update({
        EventName:EventName,
        EventType:EventType,
        EventStatus:EventStatus,
        OrganizerID:OrganizerID,
        EventOwnerName:EventOwnerName,
        EventOwnerEmail:EventOwnerEmail,
        EventOwnerPhone:EventOwnerPhone,
        SportName:SportName,
        EventVenue:EventVenue,
        City:City,
        State:State,
        OrganizationID:OrganizationID,
        LocationMap:LocationMap,
        VenueContact:VenueContact,
        ApprovalStatus:ApprovalStatus,

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
        MaxEntryForParticipant:MaxEntryForParticipant,
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

          OrganizerID: doc1.data().OrganizerID,
          OrganizerName: doc1.data().OrganizerName,
          OrganizerEmail: doc1.data().OrganizerEmail,
          OrganizerPhone: doc1.data().OrganizerPhone,
          OrganizerLogo: doc1.data().OrganizerLogo,
          EventLogo: doc1.data().EventLogo,

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
      const range = data.selectionRange;


      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventList").where("ApprovalStatus", "==", approvalStatus).get().then((changes) => {
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
