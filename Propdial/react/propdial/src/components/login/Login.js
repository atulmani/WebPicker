import React, { useState, useEffect } from 'react';
import '../../css/login/Login.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useUserAuth, useGetUserDetails } from '../../context/UserAuthcontext';
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function Login() {

    const [openOtp, setOpenOtp] = useState(true);

    // function openOtpForm() {
    //     setOpenOtp(false);
    // }
    // function openMobileForm() {

    // }

    const [url, setURL] = useState("/");
    const [isLogged, setIsLogged] = useState(false);
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [flag, setFlag] = useState(false);
    const [hideNextBtn, setHideNextBtn] = useState(true);
    const [confirmObj, setConfirmObj] = useState("");
    const { setUpRecapcha, users } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(users);
        // console.log(users.current);
        if (users.current) {
            navigate('/Profile');
        }
        // setURL(props.url ? "/" + props.url : "/")
    }, []);
    //  this.props && this.props.url !== "" && setURL(this.props.url);
    const openOtpForm = async (e) => {
        e.preventDefault();
        setError("");
        // console.log(phone);
        if (phone === '' || phone === undefined || phone.length < 10) {
            return setError("Please enter valid Phone Number");
        }
        // console.log(users.current);

        if (users.current && users.current.phoneNumber === ("+" + phone)) {
            setIsLogged(true);
        }

        try {
            setHideNextBtn(false);
            const respons = await setUpRecapcha('+' + phone);
            // console.log(respons);
            setConfirmObj(respons);
            setFlag(true);
            setOpenOtp(false);

        } catch (error) {
            setError(error.message);
        }
    }

    const verifyOTP = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === undefined || otp === null) return;
        try {
            // console.log(otp);

            await confirmObj.confirm(otp).then(async (result) => {
                const user = result.user;
                // console.log("user", user);
                navigate("/Profile");
                // console.log(url);
                //if existing users then navigate to requested URL, otherwise go to profile page
                //get user profile
                // await GetUserDetails(user.uid).then(() => {
                //     console.log('user.uid : ', user.uid);
                //     if (flag) {
                //         navigate(url);
                //     } else {
                //         navigate('/UserProfile');
                //     }

                // });
                // console.log(flag);
                // console.log(userDetails);
                // navigate("/" + url);
            });
            // console.log("otp does not match");
        } catch (error) {
            setOtp('');
            setError(error.message);
        }
    }

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
                            <small>Login using your mobile no</small><br />

                            <PhoneInput
                                country={'in'}
                                value={phone}
                                onChange={setPhone}

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
                            </PhoneInput>
                            {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
                            <br />
                            <div id='recapcha-container'></div>
                            <br />
                            {hideNextBtn && <div className="">
                                <button style={{ outline: 'none' }} onClick={openOtpForm} className="mybutton button5">Next</button>
                            </div>}

                            {/* <p className="social-text">Forgot password ?</p>
                            <p className="social-text" style={{ cursor: 'pointer' }} id="signUpBtn">New User ? Please <small>SignUp</small></p> */}

                        </div>

                        <div className="signin-signup-form" style={{ transform: openOtp ? 'translate(0%)' : 'translate(-100%)' }}>

                            <h2 className="title">OTP</h2>
                            <small>Enter 6 digit OTP received at your mobile</small>
                            {/* <div id='recapcha-container'></div> */}

                            <div className="input-field">
                                <span className="material-icons">
                                    lock
                                </span>
                                <input type="number" className="otp-input" maxLength={6} onInput={
                                    (e) => {
                                        if (e.target.value.length > e.target.maxLength) {
                                            // e.target.value = e.target.value.slice(0, e.target.maxLength);
                                            verifyOTP(e)
                                        }
                                    }
                                }
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="------" name="" />
                            </div>
                            {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
                            <br />

                            <div className="">
                                <button className="mybutton button5" onClick={verifyOTP} >Login</button>
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