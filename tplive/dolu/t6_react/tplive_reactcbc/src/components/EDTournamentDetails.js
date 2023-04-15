import React from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthcontext'

export default function EDTournamentDetails(props) {
    // console.log(props.eventDetails)
    const { users, logout } = useUserAuth();


    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };

    var options = {
        year: '2-digit',
        // year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    // const refSDate = new Date(props.eventDetails.EventStartDate._seconds * 1000);
    // const refEDate = new Date(props.eventDetails.EventEndDate._seconds * 1000);
    const refWDate = props.eventDetails.WithdrawalEndDate ? new Date(props.eventDetails.WithdrawalEndDate._seconds * 1000) : null;

    //element.EventStartDate = refdate.toLocaleDateString("en-IN", options);
    return (
        <div className="col-lg-4 col-md-4 col-sm-12">
            {props.showRegistration && props.eventDetails.RegistrationOpenFlag === 'YES' && users &&
                <div className="register-btn-fixed small">
                    {/* <Link to="/EventRegistration" className="mybutton button5">Register</Link> */}
                    <Link to="/RegisteredProfile" className="mybutton button5">Register</Link>
                </div>
            }

            <div className="fixed-white-area">
                <div className="" style={{ display: 'block' }}>
                    <div className="event-detail-notification">
                        <span className="material-symbols-outlined">
                            notifications_active
                        </span>
                        <h1 id="announcement" className="blink">Online payment Online payment is mandatory to confirm your entry
                        </h1>
                    </div>
                </div>
            </div>

            <div className="firstbox">
                <input type="hidden" id="hfEventID" value={props.eventDetails.id} />
                <input type="hidden" id="hfOrganizerID" value={props.eventDetails.OrganizationID} />
                <h4 id="eventName" style={{ fontWeight: '1000', color: '#348DCB' }}> {props.eventDetails.EventName}
                </h4>
                <hr />
                <ul>
                    <li>
                        <i className="far fa-bookmark"></i>
                        <span className="textheadleft">Organiser : </span>
                        <span id="organisername" className="textheadright">{props.eventDetails.OrganizationName}</span>
                    </li>
                    <li>
                        <i className="far fa-calendar"></i>
                        <span className="textheadleft">Date : </span>
                        <span id="eventstartdate" className="textheadright"> {props.eventDetails.EventStartDate}</span>
                        <span id="eventenddate"
                            className="textheadright"> - {props.eventDetails.EventEndDate}</span>
                    </li>
                    <li>
                        <i className="fas fa-rupee-sign"></i>
                        <span className="textheadleft">Price : </span>
                        <span id="eventprice" className="textheadright"> {(props.eventDetails.MinimumFee)}</span>
                    </li>

                    <li className="large" style={{ paddingBottom: '20px' }}>
                        <span style={{ float: 'left' }} id="spanbtn1">
                            {props.showRegistration && props.eventDetails.RegistrationOpenFlag === 'YES' && users && <Link id="booking" to="/RegisteredProfile">
                                <button type="button" id="btn1" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                    Register
                                </button>
                            </Link>}


                            {props.showRegistration && props.eventDetails.RegistrationOpenFlag === 'YES' && !users && <Link id="booking" to="/PhoneSignUp">
                                <button type="button" id="btn1" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                    Register
                                </button>
                            </Link>}

                            {props.eventDetails.RegistrationOpenFlag !== 'YES' && props.eventDetails.EventMode.toUpperCase() !== 'FIXTURE' && <a id="booking" href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + props.eventDetails.SportCode + "&TCode=" + props.eventDetails.EventCode} >
                                <button type="button" id="btn1" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                    View Draw
                                </button>
                            </a>}
                        </span>

                        <span style={{ float: 'right' }} id="spanbtn2">
                            {props.eventDetails.OnlinePaymentModeFlag === 'YES' && <a id="booking" href="./checkout/step1-auth.html">
                                <button type="button" id="btn2" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                    Pay Now
                                </button>
                            </a>}
                            {props.eventDetails.OnlinePaymentModeFlag !== 'YES' && props.eventDetails.DrawPublishedFlag === 'YES' && <a id="booking" href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + props.eventDetails.SportCode + "&TCode=" + props.eventDetails.EventCode}>
                                <button type="button" id="btn2" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                    Draw
                                </button>
                            </a>}
                        </span>
                    </li><br className="large" />

                </ul>

            </div><br />

            <div className="secbox">
                <h4 style={{ fontWeight: '1000', color: '#348DCB' }}>Event Guide</h4>
                <hr />
                <ul>
                    <li>
                        <i className="fas fa-thumb-tack"></i>
                        <span className="textheadleft">Venue : <span id="eventVenue" style={{ color: '#889' }} className="textheadright"> {props.eventDetails.EventName}</span> </span>
                    </li>
                    <li>
                        <i className="fas fa-undo"></i>
                        <span className="textheadleft">Withdrawal Date : <span id="withdrawalDate" style={{ color: '#889' }} className="textheadright"> {refWDate ? refWDate.toLocaleDateString("en-IN", options) : ''}</span>
                        </span>
                    </li>
                </ul>
            </div><br />

            <div className="thirdbox">
                <h4 style={{ fontWeight: '1000', color: '#348DCB' }}>Have a question?</h4>
                <hr />
                <ul>
                    <li>
                        <span style={{ fontSize: '0.9rem' }}>Ask the organizer : <span className="textheadright" id="orgName">{props.eventDetails.EventOwnerName} </span> </span>
                        <br />
                        <span style={{ fontSize: '0.9rem' }}>Email : </span>

                        <span id="organiserEmail" className='textheadright' style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{props.eventDetails.EventOwnerEmail}</span>
                        <br />
                        <span style={{ fontSize: '0.9rem' }}>Contact : </span>
                        <a id="organiserPhone" className='textheadright' href="/">{props.eventDetails.EventOwnerPhone}</a>

                    </li>

                </ul>

            </div>

        </div >
    )
}




// btnBookingClick() {

// }
