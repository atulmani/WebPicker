import React, { useRef, useEffect, useState, useFocus } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../css/Login.css'
import { useUserAuth, useGetUserDetails } from '../context/UserAuthcontext';

import { Link, useLocation, useNavigate } from 'react-router-dom'

// import { auth, functions } from '../firebase'
import { httpsCallable } from "firebase/functions";
import { GetUserDetails } from './GetUserDetails.js'
import UserProfile from './UserProfile';

export default function PhoneSignUp(props) {
    const [url, setURL] = useState("/");

    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");
    const { setUpRecapcha, users } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setURL(props.url ? "/" + props.url : "/")
    }, []);
    //  this.props && this.props.url !== "" && setURL(this.props.url);
    const getOTP = async (e) => {
        e.preventDefault();
        setError("");
        if (phone === '' || phone === undefined || phone.length < 10) {
            return setError("Please enter valid Phone Number");
        }
        try {
            const respons = await setUpRecapcha(phone);
            // console.log(respons);
            setConfirmObj(respons);
            setFlag(true);
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
                console.log("user", user);
                // navigate("/");
                console.log(url);
                //if existing users then navigate to requested URL, otherwise go to profile page
                //get user profile
                await GetUserDetails(user.uid).then(() => {
                    if (flag) {
                        navigate(url);
                    } else {
                        navigate(UserProfile);
                    }

                });
                console.log(flag);
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
            <div className="logdiv">
                <h1>Hello Friend !</h1>
                <h4>Welcome To TPLiVE</h4><br />
                {console.log(users)}
                <div className="">
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {/* {!users && <Form onSubmit={getOTP} style={{ display: !flag ? "block" : "none" }}> */}
                    {true && <Form onSubmit={getOTP} style={{ display: !flag ? "block" : "none" }}>

                        <Form.Group className='mb-b' controlId='formBasicPhoneNumber'>
                            <PhoneInput defaultCountry='IN' value={phone} onChange={setPhone} placeholder="Enter Phone Number">

                            </PhoneInput>
                            <div id='recapcha-container'></div>
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            <Button varient='primary' type="submit">
                                Send OTP
                            </Button>
                            <br></br>
                            <Button varient='secondory' type="submit">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                    }
                    {/* {!users && <Form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}> */}
                    {true && <Form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}>

                        <Form.Group className='mb-b' controlId='formBasicOTP'>
                            <Form.Control type="text"
                                placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)}>

                            </Form.Control>
                            <div id='recapcha-container'></div>
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            {/* <Link to="/"> */}

                            <Button varient='primary' type="submit">
                                Login
                            </Button>
                            {/* </Link> */}
                            <br></br>
                            <Button varient='secondory' type="submit">
                                Cancel
                            </Button>
                        </div>
                    </Form>}
                    {users && 'user is already logged in'}
                </div>
            </div>
        </div>
    )
}
