import React, { Component } from 'react'
// import firebase from "../firebase"
// import functions from '@react-native-firebase/functions';
import LocationItemLarge from './LocationItemLarge';
import LocationItemSmall from './LocationItemSmall';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";


export default class Location extends Component {
    async componentDidMount() {
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
                this.setState(
                    {
                        locationSummary: data,
                    });

                //const sanitizedMessage = data.text;
            });
    }
    constructor() {
        console.log("in constructor");

        super();
        this.state = {
            locationSummary: [],
        }
    }

    render() {
        return (
            <>
                <section id="city_new">
                    <div className="container"><br />

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="heading">
                                <span className="material-symbols-outlined">
                                    location_city
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>Cities</h4>
                            </div>
                        </div><br />

                        <div className="row no-gutters large">

                            {this.state.locationSummary.map((location) => {
                                return <LocationItemLarge key={location.City} City={location.City} EventCount={location.EventCount} LocationImage={location.LocationImage}></LocationItemLarge>
                            })}


                        </div>


                        <div className="small">
                            <div className="row no-gutters">

                                {this.state.locationSummary.map((location) => {
                                    return <LocationItemSmall key={location.City} City={location.City} EventCount={location.EventCount} LocationImage={location.LocationImage}></LocationItemSmall>
                                })}


                            </div>
                        </div>
                    </div >
                </section >
                <br className="large" /> <br />
            </>

        )
    }
    // locationSelect(city) {
    //     console.log(city)
    //     localStorage['userLocation'] = location;
    //     window.location.href = "index.html";

    // }
}
