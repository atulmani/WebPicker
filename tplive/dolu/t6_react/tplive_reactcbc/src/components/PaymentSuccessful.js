import { useEffect } from 'react'

import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from "../context/useLocalStorage";
import { functions } from '../firebase.js'
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
// import { useNavigate } from 'react-router-dom';
import CategoryCartItem from '../components/CategoryCartItem'



export default function PaymentSuccessful() {
    const { state } = useLocation();
    const { id, participantDetails, paymentObj, paymentStatus, selectedCategory, updatePayment } = state;
    //     const navigate = useNavigate();
    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    const [registeredEvents, setRegisteredEvents] = useState(null);
    const [partnerList, setPartnerList] = useState(null);
    useEffect(() => {
        // console.log('useEffect');
        // console.log('eventDetails ', eventDetails);
        // console.log('participantDetails ', participantDetails);
        // console.log('selectedCategory ', selectedCategory);
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
        // console.log('getRegisteredEvents para1', para1)
        const ret1 = httpsCallable(functions, "getAllRegisteredEventListByPlayerCode");
        var tcnt = 0;
        var tfees = 0;
        ret1(para1).then(async (result) => {
            // console.log('registeredEvents : ', result.data);

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
        // console.log('in updatePaymentStatus');
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
        // console.log('para1', para1);
        const ret1 = httpsCallable(functions, "updatePaymentStatus");
        ret1(para1).then((result) => {
            // console.log('result', result);
            getRegisteredEvents();
            if (paymentStatus === 'Completed') {
                // navigate("/PaymentSuccessful", {
                //     state: { id: 1, response: paymentStatus }
                // });

            } else {
                // navigate("/PaymentFailed", {
                //     state: { id: 1, response: paymentStatus }
                // });
            }


        })


    }
    return (
        <div className="container-fluid">


            <div className="row no-gutters">

                <div className="col-lg-8 col-md-8 col-sm-12">

                    <div id="regProfileNewParticipantDetails">
                        {/* {console.log(selectedCategory)} */}
                        <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>{updatePayment ? 'Payment is successful' : 'Registered Event'}</h3>
                        <h1 className="reg-form-email" id="playerName">{participantDetails.UserName}</h1>
                        <h5 className="reg-form-email" id="playerID">({participantDetails.PlayerID})</h5>
                        {participantDetails.Gender.toUpperCase() === 'FEMALE' && <h5 className="reg-form-email female" id="playerGender">FEMALE</h5>}
                        {participantDetails.Gender.toUpperCase() === 'MALE' && <h5 className="reg-form-email male" id="playerGender">MALE</h5>}

                        {/* <input type="hidden" id="hfPlayerDocID" />
                        <input type="hidden" id="hfPlayerID" />
                        <input type="hidden" id="hfGender" />
                        <input type="hidden" id="hfcatCount" /> */}
                        <br />
                    </div>

                    <div className="row no-gutters" id="divRegEvent">

                        {registeredEvents && registeredEvents.map((events) => {
                            return <CategoryCartItem key={events.CategoryName} eventDetails={events} ></CategoryCartItem>

                        })}
                        {/* <span> * marked event is registered by Partner</span> */}
                        {/* <CategoryCartItem></CategoryCartItem> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

