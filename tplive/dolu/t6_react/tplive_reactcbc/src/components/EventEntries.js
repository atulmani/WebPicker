import React from 'react'
import { useState, useEffect } from 'react'

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import '../css/EventDetails.css'
import Loading from './Loading'
import ExportExcelComp from './ExportExcelComp.js';
// import e from 'express';


export default function EventEntries() {
    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    const [eventID, setEventID] = useState(window.localStorage.getItem("EventID") ? window.localStorage.getItem("EventID") : '');

    const [entryCount, setEntryCount] = useState(0);
    const [entryCountDetails, setEntryCountDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        var para1 = {};
        async function fetchData() {
            para1 = {
                EventID: eventDetails.Eventid
            };
            var eventCnt = [];
            const ret1 = httpsCallable(functions, "getEventsEntryCount");
            ret1(para1).then((result) => {
                var cnt = 1;
                var cntEntry = 0;
                var ele = {};
                if (eventDetails && eventDetails.CategoryDetails) {
                    eventDetails.CategoryDetails.forEach(element => {
                        var evtIndex = result.data.findIndex(e => e.CategoryName === element.CategoryName);
                        if (evtIndex >= 0) {
                            ele = {
                                SNo: cnt,
                                CategoryName: element.CategoryName,
                                EntryCount: result.data[evtIndex].EntryCount
                            }
                            cntEntry = cntEntry + Number(ele.EntryCount);
                            eventCnt.push(ele);
                        }
                        else {
                            ele = {
                                SNo: cnt,
                                CategoryName: element.CategoryName,
                                EntryCount: 0
                            }

                            eventCnt.push(ele);
                        }
                        cnt = cnt + 1;
                    });
                    setEntryCount(cntEntry);

                }
                setEntryCountDetails(eventCnt);
                // console.log(eventDetails);
                setLoading(false);
                //   window.localStorage.setItem("EventDetails", JSON.stringify(result.data));
            });
        }
        fetchData();
    }, []);


    return (
        <div className="container-fluid">

            <div className="row no-gutters">

                {eventDetails && <EventDetailsMenu eventDetails={eventDetails} calledFrom='Entries' entryCount={entryCount} entryCountDetails={entryCountDetails} />}

                {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}

            </div>
        </div>

    )
}
