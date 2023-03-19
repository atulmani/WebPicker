const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.logEntryAdd = functions
  .region('asia-south1')
  .firestore.document('/EventRegistrationDetails/{id}')
  .onCreate(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    // const entryLog = admin.firestore().collection("EventEntryLog");
    var docID = "";
    var entryCount = 0;
    //  const entryLogID =
    console.log(inputData.EventID);
    const EventID = inputData.EventID;
    await admin.firestore().collection("EventList").doc(EventID).update({
      EntryCount: admin.firestore.FieldValue.increment(1)
    });

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

      }).
      then(async (rec) => {
        var allentryCount = 0;
        await admin.firestore().collection("EventAllEntryLog").where("EventID", "==", inputData.EventID).get().then(async (changes) => {
          changes.forEach(doc1 => {
            docID = doc1.id;
            allentryCount = Number(doc1.data().EntryCount);
          });

          if (docID != "") {
            await admin.firestore().collection("EventAllEntryLog").doc(docID).set({
              EventID: inputData.EventID,
              EntryCount: allentryCount + 1,
            });
          } else {

            await admin.firestore().collection("EventAllEntryLog").add({
              EventID: inputData.EventID,
              EntryCount: 1,
            });
          }

        });
      });



  });


exports.logEntryDelete = functions
  .region('asia-south1')
  .firestore.document('/EventRegistrationDetails/{id}')
  .onDelete(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    console.log(inputData);
    // const entryLog = admin.firestore().collection("EventEntryLog");
    var docID = "";
    var entryCount = 0;
    //  const entryLogID =
    console.log(inputData.EventID);
    const EventID = inputData.EventID;
    await admin.firestore().collection("EventList").doc(EventID).update({
      EntryCount: admin.firestore.FieldValue.increment(-1)
    });

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
      }).
      then(async (rec) => {
        var allentryCount = 0;
        //  const entryLogID =
        console.log(inputData.EventID);
        await admin.firestore().collection("EventAllEntryLog").where("EventID", "==", inputData.EventID)
          .get().then(async (changes) => {
            changes.forEach(doc1 => {
              docID = doc1.id;
              allentryCount = Number(doc1.data().EntryCount);
            });
            if (docID != "" && docID != undefined) {
              await admin.firestore().collection("EventAllEntryLog").doc(docID).set({
                EventID: inputData.EventID,
                EntryCount: allentryCount - 1,
              });
            }
          });
      });


  });


exports.logEntryUpdate = functions
  .region('asia-south1')
  .firestore.document('/EventRegistrationDetails/{id}')
  .onUpdate(async (snap, context) => {
    const id = context.params.id;
    //      const inputData = snap.data();

    const before = snap.before;  // DataSnapshot before the change
    const after = snap.after;

    console.log(before);
    console.log(after);
    // const entryLog = admin.firestore().collection("EventEntryLog");
    var docID = "";
    var entryCount = 0;
    //  const entryLogID =
    console.log('before ', snap.before.CategoryName);
    console.log('after ', snap.after.CategoryName);
    const EventID = before.EventID;
    if (snap.before.CategoryName != "" && snap.after.CategoryName === "") {
      await admin.firestore().collection("EventList").doc(EventID).update({
        EntryCount: admin.firestore.FieldValue.increment(-1)
      });

    }

    // await admin.firestore().collection("EventEntryLog").where("EventID", "==", inputData.EventID)
    //   .where("CategoryName", "==", inputData.CategoryName).get().then(async (changes) => {
    //     changes.forEach(doc1 => {
    //       docID = doc1.id;
    //       entryCount = Number(doc1.data().EntryCount);
    //     });
    //     if (docID != "" && docID != undefined) {
    //       await admin.firestore().collection("EventEntryLog").doc(docID).set({
    //         EventID: inputData.EventID,
    //         CategoryName: inputData.CategoryName,
    //         EntryCount: entryCount - 1,
    //       });
    //     }
    //   }).
    // then(async (rec) => {
    //   var allentryCount = 0;
    //   //  const entryLogID =
    //   console.log(inputData.EventID);
    //   await admin.firestore().collection("EventAllEntryLog").where("EventID", "==", inputData.EventID)
    //     .get().then(async (changes) => {
    //       changes.forEach(doc1 => {
    //         docID = doc1.id;
    //         allentryCount = Number(doc1.data().EntryCount);
    //       });
    //       if (docID != "" && docID != undefined) {
    //         await admin.firestore().collection("EventAllEntryLog").doc(docID).set({
    //           EventID: inputData.EventID,
    //           EntryCount: allentryCount - 1,
    //         });
    //       }
    //     });
    // });


  });



exports.getEventsEntryCount =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
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


exports.getAllEventEntryCount =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      //const EventID = data.EventID;

      let resultList = [];

      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("EventAllEntryLog").get().then((changes) => {
        changes.forEach(doc1 => {
          resultList.push({
            EventID: doc1.data().EventID,
            EntryCount: Number(doc1.data().EntryCount),
          });
          console.log(resultList);
        });
        return resultList;

      });
    });


exports.getEventEntryCountForCategory =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
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
        .where("CategoryName", "==", CategoryName).get().then((changes) => {
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
