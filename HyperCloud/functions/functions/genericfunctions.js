const functions = require("firebase-functions");
const nodemailer = require("nodemailer")



//To use nodemailer with smtp gmail service, we need to create an app password to use it here.
//It won't work with the personal email regular password using to access our gmail

// Here are the steps to generate an app - specific password from your Google account:

// Go to your Google account settings at https://myaccount.google.com/.
// Click on "Security" in the left - hand menu.
// Scroll down to the "Signing in to Google" section and click on "App passwords".
// If prompted, enter your Google account password to continue.
// Under "Select app", choose "Mail" from the dropdown list.
//     Under "Select device", choose "Other (Custom name)" and enter a name for the password(e.g. "Nodemailer").
// Click on "Generate".
// Google will generate an app - specific password for you.Copy this password and use it in your nodemailer configuration as the password for your Gmail account.

//---------------------------------------------------------------------------------------------------------

// If you are not seeing the "App passwords" option in the "Signing in to Google" section, it is possible that your account has two - factor authentication enabled.In this case, you may need to generate an app - specific password by following these steps:

// Go to your Google account settings at https://myaccount.google.com/.
// Click on "Security" in the left - hand menu.
// Scroll down to the "Signing in to Google" section and click on "2-Step Verification".
// If prompted, enter your Google account password to continue.
// Click on "Get Started".
// Follow the prompts to set up two - factor authentication for your account.
// Once you have set up two - factor authentication, go back to the "Security" section of your Google account settings.
// Click on "App passwords" and follow the steps to generate an app - specific password for your application.

// Here we're using Gmail to send email using http request
exports.sendAppEmail = functions.https.onCall(async (data, context) => {
    const from = data.from;
    const pwd = data.pwd;
    const toList = data.toList;
    const ccList = data.ccList;
    const bccList = data.bccList;
    const subjectText = data.subject;
    const bodyText = data.body;
    const attachFileName = data.attachFileName;
    const attachFilePath = data.attachFilePath;

    let mailOptions = null;
    if (attachFileName == '' || attachFileName == null || attachFilePath == '' || attachFilePath == null) {
        mailOptions = {
            from: from,
            to: toList,
            cc: ccList,
            bcc: bccList,
            subject: subjectText,
            html: bodyText
        };
    }
    else {
        mailOptions = {
            from: from,
            to: toList,
            cc: ccList,
            bcc: bccList,
            subject: subjectText,
            html: bodyText,
            attachments: [
                {
                    filename: attachFileName,
                    path: attachFilePath // replace with the path to your file
                }
            ]
        };
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // user: "atul@hyperclouddigital.com",
            // pass: "grygbudwtyovrleb",
            user: from,
            pass: pwd,
        },
    });

    try {
        await transporter.sendMail(mailOptions);
        // console.log(`Email sent to ${to}`);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }

})
