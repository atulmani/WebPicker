import React from 'react'
import { Link } from 'react-router-dom'

export default function RefundAndCancellation() {
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
                    <section>
                        <div className="">
                            <img src="../img/refund.jpg" width="100%" alt="" />
                        </div>
                    </section>

                    <section id="genre">

                        <div className="container">
                            <br /><br />
                            <div className="heading">
                                <span className="material-symbols-outlined">
                                    free_cancellation
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>Refund and Cancellation</h4>
                            </div><br />

                            <div>

                                <br /><br />

                                <strong>TPLiVE (Tournament Planner LiVE)</strong> provided the www.tplive.in website as a service to public.
                                The information provided on the website is for general informational purposes only.
                                <br />
                                You can make the request for entry withdrawal directly from the website or to event organisers or to
                                TPLiVE support team. The Refund are subject to be determined by event Organisers and vary from event to event.
                                <br /><br />
                                We would recommend users to read Rules & Regulations and Terms & Conditions before registering for the event.
                                In case the event is postponed, suspended or delayed or cancelled for any reason,
                                TPLiVE will not be responsible for any refunds nor we will be liable for any loss caused by
                                such cancellation, postponement, suspension or delay. This is full responsibility and decision of
                                the event Organisers & Participants. It is participant's responsibility to ascertain whether an event has been
                                cancelled and the date and time of any rearranged event and get in touch with the event Organisers to know for
                                refund process.
                                In case refund initiated, that will be settled with in 7 days after initiation of the refund date.
                                <br /><br />
                                TPLiVE does not guarantee that participants will be informed of such cancellation or date & time change before
                                the date of the event. It's participants responsibility to stay updated with system or co-ordinate with
                                Organisers to know the current status of the event.


                            </div>
                            <br /><br /><br />
                            <div className="heading">
                                <span className="material-symbols-outlined">
                                    privacy_tip
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>Disclaimer</h4>
                            </div><br />

                            TPLiVE (Tournament Planner LiVE) provided the www.tplive.in website as a service to public.
                            The information provided on the website is for general informational purposes only.
                            <br /><br />
                            TPLiVE is not responsible for any loss or damage of any kind arising out of use.
                            While the information contained within the site is periodically updated, no guarantee is given that
                            the information provided in this web site is correct, complete, and up-to-date.
                            Although the site may include links providing direct access to other internet resources,
                            including web sites, TPLiVE is not responsible for the accuracy, adequacy, validity,
                            reliability, availability or completeness of content of information contained in
                            these sites. Links from the website to third-party sites do not constitute an
                            endorsement by TPLiVE of the parties or their products and services.
                            The appearance on the Web site of advertisements and product or service
                            information does not constitute an endorsement by TPLiVE , and TPLiVE has
                            not investigated the claims made by any advertiser. Advertisements and
                            Product information is based solely on the content received from suppliers.


                        </div>
                        <br /><br />

                    </section>

                </div>

            </div>
        </div>
    )
}
