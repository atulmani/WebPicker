import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import RenderRegisteredCategoryCard from './RenderRegisteredCategoryCard';


export default function UsersEvents() {
    const { state } = useLocation();
    const { playerDetails } = state;

    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [participantList, setParticipantList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
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
    function populateData() {

        var para1 = {};
        para1 = {
            PlayerID: playerDetails.PlayerID,
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

            });
            setEventList(result.data.eventDetails);

            setParticipantList(result.data.entryDetails);

            setLoading(false);
        });

    }
    useEffect(() => {

        if (user.isLoggedIn && userDetails !== null) {
            if (user.userInfo !== null) {
                populateData();
            } else {
                navigate("/PhoneSignUp", { state: { url: 'UserProfile' } });
            }
        }
    }, [])
    function refreshParent() {
        setRefresh(!refresh);
        populateData();
    }
    function showRegisteredEvent(event) {
        setSelectedEvent(event.EventID);
    }
    let obj = {};
    let sDate = '';
    let fees = '';
    return (
        <div>
            <br></br>
            <div >
                <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>Registered Events</h3>
                <h1 className="reg-form-email" id="playerName">{playerDetails.UserName} ({playerDetails.PlayerID})</h1>
                {playerDetails.Gender.toUpperCase() === 'FEMALE' && <h5 className="reg-form-email female" id="playerGender">FEMALE</h5>}
                {playerDetails.Gender.toUpperCase() === 'MALE' && <h5 className="reg-form-email male" id="playerGender">MALE</h5>}
                <br />
            </div>

            {loading && <Loading ></Loading>}

            <div className='container'>
                <div className="row no-gutters">
                    {eventList && eventList.map((event) => {
                        return <div key={event.EventID} className="col-lg-4 col-md-6 col-sm-12">
                            <div className="item" style={{ margin: '10px' }}>
                                <div className="event-card" style={{ cursor: 'pointer' }} onClick={() => showRegisteredEvent(event)}>

                                    <div className="event-card-content" style={{ background: '#eee', height: '190px', paddingTop: '10px', top: '0' }}>
                                        <h1 className="event-name">{event.EventName}</h1>
                                        <h2 className="event-organiser">{event.OrganizationName}</h2>

                                        <div className="event-schedule-div">
                                            <div className="details">
                                                <div className="">
                                                    <h3>{event.City}</h3>
                                                    <h4>Location</h4>
                                                </div>
                                                <div className="">
                                                    <h3>{event.EventSDate}</h3>
                                                    <h4>Starting Date</h4>
                                                </div>
                                                <div className="">
                                                    <h3>{event.Fees}</h3>
                                                    <h4>Entry Fee</h4>
                                                </div>
                                            </div>

                                            <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid #ddd' }}>
                                                <span style={{ position: 'relative', top: '2px', fontSize: '0.9rem' }}>
                                                    <strong style={{ color: '#348DCB' }}>5%</strong> Commisionn Charges | <strong style={{ color: '#348DCB' }}>30rs.</strong> Registration Charges
                                                </span>
                                            </div>

                                            {/* <div className="row">
                                            <div className="col-5">
                                                <button type="button" className="mybutton button5 event-card-button" name="button">Details</button>
                                            </div>
                                            <div className="col-7">
                                                <button type="button" className="mybutton button5 event-card-button entries"
                                                    style={{ background: 'none', border: '2px solid #ddd', color: '#aaa' }} name="button">
                                                    <img src="./img/multipleuser.png" alt="" />
                                                    132
                                                </button>
                                            </div>
                                        </div> */}

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    })}

                    {/* <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="item" style={{ margin: '30px 0 100px 0' }}>
                            <a href="#event-new" className="event-card">

                                <div className="event-card-content" style={{ background: '#eee', height: 'auto', paddingTop: '10px', paddingBottom: '50px' }}>
                                    <h1 className="event-name">Prakash Padukone Badminton Tournament 2022 Badminton Tournament</h1>
                                    <h2 className="event-organiser">Prakash Padukone Badminton Academy</h2>
                                    
                                    <div className="event-schedule-div">
                                        <div className="details">
                                            <div className="">
                                                <h3>Chennai</h3>
                                                <h4>Location</h4>
                                            </div>
                                            <div className="">
                                                <h3>12 Jun 2022</h3>
                                                <h4>Starting Date</h4>
                                            </div>
                                            <div className="">
                                                <h3>₹ 600</h3>
                                                <h4>Entry Fee</h4>
                                            </div>
                                        </div>

                                    

                                    </div>

                                </div>

                            </a>
                        </div>
                    </div> */}
                </div>
            </div>

            <hr></hr>
            <div className='container-fluid'>
                <div className="row no-gutters">

                    {participantList && participantList.map((participant) => {
                        //  return <RenderRegisteredCategoryCard key=>

                        obj = eventList.find(e => e.EventID === participant.EventID);
                        if (selectedEvent === '' || selectedEvent === participant.EventID)
                            return <RenderRegisteredCategoryCard key={participant.EventID + participant.CategoryName}
                                EventDetails={obj}
                                EntryDetails={participant}
                                playerDetails={playerDetails}
                                refreshParent={refreshParent}></RenderRegisteredCategoryCard>
                        else
                            return null;
                        // return <div key={participant.EventID + participant.CategoryName} className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0px' }} >
                        //     <div style={{ padding: '10px' }}>
                        //         <div className="event-registration-participant-card"
                        //             onClick={() => showRegisteredEvent(participant)}>
                        //             <div className="participant-name-div">

                        //                 <div>
                        //                     <h1>{participant.CategoryName}</h1>

                        //                     <h1>{participant.EventID}</h1>
                        //                 </div>
                        //             </div>
                        //             <div className="participant-card-arrow">
                        //                 <span className="material-symbols-outlined">
                        //                     chevron_right
                        //                 </span>
                        //             </div>
                        //         </div>
                        //     </div>

                        // </div>
                    })}
                </div>
            </div>
            <br></br>
            <hr></hr>

        </div>
    )
}
