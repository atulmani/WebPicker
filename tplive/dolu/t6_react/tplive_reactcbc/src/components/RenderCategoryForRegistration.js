import { Button } from 'bootstrap';
import React from 'react'
import { useState, useEffect } from 'react';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";


export default function RenderCategoryForRegistration(props) {
    //console.log(props);

    const [partnerFlag, setPartnerFlag] = useState(false);
    const [categorySelectFlag, setCategorySelectFlag] = useState(props.registeredEventStatus ? true : false);
    const [registeredEvent, setRegisteredEvent] = useState(props.registeredEventStatus);
    const [partnerDetails, setPartnerDetails] = useState(props.registeredEventStatus ? props.registeredEventStatus.PartnerPlayerID : "");
    const [refDate, setRefDate] = useState(props.events.ReferenceDate);
    const [playerGender, setPlayerGender] = useState(props.playerGender);
    const [dateRefType, setDateRefType] = useState(props.events.DateRefType);
    const [partnerName, setPartnerName] = useState(props.registeredEventStatus ? props.registeredEventStatus.PartnerPlayerName : "");
    const [showError, setShowError] = useState(props.registeredEventStatus ? false : true);
    const [isEdit, setIsEdit] = useState(true);

    useEffect(() => {
        // console.log(props.registeredEventStatus);
        setCategorySelectFlag(props.registeredEventStatus ? true : false);
        setPartnerName(props.registeredEventStatus ? props.registeredEventStatus.PartnerPlayerName : "");
        setPartnerDetails(props.registeredEventStatus ? props.registeredEventStatus.PartnerPlayerID : "");
        setShowError(props.registeredEventStatus ? false : true);
        setRegisteredEvent(props.registeredEventStatus);
        if (props.registeredEventStatus && props.registeredEventStatus.EventType.toUpperCase() === 'DOUBLE') {
            setPartnerFlag(true);
        }
        if (props.registeredEventStatus && props.registeredEventStatus.PaymentStatus
            && (props.registeredEventStatus.PaymentStatus.toUpperCase() === 'COMPLETED' || props.registeredEventStatus.RegType != 'Self')) {
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }

        // console.log(registeredEvent);
    }, [props.registeredEventStatus]);

    function CheckPartnerCode() {
        // console.log(refDate);
        var rDate = new Date(refDate._seconds * 1000);
        var userRole = {};
        var para1 = {};
        para1 = {
            PlayerID: partnerDetails
        };
        const ret1 = httpsCallable(functions, "getPlayerDetailsWithPlayerID");
        ret1(para1).then((result) => {
            // console.log(result.data[0]);
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
                var dob = new Date(userRole.DateOfBirth._seconds * 1000);
                // console.log("PlayerGender : ", playerGender, " :: userRole.Gender : " + userRole.Gender);
                // console.log("EventGender : ", props.events.gender);

                // console.log("dateRefType : ", dateRefType);
                // console.log("dob : ", dob, " :: rDate : " + rDate);
                // console.log(props.events);

                if ((playerGender.toUpperCase() === 'MALE' && userRole.Gender.toUpperCase() === 'MALE' && props.events.Gender.toUpperCase() === 'MALE') ||
                    (playerGender.toUpperCase() === 'FEMALE' && userRole.Gender.toUpperCase() === 'FEMALE' && props.events.Gender.toUpperCase() === 'FEMALE') ||
                    (playerGender.toUpperCase() === 'MALE' && userRole.Gender.toUpperCase() === 'FEMALE' && props.events.Gender.toUpperCase() === 'MIXED') ||
                    (playerGender.toUpperCase() === 'FEMALE' && userRole.Gender.toUpperCase() === 'MALE' && props.events.Gender.toUpperCase() === 'MIXED')) {

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
                // console.log(flag);
                if (flag === true) {
                    console.log(userRole);
                    setPartnerName(userRole.UserName);

                    props.partnerSetup(props.events.CategoryName, partnerDetails, userRole.UserName, userRole.userid);
                    setShowError(false);
                }

            }
            // console.log(flag);
            if (flag === false) {
                setShowError(false);
            }

            // console.log(userRole);

        });
    }

    function registerCategory() {
        let flag = false;
        if (categorySelectFlag === true) {
            flag = props.calculateFees('REMOVE', Number(props.events.Fees), props.events);

        } else {
            flag = props.calculateFees('ADD', Number(props.events.Fees), props.events);

        }
        // console.log(categorySelectFlag);
        console.log(flag);
        if (!flag) {
            setCategorySelectFlag(!categorySelectFlag);
            if (props.events.EventType.toUpperCase() !== 'SINGLE') {
                openPartnerSelection();
            }
        }
    }
    function openPartnerSelection() {
        setPartnerFlag(!partnerFlag);
    }
    function closePartner(e) {
        closePartnerSelection();
    }
    function closePartnerSelection() {
        setPartnerFlag(false);

    }
    return (
        <div key={props.events.CategoryName} id={props.events.CategoryName + props.keyValue} className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0' }}>
            <div style={{ padding: '10px' }}>
                {/* {console.log(props.registeredEventStatus)} */}
                {/* {console.log('categorySelectFlag : ', categorySelectFlag, 'registeredEvent : ', registeredEvent)} */}
                <div id={'div' + props.keyValue} style={isEdit ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}

                    className={categorySelectFlag ? "reg-category-card active " + (props && props.registeredEventStatus.PaymentStatus.toUpperCase() === 'PENDING' ? "payment-pending" : "payment-completed") : "reg-category-card"}>

                    {/* className={categorySelectFlag ? "reg-category-card active " + (props.events.PaymentStatus.toUpperCase() === 'PENDING' ? 'payment-pending' : 'payment-completed') : "reg-category-card" + (props.events.PaymentStatus.toUpperCase() === 'PENDING' ? 'payment-pending' : 'payment-completed')}> */}
                    {/*
                <div className={props && props.eventDetails && props.eventDetails.PaymentStatus.toUpperCase() === 'PENDING' ?
                    "reg-category-card active payment-pending" : "reg-category-card active payment-completed"}>
 */}
                    <div className="display-flex-div"
                        onClick={registerCategory} id={'div2' + props.keyValue}>

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

                            {partnerName !== "" && <h3><strong>Partner : </strong>
                                <span id={'spanPartnerName' + props.keyValue}>{partnerName}{props.registeredEventStatus && props.registeredEventStatus.RegType === 'Partner' ? '*' : ''}</span>
                            </h3>}

                        </div>

                        <div className="category-fees">
                            <h2>
                                <span>₹ </span>
                                <span>{props.events.Fees}</span>
                            </h2>
                        </div>
                    </div>
                    {props.events.EventType.toUpperCase() === 'DOUBLE' &&
                        <div className={partnerFlag ? "category-doubles-partner-div show" : "category-doubles-partner-div"}>
                            <hr style={{ margin: '0' }} />
                            <div style={{ position: 'relative', padding: '0 10px' }}>
                                <div className="reg-participant-form-field">
                                    <input id={'txtPartnerID' + props.keyValue} type="text" required onBlur={CheckPartnerCode} onChange={(e) => {
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
            {props.registeredEventStatus && props.registeredEventStatus.RegType === 'Partner' && <span>Registered by Partner</span>}
            {/* {props.registeredEventStatus.RegType === 'Partner' && <span>Registered by Partner</span>} */}
        </div >

    )
}
