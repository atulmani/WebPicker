import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import EventDetailsLogo from '../components/EventDetailsLogo'
import ExportExcelComp from './ExportExcelComp'
export default function EventDetailsMenu() {
    const { state } = useLocation();
    const { calledFrom, eventID, eventDetails, entryCount, uniqueParticipantDetails, participantDetails, participantCount } = state;


    let cnt = 1;
    return (
        // <div className="col-lg-8 col-md-8 col-sm-12">
        <div className="event-details-menu-outter">
            <div className="event-details-menu">
                <Link to="/EventDetails" state={{
                    eventID: eventID,
                    eventDetails: eventDetails,
                    entryCount: entryCount,
                    uniqueParticipantDetails: uniqueParticipantDetails,
                    participantDetails: participantDetails,
                    participantCount: participantCount
                }} className={calledFrom === 'Details' ? 'active' : ''}>
                    <span className="material-symbols-outlined">
                        info
                    </span>
                    <h1>Details</h1>
                </Link>
                <Link to="/EventEntries" className={calledFrom === 'Entries' ? 'active' : ''}>
                    <span className="material-symbols-outlined">
                        directions_run
                    </span>
                    <h1>Entries</h1>
                    <h2 className={calledFrom === 'Entries' ? 'active' : ''}>{entryCount}</h2>
                </Link>
                <Link to="/EventPartcipants" className={calledFrom === 'Participant' ? 'active' : ''}>
                    <span className="material-symbols-outlined">
                        groups
                    </span>
                    <h1>Participants</h1>
                    <h2 className={calledFrom === 'Participant' ? 'active' : ''}>{participantCount}</h2>
                </Link>
                <div className={calledFrom === 'Details' ? 'event-details-menu-indicator Details' : calledFrom === 'Entries' ? 'event-details-menu-indicator Entries' : props.calledFrom === 'Participant' ? 'event-details-menu-indicator Participant' : ''}></div>
            </div>

        </div>

            //  {calledFrom === 'Details' && <EventDetailsLogo eventDetails={eventDetails}></EventDetailsLogo>} 
    {/* {
                calledFrom === 'Entries' &&
                <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>
                    <br />
                     {props.eventDetails && false && <ExportExcelComp data={props.entryCountDetails} fileName={'Entrysummary'} />} 

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
                                    <td>{category.EntryCount === 0 ? category.EntryCount : <Link to="/EventPartcipants" state={{ entryDetails: props.entryCountDetails }}>{category.EntryCount}</Link>} </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {props.isLoading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}
                </div>

            } */}
    {/* {
                calledFrom === 'Participant' && <div>

                    <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                        <div className="heading">
                            <span className="material-symbols-outlined">
                                groups
                            </span>
                            <h4 style={{ fontWeight: '1000' }}>Total Participant : {participantDetails ? participantDetails.length : 0}</h4>
                        </div>
                        <br></br>
            
                        <hr />
                        <div className="heading">
                            <div className="row no-gutters">
                                {eventDetails && eventDetails.CategoryDetails && eventDetails.CategoryDetails.map((cat) => {
                                    return <div className="col-lg-4 col-md-3 col-sm-12" key={cat.CategoryName}>
                                        <h5 style={{ fontWeight: '1000' }}> <Link to="/EventCategoryPartcipants" state={{ categoryName: cat.CategoryName }} >{cat.CategoryName} </Link>
                                        </h5>

                                    </div>

                                })}
                            </div>

                        </div>

                        <br />
                        <hr></hr>
                        <div className="row no-gutters">
                            {participantDetails && participantDetails.map((player) => {
                                return <div className="col-lg-4 col-md-4 col-sm-12" key={player.ParticipantID}>
                                    <Link to="/PlayerParticipation" state={{
                                        playerID: player.ParticipantID,
                                        eventID: eventDetails.Eventid,
                                        playerUserID: player.playerUserID
                                    }}>{player.PlayerName} </Link>


                                </div>

                            })}

                            {props.isLoading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

                        </div>
                    </div>
                </div>
            } */}
    {/* {
                calledFrom === 'ParticipantDetails' &&
                <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                    <div className="heading">
                        <span className="material-symbols-outlined">
                            display_settings
                        </span>
                        <h4 style={{ fontWeight: '1000' }}>Total Entries: {participantDetails && participantDetails.length} : ({participantDetails && props.participantDetails[0] && props.participantDetails[0].ParticipantName}) </h4>
                    </div>


                    <table className="content-table" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Partner Name</th>
                                <th>Fees</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody id="eventCategoryDetails">
                            {
                                props.participantDetails && props.participantDetails.map((category) => (

                                    <tr key={category.PartnerPlayerName} >
                                        <td>{cnt++}</td>
                                        <td> {category.RegType === "Self" ? category.CategoryName : category.CategoryName + "*"}</td>
                                        <td>{category.PartnerPlayerName} </td>
                                        <td>{category.Fees} </td>
                                        <td>{category.PaymentStatus} </td>
                          
                                    </tr>
                                ))}

                        </tbody>
                    </table>
                    <span> * marked event is registered by Partner</span>
                    {props.isLoading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

                </div>

            } */}
    {/* {
                props.calledFrom === 'EventCategoryPartcipants' &&
                <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                    <div className="heading">
                        <span className="material-symbols-outlined">
                            display_settings
                        </span>
                        <h4 style={{ fontWeight: '1000' }}>Total Entries: {props.participantDetails && props.participantDetails.length} : ({props.categoryName && props.categoryName}) </h4>
                    </div>
                    <br></br>
                    <hr />
                    <div className="heading">
                        <div className="row no-gutters">
                            {props.eventDetails && props.eventDetails.CategoryDetails && props.eventDetails.CategoryDetails.map((cat) => {
                                return <div className="col-lg-4 col-md-3 col-sm-12" key={cat.CategoryName}>
                                    <h5 style={{ fontWeight: '1000' }}> <Link to="/EventCategoryPartcipants" state={{ categoryName: cat.CategoryName }} >{cat.CategoryName} </Link>
                                    </h5>

                                </div>

                            })}
                        </div>

                    </div>

                    <br />
                    <hr></hr>


                    <table className="content-table" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Player Name</th>
                                <th>Fees</th>
                                <th>Payment Status</th>
                                <th>Partner Name</th>
                            </tr>
                        </thead>
                        <tbody id="eventCategoryDetails">
                            {
                                props.participantDetails && props.participantDetails.map((category) => (

                                    <tr key={category.ParticipantID} >
                                        <td>{cnt++}</td>
                                        <td>{category.ParticipantName} </td>

                                        <td>{category.Fees} </td>
                                        <td>{category.PaymentStatus} </td>
                                        <td>{category.PartnerPlayerName} </td>


                                    </tr>
                                ))}

                        </tbody>
                    </table>

                </div>

            } */}
        // </div >
    )
}

