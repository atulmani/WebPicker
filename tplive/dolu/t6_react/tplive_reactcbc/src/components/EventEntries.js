import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EDAboutEvent from './EDAboutEvent'
import '../css/EventDetails.css'
import Loading from './Loading'
import ExportExcelComp from './ExportExcelComp.js';
// import e from 'express';


export default function EventEntries() {
    const { state } = useLocation();
    const { calledFrom, eventDetails, entryCount, uniqueParticipantDetails, participantDetails, participantCount } = state;

    //const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    //const [eventID, setEventID] = useState(window.localStorage.getItem("EventID") ? window.localStorage.getItem("EventID") : '');

    //const [entryCount, setEntryCount] = useState(0);
    const [entryCountDetails, setEntryCountDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('eventDetails : ', eventDetails, '::eventID:', eventDetails.Eventid);
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
                    // setEntryCount(cntEntry);

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
        <>
            <div className="container-fluid">

                <div className="row no-gutters">
                    <div className="col-lg-8 col-md-8 col-sm-12">

                        {eventDetails && <EventDetailsMenu calledFrom='Entries'
                            eventID={eventDetails.Eventid}
                            eventDetails={eventDetails}
                            entryCount={entryCount}
                            uniqueParticipantDetails={uniqueParticipantDetails}
                            participantDetails={participantDetails}
                            participantCount={participantCount}
                        />}
                        {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

                        <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>
                            <br />
                            {eventDetails && false && <ExportExcelComp data={entryCountDetails} fileName={'Entrysummary'} />}

                            <table className="content-table" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Category</th>

                                        <th>Entries</th>
                                    </tr>
                                </thead>
                                <tbody id="eventCategoryDetails">
                                    {entryCountDetails && entryCountDetails.map((category) => (

                                        <tr key={category.CategoryName}>
                                            <td>{category.SNo}</td>
                                            <td>{category.CategoryName}</td>
                                            <td>{category.EntryCount === 0 ? category.EntryCount :
                                                <Link to="/EventPartcipants" state={{ entryDetails: entryCountDetails }}>{category.EntryCount}</Link>} </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}
                        </div>


                    </div>

                    {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                    {/* {eventDetails && <EDAboutEvent eventDetails={eventDetails} />} */}
                </div>
            </div>
            {/* <div className="container-fluid">

            <div className="row no-gutters">

                {eventDetails && <EventDetailsMenu eventDetails={eventDetails}
                    calledFrom='Entries'
                    entryCount={entryCount}
                    entryCountDetails={entryCountDetails}
                    isLoading={loading} />}

                {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}

            </div>
        </div> */}
        </>

    )
}
