import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EventCard(props) {
    const navigate = useNavigate();

    function selectEvent() {
        // var para1 = {};
        window.localStorage.setItem("EventID", JSON.stringify(props.event.Eventid));
        window.localStorage.setItem("EventDetails", JSON.stringify(props.event));

        // para1 = {
        //     EventID: props.eventID //props.eventID
        // };
        // const ret1 = httpsCallable(functions, "getEventDetails");
        // ret1(para1).then((result) => {
        console.log(props.event.Eventid);
        console.log(props.event);
        console.log(props.event.EntryCount);


        navigate("/EventDetails", {
            state: {
                eventID: props.event.Eventid,
                eventDetails: props.event,
                entryCount: props.event.EntryCount
            }
        });

        // });
        //}
    }
    return (
        <div className="col-lg-3 col-md-6 col-sm-12">
            {/* {console.log(props.event)} */}
            <div className="item" style={{ margin: '30px 0 100px 0' }}>
                <div className="event-card" onClick={selectEvent}>
                    <div className="event-card-img">
                        <img src={props.event.EventLogo} alt="" />
                    </div>

                    <div className="event-card-content">
                        <h1 className="event-name">{props.event.EventName}</h1>
                        <h2 className="event-organiser">{props.event.OrganizationName}</h2>
                        {/* <h3 className="rating">
                                            <div className="">
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star_half</span>
                                                <span className="material-symbols-outlined grade">grade</span>
                                            </div>
                                            <small>1,724</small>
                                        </h3> */}

                        <div className="event-schedule-div">
                            <div className="details">
                                <div className="">
                                    <h3>{props.event.City}</h3>
                                    <h4>Location</h4>
                                </div>
                                <div className="">
                                    <h3>{props.event.EventSDate}</h3>
                                    <h4>Starting Date</h4>
                                </div>
                                <div className="">
                                    <h3>{props.event.Fees}</h3>
                                    <h4>Entry Fee</h4>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <button type="button" className="mybutton button5 event-card-button" name="button">Details</button>
                                </div>
                                {/* <div className="col-7">
                                                    <button type="button" className="mybutton button5 event-card-button entries"
                                                        style={{ background: 'none', border: '2px solid #ddd', color: '#aaa' }} name="button">
                                                        <img src="./img/multipleuser.png" alt="" />
                                                        132
                                                    </button>
                                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
        // <div className="col-lg-8 col-md-8 col-sm-12" style={{ padding: '0' }}>
        //     <div style={{ padding: '10px' }}>
        //         {/* {console.log(props)} */}

        //         <div className='reg-category-card' onClick={selectEvent}>

        //             <div className="display-flex-div">
        //                 <div className="category-details">
        //                     <h1>{props && props.event && props.event.EventName}</h1>


        //                     <h3>
        //                         <strong>City : </strong>{props.event.City}
        //                     </h3>
        //                 </div>


        //                 <div className="category-fees">
        //                     <h2 style={{ position: 'relative', top: '5px' }}>
        //                         <span>{props && props.event && props.event.EventStartDate}</span>
        //                     </h2>
        //                 </div>
        //                 <div className="category-fees">
        //                     <h2 style={{ position: 'relative', top: '5px' }}>
        //                         <span>{props && props.event && props.event.MinimumFee}</span>
        //                     </h2>
        //                 </div>

        //             </div>

        //         </div>
        //     </div>
        // </div >

    )
}
