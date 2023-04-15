import React, { useEffect, useState } from 'react'
import '../css/UserProfile.css'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate, Link } from 'react-router-dom';
import UserRole from './UserRole.js'

import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PartcipantList from './PartcipantList';

export default function UserProfile() {
    const { user } = useUserAuth();

    //     // const { users } = useUserAuth();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [firstFlag, setFirstFlag] = useState(true);
    const [secondFlag, setSecondFlag] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    // const [profileDetails, setProfileDetails] = useState({
    // });

    const [profileDetails, setProfileDetails] = useState({
        userName: '',
        gender: '',
        userEmail: '',
        pincode: '',
        city: '',
        state: '',
        district: '',
        dob: '',
        country: ''
    });

    const navigate = useNavigate();

    //     // useEffect(() => {
    //     //     console.log('useEffect [showError, pincode]')
    //     // }, [showError, pincode])
    //     useEffect(() => {
    //         // console.log('in useEffect ')
    //         setUserDetails(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {})
    //         // console.log(users);
    //         console.log(userDetails);
    //         console.log(users.current);
    //         if (!users.current) {
    //             setShowError(false);
    //             setUserName(userDetails ? userDetails.UserName : '');
    //             setUserEmail(userDetails ? userDetails.Email : '');
    //             setPincode(userDetails ? userDetails.Pincode : '');
    //             setGender(userDetails ? userDetails.Gender : '');
    //             setCity(userDetails ? userDetails.City : '');
    //             setState(userDetails ? userDetails.State : '');
    //             setCountry(userDetails ? userDetails.Country : '')
    //             let tempdob = '';
    //             tempdob = (userDetails && userDetails.DateOfBirth) ? new Date(userDetails.DateOfBirth._seconds * 1000) : new Date();
    //             setDob(tempdob);
    //         } else {
    //             navigate("/PhoneSignUp");
    //         }

    //     }, [])



    useEffect(() => {
        // console.log(user);
        if (user.isLoggedIn) {
            if (user.userInfo !== null) {
                // setUserDetails(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {})
                let tempdob = '';
                tempdob = (userDetails && userDetails.DateOfBirth) ? new Date(userDetails.DateOfBirth._seconds * 1000) : new Date();
                // console.log(userDetails);
                setProfileDetails({
                    userName: userDetails ? userDetails.UserName : '',
                    gender: userDetails ? userDetails.Gender : '',
                    userEmail: userDetails ? userDetails.Email : '',
                    pincode: userDetails ? userDetails.Pincode : '',
                    city: userDetails ? userDetails.City : '',
                    state: userDetails ? userDetails.State : '',
                    district: '',
                    dob: tempdob,
                    country: userDetails ? userDetails.Country : '',
                });
                // console.log(profileDetails);
            }
            else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
        else {
        }
    }, [user])

    function profileSetupSave(e) {
        e.preventDefault();
        setShowLoading(true);
        // console.log('in profileSetupSave');

        var para = {};
        para = {
            userID: userDetails.id,
            UserName: profileDetails.userName,
            Email: profileDetails.userEmail,
            Gender: profileDetails.gender,
            Pincode: profileDetails.pincode,
            State: profileDetails.state,
            City: profileDetails.city,
            District: profileDetails.district,
            Country: profileDetails.country,
            DateOfBirth: profileDetails.dob,
        };
        // console.log(para);
        const saveUserProfileDetails = httpsCallable(functions, "saveUserProfileDetails");

        saveUserProfileDetails(para).then(async (result) => {
            //navigate to RegisteredProfile
            navigate("/RegisteredProfile");

        });

    };
    return (
        <>
            {/* {console.log(profileDetails)} */}
            <div className="container"><br />
                <div style={{ padding: '10px' }}>
                    <div className="row no-gutters"
                        style={{ borderRadius: '10px', background: '#fff', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <br />
                            <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>PROFILE</h3>
                            <h1 className="reg-form-email" id="userContact">{user ? user.phoneNumber : ''}</h1>
                            <br /><br />
                            {/* <UserRoleRequest></UserRoleRequest> */}
                            <UserRole></UserRole>
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
                                                                            e.target.checked && setProfileDetails({
                                                                                userName: profileDetails.userName,
                                                                                gender: 'Male',
                                                                                userEmail: profileDetails.userEmail,
                                                                                pincode: profileDetails.pincode,
                                                                                city: profileDetails.city,
                                                                                state: profileDetails.state,
                                                                                district: profileDetails.district,
                                                                                dob: profileDetails.dob,
                                                                                country: profileDetails.country,
                                                                            })
                                                                        }}
                                                                        name="Gender" id="regParticipantMale" value="Male" checked={profileDetails && profileDetails.gender === 'Male' ? true : false} />
                                                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                                                        className="checkbox-label" id="regParticipantMaleLabel"
                                                                        htmlFor="regParticipantMale">
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
                                                                            e.target.checked && setProfileDetails({
                                                                                userName: profileDetails.userName,
                                                                                gender: 'Female',
                                                                                userEmail: profileDetails.userEmail,
                                                                                pincode: profileDetails.pincode,
                                                                                city: profileDetails.city,
                                                                                state: profileDetails.state,
                                                                                district: profileDetails.district,
                                                                                dob: profileDetails.dob,
                                                                                country: profileDetails.country,
                                                                            })
                                                                        }}

                                                                        name="Gender" id="regParticipantFemale" value="Female"
                                                                        checked={profileDetails && profileDetails.gender === 'Female' ? true : false} />
                                                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                                                        className="checkbox-label" id="regParticipantFemaleLabel"
                                                                        htmlFor="regParticipantFemale">
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
                                                            <div className="reg-participant-form-field profile-name-input" style={{ width: '100%' }}>
                                                                <input type="text" id="userName" required onChange={(e) => {
                                                                    setProfileDetails({
                                                                        userName: e.target.value,
                                                                        gender: profileDetails.gender,
                                                                        userEmail: profileDetails.userEmail,
                                                                        pincode: profileDetails.pincode,
                                                                        city: profileDetails.city,
                                                                        state: profileDetails.state,
                                                                        district: profileDetails.district,
                                                                        dob: profileDetails.dob,
                                                                        country: profileDetails.country,
                                                                    })

                                                                }} value={profileDetails.userName} />
                                                                <span>Name</span>
                                                            </div>

                                                            <div className="reg-participant-form-field profile-name-input" style={{ width: '100%' }}>
                                                                <input type="email" className="email-input-invalid" id="userEmail"
                                                                    required value={profileDetails.userEmail} onChange={(e) => {

                                                                        setProfileDetails({
                                                                            userName: profileDetails.userName,
                                                                            gender: profileDetails.gender,
                                                                            userEmail: e.target.value,
                                                                            pincode: profileDetails.pincode,
                                                                            city: profileDetails.city,
                                                                            state: profileDetails.state,
                                                                            district: profileDetails.district,
                                                                            dob: profileDetails.dob,
                                                                            country: profileDetails.country,
                                                                        })

                                                                    }} />
                                                                <span>Email</span>
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
                                                                style={{ paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem' }}>NEXT</span>
                                                            <span
                                                                style={{ position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                                className="material-symbols-outlined">
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
                                                                        <DatePicker selected={profileDetails.dob} onChange={(date) =>
                                                                            setProfileDetails({
                                                                                userName: profileDetails.userName,
                                                                                gender: profileDetails.gender,
                                                                                userEmail: profileDetails.userEmail,
                                                                                pincode: profileDetails.pincode,
                                                                                city: profileDetails.city,
                                                                                state: profileDetails.state,
                                                                                district: profileDetails.district,
                                                                                dob: date,
                                                                                country: profileDetails.country,
                                                                            })

                                                                        } />
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
                                                                        required value={profileDetails.pincode} onChange={(e) => {

                                                                            setProfileDetails({
                                                                                userName: profileDetails.userName,
                                                                                gender: profileDetails.gender,
                                                                                userEmail: profileDetails.userEmail,
                                                                                pincode: e.target.value,
                                                                                city: profileDetails.city,
                                                                                state: profileDetails.state,
                                                                                district: profileDetails.district,
                                                                                dob: profileDetails.dob,
                                                                                country: profileDetails.country,
                                                                            });

                                                                        }}
                                                                        onBlur={async (e) => {
                                                                            // console.log('onblur', pincode)
                                                                            if (profileDetails.pincode.length !== 6) {

                                                                                setShowError(true);
                                                                                // console.log('error', showError)
                                                                            } else {
                                                                                await $.getJSON("https://api.postalpincode.in/pincode/" + profileDetails.pincode,
                                                                                    async function (data) {
                                                                                        // console.log(data);
                                                                                        // console.log(data[0].Message);
                                                                                        if (data[0].Message === "No records found") {
                                                                                            setShowError(true);
                                                                                            setTimeout(function () {
                                                                                                setShowError(false);
                                                                                            }, 5000);

                                                                                        } else {
                                                                                            setProfileDetails({
                                                                                                userName: profileDetails.userName,
                                                                                                gender: profileDetails.gender,
                                                                                                userEmail: profileDetails.userEmail,
                                                                                                pincode: profileDetails.pincode,
                                                                                                city: data[0].PostOffice[0].Block,
                                                                                                state: data[0].PostOffice[0].State,
                                                                                                district: data[0].PostOffice[0].District,
                                                                                                dob: profileDetails.dob,
                                                                                                country: data[0].PostOffice[0].Country,
                                                                                            });

                                                                                        }
                                                                                    });
                                                                            }
                                                                        }} />
                                                                    <span className="pin-code-span">Pin Code</span>
                                                                    <h1 id="userLocation">{profileDetails.city}, {profileDetails.state}</h1>
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
                                                            <div style={{ display: !showLoading ? 'block' : 'none' }}>
                                                                <span
                                                                    style={{ paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem' }}>SAVE</span>
                                                                <span
                                                                    style={{ position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                                    className="material-symbols-outlined">
                                                                    arrow_right_alt
                                                                </span>
                                                            </div>
                                                            <div className='btn-loading' style={{ display: showLoading ? 'block' : 'none' }}>
                                                                <lottie-player id="btnSendOTPLoad"
                                                                    src="https://assets8.lottiefiles.com/packages/lf20_fiqoxpcg.json" background="transparent"
                                                                    speed="0.7" loop autoplay></lottie-player>
                                                            </div>
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
                                <lottie-player src="https://lottie.host/bee4b558-9f05-4217-b644-8b06fbbe2d7a/JYrTXksto7.json" background="transparent" speed="1" style={{ width: '100%', height: '300px' }} loop autoplay></lottie-player>
                                <h3>Set Your Profile</h3>
                            </div>

                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">

                            <div
                                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Link to="/RegisteredEvent"> Registered Event</Link> */}
                                <PartcipantList></PartcipantList>
                            </div>

                        </div>
                    </div>


                </div>
            </div><br />

        </>
    )
}
