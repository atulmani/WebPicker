/* eslint-disable no-useless-constructor */
import '../css/BannerItemHP.css'
import React, { Component } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";

export default function BannerItemHP(props) {
    const [rating, setRating] = useState("");
    const [buttonProp, setButtonProp] = useState({
        buttonText: '',
        buttonStyle: ''
    });
    const [sportProp, setSportProp] = useState({
        sCode: '',
        imageURL: ''
    });
    const [cnt, setCnt] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        // console.log('props.eventDetails : ', props.eventDetails);

        if (props.eventDetails.ShowParticipantPostPaymentFlag && props.eventDetails.ShowParticipantPostPaymentFlag.toUpperCase() === 'YES') {
            setCnt(props.entryCntForEventCompletedPayment);
        } else {
            setCnt(props.entryCntForEvent);
        }
        // console.log('ctn :: ', cnt);
        if (props.eventDetails.EventMode.toUpperCase() === 'FIXTURE') {
            setButtonProp({
                buttonStyle: 'linear-gradient(to right,#73e336,#08bf1a)',
                buttonText: 'Draw'
            });

        } else if (props.eventDetails.EventMode.toUpperCase() === 'BOOK') {
            setButtonProp({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'Book'
            });
        } else if (props.eventDetails.EventMode.toUpperCase() === 'CLOSED') {
            setButtonProp({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'Closed'
            });

        } else if (props.eventDetails.EventMode.toUpperCase() === 'HOLD') {

            setButtonProp({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'On Hold'
            });

        } else if (props.eventDetails.EventMode.toUpperCase() === 'CANCELLED') {
            setButtonProp({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'Cancelled'
            });

        } else {
            setButtonProp({
                buttonStyle: '',
                buttonText: 'Details'
            });

        }

        switch (props.eventDetails.SportName.toUpperCase()) {
            case 'BADMINTON':
                setSportProp({
                    sCode: 'BD',
                    imageURL: props.eventDetails.EventLogo ? props.eventDetails.EventLogo
                        : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=e6aad2a0-7715-4714-991b-82042fd12b41'
                });

                break;
            case 'CARROM':
                setSportProp({
                    sCode: 'CR',
                    imageURL: props.eventDetails.EventLogo ? props.eventDetails.EventLogo
                        : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fcarrom.webp?alt=media&token=e7d92e92-bfe1-4ed9-9064-62d8e6a7dda6'
                });
                break;
            case 'CHESS':
                setSportProp({
                    sCode: 'CH',
                    imageURL: props.eventDetails.EventLogo ? props.eventDetails.EventLogo
                        : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fchess.webp?alt=media&token=9d10730d-3a38-435f-9bb7-c89aa2334b2c'
                });

                break;
            case 'SQUASH':
                setSportProp({
                    sCode: 'SQ',
                    imageURL: props.eventDetails.EventLogo ? props.eventDetails.EventLogo
                        : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fsquash.webp?alt=media&token=89e9d559-8cab-4504-a123-26ee966e88b0'
                });

                break;
            case 'TABLE TENNIS':
                setSportProp({
                    sCode: 'TT',
                    imageURL: props.eventDetails.EventLogo ? props.eventDetails.EventLogo
                        : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Ftabletennis.webp?alt=media&token=8f1dd9cb-95c8-4b0e-b30d-aedbd8386984'
                });

                break;
            case 'TENNIS':
                setSportProp({
                    sCode: 'TN',
                    imageURL: props.eventDetails.EventLogo ? props.eventDetails.EventLogo
                        : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Ftennis.webp?alt=media&token=72fdf3fc-3bb6-4994-8b84-32780c57abec'
                });

                break;
            default:
                setSportProp({
                    sCode: 'BD',
                    imageURL: props.eventDetails.EventLogo ? props.eventDetails.EventLogo
                        : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=e6aad2a0-7715-4714-991b-82042fd12b41'
                });
        };

    }, [])
    const btnClickEvent = () => {
        // var para1 = {};
        // console.log(props.eventID);
        //async function fetchData() {
        // setLoading(true);
        // console.log()
        // para1 = {
        //     EventID: props.eventDetails.Eventid //props.eventID
        // };
        // console.log('in useEffect', props.eventID)
        // const ret1 = httpsCallable(functions, "getEventDetails");
        // ret1(para1).then((result) => {
        console.log(props.eventDetails);
        window.localStorage.setItem("EventID", JSON.stringify(props.eventDetails.Eventid));
        window.localStorage.setItem("EventDetails", JSON.stringify(props.eventDetails));
        console.log('props.eventDetails', props.eventDetails);
        // console.log("https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx?SCode=" + sportProp.sCode + "&TCode=" + props.eventDetails.EventCode);
        // navigate("/EventDetails", { state: { eventID: props.eventDetails.Eventid, eventDetails: props.eventDetails, entryCount: props.entryCntForEvent } });
        window.location.href = "https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx?SCode=" + sportProp.sCode + "&TCode=" + props.eventDetails.EventCode;
        // });
        //}
    }

    return (
        <>
            {/* let  {eventName, organizerName, eventID, eventType, location, location, entryFee, eventDate} = this.props; */}
            <div className="event-display-card" onClick={btnClickEvent}>
                <div className="row no-gutters">
                    <div className="col-lg-5 col-md-12 col-sm-12">
                        <div className="content">

                            <h1>{props.eventDetails.EventName}</h1>
                            <h2>{props.eventDetails.OrganizationName}</h2>

                            {/* {!(props.eventDetails.ShowParticipantFlag && props.eventDetails.ShowParticipantFlag === 'No') && cnt > 0 && <div className="total-entry-div">
                                <small>Total Entry :  {cnt}</small>
                            </div>
                            } */}
                            {/* {
                                !(props.eventDetails.ShowParticipantFlag && props.eventDetails.ShowParticipantFlag === 'No') && cnt === 0 && props.eventDetails.EventMode.toUpperCase() === 'BOOK' && <div className="total-entry-div" style={{ background: '#099b23' }}>
                                    <small>Be 1st To Register</small>
                                </div>
                            } */}
                            <div style={{ position: 'relative' }}>
                                <h3 className="rating">
                                    <div className=""><span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <span className="material-symbols-outlined">star</span>
                                        <small>100</small></div>
                                </h3>
                            </div>
                            <div className="details">
                                <div className="">



                                    <h3>{props.eventDetails.City}</h3>
                                    <h4>Location</h4>
                                </div>
                                <div className="">
                                    <h3>{props.eventDetails.EventSDate}</h3>
                                    <h4>Event Date</h4>
                                </div>
                                <div className="">
                                    <h3>{props.eventDetails.Fees}</h3>
                                    <h4>Entry Fee</h4>
                                </div>
                            </div>
                            <div className="button-div">
                                <button type="button"
                                    className="mybutton button5 event-card-button" name="button"
                                    style={{ background: buttonProp.buttonStyle }}><span>{buttonProp.buttonText}</span></button>
                                {props.isLive &&
                                    <a className="circle blink" href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + sportProp.sCode + "&TCode=" + props.eventDetails.EventCode}>
                                        <div className=""></div>
                                        <h1>LiVE</h1>
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <div className="image"><img
                            src={sportProp.imageURL}
                            width="100%" alt="" /></div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="mobile-content">
                            <div className="mobile-content-below-div">
                                <div>

                                    <h1>{props.eventDetails.EventName}</h1>
                                    <h2 style={{ color: '#aaa', margin: '0' }}>{props.eventDetails.OrganizationName}</h2>
                                    <div style={{ position: 'relative' }}>
                                        <h3 className="rating">
                                            <div className="">
                                                <span className="material-symbols-outlined">{(1 <= rating) ? 'star' : 'grade'}</span>
                                                <span className="material-symbols-outlined">{(2 <= rating) ? 'star' : 'grade'}</span>
                                                <span className="material-symbols-outlined">{(3 <= rating) ? 'star' : 'grade'}</span>
                                                <span className="material-symbols-outlined">{(4 <= rating) ? 'star' : 'grade'}</span>
                                                <span className="material-symbols-outlined">{(5 <= rating) ? 'star' : 'grade'}</span>
                                                <small>{props.eventDetails.ratingCount ? props.eventDetails.ratingCount : 100}</small>
                                            </div>
                                        </h3>
                                    </div>
                                </div>
                                <div className="button-div">
                                    <button type="button"

                                        className="mybutton button5 event-card-button" name="button"
                                        style={{ background: buttonProp.buttonStyle }}><span>{buttonProp.buttonText}</span></button>
                                    <div style={{ textAlign: 'right' }}>
                                        <h5 style={{ color: '#fff', margin: '0', position: 'relative', top: '10px' }}>{props.eventDetails.City}</h5>
                                        <div className="" style={{ display: 'flex', alignItems: 'center', transform: 'translateY(-3px)' }}>
                                            {!props.eventDetails.isLive && <h5 style={{ color: '#fff', position: 'relative', top: '5px' }}>{props.eventDetails.entryFee}</h5>}

                                            {props.eventDetails.isLive && <div className="">
                                                <a href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + sportProp.sCode + "&TCode=" + props.eventDetails.EventCode} className="circle blink">
                                                    <div className="" style={{ top: '15px' }}></div>
                                                    <h1>LiVE</h1>
                                                </a>
                                            </div>}
                                            <span
                                                style={{ color: '#fff', position: 'relative', left: '-0px', paddingLeft: '10px', fontSize: '1.3rem' }}>|</span>
                                            <h5
                                                style={{ color: '#fff', position: 'relative', top: '13px', left: '-0px', paddingLeft: '10px' }}>
                                                {props.eventDetails.EventSDate}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
