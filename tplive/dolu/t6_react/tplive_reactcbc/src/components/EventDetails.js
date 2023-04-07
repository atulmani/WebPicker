import React, { useState, useEffect } from 'react'
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EDAboutEvent from './EDAboutEvent'
import EventDetailsLogo from './EventDetailsLogo'
import Loading from './Loading'
import '../css/EventDetails.css'
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react'
import { useMemo } from 'react'

// import { useParams } from 'react-router-dom'

export default function EventDetails() {
    const { state } = useLocation();
    const { eventID, eventDetails, entryCount, } = state;
    const reventID = useRef(eventID);
    const reventDetails = useRef(eventDetails);
    const rentryCount = useRef(entryCount);


    const [loading, setLoading] = useState(true);
    const [partcipantObj, setPartcipantObj] = useState(
        {
            uniqueParticipantDetails: [],
            participantDetails: [],
            participantCount: 0,
            flagSet: false
        }
    )
    // const [uniqueParticipantDetails, setUniqueParticipantDetails] = useState([]);
    // const [participantDetails, setParticipantDetails] = useState([]);
    // const [participantCount, setParticipantCount] = useState(0);

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
        let flag = false;
        async function fetchData() {
            setLoading(true);
            para1 = {
                EventID: reventDetails.current.Eventid
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

                setPartcipantObj(
                    {
                        uniqueParticipantDetails: uplayerList,
                        participantDetails: result.data,
                        participantCount: cnt,
                        flagSet: true
                    }
                );
                flag = true;
                // console.log(partcipantObj);
                // // console.log(participantDetails);
                // console.log(participantCount);
                setLoading(false);
            });
            // console.log('flag ', flag);
            // !flag && setPartcipantObj(
            //     {
            //         uniqueParticipantDetails: [],
            //         participantDetails: [],
            //         participantCount: 0,
            //         flagSet: true
            //     }
            // );

        }
        fetchData();
        // const memorizedData = useMemo(() => {
        //     return fetchData();
        // }, [reventDetails.current.Eventid])

    }, []);

    return (
        <>

            <div className="container-fluid">

                <div className="row no-gutters">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        {reventDetails.current && partcipantObj.flagSet && <EventDetailsMenu calledFrom='Details'
                            // {<EventDetailsMenu calledFrom='Details'

                            eventID={reventDetails.current.eventID}
                            eventDetails={reventDetails.current}
                            entryCount={rentryCount.current}
                            uniqueParticipantDetails={partcipantObj.uniqueParticipantDetails}
                            participantDetails={partcipantObj.participantDetails}
                            participantCount={partcipantObj.participantCount}
                        />}

                        {reventDetails.current && partcipantObj.flagSet && <EventDetailsLogo eventDetails={reventDetails.current}></EventDetailsLogo>}
                    </div>
                    {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

                    {reventDetails.current && partcipantObj.flagSet && <EDTournamentDetails eventDetails={reventDetails.current} showRegistration={true} />}
                    {reventDetails.current && partcipantObj.flagSet && <EDAboutEvent eventDetails={reventDetails.current} />}
                </div>
            </div>
        </>
    )
}
