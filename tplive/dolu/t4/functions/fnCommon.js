const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const transporter = nodemailer.createTransport({
  name: 'gmail.com',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "anitatripathi@gmail.com",
    pass: "TPLiVE@d2201",
  },
});
// Here we're using Gmail to send email using http request


exports.sendMail =
  functions
    .region('asia-south1')
    .https.onRequest((req, res) => {
      cors(req, res, () => {
        // getting dest email by query string
        const dest = req.query.dest;
        const mailOptions = {
          from: "anitatripathi@gmail.com",
          to: dest,
          subject: "Connect",
          html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
            <p>Atul Tripathi</p>`,
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
          if (erro) {
            return res.send(erro.toString());
          }
          return res.send("Sended");
        });
      });
    });

// Here we're using Gmail to send email using oncall function

exports.sendMailApi =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
      // cors(data, context, () => {
      // getting dest email by query string
      // const dest = req.query.dest;

      // const dest = "atulmani@gmail.com";
      const dest = data.emails;
      const sub = data.subject;
      console.log(dest);
      console.log(sub);
      const mailOptions = {
        from: "anitatripathi@gmail.com",
        to: dest,
        subject: sub,
        html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
              <br />
          <p>Atul Tripathi</p>`,
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
          return erro.toString();
        }
        return "Sended";
      });
    });



exports.addMasterSportName =
  functions
    .region('asia-south1')
    .https.onCall((data, context) => {
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
        .then(function (docRef) {
          return {
            SportID: docRef.id
          };
        })
        .catch(function (error) {
          console.log("in error");
          return {
            SportID: "0"
          };
        });

      console.log("before return");
    });


exports.getSportList =
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


exports.storePostData = functions
  .region('asia-south1')
  .https.onRequest(function (request, response) {
    cors(request, response, function () {
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
      busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
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
          function (err, uploadedFile) {
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
                .then(function () {
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
                .then(function (subscriptions) {
                  subscriptions.forEach(function (sub) {
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
                      .catch(function (err) {
                        console.log(err);
                      });
                  });
                  response
                    .status(201)
                    .json({ message: "Data stored", id: fields.id });
                })
                .catch(function (err) {
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
