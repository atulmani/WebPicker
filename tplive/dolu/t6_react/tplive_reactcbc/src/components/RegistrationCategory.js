import React, { useEffect, useState } from 'react'
import '../css/EventRegistration.css'
import { useLocation, useResolvedPath } from 'react-router-dom';
import { useLocalStorage } from "../context/useLocalStorage";
import RenderCategoryForRegistration from './RenderCategoryForRegistration';
import { functions } from '../firebase.js'
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import { useUserAuth } from '../context/UserAuthcontext';
import { useNavigate } from 'react-router-dom';
import EDTournamentDetails from '../components/EDTournamentDetails'
import { useRef } from 'react';
import { reauthenticateWithPhoneNumber } from 'firebase/auth';

export default function RegistrationCategory() {
    const { users } = useUserAuth();

    const { state } = useLocation();
    const { id, participantDetails } = state;

    const rTotalEvent = useRef(0);
    const rTotalPayment = useRef(0);
    const paymentObj = useRef();
    const countObj = useRef();
    const rSelectedCategory = useRef([]);
    const [categoryList, setCategoryList] = useState();
    const [eventDetails, setEventDetails] = useLocalStorage('EventDetails', null);
    // const [eventID, setEventID] = useLocalStorage('EventID', null);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [showError, setShowError] = useState(false);

    const [showTotal, setShowTotal] = useState(false);
    // const [selectedCategory, setSelectedCategory] = useState([]);
    const [partnerList, setPartnerList] = useState([]);
    const [deletedEvent, setDeletedEvent] = useState([]);
    const navigate = useNavigate();
    const [indexEvent, setIndexEvent] = useState(0);
    function saveCategory(e) {
        e.preventDefault();
        var regCategory = [];

        let pendingFlag = false;
        rSelectedCategory.current.forEach(element => {
            var partName = '';
            var partnerUID = '';
            var partnerPlayerID = '';
            var pindex = partnerList.find(e => e.categoryName === element.CategoryName);
            if (pindex) {
                partName = pindex.partnerName;
                partnerUID = pindex.partnerUserID;
                partnerPlayerID = pindex.partnerID;
            }
            if (element.RegType === 'Self') {
                var selCat = {
                    CategoryName: element.CategoryName,
                    EventType: element.EventType,
                    Fees: element.Fees,
                    Gender: element.Gender,
                    MaxTeamSize: element.MaxTeamSize,
                    PartnerPlayerID: partnerPlayerID,
                    PartnerPlayerName: partName,
                    PartnerUserID: partnerUID,
                    PaymentStatus: element.PaymentStatus ? element.PaymentStatus : 'Pending'
                }
                if (element.PaymentStatus === 'Pending') {
                    pendingFlag = true;
                }
                regCategory.push(selCat);
                let eventindex = registeredEvents.find(e => e.CategoryName === element.CategoryName);
                var catArrayDel = deletedEvent;
                if (eventindex < 0) {
                    catArrayDel.push(element.CategoryName);
                    setDeletedEvent(catArrayDel);
                }


            }

        });

        var para1 = {};
        para1 = {
            EventID: eventDetails.Eventid,// eventID,
            ParticipantID: participantDetails.PlayerID,
            PlayerID: participantDetails.id,
            ParticipantName: participantDetails.UserName,
            CategoryList: regCategory,//selectedCategory,
            DeleteCategoryList: deletedEvent,
        };
        const ret1 = httpsCallable(functions, "registerAllEvent");
        if (regCategory.length > 0) {

            ret1(para1).then((result) => {
                window.localStorage.setItem('SelectedCategory', JSON.stringify(regCategory));
                if (pendingFlag) {
                    navigate("/RegistrationCheckout", {
                        state: {
                            id: 1,
                            participantDetails: participantDetails,
                            selectedCategory: regCategory
                        }
                    });

                } else {
                    navigate("/PaymentSuccessful", {
                        state: {
                            id: 1, participantDetails: participantDetails,
                            paymentObj: null,
                            paymentStatus: 'Completed',
                            selectedCategory: null,
                            updatePayment: false
                        }
                    });
                }
            })
        } else {
            navigate("/PaymentSuccessful", {
                state: {
                    id: 1, participantDetails: participantDetails,
                    paymentObj: null,
                    paymentStatus: 'Completed',
                    selectedCategory: null,
                    updatePayment: false
                }
            });

        }

    }

    useEffect(() => {
        setCategoryList(checkCategory());
        getRegisteredEvents();
        paymentObj.current.innerHTML = 'test';
    }, []);

    function partnerSetup(categoryName, partnerID, partnerName, partnerUserID) {
        let eventindex = partnerList.find(e => e.CategoryName === categoryName);
        var catArray = partnerList;
        catArray = catArray.splice(eventindex, 1)
        var parnerDet = {
            categoryName: categoryName,
            partnerID: partnerID,
            partnerName: partnerName,
            partnerUserID: partnerUserID
        }

        catArray.push(parnerDet);
        setPartnerList(catArray);
    }
    //const handleClick = useCallback(() => {
    var calculateFees = function (isAdd, amount, eventD, partnerName, partnerID) {
        setShowError(false);
        let flag = false;
        let catArray = [];
        // console.log('in calculateFees isAdd : ', isAdd, ' amount : ', amount, ' evntid : ', eventD, 'rTotalEvent.current : ', rTotalEvent.current);
        if (isAdd === 'ADD') {
            if (Number(eventDetails.MaxEntryForParticipant ? eventDetails.MaxEntryForParticipant : '0') > rTotalEvent.current) {
                catArray = rSelectedCategory.current;
                catArray.push(eventD);
                rTotalEvent.current = rTotalEvent.current + 1;
                rTotalPayment.current = rTotalPayment.current + amount;

            } else {
                flag = true;

            }

        } else {
            let eventindex = rSelectedCategory.current.find(e => e.CategoryName === eventD.CategoryName);
            catArray = rSelectedCategory.current;
            catArray = catArray.splice(eventindex, 1)
            rTotalEvent.current = rTotalEvent.current - 1;
            rTotalPayment.current = rTotalPayment.current - amount;
        }
        if (!showError) {
            rSelectedCategory.current = catArray;
            paymentObj.current.innerHTML = rTotalPayment.current;
            countObj.current.innerHTML = rTotalEvent.current;
            rTotalEvent.current === 0 ? setShowTotal(false) : setShowTotal(true);
        }
        setShowError(flag);
        return flag;
    }
    async function getRegisteredEvents() {
        var para1 = {};
        para1 = {
            PlayerID: participantDetails.PlayerID,
            EventID: eventDetails.Eventid,
        };
        // console.log('getRegisteredEvents para1', para1)
        const ret1 = httpsCallable(functions, "getAllRegisteredEventListByPlayerCode");
        var tcnt = 0;
        var tfees = 0;
        ret1(para1).then(async (result) => {
            // console.log('registeredEvents : ', result.data);
            setRegisteredEvents(result.data);
            // setSelectedCategory(result.data);
            rSelectedCategory.current = result.data;
            let catArrayPartner = [];

            result.data.forEach((res) => {
                // console.log(res);
                tcnt = tcnt + 1;
                tfees = tfees + Number(res.Fees);

                setShowTotal(true);
                var parnerDet = {};
                if (res.EventType.toUpperCase() === 'DOUBLE') {
                    parnerDet = {
                        categoryName: res.CategoryName,
                        partnerID: res.PartnerPlayerID,
                        partnerName: res.PartnerPlayerName,
                        partnerUserID: res.PartnerUserID
                    }
                }

                catArrayPartner.push(parnerDet);

            });
            setPartnerList(catArrayPartner);
            rTotalEvent.current = tcnt;
            rTotalPayment.current = tfees;
            // setTotalObj({
            //     totalEvent: tcnt,
            //     totalPayment: tfees
            // });

        });

    }
    function checkCategory() {
        // console.log('in checkCategory');
        let flagGender = false;
        let flagDate = false;
        let selCategory = [];
        // console.log(eventDetails);
        if (eventDetails.CategoryDetails !== undefined && eventDetails.CategoryDetails !== null) {
            eventDetails.CategoryDetails.forEach(element => {
                flagGender = false;
                flagDate = false;
                let dob = new Date(participantDetails.DateOfBirth._seconds * 1000);
                // console.log(element);
                flagGender = (element.Gender.toUpperCase() === participantDetails.Gender.toUpperCase() ? true :
                    element.Gender.toUpperCase() === 'MIXED' ? true : false);
                // console.log(flagGender);
                if (flagGender === true) {
                    var refDate = new Date(element.ReferenceDate._seconds * 1000);
                    // console.log(refDate);
                    if (element.DateRefType === 'Before' && dob <= refDate) {
                        flagDate = true;
                    } else if (element.DateRefType === 'After' && dob >= refDate) {
                        flagDate = true;
                    }
                    if (flagDate === true) {
                        // console.log("Render Category", element.CategoryName);
                        selCategory.push(element);
                    }
                }

            });

        }
        // console.log(selCategory)
        return selCategory;

    }
    var indexCategory = 1;
    return (

        <div className="container-fluid">
            <div className="row no-gutters">

                <div className="col-lg-8 col-md-8 col-sm-12">

                    <div id="regProfileNewParticipantDetails">
                        <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>CATEGORY</h3>
                        <h1 className="reg-form-email" id="playerName">{participantDetails.UserName}</h1>
                        <h5 className="reg-form-email" id="playerID">({participantDetails.PlayerID})</h5>
                        {participantDetails.Gender === 'Female' ? <h5 className="reg-form-email female" id="playerGender">FEMALE</h5> : <h5 className="reg-form-email male" id="playerGender">MALE</h5>}
                        {/* <input type="hidden" id="hfPlayerDocID" />
                        <input type="hidden" id="hfPlayerID" />
                        <input type="hidden" id="hfGender" /> */}
                        <br />
                    </div>
                    {showError && <div className="row no-gutters" id="categoryDiv" >
                        Maximum Category Allowed : {eventDetails.MaxEntryForParticipant}
                    </div>}
                    <div className="row no-gutters" id="categoryDiv">
                        {categoryList && categoryList.map((events) => {

                            let regEvent = registeredEvents && registeredEvents.find(e => e.CategoryName === events.CategoryName);
                            return <RenderCategoryForRegistration key={events.CategoryName}
                                events={events}
                                eventID={eventDetails.Eventid}
                                keyValue={indexCategory++}
                                calculateFees={calculateFees}
                                partnerSetup={partnerSetup}
                                registeredEventStatus={regEvent === undefined ? null : regEvent}
                                playerGender={participantDetails.Gender} ></RenderCategoryForRegistration>
                        })
                        }


                    </div><br />
                    <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} />
                    <br />

                    <div className='category-checkout' id="checkOutDiv" style={{ opacity: (!showTotal) ? '0' : '1', pointerEvents: (!showTotal) ? 'none' : 'all' }} >

                        <div className="category-checkout-first-details">
                            <div className="first-details-total">

                                <div>
                                    <h3>TOTAL</h3>

                                </div>
                                <div>
                                    <h1><span>₹ </span> <span id="totalPrice" ref={paymentObj}>{rTotalPayment.current}</span></h1>
                                    <h2><span id="noOfCategories" ref={countObj}>{rTotalEvent.current}</span> <span> CATEGORIES</span></h2>

                                </div>
                            </div>
                            <div className="category-checkout-button-div">
                                <button onClick={saveCategory} className="mybutton button5"
                                    style={{ fontWeight: 'bold' }}>CHECKOUT</button>
                            </div>
                        </div>

                    </div>

                </div>
                {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={false} />}

            </div>
        </div >
    )
}
