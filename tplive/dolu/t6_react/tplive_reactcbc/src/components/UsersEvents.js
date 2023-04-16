import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate, useLocation } from 'react-router-dom';


export default function UsersEvents() {
    const { state } = useLocation();
    const { playerDetails } = state;

    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [participantList, setParticipantList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        var para1 = {};

        if (user.isLoggedIn) {
            if (user.userInfo !== null) {
                para1 = {
                    PlayerID: playerDetails.PlayerID,
                };
                console.log(para1);
                setLoading(true);
                let participant = {};

                let userParticipant = [];

                const ret1 = httpsCallable(functions, "getAllRegisteredEventForPlayerCode");
                ret1(para1).then(async (result) => {
                    console.log(result);
                    setEventList(result.data.eventDetails);
                    setParticipantList(result.data.entryDetails);

                    setLoading(false);
                });

            } else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
    }, [])

    function showRegisteredEvent(participant) {

    }
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

            {loading && <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_9yosyj7r.json" background="transparent" speed="1" loop autoplay></lottie-player>}

            <div className='container'>
                <div className="row no-gutters">

                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="item" style={{ margin: '30px 0 100px 0' }}>
                            <a href="#event-new" className="event-card">
                                {/* <div className="event-card-img">
                                    <img src="img/eventnew2.png" alt="" />
                                </div> */}

                                <div className="event-card-content" style={{ background: '#eee', height: 'auto', paddingTop: '10px', paddingBottom: '50px' }}>
                                    <h1 className="event-name">Prakash Padukone Badminton Tournament 2022 Badminton Tournament</h1>
                                    <h2 className="event-organiser">Prakash Padukone Badminton Academy</h2>
                                    {/* <h3 className="rating">
                                        <div className="">
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star_half</span>
                                            <span className="material-symbols-outlined grade">grade</span>
                                        </div>
                                        <small>1,724</small>
                                    </h3> */}

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

                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="item" style={{ margin: '30px 0 100px 0' }}>
                            <a href="#event-new" className="event-card">
                                {/* <div className="event-card-img">
                                    <img src="img/eventnew2.png" alt="" />
                                </div> */}

                                <div className="event-card-content" style={{ background: '#eee', height: 'auto', paddingTop: '10px', paddingBottom: '50px' }}>
                                    <h1 className="event-name">Prakash Padukone Badminton Tournament 2022 Badminton Tournament</h1>
                                    <h2 className="event-organiser">Prakash Padukone Badminton Academy</h2>
                                    {/* <h3 className="rating">
                                        <div className="">
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star_half</span>
                                            <span className="material-symbols-outlined grade">grade</span>
                                        </div>
                                        <small>1,724</small>
                                    </h3> */}

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

                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {eventList && eventList.map((event) => {
                return <div key={event.EventID} className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0px' }} >
                    <div style={{ padding: '10px' }}>
                        <div className="event-registration-participant-card"
                            onClick={() => showRegisteredEvent(event)}>
                            <div className="participant-name-div">

                                <div>
                                    <h1>{event.EventName}</h1>
                                </div>
                            </div>
                            <div className="participant-card-arrow">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            })}
            <hr></hr>

            {participantList && participantList.map((participant) => {
                return <div key={participant.EventID + participant.CategoryName} className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0px' }} >
                    <div style={{ padding: '10px' }}>
                        <div className="event-registration-participant-card"
                            onClick={() => showRegisteredEvent(participant)}>
                            <div className="participant-name-div">

                                <div>
                                    <h1>{participant.CategoryName}</h1>

                                    <h1>{participant.EventID}</h1>
                                </div>
                            </div>
                            <div className="participant-card-arrow">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            })}

            <br></br>
            <hr></hr>

        </div>
    )
}
