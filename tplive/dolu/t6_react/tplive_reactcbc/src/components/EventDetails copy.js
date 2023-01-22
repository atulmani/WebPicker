import React, { Component, useState } from 'react'
import EventDetailsMenu from './EventDetailsMenu'
import EDTournamentDetails from './EDTournamentDetails'
import EDAboutEvent from './EDAboutEvent'
import '../css/EventDetails.css'

import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";

const app = initializeApp({
    apiKey: "AIzaSyCdr0rrIhy5OczzdSaHKaOA6tnztelN9SE",
    authDomain: "tplive-prod.firebaseapp.com",
    projectId: "tplive-prod",
    databaseURL: "https://tplive-prod.firebaseio.com",
    storageBucket: "tplive-prod.appspot.com",
    messagingSenderId: "67897036742",
    appId: "1:67897036742:web:2a551603b441b3c282acc7",
    measurementId: "G-FW6FG7CLNV",
});

const functions = getFunctions(app, "asia-south1");

export default class EventDetails extends Component {
    constructor() {
        console.log("in constructor");

        //  super(this.props);
        const [eventDetails, setEventDetails] = useState(null);
    }

    async componentDidMount() {
        const getEventSummaryByCity = await httpsCallable(functions, "getEventSummaryByCity");

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

    render() {
        return (
            <div className="container-fluid">
                <div className="row no-gutters">
                    <EventDetailsMenu />
                    <EDTournamentDetails />
                    <EDAboutEvent />
                </div>
                <br></br>
            </div >
        )
    }
}
