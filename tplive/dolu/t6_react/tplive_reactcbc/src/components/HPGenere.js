import '../css/HPGenere.css'
import React, { Component, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react';

export default function HPGenere() {
    const [showFlag, setShowFlag] = useState(true);

    let location = useLocation();
    // console.log(location.pathname);

    useEffect(() => {
        if (location.pathname === '/PhoneSignUp' || location.pathname === '/UserProfile') {
            setShowFlag(false);
        } else {
            setShowFlag(true);
        }
    }, [])


    return (

        <section id="genre">

            {showFlag && <div className="container">

                <div className="heading">
                    <span className="material-symbols-outlined">
                        pentagon
                    </span>
                    <h4 style={{ fontWeight: '1000' }}>Our Services</h4>
                </div><br />

                <div className="row no-guttters sports-large-div">


                    <div className="col-lg-2 col-md-4 col-sm-6" style={{ padding: '10px' }}>
                        <div className="genre-card">
                            <div className="img-div">
                                <img src="/img/genre_badminton.png" alt="" />
                            </div>
                            <h2>Badminton</h2>
                            <h3><span id="badmintonCnt">200+</span> Events</h3>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-6" style={{ padding: '10px' }}>
                        <div className="genre-card">
                            <div className="img-div">
                                <img src="/img/genre_tt.png" alt="" />
                            </div>
                            <h2>Table Tennis</h2>
                            <h3><span id="ttCnt">10+</span> Events</h3>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-6" style={{ padding: '10px' }}>
                        <div className="genre-card">
                            <div className="img-div">
                                <img src="/img/genre_tennis.png" alt="" />
                            </div>
                            <h2>Tennis</h2>
                            <h3><span id="marathonCnt">0</span> Events</h3>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-6" style={{ padding: '10px' }}>
                        <div className="genre-card">
                            <div className="img-div">
                                <img src="/img/genre_squash.png" alt="" />
                            </div>
                            <h2>Squash</h2>
                            <h3><span id="skatingCnt">0</span> Events</h3>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-6" style={{ padding: '10px' }}>
                        <div className="genre-card">
                            <div className="img-div">
                                <img src="/img/genre_chess.png" alt="" />
                            </div>
                            <h2>Chess</h2>
                            <h3><span id="chessCnt">10+</span> Events</h3>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-6" style={{ padding: '10px' }}>
                        <div className="genre-card">
                            <div className="img-div">
                                <img src="/img/genre_carrom.png" alt="" />
                            </div>
                            <h2>Carrom</h2>
                            <h3><span id="carromCnt">10+</span> Events</h3>
                        </div>
                    </div>

                </div>

                <div className="sports-small-div">
                    <div className="row no-gutters">

                        <div className="col-4" style={{ padding: '10px' }}>
                            <div className="genre-card">
                                <div className="img-div">
                                    <img src="/img/genre_badminton.png" alt="" />
                                </div>
                                <h2>Badminton</h2>
                                <h3><span id="badmintonCntSmall">200+</span> Events</h3>
                            </div>

                        </div>

                        <div className="col-4" style={{ padding: '10px' }}>
                            <div className="genre-card">
                                <div className="img-div">
                                    <img src="/img/genre_tt.png" alt="" />
                                </div>
                                <h2>Table Tennis</h2>
                                <h3><span id="ttCntSmall">10+</span> Events</h3>
                            </div>
                        </div>

                        <div className="col-4" style={{ padding: '10px' }}>
                            <div className="genre-card">
                                <div className="img-div">
                                    <img src="/img/genre_tennis.png" alt="" />
                                </div>
                                <h2>Tennis</h2>
                                <h3><span id="marathonCntSmall">0</span> Events</h3>
                            </div>
                        </div>

                        <div className="col-4" style={{ padding: '10px' }}>
                            <div className="genre-card">
                                <div className="img-div">
                                    <img src="/img/genre_squash.png" alt="" />
                                </div>
                                <h2>Squash</h2>
                                <h3><span id="skatingCntSmall">0</span> Events</h3>
                            </div>
                        </div>

                        <div className="col-4" style={{ padding: '10px' }}>
                            <div className="genre-card">
                                <div className="img-div">
                                    <img src="/img/genre_chess.png" alt="" />
                                </div>
                                <h2>Chess</h2>
                                <h3><span id="chessCntSmall">10+</span> Events</h3>
                            </div>
                        </div>

                        <div className="col-4" style={{ padding: '10px' }}>
                            <div className="genre-card">
                                <div className="img-div">
                                    <img src="/img/genre_carrom.png" alt="" />
                                </div>
                                <h2>Carrom</h2>
                                <h3><span id="carromCntSmall">10+</span> Events</h3>
                            </div>
                        </div>

                    </div>
                </div>

            </div>}
            {/* <PartnerHP></PartnerHP> */}
            {/* <div className="container">

                <div className="row no-gutters">
                    <div className="col-md-12 col-md-offset-1">
                        <div id="ads-carousel" className="owl-carousel owl-theme">
                            <div className="carousel-item active">
                                <img src="/img/ads_1.webp" width="100%" alt="" />
                            </div>

                            <div className="carousel-item active">
                                <img src="/img/ads_5.gif" width="100%" alt="" />
                            </div>

                            <div className="carousel-item active">
                                <img src="/img/ads_2.gif" width="100%" alt="" />
                            </div>

                            <div className="carousel-item active">
                                <img src="/img/ads_6.webp" width="100%" alt="" />
                            </div>

                            <div className="carousel-item active">
                                <img src="/img/ads_3.webp" width="100%" alt="" />
                            </div>

                            <div className="carousel-item active">
                                <img src="/img/ads_4.gif" width="100%" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <br></br>
        </section>

    )
}
