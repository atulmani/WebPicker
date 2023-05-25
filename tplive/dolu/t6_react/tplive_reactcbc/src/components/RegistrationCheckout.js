import React, { useState, useEffect } from 'react'
import '../css/EventRegistration.css'
import CategoryCartItem from '../components/CategoryCartItem'

import { useParams, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// import useRazorpay from "react-razorpay";

export default function RegistrationCheckout() {
    const { state } = useLocation();
    const { id, participantDetails, selectedCategory } = state;
    // const [eventCount, setEventCount] = useState(0);
    // const [totalPayment, setTotalPayment] = useState(0);
    // const [totalPendingPayment, setTotalPendingPayment] = useState(0);
    // const [convenienceCharge, setConvenienceCharge] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paymentObject, setPaymentObject] = useState({
        eventCount: 0,
        totalPayment: 0,
        totalPendingPayment: 0,
        convenienceCharge: 0
    })
    const [pendingCategory, setPendingCategory] = useState([]);
    const [openCheckoutDetails, setOpenCheckoutDetails] = useState(false);

    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState({
        token: "",
        order: "",
        mid: "",
        amount: ""
    });


    useEffect(() => {
        setEventDetails(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);

        let cntEvent = 0;
        let tPayment = 0;
        let tPendingPayment = 0;
        let pCat = [];
        selectedCategory.forEach(element => {

            tPayment = tPayment + Number(element.Fees);
            if (element.PaymentStatus.toUpperCase() === 'PENDING') {
                cntEvent++;
                tPendingPayment = tPendingPayment + Number(element.Fees);
                pCat.push(element.CategoryName);
            }
        });
        // setEventCount(cntEvent);
        // setTotalPayment(tPayment);
        // setTotalPendingPayment(tPendingPayment);
        let conCharge = 0;
        if (eventDetails.ConvenienceCharge && eventDetails.ConvenienceCharge > 0) {
            //setConvenienceCharge(conCharge);
            conCharge = (tPendingPayment * eventDetails.ConvenienceCharge) / 100;
        }

        setPaymentObject({
            eventCount: cntEvent,
            totalPayment: tPayment,
            totalPendingPayment: tPendingPayment,
            convenienceCharge: conCharge
        });
        // console.log(pCat);
        setPendingCategory(pCat);

    }, []);

    function openMorePaymentDetails() {
        setOpenCheckoutDetails(!openCheckoutDetails);
    }
    function paymentGateway() {
        setLoading(true);
        let orderId = 'O_' + eventDetails.EventCode + '_' + participantDetails.PlayerID + '_' + new Date().getTime();
        const razorpayOptions = {
            key: 'rzp_test_gaZqhFw4MY2o6v',
            amount: Number(paymentObject.totalPendingPayment + paymentObject.convenienceCharge) * 100, // amount in paise
            name: 'TPLiVE',
            description: 'Payment for TP Live',
            email: participantDetails.Email,
            contact: participantDetails.Phone,

            image: 'https://tplive-prod--tplive-test-h1bjje65.web.app/img/TPLiVE_Logo.webp',
            handler: function (response) {
                // console.log(response);
                navigate("/PaymentSuccessful", {
                    state: {
                        id: 1, participantDetails: participantDetails,
                        paymentObj: {
                            TXNAMOUNT: paymentObject.totalPendingPayment,
                            TXNID: response.razorpay_payment_id,
                            ORDERID: orderId
                        },
                        paymentStatus: 'Completed',
                        selectedCategory: pendingCategory,
                        updatePayment: true
                    }
                });

            },
            prefill: {
                name: participantDetails.UserName,
                email: participantDetails.Email,
                contact: participantDetails.Phone,
            },
            notes: {
                address: '',
            },
            theme: {
                color: '#348DCB',
            },
        };

        const rzp1 = new window.Razorpay(razorpayOptions);
        rzp1.open();
        setLoading(false);
    }

    function goBack() {
        navigate(-1);
    }
    let newArray = participantDetails.Phone && participantDetails.Phone.replace('+', '').match(/^(91|)?(\d{3})(\d{3})(\d{4})$/)
    // console.log('newArray', newArray, 'participantDetails.Phone', participantDetails.Phone.replace('+', ''));
    return (
        <div className="container-fluid">
            <div className="row no-gutters">

                <div className="col-lg-8 col-md-8 col-sm-12">
                    <br />
                    <div id="regProfileNewParticipantDetails">
                        {/* {console.log(selectedCategory)} */}
                        <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>CHECKOUT</h3>
                        <h1 className="reg-form-email" id="playerName">{participantDetails.UserName} ({participantDetails.PlayerID})</h1>
                        <h5 className="reg-form-email">{participantDetails.Email}</h5>
                        <h6 className="reg-form-email">+{newArray && newArray.length >= 5 ? +newArray[1] + '-' + newArray[2] + '-' + newArray[3] + '-' + newArray[4] : ''}</h6>
                        {participantDetails.Gender.toUpperCase() === 'FEMALE' && <h5 className="reg-form-email female" id="playerGender">FEMALE</h5>}
                        {participantDetails.Gender.toUpperCase() === 'MALE' && <h5 className="reg-form-email male" id="playerGender">MALE</h5>}

                        <br />
                    </div>

                    <div className="row no-gutters" id="divRegEvent">

                        {selectedCategory && selectedCategory.map((events) => {
                            if (events.PaymentStatus === 'Pending') {
                                return <CategoryCartItem key={events.CategoryName} eventDetails={events} ></CategoryCartItem>

                            } else {
                                return null
                            }

                        })}

                        {/* <CategoryCartItem></CategoryCartItem> */}

                    </div>

                    <br />
                    {eventDetails.ConvenienceCharge && eventDetails.ConvenienceCharge > 0 && <div className="convenience-fee-div" id="convenience-fee">

                        <h1>Convenience & Internet Charges: ( <span id="ConvenienceRate">{eventDetails.ConvenienceCharge} %</span> ) : <strong
                            id="ConvinienceCharge"> Rs. {paymentObject.convenienceCharge} /- </strong>
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
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={goBack} className="mybutton button5"
                            style={{ fontWeight: 'bold', textAlign: 'center' }}> &lt;&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back </button>
                    </div>

                    <div className={openCheckoutDetails ? "category-checkout active" : "category-checkout"} id="paymentDiv" style={{ opacity: '1', pointerEvents: 'all', cursor: 'auto' }}>

                        <div className="category-checkout-expand-more" style={{ width: '200px', textAlign: 'center', cursor: 'pointer' }} onClick={openMorePaymentDetails}>
                            <span className="material-symbols-outlined">
                                expand_more
                            </span>
                        </div>

                        <div className="category-checkout-full-details">

                            {selectedCategory && selectedCategory.map((events) => {
                                if (events.PaymentStatus === 'Pending') {
                                    return <div key={events.CategoryName}>
                                        <span>{events.CategoryName}</span>
                                        <small>₹ {events.Fees}</small>
                                    </div>
                                }
                                return;

                            })}


                            {paymentObject.convenienceCharge > 0 && <div>
                                <span>Convenience Charge</span>
                                <small>₹ {paymentObject.convenienceCharge}</small>
                            </div>}

                        </div>

                        <div className="category-checkout-first-details">
                            <div className="first-details-total">

                                <div>
                                    <h3>TOTAL</h3>
                                </div>
                                <div>
                                    <h1><span>Payment : ₹ </span> <span id="totalPrice">{paymentObject.totalPendingPayment + paymentObject.convenienceCharge}</span></h1>

                                    {/* <h1><span>Payment : ₹ </span> <span id="totalPrice">{totalPayment}</span></h1> */}
                                    {/* {totalPayment != totalPendingPayment && <h1><span>Pending Payment : ₹ </span> <span id="totalPrice">{totalPendingPayment}</span> </h1>
                                    } */}
                                    <h2><span id="noOfCategories">{paymentObject.eventCount}</span> <span> CATEGORIES</span></h2>
                                </div>
                            </div>
                            {paymentObject.totalPendingPayment > 0 && <div className="category-checkout-button-div">
                                {/* <button onClick={paymentGateway} className="mybutton button5"
                                    style={{ fontWeight: 'bold' }}>PAY NOW</button> */}

                                <button onClick={paymentGateway} className="mybutton button5" style={{ width: '120px', height: '35px', background: '#333C5D' }}>
                                    <div style={{ display: !loading ? 'block' : 'none' }}>
                                        <span
                                            style={{ position: 'relative', fontSize: '0.9rem', color: '#fff' }}>PAY NOW</span>
                                    </div>
                                    <div className='btn-loading' style={{ display: loading ? 'block' : 'none' }}>
                                        <lottie-player
                                            src="https://assets8.lottiefiles.com/packages/lf20_fiqoxpcg.json" background="transparent"
                                            speed="0.7" loop autoplay></lottie-player>
                                    </div>
                                </button>
                            </div>}

                        </div>

                    </div>

                </div>
            </div><br /><br /><br />
        </div>
    )
}
