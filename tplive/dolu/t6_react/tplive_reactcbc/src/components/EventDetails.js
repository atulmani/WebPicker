import React, { useState, useEffect } from 'react'
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EDAboutEvent from './EDAboutEvent'
import EventDetailsLogo from './EventDetailsLogo'
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
    // console.log(eventDetails);
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
    // const memoSetPartcipantObj = useMemo(() => {
    //     getData(reventDetails.current.Eventid);
    // }, [reventDetails.current.Eventid])
    function getData(eventid) {
        var para1 = {};
        setLoading(true);

        para1 = {
            EventID: eventid//reventDetails.current.Eventid
        };
        var uplayerList = [];
        // console.log('para1', para1);
        const ret1 = httpsCallable(functions, "getParticipants");
        ret1(para1).then(async (result) => {
            var cnt = 0;
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
            setLoading(false);
            console.log('uplayerList : ', uplayerList);
            console.log('result.data : ', result.data);
            console.log('participantCount : ', cnt);
            setPartcipantObj({
                uniqueParticipantDetails: uplayerList,
                participantDetails: result.data,
                participantCount: cnt,
                flagSet: true
            });

        });
    }

    useEffect(() => {
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
            console.log(eventDetails);
        })
        getData(reventDetails.current.Eventid);
        // const memorizedData = useMemo(() => {
        //     return fetchData();
        // }, [reventDetails.current.Eventid])
        //        console.log(memoSetPartcipantObj);
    }, [reventDetails.current.Eventid]);
    // console.log(memoSetPartcipantObj);
    const mLink = useMemo(() => {
        return reventDetails.current && partcipantObj && partcipantObj.flagSet && <EventDetailsMenu calledFrom='Details'
            // {<EventDetailsMenu calledFrom='Details'

            eventID={reventDetails.current.eventID}
            eventDetails={reventDetails.current}
            entryCount={rentryCount.current}
            uniqueParticipantDetails={partcipantObj.uniqueParticipantDetails}
            participantDetails={partcipantObj.participantDetails}
            participantCount={partcipantObj.participantCount}
        />
    }, [reventDetails, partcipantObj])
    // console.log(mLink);
    return (
        <>
            {/* {console.log(memoSetPartcipantObj)} */}
            <div className="container-fluid">

                <div className="row no-gutters">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        {/* {reventDetails.current && partcipantObj && partcipantObj.flagSet && <EventDetailsMenu calledFrom='Details'
                            // {<EventDetailsMenu calledFrom='Details'

                            eventID={reventDetails.current.eventID}
                            eventDetails={reventDetails.current}
                            entryCount={rentryCount.current}
                            uniqueParticipantDetails={partcipantObj.uniqueParticipantDetails}
                            participantDetails={partcipantObj.participantDetails}
                            participantCount={partcipantObj.participantCount}
                        />} */}
                        {mLink}
                        {reventDetails.current && partcipantObj.flagSet && <EventDetailsLogo eventDetails={reventDetails.current}></EventDetailsLogo>}
                    </div>
                    {loading && <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_9yosyj7r.json" style={{ height: '400px' }} background="transparent" speed="1" loop autoplay></lottie-player>}

                    {reventDetails.current && partcipantObj.flagSet && <EDTournamentDetails eventDetails={reventDetails.current} showRegistration={true} />}
                    {reventDetails.current && partcipantObj.flagSet && <EDAboutEvent eventDetails={reventDetails.current} />}
                </div>
            </div>
        </>
    )
}
