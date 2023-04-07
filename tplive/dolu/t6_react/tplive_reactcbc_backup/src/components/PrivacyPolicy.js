import React from 'react'

export default function PrivacyPolicy() {
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
                        <div class="">
                            <img src="../img/privacy.jpg" width="100%" alt="" />
                        </div>
                    </section>


                    <section id="genre">

                        <div class="container">
                            <br /><br />
                            <div class="heading">
                                <span class="material-symbols-outlined">
                                    policy
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>Privacy Policy</h4>
                            </div><br />

                            <div>
                                We may collect information about you in variety of ways. The information we may collect via the application
                                depends on the content and materials you use, and includes:
                                <br /><br />
                                <strong> Personal Data</strong><br />
                                Demographic and other personally identifiable information (such as your name, contact no and email id) that you
                                voluntarily give to us when choosing to participate in various activities related to the Application, such as
                                application registration, in our forums, liking posts, sending feedback, responding to surveys or emails. If you
                                choose to share data about yourself via your profile or other interactive areas of the Application, please be
                                advised that all data you disclose in these areas is public and your data might accessible to others who
                                accesses the Application.

                                <br /><br />

                                <strong>Derivative Data</strong><br />
                                Information our servers automatically collect when you access the Application, such as your native actions that
                                are integral to the Application, including liking, re-blogging, or replying to a post, as well as other
                                interactions with the Application and other users via server log files.

                                <br /><br />
                                <strong>Financial Data</strong><br />
                                Application never stores or maintains any financial information, such as data related to your payment method
                                (e.g. credit card number, card brand, expiration data, Bank details etc.). All the financial information is
                                handled by payment gateway providers and we encourage you to review their privacy policy and contact them
                                directly in case of any discrepancy.
                            </div>
                            <br /><br /><br />
                            <div class="heading">
                                <span class="material-symbols-outlined">
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
