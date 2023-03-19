import React, { useState } from 'react';
import '../../css/login/Login.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


export default function Login() {

    const [openOtp, setOpenOtp] = useState(true);

    function openOtpForm() {
        setOpenOtp(false);
    }
    // function openMobileForm() {

    // }


    return (
        <>

            <div className="full-login-card">
                <div className="login-card-outter">
                    <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="../img/logo_manu.png" className="login-above-logo" width="180px" alt="" />
                    </div><br /><br />
                    <div className="login-card">
                        <div className="signin-signup-form" style={{ transform: openOtp ? 'translate(0%)' : 'translate(-100%)' }}>

                            <h2 className="title">Sign in</h2>
                            <small>Please Enter Your Phone Number</small><br />

                            <PhoneInput
                                country={'in'}
                                keyboardType="phone-pad"
                                placeholder="Phone Number"
                                inputClass="phone-input"
                                inputStyle={{
                                    width: '100%',
                                    height: '51px',
                                    border: 'none',
                                    borderRadius: '51px',
                                    background: '#fff',
                                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                    fontSize: '0.9rem',
                                    color: '#444',
                                    paddingLeft: '60px'
                                }}
                                countryCodeEditable={false}
                                buttonClass="phone-input-btn"
                                buttonStyle={{
                                    // width: '50px',
                                    border: 'none',
                                    borderRadius: '51px',
                                    background: '#eee',
                                    // overflow: 'hidden',
                                }}
                                inputProps={{
                                    name: 'Phone Number',
                                    required: true,
                                }}
                            // onlyCountries={['in', 'us']}
                            // excludeCountries={['pk']}

                            >
                            </PhoneInput><br /><br />

                            <div className="">
                                <button style={{ outline: 'none' }} onClick={openOtpForm} className="mybutton button5">Next</button>
                            </div>

                            {/* <p className="social-text">Forgot password ?</p>
                            <p className="social-text" style={{ cursor: 'pointer' }} id="signUpBtn">New User ? Please <small>SignUp</small></p> */}

                        </div>

                        <div className="signin-signup-form" style={{ transform: openOtp ? 'translate(0%)' : 'translate(-100%)' }}>

                            <h2 className="title">OTP</h2>
                            <small>Please Enter OTP Sent On Your Given Phone Number</small>

                            <div className="input-field">
                                <span className="material-icons">
                                    lock
                                </span>
                                <input type="number" maxLength={6} onInput={
                                    (e) => {
                                        if (e.target.value.length > e.target.maxLength)
                                            e.target.value = e.target.value.slice(0, e.target.maxLength)
                                    }
                                } placeholder="OTP" name="" />
                            </div><br />

                            <div className="">
                                <a href="./profile.html" className="mybutton button5">Login</a>
                            </div>

                            {/* <p className="social-text" style={{ cursor: 'pointer' }} id="signInBtn">Already User ? Please <small>LogIn</small></p> */}

                        </div>
                    </div>
                </div>

                <div className="car-image">
                    <img src="../img/home-page-pic.png" width="100%" alt="" />
                </div>

            </div>


        </>
    )
}