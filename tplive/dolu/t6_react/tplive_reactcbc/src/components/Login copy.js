import React, { useRef, useEffect, useState, useFocus } from 'react'
import { auth, setPersistence } from '../firebase.js'
//signInWithPhoneNumber
import '../css/Login.css'

export default function Login() {
    const otpLetter1 = useRef();
    const otpLetter2 = useRef();
    const otpLetter3 = useRef();
    const otpLetter4 = useRef();
    const otpLetter5 = useRef();
    const otpLetter6 = useRef();

    const refsendOTP = useRef(null);
    const userPhoneNo = useRef(null);
    const [flagBtnSendOTPSpan, setFlagBtnSendOTPSpan] = useState(true);
    const [flagBtnSendOTPLoad, setFlagBtnSendOTPLoad] = useState(true);
    const [altspan, setAltspan] = useState("Click this btn");
    const [altspanDisplay, setAltspanDisplay] = useState(false);
    const UseFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }
    // const otpLetter1 = useRef(null)

    // const [otpLetter1, setOtpLetter1] = useState();
    // const [otpLetter2, setOtpLetter2] = useState();
    // const [otpLetter3, setOtpLetter3] = useState();
    // const [otpLetter4, setOtpLetter4] = useState();
    // const [otpLetter5, setOtpLetter5] = useState();
    // const [otpLetter6, setOtpLetter6] = useState();

    //   const [otpLetter1, setOtpLetter1Focus] = UseFocus();
    // const [otpLetter2, setOtpLetter2Focus] = UseFocus();
    // const [otpLetter3, setOtpLetter3Focus] = UseFocus();
    // const [otpLetter4, setOtpLetter4Focus] = UseFocus();
    // const [otpLetter5, setOtpLetter5Focus] = UseFocus();
    // const [otpLetter6, setOtpLetter6Focus] = UseFocus();

    useEffect(() => {
        //one event start
        const handleuserPhoneNoBtnClick = event => {
            event.preventDefault();

            console.log('Button clicked, handleuserPhoneNoBtnClick', userPhoneNo.current.value);
            var phNumber = userPhoneNo.current.value;
            if (phNumber.length < 10) {
                // setFlagSendOTPDisplaySpan
                setAltspan("Please enter valid phone number");
                setAltspanDisplay(true);
                setFlagBtnSendOTPSpan(true);
                setFlagBtnSendOTPLoad(false);


            } else {

            }

        };

        // const userPhoneNoBtn = refsendOTP.current;
        // userPhoneNoBtn.addEventListener('click', handleuserPhoneNoBtnClick);
        //one event end
        return () => {
            //     element.removeEventListener('click', handleClick);
        };
    }, []);
    function onChangeOTP() {

    }
    function btnSendOTPClicked(event) {
        event.preventDefault();

        console.log('Button clicked, btnSendOTPClicked', userPhoneNo.current.value);
        var phNumber = userPhoneNo.current.value;
        if (phNumber.length < 10) {
            // setFlagSendOTPDisplaySpan
            setAltspan("Please enter valid phone number");
            setAltspanDisplay(true);
            setFlagBtnSendOTPSpan(true);
            setFlagBtnSendOTPLoad(false);


        } else {
            phNumber = '+91' + phNumber;
            setPersistence(auth.Auth.Persistence.SESSION)
                .then(() => {
                    auth.signInWithPhoneNumber(phNumber, window.recaptchaVerifier)
                        .then(function (confirmationResult) {
                            window.confirmationResult = confirmationResult;
                            coderesult = confirmationResult;
                            console.log('coderesult: ' + coderesult);
                            console.log('confirmationResult.verificationId ' + confirmationResult.verificationId);
                            console.log('Message sent');
                            document.getElementById('firstslide').style.transform = 'translateX(-100%)';
                            document.getElementById('secondslide').style.transform = 'translateX(-100%)';
                            document.getElementById('btnSendOTPSpan').style.display = 'block';
                            document.getElementById('btnSendOTPLoad').style.display = 'none';
                        })
                        .catch(function (error) {
                            console.log('Error Sending OTP: ' + error.message);
                            document.getElementById('altspan').innerHTML = error.message;
                            document.getElementById('altspan').style.display = 'block';
                            document.getElementById('btnSendOTPSpan').style.display = 'block';
                            document.getElementById('btnSendOTPLoad').style.display = 'none';
                        })
                });


        }

    }

    return (
        <div className="bigdiv">

            <div className="whitediv">
                <div className="row no-gutters">

                    <div className=" col-lg-6 order-sm-12">

                        <div className="logdiv">
                            <h1>Hello Friend !</h1>
                            <h4>Welcome To TPLiVE</h4><br />
                            <div className="">

                                <div className="formabove">
                                    <div className="form">
                                        <div id="firstslide" className="formslide">
                                            <div className="txt_field">
                                                <h1>+91</h1>
                                                <input style={{ paddingLeft: '30px', type: "number", maxlength: "10" }}
                                                    required={true}
                                                    maxLength={10}
                                                    ref={userPhoneNo}
                                                    id="userPhoneNo" />
                                                <span></span>
                                                <label className="login-phone-label">Phone No.</label>
                                            </div>

                                            <div
                                                style={{ transform: 'scale(0.77', WebkitTransform: 'scale(0.77)', transformOrigin: '0 0', WebkitTransformOrigin: '0 0', width: '100px' }}
                                                id='recaptcha-container'></div><br />

                                            <div className="" style={{ textAlign: 'center' }}>
                                                <button className="mybutton nextBtn" type="button" ref={refsendOTP} id="btnSendOTP" onClick={btnSendOTPClicked} name="submit">
                                                    {flagBtnSendOTPSpan && <span id="btnSendOTPSpan">Next</span>}
                                                    {flagBtnSendOTPLoad && <lottie-player id="btnSendOTPLoad" style={{ display: 'none' }}
                                                        src="https://assets8.lottiefiles.com/packages/lf20_fiqoxpcg.json" background="transparent"
                                                        speed="0.7" loop autoplay></lottie-player>}
                                                </button>
                                            </div>
                                            {altspanDisplay && <span id="altspan" ref={altspan} className="alertspan">{altspan}</span>}
                                        </div>

                                        <div id="secondslide" className="formslide">

                                            <div className="otp-div">
                                                <input type="number" ref={otpLetter1} id="otpLetter1" onChange={(e) => {
                                                    const val = e.target.value

                                                    if (val.length === 1) {
                                                        // setOtpLetter2Focus()
                                                    }
                                                    else if (val.length === 0) {
                                                        //   setOtpLetter1Focus()
                                                    }
                                                }} required={true} maxLength={1}
                                                    name="" value="9" />
                                                <input type="number" ref={otpLetter2} id="otpLetter2" onChange={(e) => {
                                                    const val = e.target.value

                                                    if (val.length === 1) {
                                                        // setOtpLetter3Focus()
                                                    }
                                                    else if (val.length === 0) {
                                                        //   setOtpLetter2Focus()
                                                    }
                                                }} required={true} maxLength={1}
                                                    name="" value="" />
                                                <input type="number" ref={otpLetter3} id="otpLetter3" onChange={(e) => {
                                                    const val = e.target.value

                                                    if (val.length === 1) {
                                                        // setOtpLetter4Focus()
                                                    }
                                                    else if (val.length === 0) {
                                                        //   setOtpLetter3Focus()
                                                    }
                                                }} required={true} maxLength={1}
                                                    name="" value="" />
                                                <input type="number" ref={otpLetter4} id="otpLetter4" onChange={(e) => {
                                                    const val = e.target.value

                                                    if (val.length === 1) {
                                                        // setOtpLetter5Focus()
                                                    }
                                                    else if (val.length === 0) {
                                                        //   setOtpLetter4Focus()
                                                    }
                                                }} required={true} maxLength={1}
                                                    name="" value="" />
                                                <input type="number" ref={otpLetter5} id="otpLetter5" onChange={(e) => {
                                                    const val = e.target.value

                                                    if (val.length === 1) {
                                                        // setOtpLetter6Focus()
                                                    }
                                                    else if (val.length === 0) {
                                                        //   setOtpLetter5Focus()
                                                    }
                                                }} required={true} maxLength={1}
                                                    name="" value="" />
                                                <input type="number" ref={otpLetter6} id="otpLetter6" onChange={(e) => {
                                                    const val = e.target.value

                                                    if (val.length === 1) {
                                                        // setOtpLetter6Focus()
                                                    }
                                                    else if (val.length === 0) {
                                                        //   setOtpLetter6Focus()
                                                    }
                                                }} required={true} maxLength={1}
                                                    name="" value="" />
                                            </div><br />

                                            <div className="txt_field" style={{ display: 'none' }}>
                                                <input type="text" id="txtVerificationCode" required={true} />
                                                <span></span>
                                                <label>OTP</label>
                                            </div>
                                            <div className="" style={{ textAlign: 'center' }}>
                                                <button className="mybutton nextBtn" type="button" id="btnSigninUsingOTP" name="login">
                                                    < span id="btnSigninUsingOTPSpan">Login</span>
                                                    <lottie-player id="btnSigninUsingOTPLoad" style={{ display: 'none' }}
                                                        src="https://assets8.lottiefiles.com/packages/lf20_fiqoxpcg.json" background="transparent"
                                                        speed="0.7" loop autoplay></lottie-player>
                                                </button>
                                                <span id="altspanotp" className="alertspan"></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                    <div className="col-lg-6 order-lg-1 ">

                        <center>
                            <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_rztnd89t.json" background="transparent"
                                speed="1" style={{ width: '100%', height: '500px' }} loop autoplay></lottie-player>
                        </center>
                    </div>


                </div>

            </div >
        </div >
    )
}
