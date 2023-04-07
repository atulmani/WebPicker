import React, { useState, useEffect } from 'react'
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EDAboutEvent from './EDAboutEvent'
import Loading from './Loading'
import '../css/EventDetails.css'
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from 'react-router-dom';

// import { useParams } from 'react-router-dom'

export default function EventDetails() {
    const { state } = useLocation();
    const { eventID, eventDetails, entryCount } = state;
    const [loading, setLoading] = useState(true);
    const [uniqueParticipantDetails, setUniqueParticipantDetails] = useState([]);
    const [participantDetails, setParticipantDetails] = useState([]);
    const [participantCount, setParticipantCount] = useState(0);

    // const [eventDetails, setEventDetails] = useState(null);
    useEffect(() => {
        // console.log(eventID);
        // console.log(eventDetails);
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid;
                // ...
                // console.log("uid", uid)
            } else {
                // User is signed out
                // ...
                // console.log("user is logged out")
            }
        })
        var para1 = {};
        async function fetchData() {
            setLoading(true);
            para1 = {
                EventID: eventDetails.Eventid
            };
            // console.log(eventID);
            var uplayerList = [];
            const ret1 = httpsCallable(functions, "getParticipants");
            ret1(para1).then(async (result) => {
                var cnt = 0;
                // var ele = {};
                // console.log(result.data);
                result.data.forEach(element => {
                    if (!uplayerList.find(e => e.ParticipantID === element.ParticipantID)) {
                        cnt = cnt + 1;

                        uplayerList.push({
                            ParticipantID: element.ParticipantID,
                            PlayerName: element.ParticipantName,
                            ParticipantUserID: element.PlayerUserID
                        })
                    }
                    if (element.PartnerPlayerID !== '') {
                        if (!uplayerList.find(e => e.ParticipantID === element.PartnerPlayerID)) {
                            uplayerList.push({
                                ParticipantID: element.PartnerPlayerID,
                                PlayerName: element.PartnerPlayerName,
                                ParticipantUserID: ''
                            })
                        }
                    }

                });

                setUniqueParticipantDetails(uplayerList);
                setParticipantDetails(result.data);
                setParticipantCount(cnt);
                // console.log(participantDetails);
                // console.log(participantCount);
                setLoading(false);
            });

        }
        fetchData();
    }, []);

    return (

        <div className="container-fluid">
            {/* {loading && <Loading />} */}

            <div className="row no-gutters">
                {eventDetails && <EventDetailsMenu calledFrom='Details'
                    eventDetails={eventDetails}
                    entryCount={entryCount}
                    uniqueParticipantDetails={uniqueParticipantDetails}
                    participantDetails={participantDetails}
                    participantCount={participantCount}
                />}
                {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                {eventDetails && <EDAboutEvent eventDetails={eventDetails} />}
            </div>
            <br></br>
        </div >
    )
}
