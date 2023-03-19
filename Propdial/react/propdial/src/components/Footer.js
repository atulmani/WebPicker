import React from 'react';
import '../css/Footer.css';

export default function Footer() {
    return (
        <>

            <div className="footer">
                <div className="container-fluid"><br /><br />
                    <div className="row no-gutters">

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer-list">
                                <img src="../img/logo.png" width="100%" alt="" /><br /><br />
                                <h1>Corporate Office</h1><br />
                                <p>#204, 2nd Floor, Vipul Trade Centre, Sector-48 Sohna Road, Gurugram-122018, Haryana, India</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer-list">
                                <h1>Get in Touch</h1><br /><br />
                                <div className="" style={{ height: '70px' }}>
                                    <a href="/"
                                        style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                                        <span className="material-symbols-outlined" style={{ background: '#ff4444' }}>
                                            call
                                        </span>
                                        <small>+91 95821 95821</small>
                                    </a>
                                </div>

                                <div className="" style={{ height: '70px' }}>
                                    <a href="/"
                                        style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                                        <span className="material-symbols-outlined" style={{ background: '#08aad1' }}>
                                            mail
                                        </span>
                                        <small>info@prodial.com</small>
                                    </a>
                                </div>

                                <div className="" style={{ height: '70px' }}>
                                    <a href="/"
                                        style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                                        <span className="material-symbols-outlined" style={{ background: '#199d0e' }}>
                                            phone
                                        </span>
                                        <small>+91 95821 95821</small>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer-list">
                                <h1>Important Links</h1><br /><br />

                                <div className="">
                                    <a href="/">Our Team</a>
                                </div>
                                <div className="">
                                    <a href="/">FAQ's</a>
                                </div>
                                <div className="">
                                    <a href="/">Blog</a>
                                </div>
                                <div className="">
                                    <a href="/">Refer</a>
                                </div>
                                <div className="">
                                    <a href="/">Career with us</a>
                                </div>
                                <div className="">
                                    <a href="/">Contact us</a>
                                </div>
                                <div className="">
                                    <a href="/">Privacy Policy</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer-list">
                                <h1>Quick Links</h1><br /><br />

                                <div className="">
                                    <a href="/">Property Management in Gurgaon</a>
                                </div>
                                <div className="">
                                    <a href="/">Property Management in Delhi</a>
                                </div>
                                <div className="">
                                    <a href="/">Property Management in Noida</a>
                                </div>
                                <div className="">
                                    <a href="/">Property Management in Ghaziabad</a>
                                </div>
                                <div className="">
                                    <a href="/">Property Management in Pune</a>
                                </div>
                                <div className="">
                                    <a href="/">Property Management in Hyderabad</a>
                                </div>
                                <div className="">
                                    <a href="/">Property Management in Banglore</a>
                                </div>
                            </div>
                        </div>

                    </div><br /><br />
                    <hr />

                    <div className="copyright">
                        <div className="">
                            <p>2021 © Copyright - All Rights Reserved.</p>
                        </div>
                    </div><br className="small" /><br className="small" /><br className="small" />

                </div>
            </div>

        </>
    )
}