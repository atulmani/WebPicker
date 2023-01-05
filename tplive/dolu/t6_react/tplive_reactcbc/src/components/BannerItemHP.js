/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'

export default class BannerItemHP extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            // let  { eventName, organizerName, eventID, eventType, location, location, entryFee, eventDate } = this.props;
            < div className="item" >
                <div className="event-display-card">
                    <div className="row no-gutters">
                        <div className="col-lg-5 col-md-12 col-sm-12">
                            <div className="content large">
                                {/* <h1>{this.props.eventName} </h1> */}
                                <h1>{this.props.eventName} </h1>

                                <h2>{this.props.organizerName}</h2>
                                <input type="hidden" id="hfeventID" value={this.props.eventID}></input>
                                <input type="hidden" id="hfeventType" value={this.props.eventType}></input>

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
                                        <h3>{this.props.location}</h3>
                                        <h4>Location</h4>
                                    </div>
                                    <div className="">
                                        <h3>{this.props.eventDate}</h3>
                                        <h4>Event Date</h4>
                                    </div>
                                    <div className="">
                                        <h3>{this.props.entryFee}</h3>
                                        <h4>Entry Fee</h4>
                                    </div>
                                </div>

                                <div className="button-div">
                                    <button type="button" onClick={this.btnClickEvent(this.props.eventType, this.props.eventCode)} className="mybutton button5 event-card-button" name="button">
                                        {/* <button type="button" className="mybutton button5 event-card-button" name="button"> */}

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
                                <img src={this.props.eventLogoURL} width="100%" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="mobile-content small">
                                <h1>{this.props.eventName}</h1>
                                <h2>{this.props.organizerName}</h2>
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
                                    <h1>{this.props.location}</h1>
                                </div>
                                <div className="details" style={{ width: '100%' }}>
                                    <div className="">
                                        <h3>{this.props.location}</h3>
                                        <h4>Location</h4>
                                    </div>
                                    <div className="">
                                        <h3>{this.props.eventDate}</h3>
                                        <h4>Event Date</h4>
                                    </div>
                                    <div className="">
                                        <h3>{this.props.entryFee}</h3>
                                        <h4>Entry Fee</h4>
                                    </div>
                                </div>

                                <div className="button-div">
                                    <button type="button" onClick={this.btnClickEvent(this.props.eventType, this.props.eventCode)} className="mybutton button5 event-card-button" name="button">
                                        {/* <button type="button" className="mybutton button5 event-card-button" name="button"> */}

                                        <span>Book</span>
                                    </button>

                                    <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                                        <h5 style={{ color: '#fff', position: 'relative', top: '5px', left: '-0px', paddingRight: '10px' }}>{this.props.eventDate}</h5>
                                        <span style={{ color: '#fff', position: 'relative', left: '-0px', paddingRight: '10px', fontSize: '1.3rem' }}>|</span>
                                        <h5 style={{ color: '#fff', position: 'relative', top: '5px' }}>{this.props.eventFee}</h5>
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
    btnClickEvent(eventType, eventCode) {

    }
}
