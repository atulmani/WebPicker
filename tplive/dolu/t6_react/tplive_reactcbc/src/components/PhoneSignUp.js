
import React, { useRef, useEffect, useState, useFocus } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import '../css/Login.css'
import { useUserAuth, useGetUserDetails } from '../context/UserAuthcontext';

import { Link, useLocation, useNavigate } from 'react-router-dom'

// import { auth, functions } from '../firebase'
import { httpsCallable } from "firebase/functions";
import { GetUserDetails } from './GetUserDetails.js'
// import UserProfile from './UserProfile';

export default function PhoneSignUp(props) {

    const [url, setURL] = useState("/");
    const [isLogged, setIsLogged] = useState(false);
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");
    const { setUpRecapcha, users } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(users);
        console.log(users.current);
        setURL(props.url ? "/" + props.url : "/")
    }, []);
    //  this.props && this.props.url !== "" && setURL(this.props.url);
    const getOTP = async (e) => {
        e.preventDefault();
        setError("");
        console.log(phone);
        if (phone === '' || phone === undefined || phone.length < 10) {
            return setError("Please enter valid Phone Number");
        }
        console.log(users.current);

        if (users.current && users.current.phoneNumber === ("+" + phone)) {
            setIsLogged(true);
        }
        console.log(users.current);
        try {
            console.log(users.current);
            console.log(phone);
            const respons = await setUpRecapcha('+' + phone);
            // console.log(respons);
            setConfirmObj(respons);
            console.log(respons);
            // setFlag(true);
        } catch (error) {
            setError(error.message);
        }
    }

    const verifyOTP = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === undefined || otp === null) return;
        try {
            await confirmObj.confirm(otp).then(async (result) => {
                const user = result.user;
                // console.log("user", user);
                // navigate("/");
                // console.log(url);
                //if existing users then navigate to requested URL, otherwise go to profile page
                //get user profile
                await GetUserDetails(user.uid).then(() => {
                    console.log('user.uid : ', user.uid);
                    if (flag) {
                        navigate(url);
                    } else {
                        navigate('/UserProfile');
                    }

                });
                // console.log(flag);
                // console.log(userDetails);
                // navigate("/" + url);
            });
            // console.log("otp does not match");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <div className="logdiv" style={{ background: '#eee', borderRadius: '10px', boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)' }}>
                <div className='row no-gutters'>

                    <div className='col-lg-6 col-md-6 col-sm-12'>

                        <h1>Hello Friend !</h1>
                        <h4>Welcome To TPLiVE</h4><br />
                        {/* {console.log(users)} */}
                        <div className="">
                            {error && <Alert variant='danger'>{error}</Alert>}
                            {/* {!users && <Form onSubmit={getOTP} style={{ display: !flag ? "block" : "none" }}> */}
                            {<Form onSubmit={getOTP} style={{ display: !flag ? "block" : "none" }}>

                                <div className='mb-b' controlId='formBasicPhoneNumber'>
                                    {/* <PhoneInput defaultCountry='IN'
                                        defaultCode="IN"
                                        value={phone}
                                        allowZeroAfterCountryCode={false}
                                        limitMaxLength={10}
                                        onChange={setPhone}
                                        keyboardType="phone-pad"
                                        placeholder="Enter Phone Number"
                                        inputStyle={{
                                            font: "red"
                                        }}
                                    >
                                    </PhoneInput> */}

                                    <PhoneInput
                                        country={'in'}

                                        // onlyCountries={['in', 'us']}
                                        value={phone}
                                        onChange={setPhone}
                                        keyboardType="phone-pad"
                                        // countryCallingCodeEditable={false}
                                        countryCodeEditable={false}
                                        // disableCountryCode={true}
                                        placeholder="Enter Phone Number"
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                            autoFocus: true
                                        }}
                                    >
                                    </PhoneInput>

                                    <br />
                                    <div id='recapcha-container'></div>
                                </div>
                                <div className='d-grid gap-2'>
                                    <br />
                                    <Button className='mybutton button5' style={{ width: '150px', height: '40px' }} type="submit">
                                        Send OTP
                                    </Button>
                                    <br></br>
                                    {/* <Button varient='secondory' type="submit">
                                        Cancel
                                    </Button> */}
                                </div>
                            </Form>
                            }
                            {/* {!users && <Form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}> */}
                            {<Form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}>

                                <div className='txt_field'>
                                    <input type="text" required onChange={(e) => setOtp(e.target.value)}>

                                    </input>
                                    <label htmlFor="">Enter OTP</label>
                                    <div id='recapcha-container'></div>
                                </div>
                                <div className='d-grid gap-2'>
                                    {/* <Link to="/"> */}

                                    <Button className='mybutton button5' style={{ width: '150px', height: '40px' }} type="submit">
                                        Login
                                    </Button>
                                    {/* </Link> */}
                                    <br></br>
                                    {/* <Button varient='secondory' type="submit">
                                        Cancel
                                    </Button> */}
                                </div>
                            </Form>}
                            {/* {console.log(users.current)} */}
                            {isLogged && users && users.current && 'user is already logged in'}
                        </div>

                    </div>

                    <div className='col-lg-6 col-md-6 col-sm-12'>

                        <center style={{ padding: '0 20px' }}>
                            <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_rztnd89t.json" background="transparent"
                                speed="1" style={{ width: '100%', height: '500px' }} loop autoplay></lottie-player>
                        </center>

                    </div>

                </div>


            </div>
            <br /><br /><br />
        </div>
    )
}
