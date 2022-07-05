const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.getOrganizationDetails =
  functions
  .region('asia-south1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const organizationID = data.OrganizationID;

    console.log("organizationID ", organizationID);
    return admin.firestore().collection("OrganizationList")
      .doc(organizationID).get().then((doc1) => {
        if (doc1.exists) {
          // console.log(doc1);
          let results = {};
          return {
            id: doc1.id,
            PartnerName: doc1.data().PartnerName,
            OrganizerID: doc1.data().OrganizerID,
            OrganizationName: doc1.data().OrganizationName,
            PartnerEmailID: doc1.data().PartnerEmailID,
            PartnerPhone: doc1.data().PartnerPhone,
            DateOfBirth: doc1.data().DateOfBirth,
            City: doc1.data().City,
            State: doc1.data().State,
            ApprovalStatus: doc1.data().ApprovalStatus,
            Comments: doc1.data().Comments,
            IdentityType: doc1.data().IdentityType,
            IdentityNumber: doc1.data().IdentityNumber,
            OrganizationType: doc1.data().OrganizationType,
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

exports.updateOrganizationDetails =
  functions
  .region('asia-south1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const organizationID = data.organizationID;
    const PartnerName = data.PartnerName;
    const OrganizationName = data.OrganizationName;
    const PartnerEmailID = data.PartnerEmailID;
    const PartnerPhone = data.PartnerPhone;
    const OrganizerID = data.organizerID;
    const ApprovalStatus = data.ApprovalStatus;
    const Comments = data.Comments;
    // const DateOfBirth = data.DateOfBirth;
    const City = data.City;
    const State = data.State;
    const IdentityType = data.IdentityType;
    const IdentityNumber = data.IdentityNumber;
    const OrganizationType = data.OrganizationType;

    console.log("organizationID ", organizationID);

    return admin.firestore().collection("OrganizationList")
      .doc(organizationID)
      .set({
        PartnerName: PartnerName,
        OrganizationName: OrganizationName,
        PartnerEmailID: PartnerEmailID,
        PartnerPhone: PartnerPhone,
        OrganizerID: OrganizerID,
        // DateOfBirth: DateOfBirth,
        City: City,
        State: State,
        IdentityType: IdentityType,
        IdentityNumber: IdentityNumber,
        OrganizationType: OrganizationType,
        ApprovalStatus: ApprovalStatus,
        Comments: Comments,
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
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

exports.getOrganizationDetails =
  functions
  .region('asia-south1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const organizationID = data.organizationID;

    console.log("organizationID ", organizationID);
    return admin.firestore().collection("OrganizationList")
      .doc(organizationID).get().then((doc1) => {
        if (doc1.exists) {
          // console.log(doc1);
          let results = {};
          return {
            id: doc1.id,
            PartnerName: doc1.data().PartnerName,
            OrganizationName: doc1.data().OrganizationName,
            OrganizerID: doc1.data().OrganizerID,
            PartnerEmailID: doc1.data().PartnerEmailID,
            PartnerPhone: doc1.data().PartnerPhone,
            DateOfBirth: doc1.data().DateOfBirth,
            City: doc1.data().City,
            ApprovalStatus: doc1.data().ApprovalStatus,
            Comments: doc1.data().Comments,
            State: doc1.data().State,
            IdentityType: doc1.data().IdentityType,
            IdentityNumber: doc1.data().IdentityNumber,
            OrganizationType: doc1.data().OrganizationType,
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


exports.getAllOrganizationDetails =
  functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    let resultList = [];

    // var dbrows = await admin.firestore().collection("PartnerList").get();
    // dbrows.then((changes) => {
    return await admin.firestore().collection("OrganizationList").orderBy("ApprovalStatus").get().then((changes) => {
      changes.forEach(change => {
        resultList.push({
          resultsid: change.id,
          PartnerName: change.data().PartnerName,
          OrganizerID: change.data().OrganizerID,
          OrganizationName: change.data().OrganizationName,
          PartnerEmailID: change.data().PartnerEmailID,
          PartnerPhone: change.data().PartnerPhone,
          DateOfBirth: change.data().DateOfBirth,
          City: change.data().City,
          ApprovalStatus: change.data().ApprovalStatus,
          Comments: change.data().Comments,
          State: change.data().State,
          IdentityType: change.data().IdentityType,
          IdentityNumber: change.data().IdentityNumber,
          OrganizationType: change.data().OrganizationType,
        });
        console.log(resultList);
      });
      return resultList;

    });
  });


exports.getAllOrganizationDetailsForOrganizer =
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
    return await admin.firestore().collection("OrganizationList").where("OrganizerID", "==", organizerID).get().then((changes) => {
      changes.forEach(change => {
        resultList.push({
          resultsid: change.id,
          PartnerName: change.data().PartnerName,
          OrganizerID: change.data().OrganizerID,
          OrganizationName: change.data().OrganizationName,
          PartnerEmailID: change.data().PartnerEmailID,
          PartnerPhone: change.data().PartnerPhone,
          DateOfBirth: change.data().DateOfBirth,
          City: change.data().City,
          ApprovalStatus: change.data().ApprovalStatus,
          Comments: change.data().Comments,
          State: change.data().State,
          IdentityType: change.data().IdentityType,
          IdentityNumber: change.data().IdentityNumber,
          OrganizationType: change.data().OrganizationType,
        });
        console.log(resultList);
      });
      return resultList;

    });
  });

exports.addOrganizationDetails =
  functions
  .region('asia-south1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const PartnerName = data.PartnerName;
    const OrganizationName = data.OrganizationName;
    const OrganizerID = data.organizerID;
    const PartnerEmailID = data.PartnerEmailID;
    const PartnerPhone = data.PartnerPhone;
    const City = data.City;
    const State = data.State;
    const IdentityType = data.IdentityType;
    const IdentityNumber = data.IdentityNumber;
    const OrganizationType = data.OrganizationType;
    const ApprovalStatus = data.ApprovalStatus;
    const Comments = data.Comments;
    return admin.firestore().collection("OrganizationList")
      .add({
        PartnerName: PartnerName,
        OrganizationName: OrganizationName,
        OrganizerID: OrganizerID,
        PartnerEmailID: PartnerEmailID,
        PartnerPhone: PartnerPhone,
        City: City,
        State: State,
        ApprovalStatus: ApprovalStatus,
        Comments: Comments,
        IdentityType: IdentityType,
        IdentityNumber: IdentityNumber,
        OrganizationType: OrganizationType,
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(function(docRef) {
        return {
          OrganizationID: docRef.id
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          OrganizationID: "0"
        };
      });

    console.log("before return");
  });


exports.getAllOrganizationForOrganizerWithStatus =
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
    return await admin.firestore().collection("OrganizationList").where("OrganizerID", "==", organizerID).where("ApprovalStatus", "==", approvalStatus).get().then((changes) => {
      changes.forEach(change => {
        resultList.push({
          resultsid: change.id,
          PartnerName: change.data().PartnerName,
          OrganizerID: change.data().OrganizerID,
          OrganizationName: change.data().OrganizationName,
          PartnerEmailID: change.data().PartnerEmailID,
          PartnerPhone: change.data().PartnerPhone,
          DateOfBirth: change.data().DateOfBirth,
          City: change.data().City,
          ApprovalStatus: change.data().ApprovalStatus,
          Comments: change.data().Comments,
          State: change.data().State,
          IdentityType: change.data().IdentityType,
          IdentityNumber: change.data().IdentityNumber,
          OrganizationType: change.data().OrganizationType,
        });
        console.log(resultList);
      });
      return resultList;

    });
  });
