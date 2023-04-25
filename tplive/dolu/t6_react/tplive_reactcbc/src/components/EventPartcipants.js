import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EventPartcipantCard from './EventPartcipantCard'
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import { extendTheme } from 'native-base';

import '../css/EventDetails.css'


export default function EventPartcipants() {
    const { state } = useLocation();
    const { calledFrom, eventDetails, entryCount, uniqueParticipantDetails, participantDetails, participantCount } = state;

    const [loading, setLoading] = useState(false);
    const [pList, setPList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    // const memoAlphaParticipant = useMemo(() => {
    function getPlayer() {

        let objList = [];
        let firstChar = null;
        let charList = [];
        let index = -1;
        uniqueParticipantDetails.sort((a, b) => {
            let fa = a.PlayerName.toLowerCase(),
                fb = b.PlayerName.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        // console.log('uniqueParticipantDetails : ', uniqueParticipantDetails);
        uniqueParticipantDetails.forEach(element => {
            if (firstChar !== element.PlayerName.substring(0, 1)) {
                index++;
                //charList = element.playerList;
                charList.push(element);
                objList[index] = {
                    firstCharector: element.PlayerName.substring(0, 1),
                    playerList: charList
                };
                firstChar = element.PlayerName.substring(0, 1);
            } else {
                // objList[index] = {
                // firstCharector: element.PlayerName.substring(0, 1).toUpperCase(),
                objList[index].playerList.push(element)

                // };
            }
            charList = [];
        });
        // console.log(objList);
        setPList(objList);
    }
    useEffect(() => {
        // console.log(eventDetails);
        getPlayer();
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
    }, [uniqueParticipantDetails]);
    let firstChar = null;
    function callParticipantDetails(playerID, playerUserID) {

        navigate("/PlayerParticipation", {
            state: {
                eventDetails: eventDetails,
                entryCount: entryCount,
                playerID: playerID,
                uniqueParticipantDetails: uniqueParticipantDetails,
                participantDetails: participantDetails,
                participantCount: participantCount,
                playerUserID: playerUserID
            }
        });

    }
    function onChangeEvent(option) {
        setSelectedCategory(option.target.value);
        // console.log(option.target.value);
    }

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

                        <div>

                            <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                                <br></br>

                                <hr />
                                <div className="heading">
                                    <div className="row no-gutters">
                                        <select name="" className="total-participants-select" id="" onChange={onChangeEvent} >
                                            <option value="All" >All</option>
                                            {eventDetails && eventDetails.CategoryDetails && eventDetails.CategoryDetails.map((cat) => {
                                                return <option value={cat.CategoryName} key={cat.CategoryName}>{cat.CategoryName}</option>

                                            })}

                                        </select>


                                    </div>

                                </div>

                                <br />
                                <hr></hr>
                                <div className="row no-gutters">

                                    <br /><br />
                                    <div className="total-participants-outter-div">
                                        {pList && pList.map((playerList) => {

                                            return <EventPartcipantCard key={playerList.firstCharector + eventDetails.EventidplayerList} pList={playerList} eventID={eventDetails.Eventid} callParticipantDetails={callParticipantDetails} />
                                        })}

                                    </div>


                                    {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

                                </div>
                            </div>
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
