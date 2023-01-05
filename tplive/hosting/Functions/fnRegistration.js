const functions = require("firebase-functions");
const admin = require("firebase-admin");


exports.getApplicableEvent =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ParticipantID = data.ParticipantID;
      //get DOB for participant
      let dob = "";
      let gender = "";
      let results = [];
      var categoryList = [];
      return admin.firestore().collection("UserList")
        .doc(ParticipantID).get().then((doc1) => {
          if (doc1.exists) {
            dob = doc1.data().DateOfBirth;
            gender = doc1.data().Gender;
            // console.log(dob);
          }
          // get event Category
          return admin.firestore().collection("EventList")
            .doc(EventID).get().then((doc2) => {
              if (doc2.exists) {
                categoryList = doc2.data().CategoryDetails;
                //console.log(categoryList);
              }
              //check if DOB is valid
              for (index = 0; index < categoryList.length; index++) {
                // console.log(categoryList[index].DateRefType);
                // console.log(categoryList[index].ReferenceDate);
                // console.log(dob);
                if (categoryList[index].DateRefType === 'Before' && dob._seconds <= categoryList[index].ReferenceDate._seconds &&
                  (categoryList[index].Gender.toUpperCase() === gender.toUpperCase() || categoryList[index].Gender.toUpperCase() === 'MIXED')) {
                  //    console.log("1 categoryList[index]", categoryList[index]);
                  results.push(categoryList[index]);
                }
                else if (categoryList[index].DateRefType === 'After' && dob._seconds >= categoryList[index].ReferenceDate._seconds &&
                  (categoryList[index].Gender.toUpperCase() === gender.toUpperCase() || categoryList[index].Gender.toUpperCase() === 'MIXED')) {
                  results.push(categoryList[index]);
                }
              }
              return results;
            });

        });
    });


exports.registerEvent =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ParticipantID = data.ParticipantID;
      const ParticipantName = data.ParticipantName;
      const CategoryName = data.CategoryName;
      const EventType = data.EventType;
      const Fees = data.Fees;
      const Gender = data.Gender;
      const MaxTeamSize = data.MaxTeamSize;

      return admin.firestore().collection("EventRegistrationDetails")
        .add({
          EventID: EventID,
          ParticipantID: ParticipantID,
          ParticipantName: ParticipantName,
          CategoryName: CategoryName,
          EventType: EventType,
          Fees: Fees,
          Gender: Gender,
          MaxTeamSize: MaxTeamSize,
          PaymentStatus: 'Pending',
          CreatedBy: context.auth.uid,
          CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function (docRef) {
          return {
            RegistrationID: docRef.id
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            RegistrationID: "0"
          };
        });

      console.log("before return");

    });



exports.registerAllEvent =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ParticipantID = data.ParticipantID;
      const PlayerID = data.PlayerID;
      const ParticipantName = data.ParticipantName;
      const CategoryList = data.CategoryList;
      const DeleteCategoryList = data.DeleteCategoryList;

      var eventRegID = "";
      var paymentStatus = "Pending";


      for (index = 0; index < CategoryList.length; index++) {
        await admin.firestore().collection("EventRegistrationDetails")
          .where("EventID", "==", EventID)
          .where("CategoryName", "==", CategoryList[index].CategoryName)
          .where("PlayerID", "==", PlayerID)
          .get().then(async (changes) => {
            changes.forEach(doc1 => {
              eventRegID = doc1.id;
              paymentStatus = doc1.data().PaymentStatus;

            });
            if (paymentStatus === undefined) {
              paymentStatus = 'Pending';
            }
            if (eventRegID != "") {
              admin.firestore().collection("EventRegistrationDetails")
                .doc(eventRegID)
                .update({
                  EventID: EventID,
                  ParticipantID: ParticipantID,
                  PlayerID: PlayerID,
                  ParticipantName: ParticipantName,
                  CategoryName: CategoryList[index].CategoryName,
                  EventType: CategoryList[index].EventType,
                  Fees: CategoryList[index].Fees,
                  Gender: CategoryList[index].Gender,
                  MaxTeamSize: CategoryList[index].MaxTeamSize,
                  PaymentStatus: paymentStatus,
                  PartnerPlayerID: CategoryList[index].PartnerPlayerID,
                  PartnerPlayerName: CategoryList[index].PartnerPlayerName,
                  CreatedBy: context.auth.uid,
                  CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
                })
                .then(async function (docRef) {

                })
                .catch(function (error) {

                });
            } else {
              admin.firestore().collection("EventRegistrationDetails")
                .add({
                  EventID: EventID,
                  ParticipantID: ParticipantID,
                  PlayerID: PlayerID,
                  ParticipantName: ParticipantName,
                  CategoryName: CategoryList[index].CategoryName,
                  EventType: CategoryList[index].EventType,
                  Fees: CategoryList[index].Fees,
                  Gender: CategoryList[index].Gender,
                  MaxTeamSize: CategoryList[index].MaxTeamSize,
                  PaymentStatus: paymentStatus,
                  PartnerPlayerID: CategoryList[index].PartnerPlayerID,
                  PartnerPlayerName: CategoryList[index].PartnerPlayerName,
                  CreatedBy: context.auth.uid,
                  CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
                })
                .then(function (docRef) {

                })
                .catch(function (error) {

                });
            }


          });
        eventRegID = "";
        paymentStatus = 'Pending';
      }
      if (DeleteCategoryList.length > 0) {
        await admin.firestore().collection("EventRegistrationDetails")
          .where("EventID", "==", EventID)
          .where("CategoryName", "in", DeleteCategoryList)
          .where("PlayerID", "==", PlayerID)
          .get().then(async (changes) => {
            changes.forEach(async doc3 => {
              await admin.firestore().collection("EventRegistrationDetailsWithdraw")
                .add({
                  EventID: doc3.data().EventID,
                  ParticipantID: doc3.data().ParticipantID,
                  PlayerID: doc3.data().PlayerID,
                  ParticipantName: doc3.data().ParticipantName,
                  CategoryName: doc3.data().CategoryName,
                  EventType: doc3.data().EventType,
                  Fees: doc3.data().Fees,
                  Gender: doc3.data().Gender,
                  MaxTeamSize: doc3.data().MaxTeamSize,
                  PaymentStatus: doc3.data().PaymentStatus,
                  PartnerPlayerID: doc3.data().PartnerPlayerID,
                  PartnerPlayerName: doc3.data().PartnerPlayerName,
                  CreatedBy: context.auth.uid,
                  CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
                })


                .then(async function (docRef) {
                  doc3.ref.delete();

                })
                .catch(function (error) {

                });

            });
          });
      }



    });



