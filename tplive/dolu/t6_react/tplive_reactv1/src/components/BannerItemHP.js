// import React, { useState } from 'react'
import React from 'react'

import PropTypes from 'prop-types'


export default function BannerItemHP(props) {
    // const [eventName, setEventName] = useState("My Event Name");
    // eventName = "My Event Name" ; //Wrong way to set value
    // setEventName("My Event Name");//correct way
    return (
        <div className="item">
            <div className="event-display-card">
                <div className="row no-gutters">
                    <div className="col-lg-5 col-md-12 col-sm-12">
                        <div className="content large">
                            {/* <h1>{props.eventName} -{eventName}</h1> */}
                            <h1>{props.eventName} </h1>

                            <h2>{props.organizerName}</h2>
                            <input type="hidden" id="hfeventID" value={props.eventID}></input>
                            <input type="hidden" id="hfeventType" value={props.eventType}></input>

                            <div style={{ position: 'relative' }}>
                                <h3 className="rating">
                                    <div className="">
                                        <span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <small>100</small>
                                    </div>
                                </h3>
                            </div>

                            <div className="details">
                                <div className="">
                                    <h3>{props.location}</h3>
                                    <h4>Location</h4>
                                </div>
                                <div className="">
                                    <h3>{props.eventDate}</h3>
                                    <h4>Event Date</h4>
                                </div>
                                <div className="">
                                    <h3>{props.entryFee}</h3>
                                    <h4>Entry Fee</h4>
                                </div>
                            </div>

                            <div className="button-div">
                                <button type="button" onClick={btnClickEvent(props.eventType, props.eventCode)} className="mybutton button5 event-card-button" name="button">

                                    <span>book</span>
                                </button>

                                <a href="index.html" className="circle blink">
                                    <div className=""></div>
                                    <h1>LiVE</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <div className="image">
                            <img src={props.eventURL} width="100%" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mobile-content small">
                            <h1>{props.eventName}</h1>
                            <h2>{props.organizerName}</h2>
                            <div style={{ position: 'relative' }}>
                                <h3 className="rating">
                                    <div className="">
                                        <div className="">
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <span className="material-symbols-outlined">star</span>
                                            <small>100</small>
                                        </div>
                                    </div>
                                </h3>
                            </div>

                            <div className="event-location">
                                <h1>{props.eventLocation}</h1>
                            </div>
                            <div className="details" style={{ width: '100%' }}>
                                <div className="">
                                    <h3>{props.eventLocation}</h3>
                                    <h4>Location</h4>
                                </div>
                                <div className="">
                                    <h3>{props.eventDate}</h3>
                                    <h4>Event Date</h4>
                                </div>
                                <div className="">
                                    <h3>{props.entryFee}</h3>
                                    <h4>Entry Fee</h4>
                                </div>
                            </div>

                            <div className="button-div">
                                <button type="button" onClick={btnClickEvent(props.eventType, props.eventCode)} className="mybutton button5 event-card-button" name="button">

                                    <span>Book</span>
                                </button>

                                <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                                    <h5 style={{ color: '#fff', position: 'relative', top: '5px', left: '-0px', paddingRight: '10px' }}>{props.eventDate}</h5>
                                    <span style={{ color: '#fff', position: 'relative', left: '-0px', paddingRight: '10px', fontSize: '1.3rem' }}>|</span>
                                    <h5 style={{ color: '#fff', position: 'relative', top: '5px' }}>{props.eventFee}</h5>
                                    <a href="index.html" className="circle blink">
                                        <div className=""></div>
                                        <h1>LiVE</h1>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
BannerItemHP.propTypes = {
    eventName: PropTypes.string,
    organizerName: PropTypes.string,
    eventID: PropTypes.string,
    eventType: PropTypes.string,
    location: PropTypes.string,
    eventDate: PropTypes.string,
    entryFee: PropTypes.string,
    eventURL: PropTypes.string
}
BannerItemHP.defaultProps = {
    eventName: 'My Event Name',
    organizerName: 'Organizer Name',
    eventID: 'TP_BD00000',
    eventType: 'Badminton',
    location: 'Pune',
    eventDate: '1-Jan-2023',
    entryFee: '200',
    eventURL: './img/badminton.webp'
}

function btnClickEvent(eventType, eventCode) {

}
