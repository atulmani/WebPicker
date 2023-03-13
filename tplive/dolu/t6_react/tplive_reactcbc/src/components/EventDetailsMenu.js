import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import EventDetailsLogo from '../components/EventDetailsLogo'
import ExportExcelComp from './ExportExcelComp'
export default function EventDetailsMenu(props) {

    let cnt = 1;
    return (
        <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="event-details-menu-outter">
                <div className="event-details-menu">
                    <Link to="/EventDetails" state={{ eventID: props.eventID, eventDetails: props.eventDetails }} className={props.calledFrom === 'Details' ? 'active' : ''}>
                        <span className="material-symbols-outlined">
                            info
                        </span>
                        <h1>Details</h1>
                    </Link>
                    <Link to="/EventEntries" className={props.calledFrom === 'Entries' ? 'active' : ''}>
                        <span className="material-symbols-outlined">
                            directions_run
                        </span>
                        <h1>Entries</h1>
                    </Link>
                    <Link to="/EventPartcipants" className={props.calledFrom === 'Participant' ? 'active' : ''}>
                        <span className="material-symbols-outlined">
                            groups
                        </span>
                        <h1>Participants</h1>
                    </Link>
                </div>

            </div>

            {props.calledFrom === 'Details' && <EventDetailsLogo eventDetails={props.eventDetails}></EventDetailsLogo>}
            {props.calledFrom === 'Entries' &&
                <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                    <div className="heading">
                        <span className="material-symbols-outlined">
                            display_settings
                        </span>
                        <h4 style={{ fontWeight: '1000' }}>Total Entries: {props.entryCount}</h4>
                    </div>
                    {/* {props.eventDetails && <ExportExcelComp data={props.entryCountDetails} fileName={'Entrysummary'} />} */}

                    <table className="content-table" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>

                                <th>Entries</th>
                            </tr>
                        </thead>
                        <tbody id="eventCategoryDetails">
                            {props.entryCountDetails && props.entryCountDetails.map((category) => (

                                <tr key={category.CategoryName}>
                                    <td>{category.SNo}</td>
                                    <td>{category.CategoryName}</td>
                                    <td>{category.EntryCount === 0 ? category.EntryCount : <Link to="/EventPartcipants" state={{ entryDetails: props.entryCountDetails }}>{category.EntryCount}</Link>} </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            }
            {props.calledFrom === 'Participant' && <div> {console.log(props.participantDetails)}

                <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                    <div className="heading">
                        <span className="material-symbols-outlined">
                            display_settings
                        </span>
                        <h4 style={{ fontWeight: '1000' }}>Total Participant: {props.participantDetails ? props.participantDetails.length : 0}</h4>
                    </div>
                    <br></br>
                    {/* {props.eventDetails && <ExportExcelComp data={props.participantDetails} fileName={'PartcipantDetails'} />} */}

                    <hr />
                    <div className="heading">
                        <div className="row no-gutters">
                            {/* {console.log(props.eventDetails.CategoryDetails)} */}
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
                    <div className="row no-gutters">
                        {/* {console.log(props.participantDetails)} */}
                        {props.participantDetails && props.participantDetails.map((player) => {
                            return <div className="col-lg-4 col-md-4 col-sm-12" key={player.ParticipantID}>
                                <Link to="/PlayerParticipation" state={{
                                    playerID: player.ParticipantID,
                                    eventID: props.eventDetails.Eventid,
                                    playerUserID: player.playerUserID
                                }}>{player.PlayerName} </Link>


                            </div>

                        })}


                    </div>
                </div>
            </div>
            }
            {
                props.calledFrom === 'ParticipantDetails' &&
                <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>

                    <div className="heading">
                        <span className="material-symbols-outlined">
                            display_settings
                        </span>
                        <h4 style={{ fontWeight: '1000' }}>Total Entries: {props.participantDetails && props.participantDetails.length} : ({props.participantDetails && props.participantDetails[0] && props.participantDetails[0].ParticipantName}) </h4>
                    </div>


                    <table className="content-table" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Partner Name</th>
                                <th>Fees</th>
                                <th>Payment Status</th>
                                {/* <th></th> */}
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
                                        {/* {category.PaymentStatus === 'Pending' && <td><Link to="\RegistrationCheckout" 
                                        state={{}}>Pay Now</Link> </td>}
                                        {category.PaymentStatus !== 'Pending' && <td> </td>} */}

                                    </tr>
                                ))}

                        </tbody>
                    </table>
                    <span> * marked event is registered by Partner</span>
                </div>

            }
            {
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
                            {/* {console.log(props.eventDetails.CategoryDetails)} */}
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

            }
        </div >
    )
}

