import React, { useRef, useEffect, useState, useFocus } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import '../css/Login.css'
import { Form, Button, Alert } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthcontext';
import GoogleButton from 'react-google-button';
import PhoneSignUp from './PhoneSignUp'
import { Link } from 'react-router-dom'

export default function Login() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            navigate("/")
        } catch (err) {
            setError(err.message);
        }
    }
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await googleSignIn();
            navigate("/")
        } catch (err) {
            setError(err.message);
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
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className='mb-b' controlId='formBasicEmail'>
                                        <Form.Control type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}></Form.Control>

                                    </Form.Group>
                                    <Form.Group className='mb-b' controlId='formBasicPassword'>
                                        <Form.Control type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}></Form.Control>

                                    </Form.Group>
                                    <div className='d-grid gap-2'>
                                        <Button varient='primary' type="submit">
                                            Log In
                                        </Button>
                                    </div>
                                </Form>
                                <br></br>
                                <div>
                                    <GoogleButton className='g-btn' type='dark' onClick={handleGoogleLogin}></GoogleButton>
                                </div><br>
                                </br>
                                <Link to="/PhoneSignUp">

                                    <div className='d-grid gap-2'>
                                        <Button varient='success' type="submit">
                                            Signin with Phone
                                        </Button>
                                    </div>
                                </Link>
                                {/* <div className="formabove">
                                    <div className="form">

                                        <div id="firstslide" className="formslide">
                                            <form onSubmit={getOtp}>
                                                <div className="mb-3" controlID="formBAsicPhoneNumber">
                                                    <PhoneInput
                                                        defaultCountry='IN'
                                                        value={number}
                                                        onChange={setNumber}
                                                        placeholder="Enter Phone Number">

                                                    </PhoneInput>
                                                </div>
                                                <div id="recapcha-container"></div>
                                                <button className="mybutton nextBtn" type="submit" id="btnSendOTP" name="login">
                                                    Send OTP </button>
                                                <button className="mybutton nextBtn" type="submit" id="btnSigninUsingOTP" >
                                                    < span id="btnSigninUsingOTPSpan">Login</span>
                                                    <lottie-player id="btnSigninUsingOTPLoad" style={{ display: 'none' }}
                                                        src="https://assets8.lottiefiles.com/packages/lf20_fiqoxpcg.json" background="transparent"
                                                        speed="0.7" loop autoplay></lottie-player>
                                                </button>

                                            </form>

                                        </div>


                                    </div>


                                </div> */}
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
        // </div >
    )
}
