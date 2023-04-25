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


    const handleRefund = async () => {
        //uppdate the registration status as withdrawn
        if ()
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
    };

    // const refundOptions = {
    //     key: 'rzp_test_gaZqhFw4MY2o6v',
    //     amount: 10000, // amount to be refunded in paisa (e.g., 10000 paisa = 100 INR)
    //     currency: 'INR',
    //     refund: {
    //         // refund details, such as the refund amount, notes, and other optional fields
    //         amount: 5000, // refund amount in paisa (e.g., 5000 paisa = 50 INR)
    //         notes: {
    //             reason: 'Refund for order #12345',
    //         },
    //     },
    // };

    // const handleRefund = (response) => {
    //     // handle the refund response here
    //     console.log('Refund response:', response);
    // };


    const handleWithdrawById1 = () => {
        const options = {
            key: "rzp_test_gaZqhFw4MY2o6v",
            amount: Number(props.EntryDetails.Fees) * 100, // amount in paise
            currency: "INR",
            refund: {
                amount: Number(props.EntryDetails.Fees) * 100, // amount in paise
                transaction_id: props.EntryDetails.TransactionID,
            },
            handler: function (response) {
                setTransaction(response);
            },
        };


        // var instance = new Razorpay({
        //     key: 'rzp_test_gaZqhFw4MY2o6v',
        //     key_secret: 'mL2eEEGVYMTq0aMCaB2EEUpd'
        // })
        // console.log(instance);
        // instance.refund(props.EntryDetails.TransactionID, {
        // instance.refund(props.EntryDetails.TransactionID, {
        // instance.open({

        // "amount": "100",
        //     "speed": "normal",
        //         "notes": {
        //     "notes_key_1": "Beam me up Scotty.",
        //         "notes_key_2": "Engage"
        // },
        // "receipt": "Receipt No. 31"
        // })
        // const rzp = new window.Razorpay(options);
        // console.log(rzp);
        // // rzp.open();

        // rzp.refund(props.EntryDetails.TransactionID, {
        //     "amount": "100",
        //     "speed": "normal",
        //     "notes": {
        //         "notes_key_1": "Beam me up Scotty.",
        //         "notes_key_2": "Engage"
        //     },
        //     "receipt": "Receipt No. 31"
        // });


    };
    const handleWithdrawById2 = () => {
        let transactionId = props.EntryDetails.TransactionID;
        const options = {
            key: 'rzp_test_gaZqhFw4MY2o6v',
            amount: 1000, // replace with the amount you want to withdraw
            currency: 'INR', // replace with your preferred currency
            name: 'My Company', // replace with your company name
            description: 'Withdrawal request', // replace with a description of the transaction
            prefill: {
                name: props.EntryDetails.ParticipantName, // replace with the customer's name
                // email: props.EntryDetails.ParticipantName, // replace with the customer's email address
            },
            notes: {
                // account_number: '1234567890', // replace with the customer's bank account number
                // ifsc_code: 'ICIC0000001', // replace with the customer's bank IFSC code
                transaction_id: transactionId, // replace with the actual transaction ID
            },
            theme: {
                color: '#F37254', // replace with your preferred color theme
            },
            handler: function (response) {
                setTransaction(response);
            },
        };
        // console.log(RazorpayCheckout)
        const rzp1 = new window.Razorpay(options);
        rzp1.open();


    };

    // const handleWithdrawById = () => {
    //     console.log('in handleWithdrawById');
    //     const options = {
    //         key: 'rzp_test_gaZqhFw4MY2o6v',
    //         amount: props.EntryDetails.Fees * 100, //1000, // replace with the amount you want to withdraw
    //         currency: 'INR', // replace with your preferred currency
    //         name: 'TPLiVE ', // replace with your company name
    //         description: 'Withdrawal from TPLiVE', // replace with a description of the transaction

    //         image: 'https://tplive-prod--tplive-test-dw5grchb.web.app/img/TPLiVE_Logo.webp',
    //         prefill: {
    //             name: props.EntryDetails.ParticipantName, // replace with the customer's name
    //             // email: 'johndoe@example.com', // replace with the customer's email address
    //         },
    //         notes: {
    //             // account_number: '1234567890', // replace with the customer's bank account number
    //             // ifsc_code: 'ICIC0000001', // replace with the customer's bank IFSC code
    //             transaction_id: props.EntryDetails.TransactionID, // replace with the actual transaction ID
    //         },
    //         theme: {
    //             color: '#348DCB', // replace with your preferred color theme
    //         },
    //         handler: (response) => {
    //             setTransaction(response);
    //         },
    //     };
    //     return (
    //         <ReactRazorpay
    //             options={options}
    //             onSuccess={onSuccess}
    //             onError={onError}
    //         />
    //     );
    // const razorpay = new window.Razorpay(options);
    // razorpay.open();
    // };

    // const options = {
    //     key: 'rzp_test_gaZqhFw4MY2o6v',
    //     amount: props.EntryDetails.Fees * 100, //1000, // replace with the amount you want to withdraw
    //     currency: 'INR', // replace with your preferred currency
    //     name: 'TPLiVE ', // replace with your company name
    //     description: 'Withdrawal from TPLiVE', // replace with a description of the transaction

    //     image: 'https://tplive-prod--tplive-test-dw5grchb.web.app/img/TPLiVE_Logo.webp',
    //     prefill: {
    //         name: props.EntryDetails.ParticipantName, // replace with the customer's name
    //         // email: 'johndoe@example.com', // replace with the customer's email address
    //     },
    //     notes: {
    //         // account_number: '1234567890', // replace with the customer's bank account number
    //         // ifsc_code: 'ICIC0000001', // replace with the customer's bank IFSC code
    //         transaction_id: props.EntryDetails.TransactionID, // replace with the actual transaction ID
    //     },
    //     theme: {
    //         color: '#348DCB', // replace with your preferred color theme
    //     },
    //     handler: (response) => {
    //         setTransaction(response);
    //     },
    // };
    // const onSuccess = (data) => {
    //     setTransaction(data);
    // };

    // const onError = (error) => {
    //     console.log(error);
    // };


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
