e:
const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.getPartnerDetails =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const partnerID = data.partnerID;

    console.log("partnerID ", partnerID);
    return admin.firestore().collection("PartnerList")
      .doc(partnerID).get().then((doc1) => {
        if (doc1.exists) {
          // console.log(doc1);
          let results = {};
          return {
            id: doc1.id,
            ParnerName: doc1.data().ParnerName,
            OrganizationID:doc1.data().OrganizationID,
            OrganizationName: doc1.data().OrganizationName,
            PartnerEmailID: doc1.data().PartnerEmailID,
            PartnerPhone: doc1.data().PartnerPhone,
            DateOfBirth: doc1.data().DateOfBirth,
            City: doc1.data().City,
            State: doc1.data().State,
            IdentityType: doc1.data().IdentityType,
            IdentityNumber: doc1.data().IdentityNumber,
            PartnerType: doc1.data().PartnerType,
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

exports.updatePartnerDetails =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const partnerID = data.partnerID;
    const PartnerName = data.PartnerName;
    const OrganizationName = data.OrganizationName;
    const PartnerEmailID = data.PartnerEmailID;
    const PartnerPhone = data.PartnerPhone;
    const OrganizationID = data.organizerID;

    // const DateOfBirth = data.DateOfBirth;
    const City = data.City;
    const State = data.State;
    const IdentityType = data.IdentityType;
    const IdentityNumber = data.IdentityNumber;
    const PartnerType = data.PartnerType;

    console.log("partnerID ", partnerID);

    return admin.firestore().collection("PartnerList")
      .doc(partnerID)
      .set({
        PartnerName: PartnerName,
        OrganizationName: OrganizationName,
        PartnerEmailID: PartnerEmailID,
        PartnerPhone: PartnerPhone,
        OrganizationID:OrganizationID,
        // DateOfBirth: DateOfBirth,
        City: City,
        State: State,
        IdentityType: IdentityType,
        IdentityNumber: IdentityNumber,
        PartnerType: PartnerType,
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log("Success");
        return {retCode : "0"};
      })
      .catch(function(error) {
        console.log("in error");
        return {retCode : "1"};;
      });
  });

exports.getPartnerDetails =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const partnerID = data.partnerID;

    console.log("partnerID ", partnerID);
    return admin.firestore().collection("PartnerList")
      .doc(partnerID).get().then((doc1) => {
        if (doc1.exists) {
          // console.log(doc1);
          let results = {};
          return {
            id: doc1.id,
            ParnerName: doc1.data().ParnerName,
            OrganizationName: doc1.data().OrganizationName,
            OrganizationID:doc1.data().OrganizationID,
            PartnerEmailID: doc1.data().PartnerEmailID,
            PartnerPhone: doc1.data().PartnerPhone,
            DateOfBirth: doc1.data().DateOfBirth,
            City: doc1.data().City,
            State: doc1.data().State,
            IdentityType: doc1.data().IdentityType,
            IdentityNumber: doc1.data().IdentityNumber,
            PartnerType: doc1.data().PartnerType,
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


exports.getAllPartnerDetails =
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
    return await admin.firestore().collection("PartnerList").get().then((changes) => {
      changes.forEach(change => {
        resultList.push({
          resultsid: change.id,
          PartnerName: change.data().PartnerName,
          OrganizationID:change.data().OrganizationID,
          OrganizationName: change.data().OrganizationName,
          PartnerEmailID: change.data().PartnerEmailID,
          PartnerPhone: change.data().PartnerPhone,
          DateOfBirth: change.data().DateOfBirth,
          City: change.data().City,
          State: change.data().State,
          IdentityType: change.data().IdentityType,
          IdentityNumber: change.data().IdentityNumber,
          PartnerType: change.data().PartnerType,
        });
        console.log(resultList);
      });
      return resultList;

    });
  });


exports.addPartnerDetails =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    const PartnerName = data.PartnerName;
    const OrganizationName = data.OrganizationName;
    const OrganizationID = data.organizerID;
    const PartnerEmailID = data.PartnerEmailID;
    const PartnerPhone = data.PartnerPhone;
    const City = data.City;
    const State = data.State;
    const IdentityType = data.IdentityType;
    const IdentityNumber = data.IdentityNumber;
    const PartnerType = data.PartnerType;
    return admin.firestore().collection("PartnerList")
      .add({
        PartnerName: PartnerName,
        OrganizationName: OrganizationName,
        OrganizationID: OrganizationID,
        PartnerEmailID: PartnerEmailID,
        PartnerPhone: PartnerPhone,
        City: City,
        State: State,
        IdentityType: IdentityType,
        IdentityNumber: IdentityNumber,
        PartnerType: PartnerType,
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(function(docRef) {
        return {
          partnerID: docRef.id
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          partnerID: "0"
        };
      });

    console.log("before return");
  });
