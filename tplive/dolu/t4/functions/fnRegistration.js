const functions = require("firebase-functions");
const admin = require("firebase-admin");


exports.getApplicableEvent =
  functions.https.onCall(async (data, context) => {
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
          dob =  doc1.data().DateOfBirth;
          gender =  doc1.data().Gender;
          // console.log(dob);
        }
        // get event Category
        return admin.firestore().collection("EventList")
          .doc(EventID).get().then((doc2) => {
            if (doc2.exists) {
              categoryList =  doc2.data().CategoryDetails;
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
              else if(categoryList[index].DateRefType === 'After' && dob._seconds >= categoryList[index].ReferenceDate._seconds &&
            (categoryList[index].Gender.toUpperCase() === gender.toUpperCase() || categoryList[index].Gender.toUpperCase() === 'MIXED')){
                results.push(categoryList[index]);
              }
            }
            return results;
          });

      });
  });


exports.registerEvent =
  functions.https.onCall(async (data, context) => {
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
        PaymentStatus : 'Pending',
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(function(docRef) {
        return {
          RegistrationID: docRef.id
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          RegistrationID: "0"
        };
      });

    console.log("before return");

  });

  exports.getAllRegisteredEventList =
    functions.https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const EventID = data.EventID;
      const ParticipantID = data.ParticipantID;
      //get DOB for participant
      let resultList = [];
      return admin.firestore().collection("EventRegistrationDetails")
        .where("EventID" , "==", EventID)
        .where("ParticipantID","==", ParticipantID).get().then((changes) => {

            changes.forEach(doc1 => {
              resultList.push({
                Eventid: doc1.data().EventID,
                ParticipantID: doc1.data().ParticipantID,
                CategoryName: doc1.data().CategoryName,
                EventType: doc1.data().EventType,
                Fees: doc1.data().Fees,
                Gender: doc1.data().Gender,
                MaxTeamSize: doc1.data().MaxTeamSize,
                PaymentStatus : doc1.data().PaymentStatus,
                PartnerList : doc1.data().PartnerList,
              });

            });
            return resultList;

        });
    });



    exports.getParticipants =
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
