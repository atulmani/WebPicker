const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.addMasterSportName =
  functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }

    const SportName = data.SportName;
    const SportCode = data.SportCode;

    return admin.firestore().collection("MasterSportName")
      .add({
        SportCode: SportCode,
        SportName: SportName,
        CreatedBy: context.auth.uid,
        CreatedTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
      })
      .then(function(docRef) {
        return {
          SportID: docRef.id
        };
      })
      .catch(function(error) {
        console.log("in error");
        return {
          SportID: "0"
        };
      });

    console.log("before return");
  });


exports.getSportList =
  functions.https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpError(
        "unauthenticatied",
        "only authenticated user can call this"
      );
    }
    let resultList = [];

    // var dbrows = await admin.firestore().collection("PartnerList").get();
    // dbrows.then((changes) => {
    return await admin.firestore().collection("MasterSportName").orderBy("SportName").get().then((changes) => {
      changes.forEach(doc1 => {
        resultList.push({
          Docid: doc1.id,
          SportName: doc1.data().SportName,
          SportCode: doc1.data().SportCode,
        });
        console.log(resultList);
      });
      return resultList;
    });
  });


  exports.storePostData = functions.https.onRequest(function(request, response) {
    cors(request, response, function() {
      var uuid = UUID();

      const busboy = new Busboy({ headers: request.headers });
      // These objects will store the values (file + fields) extracted from busboy
      let upload;
      const fields = {};

      // This callback will be invoked for each file uploaded
      busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        console.log(
          `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
        );
        const filepath = path.join(os.tmpdir(), filename);
        upload = { file: filepath, type: mimetype };
        file.pipe(fs.createWriteStream(filepath));

      });

      // This will invoked on every field detected
      busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        fields[fieldname] = val;
      });
      // This callback will be invoked after all uploaded files are saved.
      busboy.on("finish", () => {
        var bucket = gcs.bucket("tplive-uat-f9355.appspot.com");
        bucket.upload(
          upload.file,
          {
            uploadType: "media",
            metadata: {
              metadata: {
                contentType: upload.type,
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          function(err, uploadedFile) {
            if (!err) {
              admin
                .database()
                .ref("posts")
                .push({
                  title: fields.title,
                  location: fields.location,
                  rawLocation: {
                    lat: fields.rawLocationLat,
                    lng: fields.rawLocationLng
                  },
                  image:
                    "https://firebasestorage.googleapis.com/v0/b/" +
                    bucket.name +
                    "/o/" +
                    encodeURIComponent(uploadedFile.name) +
                    "?alt=media&token=" +
                    uuid
                })
                .then(function() {
                  webpush.setVapidDetails(
                    "mailto:support@tplive.com",
                    "BKapuZ3XLgt9UZhuEkodCrtnfBo9Smo-w1YXCIH8YidjHOFAU6XHpEnXefbuYslZY9vtlEnOAmU7Mc-kWh4gfmE",
                    "AyVHwGh16Kfxrh5AU69E81nVWIKcUwR6a9f1X4zXT_s"
                  );
                  return admin
                    .database()
                    .ref("subscriptions")
                    .once("value");
                })
                .then(function(subscriptions) {
                  subscriptions.forEach(function(sub) {
                    var pushConfig = {
                      endpoint: sub.val().endpoint,
                      keys: {
                        auth: sub.val().keys.auth,
                        p256dh: sub.val().keys.p256dh
                      }
                    };

                    webpush
                      .sendNotification(
                        pushConfig,
                        JSON.stringify({
                          title: "New Post",
                          content: "New Post added!",
                          openUrl: "/help"
                        })
                      )
                      .catch(function(err) {
                        console.log(err);
                      });
                  });
                  response
                    .status(201)
                    .json({ message: "Data stored", id: fields.id });
                })
                .catch(function(err) {
                  response.status(500).json({ error: err });
                });
            } else {
              console.log(err);
            }
          }
        );
      });

      // The raw bytes of the upload will be in request.rawBody.  Send it to busboy, and get
      // a callback when it's finished.
      busboy.end(request.rawBody);
      // formData.parse(request, function(err, fields, files) {
      //   fs.rename(files.file.path, "/tmp/" + files.file.name);
      //   var bucket = gcs.bucket("YOUR_PROJECT_ID.appspot.com");
      // });
    });
  });
