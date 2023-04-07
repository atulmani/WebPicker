import React from 'react'
import { Link } from 'react-router-dom'
export default function ContactUs() {
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
                    <div class="tab-content event-tab-content" id="pills-tabContent">

                        <h3 class="section-heading text-center">
                            Contact us</h3>
                        <div class="divider-line">
                        </div>
                        <div class="row">
                            <div class="col-lg-6 mt-2">
                                <div class="card-body event-card">
                                    <strong>TPLiVE (Tournament Planner LiVE)</strong>

                                    <br />
                                    <strong>Whatsapp:</strong> +91 8484 966 096
                                    <br />
                                    <strong>Email:</strong> connect@tplive.in
                                    <br />
                                    <strong>Address:</strong>
                                    D2-201, Daffodils Society,<br />
                                    Pimple Saudagar<br />
                                    Pune - 411027<br />
                                    Maharashtra, India
                                </div>
                            </div>


                            <div class="col-lg-6 mt-2">
                                <div class="card-body event-card">

                                    <Link to="/PrivacyPolicy">Disclaimer</Link>
                                    <br /><br />
                                    <Link to="/PrivacyPolicy">Privacy Policy</Link>
                                    <br /><br />
                                    <Link to="/RefundAndCancellation">Refund &amp; Cancellation</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}
