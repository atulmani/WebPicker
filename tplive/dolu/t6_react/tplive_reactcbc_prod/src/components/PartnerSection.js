import '../css/PartnerSection.css'
import React, { useEffect } from 'react'
// import $ from 'jquery'
import { useLocation } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useState } from 'react';



export default function PartnerSection() {
    const [showFlag, setShowFlag] = useState(true);
    const [myState, setMyState] = useState({
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
    });
    let location = useLocation();
    // console.log(location.pathname);

    useEffect(() => {

        setMyState({
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 3,
                },
                1000: {
                    items: 5,
                },
            },
        }
        )

        if (location.pathname === '/PhoneSignUp' || location.pathname === '/UserProfile' || location.pathname === '/Profile') {
            setShowFlag(false);
        } else {
            setShowFlag(true);
        }
    }, [])

    return (

        <div className="" style={{ background: '#333C5D' }}>
            {showFlag && <div className="container"><br />
                <div className="heading" style={{ color: '#fff' }}>
                    <span className="material-symbols-outlined">
                        handshake
                    </span>
                    <h4 style={{ fontWeight: '1000' }}> Our Partners</h4>
                </div><br />
                <div className="row no-gutters partners-div">
                    <div className="col-md-12 col-md-offset-1">
                        <OwlCarousel
                            className="owl-theme"
                            loop
                            nav={false}
                            autoplay
                            smartSpeed={3000}
                            autoplayTimeout={3000}
                            autoplayHoverPause={false}
                            dots={false}
                            center={true}
                            margin={20}
                            responsive={myState.responsive} >
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/1.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/2.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/3.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/4.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/5.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/6.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/7.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/8.png'} /></div>
                            <div className="partners-item"><img width="100%" alt="" src={'/img/partner/9.png'} /></div>
                        </OwlCarousel>
                        {/* <div id="partners-carousel" className="owl-carousel owl-theme">

                                <div className="partners-item">
                                    <img src="/img/partner/1.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/2.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/3.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/4.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/5.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/6.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/7.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/8.png" width="100%" alt="" />
                                </div>
                                <div className="partners-item">
                                    <img src="/img/partner/9.png" width="100%" alt="" />
                                </div>

                            </div > */}
                    </div >
                    <br /><br />
                </div >
            </div >
            }
            <br /><br />
        </div >


    )
}
