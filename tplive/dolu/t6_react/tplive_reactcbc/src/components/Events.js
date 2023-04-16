import React, { useState, useMemo, useRef } from 'react'
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventCard from './EventCard';
import '../css/Events.css';

export default function Events() {
    const [minValue, setMinValue] = useState(2018);

    const [maxValue, setMaxValue] = useState(new Date().getFullYear());
    const [sliderValue, setSliderValue] = useState(new Date().getFullYear());

    // console.log(curYear);
    // const sliderValue = document.getElementById('sliderValue');
    // const inputSlider = document.getElementById('inputSlider');
    // const rightValue = document.getElementById('rightValue');

    // rightValue.textContent = currentYear;
    // inputSlider.max = currentYear;
    // inputSlider.value = currentYear;
    // sliderValue.textContent = currentYear;



    // inputSlider.onblur = (() => {
    //     sliderValue.classList.remove('show');
    // });



    const [city, setCity] = useState(window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All');
    const [loading, setLoading] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [eventListFilter, setEventListFilter] = useState([]);
    const [sliderLeftPer, setSliderLeftPer] = useState({ left: '100%' });
    // const [sliderLeftPer] = useRef({ left: '100%' });

    // const [eventCount, setEventCount] = useState([]);
    const [searchKey, setSearchKey] = useState('');
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
    // let eventCntList = [];

    async function getEventList() {
        // const getEventList = async () => {
        console.log('in getEventList');
        const eventSummaryBySports = httpsCallable(functions, "getAllEventWithEventStatusAndLocation");
        // OrganizationName
        setLoading(true);
        let para = {
            eventStatus: "Active",
            City: city ? city : 'All',
        };
        return await eventSummaryBySports(para)
            .then(async (result) => {
                let data = result.data;
                var refdate = "";
                var today = new Date();
                var newData = [];
                var eventSDate = '';
                var eventEDate = '';
                data.forEach(element => {
                    if (element.EventStartDate) {
                        refdate = new Date(element.EventStartDate._seconds * 1000);
                        // element.EventStartDate = refdate.toLocaleDateString("en-IN", options);
                        eventSDate = refdate.toLocaleDateString("en-IN", options);
                    }
                    else {
                        eventSDate = "";
                    }
                    var eDate = new Date(element.EventEndDate._seconds * 1000 + 60 * 60 * 24 * 1000);
                    //element.EventEndDate = eDate.toLocaleDateString("en-IN", options);
                    eventEDate = eDate.toLocaleDateString("en-IN", options);
                    if (refdate <= today && eDate >= today && element.EventStatus.toUpperCase() === 'ACTIVE') {
                        element.isLive = true;
                    } else {
                        element.isLive = false;
                    }

                    // element.MinimumFee = element.MinimumFee ? (Number(element.MinimumFee).toLocaleString('en-IN', curFormat)) : "";
                    newData.push({
                        ...element,
                        EventSDate: eventSDate,
                        EventEDate: eventSDate,
                        Fees: element.MinimumFee ? (Number(element.MinimumFee).toLocaleString('en-IN', curFormat)) : "",
                        flag: true,
                        searchKey: element.EventName + element.EventOwnerName + element.OrganizationName + element.City
                    })
                });
                setLoading(false);
                setEventListFilter(newData);
                return newData;
            });

    }
    const mEvents = useMemo(async () => {
        return await getEventList().then(result => {
            setEventList(result);

            return result;
        })

        // const response = await getEventList().then(rec => {
        //     return rec
        // });
        // return response;

    }, [city]);


    function searchEvent() {
        // console.log('in searchEvent : ', searchKey);

        var newArray = eventList.filter(function (el) {
            return el.searchKey.toUpperCase().includes(searchKey.toUpperCase());
        }
        );
        // console.log(newArray);
        setEventListFilter(newArray);
    }
    let eDate = ''
    return (
        <div>

            <section id="event-new">
                <div className="container"><br /><br />

                    <div className='row no-gutters'>

                        <div className='col-lg-6 col-md-6 col-sm-12'>

                            <div className="" style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                                <div className="year-range">
                                    <div className="slider-value">
                                        <span id="sliderValue" class="show" style={sliderLeftPer}>{sliderValue}</span>
                                    </div>
                                    <div className="draging-field">
                                        <div className="value left">
                                            {minValue}
                                        </div>
                                        <input id="inputSlider" type="range" min={minValue} max={maxValue} value={sliderValue}
                                            onChange={(e) => {

                                                let difference = maxValue - minValue;
                                                // console.log((e.target.value - minValue) * 100 / difference + '%');
                                                setSliderLeftPer({ left: (e.target.value - minValue) * 100 / difference + '%' });

                                                // sliderLeftPer.current = { left: (e.target.value - minValue) * 100 / difference + '%' };

                                                setSliderValue(e.target.value);
                                            }}
                                            steps="1" />
                                        <div className="value right" id='rightValue'>
                                            {maxValue}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <br className='small'></br>
                            <br className='small'></br>
                            <div className='event-search-div'>
                                <div>
                                    <input type="text" id="userName" placeholder='e.g. event name or location etc' required onChange={(e) => {
                                        setSearchKey(e.target.value)
                                        searchEvent()

                                    }} value={searchKey} />
                                    <button className="mybutton button5" onClick={() => {
                                        searchEvent();

                                    }}>
                                        <span class="material-symbols-outlined">
                                            search
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="row no-gutters">
                        {loading && <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_9yosyj7r.json" style={{ height: '400px' }} background="transparent" speed="1" loop autoplay></lottie-player>}

                        {
                            eventListFilter.map((event) => {
                                var eDate = new Date(event.EventStartDate._seconds * 1000 + 60 * 60 * 24 * 1000);
                                // console.log(event.EventName, "::", eDate.getFullYear(), "::slider value :: ", sliderValue);
                                if (eDate.getFullYear() === Number(sliderValue)) {
                                    return <EventCard key={event.Eventid} event={event} >{event.EventName}</EventCard>
                                }
                                else {
                                    return null
                                }
                            })


                        }
                        {/* {(eventListFilter.length <= 0) ? "No event found for given search key, Please enter tournament name, Orgaizer Name or City to search  " : ""} */}

                        {/* <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="item" style={{ margin: '30px 0 100px 0' }}>
                                <a href="#event-new" className="event-card">
                                    <div className="event-card-img">
                                        <img src="img/eventnew2.png" alt="" />
                                    </div>

                                    <div className="event-card-content">
                                        <h1 className="event-name">Prakash Padukone Badminton Tournament 2022 Badminton Tournament</h1>
                                        <h2 className="event-organiser">Prakash Padukone Badminton Academy</h2>
                                        <h3 className="rating">
                                            <div className="">
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star_half</span>
                                                <span className="material-symbols-outlined grade">grade</span>
                                            </div>
                                            <small>1,724</small>
                                        </h3>

                                        <div className="event-schedule-div">
                                            <div className="details">
                                                <div className="">
                                                    <h3>Chennai</h3>
                                                    <h4>Location</h4>
                                                </div>
                                                <div className="">
                                                    <h3>12 Jun 2022</h3>
                                                    <h4>Starting Date</h4>
                                                </div>
                                                <div className="">
                                                    <h3>₹ 600</h3>
                                                    <h4>Entry Fee</h4>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12">
                                                    <button type="button" className="mybutton button5 event-card-button" name="button">Details</button>
                                                </div>
                                                <div className="col-7">
                                                    <button type="button" className="mybutton button5 event-card-button entries"
                                                        style={{ background: 'none', border: '2px solid #ddd', color: '#aaa' }} name="button">
                                                        <img src="./img/multipleuser.png" alt="" />
                                                        132
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </a>
                            </div>
                        </div> */}

                    </div>

                </div>
            </section>

            {/* <div className="col-lg-12 col-md-8 col-sm-12" style={{ padding: '0' }}>

                <div className="reg-participant-form-field profile-name-input" >
                    <input type="text" id="userName" placeholder='Search Key' required onChange={(e) => {
                        setSearchKey(e.target.value)

                    }} value={searchKey} />
                    <button className="mybutton button5" onClick={() => {
                        searchEvent();

                    }}>Search Event
                    </button>
                </div>
            </div>
 */}

            {(eventListFilter.length <= 0) ? "No event found for given search key, Please enter tournament name, Orgaizer Name or City to search  " : ""}
        </div>
    )
}
