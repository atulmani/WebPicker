import { useEffect } from 'react'

import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
// import { useLocalStorage } from "../context/useLocalStorage";
import { functions } from '../firebase.js'
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
// import { useNavigate } from 'react-router-dom';
import CategoryCartItem from '../components/CategoryCartItem'

export default function PaymentSuccessful() {
    const { state } = useLocation();
    const { id, participantDetails, paymentObj, paymentStatus, selectedCategory, updatePayment } = state;
    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    const [registeredEvents, setRegisteredEvents] = useState(null);
    const [partnerList, setPartnerList] = useState(null);
    useEffect(() => {
        if (updatePayment) {
            updatePaymentStatus(paymentObj);
        } else {
            getRegisteredEvents();
        }
    }, []);

    async function getRegisteredEvents() {
        var para1 = {};
        para1 = {
            PlayerID: participantDetails.PlayerID,
            EventID: eventDetails.Eventid,
        };
        const ret1 = httpsCallable(functions, "getAllRegisteredEventListByPlayerCode");
        ret1(para1).then(async (result) => {
            setRegisteredEvents(result.data);
            let catArrayPartner = [];
            result.data.forEach((res) => {

                if (res.EventType.toUpperCase() === 'DOUBLE') {
                    var parnerDet = {
                        categoryName: res.CategoryName,
                        partnerID: res.PartnerPlayerID,
                        partnerName: res.PartnerPlayerName,
                        partnerUserID: res.PartnerUserID
                    }

                    catArrayPartner.push(parnerDet);
                }

            });
            setPartnerList(catArrayPartner);
        });

    }
    function updatePaymentStatus(paymentObj) {
        var para1 = {};
        para1 = {
            EventID: eventDetails.Eventid,
            PlayerID: participantDetails.id,
            CategoryList: selectedCategory,
            paymentStatus: paymentStatus,
            paymentAmount: paymentObj.TXNAMOUNT,
            transactionID: paymentObj.TXNID,
            orderID: paymentObj.ORDERID
        };
        const ret1 = httpsCallable(functions, "updatePaymentStatus");
        ret1(para1).then((result) => {
            getRegisteredEvents();
        })
    }
    return (
        <div className="container-fluid">
            <div className="row no-gutters">
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div id="regProfileNewParticipantDetails">
                        <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>{updatePayment ? 'Payment is successful' : 'Registered Event'}</h3>
                        <h1 className="reg-form-email" id="playerName">{participantDetails.UserName}</h1>
                        <h5 className="reg-form-email" id="playerID">({participantDetails.PlayerID})</h5>
                        {participantDetails.Gender.toUpperCase() === 'FEMALE' && <h5 className="reg-form-email female" id="playerGender">FEMALE</h5>}
                        {participantDetails.Gender.toUpperCase() === 'MALE' && <h5 className="reg-form-email male" id="playerGender">MALE</h5>}
                        <br />
                    </div>

                    <div className="row no-gutters" id="divRegEvent">

                        {registeredEvents && registeredEvents.map((events) => {
                            return <CategoryCartItem key={events.CategoryName} eventDetails={events} ></CategoryCartItem>

                        })}
                        {/* <span> * marked event is registered by Partner</span> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

