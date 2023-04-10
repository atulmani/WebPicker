import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventDetailsMenu from './EventDetailsMenu';
import EDTournamentDetails from './EDTournamentDetails';
import CategoryCartItem from './CategoryCartItem';

export default function PlayerParticipation() {
    const { state } = useLocation();
    const { eventDetails, entryCount, playerID, uniqueParticipantDetails, participantDetails, participantCount, playerUserID } = state;
    const [loading, setLoading] = useState(false);
    const [objPlayerParticipant, setObjPlayerParticipant] = useState({
        playerParticipantDetails: [],
        playerParticipantCount: 0,
        showFlag: false
    });
    useEffect(() => {
        // console.log(eventDetails);
        var para1 = {};
        async function fetchData() {
            setLoading(true);
            para1 = {
                EventID: eventDetails.Eventid,
                PlayerID: playerID

            };
            // console.log(para1);
            const ret1 = httpsCallable(functions, "getAllRegisteredEventListByPlayerCode");
            ret1(para1).then(async (result) => {
                setObjPlayerParticipant({
                    playerParticipantDetails: result.data,
                    playerParticipantCount: result.data.length,
                    showFlag: true
                });

            });
            setLoading(false);
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="container-fluid">

                <div className="row no-gutters">
                    <div className="col-lg-8 col-md-8 col-sm-12">

                        {eventDetails && <EventDetailsMenu calledFrom='Participant'
                            eventID={eventDetails.Eventid}
                            eventDetails={eventDetails}
                            entryCount={entryCount}
                            uniqueParticipantDetails={uniqueParticipantDetails}
                            participantDetails={participantDetails}
                            participantCount={participantCount}
                        />}
                        {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}


                        <div className="row no-gutters" id="divRegEvent">

                            {objPlayerParticipant.showFlag && objPlayerParticipant.playerParticipantDetails.map((events) => {
                                return <CategoryCartItem key={events.CategoryName} eventDetails={events} ></CategoryCartItem>
                            })}
                            {/* <span> * marked event is registered by Partner</span> */}

                        </div>

                    </div>

                    {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                    {/* {eventDetails && <EDAboutEvent eventDetails={eventDetails} />} */}
                </div>
            </div >
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
