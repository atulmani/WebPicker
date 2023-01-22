import React, { useEffect, useState } from 'react'
import '../css/UserProfile.css'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";

import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserProfile() {
    const { users } = useUserAuth();
    const [userDetails, setUserDetails] = useState();
    const [firstFlag, setFirstFlag] = useState(true);
    const [secondFlag, setSecondFlag] = useState(false);
    const [userName, setUserName] = useState();
    const [gender, setGender] = useState();
    const [userEmail, setUserEmail] = useState();
    const [pincode, setPincode] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [district, setDistrict] = useState();
    const [dob, setDob] = useState();
    const [country, setCountry] = useState();
    const [showError, setShowError] = useState(false);



    // useEffect(() => {
    //     console.log('useEffect [showError, pincode]')
    // }, [showError, pincode])
    useEffect(() => {
        console.log('in useEffect ')
        setUserDetails(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {})
        console.log(users);
        console.log(userDetails);
        setShowError(false);
        setUserName(userDetails ? userDetails.UserName : '');
        setUserEmail(userDetails ? userDetails.Email : '');
        setPincode(userDetails ? userDetails.Pincode : '');
        setGender(userDetails ? userDetails.Gender : '');
        setCity(userDetails ? userDetails.City : '');
        setState(userDetails ? userDetails.State : '');
        setCountry(userDetails ? userDetails.Country : '')
        let tempdob = '';
        tempdob = (userDetails && userDetails.DateOfBirth) ? new Date(userDetails.DateOfBirth._seconds * 1000) : new Date();
        setDob(tempdob);
    }, [])

    function profileSetupSave(e) {
        e.preventDefault();
        // console.log('in profileSetupSave');

        var para = {};
        para = {
            userID: userDetails.id,
            UserName: userName,
            Email: userEmail,
            Gender: gender,
            Pincode: pincode,
            State: state,
            City: city,
            District: district,
            Country: country,
            DateOfBirth: dob,
        };
        // console.log(para);
        const saveUserProfileDetails = httpsCallable(functions, "saveUserProfileDetails");

        saveUserProfileDetails(para).then(async (result) => {
            //navigate to RegisteredProfile
        });

    };
    return (
        <>

            <div className="container"><br />
                <div style={{ padding: '10px' }}>
                    <div className="row no-gutters"
                        style={{ borderRadius: '10px', background: '#fff', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <br />
                            <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>SIGN UP</h3>
                            <h1 className="reg-form-email" id="userContact">{users && users.current ? users.current.phoneNumber : ''}</h1>
                            <br /><br />

                            <div className="reg-form-dots">
                                <div id="profileSetupfirstFormDot" className={firstFlag ? 'active' : ''}></div>
                                <div id="profileSetupSecondFormDot" className={secondFlag ? 'active' : ''}></div>
                            </div><br />

                            <div className="profile-setup-outter-div">
                                <div className="profile-setup-inner-div">
                                    {
                                        // firstFlag &&
                                        <div className="profile-setup-form" id="profileSetupFirstForm" style={{ transform: firstFlag ? 'translateX(0%)' : 'translateX(-100%)' }}
                                        >

                                            <div className="row no-gutters">

                                                <div className="col-lg-12 col-md-12 col-sm-12">

                                                    <div className="reg-first-form-gender-section">
                                                        <div className="gender-section-inside-div"
                                                            style={{
                                                                position: 'relative', padding: '15px 5px'
                                                            }}>
                                                            < div className="row no-gutters" >

                                                                <div className="col-6">
                                                                    <input type="radio" className="checkbox" style={{ width: '0px' }}
                                                                        onChange={(e) => {
                                                                            e.checked && setGender('Male');
                                                                        }}
                                                                        name="Gender" id="regParticipantMale" value="Male" checked={userDetails && userDetails.Gender === 'Male' ? true : false} />
                                                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                                                        className="checkbox-label" id="regParticipantMaleLabel"
                                                                        for="regParticipantMale">
                                                                        <i className="fas fa-plus"
                                                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                                                        <i className="fas fa-check"
                                                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                                                        <span>Male</span>
                                                                    </label>
                                                                </div>

                                                                <div className="col-6">
                                                                    <input type="radio" className="checkbox" style={{ width: '0px' }}
                                                                        onChange={(e) => {
                                                                            e.checked && setGender('Female');
                                                                        }}

                                                                        name="Gender" id="regParticipantFemale" value="Female" checked={userDetails && userDetails.Gender === 'Female' ? true : false} />
                                                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                                                        className="checkbox-label" id="regParticipantFemaleLabel"
                                                                        for="regParticipantFemale">
                                                                        <i className="fas fa-plus"
                                                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                                                        <i className="fas fa-check"
                                                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                                                        <span>Female</span>
                                                                    </label>
                                                                </div>

                                                                <span className="already-active"
                                                                    style={{ position: 'absolute', left: '12px', top: '-5px', background: 'none' }}>Gender
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12">

                                                    <div className="reg-first-form-gender-section">
                                                        <div className="city-section-inside-div profile-setup-name-email-div">
                                                            <div className="reg-participant-form-field" style={{ width: '100%' }}>
                                                                <div className="reg-participant-form-field">
                                                                    <input type="text" id="userName" required onChange={(e) => {
                                                                        setUserName(e.target.value);
                                                                    }} value={userName} />
                                                                    <span>Name</span>
                                                                </div>
                                                            </div>

                                                            <div className="reg-participant-form-field" style={{ width: '100%' }}>
                                                                <div className="reg-participant-form-field">
                                                                    <input type="email" className="email-input-invalid" id="userEmail"
                                                                        required value={userEmail} onChange={(e) => {
                                                                            setUserEmail(e.target.value);
                                                                        }} />
                                                                    <span>Email</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="row no-gutters">

                                                <div className="col-lg-12 col-md-12 col-sm-12"><br /><br />

                                                    <div className="ref-participant-save-div">

                                                        <button className="mybutton button5" onClick={() => {
                                                            setFirstFlag(false);
                                                            setSecondFlag(true);

                                                        }}>
                                                            <span
                                                                style={{
                                                                    paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem'
                                                                }}>NEXT</span>
                                                            <span
                                                                style={{
                                                                    paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem'
                                                                }}
                                                                className="material-symbols-outlined" >
                                                                arrow_right_alt
                                                            </span>
                                                        </button>

                                                    </div><br /><br />

                                                </div>

                                            </div>

                                        </div>

                                    }
                                    {
                                        // secondFlag &&

                                        <div className="profile-setup-form" id="profileSetupSecondForm" style={{ transform: firstFlag ? 'translateX(0%)' : 'translateX(-100%)' }}>

                                            <div className="row no-gutters">

                                                <div className="col-lg-12 col-md-12 col-sm-12">

                                                    <div className="reg-first-form-gender-section">
                                                        <div className="city-section-inside-div profile-setup-name-email-div">
                                                            <div className="" style={{ width: '100%', padding: '5px' }}>
                                                                <div className="event-detail-input-div"
                                                                    style={{ position: 'relative', padding: '15px 5px' }}>
                                                                    <div className="input-group ">
                                                                        <DatePicker selected={dob} onChange={(date) => setDob(date)} />
                                                                        {/* <input id="dob" type="text" placeholder="DOB"
                                                                            className="form-control reg-participant-date-picker"
                                                                            readonly />
                                                                        <div className="input-group-addon input-group-prepend">
                                                                            <span
                                                                                className="input-group-text reg-participant-date-picker-icon"><i
                                                                                    className="fas fa-calendar"
                                                                                    style={{ fontSize: '0.9em', color: '#666' }}></i>
                                                                            </span>
                                                                        </div> */}
                                                                    </div>
                                                                    <span className="already-active"
                                                                        style={{ position: 'absolute', top: '5px', left: '12px', padding: '0 8px' }}>Date
                                                                        Of
                                                                        Birth</span>
                                                                </div>
                                                            </div>

                                                            <div className="reg-participant-form-field" style={{ width: '100%' }}>
                                                                <div className="reg-participant-form-field">
                                                                    <input type="number" id="pinCode" maxLength={6}
                                                                        required value={pincode} onChange={(e) => {
                                                                            setPincode(e.target.value);
                                                                        }}
                                                                        onBlur={async (e) => {
                                                                            console.log('onblur', pincode)
                                                                            if (pincode.length !== 6) {

                                                                                setShowError(true);
                                                                                console.log('error', showError)
                                                                            } else {
                                                                                await $.getJSON("https://api.postalpincode.in/pincode/" + pincode,
                                                                                    async function (data) {
                                                                                        console.log(data);
                                                                                        console.log(data[0].Message);
                                                                                        if (data[0].Message === "No records found") {
                                                                                            setShowError(true);
                                                                                            setTimeout(function () {
                                                                                                setShowError(false);
                                                                                            }, 5000);

                                                                                        } else {
                                                                                            setDistrict(data[0].PostOffice[0].District);
                                                                                            setCity(data[0].PostOffice[0].Block);
                                                                                            setState(data[0].PostOffice[0].State);
                                                                                            setCountry(data[0].PostOffice[0].Country);

                                                                                        }
                                                                                    });
                                                                            }
                                                                        }} />
                                                                    <span className="pin-code-span">Pin Code</span>
                                                                    <h1 id="userLocation">{city}, {state}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                {showError && <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <span id="errorMessage" >Please enter Valid Pincode</span>


                                                </div>}

                                                <div className="col-lg-4 col-md-6 col-sm-12">

                                                </div>

                                            </div>

                                            <div className="row no-gutters">

                                                <div className="col-lg-12 col-md-12 col-sm-12"><br /><br />

                                                    <div className="ref-participant-save-div">

                                                        <button className="mybutton button5" onClick={() => {
                                                            setFirstFlag(true);
                                                            setSecondFlag(false);

                                                        }}>
                                                            <span
                                                                style={{ transform: 'rotate(180deg)', position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                                className="material-symbols-outlined">
                                                                arrow_right_alt
                                                            </span>
                                                            <span
                                                                style={{ position: 'relative', top: '-1px', paddingRight: '8px', fontSize: '1rem' }}>BACK</span>
                                                        </button>
                                                        <button className="mybutton button5" onClick={profileSetupSave}>
                                                            <span
                                                                style={{ paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem' }}>NEXT</span>
                                                            <span
                                                                style={{ position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                                className="material-symbols-outlined">
                                                                arrow_right_alt
                                                            </span>
                                                        </button>

                                                    </div><br />

                                                </div>

                                            </div>

                                        </div>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12">

                            <div
                                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_dehufm3f.json"
                                    background="transparent" speed="1" style={{ width: '300px', height: '300px' }} loop autoplay>
                                </lottie-player>
                                <h3>TPLiVE Welcomes You!</h3>
                                <h6> <b>You Play, We Manage</b> </h6>
                            </div>

                        </div>

                    </div>
                </div>
            </div><br />

        </>
    )
}
