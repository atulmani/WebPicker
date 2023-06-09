import React from 'react'

export default function EventDetailsLogo(props) {
    return (
        <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>
            <img className="event-details-big-image" id="eventLogo" src={props.eventDetails.EventLogo || props.eventDetails.EventLogo !== '' ? props.eventDetails.EventLogo : "./img/banner1.png"} alt="" />
            <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="small-img-row">
                    <div className="small-img-col">
                        <img id="thumb1" src={props.eventDetails.ThumbImage1 ? props.eventDetails.ThumbImage1 : (props.eventDetails.EventLogo || props.eventDetails.EventLogo !== '' ? props.eventDetails.EventLogo : "./img/banner1.png")} width="100%" alt="" className="small-img" />
                    </div>
                    {props.eventDetails.ThumbImage2 && <div className="small-img-col">
                        <img id="thumb2" src={props.eventDetails.ThumbImage2} width="100%" alt="" className="small-img" />
                    </div>}
                    {props.eventDetails.ThumbImage3 && <div className="small-img-col">
                        <img id="thumb3" src={props.eventDetails.ThumbImage3} width="100%" alt="" className="small-img" />
                    </div>}
                    {props.eventDetails.ThumbImage4 && <div className="small-img-col">
                        <img id="thumb4" src={props.eventDetails.ThumbImage4} width="100%" alt="" className="small-img" />
                    </div>}
                </div>
            </div>
        </div>
    )
}
