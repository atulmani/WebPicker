const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Function to update UserRequest collection
// Here we're using Gmail to send email using oncall function
exports.updateUserRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can update userRequests"
    );
  }
  console.log("first statement");
  // const email = data.requestData.email;
  const email = data.email;
  const action = data.action;
  // const uid = data.requestData.uid;
  const uid = data.uid;
  console.log("uid", uid);

  // const displayName = data.requestData.displayName;
  const displayName = data.displayName;
  // const phoneNo = data.requestData.phoneNo;
  const phoneNo = data.phoneNo;
  // const userRole = data.requestData.userRole;
  const userRole = data.userRole;
  // console.log(userRole);
  // const status = data.requestData.status;
  const status = data.status;
  // const address = data.requestData.address;
  const address = data.address;
  // const companyName = data.requestData.companyName;
  const companyName = data.companyName;
  // const customerType = data.requestData.customerType;
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
      // DateOfBirth: "",
      Address: address,
      // IDType: '',
      // IDNo: '',
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
// Here we're using Gmail to send email using oncall function
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
