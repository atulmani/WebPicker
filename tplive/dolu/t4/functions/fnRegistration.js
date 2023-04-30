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
      const PlayerID = data.PlayerID;
      const DeleteCategoryList = data.DeleteCategoryList;

      await admin.firestore().collection("EventRegistrationDetails")
        .where("EventID", "==", EventID)
        .where("CategoryName", "in", DeleteCategoryList)
        .where("ParticipantID", "==", PlayerID)
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
                // doc3.ref.delete();
                // doc3.delete();

              })
              .catch(function (error) {
                return false;
              });
            // console.log(doc3.data())
            doc3.ref.delete();


          });
          return true;
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

exports.getAllRegisteredEventListByPlayerCode =
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
        .where("ParticipantID", "==", PlayerID).get().then(async (changes) => {

          changes.forEach(doc1 => {
            resultList.push({
              EventID: doc1.data().EventID,
              CategoryName: doc1.data().CategoryName,
              EventType: doc1.data().EventType,
              Fees: doc1.data().Fees,
              Gender: doc1.data().Gender,
              MaxTeamSize: doc1.data().MaxTeamSize,
              PaymentStatus: doc1.data().PaymentStatus,
              RegType: 'Self',

              ParticipantID: doc1.data().ParticipantID,
              PlayerID: doc1.data().PlayerID,
              ParticipantName: doc1.data().ParticipantName,
              PartnerPlayerID: doc1.data().PartnerPlayerID,
              PartnerPlayerName: doc1.data().PartnerPlayerName,
            });


          });
          return await admin.firestore().collection("EventRegistrationDetails")
            .where("EventID", "==", EventID)
            .where("PartnerPlayerID", "==", PlayerID).get().then((changes1) => {

              changes1.forEach(doc2 => {
                resultList.push({
                  EventID: doc2.data().EventID,
                  CategoryName: doc2.data().CategoryName,
                  EventType: doc2.data().EventType,
                  Fees: doc2.data().Fees,
                  Gender: doc2.data().Gender,
                  MaxTeamSize: doc2.data().MaxTeamSize,
                  PaymentStatus: doc2.data().PaymentStatus,
                  RegType: 'Partner',


                  PlayerID: '', //doc2.data().PlayerID,
                  ParticipantID: doc2.data().PartnerPlayerID, //doc2.data().ParticipantID,
                  ParticipantName: doc2.data().PartnerPlayerName, //doc2.data().ParticipantName,
                  PartnerPlayerID: doc2.data().ParticipantID, //doc2.data().PartnerPlayerID,
                  PartnerPlayerName: doc2.data().ParticipantName, //doc2.data().PartnerPlayerName,
                });

              });
              return resultList;

            });


        });
    });


exports.getAllRegisteredEventForPlayerCode =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const PlayerID = data.PlayerID;
      let eventList = [];
      let resultList = [];
      let eventDetails = [];
      return await admin.firestore().collection("EventRegistrationDetails")
        .where("ParticipantID", "==", PlayerID).get().then(async (changes) => {

          changes.forEach(doc1 => {
            const found = eventList.includes(doc1.data().EventID);
            if (!found) eventList.push(doc1.data().EventID);

            resultList.push({
              EventID: doc1.data().EventID,
              EventCode: doc1.data().EventCode,
              CategoryName: doc1.data().CategoryName,
              EventType: doc1.data().EventType,
              Fees: doc1.data().Fees,
              Gender: doc1.data().Gender,
              MaxTeamSize: doc1.data().MaxTeamSize,
              PaymentStatus: doc1.data().PaymentStatus,
              RegType: 'Self',

              ParticipantID: doc1.data().ParticipantID,
              PlayerID: doc1.data().PlayerID,
              ParticipantName: doc1.data().ParticipantName,
              PartnerPlayerID: doc1.data().PartnerPlayerID,
              PartnerPlayerName: doc1.data().PartnerPlayerName,
              OrderID: doc1.data().OrderID,
              TransactionID: doc1.data().TransactionID
            });



          });
          return await admin.firestore().collection("EventRegistrationDetails")
            .where("PartnerPlayerID", "==", PlayerID).get().then(async (changes1) => {

              changes1.forEach(doc2 => {

                const found = eventList.includes(doc2.data().EventID);
                if (!found) eventList.push(doc2.data().EventID);


                resultList.push({
                  EventID: doc2.data().EventID,
                  CategoryName: doc2.data().CategoryName,
                  EventType: doc2.data().EventType,
                  Fees: doc2.data().Fees,
                  Gender: doc2.data().Gender,
                  MaxTeamSize: doc2.data().MaxTeamSize,
                  PaymentStatus: doc2.data().PaymentStatus,
                  RegType: 'Partner',


                  PlayerID: '', //doc2.data().PlayerID,
                  ParticipantID: doc2.data().PartnerPlayerID, //doc2.data().ParticipantID,
                  ParticipantName: doc2.data().PartnerPlayerName, //doc2.data().ParticipantName,
                  PartnerPlayerID: doc2.data().ParticipantID, //doc2.data().PartnerPlayerID,
                  PartnerPlayerName: doc2.data().ParticipantName, //doc2.data().PartnerPlayerName,
                  OrderID: doc2.data().OrderID,
                  TransactionID: doc2.data().TransactionID

                });

              });
              if (eventList.length > 0) {
                return await admin.firestore().collection("EventList")
                  .where(admin.firestore.FieldPath.documentId(), 'in', eventList).get().then(async (changes2) => {

                    changes2.forEach(doc3 => {

                      eventDetails.push({
                        EventID: doc3.id,
                        EventCode: doc3.data().EventCode,
                        CategoryDetails: doc3.data().CategoryDetails,
                        City: doc3.data().City,
                        EventEndDate: doc3.data().EventEndDate,
                        EventStartDate: doc3.data().EventStartDate,
                        ConvenienceCharge: doc3.data().ConvenienceCharge,
                        MiscellaneousChargeFees: doc3.data().MiscellaneousChargeFees,
                        MiscellaneousChargeRemark: doc3.data().MiscellaneousChargeRemark,
                        EventMode: doc3.data().EventMode,
                        EventName: doc3.data().EventName,
                        EventStatus: doc3.data().EventStatus,
                        MinimumFee: doc3.data().MinimumFee,
                        WithdrawalEndDate: doc3.data().WithdrawalEndDate,
                        RegistrationEndDate: doc3.data().RegistrationEndDate,
                        OrganizationName: doc3.data().OrganizationName,
                        PaymentMode: doc3.data().PaymentMode,
                        PaymentOpenFlag: doc3.data().PaymentOpenFlag,
                      });

                    });

                    return {
                      eventDetails: eventDetails,
                      entryDetails: resultList
                    }

                  });
              } else {
                return {
                  eventDetails: eventDetails,
                  entryDetails: resultList
                }
              }

            });
        });
    });