exports.withdrawRegistration =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ParticipantID = data.ParticipantID;
      const PlayerID = data.PlayerID;
      const DeleteCategoryList = data.DeleteCategoryList;

      await admin.firestore().collection("EventRegistrationDetails")
        .where("EventID", "==", EventID)
        .where("CategoryName", "in", DeleteCategoryList)
        .where("PlayerID", "==", PlayerID)
        .get().then(async (changes) => {
          changes.forEach(async doc3 => {
            await admin.firestore().collection("EventRegistrationDetailsWithdraw")
              .add({
                EventID: doc3.data().EventID,
                ParticipantID: doc3.data().ParticipantID,
                PlayerID: doc3.data().PlayerID,
                ParticipantName: doc3.data().ParticipantName,
                CategoryName: doc3.data().CategoryName,
                EventType: doc3.data().EventType,
                Fees: doc3.data().Fees,
                Gender: doc3.data().Gender,
                MaxTeamSize: doc3.data().MaxTeamSize,
                PaymentStatus: doc3.data().PaymentStatus,
                PartnerPlayerID: doc3.data().PartnerPlayerID,
                PartnerPlayerName: doc3.data().PartnerPlayerName,
                CreatedBy: context.auth.uid,
                CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
              })


              .then(async function (docRef) {
                doc3.ref.delete();

              })
              .catch(function (error) {

              });

          });
        });

    });

exports.getAllRegisteredEventList =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const PlayerID = data.PlayerID;

      let resultList = [];
      return await admin.firestore().collection("EventRegistrationDetails")
        .where("EventID", "==", EventID)
        .where("PlayerID", "==", PlayerID).get().then(async (changes) => {

          changes.forEach(doc1 => {
            resultList.push({
              EventID: doc1.data().EventID,
              ParticipantID: doc1.data().ParticipantID,
              PlayerID: doc1.data().PlayerID,
              CategoryName: doc1.data().CategoryName,
              EventType: doc1.data().EventType,
              Fees: doc1.data().Fees,
              Gender: doc1.data().Gender,
              MaxTeamSize: doc1.data().MaxTeamSize,
              PaymentStatus: doc1.data().PaymentStatus,
              ParticipantID: doc1.data().ParticipantID,
              ParticipantName: doc1.data().ParticipantName,
              PartnerPlayerID: doc1.data().PartnerPlayerID,
              PartnerPlayerName: doc1.data().PartnerPlayerName,
              RegType: 'Self',
            });


          });
          return await admin.firestore().collection("EventRegistrationDetails")
            .where("EventID", "==", EventID)
            .where("PartnerPlayerID", "==", PlayerID).get().then((changes1) => {

              changes1.forEach(doc2 => {
                resultList.push({
                  EventID: doc2.data().EventID,
                  ParticipantID: doc2.data().ParticipantID,
                  PlayerID: doc2.data().PlayerID,
                  CategoryName: doc2.data().CategoryName,
                  EventType: doc2.data().EventType,
                  Fees: doc2.data().Fees,
                  Gender: doc2.data().Gender,
                  MaxTeamSize: doc2.data().MaxTeamSize,
                  PaymentStatus: doc2.data().PaymentStatus,
                  ParticipantID: doc2.data().ParticipantID,
                  ParticipantName: doc2.data().ParticipantName,
                  PartnerPlayerID: doc2.data().PartnerPlayerID,
                  PartnerPlayerName: doc2.data().PartnerPlayerName,
                  RegType: 'Partner',
                });

              });
              return resultList;

            });


        });
    });


exports.getParticipants =
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
      return await admin.firestore().collection("EventRegistrationDetails").where("EventID", "==", EventID).get().then((changes) => {
        changes.forEach(doc1 => {

          resultList.push({
            EventID: doc1.data().EventID,
            CategoryName: doc1.data().CategoryName,
            ParticipantID: doc1.data().ParticipantID,
            ParticipantName: doc1.data().ParticipantName,
            EventType: doc1.data().EventType,
            Gender: doc1.data().Gender,
            PaymentStatus: doc1.data().PaymentStatus,
            Fees: Number(doc1.data().Fees),

          });
          console.log(resultList);
        });
        return resultList;

      });
    });
