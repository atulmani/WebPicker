const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Function to get user record
exports.getUserRequest = functions.runWith({
  allowInvalidAppCheckToken: true,
}).https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated can get the details"
    );
  }

  const uid = data.uid;
  console.log(uid);
  if (uid === undefined) {
    throw new functions.https.HttpError(
        "failed-precondition",
        "user ID to be provided "
    );
  }

  return admin.firestore().collection("UserList").doc(uid).get();
});

exports.getProfileDetails =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
      );
    }
    const userID = data.userID;

    console.log("userID ", userID);
    return admin.firestore().collection("UserList")
        .doc(userID).get().then((doc1) => {
      if (doc1.exists) {
        // console.log(doc1);
        let results = {};
        return {
          id: doc1.id,
          Address: doc1.data().Address,
          AlternatePhone: doc1.data().AlternatePhone,
          City: doc1.data().City,
          Country: doc1.data().Country,
          DateOfBirth: doc1.data().DateOfBirth,
          Email: doc1.data().Email,
          Gender: doc1.data().Gender,
          Phone: doc1.data().Phone,
          State: doc1.data().State,
          UserName: doc1.data().UserName,
          UserRole: doc1.data().UserRole,
        }

      } else {
        console.log("no data");
        return {id : "0",
            msg : "No Record"};
      }
    });
    console.log("before return");
  });

exports.addUserDetails =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
      );
    }
    const userID = data.userID;
    const Phone = data.Phone;

    console.log("userID ", userID);

    admin.firestore().collection("UserList")
        .doc(userID)
        .set({
          UserId: userID,
          Phone: Phone,
          CreatedBy: userID,
          CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return "0";
        })
        .catch(function(error) {
          console.log("in error");
          return "1";
        });
  });

exports.saveProfileDetailsStep1 =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
      );
    }
    const userID = data.userID;
    const UserName = data.UserName;
    const Email = data.Email;
    const Gender = data.Gender;

    console.log("userID ", userID);

    admin.firestore().collection("UserList")
        .doc(userID)
        .update({
          UserName: UserName,
          Email: Email,
          Gender: Gender,
          UpdatedBy: userID,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return "0";
        })
        .catch(function(error) {
          console.log("in error");
          return "1";
        });
  });

exports.saveProfileDetailsStep2 =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
      );
    }
    const userID = data.userID;
    const UserRole = data.UserRole;
    console.log("userID ", userID);

    admin.firestore().collection("UserList")
        .doc(userID)
        .update({
          UserRole: UserRole,
          UpdatedBy: userID,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return "0";
        })
        .catch(function(error) {
          console.log("in error");
          return "1";
        });
  });

exports.saveProfileDetailsStep3 =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
      );
    }
    const userID = data.userID;
    const DateOfBirth = data.DateOfBirth;
    const City = data.City;
    const State = data.State;
    const Country = data.Country;
    console.log("userID ", userID);

    admin.firestore().collection("UserList")
        .doc(userID)
        .update({
          DateOfBirth:
            admin.firestore.Timestamp.fromDate(new Date(DateOfBirth)),
          City: City,
          State: State,
          Country: Country,
          UpdatedBy: userID,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return "0";
        })
        .catch(function(error) {
          console.log("in error");
          return "1";
        });
  });

exports.saveProfileDetailsStep4 =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
      );
    }
    const userID = data.userID;
    const Address = data.Address;
    const AlternatePhone = data.AlternatePhone;
    console.log("userID ", userID);

    admin.firestore().collection("UserList")
        .doc(userID)
        .update({
          Address: Address,
          AlternatePhone: AlternatePhone,
          UpdatedBy: userID,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return "0";
        })
        .catch(function(error) {
          console.log("in error");
          return "1";
        });
  });


  exports.updateProfileDetails =
    functions.https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
            "unauthenticatied",
            "only authenticated user can call this"
        );
      }
      const userID = data.userID;
      const UserName = data.UserName;
      const Email = data.Email;
      const Address = data.Address;
      const AlternatePhone = data.AlternatePhone;
      const Gender = data.Gender;
      const DateOfBirth = data.DateOfBirth;
      const userRole = data.userRole;

      admin.firestore().collection("UserList")
          .doc(userID)
          .update({
            UserName: UserName,
            Email: Email,
            Gender: Gender,
            Address: Address,
            AlternatePhone: AlternatePhone,
            UserRole: userRole,
            DateOfBirth:
              admin.firestore.Timestamp.fromDate(new Date(DateOfBirth)),
            UpdatedBy: userID,
            UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
          })
          .then(() => {
            console.log("Success");
            return "0";
          })
          .catch(function(error) {
            console.log("in error");
            return "1";
          });
    });
