// const functions = require("firebase-functions");


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  const msg = request.query.msg;
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase! " + msg);
});


/**
* Here we're using Gmail to send
*/
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "mywebpicker@gmail.com",
//     pass: "Admin@123#",
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "connect@HyperCloudAdvertising.com",
    pass: "dvroztfzdnfjyjob",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;
    const mailOptions = {
      from: "connect@HyperCloudAdvertising.com",
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


exports.sendMailapi = functions.https.onCall((data, context) => {
  // cors(data, context, () => {
  // getting dest email by query string
  // const dest = req.query.dest;

  // const dest = "atulmani@gmail.com";
  const dest = data.emails;
  const sub = data.subject;
  console.log(dest);
  console.log(sub);
  const mailOptions = {
    from: "connect@HyperCloudAdvertising.com",
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
