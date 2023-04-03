import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';
import UserProfileCard from './UserProfileCard';
import EDTournamentDetails from './EDTournamentDetails'
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import $ from "jquery";
import '../css/EventRegistration.css'
import DatePicker from "react-datepicker";
import '../css/MydatePicker.css'
import "react-datepicker/dist/react-datepicker.css";
import { useLocalStorage } from "../context/useLocalStorage";
import { useNavigate } from 'react-router-dom';


export default function RegisteredProfile() {
    const { users, user } = useUserAuth();
    const [userID, setUserID] = useState();
    const [eventID, setEventID] = useState(window.localStorage.getItem("EventID") ? window.localStorage.getItem("EventID") : null);
    const [eventDetails, setEventDetails] = useLocalStorage('EventDetails', null);
    const [userDetails, setUserDetails] = useLocalStorage('userProfile', null);
    const [userName, setUserName] = useState();
    const [gender, setGender] = useState('Male');
    const [userEmail, setUserEmail] = useState();

    const [location, setLocation] = useState({
        pincode: '',
        city: '',
        state: '',
        district: ''
    });
    // const [pincode, setPincode] = useState('');
    // const [city, setCity] = useState();
    // const [state, setState] = useState();
    // const [district, setDistrict] = useState();
    const [dob, setDob] = useState();
    const [country, setCountry] = useState();
    const [showError, setShowError] = useState(false);
    const [participantID, setParticipantID] = useState();
    const [participantList, setParticipantList] = useState();
    const [address, setAddress] = useState();
    const [size, setSize] = useState();
    const [identity, setIdentity] = useState();
    const [companyName, setCompanyName] = useState(true);
    const [hrContact, setHRContact] = useState(false);
    const [companyAddress, setCompanyAddress] = useState(false);
    const [collageName, setCollageName] = useState();
    const [flag, setFlag] = useState('first');
    const [grade, setGrade] = useState('I');
    const [schoolAddress, setSchoolAddress] = useState();
    const [showUserBasicDetails, setShowUserBasicDetails] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        setShowLoading(true);
        if (user.isLoggedIn) {
            if (user.userInfo) {
                setUserEmail(userDetails ? userDetails.Email : '');
                async function fetchData() {
                    var para1 = {};

                    para1 = {
                        userID: userDetails.id,
                    };
                    let participant = {};
                    let userParticipant = [];
                    const ret1 = httpsCallable(functions, "getRegisteredParticant");
                    ret1(para1).then(async (result) => {
                        result.data.forEach(async element => {
                            participant = {
                                id: element.id,
                                City: element.City,
                                Country: element.Country,
                                DateOfBirth: element.DateOfBirth,
                                District: element.District,
                                Email: element.Email,
                                Gender: element.Gender,
                                ParticipantID: element.ParticipantID,
                                Phone: element.Phone,
                                Pincode: element.Pincode,
                                State: element.State,
                                UserName: element.UserName,
                                UserID: element.UserID,
                                PlayerID: element.PlayerID,
                            };
                            userParticipant.push(participant);
                        });
                        setParticipantList(userParticipant);
                        setShowLoading(false);
                    });

                }
                userDetails && fetchData();
            }
            else {
                navigate("/PhoneSignUp", { state: { url: 'RegisteredProfile' } });
            }
        }
    }, [user])
    function regProfileToFirstSlide(e) {
        e.preventDefault();
        // console.log('in regProfileToFirstSlide');
        setFlag('first');
        setShowUserBasicDetails(false);
        // console.log('flag : ', flag);
        // console.log('2 transfer : ', (flag === 'second') ? 'translateX(-100%)' : ((flag === 'third') ? 'translateX(-200 %)' : ''));

    }
    function regProfileToSecondSlide(e) {
        e.preventDefault();
        // console.log('in regProfileToSecondSlide');
        setShowUserBasicDetails(true);
        // setThirdFlag(false);
        // setSecondFlag(true);
        // console.log('setThirdFlag', thirdFlag);
        // console.log('setSecondFlag', secondFlag);
        //setFlag('first');
        setFlag('second');
        // console.log('flag : ', flag);

        // console.log('2 transfer : ', (flag === 'second') ? 'translateX(-100%)' : ((flag === 'third') ? 'translateX(-200 %)' : ''));

    }
    function regProfileToThirdSlide(e) {
        e.preventDefault();
        // console.log('in regProfileToThirdSlide');
        // setSecondFlag(false);
        // setThirdFlag(true);
        setFlag('third');
        // console.log('flag : ', flag);
        // console.log('setSecondFlag', secondFlag);
        // console.log('3 transfer : ', (flag === 'second') ? 'translateX(-100%)' : ((flag === 'third') ? 'translateX(-200 %)' : ''));
    }
    function regSaveDetails(e) {
        e.preventDefault();
        //save details in firebase
        setFlag('first');

        var para = {};
        para = {
            userID: userDetails.id,
            PinCode: location.pincode,
            State: location.state,
            City: location.city,
            District: location.district,
            Country: location.country,
            Gender: gender,
            PlayerID: userDetails.id,
            Email: userEmail,
            Phone: users.current.phoneNumber,
            UserName: userName,
            DOB: dob,
            ParticipantAddress: address,
            Size: size,
            Identity: identity,
            CompanyName: companyName,
            HRContant: hrContact,
            CompanyAddress: companyAddress,
            CollageName: collageName,
            Grade: grade,
            SchoolAddress: schoolAddress,
        };
        // console.log(para);

        const ret = httpsCallable(functions, "updateParticipants");
        ret(para).then(result => {
            // console.log("From Function " + result.data);
        });



    }
    function onChangeValueMale(e) {
        e.preventDefault();
        // console.log(e);
        // e.target.checked ? setGender('Male') : setGender('Female');
        e.target.checked && setGender('Male');
        !e.target.checked && setGender('Female');
        // console.log('gender : ', gender);
    }

    function onChangeValueFemale(e) {
        e.preventDefault();
        // console.log(e);
        // e.target.checked ? setGender('Female') : setGender('Male');
        e.target.checked && setGender('Female');
        !e.target.checked && setGender('Male');
    }

    function selectSize(e) {
        e.preventDefault();
        setSize(e.target.value);
    }
    function selectGrade(e) {
        e.preventDefault();
        setGrade(e.target.value);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row no-gutters">

                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <br />

                        {showUserBasicDetails && <div id="regProfileNewParticipantDetails">
                            <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>NEW PARTICIPANT</h3>
                            <h1 className="reg-form-email" id="userEmail">{userDetails ? userDetails.Email : ''}</h1>
                            <h2 className="reg-form-email" id="userContact">{users && users.current ? users.current.phoneNumber : ''}</h2>
                            <h5 className="reg-form-email male" id="userGender">{userDetails ? userDetails.Gender : ''}</h5>
                            <h6 className="reg-form-email" id="userLocation">{userDetails ? userDetails.City : ''}, {userDetails ? userDetails.State : ''}</h6>

                            <input type="hidden" id="hfUserID" value={userDetails ? userDetails.id : ''} />
                            <input type="hidden" id="hfPlayerID" value={userDetails ? userDetails.id : ''} />
                            <input type="hidden" id="hfEmail" value={userDetails ? userDetails.Email : ''} />
                            <input type="hidden" id="hfPhone" value={users && users.current ? users.current.phoneNumber : ''} />
                            <input type="hidden" id="hfParticipantID" value={userDetails ? userDetails.id : ''} />

                            <br /><br />
                            <div className="reg-form-dots">
                                <div id="firstFormDot" className={flag === 'second' ? 'active' : ''}></div>
                                <div id="SecondFormDot" className={flag === 'third' ? 'active' : ''}></div>
                            </div><br />
                        </div>}

                        <div className="reg-participant-outter">
                            <div className="reg-participant-inner">
                                <div className="reg-participant-divs" id="regProfileFirstSlide" style={{ transform: ((flag === 'first') ? 'translateX(-0%)' : ((flag === 'second') ? 'translateX(-100%)' : ((flag === 'third') ? 'translateX(-200%)' : ''))) }} >

                                    <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>YOUR LIST</h3>

                                    <div className="row no-gutters" id="divParticipant">

                                        <div className="col-lg-4 col-md-6 col-sm-12" style={{
                                            padding: '0'
                                        }}>
                                            <div style={{ padding: '10px' }}>
                                                < div className="event-registration-participant-card add-paticipant-card"
                                                    onClick={regProfileToSecondSlide}>
                                                    <span className="material-symbols-outlined">
                                                        add
                                                    </span>
                                                    <h1>ADD NEW</h1>
                                                </div>
                                            </div>
                                        </div>

                                        {showLoading && <div className="col-lg-4 col-md-6 col-sm-12">
                                            <lottie-player src="https://lottie.host/35ed7cc5-900e-420b-95d1-cb90642020e7/UV7Rv7AbhO.json" background="transparent" speed="1" style={{ width: '100%', height: '100%' }} loop autoplay></lottie-player>
                                        </div>}

                                        {participantList && participantList.map((participant) => {
                                            return <UserProfileCard key={participant.id} participantDetails={participant} ></UserProfileCard>
                                        })}

                                    </div><br />
                                    <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} />

                                </div>

                                <div className="reg-participant-divs" id="regProfileSecondSlide" style={{ transform: ((flag === 'first') ? 'translateX(-0%)' : ((flag === 'second') ? 'translateX(-100%)' : ((flag === 'third') ? 'translateX(-200%)' : ''))) }}  >

                                    <div className="row no-gutters">

                                        <div className="col-lg-12 col-md-12 col-sm-12">

                                            <div className="reg-first-form-gender-section">
                                                <div className="gender-section-inside-div"
                                                    style={{ position: 'relative', padding: '15px 5px' }}>
                                                    <div className="row no-gutters">

                                                        <div className="col-6" >
                                                            <input type="radio" checked={gender === 'Male' ? true : false} onChange={(e) => {
                                                                e.target.checked && setGender(e.target.value);
                                                            }} className="checkbox" style={{ width: '0px' }}
                                                                name="EventStatus" id="regParticipantMale" value="Male" />
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
                                                            <input type="radio" checked={gender === 'Female' ? true : false} onChange={(e) => {
                                                                e.target.checked && setGender(e.target.value);
                                                            }} className="checkbox" style={{ width: '0px' }}
                                                                name="EventStatus" id="regParticipantFemale" value="Female" />
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
                                                <div className="city-section-inside-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <div className="reg-participant-form-field"
                                                        style={{ width: '30%' }}>
                                                        <input type="number" id="pinCode" maxLength={6}
                                                            onInput={(e) => {
                                                                if (e.target.value.length > e.target.maxLength)
                                                                    e.target.value = e.target.value.slice(0, e.target.maxLength)
                                                            }}

                                                            value={location.pincode}
                                                            onChange={(e) => {
                                                                // setPincode(e.target.value);
                                                                setLocation({
                                                                    pincode: e.target.value,
                                                                    district: '',
                                                                    city: '',
                                                                    state: '',
                                                                    country: ''
                                                                });

                                                            }}
                                                            onBlur={async (e) => {
                                                                // console.log('onblur', pincode)
                                                                if (location.pincode.length !== 6) {

                                                                    setShowError(true);
                                                                    // console.log('error', showError)
                                                                } else {
                                                                    setShowError(false);
                                                                    await $.getJSON("https://api.postalpincode.in/pincode/" + location.pincode,
                                                                        async function (data) {
                                                                            // console.log(data);
                                                                            // console.log(data[0].Message);
                                                                            if (data[0].Message === "No records found") {
                                                                                setShowError(true);
                                                                                setLocation({
                                                                                    pincode: location.pincode,
                                                                                    district: '',
                                                                                    city: '',
                                                                                    state: '',
                                                                                    country: ''
                                                                                });


                                                                                setTimeout(function () {
                                                                                    setShowError(false);
                                                                                }, 5000);

                                                                            } else {

                                                                                setLocation({
                                                                                    pincode: location.pincode,
                                                                                    district: data[0].PostOffice[0].District,
                                                                                    city: data[0].PostOffice[0].Block,
                                                                                    state: data[0].PostOffice[0].State,
                                                                                    country: data[0].PostOffice[0].Country
                                                                                });


                                                                            }
                                                                        });
                                                                }
                                                            }}
                                                            required />
                                                        <span className="pin-code-span">Pin Code</span>
                                                        <h1 id="userLocation" style={{ display: !showError ? 'block' : 'none' }}>{location.city} {location.city !== '' && location.city !== undefined ? ',' : ''} {location.state}</h1>
                                                        <h1 id="errorMessage" style={{ display: showError ? 'block' : 'none' }}>Please enter Valid Pincode</h1>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                    <div className="row no-gutters">

                                        <div className="col-lg-12 col-md-12 col-sm-12"><br /><br />

                                            <div className="ref-participant-save-div">

                                                <button className="mybutton button5" onClick={regProfileToFirstSlide}>
                                                    <span
                                                        style={{ transform: 'rotate(180deg)', position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                        className="material-symbols-outlined">
                                                        arrow_right_alt
                                                    </span>
                                                    <span
                                                        style={{ position: 'relative', top: '-1px', paddingRight: '8px', fontSize: '1rem' }}>BACK</span>
                                                </button>
                                                <button className="mybutton button5" disabled={true} onClick={regProfileToThirdSlide}>
                                                    <span
                                                        style={{ paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem' }}>NEXT</span>
                                                    <span
                                                        style={{ position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                        className="material-symbols-outlined">
                                                        arrow_right_alt
                                                    </span>
                                                </button>

                                            </div><br />
                                            <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} /><br />

                                        </div>

                                    </div>

                                </div>

                                <div className="reg-participant-divs" id="regProfileThirdSlide" style={{ transform: ((flag === 'first') ? 'translateX(-0%)' : ((flag === 'second') ? 'translateX(-100%)' : ((flag === 'third') ? 'translateX(-200%)' : ''))) }} >

                                    <div className="row no-gutters">

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="text" id="tbUserName" required onChange={(e) => {
                                                    setUserName(e.target.value);
                                                }} />
                                                <span>Name</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="event-detail-input-div"
                                                style={{ position: 'relative', padding: '15px 5px' }}>

                                                {/* <div className='date-picker-input'></div> */}
                                                <DatePicker selected={dob} onChange={(date) => setDob(date)} />

                                                {/* <div className="input-group date datetimepicker11">
                                                    <input id="dobParticipant" type="text"
                                                        placeholder="Registration Open Date"
                                                        className="form-control reg-participant-date-picker" readOnly />
                                                    <div className="input-group-addon input-group-prepend">
                                                        <span className="input-group-text reg-participant-date-picker-icon"><i
                                                            className="fas fa-calendar"
                                                            style={{ fontSize: '0.9em', color: '#666' }}></i></span>
                                                    </div>
                                                </div> */}
                                                <span className="already-active"
                                                    style={{ zIndex: '6', position: 'absolute', top: '5px', left: '12px', padding: '0 8px' }}>Date Of Birth</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="text" id="tbParticipantAddress" onChange={(e) => {
                                                    setAddress(e.target.value);
                                                }} required />
                                                <span>Participnt Address</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <select name="" id="selSize" onChange={selectSize}>
                                                    <option value="XS">XS</option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                    <option value="XXL">XXL</option>
                                                </select>
                                                <span className="already-active">T-Shirt / Jersey Size</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="text" id="tbIdentity" required onChange={(e) => {
                                                    setIdentity(e.target.value);
                                                }} />
                                                <span id="idNumber">Adhar Card Number</span>
                                                {/* <!-- Change this according to the event dynamically --> */}
                                            </div>

                                        </div>

                                    </div>
                                    <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} />

                                    <div className="row no-gutters" id="corporateForm">

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="text" id="tbCompanyName" required onChange={(e) => {
                                                    setCompanyName(e.target.value);
                                                }} />
                                                <span>Company Name</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="number" maxLength={10} id="tbHRContact"
                                                    onInput={(e) => {
                                                        if (e.target.value.length > e.target.maxLength)
                                                            e.target.value = e.target.value.slice(0, e.target.maxLength)
                                                    }}
                                                    onChange={(e) => {
                                                        setHRContact(e.target.value);
                                                    }}
                                                    required />
                                                <span>HR Contact</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="text" id="tbCompanyAddress" onChange={(e) => {
                                                    setCompanyAddress(e.target.value);
                                                }} required />
                                                <span>Company Address</span>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="row no-gutters" id="studentForm">

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="text" id="tbCollageName" onChange={(e) => {
                                                    setCollageName(e.target.value);
                                                }} required />
                                                <span>School / Collage Name</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <select name="" onChange={selectGrade} id="selGrade">
                                                    <option value="I">I</option>
                                                    <option value="II">II</option>
                                                    <option value="III">III</option>
                                                    <option value="IV">IV</option>
                                                    <option value="V">V</option>
                                                    <option value="VI">VI</option>
                                                    <option value="VII">VII</option>
                                                    <option value="VIII">VIII</option>
                                                    <option value="IX">IX</option>
                                                    <option value="X">X</option>
                                                    <option value="XI">XI</option>
                                                    <option value="XII">XII</option>
                                                    <option value="FIRST YEAR">FIRST YEAR</option>
                                                    <option value="SECOND YEAR">SECOND YEAR</option>
                                                    <option value="THIRD YEAR">THIRD YEAR</option>
                                                    <option value="FORTH YEAR">FORTH YEAR</option>
                                                    <option value="FINAL YEAR">FINAL YEAR</option>
                                                </select>
                                                <span className="already-active">Grade</span>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">

                                            <div className="reg-participant-form-field">
                                                <input type="text" id="tbSchoolAddress" onChange={(e) => {
                                                    setSchoolAddress(e.target.value);
                                                }} required />
                                                <span>School Address</span>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="row no-gutters">

                                        <div className="col-lg-12 col-md-12 col-sm-12"><br />

                                            <div className="ref-participant-save-div">

                                                <button className="mybutton button5" onClick={regProfileToSecondSlide}>
                                                    <span
                                                        style={{ transform: 'rotate(180deg)', position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                        className="material-symbols-outlined">
                                                        arrow_right_alt
                                                    </span>
                                                    <span
                                                        style={{ position: 'relative', top: '-1px', paddingRight: '8px', fontSize: '1rem' }}>BACK</span>
                                                </button>

                                                <button className="mybutton button5" onClick={regSaveDetails}>
                                                    <span
                                                        style={{ paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem' }}>SAVE</span>
                                                    <span
                                                        style={{ position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                                        className="material-symbols-outlined">
                                                        arrow_right_alt
                                                    </span>
                                                </button>

                                            </div><br />
                                            <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} /><br />

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={false} />}

                    <br />
                </div>
            </div>
            <br /><br /><br />

        </>
    )
}
