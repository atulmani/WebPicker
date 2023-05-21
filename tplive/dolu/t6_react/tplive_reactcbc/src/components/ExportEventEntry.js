import React, { useEffect, useState, useContext } from 'react'
import '../css/UserProfile.css'
import { useUserAuth, useGetUserDetails } from '../context/UserAuthcontext';
import { useLocalStorage } from "../context/useLocalStorage";
import { useNavigate, useLocation } from 'react-router-dom';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import ExportExcel from '../Excelexport'
import { Button } from 'react-bootstrap';
export default function ExportEventEntry() {
    //let { state } = useLocation();
    // const { eventList, eventList } = state;
    const [eventID, setEventID] = useState('');

    const { user } = useUserAuth();
    const [userDetails, setUserDetails] = useLocalStorage('userProfile', null);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [participantList, setParticipantList] = useState([]);

    useEffect(() => {
        if (user.isLoggedIn && userDetails !== null) {
            let eventList = [];
            let eventDetails = {};
            if (user.userInfo !== null) {
                var para1 = {};
                let ret1 = null;
                let isAdminIndex = -1;
                isAdminIndex = userDetails ? userDetails.UserRole.findIndex(e => e.TYPE === 'ADMIN') : -1;

                para1 = {
                    organizerID: user.userInfo.uid
                };
                // console.log(para1)
                if (isAdminIndex >= 0) {
                    ret1 = httpsCallable(functions, "getAllEventDetails");

                } else {
                    ret1 = httpsCallable(functions, "getAllEventDetailsForOrganizer");

                }

                ret1(para1).then(async (result) => {
                    result.data.forEach(rec => {
                        eventDetails = {
                            Eventid: rec.Eventid,
                            EventName: rec.EventName,
                            EventType: rec.EventType,
                            EventStatus: rec.EventStatus,
                            OrganizationID: rec.OrganizationID,
                            OrganizationName: rec.OrganizationName,
                            EventOwnerName: rec.EventOwnerName,
                            EventOwnerEmail: rec.EventOwnerEmail,
                            EventOwnerPhone: rec.EventOwnerPhone,
                            EventCode: rec.EventCode,
                            MinimumFee: rec.MinimumFee,
                            MaximumFee: rec.MaximumFee,
                            EventStartDate: rec.EventStartDate,
                            EventEndDate: rec.EventEndDate,
                            City: rec.City,
                        }
                        eventList.push(eventDetails);
                    });
                    setEvents(eventList);

                });

            }
            else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
        else {
        }
    }, [user])

    function getPartcipant(eID) {

        if (eID !== '') {
            setEventID(eID);
            var para1 = {};
            let ret1 = null;
            let pList = [];
            let partcipant = {};
            para1 = {
                EventID: eID
            };
            // console.log(para1)
            ret1 = httpsCallable(functions, "getParticipants");

            ret1(para1).then(async (result) => {
                result.data.forEach(rec => {
                    partcipant = {
                        EventID: rec.EventID,
                        CategoryName: rec.CategoryName,
                        ParticipantID: rec.ParticipantID,
                        ParticipantName: rec.ParticipantName,
                        EventType: rec.EventType,
                        Gender: rec.Gender,
                        PaymentStatus: rec.PaymentStatus,
                        Fees: Number(rec.Fees),
                        PlayerUserID: rec.PlayerID,

                        PartnerPlayerID: rec.PartnerPlayerID,
                        PartnerPlayerName: rec.PartnerPlayerName,

                    }
                    pList.push(partcipant);
                });
                setParticipantList(pList);

            });
        }
    }
    // useEffect(() => {

    //     if (eventID !== '') {
    //         var para1 = {};
    //         let ret1 = null;
    //         let pList = [];
    //         let partcipant = {};
    //         para1 = {
    //             EventID: eventID
    //         };
    //         console.log(para1)
    //         ret1 = httpsCallable(functions, "getParticipants");

    //         ret1(para1).then(async (result) => {
    //             result.data.forEach(rec => {
    //                 partcipant = {
    //                     EventID: rec.EventID,
    //                     CategoryName: rec.CategoryName,
    //                     ParticipantID: rec.ParticipantID,
    //                     ParticipantName: rec.ParticipantName,
    //                     EventType: rec.EventType,
    //                     Gender: rec.Gender,
    //                     PaymentStatus: rec.PaymentStatus,
    //                     Fees: Number(rec.Fees),
    //                     PlayerUserID: rec.PlayerID,

    //                     PartnerPlayerID: rec.PartnerPlayerID,
    //                     PartnerPlayerName: rec.PartnerPlayerName,

    //                 }
    //                 pList.push(partcipant);
    //             });
    //             setParticipantList(pList);

    //         });
    //     }
    // }, [eventID])

    return (
        <div>
            {events && events.map((event) => {

                return <Button key={event.Eventid}
                    onClick={(e) => {
                        getPartcipant(event.Eventid)
                    }}
                > {event.EventName}-{event.EventCode} </Button>
            })}

            {eventID !== '' && participantList !== [] && <ExportExcel excelData={participantList} fileName={eventID} buttonName='Export File'></ExportExcel>}
        </div>
    )
}
