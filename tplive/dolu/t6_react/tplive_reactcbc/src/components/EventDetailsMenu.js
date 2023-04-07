import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import EventDetailsLogo from '../components/EventDetailsLogo'
import ExportExcelComp from './ExportExcelComp'
export default function EventDetailsMenu(props) {
    const calledFrom = useRef(props.calledFrom);
    const eventID = useRef(props.eventID);
    const eventDetails = useRef(props.eventDetails);
    const entryCount = useRef(props.entryCount);
    const uniqueParticipantDetails = useRef(props.uniqueParticipantDetails);
    const participantDetails = useRef(props.participantDetails);
    const participantCount = useRef(props.participantCount);



    // const { state } = useLocation();
    // const { calledFrom, eventID, eventDetails, entryCount, uniqueParticipantDetails, participantDetails, participantCount } = state;

    // console.log('from EventDetailsMenu : participantCount = ', participantCount, ' :: participantDetails : ', participantDetails,
    //     ':: uniqueParticipantDetails : ', uniqueParticipantDetails);
    console.log('props : ', props);
    let cnt = 1;
    return (
        <div className="event-details-menu-outter">
            <div className="event-details-menu">
                <Link to="/EventDetails" state={{
                    calledFrom: 'Details',
                    eventID: eventID.current,
                    eventDetails: eventDetails.current,
                    entryCount: entryCount.current,
                    uniqueParticipantDetails: uniqueParticipantDetails.current,
                    participantDetails: participantDetails.current,
                    participantCount: participantCount.current
                }} className={calledFrom.current === 'Details' ? 'active' : ''}>
                    <span className="material-symbols-outlined">
                        info
                    </span>
                    <h1>Details</h1>
                </Link>
                <Link to="/EventEntries" state={{
                    calledFrom: 'Entries',
                    eventID: eventID.current,
                    eventDetails: eventDetails.current,
                    entryCount: entryCount.current,
                    uniqueParticipantDetails: uniqueParticipantDetails.current,
                    participantDetails: participantDetails.current,
                    participantCount: participantCount.current
                }} className={calledFrom.current === 'Entries' ? 'active' : ''}>
                    <span className="material-symbols-outlined">
                        directions_run
                    </span>
                    <h1>Entries</h1>
                    <h2 className={calledFrom.current === 'Entries' ? 'active' : ''}>{entryCount.current}</h2>
                </Link>
                <Link to="/EventPartcipants"
                    state={{
                        calledFrom: 'Participant',
                        eventID: eventID.current,
                        eventDetails: eventDetails.current,
                        entryCount: entryCount.current,
                        uniqueParticipantDetails: uniqueParticipantDetails.current,
                        participantDetails: participantDetails.current,
                        participantCount: participantCount.current
                    }} className={calledFrom.current === 'Participant' ? 'active' : ''}>
                    <span className="material-symbols-outlined">
                        groups
                    </span>
                    <h1>Participants</h1>
                    <h2 className={calledFrom.current === 'Participant' ? 'active' : ''}>{participantCount.current}</h2>
                </Link>
                <div className={calledFrom.current === 'Details' ? 'event-details-menu-indicator Details' : calledFrom.current === 'Entries' ? 'event-details-menu-indicator Entries' : calledFrom.current === 'Participant' ? 'event-details-menu-indicator Participant' : ''}></div>
            </div>

        </div>


    )
}

