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
import NewMember from './NewMember';


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
    const [addNewFlag, setAddNewFlag] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const navigate = useNavigate();

    async function fetchData() {
        setShowLoading(true);

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
    useEffect(() => {
        if (user.isLoggedIn) {
            if (user.userInfo) {
                setUserEmail(userDetails ? userDetails.Email : '');
            }
            userDetails && fetchData();
        }
        else {
            navigate("/PhoneSignUp", { state: { url: 'RegisteredProfile' } });
        }
    }, [user])
    function regProfileToFirstSlide(e) {
        e.preventDefault();
        setFlag('first');
        setShowUserBasicDetails(false);

    }
    function regProfileToSecondSlide(e) {
        // e.preventDefault();
        // setShowUserBasicDetails(true);
        setAddNewFlag(true);
        setFlag('second');

    }
    function regProfileToThirdSlide(e) {
        e.preventDefault();
        setFlag('third');
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


    function addNewMember(flag, playercode) {
        console.log('in Refistere file : addNewMember', flag);
        setAddNewFlag(flag, playercode);
        fetchData();
        // if (flag === false && participantList && participantList[0] && participantList[0].PlayerID !== '') {
        //     setSelectedPlayer(participantList[0].PlayerID);
        //     getRegisteredEvents(participantList && participantList[0] && participantList[0].PlayerID);
        // }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row no-gutters">

                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <br />

                        {addNewFlag && <div id="regProfileNewParticipantDetails">
                            <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>NEW PARTICIPANT</h3>
                            <h1 className="reg-form-email" id="userEmail">{userDetails ? userDetails.Email : ''}</h1>
                            <h2 className="reg-form-email" id="userContact">{users && users.current ? users.current.phoneNumber : ''}</h2>
                            <h5 className="reg-form-email male" id="userGender">{userDetails ? userDetails.Gender : ''}</h5>
                            <h6 className="reg-form-email" id="userLocation">{userDetails ? userDetails.City : ''}, {userDetails ? userDetails.State : ''}</h6>
                            <NewMember selectedPlayer={selectedPlayer} addNewMember={addNewMember}></NewMember>
                            {/* <input type="hidden" id="hfUserID" value={userDetails ? userDetails.id : ''} />
                            <input type="hidden" id="hfPlayerID" value={userDetails ? userDetails.id : ''} />
                            <input type="hidden" id="hfEmail" value={userDetails ? userDetails.Email : ''} />
                            <input type="hidden" id="hfPhone" value={users && users.current ? users.current.phoneNumber : ''} />
                            <input type="hidden" id="hfParticipantID" value={userDetails ? userDetails.id : ''} /> */}

                            <br /><br />
                            {/* <div className="reg-form-dots">
                                <div id="firstFormDot" className={flag === 'second' ? 'active' : ''}></div>
                                <div id="SecondFormDot" className={flag === 'third' ? 'active' : ''}></div>
                            </div><br /> */}
                        </div>}

                        <div className="reg-participant-outter">
                            <div className="reg-participant-inner">
                                {/* <div className="reg-participant-divs" id="regProfileFirstSlide" style={{ transform: ((flag === 'first') ? 'translateX(-0%)' : ((flag === 'second') ? 'translateX(-100%)' : ((flag === 'third') ? 'translateX(-200%)' : ''))) }} > */}
                                {!addNewFlag && <div className="reg-participant-divs" id="regProfileFirstSlide"  >

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
                                            return <UserProfileCard key={participant.id} participantDetails={participant} calledFrom="RegisteredProfile"></UserProfileCard>
                                        })}

                                    </div><br />
                                    <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} />

                                </div>}

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
