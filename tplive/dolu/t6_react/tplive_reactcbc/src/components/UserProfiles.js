import React, { useState, useEffect } from 'react';
import '../css/UserProfiles.css';
import MemberList from './MemberList';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import Loading from './Loading';

export default function UserProfiles() {
    const [members, setMembers] = useState([]);
    const [participantList, setParticipantList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [loading, setLoading] = useState(false)
    const [selectedEventActive, setSelectedEventActive] = useState('');
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

    function setMemberList(memberlist, playerCode) {
        setMembers(memberlist);
        setSelectedPlayer(playerCode);
        getRegisteredEvents(playerCode);
    }
    function getRegisteredEvents(playerID) {

        var para1 = {};
        para1 = {
            PlayerID: playerID,
        };
        setLoading(true);
        let participant = {};

        let userParticipant = [];
        let refdate = '';
        let eventSDate = '';
        let fees = '';
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
    useEffect(() => {
        getRegisteredEvents(selectedPlayer);
    }, [selectedPlayer])

    function setSelectedMember(playerid) {
        setSelectedPlayer(playerid);
    }
    function eventChange(e) {
        // console.log('in eventChange ', e.target.value);
        setSelectedEventActive(e.target.value);
        console.log('SelectedEventActive :: ', selectedEventActive);
    }
    let obj = {};
    let sDate = '';
    let fees = '';
    let convCharges = 0;
    let misCharges = 0;
    let totalFees = 0;
    let regCloseDate;
    let regWithdrawDate;
    // console.log('selectedPlayer : ', selectedPlayer);
    let playerDetails1 = participantList.find(e => e.ParticipantID === selectedPlayer);
    // console.log(playerDetails1);
    return (
        <div className='row no-gutters'>
            <div className='col-lg-3 col-md-3 col-sm-12'>
                <MemberList setMemberList={setMemberList}></MemberList>

            </div>
            {selectedPlayer !== '' && <div className='col-lg-9 col-md-9 col-sm-12'>
                {loading && <Loading></Loading>}
                <br />
                {/* {console.log('selectedPlayer', selectedPlayer)} */}
                <h4>{playerDetails1 && playerDetails1.ParticipantName} ({selectedPlayer})</h4>
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
                        console.log('selectedEventActive : ', selectedEventActive, ' : ParticipantID :: ', participant.ParticipantID, ': selectedPlayer :: ', selectedPlayer)
                        if (obj.EventStatus === 'Active'
                            && (selectedEventActive === '' || selectedEventActive === participant.EventID)
                            && participant.ParticipantID === selectedPlayer) {

                            return <div className='col-lg-4 col-md-4 col-sm-12' key={participant.EventID + participant.PlayerID + participant.CategoryName}>
                                <div className="event-list-card" style={{ borderColor: participant.PaymentStatus === 'Pending' ? 'orange' : 'green' }}>
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

                                            && <button className="mybutton button5" style={{ margin: '0', background: 'orange' }}>Pay Now</button>
                                        }
                                        {participant.PaymentStatus === 'Pending' && obj.PaymentOpenFlag && obj.PaymentOpenFlag.toUpperCase() === 'OFF' && <button className="mybutton button5" style={{ margin: '0', background: 'orange', pointerEvents: 'none' }}  >Pending</button>
                                        }
                                        {regWithdrawDate !== '' && regWithdrawDate > new Date() && <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>}

                                    </div>

                                </div>
                                <br></br>
                            </div>
                        }
                        else {
                            return null
                        }
                    })}
                    <div className='col-lg-4 col-md-4 col-sm-12'>

                        <div className="event-list-card" style={{ borderColor: 'orange' }}>
                            <div className="">
                                {/* {console.log('memberlist : ', members)} */}
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

                                <button className="mybutton button5" style={{ margin: '0', background: 'orange' }}>Pay Now</button>
                                <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>

                            </div>
                        </div>

                    </div>

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

                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    {/* <div style={{ position: 'relative', cursor: 'pointer' }} onclick> */}
                    <h4>Participation History</h4>
                    <span class="material-symbols-outlined user-profile-expand-more-arrow">
                        {/* <span class="material-symbols-outlined user-profile-expand-more-arrow" style={{ transform: 'translateY(-50%) rotate(180deg)' }}> */}
                        expand_more
                    </span>
                </div>
                <hr />

                <div style={{ display: 'none' }}>
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
    )
}
