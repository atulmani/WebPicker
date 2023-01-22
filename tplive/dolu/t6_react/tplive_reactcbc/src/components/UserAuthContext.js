import { RecaptchaVerifier } from "firebase/auth";
import { auth } from '../firebase.js'

function setUpRecapcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
        "recapcha-container",
        {},
        auth
    );
    recaptchaVerifier.render();
}