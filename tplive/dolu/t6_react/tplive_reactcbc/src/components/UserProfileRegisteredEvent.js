import React from 'react'
import Loading from './Loading'

export default function UserProfileRegisteredEvent(props) {

    let obj = {};
    let sDate = '';
    let fees = '';
    let convCharges = 0;
    let misCharges = 0;
    let totalFees = 0;
    let regCloseDate;
    let regWithdrawDate;
    let index = 0;

    return (
        <>

            {props.selectedPlayer !== '' && <>
                {props.loading && <Loading></Loading>}
                <br />
                {/* {console.log('selectedPlayer', selectedPlayer)} */}
                <div style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => {
                    props.openSideBar(true);
                }
                }>
                    <div style={{ paddingRight: '10px' }} className='small' >
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                    </div>
                    {/* {console.log(allMemberList)} */}
                    {/* {console.log(selectedPlayer)} */}
                    <h4>{props.playerDetails1 && props.playerDetails1.UserName} ({props.selectedPlayer})</h4>
                    <div style={{ paddingLeft: '5px' }} className='small'>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.7rem', transition: '1s', transform: props.showSideBar ? 'rotate(90deg)' : '' }}>
                            expand_more
                        </span>
                    </div>
                </div>
                <hr />

                <select name="" className='user-profile-select' id="events"
                    onChange={e => props.setSelectedEventActive(e.target.value)} value={props.selectedEventActive}>
                    <option value="" >All</option>
                    {props.eventList && props.eventList.map((event) => {
                        if (event.EventStatus === 'Active')
                            return <option value={event.EventID} key={event.EventID}>{event.EventName}</option>
                        else
                            return null
                    })}

                </select>

                <br /><br />
                <div className='row no-gutters'>
                    {props.participantList && props.participantList.map((participant) => {
                        obj = props.eventList.find(e => e.EventID === participant.EventID);
                        totalFees = Number(participant.Fees);
                        if (obj.ConvenienceCharge && obj.ConvenienceCharge > 0) {
                            convCharges = (totalFees * Number(obj.ConvenienceCharge) / 100)
                            totalFees = totalFees + convCharges;
                        }
                        if (obj.MiscellaneousChargeFees && obj.MiscellaneousChargeFees > 0) {
                            misCharges = Number(obj.MiscellaneousChargeFees);
                            totalFees = totalFees + misCharges;
                        }
                        regCloseDate = obj.RegistrationEndDate ? new Date(obj.RegistrationEndDate._seconds * 1000) : '';
                        regWithdrawDate = obj.WithdrawalEndDate ? new Date(obj.WithdrawalEndDate._seconds * 1000) : '';
                        // console.log('selectedEventActive : ', selectedEventActive, ' : ParticipantID :: ', participant.ParticipantID, ': selectedPlayer :: ', selectedPlayer)
                        if (obj.EventStatus === 'Active'
                            && (props.selectedEventActive === '' || props.selectedEventActive === participant.EventID)
                            && participant.ParticipantID === props.selectedPlayer) {
                            index = index + 1;
                            return <div className='col-lg-4 col-md-6 col-sm-12' key={participant.EventID + participant.PlayerID + participant.CategoryName}>
                                <div className="event-list-card" style={{ height: '200px', borderColor: participant.PaymentStatus === 'Pending' ? 'orange' : 'green' }}>
                                    <div className="">
                                        <h1> {obj.EventName}</h1>
                                        <h2>{obj.OrganizationName}</h2>
                                        <h3>{obj.EventSDate} to {obj.EventEDate} | {obj.City}</h3>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>{participant.CategoryName}</h4>
                                        {regCloseDate !== '' && regCloseDate < new Date() && <h5 className='blink' style={{ position: 'absolute', bottom: '0', fontSize: '0.8rem', color: '#ff5757' }}>Registration is closed</h5>}
                                        {regCloseDate !== '' && regCloseDate > new Date() && regCloseDate < new Date(Date.now() + 120 * 3600 * 1000) && <h5 className='blink' style={{ position: 'absolute', bottom: '0', fontSize: '0.8rem', color: '#ff5757' }}>Registration is closing soon</h5>}
                                    </div>

                                    <div className="event-id">
                                        <h5>{obj.EventCode}</h5>
                                    </div>

                                    <div className="second-div">
                                        <div style={{ position: 'relative' }}>
                                            <h4 style={{ margin: '0', fontSize: '1.3rem' }}>₹ {totalFees}</h4>
                                            <span className="material-symbols-outlined user-profile-info-icon" style={{ fontSize: '0.9rem' }}>
                                                info
                                            </span>
                                            <div className='user-profile-info-div'>
                                                <div>
                                                    <small>Ticket Price</small>
                                                    <span>₹ {participant.Fees}</span>
                                                </div>
                                                {convCharges > 0 && <div>
                                                    <small>Convenience Charges</small>
                                                    <span>₹ {convCharges}</span>
                                                </div>}

                                                {misCharges > 0 && <div>
                                                    <small>{obj.MiscellaneousChargeRemark}</small>
                                                    <span>₹ {misCharges}</span>
                                                </div>}
                                                <div>
                                                    <small>Total</small>
                                                    <span>₹ {totalFees}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 style={{ fontSize: '0.6rem', color: '#666' }}>including all charges</h5>

                                        {participant.PaymentStatus === 'Completed' && <button className="mybutton button5" style={{ margin: '0', background: 'green', pointerEvents: 'none' }}>Paid</button>
                                        }
                                        {participant.PaymentStatus === 'Pending'
                                            && obj.PaymentOpenFlag && obj.PaymentOpenFlag.toUpperCase() === 'ON'
                                            && obj.PaymentMode && obj.PaymentMode.toUpperCase() === 'ONLINE'

                                            &&
                                            <>
                                                <button className="mybutton button5" style={{ margin: '0', background: 'orange' }}
                                                    onClick={(e) => {
                                                        props.handlePayment(participant, obj, props.playerDetails1);
                                                    }
                                                    }
                                                >Pay Now</button>
                                                <br />
                                            </>
                                        }
                                        {participant.PaymentStatus === 'Pending' && obj.PaymentOpenFlag && obj.PaymentOpenFlag.toUpperCase() === 'OFF' && <button className="mybutton button5" style={{ margin: '0', background: 'orange', pointerEvents: 'none' }}  >Pending</button>
                                        }
                                        {regWithdrawDate !== '' && regWithdrawDate > new Date() && <button style={{ fontSize: '0.8rem', border: 'none', background: '#fff' }}
                                            onClick={(e) => {
                                                if (window.confirm('Are you sure you wish to withdraw for "'
                                                    + participant.CategoryName + '" for Event : ' + obj.EventName)) {
                                                    props.handleRefund(participant, obj);
                                                }
                                            }}><u style={{ color: '#348DCB' }}>Withdraw</u></button>}

                                    </div>

                                </div>
                                <br></br>
                            </div>
                        }
                        else {
                            return null
                        }
                    })}
                    {/* <div className='col-lg-4 col-md-4 col-sm-12'>

                        <div className="event-list-card" style={{ borderColor: 'orange' }}>
                            <div className="">
                                <h1>SBA Cup Badmiton Cup Hi Tournament 2022 BADMINTON Tournament</h1>
                                <h2>Sudhanshu Badminton Academy</h2>
                                <h3>29 Mar'22 to 3 Apr'22 | Banglore</h3>
                                <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>Boys Singles Under 15</h4>
                                <h5 className='blink' style={{ position: 'absolute', bottom: '0', fontSize: '0.8rem', color: '#ff5757' }}>Registration is closed</h5>
                            </div>

                            <div className="event-id">
                                <h5>TP_BD10196</h5>
                            </div>

                            <div className="second-div">
                                <div style={{ position: 'relative' }}>
                                    <h4 style={{ margin: '0', fontSize: '1.3rem' }}>₹ 10,250</h4>
                                    <span className="material-symbols-outlined user-profile-info-icon" style={{ fontSize: '0.9rem' }}>
                                        info
                                    </span>
                                    <div className='user-profile-info-div'>
                                        <div>
                                            <small>Ticket Price</small>
                                            <span>₹ 600</span>
                                        </div>
                                        <div>
                                            <small>Convenience Charges</small>
                                            <span>₹ 30</span>
                                        </div>
                                        <div>
                                            <small>Total</small>
                                            <span>₹ 630</span>
                                        </div>
                                    </div>
                                </div>
                                <h5 style={{ fontSize: '0.6rem', color: '#666' }}>including all charges</h5>
                                <button className="mybutton button5" style={{ margin: '0', background: 'orange' }}>Pay Now</button>
                                <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>

                            </div>
                        </div>

                        </div> */}

                    {/* <div className='col-lg-4 col-md-4 col-sm-12'>

                        <div className="event-list-card">
                            <div className="">
                                <h1>SBA Cup Badmiton Cup Hi Tournament 2022 BADMINTON Tournament</h1>
                                <h2>Sudhanshu Badminton Academy</h2>
                                <h3>29 Mar'22 to 3 Apr'22 | Banglore</h3>
                                <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>Boys Singles Under 15</h4>
                            </div>

                            <div className="event-id">
                                <h5>TP_BD10196</h5>
                            </div>

                            <div className="second-div">
                                <h4>₹ 10,250</h4>

                                <button className="mybutton button5" style={{ margin: '0', background: 'green' }}>Paid</button>
                                <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>

                            </div>
                        </div>

                        </div> */}

                </div>

                {(index <= 0) ? <>

                    <div className='event-page-error-message blink'>
                        <h1 style={{ color: '#ff5757' }}>No Registration for Selected member !!</h1>
                    </div>
                </> : ""}

                <br />
                <hr />

                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    {/* <div style={{ position: 'relative', cursor: 'pointer' }} onclick> */}
                    <h4>Participation History</h4>
                    <span className="material-symbols-outlined user-profile-expand-more-arrow">
                        {/* <span className="material-symbols-outlined user-profile-expand-more-arrow" style={{ transform: 'translateY(-50%) rotate(180deg)' }}> */}
                        expand_more
                    </span>
                </div>
                <hr />

                <div style={{ display: 'block' }}>
                    {/* <div style={{ display: 'block' }}> */}
                    <div className='user-profile-search'>
                        <input type="text" placeholder='Search Event Name' />
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </div>

                    <br />
                    <div className='row no-gutters'>
                        <div className='col-lg-4 col-md-4 col-sm-12'>

                            <div className="event-list-card">
                                <div className="">
                                    {/* {console.log('memberlist : ', members)} */}
                                    <h1>SBA Cup Badmiton Cup Hi Tournament 2022 BADMINTON Tournament</h1>
                                    <h2>Sudhanshu Badminton Academy</h2>
                                    <h3>29 Mar'22 to 3 Apr'22 | Banglore</h3>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 'normal' }}>Boys Singles Under 15</h4>
                                </div>

                                <div className="event-id">
                                    <h5>TP_BD10196</h5>
                                </div>

                                <div className="second-div">
                                    <h4>₹ 10,250</h4>
                                    {/* <div className=""
                                    style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div className="">
                                        <span style={{ color: 'green' }}>₹1,52,000</span><br />
                                        <small>( 525 )</small>
                                    </div>
                                    <span className="entries-pipe" style={{ fontWeight: 'lighter', fontSize: '2rem' }}>|</span>
                                    <div className="">
                                        <span style={{ color: 'orange' }}>₹1,10,000</span><br />
                                        <small>( 200 )</small>
                                    </div>
                                </div> */}

                                    <button className="mybutton button5" style={{ margin: '0', background: 'green' }}>Paid</button>
                                    <a href="/" style={{ fontSize: '0.8rem' }}>Withdraw</a>

                                </div>
                            </div>

                        </div>
                    </div>
                    <br />
                    <hr />
                </div>


            </>}
        </>


    )
}