exports.getAllRegisteredEventForUserID =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const UserID = data.UserID;

      let resultList = [];
      let userList = [];
      return await admin.firestore().collection("Participants")
        .where("UserID", "==", UserID)
        .get().then(async (changes) => {

          changes.forEach(doc1 => {
            userList.push(doc1.id,
            );
          });
          return await admin.firestore().collection("EventRegistrationDetails")
            .where("PlayerID", "in", userList)
            .get().then((changes1) => {

              changes1.forEach(doc2 => {
                resultList.push({
                  EventID: doc2.data().EventID,
                  CategoryName: doc2.data().CategoryName,
                  EventType: doc2.data().EventType,
                  Fees: doc2.data().Fees,
                  Gender: doc2.data().Gender,
                  MaxTeamSize: doc2.data().MaxTeamSize,
                  PaymentStatus: doc2.data().PaymentStatus,
                  RegType: 'Partner',
                  PlayerID: '', //doc2.data().PlayerID,
                  ParticipantID: doc2.data().PartnerPlayerID, //doc2.data().ParticipantID,
                  ParticipantName: doc2.data().PartnerPlayerName, //doc2.data().ParticipantName,
                  PartnerPlayerID: doc2.data().ParticipantID, //doc2.data().PartnerPlayerID,
                  PartnerPlayerName: doc2.data().ParticipantName, //doc2.data().PartnerPlayerName,
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
      return await admin.firestore().collection("EventRegistrationDetails").where("EventID", "==", EventID).orderBy("ParticipantName").get().then((changes) => {
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
            PlayerUserID: doc1.data().PlayerID,

            PartnerPlayerID: doc1.data().PartnerPlayerID,
            PartnerPlayerName: doc1.data().PartnerPlayerName,

          });
          console.log(resultList);

        });
        return resultList;

      });
    });


exports.getParticipantsWithCategoryName =
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
      return await admin.firestore().collection("EventRegistrationDetails").
        where("EventID", "==", EventID).
        where("CategoryName", "==", CategoryName).
        orderBy("ParticipantName").get().then((changes) => {
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
              PlayerUserID: doc1.data().PlayerID,
              PartnerPlayerID: doc1.data().PartnerPlayerID,
              PartnerPlayerName: doc1.data().PartnerPlayerName,

            });
            console.log(resultList);

          });
          return resultList;

        });
    });




exports.updatePaymentStatus =
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
      const CategoryList = data.CategoryList;
      const paymentStatus = data.paymentStatus;
      const paymentAmount = data.paymentAmount;
      const transactionID = data.transactionID;
      const orderID = data.orderID;

      var eventRegID = "";


      for (index = 0; index < CategoryList.length; index++) {
        await admin.firestore().collection("EventRegistrationDetails")
          .where("EventID", "==", EventID)
          .where("CategoryName", "==", CategoryList[index])
          .where("ParticipantID", "==", PlayerID)
          .get().then(async (changes) => {
            changes.forEach(doc1 => {
              eventRegID = doc1.id;
              //        paymentStatus = doc1.data().PaymentStatus;

            });
            // if (paymentStatus === undefined) {
            //   paymentStatus = 'Pending';
            // }
            if (eventRegID != "") {
              admin.firestore().collection("EventRegistrationDetails")
                .doc(eventRegID)
                .update({
                  TransactionID: transactionID,
                  OrderID: orderID,
                  PaymentStatus: paymentStatus,
                  PaymentAmount: paymentAmount,
                  TransactionDate: admin.firestore.Timestamp.fromDate(new Date()),
                  CreatedBy: context.auth.uid,
                  UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
                })
                .then(async function (docRef) {

                })
                .catch(function (error) {

                });
            } else {
              admin.firestore().collection("EventRegistrationDetails")
                .add({
                  EventID: EventID,
                  PlayerID: PlayerID,
                  CategoryName: CategoryList[index],
                  TransactionID: transactionID,
                  OrderID: orderID,
                  PaymentStatus: paymentStatus,
                  PaymentAmount: paymentAmount,
                  TransactionDate: admin.firestore.Timestamp.fromDate(new Date()),

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
        // paymentStatus = 'Pending';
      }



    });

