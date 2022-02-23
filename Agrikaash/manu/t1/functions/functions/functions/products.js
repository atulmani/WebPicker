const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Function to update UserRequest collection
exports.updateInventoryWithOrderDetails =
functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can update userRequests"
    );
  }
  const cartDetails = data.cartDetails;
  let cntItem = 0;
  for (let index = 0; index < cartDetails.length; index++) {
    cntItem = -1 * Number(cartDetails[index].SelectedsubItem.split(" ")[0]);
    cntItem = cntItem * Number(cartDetails[index].Quantity);

    const snapshot = admin.firestore().collection("ProductsInventory")
        .doc(cartDetails[index].ProductID);
    snapshot.get().then((doc1) => {
      if (doc1.exists) {
        console.log("if doc exists");
        admin.firestore().collection("ProductsInventory")
            .doc(cartDetails[index].ProductID).update({
              AvailableQuantity: admin.firestore().FieldValue
                  .increment(Number(cntItem)),
              LastUpdatedBy: context.auth.currentUser.email,
              LastUpdatedTimestamp: admin.firestore.Timestamp
                  .fromDate(new Date()),
            })
            .then(function(docRef2) {
              // console.log(Date.parse(eventstart))

            })
            .catch(function(error2) {
              console.error("error adding document:", error2);
            });
      } else {
        console.log("if doc not exists");
        admin.firestore().collection("ProductsInventory")
            .doc(cartDetails[index].ProductID).set({
              AvailableQuantity: Number(cntItem),
              LastUpdatedBy: context.auth.currentUser.email,
              LastUpdatedTimestamp: admin.firestore.Timestamp
                  .fromDate(new Date()),

            })
            .then(function(docRef2) {
            // console.log(Date.parse(eventstart))

            })
            .catch(function(error2) {
              console.error("error adding document:", error2);
            });
      }
    });
  }
});
