import React from 'react'
import { useState, useEffect } from 'react'
// import { PaytmConfig } from "../paytm/config.js"
import https from 'https'
// import PaytmChecksum from 'paytmChecksum';
import PaytmChecksum from '../paytm/PaytmChecksum';
import { useNavigate, useLocation } from 'react-router-dom';
// import { functions } from '../firebase.js'
// import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";

export default function PaymentGatewayPayTm() {
    const { state } = useLocation();
    const { id, participantDetails, paymentAmount, categoryList } = state;

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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log('id :', id, 'participantDetails : ', participantDetails, 'paymentAmount : ', paymentAmount, 'categoryList : ', categoryList);
        initialize();
    }, []);
    // const app = express();

    const initialize = () => {
        // console.log('i initialize ');
        // console.log(eventDetails);
        let orderId = 'O_' + eventDetails.EventCode + +'_' + participantDetails.PlayerID + +'_' + new Date().getTime();

        // Sandbox Credentials
        let mid = "DIY12386817555501617";//"Tourna05657364781618";//"DIY12386817555501617"; // Merchant ID
        let mkey = "bKMfNxPPf_QdZppa";//"3gkJ!L1XwzDE9&Zh";//"bKMfNxPPf_QdZppa"; // Merhcant Key
        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": mid,
            "websiteName": "WEBSTAGING",
            "orderId": orderId,
            // "callbackUrl": "http://localhost:3000/PaymentSuccessful",//"https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderId,
            "callbackUrl": "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderId,
            "txnAmount": {
                "value": amount,
                "currency": "INR",
            },
            "userInfo": {
                "custId": '1001',
            }
        };

        PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey).then(function (checksum) {
            // console.log(checksum);
            paytmParams.head = {
                "signature": checksum
            };
            // console.log('checksum:', checksum);
            var post_data = JSON.stringify(paytmParams);
            // console.log('post_data : ', post_data);

            var options = {
                /* for Staging */
                hostname: 'securegw-stage.paytm.in',

                /* for Production */
                // hostname: 'securegw.paytm.in',

                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            var response = "";
            var post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                    // console.log('in https.request', response);
                });
                // console.log('response : ', response);
                post_res.on('end', function () {
                    // console.log('Response: ', response);
                    // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
                    setPaymentData({
                        ...paymentData,
                        token: JSON.parse(response).body.txnToken,
                        order: orderId,
                        mid: mid,
                        amount: amount
                    })
                });
            });

            post_req.write(post_data);
            // console.log('Response: after post_data');

            post_req.end();
        });
    }

    const makePayment = () => {
        // console.log('in makePayment', paymentData);
        setLoading(true);
        var config = {
            "root": "",
            "style": {
                "bodyBackgroundColor": "#fafafb",
                "bodyColor": "",
                "themeBackgroundColor": "#0FB8C9",
                "themeColor": "#ffffff",
                "headerBackgroundColor": "#284055",
                "headerColor": "#ffffff",
                "errorColor": "",
                "successColor": "",
                "card": {
                    "padding": "",
                    "backgroundColor": ""
                }
            },
            "data": {
                "orderId": paymentData.order,
                "token": paymentData.token,
                "tokenType": "TXN_TOKEN",
                "amount": paymentData.amount /* update amount */
            },
            "payMode": {
                "labels": {},
                "filter": {
                    "exclude": []
                },
                "order": [
                    "CC",
                    "DC",
                    "NB",
                    "UPI",
                    "PPBL",
                    "PPI",
                    "BALANCE"
                ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
                "mid": paymentData.mid,
                "redirect": false//true
            },
            "handler": {
                "transactionStatus": function transactionStatus(paymentStatus) {
                    // console.log("paymentStatus => ", paymentStatus);
                    if (paymentStatus.STATUS === 'TXN_SUCCESS') {


                        navigate("/PaymentSuccessful", {
                            state: {
                                id: 1, participantDetails: participantDetails,
                                paymentObj: paymentStatus,
                                paymentStatus: 'Completed',
                                selectedCategory: categoryList,
                                updatePayment: true
                            }
                        });

                        window.Paytm.CheckoutJS.close();
                    }
                    else {
                        navigate("/PaymentFailed", {
                            state: {
                                id: 1, participantDetails: participantDetails,
                                paymentObj: paymentStatus,
                                paymentStatus: 'Completed',
                                selectedCategory: categoryList
                            }
                        });

                        window.Paytm.CheckoutJS.close();

                        // updatePaymentStatus(paymentStatus, 'Pending');

                    }
                    setLoading(false);
                },
                "notifyMerchant": function notifyMerchant(eventName, data) {
                    // console.log("Closed");
                    setLoading(false);
                }
            }
        };
        // console.log(window);
        // console.log(config);

        if (window.Paytm && window.Paytm.CheckoutJS) {
            // initialze configuration using init method
            // console.log(config);

            window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                // console.log(config);

                window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                    // console.log('Before JS Checkout invoke');
                    // after successfully update configuration invoke checkoutjs
                    window.Paytm.CheckoutJS.invoke();

                }).catch(function onError(error) {
                    console.log("Error => ", error);
                });
            });
        }
    }

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
                            <button className="btn form-control btn-primary" onClick={makePayment}>Pay Now</button>
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
