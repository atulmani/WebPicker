const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.getEventDetails =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const eventID = data.EventID;

    console.log("eventID ", eventID);
    return admin.firestore().collection("EventList")
      .doc(eventID).get().then((doc1) => {
        if (doc1.exists) {
          // console.log(doc1);
          let results = {};
          return {
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
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const EventID = data.EventID;

    console.log("EventID ", EventID);
    return admin.firestore().collection("eventList")
      .doc(EventID).get().then((doc1) => {
        if (doc1.exists) {
          // console.log(doc1);
          let results = {};
          return {
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
        OrganizationID :OrganizationID,
        OrganizerID :OrganizerID,
        SportName :SportName,
        EventName :EventName,
        EventOwnerName :EventOwnerName,
        EventOwnerEmail :EventOwnerEmail,
        EventOwnerPhone :EventOwnerPhone,
        EventVenue :EventVenue,
        LocationMap :LocationMap,
        VenueContact :VenueContact,
        ApprovalStatus :ApprovalStatus,
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
    const OrganizerName = data.OrganizerName;
    const OrganizerEmail = data.OrganizerEmail;
    const OrganizerPhone = data.OrganizerPhone;
    const SportName = data.SportName;
    const Venue = data.Venue;
    const City = data.City
    const State = data.State;

    // const OrganizerLogo =  data.OrganizerLogo;
    // const EventLogo =  data.EventLogo;
    // const EventStartDate = data.EventStartDate;
    // const eventEndDate= data.EventEndDate;
    // const RegistrationStartDate= data.RegistrationStartDate;
    // const RegistrationEndDate= data.RegistrationEndDate;
    // const WithdrawalEndDate= data.WithdrawalEndDate;
    // const PaymentMode= data.PaymentMode;
    // const ApprovalStatus= data.ApprovalStatus;
    // const Comments= data.Comments;
    // const RegistrationOpenFlag= data.RegistrationOpenFlag;
    // const PaymentOpenFlag= data.PaymentOpenFlag;
    // const DrawPublishedFlag= data.DrawPublishedFlag;

    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .set({
        EventName: EventName,
        EventType: EventType,
        EventStatus: EventStatus,
        OrganizerID: OrganizerID,
        OrganizerName: OrganizerName,
        OrganizerEmail: OrganizerEmail,
        OrganizerPhone: OrganizerPhone,
        SportName: SportName,
        Venue: Venue,
        City: City,
        State: State,

        // OrganizerLogo:OrganizerLogo,
        // EventLogo:EventLogo,
        // EventStartDate: EventStartDate,
        // eventEndDate: EventEndDate,
        // RegistrationStartDate: RegistrationStartDate,
        // RegistrationEndDate: RegistrationEndDate,
        // WithdrawalEndDate: WithdrawalEndDate,
        //
        // PaymentMode: PaymentMode,
        // ApprovalStatus: ApprovalStatus,
        // Comments: Comments,
        //
        // RegistrationOpenFlag: RegistrationOpenFlag,
        // PaymentOpenFlag: PaymentOpenFlag,
        // DrawPublishedFlag: DrawPublishedFlag,
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

    // const OrganizerLogo =  data.OrganizerLogo;
    // const EventLogo =  data.EventLogo;
    // const PaymentMode= data.PaymentMode;
    // const ApprovalStatus= data.ApprovalStatus;
    // const Comments= data.Comments;
    // const RegistrationOpenFlag= data.RegistrationOpenFlag;
    // const PaymentOpenFlag= data.PaymentOpenFlag;
    // const DrawPublishedFlag= data.DrawPublishedFlag;

    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .set({
        EventStartDate: EventStartDate,
        EventEndDate: EventEndDate,
        RegistrationStartDate: RegistrationStartDate,
        RegistrationEndDate: RegistrationEndDate,
        WithdrawalEndDate: WithdrawalEndDate,

        // OrganizerLogo:OrganizerLogo,
        // EventLogo:EventLogo,
        //
        // PaymentMode: PaymentMode,
        // ApprovalStatus: ApprovalStatus,
        // Comments: Comments,
        //
        // RegistrationOpenFlag: RegistrationOpenFlag,
        // PaymentOpenFlag: PaymentOpenFlag,
        // DrawPublishedFlag: DrawPublishedFlag,
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
    // const PaymentMode= data.PaymentMode;
    // const ApprovalStatus= data.ApprovalStatus;
    // const Comments= data.Comments;
    // const RegistrationOpenFlag= data.RegistrationOpenFlag;
    // const PaymentOpenFlag= data.PaymentOpenFlag;
    // const DrawPublishedFlag= data.DrawPublishedFlag;

    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .set({
        OrganizerLogo: OrganizerLogo,
        EventLogo: EventLogo,

        // PaymentMode: PaymentMode,
        // ApprovalStatus: ApprovalStatus,
        // Comments: Comments,
        //
        // RegistrationOpenFlag: RegistrationOpenFlag,
        // PaymentOpenFlag: PaymentOpenFlag,
        // DrawPublishedFlag: DrawPublishedFlag,
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

    // const PaymentMode= data.PaymentMode;
    // const RegistrationOpenFlag= data.RegistrationOpenFlag;
    // const PaymentOpenFlag= data.PaymentOpenFlag;
    // const DrawPublishedFlag= data.DrawPublishedFlag;

    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .set({
        ApprovalStatus: ApprovalStatus,
        Comments: Comments,

        // PaymentMode: PaymentMode,
        //
        // RegistrationOpenFlag: RegistrationOpenFlag,
        // PaymentOpenFlag: PaymentOpenFlag,
        // DrawPublishedFlag: DrawPublishedFlag,
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
    const RegistrationCompletePostPayment = data.RegistrationCompletePostPayment;
    const ConvenienceCharge = data.ConvenienceCharge;
    const MiscellaneousChargeRemark = data.MiscellaneousChargeRemark;
    const MiscellaneousChargeFees = data.MiscellaneousChargeFees;
    const IsMiscellaneousChargeMandatory = data.IsMiscellaneousChargeMandatory;
    const DiscountRemarks = data.DiscountRemarks;
    const DiscountValue = data.DiscountValue;
    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .set({
        OnlinePaymentModeFlag: OnlinePaymentModeFlag,
        RegistrationCompletePostPayment: RegistrationCompletePostPayment,
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
      .doc(Eventid)
      .set({
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
      .doc(Eventid)
      .set({
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
      .doc(Eventid)
      .set({
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
      .doc(Eventid)
      .set({
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
      .doc(Eventid)
      .set({
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
    const RegistrationOnFlag = data.RegistrationOnFlag;
    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .set({
        RegistrationOnFlag: RegistrationOnFlag,

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
      .doc(Eventid)
      .set({
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
      .doc(Eventid)
      .set({
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
      .doc(Eventid)
      .set({
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
    const PublishSeedFlag = data.PublishSeedFlag;
    console.log("eventID ", EventID);

    return admin.firestore().collection("EventList")
      .doc(Eventid)
      .set({
        PublishSeedFlag: PublishSeedFlag,

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
      .doc(Eventid)
      .set({
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
        .doc(Eventid)
        .set({
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
