import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EventCard(props) {
    const navigate = useNavigate();

    function selectEvent() {
        // var para1 = {};

        // para1 = {
        //     EventID: props.eventID //props.eventID
        // };
        // const ret1 = httpsCallable(functions, "getEventDetails");
        // ret1(para1).then((result) => {
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
        <div className="col-lg-8 col-md-8 col-sm-12" style={{ padding: '0' }}>
            <div style={{ padding: '10px' }}>
                {/* {console.log(props)} */}

                <div className='reg-category-card' onClick={selectEvent}>

                    <div className="display-flex-div">
                        <div className="category-details">
                            <h1>{props && props.event && props.event.EventName}</h1>


                            <h3>
                                <strong>City : </strong>{props.event.City}
                            </h3>
                        </div>


                        <div className="category-fees">
                            <h2 style={{ position: 'relative', top: '5px' }}>
                                <span>{props && props.event && props.event.EventStartDate}</span>
                            </h2>
                        </div>
                        <div className="category-fees">
                            <h2 style={{ position: 'relative', top: '5px' }}>
                                <span>{props && props.event && props.event.MinimumFee}</span>
                            </h2>
                        </div>

                    </div>

                </div>
            </div>
        </div >

    )
}
