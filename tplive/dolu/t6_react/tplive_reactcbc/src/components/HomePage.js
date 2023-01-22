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


export default function HomePage() {
    const [city, setCity] = useState(window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All');
    const [loading, setLoading] = useState(true);
    const [owlSetting, setOwlSetting] = useState();
    const [itemsExists, setItemsExists] = useState(false);
    const [eventList, setEventList] = useState([]);
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

    useEffect(() => {
        setCity(window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All');
        console.log(city);

        // setCity(JSON.parse(window.localStorage.getItem("userLocation")));
        async function fetchData() {
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

                    data.forEach(element => {
                        if (element.EventStartDate) {
                            refdate = new Date(element.EventStartDate._seconds * 1000);
                            element.EventStartDate = refdate.toLocaleDateString("en-IN", options);
                        }
                        else {
                            element.EventStartDate = "";
                        }
                        var eDate = new Date(element.EventEndDate._seconds * 1000 + 60 * 60 * 24 * 1000);
                        if (refdate <= today && eDate >= today && element.EventStatus.toUpperCase() === 'ACTIVE') {
                            element.isLive = true;
                        } else {
                            element.isLive = false;
                        }

                        element.MinimumFee = element.MinimumFee ? (Number(element.MinimumFee).toLocaleString('en-IN', curFormat)) : "";

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


        }
        fetchData();
        setLoading(false);
        setItemsExists(true);
    }, [city, loading, itemsExists]);

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
                            nav={false}
                            autoplay
                            smartSpeed={3000}
                            autoplayTimeout={15000}
                            autoplayHoverPause={false}
                            dots={true}
                            loop={true}
                            responsiveRefreshRate={200}
                            stagePadding={30}
                            margin={10}

                            navText={[
                                '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
                                '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
                            ]}
                        >

                            {eventList.map((events) => {
                                return <div className="item" key={events.Eventid}>
                                    {/* <BannerItemSmallHP
                                            eventLogoURL={events.EventLogo} /> */}

                                    <BannerItemHP eventName={events.EventName} eventType={events.EventType}
                                        eventDate={events.EventStartDate}
                                        eventEndDate={events.EventEndDate}
                                        eventID={events.Eventid}
                                        eventCode={events.EventCode}
                                        eventStatus={events.EventStatus ? events.EventStatus.toUpperCase() : 'ACTIVE'}
                                        organizerName={events.OrganizationName}
                                        location={events.City}
                                        entryFee={events.MinimumFee}
                                        eventLogoURL={events.EventLogo}
                                        sportName={events.SportName ? events.SportName : ""}
                                        rating={events.rating ? events.rating : 5}
                                        ratingCount={events.ratingCount ? events.ratingCount : 100}
                                        isLive={events.isLive}
                                        eventMode={events.EventMode ? events.EventMode.toUpperCase() : 'OPEN'} />

                                </div>

                            })}
                        </OwlCarousel>
                        }
                    </div><br />
                </section><br />
            </div>

        </div >
    )
}


    // getEventList(filter) {
    //     var para = {};
    //     if (this.state.userLocation === undefined || this.state.userLocation === "" || this.state.userLocation === null) {
    //         // this.setState(this.state.userLocation = "All");
    //         // document.getElementById('location').innerHTML = "Location";
    //     } else {
    //         // document.getElementById('location').innerHTML = this.state.userLocation;
    //     }
    //     para = {
    //         eventStatus: "Active",
    //         City: this.state.userLocation,
    //     };
    //     // console.log(para);
    //     var ret = "";

    //     ret = functions.httpsCallable("getAllEventWithEventStatusAndLocation");
    //     // console.log('getAllEventWithEventStatusAndLocation');
    //     //}
    //     let index = 0
    //     ret(para).then(results => {

    //         for (index = 0; index < results.data.length; index++) {
    //         }
    //         // document.getElementById('loading').style.display = 'none';
    //     })
    //         .then(function (res) {
    //             //activate first item of both pard items

    //         });
    //     // });
    // }

