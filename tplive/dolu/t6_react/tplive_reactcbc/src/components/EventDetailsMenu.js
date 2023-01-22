import React from 'react'
import { Link } from 'react-router-dom'

export default function EventDetailsMenu(props) {
    //    console.log('in EventDetailsMenu', props.eventDetails);
    // console.log('thumps image', props.eventDetails.ThumbImage1);
    // console.log('logo image', props.eventDetails.EventLogo);

    // console.log('final image', props.eventDetails.ThumbImage1 ? props.eventDetails.ThumbImage1 : (props.eventDetails.EventLogo || props.eventDetails.EventLogo !== '' ? props.eventDetails.EventLogo : "./img/banner1.png"));

    return (
        <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="event-details-menu-outter">
                <div className="event-details-menu">
                    <Link tp="/EventDetails" className="active">
                        <span className="material-symbols-outlined">
                            info
                        </span>
                        <h1>Details</h1>
                    </Link>
                    <a href="/EventEntries">
                        <span className="material-symbols-outlined">
                            directions_run
                        </span>
                        <h1>Entries</h1>
                    </a>
                    <a href="/EventPartcipants">
                        <span className="material-symbols-outlined">
                            groups
                        </span>
                        <h1>Participants</h1>
                    </a>
                </div>

            </div>

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

        </div>
    )
}



// export default class EventDetailsMenu extends Component {

//     render() {
//         return (
//             <div className="col-lg-8 col-md-8 col-sm-12">
//                 <div className="event-details-menu-outter">
//                     <div className="event-details-menu">
//                         <Link tp="/EventDetails" className="active">
//                             <span className="material-symbols-outlined">
//                                 info
//                             </span>
//                             <h1>Details</h1>
//                         </Link>
//                         <a href="/EventEntries">
//                             <span className="material-symbols-outlined">
//                                 directions_run
//                             </span>
//                             <h1>Entries</h1>
//                         </a>
//                         <a href="/EventPartcipants">
//                             <span className="material-symbols-outlined">
//                                 groups
//                             </span>
//                             <h1>Participants</h1>
//                         </a>
//                     </div>

//                 </div>

//                 <div className="" style={{ textAlign: 'right', position: 'relative', zIndex: '5' }}>
//                     <img className="event-details-big-image" id="eventLogo" src="./img/banner1.png" alt="" />
//                     <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
//                         <div className="small-img-row">
//                             <div className="small-img-col">
//                                 <img id="thumb1" src="" width="100%" alt="" className="small-img" />
//                             </div>
//                             <div className="small-img-col">
//                                 <img id="thumb2" src="" width="100%" alt="" className="small-img" />
//                             </div>
//                             <div className="small-img-col">
//                                 <img id="thumb3" src="" width="100%" alt="" className="small-img" />
//                             </div>
//                             <div className="small-img-col">
//                                 <img id="thumb4" src="" width="100%" alt="" className="small-img" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }

