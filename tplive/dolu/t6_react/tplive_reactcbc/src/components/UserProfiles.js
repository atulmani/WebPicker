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
import UserProfileRegisteredEvent from './UserProfileRegisteredEvent';
import NewMember from './NewMember';


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
    const [addNewFlag, setAddNewFlag] = useState(false);
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
    //             navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
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
    function addNewMember(flag) {

        setAddNewFlag(flag);
        if (flag === false && participantList && participantList[0] && participantList[0].PlayerID !== '') {
            setSelectedPlayer(participantList[0].PlayerID);
            getRegisteredEvents(participantList && participantList[0] && participantList[0].PlayerID);
        }
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
                        addNewMember={addNewMember}
                        setSelectedMember={setSelectedMember}></MemberList>
                    {/* <MemberList setMemberList={setMemberListFromChild} openSideBar={openSideBar} selectedPlayer={selectedPlayer} memberList={allMemberList} showSideBar={showSideBar}></MemberList> */}

                </div>
                <div className='col-lg-9 col-md-9 col-sm-12'>
                    {addNewFlag && <NewMember selectedPlayer={selectedPlayer} addNewMember={addNewMember}></NewMember>}
                    {selectedPlayer !== '' &&
                        <UserProfileRegisteredEvent
                            selectedPlayer={selectedPlayer}
                            loading={loading}
                            playerDetails1={playerDetails1}
                            showSideBar={showSideBar}
                            setSelectedEventActive={setSelectedEventActive}
                            selectedEventActive={selectedEventActive}
                            eventList={eventList}
                            handlePayment={handlePayment}
                            handleRefund={handleRefund}
                            participantList={participantList}></UserProfileRegisteredEvent>
                    }

                </div>


            </div>
        </div>
    )
}
