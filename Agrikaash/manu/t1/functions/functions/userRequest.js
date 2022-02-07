const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Function to update UserRequest collection
exports.updateUserRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can update userRequests"
    );
  }
  const email = data.email;
  const action = data.action;
  const uid = data.uid;
  const displayName = data.displayName;
  const phoneNo = data.phoneNo;
  const userRole = data.userRole;
  const status = data.status;
  const address = data.address;
  const companyName = data.companyName;
  const customerType = data.customerType;
  console.log("before update statement");

  if (uid === undefined) {
    throw new functions.https.HttpError(
        "failed-precondition",
        "user ID has to be provided for update"
    );
  }
  if (action === "update") {
    return admin.firestore().collection("UserRequest").doc(uid).update({
      uid: uid,
      displayName: displayName,
      EmailID: email,
      Phone: phoneNo,
      DateOfBirth: "",
      Address: address,
      IDType: "",
      IDNo: "",
      UserRole: userRole,
      CompanyName: companyName,
      CustomerType: customerType,
      Status: status,
      // CreatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
    });
  } else {
    return admin.firestore().collection("UserRequest").doc(uid).set({
      uid: uid,
      displayName: displayName,
      EmailID: email,
      Phone: phoneNo,
      DateOfBirth: "",
      Address: address,
      IDType: "",
      IDNo: "",
      UserRole: userRole,
      CompanyName: companyName,
      CustomerType: customerType,
      Status: status,
      CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
    });
  }
});


// Function to update UserRequest collection
exports.updateUserProfileImage = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can update userRequests"
    );
  }
  const uid = data.uid;
  const profileImageURL = data.profileImageURL;

  if (uid === undefined) {
    throw new functions.https.HttpError(
        "failed-precondition",
        "user ID has to be provided for update"
    );
  }
  return admin.firestore().collection("UserRequest").doc(uid).update({
    ProfileImageURL: profileImageURL,
  });
});


// Function to get all record
exports.getAllUserRequests = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated can get the details"
    );
  }
  return admin.firestore().collection("UserRequest").get();
});

// Function to get user record
exports.getUserRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated can get the details"
    );
  }

  const uid = data.uid;

  if (uid === undefined) {
    throw new functions.https.HttpError(
        "failed-precondition",
        "user ID to be provided "
    );
  }

  return admin.firestore().collection("UserRequest").doc(uid).get();
});
