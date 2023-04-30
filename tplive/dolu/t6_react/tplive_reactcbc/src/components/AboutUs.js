import React from 'react'
import { Link } from 'react-router-dom'

export default function AboutUs() {
    return (
        <div>
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
                    <section id="genre">

                        <div className="container">
                            <br /><br />
                            <div className="heading">
                                <span className="material-symbols-outlined">
                                    free_cancellation
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>About Us</h4>
                            </div><br />

                            <div>

                                <br /><br />
                                <div className="row">
                                    <div className="col-lg-12 mt-2">
                                        <div className="card-body event-card">
                                            <div className="row">
                                                <div>
                                                    <p>
                                                        Welcome to <strong>Tournament Planner LiVE, </strong>this is a Product of <strong>TPLiVE.</strong>
                                                    </p>
                                                    <p>
                                                        <strong>TPLiVE</strong> is a startup whose aspiration is to join
                                                        hands with Digital India and Go-Green. Our mission is to automate the process of creating any kind
                                                        of events like Educational, Sports &amp; Fitness, Art, Music, Dance &amp; Drama, Cultural, Online Shopping
                                                        and many more...
                                                    </p>
                                                    <p>
                                                        Organizing any Tournament manually is always a challenge starting from registration
                                                        forms distribution &amp; collection, payment collection, draws &amp; match schedule preparation
                                                        &amp; publish, umpire &amp; score management, publish result till prize distribution.
                                                    </p>
                                                    <p>
                                                        Our product aims at eliminating all the challenges faced by the <strong>Organizers and
                                                            the Participants.</strong> This Mobile-Enabled Product is designed in an inventive
                                                        way to ensure uninterrupted and smooth usage. Through this, application users can
                                                        interact and keep themselves updated about upcoming tournaments, LiVE match updates,
                                                        results and other Sports related events.
                                                    </p>
                                                    <p>
                                                        We will be happy to provide our services to all the <strong>Tournament Organizers</strong>
                                                        from District &amp; State Sports Committees, Sports Academies, Schools, Corporates,
                                                        Townships, Societies and every enthusiastic Sports lover to encourage Sports with
                                                        health and happiness in their locality.
                                                    </p>
                                                    <p>
                                                        Please reach out to us through whatsapp or email or to meet us at our any upcoming
                                                        events.
                                                    </p>
                                                    <strong>TournamentPlanner LiVE</strong>
                                                    <br />
                                                    <strong>Whatsapp:</strong> +91 8484 966 096
                                                    <br />
                                                    <strong>Email:</strong> connect@tplive.in
                                                    <br />
                                                    <br />
                                                    <Link to="/ContactUs">Contact us</Link>
                                                    <br />
                                                    {/* <a href="TPLive_Contactus.aspx">Plans &amp; Pricing</a>
                                                    <br /> */}
                                                    <Link to="/PrivacyPolicy">Disclaimer</Link>
                                                    <br />
                                                    <Link to="/PrivacyPolicy">Privacy Policy</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <br /><br />

                    </section>

                </div>

            </div>
        </div>
    )
}
