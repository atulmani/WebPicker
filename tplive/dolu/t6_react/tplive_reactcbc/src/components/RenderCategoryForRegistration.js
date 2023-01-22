import { Button } from 'bootstrap';
import React from 'react'
import { useState } from 'react';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";


export default function RenderCategoryForRegistration(props) {
    console.log(props);
    const [partnerFlag, setPartnerFlag] = useState(false);
    const [categorySelectFlag, setCategorySelectFlag] = useState(props.registeredEventStatus ? true : false);
    const [partnerDetails, setPartnerDetails] = useState('');
    const [refDate, setRefDate] = useState(props.events.ReferenceDate);
    const [gender, setGender] = useState(props.playerGender);
    const [dateRefType, setDateRefType] = useState(props.events.DateRefType);
    const [partnerName, setPartnerName] = useState();
    const [showError, setShowError] = useState(true);
    const [registeredStatus, setRegisteredStatus] = useState(props.registeredEventStatus);

    function CheckPartnerCode() {
        console.log(refDate);
        var rDate = new Date(refDate._seconds * 1000);

        var userRole = {};
        var para1 = {};
        para1 = {
            PlayerID: partnerDetails
        };
        const ret1 = httpsCallable(functions, "getPlayerDetailsWithPlayerID");
        ret1(para1).then((result) => {
            console.log(result.data[0]);
            var flag = false;
            if (result.data[0] !== undefined) {

                userRole = {
                    userid: result.data[0].userid,
                    PlayerID: result.data[0].PlayerID,
                    Address: result.data[0].Address,
                    AlternatePhone: result.data[0].AlternatePhone,
                    City: result.data[0].City,
                    playerID: result.data[0].PlayerID,
                    Country: result.data[0].Country,
                    DateOfBirth: result.data[0].DateOfBirth,
                    Email: result.data[0].Email,
                    Gender: result.data[0].Gender,
                    Phone: result.data[0].Phone,
                    State: result.data[0].State,
                    UserName: result.data[0].UserName,
                }
                console.log(gender);
                var dob = new Date(userRole.DateOfBirth._seconds * 1000);
                console.log("gender : ", gender, " :: userRole.Gender : " + userRole.Gender);
                console.log("dateRefType : ", dateRefType);
                console.log("dob : ", dob, " :: rDate : " + rDate);

                if ((gender.toUpperCase() === 'MALE' && userRole.Gender.toUpperCase() === 'MALE') ||
                    (gender.toUpperCase() === 'FEMALE' && userRole.Gender.toUpperCase() === 'FEMALE') ||
                    (gender.toUpperCase() === 'MIXED' && userRole.Gender.toUpperCase() === 'FEMALE' && gender.toUpperCase() === 'MALE') ||
                    (gender.toUpperCase() === 'MIXED' && userRole.Gender.toUpperCase() === 'MALE' && gender.toUpperCase() === 'FEMALE')) {

                    if (dateRefType === 'Before' && dob <= rDate) {
                        flag = true;

                    } else if (dateRefType === 'After' && dob >= rDate) {
                        flag = true;
                    } else {
                        flag = false;
                    }

                } else {
                    flag = false;
                }
                if (flag === true) {
                    setPartnerName(userRole.UserName);
                    setShowError(false);
                }

            }
            console.log(flag);
            if (flag === false) {
                setShowError(false);
            }

            console.log(userRole);

        });
    }

    function registerCategory(e) {
        e.preventDefault();
        console.log('registerCategory');
        setCategorySelectFlag(!categorySelectFlag)
        openPartnerSelection(e);
        //if double
        // openPartnerSelection(gdDoublesDiv); 

        //if single
        // selectCategory(regCategoryGD17, regCategoryGD17Price);

    }
    function openPartnerSelection(e) {
        console.log(e);
        setPartnerFlag(!partnerFlag);
        // console.log(document.getElementById("gdDoublesDiv"));

        // if (doubleDiv.classList.contains('show')) {
        //     doubleDiv.classList.remove('show');
        //     doubleDiv.style.overflow = 'hidden';
        // } else {
        //     doubleDiv.classList.add('show');

        //     setTimeout(() => {
        //         doubleDiv.style.overflow = 'visible';
        //     }, 1000)
        // }
    }
    function closePartner(e) {
        closePartnerSelection();
        // selectCategory(regCategoryGD17, regCategoryGD17Price);"
    }
    function closePartnerSelection() {
        setPartnerFlag(false);
        // doubleDiv.classList.remove('show');
        // doubleDiv.style.overflow = 'hidden';
        // document.getElementById("errorDiv" + index).style.display = "none";
        // document.getElementById("partnerName" + index).innerHTML = "";
        // document.getElementById("hPartner" + index).style.display = "none";
        // document.getElementById("idpartner" + index).value = "";

    }
    return (
        <div key={props.events.CategoryName} className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0' }}>
            <div style={{ padding: '10px' }}>
                <div className={categorySelectFlag ? "reg-category-card active" : "reg-category-card"} id="regCategoryGS17">

                    <div className="display-flex-div"
                        onClick={registerCategory}>
                        <div className="category-details">
                            <h1>{props.events.CategoryName}</h1>
                            {props.events.Gender.toUpperCase() === 'FEMALE' && props.events.EventType.toUpperCase() === 'SINGLE' ? <div className="category-icons">
                                <span className="material-symbols-outlined female">
                                    woman
                                </span>
                            </div> :
                                props.events.Gender.toUpperCase() === 'FEMALE' && props.events.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                    <span className="material-symbols-outlined female">
                                        woman
                                    </span>
                                    <span className="material-symbols-outlined female">
                                        woman
                                    </span>
                                </div> :
                                    props.events.Gender.toUpperCase() === 'MIXED' && props.events.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                        <span className="material-symbols-outlined female">
                                            woman
                                        </span>
                                        <span className="material-symbols-outlined male">
                                            man
                                        </span>
                                    </div> :
                                        props.events.Gender.toUpperCase() === 'MALE' && props.events.EventType.toUpperCase() === 'SINGLE' ? <div className="category-icons">
                                            <span className="material-symbols-outlined male">
                                                man
                                            </span>
                                        </div> :
                                            props.events.Gender.toUpperCase() === 'MALE' && props.events.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                                <span className="material-symbols-outlined male">
                                                    man
                                                </span>
                                                <span className="material-symbols-outlined male">
                                                    man
                                                </span>
                                            </div> :
                                                props.events.Gender.toUpperCase() === 'FEMALE' && props.events.EventType.toUpperCase() === 'TEAM' ? <div className="category-icons">
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                </div> :
                                                    props.events.Gender.toUpperCase() === 'MALE' && props.events.EventType.toUpperCase() === 'TEAM' ? <div className="category-icons">
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                    </div> :
                                                        <div className="category-icons">
                                                            <span className="material-symbols-outlined female">
                                                                woman
                                                            </span>
                                                            <span className="material-symbols-outlined female">
                                                                woman
                                                            </span>
                                                            <span className="material-symbols-outlined male">
                                                                man
                                                            </span>
                                                            <span className="material-symbols-outlined male">
                                                                man
                                                            </span>
                                                        </div>
                            }
                        </div>

                        <div className="category-fees">
                            <h2><span>₹ </span> <span id="fees">{props.events.Fees}</span>
                            </h2>
                        </div>
                    </div>

                    {props.events.EventType.toUpperCase() === 'DOUBLE' &&
                        <div className={partnerFlag ? "category-doubles-partner-div show" : "category-doubles-partner-div"} id="gdDoublesDiv11">
                            <hr style={{ margin: '0' }} />
                            <div style={{ position: 'relative', padding: '0 10px' }}>
                                <div className="reg-participant-form-field">
                                    <input type="text" required onBlur={CheckPartnerCode} onChange={(e) => {
                                        setPartnerDetails(e.target.value);
                                    }} value={partnerDetails} />
                                    <span>Number Or Name</span>
                                </div>
                                {showError && <div className="partner-error-message">
                                    <h1>Given ID is not valid give another player ID</h1>
                                </div>}
                                <div className="cancel-partner"
                                    onClick={closePartner}>
                                    <button type="button" className="mybutton button5">Cancel</button>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="select-category-div">
                        <span className="material-symbols-outlined">
                            done
                        </span>
                    </div>

                </div>
            </div>
        </div >

    )
}
