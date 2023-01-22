import React from 'react'
import { Link } from 'react-router-dom'

export default function EDTournamentDetails(props) {
    // console.log(props.eventDetails)

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
    const refSDate = new Date(props.eventDetails.EventStartDate._seconds * 1000);
    const refEDate = new Date(props.eventDetails.EventEndDate._seconds * 1000);
    const refWDate = props.eventDetails.WithdrawalEndDate ? new Date(props.eventDetails.WithdrawalEndDate._seconds * 1000) : null;

    //element.EventStartDate = refdate.toLocaleDateString("en-IN", options);
    return (
        <div className="col-lg-4 col-md-4 col-sm-12">

            <div className="register-btn-fixed small">
                <a href="/" className="mybutton button5">Register</a>
            </div>

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
                        <span className="textheadleft">Organiser: </span>
                        <span style={{ color: '#889' }} id="organisername" className="textheadleft">{props.eventDetails.OrganizationName}</span>
                    </li>
                    <li>
                        <i className="far fa-calendar"></i>
                        <span className="textheadleft">Date:</span>
                        <span id="eventstartdate" className="textheadleft">{refSDate.toLocaleDateString("en-IN", options)}</span>
                        <span style={{ color: '#889' }} id="eventenddate"
                            className="textheadleft">-{refEDate.toLocaleDateString("en-IN", options)}</span>
                    </li>
                    <li>
                        <i className="fas fa-rupee-sign"></i>
                        <span className="textheadleft">Price:</span>
                        <span style={{ color: '#889' }} id="eventprice" className="textheadleft">{Number(props.eventDetails.MinimumFee).toLocaleString('en-IN', curFormat)}</span>
                    </li>

                    <li className="large" style={{ paddingBottom: '20px' }}>
                        <span style={{ float: 'left' }} id="spanbtn1">
                            {props.showRegistration && props.eventDetails.RegistrationOpenFlag === 'YES' && <Link id="booking" to="/EventRegister">
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
                        <i className="fas fa-play-circle"></i>
                        <span className="textheadleft">Venue : <span id="eventVenue" className="textheadright">{props.eventDetails.EventName}</span> </span>
                    </li>
                    <li>
                        <i className="fas fa-language"></i>
                        <span className="textheadleft">Withdrawal Date : <span id="withdrawalDate" className="textheadright">{refWDate ? refWDate.toLocaleDateString("en-IN", options) : ''}</span>
                        </span>
                    </li>
                </ul>
            </div><br />

            <div className="thirdbox">
                <h4 style={{ fontWeight: '1000', color: '#348DCB' }}>Have a question?</h4>
                <hr />
                <ul>
                    <li>
                        <span style={{ color: '#889', fontSize: '0.9rem' }}>Ask the organizer : <span id="orgName">{props.eventDetails.EventOwnerName} </span> </span>
                        <br />
                        <span style={{ fontSize: '0.9rem', color: '#348DCB' }}>Email: </span>

                        <span id="organiserEmail" style={{ fontSize: '0.9rem', color: '#889', wordBreak: 'break-all' }}>{props.eventDetails.EventOwnerEmail}</span>
                        <br />
                        <span style={{ fontSize: '0.9rem', color: '#348DCB' }}>Contact: </span>
                        <a id="organiserPhone" style={{ textDecoration: 'none' }} href="/">{props.eventDetails.EventOwnerPhone}</a>

                    </li>

                </ul>

            </div>

        </div >
    )
}




// btnBookingClick() {

// }
