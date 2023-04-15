import React, { useState, useMemo } from 'react'
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventCard from './EventCard';

export default function Events() {
    const [city, setCity] = useState(window.localStorage.getItem("userLocation") ? window.localStorage.getItem("userLocation").replaceAll('"', '') : 'All');
    const [loading, setLoading] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [eventListFilter, setEventListFilter] = useState([]);
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
                data.forEach(element => {
                    if (element.EventStartDate) {
                        refdate = new Date(element.EventStartDate._seconds * 1000);
                        element.EventStartDate = refdate.toLocaleDateString("en-IN", options);
                    }
                    else {
                        element.EventStartDate = "";
                    }
                    var eDate = new Date(element.EventEndDate._seconds * 1000 + 60 * 60 * 24 * 1000);
                    element.EventEndDate = eDate.toLocaleDateString("en-IN", options);
                    if (refdate <= today && eDate >= today && element.EventStatus.toUpperCase() === 'ACTIVE') {
                        element.isLive = true;
                    } else {
                        element.isLive = false;
                    }

                    element.MinimumFee = element.MinimumFee ? (Number(element.MinimumFee).toLocaleString('en-IN', curFormat)) : "";
                    newData.push({
                        ...element,
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
        console.log('in searchEvent : ', searchKey);

        var newArray = eventList.filter(function (el) {
            return el.searchKey.toUpperCase().includes(searchKey.toUpperCase());
        }
        );
        console.log(newArray);
        setEventListFilter(newArray);
    }
    return (
        <div>
            <div className="col-lg-12 col-md-8 col-sm-12" style={{ padding: '0' }}>

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
            {loading && <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_27H8l4.json" background="transparent" speed="1" loop autoplay></lottie-player>}

            {console.log('memo ', mEvents.then(result => { console.log(result) }))}
            {console.log('memo 4 ', eventListFilter)}

            {
                eventListFilter.map((event) => {
                    return <EventCard key={event.Eventid} event={event} >{event.EventName}</EventCard>
                })


            }
            {(eventListFilter.length <= 0) ? "No event found for given search key, Please enter tournament name, Orgaizer Name or City to search  " : ""}
        </div>
    )
}
