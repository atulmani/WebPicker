const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.logEntryAdd = functions.firestore.document('/EventRegistrationDetails/{id}')
  .onCreate(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    // const entryLog = admin.firestore().collection("EventEntryLog");
    var docID = "";
    var entryCount = 0;
    //  const entryLogID =
    console.log(inputData.EventID);
    await admin.firestore().collection("EventEntryLog").where("EventID", "==", inputData.EventID)
      .where("CategoryName", "==", inputData.CategoryName).get().then(async (changes) => {
        changes.forEach(doc1 => {
          docID = doc1.id;
          entryCount = Number(doc1.data().EntryCount);
        });

        if (docID != "") {
          await admin.firestore().collection("EventEntryLog").doc(docID).set({
            EventID: inputData.EventID,
            CategoryName: inputData.CategoryName,
            EntryCount: entryCount + 1,
          });
        } else {

          await admin.firestore().collection("EventEntryLog").add({
            EventID: inputData.EventID,
            CategoryName: inputData.CategoryName,
            EntryCount: 1,
          });
        }

      });
  });


exports.logEntryDelete = functions.firestore.document('/EventRegistrationDetails/{id}')
  .onDelete(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    // const entryLog = admin.firestore().collection("EventEntryLog");
    var docID = "";
    var entryCount = 0;
    //  const entryLogID =
    console.log(inputData.EventID);
    await admin.firestore().collection("EventEntryLog").where("EventID", "==", inputData.EventID)
      .where("CategoryName", "==", inputData.CategoryName).get().then(async (changes) => {
        changes.forEach(doc1 => {
          docID = doc1.id;
          entryCount = Number(doc1.data().EntryCount);
        });
        if (docID != "" && docID != undefined) {
          await admin.firestore().collection("EventEntryLog").doc(docID).set({
            EventID: inputData.EventID,
            CategoryName: inputData.CategoryName,
            EntryCount: entryCount - 1,
          });
        }
      });
  });


  exports.getAllEventEntryCount =
    functions.https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      const EventID = data.EventID;

      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventEntryLog").where("EventID", "==", EventID).get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            EventID: doc1.data().EventID,
            CategoryName: doc1.data().CategoryName,
            EntryCount: Number(doc1.data().EntryCount),
          });
          console.log(resultList);
        });
        return resultList;

      });
    });


    exports.getEventEntryCountForCategory =
      functions.https.onCall(async (data, context) => {
        // if (!context.auth) {
        //   throw new functions.https.HttpError(
        //     "unauthenticatied",
        //     "only authenticated user can call this"
        //   );
        // }
        const EventID = data.EventID;
        const CategoryName = data.CategoryName;

        let resultList = [];

        // var dbrows = await admin.firestore().collection("PartnerList").get();
        // dbrows.then((changes) => {
        return await admin.firestore().collection("EventEntryLog").where("EventID", "==", EventID)
        .where("CategoryName","==",CategoryName).get().then((changes) => {
          changes.forEach(doc1 => {
            resultList.push({
              EventID: doc1.data().EventID,
              CategoryName: doc1.data().CategoryName,
              EntryCount: Number(doc1.data().EventStatus),
            });
            console.log(resultList);
          });
          return resultList;

        });
      });
