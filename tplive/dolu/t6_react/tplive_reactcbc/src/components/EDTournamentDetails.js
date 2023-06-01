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

            {props.eventDetails.RegistrationOpenFlag !== 'YES' && props.eventDetails.EventMode.toUpperCase() === 'FIXTURE' &&
                <div className="register-btn-fixed small">

                    <a href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + props.eventDetails.SportCode + "&TCode=" + props.eventDetails.EventCode} >

                        <button type="button" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                            Draw
                        </button>

                    </a>
                </div>}

            <div className="fixed-white-area">
                <div className="" style={{ display: 'block' }}>
                    <div className="event-detail-notification">
                        <span className="material-symbols-outlined">
                            notifications_active
                        </span>
                        <h1 className="blink">Online payment Online payment is mandatory to confirm your entry
                        </h1>
                    </div>
                </div>
            </div>

            <div className="firstbox">
                {/* <input type="hidden"  value={props.eventDetails.id} />
                <input type="hidden"  value={props.eventDetails.OrganizationID} /> */}
                <h4 style={{ fontWeight: '1000', color: '#348DCB' }}> {props.eventDetails.EventName}
                </h4>
                <hr />
                <ul>
                    <li>
                        <i className="far fa-bookmark"></i>
                        <span className="textheadleft">Organiser : </span>
                        <span className="textheadright">{props.eventDetails.OrganizationName}</span>
                    </li>
                    <li>
                        <i className="far fa-calendar"></i>
                        <span className="textheadleft">Date : </span>
                        <span className="textheadright"> {props.eventDetails.EventSDate}</span>
                        <span className="textheadright"> - {props.eventDetails.EventEDate}</span>
                    </li>
                    <li>
                        <i className="fas fa-rupee-sign"></i>
                        <span className="textheadleft">Price : </span>
                        <span className="textheadright"> {(props.eventDetails.Fees)}</span>
                    </li>

                    <li className="large" style={{ paddingBottom: '0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ width: '45%' }} >
                                {props.showRegistration && props.eventDetails.RegistrationOpenFlag === 'YES' && users && <Link to="/RegisteredProfile">
                                    <button type="button" name="button" className="mybutton button5" style={{ background: '#348DCB', width: '100%' }}>
                                        Click To Register
                                    </button>
                                </Link>}


                                {props.showRegistration && props.eventDetails.RegistrationOpenFlag === 'YES' && !users && <Link
                                    to="/PhoneSignUp" state={{
                                        url: 'EventDetails',
                                        property: props
                                    }}>
                                    <button type="button" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                        Register
                                    </button>
                                </Link>}

                                {props.eventDetails.RegistrationOpenFlag !== 'YES' && props.eventDetails.EventMode.toUpperCase() === 'FIXTURE' && <a href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + props.eventDetails.SportCode + "&TCode=" + props.eventDetails.EventCode} >
                                    <button type="button" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                        View Draw
                                    </button>
                                </a>}
                            </span>

                            <span style={{ width: '45%' }} >
                                {/* {props.eventDetails.OnlinePaymentModeFlag === 'YES' &&
                                    <button type="button" name="button" className="mybutton button5" style={{ background: '#348DCB', width: '100%' }}>
                                        Pay Now
                                    </button>
                                } */}
                                {props.eventDetails.OnlinePaymentModeFlag !== 'YES' && props.eventDetails.DrawPublishedFlag === 'YES' && <a href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + props.eventDetails.SportCode + "&TCode=" + props.eventDetails.EventCode}>
                                    <button type="button" name="button" className="mybutton button5" style={{ background: '#348DCB' }}>
                                        Draw
                                    </button>
                                </a>}
                            </span>
                        </div>
                    </li>

                </ul>

            </div><br />

            <div className="secbox">
                <h4 style={{ fontWeight: '1000', color: '#348DCB' }}>Event Guide</h4>
                <hr />
                <ul>
                    <li>
                        <i className="fas fa-thumb-tack"></i>
                        <span className="textheadleft">Venue : <span style={{ color: '#889' }} className="textheadright"> {props.eventDetails.EventName}</span> </span>
                    </li>
                    <li>
                        <i className="fas fa-undo"></i>
                        <span className="textheadleft">Withdrawal Date : <span style={{ color: '#889' }} className="textheadright"> {refWDate ? refWDate.toLocaleDateString("en-IN", options) : ''}</span>
                        </span>
                    </li>
                </ul>
            </div><br />

            <div className="thirdbox">
                <h4 style={{ fontWeight: '1000', color: '#348DCB' }}>Have a question?</h4>
                <hr />
                <ul>
                    <li>
                        <span style={{ fontSize: '0.9rem' }}>Ask the organizer : <span className="textheadright" >{props.eventDetails.EventOwnerName} </span> </span>
                        <br />
                        <span style={{ fontSize: '0.9rem' }}>Email : </span>

                        <span className='textheadright' style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{props.eventDetails.EventOwnerEmail}</span>
                        <br />
                        <span style={{ fontSize: '0.9rem' }}>Contact : </span>
                        <a className='textheadright' href="/">{props.eventDetails.EventOwnerPhone}</a>

                    </li>

                </ul>

            </div>

        </div >
    )
}




// btnBookingClick() {

// }
