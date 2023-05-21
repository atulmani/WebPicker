//import "../config/config.js"
import index from '../index.js'
import React, { useEffect, useState } from 'react'
import BannerItemHP from './BannerItemHP'
import BannerItemSmallHP from './BannerItemSmallHP'
import Loading from './Loading'
// import functions from '@react-native-firebase/functions';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import PropTypes from 'prop-types'

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";


export default function HomePage(props) {
    const [city, setCity] = useState(window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All');
    const [loading, setLoading] = useState(true);
    const [owlSetting, setOwlSetting] = useState();
    const [itemsExists, setItemsExists] = useState(false);
    const [eventList, setEventList] = useState([]);
    const [eventCount, setEventCount] = useState([]);
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
    let eventCntList = [];

    useEffect(() => {
        setCity(window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All');
        // console.log(city);

        // setCity(JSON.parse(window.localStorage.getItem("userLocation")));
        async function fetchData() {
            setLoading(true);

            const eventEntryCount = httpsCallable(functions, "getAllEventEntryCount");
            await eventEntryCount()
                .then((resultCnt) => {
                    let dataCnt = resultCnt.data;
                    // console.log('dataCnt : ', dataCnt);
                    dataCnt.forEach(elementCnt => {
                        let index = eventCntList.findIndex(e => e.EventID === elementCnt.EventID);
                        if (index >= 0) {
                            eventCntList[index].EntryCount = Number(eventCntList[index].EntryCount) + Number(elementCnt.EntryCount);
                            eventCntList[index].CompletedCount = Number(eventCntList[index].CompletedCount) + Number(elementCnt.CompletedCount);

                        } else {
                            eventCntList.push({
                                EventID: elementCnt.EventID,
                                EntryCount: Number(elementCnt.EntryCount),
                                CompletedCount: Number(elementCnt.CompletedCount),
                            })
                        }
                    })
                });
            setEventCount(eventCntList)
            // console.log('eventCntList :', eventCntList);
            const eventSummaryBySports = httpsCallable(functions, "getAllEventWithEventStatusAndLocation");
            // setLoading(true);
            let para = {
                eventStatus: "Active",
                City: city ? city : 'All',
            };
            await eventSummaryBySports(para)
                .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    let data = result.data;
                    var refdate = "";
                    var today = new Date();
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
                        // element.EventEndDate = eDate.toLocaleDateString("en-IN", options);
                        eventEDate = eDate.toLocaleDateString("en-IN", options);
                        if (refdate <= today && eDate >= today && element.EventStatus.toUpperCase() === 'ACTIVE') {
                            element.isLive = true;
                        } else {
                            element.isLive = false;
                        }

                        // element.MinimumFee = element.MinimumFee ? (Number(element.MinimumFee).toLocaleString('en-IN', curFormat)) : "";
                        element.Fees = element.MinimumFee ? (Number(element.MinimumFee).toLocaleString('en-IN', curFormat)) : "";

                        element.EventEDate = eventEDate;

                        element.EventSDate = eventSDate;
                    });
                    setOwlSetting(
                        {
                            responsive: {
                                0: {
                                    items: 2,
                                },
                                600: {
                                    items: 3,
                                },
                                1000: {
                                    items: 5,
                                },
                            },
                        });
                    setEventList(data);
                    //const sanitizedMessage = data.text;
                });
            setLoading(false);

        }
        fetchData();
        setItemsExists(true);


    }, [city, itemsExists]);
    let eventCntForEvent = 0;
    let entryCntForEventCompletedPayment = 0;

    let index = -1;
    // console.log('eventList : ', eventList);
    return (
        <div>
            {/* {console.log("in render")} */}
            <div className="" id="fullContent">

                <div className="city-select-div" style={{ display: 'none' }}>
                    <div className="search">
                        {/* <input type="text" onChange={callOnChange()} placeholder="Enter city" name="" value="" /> */}
                        {/* <input type="text" onChange={this.callOnChange()} placeholder="Enter city" name="" value="" /> */}

                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </div>

                    <div className="cities">
                        <a href="/">Banglore</a>
                        <a href="/">Pune</a>
                        <a href="/">Mumbai</a>
                        <a href="/">Delhi</a>
                        <a href="/">Kolkata</a>
                        <hr />
                        <a href="/">Agra</a>
                        <a href="/">Ahemdabad</a>
                        <a href="/">Ambala</a>
                    </div>

                </div>
                {/* {console.log(loading)} */}
                {loading && <Loading />}
                <section style={{ background: 'linear-Gradient(#333C5D 95%,rgba(0,0,0,0))' }}>
                    <div style={{ paddingTop: '0px' }}>
                        {/* {console.log(this.state.eventList)}
                            {console.log('itemsExists', this.state.itemsExists)} */}
                        {itemsExists && <OwlCarousel
                            className="owl-theme"
                            items={1}
                            nav={true}
                            autoplay
                            smartSpeed={3000}
                            autoplayTimeout={15000}
                            autoplayHoverPause={false}
                            dots={false}
                            loop={true}
                            responsiveRefreshRate={200}
                            stagePadding={30}
                            margin={10}

                            navText={[
                                '<div className="full-nav-arrow left"><div><span class="material-symbols-outlined">arrow_back</span></div></div>',
                                '<div className="full-nav-arrow right"><div><span class="material-symbols-outlined">arrow_forward</span></div></div>'
                            ]}
                        >

                            {eventList.map((events) => {
                                return <div className="item" key={events.Eventid}>
                                    {/* <BannerItemSmallHP
                                            eventLogoURL={events.EventLogo} /> */}
                                    {index = eventCount.findIndex(e => e.EventID === events.Eventid)}
                                    {/* {console.log('index : ', index)} */}
                                    {eventCntForEvent = (index === -1) ? 0 : eventCount[index].EntryCount
                                    }
                                    {entryCntForEventCompletedPayment = (index === -1) ? 0 : eventCount[index].CompletedCount
                                    }

                                    <BannerItemHP eventDetails={events}
                                        entryCntForEvent={eventCntForEvent}
                                        entryCntForEventCompletedPayment={entryCntForEventCompletedPayment}
                                        updateMyEvent={props.updateMyEvent} />


                                </div>

                            })}
                        </OwlCarousel>
                        }
                    </div><br />
                </section><br />
            </div >

        </div >
    )
}
