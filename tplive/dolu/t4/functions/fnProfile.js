const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Function to get user record
exports.getUserRequest = functions
  .region('asia-south1')
  .runWith({
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
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
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
              PlayerID: doc1.data().PlayerID,
              Address: doc1.data().Address,
              AlternatePhone: doc1.data().AlternatePhone,
              City: doc1.data().City,
              Country: doc1.data().Country,
              DateOfBirth: doc1.data().DateOfBirth,
              Email: doc1.data().Email,
              Gender: doc1.data().Gender,
              Phone: doc1.data().Phone,
              Pincode: doc1.data().Pincode,
              State: doc1.data().State,
              PinCode: doc1.data().Pincode,
              UserName: doc1.data().UserName,
              UserRole: doc1.data().UserRole,
              ProfilePicURL: doc1.data().ProfilePicURL,
            }

          } else {
            console.log("no data");
            return {
              id: "0",
              msg: "No Record"
            };
          }
        });
      console.log("before return");
    });

exports.addUserDetails =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {

      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const userID = data.userID;
      const Phone = data.Phone;
      var UserRole = [{ 'TYPE': 'PARTICIPANT' }];
      var userCount = 0;
      var ucdocID = '';
      //PlayerID: doc1.data().PlayerID,
      console.log("userID ", userID);
      await admin.firestore().collection("UserCountSummary")
        .get().then(async (changes) => {
          changes.forEach(doc1 => {
            ucdocID = doc1.id;
            userCount = Number(doc1.data().UserCount);
          });

          //} 
          //else 
          {

            userCount = userCount + 1;
            playerID = "TP" + userCount;
            await admin.firestore().collection("UserList")
              .doc(userID)
              .set({
                UserId: userID,
                PlayerID: playerID,
                Phone: Phone,
                UserRole: UserRole,
                CreatedBy: userID,
                CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
              })
              .then(async () => {
                console.log("Success");
                ///////////////////////
                var docID = "";
                await admin.firestore().collection("Participants").where("UserID", "==", userID).where("ParticipantID", "==", userID)
                  .get().then(async (changes) => {
                    changes.forEach(doc1 => {
                      docID = doc1.id;
                    });

                    if (docID != "" & docID != undefined) {
                      await admin.firestore().collection("Participants").doc(docID).set({
                        UserID: userID,
                        ParticipantID: userID,
                        PlayerID: playerID,
                        Phone: Phone,
                      });
                    } else {

                      await admin.firestore().collection("Participants").add({
                        UserID: userID,
                        ParticipantID: userID,
                        PlayerID: playerID,
                        Phone: Phone,
                      });
                    }

                  });
                ///////////////////////
                if (ucdocID === '' || ucdocID === undefined || ucdocID === null) {
                  await admin.firestore().collection("UserCountSummary").add({
                    UserCount: 1,
                  });
                }
                else {


                  await admin.firestore().collection("UserCountSummary")
                    .doc(ucdocID)
                    .set({
                      UserCount: userCount,
                    })
                    .then(async () => {

                    })
                }

              });
          }
        });
    });

exports.saveProfileDetailsStep1 =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
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
          var docID = "";
          admin.firestore().collection("Participants").where("UserID", "==", userID).where("ParticipantID", "==", userID)
            .get().then((changes) => {
              changes.forEach(doc1 => {
                docID = doc1.id;
              });

              if (docID != "" & docID != undefined) {
                admin.firestore().collection("Participants").doc(docID).update({
                  UserID: userID,
                  ParticipantID: userID,
                  UserName: UserName,
                  Email: Email,
                  Gender: Gender,
                });
              } else {

                admin.firestore().collection("Participants").add({
                  UserID: userID,
                  ParticipantID: userID,
                  UserName: UserName,
                  Email: Email,
                  Gender: Gender,
                });
              }

            });

          return "0";

        })
        .catch(function (error) {
          console.log("in error");
          return "1";
        });
    });

exports.saveProfileDetailsStep2 =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
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
        .catch(function (error) {
          console.log("in error");
          return "1";
        });
    });

exports.saveProfileDetailsStep3 =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
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
      const District = data.District;
      const Pincode = data.Pincode;

      console.log("userID ", userID);

      admin.firestore().collection("UserList")
        .doc(userID)
        .update({
          DateOfBirth:
            admin.firestore.Timestamp.fromDate(new Date(DateOfBirth)),
          City: City,
          State: State,
          Country: Country,
          District: District,
          Pincode: Pincode,
          UpdatedBy: userID,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          var docID = "";
          admin.firestore().collection("Participants").where("UserID", "==", userID).where("ParticipantID", "==", userID)
            .get().then((changes) => {
              changes.forEach(doc1 => {
                docID = doc1.id;
              });

              if (docID != "" & docID != undefined) {
                admin.firestore().collection("Participants").doc(docID).update({
                  DateOfBirth:
                    admin.firestore.Timestamp.fromDate(new Date(DateOfBirth)),
                  City: City,
                  State: State,
                  Country: Country,
                  District: District,
                  Pincode: Pincode,
                });
              } else {

                admin.firestore().collection("Participants").add({
                  DateOfBirth:
                    admin.firestore.Timestamp.fromDate(new Date(DateOfBirth)),
                  City: City,
                  State: State,
                  Country: Country,
                  District: District,
                  Pincode: Pincode,
                });
              }

            });

          return "0";
        })
        .catch(function (error) {
          console.log("in error");
          return "1";
        });
    });

