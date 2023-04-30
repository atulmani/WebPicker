const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.logEntryAdd = functions
  .region('asia-south1')
  .firestore.document('/EventRegistrationDetails/{id}')
  .onCreate(async (snap, context) => {
    const id = context.params.id;
    const inputData = snap.data();
    // console.log(inputData);
    var docID = "";
    var entryCount = 0;
    var completedCount = 0;
    var completedCountAll = 0;

    // console.log(inputData.EventID);
    const EventID = inputData.EventID;
    const paymentStatus = inputData.PaymentStatus;
    var diff = 0;
    if (inputData.PaymentStatus.toUpperCase() === 'COMPLETED') {
      diff = 1
    }
    await admin.firestore().collection("EventList").doc(EventID).update({
      EntryCount: admin.firestore.FieldValue.increment(1),
      CompletedCount: admin.firestore.FieldValue.increment(diff),

    });

    await admin.firestore().collection("EventEntryLog").where("EventID", "==", inputData.EventID)
      .where("CategoryName", "==", inputData.CategoryName).get().then(async (changes) => {
        changes.forEach(doc1 => {
          docID = doc1.id;
          entryCount = Number(doc1.data().EntryCount);
          completedCount = Number(doc1.data.CompletedCount);
        });
        if (paymentStatus.toUpperCase() === 'COMPLETED') {
          completedCount = completedCount + 1;
        }
        if (docID != "") {
          await admin.firestore().collection("EventEntryLog").doc(docID).set({
            EventID: inputData.EventID,
            CategoryName: inputData.CategoryName,
            EntryCount: entryCount + 1,
            CompletedCount: completedCount,
          });
        } else {

          await admin.firestore().collection("EventEntryLog").add({
            EventID: inputData.EventID,
            CategoryName: inputData.CategoryName,
            EntryCount: 1,
            CompletedCount: completedCount,
          });
        }

      }).
      then(async (rec) => {
        var allentryCount = 0;
        var docIDA = "";
        await admin.firestore().collection("EventAllEntryLog").where("EventID", "==", inputData.EventID).get().then(async (changes) => {
          changes.forEach(doc1 => {
            docIDA = doc1.id;
            allentryCount = Number(doc1.data().EntryCount);
            completedCountAll = Number(doc1.data().CompletedCount);
          });

          if (paymentStatus.toUpperCase() === 'COMPLETED') {
            completedCountAll = completedCountAll + 1;
          }
          if (docIDA != "") {
            await admin.firestore().collection("EventAllEntryLog").doc(docIDA).set({
              EventID: inputData.EventID,
              EntryCount: allentryCount + 1,
              CompletedCount: completedCountAll,
            });
          } else {

            await admin.firestore().collection("EventAllEntryLog").add({
              EventID: inputData.EventID,
              EntryCount: 1,
              CompletedCount: completedCountAll,
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
    // console.log(inputData);
    var docID = "";
    var entryCount = 0;
    var completedCount = 0;
    var completedCountAll = 0;

    //  const entryLogID =
    // console.log(inputData.EventID);
    const EventID = inputData.EventID;
    const paymentStatus = inputData.PaymentStatus;
    var diff = 0;
    if (inputData.PaymentStatus.toUpperCase() === 'COMPLETED') {
      diff = -1
    }

    await admin.firestore().collection("EventList").doc(EventID).update({
      EntryCount: admin.firestore.FieldValue.increment(-1),
      CompletedCount: admin.firestore.FieldValue.increment(diff),
    });

    await admin.firestore().collection("EventEntryLog").where("EventID", "==", inputData.EventID)
      .where("CategoryName", "==", inputData.CategoryName).get().then(async (changes) => {
        changes.forEach(doc1 => {
          docID = doc1.id;
          entryCount = Number(doc1.data().EntryCount);
          completedCount = Number(doc1.data.CompletedCount);
        });

        if (paymentStatus.toUpperCase() === 'COMPLETED') {
          completedCount = completedCount - 1;
        }
        if (docID != "" && docID != undefined) {
          await admin.firestore().collection("EventEntryLog").doc(docID).set({
            EventID: inputData.EventID,
            CategoryName: inputData.CategoryName,
            EntryCount: entryCount - 1,
            CompletedCount: completedCount,
          });
        }
      }).
      then(async (rec) => {
        var allentryCount = 0;
        var docIDA = "";
        await admin.firestore().collection("EventAllEntryLog").where("EventID", "==", inputData.EventID)
          .get().then(async (changes) => {
            changes.forEach(doc1 => {
              docIDA = doc1.id;
              allentryCount = Number(doc1.data().EntryCount);
              completedCountAll = Number(doc1.data().CompletedCount);
            });

            if (paymentStatus.toUpperCase() === 'COMPLETED') {
              completedCountAll = completedCountAll - 1;
            }
            if (docIDA != "" && docIDA != undefined) {
              await admin.firestore().collection("EventAllEntryLog").doc(docIDA).set({
                EventID: inputData.EventID,
                EntryCount: allentryCount - 1,
                CompletedCount: completedCountAll,
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
    const before = snap.before.data();  // DataSnapshot before the change
    const after = snap.after.data();

    var docID = "";
    var entryCount = 0;

    const EventID = before.EventID;
    var entryCountAll = 0;
    var entryCountCategory = 0;
    var entryCountCategoryCompleted = 0;
    var entryCountCategoryCompletedAll = 0;
    var diff = 0;
    //if category name is set as "" 
    if (before.CategoryName != "" && after.CategoryName === "") {
      if (before.PaymentStatus.toUpperCase() === 'COMPLETED') {
        diff = -1
      }

      await admin.firestore().collection("EventList").doc(EventID).update({
        EntryCount: admin.firestore.FieldValue.increment(-1),
        CompletedCount: admin.firestore.FieldValue.increment(diff),
      });

    }

    if (before.CategoryName === after.CategoryName) {
      if (before.PaymentStatus.toUpperCase() === 'PENDING' && after.PaymentStatus.toUpperCase() === 'COMPLETED') {
        diff = 1;
      }
      else if (before.PaymentStatus.toUpperCase() === 'COMPLETED' && after.PaymentStatus.toUpperCase() === 'PENDING') {
        diff = -1;
      } else {
        diff = 0;
      }
      if (diff != 0) {
        await admin.firestore().collection("EventEntryLog").where("EventID", "==", after.EventID)
          .where("CategoryName", "==", after.CategoryName).get().then(async (changes) => {
            changes.forEach(doc1 => {
              docID = doc1.id;
              entryCountCategory = Number(doc1.data().EntryCount);
              entryCountCategoryCompleted = Number(doc1.data().CompletedCount);
            });
            entryCountCategoryCompleted = entryCountCategoryCompleted + diff;
            if (docID != "") {
              await admin.firestore().collection("EventEntryLog").doc(docID).set({
                EventID: after.EventID,
                CategoryName: after.CategoryName,
                EntryCount: entryCountCategory,
                CompletedCount: entryCountCategoryCompleted,
              });
            }
          }).
          then(async (rec) => {
            var docIDA = "";
            await admin.firestore().collection("EventAllEntryLog").where("EventID", "==", after.EventID).get().then(async (changes) => {
              changes.forEach(doc1 => {
                docIDA = doc1.id;
                entryCountAll = Number(doc1.data().EntryCount);
                entryCountCategoryCompletedAll = Number(doc1.data().CompletedCount);
              });
              entryCountCategoryCompletedAll = entryCountCategoryCompletedAll + diff;

              if (docIDA != "") {
                await admin.firestore().collection("EventAllEntryLog").doc(docIDA).set({
                  EventID: after.EventID,
                  EntryCount: entryCountAll,
                  CompletedCount: entryCountCategoryCompletedAll,
                });
              }

            });
          });

      }

    }


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
            CompletedCount: Number(doc1.data().CompletedCount),
          });

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
            CompletedCount: Number(doc1.data().CompletedCount)
          });

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
              CompletedCount: Number(doc1.data().CompletedCount),
            });

          });
          return resultList;

        });
    });
