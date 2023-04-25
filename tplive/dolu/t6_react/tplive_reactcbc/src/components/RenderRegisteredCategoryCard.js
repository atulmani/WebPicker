import React from 'react'
import { useState, useEffect } from 'react';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
// import Razorpay from 'react-razorpay';
// import useRazorpay from "react-razorpay";
// import Razorpay from 'react-razorpay';
// import RazorpayCheckout from 'razorpay-checkout';
import axios from 'axios';
// import Razorpay from 'razorpay';
// import ReactRazorpay from 'react-razorpay';

export default function RenderRegisteredCategoryCard(props) {
    const [withdraw, setWithdraw] = useState(true);
    const [transaction, setTransaction] = useState({});
    const [refund, setRefund] = useState({});

    // const Razorpay = useRazorpay();

    useEffect(() => {
        if (props.EntryDetails.RegType === 'Self') {
            let refdate = new Date(props.EventDetails.WithdrawalEndDate._seconds * 1000);

            if (refdate < new Date()) {
                setWithdraw(false);
            }
        }
        else {
            setWithdraw(false);
        }

    }, []);


    async function WithdrawEntry() {
        // setLoading(true);
        var catDel = [];
        catDel.push(props.EntryDetails.CategoryName);
        var para1 = {};
        para1 = {
            EventID: props.EventDetails.EventID,
            PlayerID: props.EntryDetails.ParticipantID,
            DeleteCategoryList: catDel,
        };
        console.log(para1);

        const ret1 = await httpsCallable(functions, "withdrawRegistration");
        ret1(para1).then(async (result) => {
            console.log('result');
            console.log(result);

            // setLoading(false);
        })

    }
    const handleRefund = async () => {
        //uppdate the registration status as withdrawn

        WithdrawEntry();

        if (props.EntryDetails.PaymentStatus.toUpperCase() === 'COMPLETED') {
            console.log(`https://api.razorpay.com/v1/payments/pay_LesYEQHTq8bi3w/refund`)
            try {
                const response = await axios.post(
                    "https://api.razorpay.com/v1/payments/pay_LesYEQHTq8bi3w/refund",
                    {
                        amount: 1000, // replace with the amount to be refunded
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
                setRefund(response.data);
                console.log('success ', response.data);
            } catch (error) {
                console.log('error', error);
            }
        }
        props.setLoading(true);

    };



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
