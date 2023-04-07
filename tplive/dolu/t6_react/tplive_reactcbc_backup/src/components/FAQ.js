import React from 'react'
import { Link } from 'react-router-dom'

export default function FAQ() {
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

                        <div class="container">
                            <br /><br />
                            <div class="heading">
                                <span class="material-symbols-outlined">
                                    free_cancellation
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>Frequently Asked Questions</h4>
                            </div><br />

                            <div>


                                <br /><br />

                                <div class="row">
                                    <div class="col-lg-12 mt-2">
                                        <div class="card-body event-card">
                                            <button type="button" class="btn col-lg-12 text-left" data-toggle="collapse" data-target="#FAQ1" style={{ backgroundColor: '#378FCF', color: '#fff' }}>
                                                <i class="fa fa-angle-double-down" style={{ fontSize: 'x-large', fontWeight: 'bolder', color: 'white', paddingTop: '0px', paddingRight: '20px' }}></i>
                                                What is TPLiVE?
                                            </button>
                                            <div id="FAQ1" class="collapse" style={{ paddingTop: '8px' }}>
                                                TPLiVE - TournamentPlanner LiVE is a startup whose aspiration is to join hands with
                                                Digital India and Go-Green. Our mission is to automate any Sports &amp; non-Sports event
                                                planning &amp; execution digitally, thereby eliminating uses of paper. Organizing any
                                                event manually is always a challenge starting from registration forms distribution
                                                &amp; collection, payment collection, participant name publish, draws or fixtures &amp;
                                                event schedule preparation &amp; publish, score management, publish result till prize
                                                distribution &amp; event photo gallery.
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 mt-2">

                                        <div class="card-body event-card">
                                            <button type="button" class="btn col-lg-12 text-left" data-toggle="collapse" data-target="#FAQ1" style={{ backgroundColor: '#378FCF', color: '#fff' }}>
                                                <i class="fa fa-angle-double-down" style={{ fontSize: 'x-large', fontWeight: 'bolder', color: 'white', paddingTop: '0px', paddingRight: '20px' }}></i>
                                                # of Sports covering TPLiVE?
                                            </button>
                                            <div id="FAQ2" class="collapse" style={{ paddingTop: '8px' }}>
                                                This product supports 20+ Sports (most of the indoor &amp; outdoor Sports)
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-lg-12 mt-2">

                                        <div class="card-body event-card">
                                            <button type="button" class="btn col-lg-12 text-left" data-toggle="collapse" data-target="#FAQ1" style={{ backgroundColor: '#378FCF', color: '#fff' }}>
                                                <i class="fa fa-angle-double-down" style={{ fontSize: 'x-large', fontWeight: 'bolder', color: 'white', paddingTop: '0px', paddingRight: '20px' }}></i>
                                                Who can use this product?
                                            </button>
                                            <div id="FAQ3" class="collapse" style={{ paddingTop: '8px' }}>
                                                All Organizers, Sponsors, Participants, Sports Committees, Sports Academies, Schools, Corporates, Townships, Societies and every enthusiastic Sports lovers.
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-lg-12 mt-2">


                                        <div class="card-body event-card">
                                            <button type="button" class="btn col-lg-12 text-left" data-toggle="collapse" data-target="#FAQ1" style={{ backgroundColor: '#378FCF', color: '#fff' }}>
                                                <i class="fa fa-angle-double-down" style={{ fontSize: 'x-large', fontWeight: 'bolder', color: 'white', paddingTop: '0px', paddingRight: '20px' }}></i>
                                                How to create a Event?
                                            </button>
                                            <div id="FAQ4" class="collapse" style={{ paddingTop: '8px' }}>
                                                Organizers can reach us to create event in the system.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-12 mt-2">

                                        <div class="card-body event-card">
                                            <button type="button" class="btn col-lg-12 text-left" data-toggle="collapse" data-target="#FAQ1" style={{ backgroundColor: '#378FCF', color: '#fff' }}>
                                                <i class="fa fa-angle-double-down" style={{ fontSize: 'x-large', fontWeight: 'bolder', color: 'white', paddingTop: '0px', paddingRight: '20px' }}></i>
                                                How it works?
                                            </button>
                                            <div id="FAQ5" class="collapse" style={{ paddingTop: '8px' }}>
                                                Organizers can reach us to create event in the system. Organizers can get autogenerated email with all the event details. Once event is active, it will be populated under Events section on the website. Accordingly the Participants can register for the event. Once Participant registration completed, Fixtures or DRAWS & event schedule will be generated and published accordingly.
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-12 mt-2">


                                        <div class="card-body event-card">
                                            <button type="button" class="btn col-lg-12 text-left" data-toggle="collapse" data-target="#FAQ1" style={{ backgroundColor: '#378FCF', color: '#fff' }}>
                                                <i class="fa fa-angle-double-down" style={{ fontSize: 'x-large', fontWeight: 'bolder', color: 'white', paddingTop: '0px', paddingRight: '20px' }}></i>
                                                Are we promote advertisement?
                                            </button>
                                            <div id="FAQ6" class="collapse" style={{ paddingTop: '8px' }}>
                                                Ofcourse, we would be more than happy to join hands with all the academies & classes (sports & non-sports) and publish the details on the website under TPLiVE-WALL section.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div class="row">
                            <div class="col-lg-12 mt-2">
                                <div class="card-body event-card">
                                    <h5 class="event-det-head event-duration">
                                        <strong>More Questions?</strong></h5>
                                    <div class="row">
                                        <p class="event-data event-duration">
                                            You can contact us at
                                            <br />
                                            <strong>Whatsapp:</strong> +91 8484 966 096
                                            <br />
                                            <strong>Email:</strong> <a href="mailto:connect@tplive.in">connect@tplive.in</a>
                                        </p>
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