exports.saveProfileDetailsStep4 =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
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
        .catch(function (error) {
          console.log("in error");
          return "1";
        });
    });


exports.updateProfileDetails =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
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
        .then(async () => {
          console.log("Success");

          var docID = "";
          await admin.firestore().collection("Participants").where("UserID", "==", userID).where("ParticipantID", "==", userID)
            .get().then(async (changes) => {
              changes.forEach(doc1 => {
                docID = doc1.id;
              });

              if (docID != "" & docID != undefined) {
                await admin.firestore().collection("Participants").doc(docID).set({
                  UserName: UserName,
                  Email: Email,
                  Gender: Gender,
                  Address: Address,
                  DateOfBirth:
                    admin.firestore.Timestamp.fromDate(new Date(DateOfBirth)),
                });
              } else {

                await admin.firestore().collection("Participants").add({
                  UserName: UserName,
                  Email: Email,
                  Gender: Gender,
                  Address: Address,
                  DateOfBirth:
                    admin.firestore.Timestamp.fromDate(new Date(DateOfBirth)),
                });
              }

            });


          return "0";
        })
        .catch(function (error) {
          console.log("in error");
          return "1";
        });
    });


exports.getUserWithRole =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      let resultList = [];

      const roleList = data.paraRole;
      console.log(roleList);
      // var dbrows = await admin.firestore().collection("PartnerList").get();
      // dbrows.then((changes) => {
      return await admin.firestore().collection("UserList").get().then((changes) => {
        changes.forEach(change => {
          for (index = 0; index < roleList.length; index++) {
            // findIndex(e => e.TYPE === "ADMIN")
            if (change.data().UserRole != null && change.data().UserRole != undefined) {
              if (change.data().UserRole.findIndex(e => e.TYPE === roleList[index]) >= 0) {
                console.log(roleList[index]);
                resultList.push({
                  userid: change.id,
                  PlayerID: change.data().PlayerID,
                  Address: change.data().Address,
                  AlternatePhone: change.data().AlternatePhone,
                  City: change.data().City,
                  Country: change.data().Country,
                  DateOfBirth: change.data().DateOfBirth,
                  Email: change.data().Email,
                  Gender: change.data().Gender,
                  Phone: change.data().Phone,
                  State: change.data().State,
                  UserName: change.data().UserName,
                  UserRole: change.data().UserRole,
                });
                break;
              }
            }

          }
          console.log(resultList);
        });
        return resultList;

      });
    });

exports.saveProfilePicture =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const userID = data.userID;
      const ProfilePicURL = data.ProfilePicURL;

      console.log("userID ", userID);

      admin.firestore().collection("UserList")
        .doc(userID)
        .update({
          ProfilePicURL: ProfilePicURL,
          UpdatedBy: userID,
          UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Success");
          return "0";
        })
        .catch(function (error) {
          console.log("in error");
          return "1";
        });
    });


exports.getRegisteredParticant =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      let resultList = [];

      const userID = data.userID;

      return await admin.firestore().collection("Participants")
        .where("UserID", "==", userID)
        .get().then((changes) => {
          changes.forEach(doc1 => {
            resultList.push({
              id: doc1.id,
              City: doc1.data().City,
              PlayerID: doc1.data().PlayerID,
              Country: doc1.data().Country,
              DateOfBirth: doc1.data().DateOfBirth,
              District: doc1.data().District,
              Email: doc1.data().Email,
              Gender: doc1.data().Gender,
              ParticipantID: doc1.data().ParticipantID,
              Phone: doc1.data().Phone,
              Pincode: doc1.data().Pincode,
              State: doc1.data().State,
              UserName: doc1.data().UserName,
              UserID: doc1.data().UserID,
            });
            //console.log(resultList);
          });
          return resultList;

        });
    });

exports.createParticipants =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      const userID = data.userID;
      const Email = data.Email;
      const Gender = data.Gender;
      const City = data.City;
      const State = data.State;
      const Country = data.Country;
      const District = data.District;
      const Pincode = data.Pincode;
      const Phone = data.Phone;
      const PlayerID = data.PlayerID;


      return admin.firestore().collection("Participants").add({
        userID: userID,
        Gender: Gender,
        PlayerID: PlayerID,
        Email: Email,
        Phone: Phone,
        City: City,
        State: State,
        Country: Country,
        District: District,
        Pincode: Pincode,
        ParticipantID: '',
      })
        .then(function (docRef) {

          var partID = docRef.id;

          return {

            ParticipantID: partID
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            ParticipantID: "0"
          };
        });


    })



