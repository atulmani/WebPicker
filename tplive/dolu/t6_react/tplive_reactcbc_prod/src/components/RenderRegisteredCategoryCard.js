import React from 'react'
import { useState, useEffect } from 'react';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import useRazorpay from "react-razorpay";

// import Razorpay from 'react-razorpay';
// import useRazorpay from "react-razorpay";
// import Razorpay from 'react-razorpay';
// import RazorpayCheckout from 'razorpay-checkout';
import axios from 'axios';
// import Razorpay from 'razorpay';
// import ReactRazorpay from 'react-razorpay';

export default function RenderRegisteredCategoryCard(props) {
    const [withdraw, setWithdraw] = useState(true);
    // const [transaction, setTransaction] = useState({});
    // const [refund, setRefund] = useState({});
    const [payment, setPayment] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.EntryDetails.RegType === 'Self') {
            let refdate = new Date(props.EventDetails.WithdrawalEndDate._seconds * 1000);

            if (refdate < new Date()) {
                setWithdraw(false);
            }
            if (props.EntryDetails.PaymentStatus === 'Pending'
                && props.EventDetails.PaymentMode && props.EventDetails.PaymentMode.toUpperCase() === 'ON') {
                setPayment(true);
            } else {
                setPayment(false);
            }

        }
        else {
            setWithdraw(false);
        }

    }, [props.EntryDetails, props.EventDetails]);


    async function WithdrawEntry() {
        var catDel = [];
        catDel.push(props.EntryDetails.CategoryName);
        var para1 = {};
        para1 = {
            EventID: props.EventDetails.EventID,
            PlayerID: props.EntryDetails.ParticipantID,
            DeleteCategoryList: catDel,
        };

        const ret1 = await httpsCallable(functions, "withdrawRegistration");
        ret1(para1).then(async (result) => {

        })

    }

    async function ConfirmPayment(amount, transactionID, orderID) {
        var catDel = [];
        catDel.push(props.EntryDetails.CategoryName);
        var para1 = {};
        para1 = {
            EventID: props.EventDetails.EventID,
            PlayerID: props.EntryDetails.ParticipantID,
            CategoryList: catDel,
            paymentStatus: 'Completed',
            paymentAmount: amount,
            transactionID: transactionID,
            orderID: orderID,
        };

        const ret1 = await httpsCallable(functions, "updatePaymentStatus");
        ret1(para1).then(async (result) => {
            props.refreshParent();
        })

    }
    const handleRefund = async () => {
        //uppdate the registration status as withdrawn

        WithdrawEntry();

        if (props.EntryDetails.PaymentStatus.toUpperCase() === 'COMPLETED') {
            try {
                const response = await axios.post(
                    `https://api.razorpay.com/v1/payments/${props.EntryDetails.TransactionID}/refund`,
                    {
                        amount: Number(props.EntryDetails.Fees) * 100, // replace with the amount to be refunded
                        notes: {
                            reason: 'Incorrect item received', // replace with the reason for the refund
                        },
                    },
                    {
                        auth: {
                            username: 'rzp_test_gaZqhFw4MY2o6v',
                            password: 'mL2eEEGVYMTq0aMCaB2EEUpd',
                        },
                    }
                );
                // setRefund(response.data);
                console.log('success ', response.data);
                props.refreshParent();

            } catch (error) {
                console.log('error', error);
            }
        }

    };

    function handlePayment() {
        let amount = 0;
        amount = Number(props.EntryDetails.Fees);
        if (props.EventDetails.ConvenienceCharge) {
            amount = amount + amount * Number(props.EventDetails.ConvenienceCharge) / 100;

        }
        console.log('amout : ', amount);
        let orderId = 'O_' + props.EventDetails.EventCode + '_' + props.EntryDetails.ParticipantID + '_' + new Date().getTime();
        const razorpayOptions = {
            key: 'rzp_test_gaZqhFw4MY2o6v',
            amount: amount * 100, // amount in paise
            name: 'TPLiVE',
            description: 'Payment for TP Live',
            email: props.playerDetails.Email,
            contact: props.playerDetails.Phone,

            image: 'https://tplive-prod--tplive-test-h1bjje65.web.app/img/TPLiVE_Logo.webp',
            handler: function (response) {
                console.log(response);
                ConfirmPayment(amount, response.razorpay_payment_id, orderId)


            },
            prefill: {
                name: props.playerDetails.UserName,
                email: props.playerDetails.Email,
                contact: props.playerDetails.Phone,
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


    }

    return (
        <div className="col-lg-6 col-md-6 col-sm-12">
            <div style={{ padding: '10px' }}>
                {/* {console.log(props)} */}

                <div className={props && props.EntryDetails && props.EntryDetails.PaymentStatus.toUpperCase() === 'PENDING' ?
                    "reg-category-card active payment-pending" : "reg-category-card active payment-completed"} style={{ display: 'block' }}>

                    <div className="display-flex-div">
                        <div className="category-details">
                            <h1 style={{ color: '#666', fontSize: '0.8rem', fontWeight: 'normal' }}>{props && props.EventDetails && props.EventDetails.EventName}</h1>

                            <h1>{props && props.EntryDetails && props.EntryDetails.CategoryName}</h1>

                            {props && props.EntryDetails && props.EntryDetails.Gender.toUpperCase() === 'FEMALE' && props.EntryDetails.EventType.toUpperCase() === 'SINGLE' ? <div className="category-icons">
                                <span className="material-symbols-outlined female">
                                    woman
                                </span>
                            </div> :
                                props && props.EntryDetails.Gender.toUpperCase() === 'FEMALE' && props.EntryDetails.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                    <span className="material-symbols-outlined female">
                                        woman
                                    </span>
                                    <span className="material-symbols-outlined female">
                                        woman
                                    </span>
                                </div> :
                                    props && props.EntryDetails.Gender.toUpperCase() === 'MIXED' && props.EntryDetails.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                        <span className="material-symbols-outlined female">
                                            woman
                                        </span>
                                        <span className="material-symbols-outlined male">
                                            man
                                        </span>
                                    </div> :
                                        props && props.EntryDetails.Gender.toUpperCase() === 'MALE' && props.EntryDetails.EventType.toUpperCase() === 'SINGLE' ? <div className="category-icons">
                                            <span className="material-symbols-outlined male">
                                                man
                                            </span>
                                        </div> :
                                            props && props.EntryDetails.eventDetails.toUpperCase() === 'MALE' && props.EntryDetails.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                                <span className="material-symbols-outlined male">
                                                    man
                                                </span>
                                                <span className="material-symbols-outlined male">
                                                    man
                                                </span>
                                            </div> :
                                                props && props.EntryDetails.Gender.toUpperCase() === 'FEMALE' && props.EntryDetails.EventType.toUpperCase() === 'TEAM' ? <div className="category-icons">
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
                                                    props && props.EntryDetails.Gender.toUpperCase() === 'MALE' && props.EntryDetails.EventType.toUpperCase() === 'TEAM' ? <div className="category-icons">
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

                            {props && props.EntryDetails && props.EntryDetails.PartnerPlayerID !== '' && <h3>
                                <strong>Partner : </strong>{props.EntryDetails.PartnerPlayerName}
                                {props.EntryDetails.RegType === 'Partner' ? ' (registered by Partner)' : ''}
                            </h3>}
                        </div>

                        <div className="category-fees">
                            <h2 style={{ position: 'relative', top: '5px' }}><span>₹ </span>
                                <span>{props && props.EntryDetails && props.EntryDetails.Fees}</span>
                            </h2>

                            {withdraw && <button className='mybutton button5' onClick={(e) => {
                                if (window.confirm('Are you sure you wish to withdraw for "'
                                    + props.EntryDetails.CategoryName + '" for Event : ' + props.EventDetails.EventName))
                                    console.log('deleted : ', props.EntryDetails.TransactionID);
                                if (props.EntryDetails.TransactionID !== null && props.EntryDetails.TransactionID !== undefined && props.EntryDetails.TransactionID !== '')
                                    handleRefund();
                            }
                            }>Withdraw</button>}

                            {payment && <button className='mybutton button5' onClick={(e) => {
                                handlePayment();
                            }
                            }>Pay Now</button>}

                            {/* 
                            <Razorpay
                                options={refundOptions}
                                refundCallback={handleRefund}
                                style={{ background: "red" }}
                            >
                                <button onClick={() => Razorpay.open()} style={{ background: "red" }}>Refund me</button>
                            </Razorpay> */}
                            {/* {withdraw && <ReactRazorpay
                                options={options}
                                onSuccess={onSuccess}
                                onError={onError}
                            />} */}
                        </div>

                    </div>
                    {props && props.EntryDetails && props.EntryDetails.PaymentStatus.toUpperCase() === 'PENDING' &&
                        <div className="payment-status pending">
                            <h1>Payment Pending</h1>
                        </div>
                    }
                    {props && props.EntryDetails && props.EntryDetails.PaymentStatus.toUpperCase() === 'COMPLETED' &&
                        <div className="payment-status completed">
                            <h1>Payment Completed</h1>
                        </div>
                    }


                </div>
            </div>
        </div >


    )
}
