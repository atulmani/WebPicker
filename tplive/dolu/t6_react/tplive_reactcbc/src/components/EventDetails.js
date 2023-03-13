import React, { useState, useEffect } from 'react'
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EDAboutEvent from './EDAboutEvent'
import Loading from './Loading'
import '../css/EventDetails.css'
// import { functions } from '../firebase.js'
// import { httpsCallable } from "firebase/functions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from 'react-router-dom';

// import { useParams } from 'react-router-dom'

export default function EventDetails() {
    const { state } = useLocation();
    const { eventID, eventDetails } = state;
    const [loading, setLoading] = useState(true);

    // const [eventDetails, setEventDetails] = useState(null);
    useEffect(() => {
        // console.log(eventID);
        // console.log(eventDetails);
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
        //        fetchData();
    }, []);

    return (

        <div className="container-fluid">
            {/* {loading && <Loading />} */}

            <div className="row no-gutters">
                {eventDetails && <EventDetailsMenu eventDetails={eventDetails} calledFrom='Details' />}
                {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                {eventDetails && <EDAboutEvent eventDetails={eventDetails} />}
            </div>
            <br></br>
        </div >
    )
}
