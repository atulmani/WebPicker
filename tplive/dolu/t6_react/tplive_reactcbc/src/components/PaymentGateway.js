import React from 'react'
import { useState, useEffect, useCallback } from 'react'
// import https from 'https'
import { useNavigate, useLocation } from 'react-router-dom';
import useRazorpay from "react-razorpay";
// import Razorpay from 'razorpay';
// import from 'https-browserify';
// import { promises } from 'stream';
// import { resolve } from 'path';

export default function PaymentGatewayRP() {
    const { state } = useLocation();
    const { id, participantDetails, paymentAmount, categoryList } = state;
    const Razorpay = useRazorpay();
    const [name, setName] = useState(participantDetails ? participantDetails.UserName : '');
    const [email, setEmail] = useState(participantDetails ? participantDetails.Email : '');
    const [phone, setPhone] = useState(participantDetails ? participantDetails.Phone : '');
    const [amount, setAmount] = useState(paymentAmount, '10');
    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);

    const [paymentData, setPaymentData] = useState({
        token: "",
        order: "",
        mid: "",
        amount: ""
    });

    const navigate = useNavigate();

    let orderId = 'O_' + eventDetails.EventCode + '_' + participantDetails.PlayerID + '_' + new Date().getTime();
    // console.log(orderId);
    const razorpayOptions = {
        key: 'rzp_test_gaZqhFw4MY2o6v',
        amount: Number(amount) * 100, // amount in paise
        name: 'TPLiVE',
        description: 'Payment for TP Live',
        email: email,
        contact: phone,
        image: 'https://tplive-prod--tplive-test-dw5grchb.web.app/img/TPLiVE_Logo.webp',
        handler: function (response) {
            navigate("/PaymentSuccessful", {
                state: {
                    id: 1, participantDetails: participantDetails,
                    paymentObj: {
                        TXNAMOUNT: amount,
                        TXNID: response.razorpay_payment_id,
                        ORDERID: orderId
                    },
                    paymentStatus: 'Completed',
                    selectedCategory: categoryList,
                    updatePayment: true
                }
            });
        },
        prefill: {
            name: name,
            email: email,
            contact: phone,
        },
        notes: {
            address: '',
        },
        theme: {
            color: '#348DCB',
        },
    };

    const rzp1 = new window.Razorpay(razorpayOptions);

    const handlePayment = () => {
        // console.log(rzp1);
        rzp1.open();
    };

    return (
        <div className="row my-5">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        {/* <form className="" action="/paynow" method="post"> */}
                        <div className="form-group">
                            <label htmlFor="">Name: </label>
                            <input className="form-control" type="text" name="name" value={name} disabled onChange={(e) =>
                                setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email: </label>
                            <input className="form-control" type="text" value={email} name="email" disabled onChange={(e) =>
                                setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Phone: </label>
                            <input className="form-control" type="text" value={phone} name="phone" disabled onChange={(e) =>
                                setPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Amount: </label>
                            <input className="form-control" type="text" value={amount} name="amount" disabled onChange={(e) =>
                                setAmount(e.target.value)} />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <button className="btn form-control btn-primary" onClick={handlePayment}>Pay Now</button>
                        </div>
                        {/* </form> */}
                    </div>
                    <div>
                        {/* <form className="" action="/refund" method="post">
                            <!-- <form className="" action="/paynow1" method="post"> -->
                                <div className="form-group">
                                    <label for="">Name: </label>
                                    <input className="form-control" type="text" name="name" value="anita">
                                </div>
                                <div className="form-group">
                                    <label for="">Email: </label>
                                    <input className="form-control" type="text" value="anita@gmail.com" name="email" value="">
                                </div>
                                <div className="form-group">
                                    <label for="">Phone: </label>
                                    <input className="form-control" type="text" value="9922112886" name="phone" value="">
                                </div>
                                <div className="form-group">
                                    <label for="">Amount: </label>
                                    <input className="form-control" type="text" value="10" name="amount" value="">
                                </div>
                                <div className="form-group">
                                    <button className="btn form-control btn-primary">Refund</button>
                                </div>
                            </form> */}

                    </div>
                </div>
            </div>
        </div>
    )
}
