import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Footer.css'
export default class Footer extends Component {
    render() {
        return (
            <div>
                <section id="footer" className="large">

                    <div className="container"><br />

                        <div className="footer-logo">
                            <img src="/img/TPLiVE_text_white.png" width="230px" alt="" />
                        </div><br />

                        <div className="hr">

                        </div>
                        <br />

                        <div className="row no-gutters">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="footer-details footer-large">
                                    <p>
                                        Welcome to Tournament Planner LiVE. <br /> TPLiVE is a platform that helps you
                                        to discover and book the variety of Sports Events you like in your city.
                                        TPLiVE is a startup whose aspiration is to join hands with
                                        Digital India and Go-Green. Our mission is to automate the
                                        process of creating any kind of Sports events and many more...
                                    </p><br />

                                    <h3>FOR EVENT ORGANIZERS</h3>
                                    <p>Organizing any Event manually is always a challenge starting from booking, payment collection,
                                        fixture & schedule preparation, score management and publish the result till prize distribution.
                                        Our product aims at eliminating all the challenges faced by the
                                        Organizers and the Participants. This Mobile-Enabled Product is designed in an
                                        innovative way to ensure uninterrupted and smooth usage. Through this,
                                        application users can interact and keep themselves updated about upcoming events,
                                        LiVE scores & updates, results and other Sports related details.

                                        We will be happy to provide our services to all the Event Organizers from
                                        District & State Sports Associations, Sports Academies, Schools, Corporates,
                                        Townships, Societies and every enthusiastic Sports lover to encourage Sports
                                        with health and happiness in their locality.
                                    </p>
                                    <br></br>

                                    <Link to="/ContactUs" style={{ margin: '0 5px' }}>
                                        <button type="button" className="mybutton button5" name="button">Connect with us</button>
                                    </Link>

                                </div>


                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="footer-links" style={{ paddingTop: '0' }}>
                                    <div className="" style={{ border: 'none' }}>
                                        <Link to="/AboutUs">About Us</Link>
                                    </div>
                                    <div className="">
                                        <Link to="/ContactUs">Contact Us</Link>
                                    </div>
                                    <div className="">
                                        <Link to="/FAQ">FAQ's</Link>
                                    </div>
                                    <div className="">
                                        <Link to="/TermsAndConditions">Terms & Conditions</Link>
                                    </div>
                                    <div className="">
                                        <Link to="/PrivacyPolicy">Privacy Policy</Link>
                                    </div>
                                </div><br />

                                <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="icons footer">
                                        <a href="https://www.facebook.com/TournamentPlanner/?ti=as"> <i className="fab fa-facebook-f"></i> </a>
                                        <a href="https://twitter.com/TPLIVE7/status/1144269372854288385?s=08"> <i className="fab fa-twitter"></i> </a>
                                        <a href="https://www.youtube.com/channel/UCNkSsrEoWHJ_eWvLSQiGNug"> <i className="fab fa-youtube"></i> </a>
                                        <a href="https://www.instagram.com/tplive.in/"> <i className="fab fa-instagram"></i> </a>
                                    </div>
                                </div><br />

                                <div className="footer-links footer-details">
                                    <br /><br />

                                    <h3 style={{ textAlign: 'center' }}>FOR EVENT ORGANIZERS</h3><br />

                                    <div className="" style={{ border: 'none' }}>
                                        <a href="https://tournamentplanner.in/Screens/admin/TP_Login.aspx">Organizer's</a>
                                    </div>

                                    <div className="">
                                        <a href="https://tournamentplanner.in/Screens/admin/TP_Login.aspx">Sponsor's</a>
                                    </div>
                                </div>

                            </div>
                        </div><br /><br />

                        <div className="copy-right">
                            Copyright © Tournament Planner LiVE
                            <br className="small" /><br className="small" /><br className="small" /><br /><br />
                        </div>

                    </div>
                </section>
                <div className="last-div">
                    <img src="/img/TPLiVE_text.png" width="140px" alt="" />
                    <Link to="/TermsAndConditions">Terms & Conditions </Link>
                    <Link to="/PrivacyPolicy"> Privacy Policy</Link>
                    <Link to="/ContactUs"> Contact Us</Link>

                    <small>Version 2.0</small>
                    <br className="small" /><br className="small" />
                </div>

            </div>

        )
    }
}
