import React, { useState, useEffect } from 'react'
import '../css/EventRegistration.css'
import CategoryCartItem from '../components/CategoryCartItem'

import { useParams, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function RegistrationCheckout() {
    const { state } = useLocation();
    const { id, participantDetails, selectedCategory } = state;
    const [eventCount, setEventCount] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalPendingPayment, setTotalPendingPayment] = useState(0);
    const [pendingCategory, setPendingCategory] = useState([]);

    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    const navigate = useNavigate();


    useEffect(() => {
        // console.log('useEffect');
        // console.log('id ', id);
        // console.log('participantDetails ', participantDetails);
        // console.log('selectedCategory ', selectedCategory);
        setEventDetails(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);

        let cntEvent = 0;
        let tPayment = 0;
        let tPendingPayment = 0;
        let pCat = [];
        selectedCategory.forEach(element => {
            cntEvent++;
            tPayment = tPayment + Number(element.Fees);
            if (element.PaymentStatus.toUpperCase() === 'PENDING') {
                tPendingPayment = tPendingPayment + Number(element.Fees);
                pCat.push(element.CategoryName);
            }
        });
        setEventCount(cntEvent);
        setTotalPayment(tPayment);
        setTotalPendingPayment(tPendingPayment);
        // console.log(pCat);
        setPendingCategory(pCat);

    }, []);
    function openMorePaymentDetails() {

    }
    function paymentGateway() {
        // console.log('paymentGateway');
        navigate("/PaymentGateway", { state: { id: 1, participantDetails: participantDetails, paymentAmount: totalPendingPayment, categoryList: pendingCategory } });

    }
    return (
        <div className="container-fluid">
            <div className="row no-gutters">

                <div className="col-lg-8 col-md-8 col-sm-12">

                    <div id="regProfileNewParticipantDetails">
                        {/* {console.log(selectedCategory)} */}
                        <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>CHECKOUT</h3>
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

                        {selectedCategory && selectedCategory.map((events) => {
                            return <CategoryCartItem key={events.CategoryName} eventDetails={events} ></CategoryCartItem>

                        })}

                        {/* <CategoryCartItem></CategoryCartItem> */}

                    </div>

                    <br />
                    {eventDetails.MiscellaneousChargeFees && <div className="convenience-fee-div" id="convenience-fee">
                        <input type="hidden" id="hfConvenienceRate" />
                        <h1>Convenience & Internet Charges: (<span id="ConvenienceRate">-%</span>) : <strong
                            id="ConvinienceCharge"> Rs. {eventDetails.MiscellaneousChargeFees} /- </strong>
                        </h1>
                    </div>}
                    <br />

                    <div className="reg-checkout-note">
                        <h1>NOTE</h1>
                        <hr />
                        <div>
                            <ul>
                                <li>
                                    <small>
                                        We request you to go through the eligibility criteria and rules & regulations
                                        before participating in the event.
                                    </small><br /><br />
                                </li>
                                <li>
                                    <small>
                                        For Doubles entry, payment and withdrawal can be done by the participant who has
                                        done the registration for the event.
                                    </small>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <br />
                    <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} />
                    <br />

                    <div className="category-checkout" id="paymentDiv" onClick={openMorePaymentDetails} style={{ opacity: '1', pointerEvents: 'all' }}>

                        <div className="category-checkout-expand-more">
                            <span className="material-symbols-outlined">
                                expand_more
                            </span>
                        </div>

                        <div className="category-checkout-full-details">

                            <div>
                                <span>GS U17</span>
                                <small>₹ 1,000</small>
                            </div>
                            <div>
                                <span>XD U17</span>
                                <small>₹ 2,000</small>
                            </div>
                            <div>
                                <span>Boys Singles Under 17</span>
                                <small>₹ 1,000</small>
                            </div>

                        </div>

                        <div className="category-checkout-first-details">
                            <div className="first-details-total">

                                <div>
                                    <h3>TOTAL</h3>
                                </div>
                                <div>

                                    <h1><span>Total Payment : ₹ </span> <span id="totalPrice">{totalPayment}</span></h1>
                                    {totalPayment != totalPendingPayment && <h1><span>Pending Payment : ₹ </span> <span id="totalPrice">{totalPendingPayment}</span> </h1>
                                    }
                                    <h2><span id="noOfCategories">{eventCount}</span> <span> CATEGORIES</span></h2>
                                </div>
                            </div>
                            {totalPendingPayment > 0 && <div className="category-checkout-button-div">
                                <button onClick={paymentGateway} className="mybutton button5"
                                    style={{ fontWeight: 'bold' }}>PAY NOW</button>
                            </div>}

                            <div>
                            </div>
                        </div>

                    </div>

                </div>
            </div><br /><br /><br />
        </div>
    )
}
