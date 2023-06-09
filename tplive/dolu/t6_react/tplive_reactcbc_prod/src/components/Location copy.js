import React, { Component } from 'react'
// import firebase from "../firebase"
// import functions from '@react-native-firebase/functions';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";
import LocationItemLarge from './LocationItemLarge';

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

export default class Location extends Component {
    async componentDidMount() {
        const getEventSummaryByCity = await httpsCallable(functions, "getEventSummaryByCity");

        getEventSummaryByCity()
            .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                let data = result.data;
                this.setState(
                    {
                        locationSummary: data,
                    });

                //const sanitizedMessage = data.text;
            });
    }
    constructor() {
        // console.log("in constructor");

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
                                return <LocationItemLarge City={location.City} EventCount={location.EventCount} LocationImage={location.LocationImage}></LocationItemLarge>
                            })}

                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/jaipuricon.png" alt="" />
                            //         </div>
                            //         <h2>All</h2>
                            //         <h3><span id="allCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Pune')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/puneicon.png" alt="" />
                            //         </div>
                            //         <h2>Pune</h2>
                            //         <h3><span id="puneCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Bangalore')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/bangloreicon.png" alt="" />
                            //         </div>
                            //         <h2>Banglore</h2>
                            //         <h3><span id="bangaloreCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Mysore')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img style={{ padding: '6px' }} src="./img/mysoreicon.png" alt="" />
                            //         </div>
                            //         <h2>Mysore</h2>
                            //         <h3><span id="mysoreCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Chennai')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/chennaiicon.png" alt="" />
                            //         </div>
                            //         <h2>Chennai</h2>
                            //         <h3><span id="chennaiCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Mumbai')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/mumbaiicon.png" alt="" />
                            //         </div>
                            //         <h2>Mumbai</h2>
                            //         <h3><span id="mumbaiCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Buldhana')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/hyderabadicon.png" alt="" />
                            //         </div>
                            //         <h2>Buldhana</h2>
                            //         <h3><span id="buldhanaCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Hyderabad')}
                            //     style={{ padding: '10px', display: 'none' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/hyderabadicon.png" alt="" />
                            //         </div>
                            //         <h2>Hyderabad</h2>
                            //         <h3><span id="hyderabadCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Delhi')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/delhiicon.png" alt="" />
                            //         </div>
                            //         <h2>Delhi</h2>
                            //         <h3><span id="delhiCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>

                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Lucknow')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/lucknowicon.png" alt="" />
                            //         </div>
                            //         <h2>Lucknow</h2>
                            //         <h3><span id="lucknowCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Jaipur')}
                            //     style={{ padding: '10px', display: 'none' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/jaipuricon.png" alt="" />
                            //         </div>
                            //         <h2>Jaipur</h2>
                            //         <h3><span id="jaipurCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Ahemdabad')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/ahemdabadicon.png" alt="" />
                            //         </div>
                            //         <h2>Ahemdabad</h2>
                            //         <h3><span id="ahemdabadCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Chandigarh')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/chandigarhicon.png" alt="" />
                            //         </div>
                            //         <h2>Chandigarh</h2>
                            //         <h3><span id="chandigarhCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>
                            // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect('Kolkata')} style={{ padding: '10px' }}>
                            //     <div className="genre-locoation-card">
                            //         <div className="">
                            //             <img src="./img/kolkataicon.png" alt="" />
                            //         </div>
                            //         <h2>Kolkata</h2>
                            //         <h3><span id="kolkataCnt1">0</span> Events</h3>
                            //     </div>
                            // </div>

                        </div>


                <div className="small">
                    <div className="row no-gutters">

                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('All')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/jaipuricon.png" alt="" />
                                </div>
                                <h2>All</h2>
                                <h3><span id="allCnt">0</span> Events</h3>
                            </div>
                        </div>

                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Pune')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/puneicon.png" alt="" />
                                </div>
                                <h2>Pune</h2>
                                <h3><span id="puneCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Bangalore')}>

                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/bangloreicon.png" alt="" />
                                </div>
                                <h2>Banglore</h2>
                                <h3><span id="bangaloreCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Mysore')}>

                            <div className="genre-locoation-card">
                                <div className="">
                                    <img style={{ padding: '6px' }} src="./img/mysoreicon.png" alt="" />
                                </div>
                                <h2>Mysore</h2>
                                <h3><span id="mysoreCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Chennai')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/chennaiicon.png" alt="" />
                                </div>
                                <h2>Chennai</h2>
                                <h3><span id="chennaiCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Mumbai')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/mumbaiicon.png" alt="" />
                                </div>
                                <h2>Mumbai</h2>
                                <h3><span id="mumbaiCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Buldhana')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/hyderabadicon.png" alt="" />
                                </div>
                                <h2>Buldhana</h2>
                                <h3><span id="buldhanaCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px', display: 'none' }} onClick={this.locationSelect('Hyderabad')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/hyderabadicon.png" alt="" />
                                </div>
                                <h2>Hyderabad</h2>
                                <h3><span id="hyderabadCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Delhi')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/delhiicon.png" alt="" />
                                </div>
                                <h2>Delhi</h2>
                                <h3><span id="delhiCnt">0</span> Events</h3>
                            </div>
                        </div>

                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Lucknow')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/lucknowicon.png" alt="" />
                                </div>
                                <h2>Lucknow</h2>
                                <h3><span id="lucknowCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px', display: 'none' }} onClick={this.locationSelect('Jaipur')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/jaipuricon.png" alt="" />
                                </div>
                                <h2>Jaipur</h2>
                                <h3><span id="jaipurCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Ahemdabad')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/ahemdabadicon.png" alt="" />
                                </div>
                                <h2>Ahemdabad</h2>
                                <h3><span id="ahemdabadCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Chandigarh')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/chandigarhicon.png" alt="" />
                                </div>
                                <h2>Chandigarh</h2>
                                <h3><span id="chandigarhCnt">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '10px' }} onClick={this.locationSelect('Kolkata')}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/kolkataicon.png" alt="" />
                                </div>
                                <h2>Kolkata</h2>
                                <h3><span id="kolkataCnt">0</span> Events</h3>
                            </div>
                        </div>

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
