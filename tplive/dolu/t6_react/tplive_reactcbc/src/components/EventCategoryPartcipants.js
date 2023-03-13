import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import EventDetailsMenu from './EventDetailsMenu';
import EDTournamentDetails from './EDTournamentDetails';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";

export default function EventCategoryPartcipants() {
    let { state } = useLocation();
    const { categoryName } = state;
    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    const [eventID, setEventID] = useState(window.localStorage.getItem("EventID") ? window.localStorage.getItem("EventID") : '');
    const [participantDetails, setParticipantDetails] = useState(null);
    useEffect(() => {
        // console.log(eventDetails);
        var para1 = {};
        async function fetchData() {
            para1 = {
                EventID: eventDetails.Eventid,
                CategoryName: categoryName
            };
            // console.log(para1);
            var uplayerList = [];
            const ret1 = httpsCallable(functions, "getParticipantsWithCategoryName");
            ret1(para1).then(async (result) => {
                setParticipantDetails(result.data);
                // console.log(result.data);
            });
        }
        fetchData();
    }, [categoryName]);



    return (
        <div className="container-fluid">

            <div className="row no-gutters">

                {eventDetails && <EventDetailsMenu eventDetails={eventDetails} calledFrom='EventCategoryPartcipants' participantDetails={participantDetails} categoryName={categoryName} />}

                {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}

            </div>
        </div>

    )
}
