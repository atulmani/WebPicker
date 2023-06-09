import React, { useState, useEffect } from 'react'
// import firebase from "../firebase"
// import functions from '@react-native-firebase/functions';
import LocationItemLarge from './LocationItemLarge';
import LocationItemSmall from './LocationItemSmall';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import Loading from './Loading';



export default function Location(props) {
    const [loading, setLoading] = useState(false);
    const [locationSummary, setLocationSummary] = useState([]);
    useEffect(() => {
        setLoading(true);
        const getEventSummaryByCity = httpsCallable(functions, "getEventSummaryByCity");

        getEventSummaryByCity()
            .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                let data = result.data;
                let totalCount = 0;
                data.forEach(element => {
                    totalCount = totalCount + Number(element.EventCount);
                });
                data = [{
                    City: 'All',
                    EventCount: totalCount,
                    LocationImage: ""
                }].concat(data);
                setLocationSummary(data);
                setLoading(false);
                //const sanitizedMessage = data.text;
            });
    }, [])


    return (
        <>
            <section id="city_new">
                {loading && <Loading></Loading>}
                <div className="container"><br />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="heading">
                            <span className="material-symbols-outlined">
                                location_city
                            </span>
                            <h4 style={{ fontWeight: '1000' }}>Cities</h4>
                        </div>
                    </div><br />
                    {loading && <div className='normal-loading'>
                        <center>
                            <lottie-player src="https://lottie.host/ac41a0d7-3190-4da5-9b9e-14b6ee5d878b/z3WsDYa3Gv.json" style={{ width: '80%' }} background="transparent" speed="1" loop autoplay></lottie-player>
                        </center>
                    </div>}

                    <div className='large'>
                        <div className="row no-gutters">

                            {locationSummary.map((location) => {
                                return <LocationItemLarge key={location.City} City={location.City} EventCount={location.EventCount} LocationImage={location.LocationImage} setCity={props.setCity}></LocationItemLarge>
                            })}


                        </div>
                    </div>


                    <div className="small">
                        <div className="row no-gutters">

                            {locationSummary.map((location) => {
                                return <LocationItemSmall key={location.City} City={location.City} EventCount={location.EventCount} LocationImage={location.LocationImage} setCity={props.setCity}></LocationItemSmall>
                            })}


                        </div>
                    </div>
                </div >
            </section >
            <br className="large" /> <br />
        </>

    )
    // locationSelect(city) {
    //     console.log(city)
    //     localStorage['userLocation'] = location;
    //     window.location.href = "index.html";

    // }
}
