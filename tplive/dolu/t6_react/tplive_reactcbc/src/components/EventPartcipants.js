import React, { useEffect, useState } from 'react'

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import '../css/EventDetails.css'
// import { useLocation } from 'react-router-dom';

export default function EventPartcipants() {
    // let { state } = useLocation();
    //const { entryDetails } = state;
    const [loading, setLoading] = useState(false);
    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    // const [eventID, setEventID] = useState(window.localStorage.getItem("EventID") ? window.localStorage.getItem("EventID") : '');

    // const [participantCount, setParticipantCount] = useState(0);
    const [participantDetails, setParticipantDetails] = useState(null);
    const [uniqueParticipantDetails, setUniqueParticipantDetails] = useState(null);

    useEffect(() => {
        // console.log(eventDetails);

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
                    cnt = cnt + 1;
                    if (!uplayerList.find(e => e.ParticipantID === element.ParticipantID)) {
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
                // setParticipantCount(cnt);
                // console.log(participantDetails);
                // console.log(participantCount);
                setLoading(false);
            });
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="row no-gutters">
                    {eventDetails && <EventDetailsMenu eventDetails={eventDetails}
                        calledFrom='Participant'
                        participantCount={setUniqueParticipantDetails.length}
                        participantDetails={uniqueParticipantDetails}
                        isLoading={loading} />}
                    {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                </div>
            </div>
        </>
    )
}
