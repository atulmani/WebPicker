const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.addMasterSportName =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }

    const SportName = data.SportName;
    const SportCode = data.SportCode;

    return admin.firestore().collection("MasterSportName")
      .add({
        SportCode: SportCode,
        SportName: SportName,
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(function(docRef) {
        return {
          SportID: docRef.id
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          SportID: "0"
        };
      });

    console.log("before return");
  });


exports.getSportList =
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
    return await admin.firestore().collection("MasterSportName").orderBy("SportName").get().then((changes) => {
      changes.forEach(doc1 => {
        resultList.push({
          Docid: doc1.id,
          SportName: doc1.data().SportName,
          SportCode: doc1.data().SportCode,
        });
        console.log(resultList);
      });
      return resultList;
    });
  });
