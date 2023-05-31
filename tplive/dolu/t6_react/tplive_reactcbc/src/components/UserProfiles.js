import React, { useState, useEffect } from 'react';
import '../css/UserProfiles.css';
import MemberList from './MemberList';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useUserAuth } from '../context/UserAuthcontext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../context/useLocalStorage";


// import { useNavigate } from 'react-router-dom';

// import Loading from './Loading';

// import useRazorpay from "react-razorpay";
import axios from 'axios';
import UserProfileRegisteredEvent from './UserProfileRegisteredEvent';
import NewMember from './NewMember';


export default function UserProfiles() {
    const { state } = useLocation();
    const { id, propsIsNew, propsSelectedPlayer } = undefined || state;
    // const { user } = useUserAuth();
    const { users, user } = useUserAuth();
    const [userID, setUserID] = useState();
    const [eventID, setEventID] = useState(window.localStorage.getItem("EventID") ? window.localStorage.getItem("EventID") : null);
    const [userDetails, setUserDetails] = useLocalStorage('userProfile', null);

    const navigate = useNavigate();

    // const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});

    const [stateObj, setStateObj] = useState({
        members: [],
        participantList: [],
        eventList: [],
        selectedPlayer: propsSelectedPlayer,
        selectedEventActive: '',
        showSideBar: false,
        addNewFlag: propsIsNew
    })

    const [loading, setLoading] = useState(false)
    // const [members, setMembers] = useState([]);
    // const [participantList, setParticipantList] = useState([])
    // const [eventList, setEventList] = useState([]);
    // const [selectedPlayer, setSelectedPlayer] = useState('');
    // const [selectedEventActive, setSelectedEventActive] = useState('');
    // const [showSideBar, setShowSideBar] = useState(false);
    // const [addNewFlag, setAddNewFlag] = useState(false);

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
    console.log('stateObj.addNewFlag : ', stateObj.addNewFlag)
    function setSelectedEventActive(flag) {

        console.log('stateObj.addNewFlag : ', stateObj)
        setStateObj({
            ...stateObj,
            selectedEventActive: flag
        })

    }
    async function getRegisteredEvents(playerID) {
        console.log('stateObj.addNewFlag : ', stateObj)
        var para1 = {};
        para1 = {
            PlayerID: playerID,
        };
        setLoading(true);
        console.log('in getRegisteredEvents playerID : ', playerID);
        let refdate = '';
        const ret1 = await httpsCallable(functions, "getAllRegisteredEventForPlayerCode");
        ret1(para1).then(async (result) => {
            result.data.eventDetails.forEach(async event => {
                refdate = new Date(event.EventStartDate._seconds * 1000);
                event.EventSDate = refdate.toLocaleDateString("en-IN", options);
                event.Fees = event.MinimumFee ? (Number(event.MinimumFee).toLocaleString('en-IN', curFormat)) : "";

                refdate = new Date(event.EventEndDate._seconds * 1000);
                event.EventEDate = refdate.toLocaleDateString("en-IN", options);

            });

            console.log('stateObj.addNewFlag : ', stateObj.addNewFlag)
            setStateObj({
                ...stateObj,
                participantList: result.data.entryDetails,
                eventList: result.data.eventDetails,
                // selectedPlayer: '',
                // selectedEventActive: '',
                // showSideBar: false,
                // addNewFlag: false
            })
            // setEventList(result.data.eventDetails);

            // setParticipantList(result.data.entryDetails);
            // console.log(result.data);
            setLoading(false);
        });

    }
    // useEffect(() => {
    //     navigate(".", { replace: true }); // <-- redirect to current path w/o state
    // }, [navigate]);

    useEffect(() => {
        // getPlayerList();

        console.log('stateObj.addNewFlag : ', stateObj.addNewFlag)
        if (user.isLoggedIn && userDetails !== null) {
            if (user.userInfo) {
                console.log('stateObj : ', stateObj)

                if (stateObj.selectedPlayer !== '') {
                    if (stateObj.addNewFlag) {
                        // setAddNewFlag(true);
                        setStateObj({
                            ...stateObj,
                            // participantList: result.data.entryDetails,
                            // eventList: result.data.eventDetails,
                            selectedPlayer: stateObj.selectedPlayer,
                            // selectedEventActive: '',
                            // showSideBar: false,
                            addNewFlag: true
                        })
                    } else {
                        setStateObj({
                            ...stateObj,
                            // participantList: result.data.entryDetails,
                            // eventList: result.data.eventDetails,
                            selectedPlayer: stateObj.selectedPlayer
                        })
                    }
                    // setSelectedPlayer(propsSelectedPlayer);
                    console.log('stateObj : ', stateObj);

                    userDetails && getRegisteredEvents(stateObj.selectedPlayer);

                }
                else {
                    // setSelectedPlayer('');
                    if (stateObj.addNewFlag) {
                        // setAddNewFlag(true);
                        setStateObj({
                            ...stateObj,
                            // participantList: result.data.entryDetails,
                            // eventList: result.data.eventDetails,
                            selectedPlayer: '',
                            // selectedEventActive: '',
                            // showSideBar: false,
                            // addNewFlag: true
                        })
                    } else {
                        setStateObj({
                            ...stateObj,
                            // participantList: result.data.entryDetails,
                            // eventList: result.data.eventDetails,
                            selectedPlayer: ''
                        })
                    }
                }
                console.log('propsIsNew : ', propsIsNew)
                console.log('addNewFlag : ', stateObj.addNewFlag)


                // console.log('in useEffect selectedPlayer=', selectedPlayer)
                // if (!addNewFlag) {
                // console.log('in useEffect before calling getRegisteredEvents selectedPlayer=', selectedPlayer)

                // getRegisteredEvents(selectedPlayer);

                // }
            }
        }
        else {
            navigate("/PhoneSignUp", { state: { url: 'UserProfile' } });
        }
    }, [user])


    function setSelectedMember(playerid) {
        // setSelectedPlayer(playerid);

        console.log('stateObj.addNewFlag : ', stateObj)
        setStateObj({
            ...stateObj,
            // participantList: result.data.entryDetails,
            // eventList: result.data.eventDetails,
            selectedPlayer: playerid,
            // selectedEventActive: '',
            // showSideBar: false,
            // addNewFlag: true
        })
    }
    function eventChange(e) {

        console.log('stateObj.addNewFlag : ', stateObj)
        // console.log('in eventChange ', e.target.value);
        // setSelectedEventActive(e.target.value);
        setStateObj({
            ...stateObj,
            // participantList: result.data.entryDetails,
            // eventList: result.data.eventDetails,
            // selectedPlayer: playerid,
            selectedEventActive: e.target.value,
            // showSideBar: false,
            // addNewFlag: true
        })
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
            console.log('stateObj.addNewFlag :: ', stateObj)
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

            image: 'https://tplive-prod--tplive-test-h1bjje65.web.app/img/TPLiVE_Logo.webp',
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
    //called from child start
    function setValuesFromChild(_showSideflag, _memberlist, _showAddflag, _playercode) {
        // setSelectedPlayer(playercode);
        // setShowSideBar(showSideflag);

        console.log('stateObj.addNewFlag : ', stateObj)
        console.log('showSideflag : ', _showSideflag, ' memberlist : ', _memberlist, 'showAddflag : ', _showAddflag, 'playercode : ', _playercode);
        // setMembers(memberlist);
        if (_showAddflag === true && _playercode !== '') {
            console.log('in option 1');
            // setAddNewFlag(showAddflag);
            setStateObj({
                ...stateObj,
                members: _memberlist,
                // participantList: result.data.entryDetails,
                // eventList: result.data.eventDetails,
                selectedPlayer: _playercode,
                // selectedEventActive: e.target.value,
                showSideBar: _showSideflag,
                addNewFlag: _showAddflag
            })

        } else if (_showAddflag === true && _playercode === '') {
            console.log('in option 2');
            // setAddNewFlag(showAddflag);
            // setSelectedPlayer('');
            setStateObj({
                ...stateObj,

                members: _memberlist,
                // participantList: result.data.entryDetails,
                // eventList: result.data.eventDetails,
                selectedPlayer: '',
                // selectedEventActive: e.target.value,
                showSideBar: _showSideflag,
                addNewFlag: _showAddflag
            })

        } else if (_showAddflag === false && _playercode === '' && stateObj.participantList && stateObj.participantList[0] && stateObj.participantList[0].PlayerID !== '') {
            console.log('in option 3', stateObj.participantList[0].PlayerID);
            // setSelectedPlayer(participantList[0].PlayerID);
            // setAddNewFlag(showAddflag);

            setStateObj({
                ...stateObj,

                members: _memberlist,
                // participantList: result.data.entryDetails,
                // eventList: result.data.eventDetails,
                selectedPlayer: stateObj.participantList[0].PlayerID,
                // selectedEventActive: e.target.value,
                showSideBar: _showSideflag,
                addNewFlag: _showAddflag
            })
            getRegisteredEvents(stateObj.participantList && stateObj.participantList[0] && stateObj.participantList[0].PlayerID);
        } else {
            console.log('in option 4, _showAddflag:', _showAddflag, ":: _playercode : ", _playercode, ":: _showSideflag : ", _showSideflag, ":: _memberlist : ", _memberlist);
            // setAddNewFlag(showAddflag);
            console.log('in option 555, howAddflag:', stateObj);

            setStateObj({
                ...stateObj,
                members: _memberlist,
                selectedPlayer: _playercode,
                showSideBar: _showSideflag,
                addNewFlag: false
            })
            // setSelectedPlayer('');
        }
        console.log('in option 444, howAddflag:', stateObj);

        getRegisteredEvents(_playercode);
    }
    function openSideBar(flag) {
        // setShowSideBar(flag);

        console.log('stateObj.addNewFlag : ', stateObj)
        setStateObj({
            ...stateObj,

            // members: _memberlist,
            // participantList: result.data.entryDetails,
            // eventList: result.data.eventDetails,
            // selectedPlayer: _playercode,
            // selectedEventActive: e.target.value,
            showSideBar: flag,
            // addNewFlag: _showAddflag
        })
    }

    function setMemberListFromChild(memberlist, playerCode) {
        // setMembers(memberlist);
        // setSelectedPlayer(playerCode);

        console.log('stateObj.addNewFlag : ', stateObj)
        setStateObj({
            ...stateObj,
            members: memberlist,
            selectedPlayer: playerCode
        })
        // console.log('in userProfiles : playercode', playerCode);
        getRegisteredEvents(playerCode);
        // console.log('Members : ', members)
    }
    function addNewMember(flag, playercode) {

        console.log('stateObj.addNewFlag : ', stateObj)
        console.log('flag :: ', flag);
        // console.log('in addNewMember flag=', flag, ',playercode=', playercode)
        if (flag === true && playercode !== '') {
            // console.log('in option 1');
            // setSelectedPlayer(playercode);
            // setAddNewFlag(flag);
            setStateObj({
                ...stateObj,
                selectedPlayer: playercode,
                addNewFlag: flag
            })
        } else if (flag === true && playercode === '') {
            // setSelectedPlayer('');
            // setAddNewFlag(flag);

            setStateObj({
                ...stateObj,
                selectedPlayer: '',
                addNewFlag: flag
            })
        } else if (flag === false && playercode === '') {
            // setSelectedPlayer('');
            // console.log(participantList);
            // setAddNewFlag(flag);
            if (stateObj.participantList && stateObj.participantList.length > 0) {
                // setSelectedPlayer(stateObj.participantList[0].ParticipantID);
                setStateObj({
                    ...stateObj,
                    selectedPlayer: stateObj.participantList[0].ParticipantID,
                    addNewFlag: flag
                })
                getRegisteredEvents(stateObj.participantList && stateObj.participantList[0] && stateObj.participantList[0].ParticipantID);

            } else {
                setStateObj({
                    ...stateObj,
                    addNewFlag: flag
                })
            }

        }
        // else if (flag === false && participantList && participantList[0] && participantList[0].PlayerID !== '') {
        //     console.log('in option 2');
        //     setSelectedPlayer(participantList[0].PlayerID);
        //     setAddNewFlag(flag);

        //     getRegisteredEvents(participantList && participantList[0] && participantList[0].PlayerID);
        // }
        else {
            // console.log('in option 3');
            // setAddNewFlag(flag);

            setStateObj({
                ...stateObj,
                addNewFlag: flag
            })
            // setSelectedPlayer('');
        }
    }

    //called from child end
    // let obj = {};
    // let sDate = '';
    // let fees = '';
    // let convCharges = 0;
    // let misCharges = 0;
    // let totalFees = 0;
    // let regCloseDate;
    // let regWithdrawDate;
    // let index = 0;
    // console.log('members : ', members);
    // console.log('selectedPlayer', selectedPlayer);
    playerDetails1 = stateObj.members.find(e => e.PlayerID === stateObj.selectedPlayer)
    // console.log('playerDetails1', playerDetails1);
    console.log('stateObj : ', stateObj);
    return (
        <div className='container-fluid'>
            <div className='row no-gutters'>
                <div className='col-lg-3 col-md-3 col-sm-12'>

                    <MemberList setMemberList={setMemberListFromChild}
                        openSideBar={openSideBar}
                        showSideBar={stateObj.showSideBar}
                        addNewMember={addNewMember}
                        addNewFlag={stateObj.addNewFlag}
                        selectedPlayer={stateObj.selectedPlayer}
                        setValuesFromChild={setValuesFromChild}
                    ></MemberList>
                    {/* <MemberList setMemberList={setMemberListFromChild} openSideBar={openSideBar} selectedPlayer={selectedPlayer} memberList={allMemberList} showSideBar={showSideBar}></MemberList> */}

                </div>
                <div className='col-lg-9 col-md-9 col-sm-12'>
                    {stateObj.addNewFlag && <>

                        <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>{stateObj.selectedPlayer === '' ? 'Add Member' : 'Edit Member (' + stateObj.selectedPlayer + ')'}</h3>

                        <NewMember selectedPlayer={stateObj.selectedPlayer} addNewMember={stateObj.addNewMember}></NewMember>
                    </>}
                    {/* {console.log('selectedPlayer : ', selectedPlayer)} */}
                    {stateObj.selectedPlayer !== '' &&
                        <UserProfileRegisteredEvent
                            selectedPlayer={stateObj.selectedPlayer}
                            loading={loading}
                            playerDetails1={playerDetails1}
                            showSideBar={stateObj.showSideBar}
                            setSelectedEventActive={setSelectedEventActive}
                            selectedEventActive={stateObj.selectedEventActive}
                            eventList={stateObj.eventList}
                            handlePayment={handlePayment}
                            handleRefund={handleRefund}
                            participantList={stateObj.participantList}></UserProfileRegisteredEvent>
                    }

                </div>


            </div>
        </div>
    )
}