exports.updateParticipants =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      const userID = data.userID;
      const Pincode = data.PinCode;
      const State = data.State;
      const City = data.City;
      const District = data.District;
      const Country = data.Country;
      const Gender = data.Gender;
      const Email = data.Email;
      const Phone = data.Phone;
      const UserName = data.UserName;
      const DOB = data.DOB;
      const ParticipantAddress = data.ParticipantAddress;
      const Size = data.Size;
      const Identity = data.Identity;
      const CompanyName = data.CompanyName;
      const HRContant = data.HRContant;
      const CompanyAddress = data.CompanyAddress;
      const CollageName = data.CollageName;
      const Grade = data.Grade;
      const SchoolAddress = data.SchoolAddress;
      var PlayerID = data.PlayerID;
      var ucdocID = "";
      var userCount = 0;
      admin.firestore().collection("UserCountSummary")
        .get().then(async (changes) => {
          changes.forEach(doc1 => {
            ucdocID = doc1.id;
            userCount = Number(doc1.data().UserCount);
          });
          userCount = userCount + 1;
          PlayerID = "TP" + userCount;
          admin.firestore().collection("Participants")
            .add({
              UserName: UserName,
              UserID: userID,
              Gender: Gender,
              Email: Email,
              Phone: Phone,
              PlayerID: PlayerID,
              City: City,
              State: State,
              Country: Country,
              District: District,
              Pincode: Pincode,
              ParticipantID: '',
              DateOfBirth: admin.firestore.Timestamp.fromDate(new Date(DOB)),
              ParticipantAddress: ParticipantAddress,
              Size: Size,
              Identity: Identity,
              CompanyName: CompanyName,
              HRContant: HRContant,
              CompanyAddress: CompanyAddress,
              CollageName: CollageName,
              Grade: Grade,
              SchoolAddress: SchoolAddress,

              UpdatedBy: context.auth.uid,
              UpdatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
            })
            .then(function (docRef) {

              var partID = docRef.id;
              if (ucdocID === '' || ucdocID === undefined || ucdocID === null) {
                admin.firestore().collection("UserCountSummary").add({
                  UserCount: 1,
                });
              }
              else {


                admin.firestore().collection("UserCountSummary")
                  .doc(ucdocID)
                  .set({
                    UserCount: userCount,
                  })
                  .then(async () => {

                  })
              }

              return {

                ParticipantID: partID
              };
            })
            .catch(function (error) {
              console.log("in error");
              return {
                ParticipantID: "0"
              };
            });
        });
    });

exports.getPlayerDetails =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      // if (!context.auth) {
      //   throw new functions.https.HttpError(
      //     "unauthenticatied",
      //     "only authenticated user can call this"
      //   );
      // }
      let resultList = [];

      const playerID = data.playerID;

      return await admin.firestore().collection("Participants")
        .doc(playerID)
        .get().then((doc1) => {
          if (doc1.exists) {
            let results = {};
            return {
              pID: doc1.id,
              PlayerID: doc1.data().PlayerID,
              City: doc1.data().City,
              Country: doc1.data().Country,
              DateOfBirth: doc1.data().DateOfBirth,
              District: doc1.data().District,
              Email: doc1.data().Email,
              Gender: doc1.data().Gender,
              ParticipantID: doc1.data().ParticipantID,
              Phone: doc1.data().Phone,
              Pincode: doc1.data().Pincode,
              State: doc1.data().State,
              UserName: doc1.data().UserName,

            }

          } else {
            console.log("no data");
            return {
              pID: "0",
              msg: "No Record"
            };
          }
        });
    });



exports.getPlayerDetailsWithPlayerID =
  functions
    .region('asia-south1')
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpError(
          "unauthenticatied",
          "only authenticated user can call this"
        );
      }
      let resultList = [];

      const playerID = data.PlayerID;
      return await admin.firestore().collection("Participants").where("PlayerID", "==", playerID).get().then((changes) => {
        changes.forEach(change => {
          resultList.push({
            userid: change.id,
            PlayerID: change.data().PlayerID,
            Address: change.data().Address,
            AlternatePhone: change.data().AlternatePhone,
            City: change.data().City,
            Country: change.data().Country,
            DateOfBirth: change.data().DateOfBirth,
            Email: change.data().Email,
            Gender: change.data().Gender,
            Phone: change.data().Phone,
            State: change.data().State,
            UserName: change.data().UserName,
          });
          console.log(resultList);
        });
        return resultList;
      });
    });
