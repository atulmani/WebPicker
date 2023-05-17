import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import $ from "jquery";
import '../css/EventRegistration.css'
import DatePicker from "react-datepicker";
import '../css/MydatePicker.css'
import "react-datepicker/dist/react-datepicker.css";
import { useLocalStorage } from "../context/useLocalStorage";
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

export default function NewMember(props) {
    // console.log(props);
    const { users, user } = useUserAuth();
    const [userDetails, setUserDetails] = useLocalStorage('userProfile', null);
    const [showError, setShowError] = useState(false);
    const [playerDetailsCopy, setPlayerDetailsCopy] = useState({
        pID: '',
        City: '',
        CollageName: '',
        CompanyName: '',
        CompanyAddress: '',
        Country: '',
        DateOfBirth: new Date(),
        District: '',
        Email: userDetails.Email,
        Gender: '',
        Grade: 'Male',
        HRContact: '',
        ParticipantID: '',
        ParticipantAddress: '',
        Phone: userDetails.Phone,
        Pincode: '',
        SchoolAddress: '',
        Size: '',
        State: '',
        UserName: '',
        Identity: '',
        UserID: user && user.userInfo ? user.userInfo.uid : '',
        MemberIDType: '',
        MemberIDNumber: '',
        PlayerID: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchData() {
        var para1 = {};

        // console.log('in load event', props.selectedPlayer);
        setLoading(true);
        para1 = {
            playerID: props.selectedPlayer,
        };
        let participant = {};
        // let userParticipant = [];
        const ret1 = httpsCallable(functions, "getPlayerDetailsWithCode");
        ret1(para1).then(async (result) => {
            // console.log('after return from getPlayerDetailsWithCode', result);

            result.data.forEach(async element => {

                var dob = new Date(element.DateOfBirth._seconds * 1000),

                    participant = {
                        pID: element.pID,
                        City: element.City,
                        CollageName: element.CallageName,
                        CompanyName: element.CompanyName,
                        CompanyAddress: element.CompanyAddress,
                        Country: element.Country,
                        DateOfBirth: dob,
                        District: element.District,
                        Email: element.Email,
                        Gender: element.Gender,
                        Grade: element.Grade,
                        HRContact: element.HRContact,
                        ParticipantID: element.ParticipantID,
                        ParticipantAddress: element.ParticipantAddress,
                        Phone: element.Phone,
                        Pincode: element.Pincode,
                        SchoolAddress: element.SchoolAddress,
                        Size: element.Size,
                        Identity: element.Identity,
                        State: element.State,
                        UserName: element.UserName,
                        UserID: element.UserID,
                        MemberIDType: element.MemberIDType,
                        MemberIDNumber: element.MemberIDNumber,
                        PlayerID: element.PlayerID,
                    };
                setPlayerDetailsCopy(participant);
                setLoading(false);
            });

        });
    }


    useEffect(() => {
        // console.log(user);
        if (user.isLoggedIn) {
            if (user.userInfo) {
                if (props.selectedPlayer !== '') {
                    // console.log('option 1 ', props.selectedPlayer);
                    userDetails && props.selectedPlayer && props.selectedPlayer !== '' && fetchData();

                } else {
                    // console.log('option 2 ', props.selectedPlayer);
                    setPlayerDetailsCopy({
                        pID: '',
                        City: '',
                        CollageName: '',
                        CompanyName: '',
                        CompanyAddress: '',
                        Country: '',
                        DateOfBirth: new Date(),
                        District: '',
                        Email: userDetails.Email,
                        Gender: '',
                        Grade: 'Male',
                        HRContact: '',
                        Identity: '',
                        ParticipantID: '',
                        ParticipantAddress: '',
                        Phone: userDetails.Phone,
                        Pincode: '',
                        SchoolAddress: '',
                        Size: '',
                        State: '',
                        UserName: '',
                        UserID: user && user.userInfo ? user.userInfo.uid : '',
                        MemberIDType: '',
                        MemberIDNumber: '',
                        PlayerID: '',
                    });
                }

            }
        }
        else {
            navigate("/PhoneSignUp", { state: { url: 'RegisteredProfile' } });
        }


    }, [props.selectedPlayer])

    function regGoBack() {
        props.addNewMember(false, props.selectedPlayer);
    }
    async function regSaveDetails(e) {

        var para = {};
        para = {
            UserID: userDetails.id,
            pID: playerDetailsCopy.pID,
            City: playerDetailsCopy.City,
            CollageName: playerDetailsCopy.CollageName,
            CompanyName: playerDetailsCopy.CompanyName,
            CompanyAddress: playerDetailsCopy.CompanyAddress,
            Country: playerDetailsCopy.Country,
            DateOfBirth: playerDetailsCopy.DateOfBirth,
            District: playerDetailsCopy.District,
            Email: playerDetailsCopy.Email,
            Gender: playerDetailsCopy.Gender,
            Grade: playerDetailsCopy.Grade,
            Identity: playerDetailsCopy.Identity,
            HRContact: playerDetailsCopy.HRContact,
            ParticipantID: playerDetailsCopy.ParticipantID,
            ParticipantAddress: playerDetailsCopy.ParticipantAddress,
            Phone: playerDetailsCopy.Phone,
            Pincode: playerDetailsCopy.Pincode,
            SchoolAddress: playerDetailsCopy.SchoolAddress,
            Size: playerDetailsCopy.Size,
            State: playerDetailsCopy.State,
            UserName: playerDetailsCopy.UserName,
            MemberIDType: playerDetailsCopy.MemberIDType,
            MemberIDNumber: playerDetailsCopy.MemberIDNumber,
            PlayerID: playerDetailsCopy.PlayerID,
        };
        // console.log(para);
        setLoading(true);
        const ret = await httpsCallable(functions, "updateParticipants");
        ret(para).then(async (result) => {
            props.addNewMember(false, playerDetailsCopy.PlayerID);
            setLoading(false);
            // console.log("From Function " + result.data);
        });

    }
    function onChangeValueMale(checked) {
        checked && setPlayerDetailsCopy({
            ...playerDetailsCopy,
            Gender: 'Male'
        });
        !checked && setPlayerDetailsCopy({
            ...playerDetailsCopy,
            Gender: 'Female'
        });
    }

    function onChangeValueFemale(checked) {

        checked && setPlayerDetailsCopy({
            ...playerDetailsCopy,
            Gender: 'Female'
        });
        !checked && setPlayerDetailsCopy({
            ...playerDetailsCopy,
            Gender: 'Male'
        });
    }

    function selectSize(e) {
        setPlayerDetailsCopy({
            ...playerDetailsCopy,
            Size: e.target.value
        });

    }
    function selectID(e) {
        setPlayerDetailsCopy({
            ...playerDetailsCopy,
            IdentityType: e.target.value
        });
    }
    function selectGrade(e) {
        setPlayerDetailsCopy({
            ...playerDetailsCopy,
            Grade: e.target.value
        });
    }
    return (
        <>
            <br />
            <div className="row no-gutters">
                <br></br>
                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div style={{ position: 'relative', paddingTop: '15px' }}>
                        <div className="row no-gutters">

                            <div className="col-6" >
                                <input type="radio" checked={playerDetailsCopy.Gender === 'Male' ? true : false} onChange={(e) => {
                                    e.target.checked && onChangeValueMale(e.target.checked);
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
                                <input type="radio" checked={playerDetailsCopy.Gender === 'Female' ? true : false} onChange={(e) => {
                                    e.target.checked && onChangeValueFemale(e.target.checked);
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

                    <br />
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" id="tbUserName" required onChange={(e) => {
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                UserName: e.target.value
                            });

                        }} value={playerDetailsCopy.UserName} />
                        <span>Name</span>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="event-detail-input-div"
                        style={{ position: 'relative', padding: '15px 5px' }}>

                        {/* <div className='date-picker-input'></div> */}
                        <DatePicker selected={playerDetailsCopy.DateOfBirth} onChange={(date) => {
                            // console.log(date)
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                DateOfBirth: new Date(date)
                            })
                        }} />

                        <span className="already-active"
                            style={{ zIndex: '6', position: 'absolute', top: '5px', left: '12px', padding: '0 8px' }}>Date Of Birth</span>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field"
                        style={{ width: '100%' }}>
                        <input type="number" id="pinCode" maxLength={6}
                            onInput={(e) => {
                                if (e.target.value.length > e.target.maxLength)
                                    e.target.value = e.target.value.slice(0, e.target.maxLength)
                            }}

                            value={playerDetailsCopy.Pincode}
                            onChange={(e) => {

                                setPlayerDetailsCopy({
                                    ...playerDetailsCopy,
                                    Pincode: e.target.value
                                })


                            }}
                            onBlur={async (e) => {
                                // console.log('onblur', pincode)
                                if (playerDetailsCopy.Pincode.length !== 6) {

                                    setShowError(true);
                                } else {
                                    setShowError(false);
                                    await $.getJSON("https://api.postalpincode.in/pincode/" + playerDetailsCopy.Pincode,
                                        async function (data) {
                                            if (data[0].Message === "No records found") {
                                                setShowError(true);
                                                setTimeout(function () {
                                                    setShowError(false);
                                                }, 5000);

                                            } else {

                                                setPlayerDetailsCopy({
                                                    ...playerDetailsCopy,
                                                    Pincode: playerDetailsCopy.Pincode,
                                                    District: data[0].PostOffice[0].District,
                                                    City: data[0].PostOffice[0].Block,
                                                    State: data[0].PostOffice[0].State,
                                                    Country: data[0].PostOffice[0].Country
                                                })

                                            }
                                        });
                                }
                            }}
                            required />
                        <span className="pin-code-span">Pin Code</span>
                        <h1 id="userLocation" style={{ display: !showError ? 'block' : 'none' }}>{playerDetailsCopy.City} {playerDetailsCopy.City !== '' && playerDetailsCopy.City !== undefined ? ',' : ''} {playerDetailsCopy.State}</h1>
                        <h1 id="errorMessage" style={{ display: showError ? 'block' : 'none' }}>Please enter Valid Pincode</h1>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" id="tbParticipantAddress" onChange={(e) => {
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                ParticipantAddress: e.target.value
                            })



                        }} required value={playerDetailsCopy.ParticipantAddress} />
                        <span>Participnt Address</span>
                    </div>

                </div>



                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" required onChange={(e) => {

                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                City: e.target.value
                            })

                        }} value={playerDetailsCopy.City} />
                        <span id="idNumber">City</span>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <select name="" id="selSize" value={playerDetailsCopy.MemberIDType} onChange={selectID}>
                            <option value="StateID">State player ID</option>
                            <option value="NationalID">National Player ID</option>
                            <option value="OnternationID">international Player ID</option>
                            <option value="Other">Other</option>
                        </select>
                        <span className="already-active">Player ID Type</span>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" required onChange={(e) => {
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                MemberIDNumber: e.target.value
                            })

                        }} value={playerDetailsCopy.MemberIDNumber} />
                        <span id="idNumber">Player ID (State ID/ BAI ID/ BWF ID) </span>
                        {/* <!-- Change this according to the event dynamically --> */}
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" required onChange={(e) => {
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                Identity: e.target.value
                            })

                        }}
                            value={playerDetailsCopy.Identity} />
                        <span id="idNumber">Adhar Card Number</span>
                        {/* <!-- Change this according to the event dynamically --> */}
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" id="tbCompanyName" required onChange={(e) => {
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                CompanyName: e.target.value
                            })
                        }}
                            value={playerDetailsCopy.CompanyName} />
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

                                setPlayerDetailsCopy({
                                    ...playerDetailsCopy,
                                    HRContact: e.target.value
                                })

                            }}
                            required
                            value={playerDetailsCopy.HRContact} />
                        <span>HR Contact</span>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" id="tbCompanyAddress" onChange={(e) => {
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                CompanyAddress: e.target.value
                            })


                        }} required
                            value={playerDetailsCopy.CompanyAddress} />
                        <span>Company Address</span>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <input type="text" id="tbCollageName" onChange={(e) => {
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                SchoolName: e.target.value
                            })
                        }} required
                            value={playerDetailsCopy.SchoolName} />
                        <span>School / Collage Name</span>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <select name="" value={playerDetailsCopy.Grade} onChange={selectGrade} id="selGrade">
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
                            setPlayerDetailsCopy({
                                ...playerDetailsCopy,
                                SchoolAddress: e.target.value
                            })
                        }} required
                            value={playerDetailsCopy.SchoolAddress} />
                        <span>School Address</span>
                    </div>

                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="reg-participant-form-field">
                        <select name="" value={playerDetailsCopy.Size} id="selSize" onChange={selectSize}>
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


            </div>

            <div className="row no-gutters">

                <div className="col-lg-12 col-md-12 col-sm-12"><br />

                    <div className="ref-participant-save-div">

                        <button className="mybutton button5" onClick={regGoBack}>
                            <span
                                style={{ transform: 'rotate(180deg)', position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                className="material-symbols-outlined">
                                arrow_right_alt
                            </span>
                            <span
                                style={{ position: 'relative', top: '-1px', paddingRight: '8px', fontSize: '1rem' }}>BACK</span>
                        </button>

                        <button className="mybutton button5" onClick={regSaveDetails}>
                            <div style={{ display: !loading ? 'block' : 'none' }}>
                                <span
                                    style={{ paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem' }}>SAVE</span>
                                <span
                                    style={{ position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                    className="material-symbols-outlined">
                                    arrow_right_alt
                                </span>
                            </div>
                            <div className='btn-loading' style={{ display: loading ? 'block' : 'none' }}>
                                <lottie-player id="btnSendOTPLoad"
                                    src="https://assets8.lottiefiles.com/packages/lf20_fiqoxpcg.json" background="transparent"
                                    speed="0.7" loop autoplay></lottie-player>
                            </div>
                        </button>

                    </div><br />
                    <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} /><br />

                </div>

            </div>


        </>
    )
}
