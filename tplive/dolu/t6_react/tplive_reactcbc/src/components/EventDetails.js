import React, { useState, useEffect } from 'react'

import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EDAboutEvent from './EDAboutEvent'
import '../css/EventDetails.css'
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

export default function EventDetails(props) {
    const [eventDetails, setEventDetails] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
            }
        })
        var para1 = {};
        // console.log(props.eventID);
        async function fetchData() {
            para1 = {
                EventID: props.eventID
            };
            // console.log('in useEffect', props.eventID)
            const ret1 = await httpsCallable(functions, "getEventDetails");
            ret1(para1).then((result) => {
                //var record1 = result.data;
                setEventDetails(result.data);
                // console.log(eventDetails);

                window.localStorage.setItem("EventDetails", JSON.stringify(result.data));
            });
        }
        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row no-gutters">
                {eventDetails && <EventDetailsMenu eventDetails={eventDetails} />}
                {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                {eventDetails && <EDAboutEvent eventDetails={eventDetails} />}
            </div>
            <br></br>
        </div >
    )
}
