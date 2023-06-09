import React, { useState, useEffect } from 'react';
import '../css/UserProfiles.css';
import MemberList from './MemberList';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useUserAuth } from '../context/UserAuthcontext';
import { useNavigate } from 'react-router-dom';

import Loading from './Loading';

import useRazorpay from "react-razorpay";
import axios from 'axios';


export default function UserProfiles() {
    const { user } = useUserAuth();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});

    const [members, setMembers] = useState([]);
    const [allMemberList, setAllMemberList] = useState([]);
    const [participantList, setParticipantList] = useState([])
    const [eventList, setEventList] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [loading, setLoading] = useState(false)
    const [selectedEventActive, setSelectedEventActive] = useState('');
    const [showSideBar, setShowSideBar] = useState(false);
    const navigate = useNavigate();

    let playerDetails1;
    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };

    var options = {
        year: '2-digit',
        // year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    function setMemberListFromChild(memberlist, playerCode) {
        setMembers(memberlist);
        setSelectedPlayer(playerCode);
        // console.log('in userProfiles : playercode', playerCode);
        getRegisteredEvents(playerCode);
        // console.log('Members : ', members)
    }
    function getRegisteredEvents(playerID) {

        var para1 = {};
        para1 = {
            PlayerID: playerID,
        };
        setLoading(true);

        let refdate = '';
        const ret1 = httpsCallable(functions, "getAllRegisteredEventForPlayerCode");
        ret1(para1).then(async (result) => {
            result.data.eventDetails.forEach(event => {
                refdate = new Date(event.EventStartDate._seconds * 1000);
                event.EventSDate = refdate.toLocaleDateString("en-IN", options);
                event.Fees = event.MinimumFee ? (Number(event.MinimumFee).toLocaleString('en-IN', curFormat)) : "";

                refdate = new Date(event.EventEndDate._seconds * 1000);
                event.EventEDate = refdate.toLocaleDateString("en-IN", options);

            });
            setEventList(result.data.eventDetails);

            setParticipantList(result.data.entryDetails);
            // console.log(result.data);
            setLoading(false);
        });

    }
    // let dob = '';

    // async function getPlayerList() {
    //     var para1 = {};
    //     var setUser = '';
    //     if (user.isLoggedIn) {
    //         if (user.userInfo !== null) {
    //             para1 = {
    //                 userID: userDetails.id,
    //             };
    //             setLoading(true);
    //             let participant = {};
    //             let userParticipant = [];
    //             const ret1 = httpsCallable(functions, "getRegisteredParticant");
    //             ret1(para1).then(async (result) => {
    //                 result.data.forEach(async element => {
    //                     participant = {
    //                         id: element.id,
    //                         City: element.City,
    //                         Country: element.Country,
    //                         DateOfBirth: element.DateOfBirth,
    //                         District: element.District,
    //                         Email: element.Email,
    //                         Gender: element.Gender,
    //                         ParticipantID: element.ParticipantID,
    //                         Phone: element.Phone,
    //                         Pincode: element.Pincode,
    //                         State: element.State,
    //                         UserName: element.UserName,
    //                         UserID: element.UserID,
    //                         PlayerID: element.PlayerID,
    //                     };
    //                     if (setUser === '') {
    //                         setUser = element.PlayerID;

    //                     }

    //                     dob = (element.DateOfBirth) ? new Date(element.DateOfBirth._seconds * 1000) : '';
    //                     dob = dob === '' ? '' : dob.toLocaleDateString("en-IN", options);
    //                     userParticipant.push({
    //                         ...participant,
    //                         dob: dob,
    //                         searchKey: element.UserName + element.PlayerID
    //                     });

    //                 });

    //                 console.log(userParticipant);
    //                 setAllMemberList(userParticipant);
    //                 setSelectedPlayer(setUser);
    //                 setLoading(false);
    //             });
    //         } else {
    //             navigate("/PhoneSignUp", { state: { url: 'UserProfile' } });
    //         }
    //     }
    // }
    useEffect(() => {
        // getPlayerList();
        getRegisteredEvents(selectedPlayer);

    }, [selectedPlayer])

    function setSelectedMember(playerid) {
        setSelectedPlayer(playerid);
    }
    function eventChange(e) {
        // console.log('in eventChange ', e.target.value);
        setSelectedEventActive(e.target.value);
        // console.log('SelectedEventActive :: ', selectedEventActive);
    }

    async function WithdrawEntry(entry) {
        var catDel = [];
        catDel.push(entry.CategoryName);
        var para1 = {};
        para1 = {
            EventID: entry.EventID,
            PlayerID: entry.ParticipantID,
            DeleteCategoryList: catDel,
        };

        const ret1 = await httpsCallable(functions, "withdrawRegistration");
        ret1(para1).then(async (result) => {

        })

    }

    const handleRefund = async (entry) => {
        //uppdate the registration status as withdrawn
        setLoading(true);
        WithdrawEntry(entry);

        if (entry.PaymentStatus.toUpperCase() === 'COMPLETED') {
            try {
                const response = await axios.post(
                    `https://api.razorpay.com/v1/payments/${entry.TransactionID}/refund`,
                    {
                        amount: Number(entry.EntryDetails.Fees) * 100, // replace with the amount to be refunded
                        notes: {
                            reason: 'Registration withdrawn', // replace with the reason for the refund
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


            } catch (error) {
                console.log('error', error);
            }
            getRegisteredEvents(entry.ParticipantID);
            setLoading(false);
        }

    };


    async function ConfirmPayment(amount, transactionID, orderID, entry) {
        var catDel = [];
        catDel.push(entry.CategoryName);
        var para1 = {};
        para1 = {
            EventID: entry.EventID,
            PlayerID: entry.ParticipantID,
            CategoryList: catDel,
            paymentStatus: 'Completed',
            paymentAmount: amount,
            transactionID: transactionID,
            orderID: orderID,
        };

        const ret1 = await httpsCallable(functions, "updatePaymentStatus");
        ret1(para1).then(async (result) => {

            getRegisteredEvents(entry.ParticipantID);
        })

    }

    function handlePayment(entry, event, player) {
        let amount = 0;
        amount = Number(entry.Fees);
        setLoading(true);
        if (event.ConvenienceCharge > 0) {
            amount = amount + amount * Number(event.ConvenienceCharge) / 100;

        }
        if (event.MiscellaneousChargeFees > 0) {
            amount = amount + Number(event.MiscellaneousChargeFees);

        }
        // console.log('amout : ', amount);
        let orderId = 'O_' + event.EventCode + '_' + entry.ParticipantID + '_' + new Date().getTime();
        const razorpayOptions = {
            key: 'rzp_test_gaZqhFw4MY2o6v',
            amount: amount * 100, // amount in paise
            name: 'TPLiVE',
            description: 'Payment for TP Live',
            email: player.Email,
            contact: player.Phone,

            image: 'https://tplive-prod--tplive-test-dw5grchb.web.app/img/TPLiVE_Logo.webp',
            handler: function (response) {
                // console.log(response);
                ConfirmPayment(amount, response.razorpay_payment_id, orderId, entry)


            },
            prefill: {
                name: player.UserName,
                email: player.Email,
                contact: player.Phone,
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
    function openSideBar(flag) {
        setShowSideBar(flag);
    }
    let obj = {};
    let sDate = '';
    let fees = '';
    let convCharges = 0;
    let misCharges = 0;
    let totalFees = 0;
    let regCloseDate;
    let regWithdrawDate;
    let index = 0;
    // console.log('members : ', members);
    // console.log('selectedPlayer', selectedPlayer);
    playerDetails1 = members.find(e => e.PlayerID === selectedPlayer)
    // console.log('playerDetails1', playerDetails1);

    return (
        <div className='container-fluid'>
            <div className='row no-gutters'>
                <div className='col-lg-3 col-md-3 col-sm-12'>

                    <MemberList setMemberList={setMemberListFromChild}
                        openSideBar={openSideBar}
                        showSideBar={showSideBar}
                        selectedPlayer={selectedPlayer}>
                    </MemberList>
                    {/* <MemberList setMemberList={setMemberListFromChild} openSideBar={openSideBar} selectedPlayer={selectedPlayer} memberList={allMemberList} showSideBar={showSideBar}></MemberList> */}

                </div>
                {selectedPlayer !== '' && <div className='col-lg-9 col-md-9 col-sm-12'>
                    {loading && <Loading></Loading>}
                    <br />
                    {/* {console.log('selectedPlayer', selectedPlayer)} */}
                    <div style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => {
                        openSideBar(true);
                    }
                    }>
                        <div style={{ paddingRight: '10px' }} className='small' >
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        </div>
                        {/* {console.log(allMemberList)} */}
                        {/* {console.log(selectedPlayer)} */}
                        <h4>{playerDetails1 && playerDetails1.UserName} ({selectedPlayer})</h4>
                        <div style={{ paddingLeft: '5px' }} className='small'>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.7rem', transition: '1s', transform: showSideBar ? 'rotate(90deg)' : '' }}>
                                expand_more
                            </span>
                        </div>
                    </div>
                    <hr />

                    <select name="" className='user-profile-select' id="events"
                        onChange={e => setSelectedEventActive(e.target.value)} value={selectedEventActive}>
                        <option value="" >All</option>
                        {eventList && eventList.map((event) => {
                            if (event.EventStatus === 'Active')
                                return <option value={event.EventID} key={event.EventID}>{event.EventName}</option>
                            else
                                return null
                        })}

                    </select>

                    <br /><br />
                    <div className='row no-gutters'>
                        {participantList && participantList.map((participant) => {
                            obj = eventList.find(e => e.EventID === participant.EventID);
                            totalFees = Number(participant.Fees);
                            if (obj.ConvenienceCharge && obj.ConvenienceCharge > 0) {
                                convCharges = (totalFees * Number(obj.ConvenienceCharge) / 100)
                                totalFees = totalFees + convCharges;
                            }
                            if (obj.MiscellaneousChargeFees && obj.MiscellaneousChargeFees > 0) {
                                misCharges = Number(obj.MiscellaneousChargeFees);
                                totalFees = totalFees + misCharges;
                            }
                            regCloseDate = obj.RegistrationEndDate ? new Date(obj.RegistrationEndDate._seconds * 1000) : '';
                            regWithdrawDate = obj.WithdrawalEndDate ? new Date(obj.WithdrawalEndDate._seconds * 1000) : '';
                            // console.log('selectedEventActive : ', selectedEventActive, ' : ParticipantID :: ', participant.ParticipantID, ': selectedPlayer :: ', selectedPlayer)
                            if (obj.EventStatus === 'Active'
                                && (selectedEventActive === '' || selectedEventActive === participant.EventID)
                                && participant.ParticipantID === selectedPlayer) {
                                index = index + 1;
                                return <div className='col-lg-4 col-md-6 col-sm-12' key={participant.EventID + participant.PlayerID + participant.CategoryName}>
                                    <div className="event-list-card" style={{ height: '200px', borderColor: participant.PaymentStatus === 'Pending' ? 'orange' : 'green' }}>
                                        <div className="">
                                            <h1> {obj.EventName}</h1>
                                            <h2>{obj.OrganizationName}</h2>
                                            <h3>{obj.EventSDate} to {obj.EventEDate} | {obj.City}</h3>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>{participant.CategoryName}</h4>
                                            {regCloseDate !== '' && regCloseDate < new Date() && <h5 className='blink' style={{ position: 'absolute', bottom: '0', fontSize: '0.8rem', color: '#ff5757' }}>Registration is closed</h5>}
                                            {regCloseDate !== '' && regCloseDate > new Date() && regCloseDate < new Date(Date.now() + 120 * 3600 * 1000) && <h5 className='blink' style={{ position: 'absolute', bottom: '0', fontSize: '0.8rem', color: '#ff5757' }}>Registration is closing soon</h5>}
                                        </div>

                                        <div className="event-id">
                                            <h5>{obj.EventCode}</h5>
                                        </div>

                                        <div className="second-div">
                                            <div style={{ position: 'relative' }}>
                                                <h4 style={{ margin: '0', fontSize: '1.3rem' }}>₹ {totalFees}</h4>
                                                <span className="material-symbols-outlined user-profile-info-icon" style={{ fontSize: '0.9rem' }}>
                                                    info
                                                </span>
                                                <div className='user-profile-info-div'>
                                                    <div>
                                                        <small>Ticket Price</small>
                                                        <span>₹ {participant.Fees}</span>
                                                    </div>
                                                    {convCharges > 0 && <div>
                                                        <small>Convenience Charges</small>
                                                        <span>₹ {convCharges}</span>
                                                    </div>}

                                                    {misCharges > 0 && <div>
                                                        <small>{obj.MiscellaneousChargeRemark}</small>
                                                        <span>₹ {misCharges}</span>
                                                    </div>}
                                                    <div>
                                                        <small>Total</small>
                                                        <span>₹ {totalFees}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 style={{ fontSize: '0.6rem', color: '#666' }}>including all charges</h5>

                                            {participant.PaymentStatus === 'Completed' && <button className="mybutton button5" style={{ margin: '0', background: 'green', pointerEvents: 'none' }}>Paid</button>
                                            }
                                            {participant.PaymentStatus === 'Pending'
                                                && obj.PaymentOpenFlag && obj.PaymentOpenFlag.toUpperCase() === 'ON'
                                                && obj.PaymentMode && obj.PaymentMode.toUpperCase() === 'ONLINE'

                                                &&
                                                <>
                                                    <button className="mybutton button5" style={{ margin: '0', background: 'orange' }}
                                                        onClick={(e) => {
                                                            handlePayment(participant, obj, playerDetails1);
                                                        }
                                                        }
                                                    >Pay Now</button>
                                                    <br />
                                                </>
                                            }
                                            {participant.PaymentStatus === 'Pending' && obj.PaymentOpenFlag && obj.PaymentOpenFlag.toUpperCase() === 'OFF' && <button className="mybutton button5" style={{ margin: '0', background: 'orange', pointerEvents: 'none' }}  >Pending</button>
                                            }
                                            {regWithdrawDate !== '' && regWithdrawDate > new Date() && <button style={{ fontSize: '0.8rem', border: 'none', background: '#fff' }}
                                                onClick={(e) => {
                                                    if (window.confirm('Are you sure you wish to withdraw for "'
                                                        + participant.CategoryName + '" for Event : ' + obj.EventName)) {
                                                        handleRefund(participant, obj);
                                                    }
                                                }}><u style={{ color: '#348DCB' }}>Withdraw</u></button>}

                                        </div>

                                    </div>
                                    <br></br>
                                </div>
                            }
                            else {
                                return null
                            }
                        })}
                        {/* <div className='col-lg-4 col-md-4 col-sm-12'>

                        <div className="event-list-card" style={{ borderColor: 'orange' }}>
                            <div className="">
                                <h1>SBA Cup Badmiton Cup Hi Tournament 2022 BADMINTON Tournament</h1>
                                <h2>Sudhanshu Badminton Academy</h2>
                                <h3>29 Mar'22 to 3 Apr'22 | Banglore</h3>
                                <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>Boys Singles Under 15</h4>
                                <h5 className='blink' style={{ position: 'absolute', bottom: '0', fontSize: '0.8rem', color: '#ff5757' }}>Registration is closed</h5>
                            </div>

                            <div className="event-id">
                                <h5>TP_BD10196</h5>
                            </div>

                            <div className="second-div">
                                <div style={{ position: 'relative' }}>
                                    <h4 style={{ margin: '0', fontSize: '1.3rem' }}>₹ 10,250</h4>
                                    <span className="material-symbols-outlined user-profile-info-icon" style={{ fontSize: '0.9rem' }}>
                                        info
                                    </span>
                                    <div className='user-profile-info-div'>
                                        <div>
                                            <small>Ticket Price</small>
                                            <span>₹ 600</span>
                                        </div>
                                        <div>
                                            <small>Convenience Charges</small>
                                            <span>₹ 30</span>
                                        </div>
                                        <div>
                                            <small>Total</small>
                                            <span>₹ 630</span>
                                        </div>
                                    </div>
                                </div>
                                <h5 style={{ fontSize: '0.6rem', color: '#666' }}>including all charges</h5>
                                <button className="mybutton button5" style={{ margin: '0', background: 'orange' }}>Pay Now</button>
                                <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>

                            </div>
                        </div>

                        </div> */}

                        {/* <div className='col-lg-4 col-md-4 col-sm-12'>

                        <div className="event-list-card">
                            <div className="">
                                <h1>SBA Cup Badmiton Cup Hi Tournament 2022 BADMINTON Tournament</h1>
                                <h2>Sudhanshu Badminton Academy</h2>
                                <h3>29 Mar'22 to 3 Apr'22 | Banglore</h3>
                                <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>Boys Singles Under 15</h4>
                            </div>

                            <div className="event-id">
                                <h5>TP_BD10196</h5>
                            </div>

                            <div className="second-div">
                                <h4>₹ 10,250</h4>

                                <button className="mybutton button5" style={{ margin: '0', background: 'green' }}>Paid</button>
                                <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>

                            </div>
                        </div>

                        </div> */}

                    </div>

                    {(index <= 0) ? <>

                        <div className='event-page-error-message blink'>
                            <h1 style={{ color: '#ff5757' }}>No Registration for Selected member !!</h1>
                        </div>
                    </> : ""}

                    <br />
                    <hr />

                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        {/* <div style={{ position: 'relative', cursor: 'pointer' }} onclick> */}
                        <h4>Participation History</h4>
                        <span className="material-symbols-outlined user-profile-expand-more-arrow">
                            {/* <span className="material-symbols-outlined user-profile-expand-more-arrow" style={{ transform: 'translateY(-50%) rotate(180deg)' }}> */}
                            expand_more
                        </span>
                    </div>
                    <hr />

                    <div style={{ display: 'block' }}>
                        {/* <div style={{ display: 'block' }}> */}
                        <div className='user-profile-search'>
                            <input type="text" placeholder='Search Event Name' />
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </div>

                        <br />
                        <div className='row no-gutters'>
                            <div className='col-lg-4 col-md-4 col-sm-12'>

                                <div className="event-list-card">
                                    <div className="">
                                        {/* {console.log('memberlist : ', members)} */}
                                        <h1>SBA Cup Badmiton Cup Hi Tournament 2022 BADMINTON Tournament</h1>
                                        <h2>Sudhanshu Badminton Academy</h2>
                                        <h3>29 Mar'22 to 3 Apr'22 | Banglore</h3>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>Boys Singles Under 15</h4>
                                    </div>

                                    <div className="event-id">
                                        <h5>TP_BD10196</h5>
                                    </div>

                                    <div className="second-div">
                                        <h4>₹ 10,250</h4>
                                        {/* <div className=""
                                    style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div className="">
                                        <span style={{ color: 'green' }}>₹1,52,000</span><br />
                                        <small>( 525 )</small>
                                    </div>
                                    <span className="entries-pipe" style={{ fontWeight: 'lighter', fontSize: '2rem' }}>|</span>
                                    <div className="">
                                        <span style={{ color: 'orange' }}>₹1,10,000</span><br />
                                        <small>( 200 )</small>
                                    </div>
                                </div> */}

                                        <button className="mybutton button5" style={{ margin: '0', background: 'green' }}>Paid</button>
                                        <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <br />
                        <hr />
                    </div>


                </div>}

            </div>
        </div>
    )
}
