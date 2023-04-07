import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import '../css/EventDetails.css'

// import { useLocation } from 'react-router-dom';

export default function EventPartcipants() {
    const { state } = useLocation();
    const { calledFrom, eventDetails, entryCount, uniqueParticipantDetails, participantDetails, participantCount } = state;

    const [loading, setLoading] = useState(false);
    // const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    // const [eventID, setEventID] = useState(window.localStorage.getItem("EventID") ? window.localStorage.getItem("EventID") : '');

    // const [participantCount, setParticipantCount] = useState(0);
    // const [participantDetails, setParticipantDetails] = useState(null);
    // const [uniqueParticipantDetails, setUniqueParticipantDetails] = useState(null);

    useEffect(() => {
        // console.log(eventDetails);

        var para1 = {};
        async function fetchData() {
            setLoading(true);
            // para1 = {
            //     EventID: eventDetails.Eventid
            // };
            // // console.log(eventID);
            // var uplayerList = [];
            // const ret1 = httpsCallable(functions, "getParticipants");
            // ret1(para1).then(async (result) => {
            //     var cnt = 0;
            //     // var ele = {};
            //     // console.log(result.data);
            //     result.data.forEach(element => {
            //         cnt = cnt + 1;
            //         if (!uplayerList.find(e => e.ParticipantID === element.ParticipantID)) {
            //             uplayerList.push({
            //                 ParticipantID: element.ParticipantID,
            //                 PlayerName: element.ParticipantName,
            //                 ParticipantUserID: element.PlayerUserID
            //             })
            //         }
            //         if (element.PartnerPlayerID !== '') {
            //             if (!uplayerList.find(e => e.ParticipantID === element.PartnerPlayerID)) {
            //                 uplayerList.push({
            //                     ParticipantID: element.PartnerPlayerID,
            //                     PlayerName: element.PartnerPlayerName,
            //                     ParticipantUserID: ''
            //                 })
            //             }
            //         }

            //     });

            // setUniqueParticipantDetails(uplayerList);
            // setParticipantDetails(result.data);
            // // setParticipantCount(cnt);
            // console.log(participantDetails);
            // console.log(participantCount);
            setLoading(false);
            // });
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="container-fluid">

                <div className="row no-gutters">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

                        {eventDetails && <EventDetailsMenu calledFrom='Participant'
                            eventID={eventDetails.Eventid}
                            eventDetails={eventDetails}
                            entryCount={entryCount}
                            uniqueParticipantDetails={uniqueParticipantDetails}
                            participantDetails={participantDetails}
                            participantCount={participantCount}
                        />}

                        <div>

                            <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                                <div className="heading">
                                    <span className="material-symbols-outlined">
                                        groups
                                    </span>
                                    <h4 style={{ fontWeight: '1000' }}>Total Participant : {participantDetails ? participantDetails.length : 0}</h4>
                                </div>
                                <br></br>

                                <hr />
                                <div className="heading">
                                    <div className="row no-gutters">
                                        {eventDetails && eventDetails.CategoryDetails && eventDetails.CategoryDetails.map((cat) => {
                                            return <div className="col-lg-4 col-md-3 col-sm-12" key={cat.CategoryName}>
                                                <h5 style={{ fontWeight: '1000' }}> <Link to="/EventCategoryPartcipants" state={{ categoryName: cat.CategoryName }} >{cat.CategoryName} </Link>
                                                </h5>

                                            </div>

                                        })}
                                    </div>

                                </div>

                                <br />
                                <hr></hr>
                                <div className="row no-gutters">
                                    {participantDetails && participantDetails.map((player) => {
                                        return <div className="col-lg-4 col-md-4 col-sm-12" key={player.ParticipantID}>
                                            <Link to="/PlayerParticipation" state={{
                                                playerID: player.ParticipantID,
                                                eventID: eventDetails.Eventid,
                                                playerUserID: player.playerUserID
                                            }}>{player.PlayerName} </Link>


                                        </div>

                                    })}

                                    {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

                                </div>
                            </div>
                        </div>

                    </div>

                    {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                    {/* {eventDetails && <EDAboutEvent eventDetails={eventDetails} />} */}
                </div>
            </div>
            {/* <div className="container-fluid">
                <div className="row no-gutters">
                    {eventDetails && <EventDetailsMenu eventDetails={eventDetails}
                        calledFrom='Participant'
                        participantCount={setUniqueParticipantDetails.length}
                        participantDetails={uniqueParticipantDetails}
                        isLoading={loading} />}
                    {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                </div>
            </div> */}
        </>
    )
}
