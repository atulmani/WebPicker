
import { useState } from 'react';
import React, { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import './CustomerDashboard.css'

export default function CustomerDashboard() {

    const [myState, setMyState] = useState({
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 4,
            },
            1000: {
                items: 6,
            },
        },
    });

    useEffect(() => {

        setMyState({
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 4,
                },
                1000: {
                    items: 6,
                },
            },
        }
        )

    }, [])

    const [addCarousel, setAddCarousel] = useState({
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            },
        },
    });

    useEffect(() => {

        setAddCarousel({
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 2,
                },
            },
        }
        )

    }, [])

    const [activitiesCarousel, setActivitiesCarousel] = useState({
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            },
        },
    });

    useEffect(() => {

        setActivitiesCarousel({
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 4,
                },
                1000: {
                    items: 6,
                },
            },
        }
        )

    }, [])

    return (
        <>

            <div className='dashboard-banner'>
                <div className='container-fluid'>
                    <div className='dashboard-banner-inner'>
                        <h1>Home Service, On Demand</h1>
                        <h2>Any Time You Need, At Your Home To Fix</h2><br></br>

                        <div className='dashboard-banner-search'>
                            <input type='text' placeholder='Search For Services...'></input>
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </div>

                        <div className='dashboard-banner-search-options'>
                            <a href='/'> Hair Salon </a>
                            <a href='/'> Sofa Cleaning </a>
                            <a href='/'> Kid's Play Area</a>
                        </div>

                    </div>
                </div>
            </div>

            <div className='container' style={{ height: '360px' }}>

                <div className='below-banner-div'>
                    <div className='row no-gutters'>
                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/1.png' alt=''></img>
                                <h1>Salon For Women</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/2.png' alt=''></img>
                                <h1>Salon For Men</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/3.png' alt=''></img>
                                <h1>House Cleaning</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/4.png' alt=''></img>
                                <h1>Yoga & Flexibily</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/5.png' alt=''></img>
                                <h1>Kid's Play Area</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/6.png' alt=''></img>
                                <h1>Painting & Art</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/7.png' alt=''></img>
                                <h1>Floor Cleaning</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/8.png' alt=''></img>
                                <h1>Singing & Vocals</h1>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className='below-banner-card'>
                                <img src='./img/belowBanner/9.png' alt=''></img>
                                <h1>Dancing & Zumba</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div >

            <div className='container-fluid'>
                {/* <div className='dahsboard-heading'>
                    <div className='dahsboard-heading-address-div'>
                        <h1>#23A</h1>
                        <h2>Sai Shree Krupa...</h2>
                        <span className="material-symbols-outlined">
                            expand_more
                        </span>
                    </div>
                    <br></br>
                    <div className='dahsboard-heading-search-div'>
                        <input type='text' placeholder='Search for "Kitchen Services"'></input>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </div>
                </div>
                <br></br> */}

                <div className='row no-gutters'>
                    <div className='col-4'>
                        <div className='dashboard-services'>
                            <div className='dashboard-services-img'>
                                <img src='./img/services/1.png' alt=""></img>
                            </div>
                            <div className='dashboard-services-name'>
                                <h1>Hair Spa & Salon</h1>
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='dashboard-services'>
                            <div className='dashboard-services-img'>
                                <img src='./img/services/2.png' alt=""></img>
                            </div>
                            <div className='dashboard-services-name'>
                                <h1>Kids Play Area</h1>
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='dashboard-services'>
                            <div className='dashboard-services-img'>
                                <img src='./img/services/3.png' alt=""></img>
                            </div>
                            <div className='dashboard-services-name'>
                                <h1>Gym & Body Fitness</h1>
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='dashboard-services'>
                            <div className='dashboard-services-img'>
                                <img src='./img/services/4.png' alt=""></img>
                            </div>
                            <div className='dashboard-services-name'>
                                <h1>Learning Drums</h1>
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='dashboard-services'>
                            <div className='dashboard-services-img'>
                                <img src='./img/services/5.png' alt=""></img>
                            </div>
                            <div className='dashboard-services-name'>
                                <h1>Guitar Practice</h1>
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='dashboard-services'>
                            <div className='dashboard-services-img'>
                                <img src='./img/services/6.png' alt=""></img>
                            </div>
                            <div className='dashboard-services-name'>
                                <h1>Online Piano Coaching</h1>
                            </div>
                        </div>
                    </div>

                </div>

                <br></br>
                <div className="row no-gutters partners-div">
                    <div className="col-md-12 col-md-offset-1">
                        <OwlCarousel
                            className="owl-theme"
                            loop={true}
                            nav={false}
                            autoplay={false}
                            smartSpeed={3000}
                            autoplayTimeout={3000}
                            autoplayHoverPause={false}
                            dots={false}
                            center={true}
                            margin={10}
                            stagePadding={30}
                            responsive={addCarousel.responsive} >
                            <div className='add-card' style={{ background: 'var(--blue)' }}>
                                <div className='add-card-details'>
                                    <h1>Deep Cleaning For Just ₹599</h1>
                                    <h2>Full House Cleaning</h2>
                                    <div className='large'></div>
                                    <button className='btnTransparent'>Book Now</button>
                                </div>
                                <img src='./img/add/1_large.png' className='large' alt=''></img>
                                <img src='./img/add/1.png' className='small' alt=''></img>
                            </div>
                            <div className='add-card' style={{ background: 'var(--brown)' }}>
                                <div className='add-card-details'>
                                    <h1>Relax & Enjoy Full Body Massage</h1>
                                    <h2>Only For Female</h2>
                                    <div className='large'></div>
                                    <button className='btnTransparent'>Book Now</button>
                                </div>
                                <img src='./img/add/2_large.png' className='large' alt=''></img>
                                <img src='./img/add/2.png' className='small' alt=''></img>
                            </div>
                            <div className='add-card' style={{ background: 'var(--kellygreen)' }}>
                                <div className='add-card-details'>
                                    <h1>House Painting With Full Protection</h1>
                                    <h2>Starting From ₹1,599</h2>
                                    <div className='large'></div>
                                    <button className='btnTransparent'>Book Now</button>
                                </div>
                                <img src='./img/add/3_large.png' className='large' alt=''></img>
                                <img src='./img/add/3.png' className='small' alt=''></img>
                            </div>
                        </OwlCarousel>
                    </div >
                    <br /><br />
                </div >


                <br></br>
                <div className='all-headings'>
                    <h1>Book services</h1>
                    <span>See all</span>
                </div>
                <div className="row no-gutters partners-div">
                    <div className="col-md-12 col-md-offset-1">
                        <OwlCarousel
                            className="owl-theme"
                            loop={true}
                            nav={false}
                            autoplay={false}
                            smartSpeed={3000}
                            autoplayTimeout={3000}
                            autoplayHoverPause={false}
                            dots={false}
                            center={true}
                            margin={10}
                            stagePadding={30}
                            responsive={myState.responsive} >
                            <div className='book-services-card'>
                                <img src='./img/book/1.png' alt=''></img>
                                <div className='book-services-card-details'>
                                    <h1>House Cleaning - Full House...</h1>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            star
                                        </span>
                                        <h2>4.5 (800k)</h2>
                                    </div>
                                    <h3>₹599</h3>
                                </div>
                            </div>

                            <div className='book-services-card'>
                                <img src='./img/book/2.png' alt=''></img>
                                <div className='book-services-card-details'>
                                    <h1>Men's Hair Salon...</h1>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            star
                                        </span>
                                        <h2>5 (8k)</h2>
                                    </div>
                                    <h3>₹70</h3>
                                </div>
                            </div>

                            <div className='book-services-card'>
                                <img src='./img/book/3.png' alt=''></img>
                                <div className='book-services-card-details'>
                                    <h1>Sofa Cleaning - All Color Sofa...</h1>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            star
                                        </span>
                                        <h2>4.5 (800k)</h2>
                                    </div>
                                    <h3>₹599</h3>
                                </div>
                            </div>

                            <div className='book-services-card'>
                                <img src='./img/book/4.png' alt=''></img>
                                <div className='book-services-card-details'>
                                    <h1>Online Piano Classes...</h1>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            star
                                        </span>
                                        <h2>4.5 (800k)</h2>
                                    </div>
                                    <h3>₹599</h3>
                                </div>
                            </div>

                            <div className='book-services-card'>
                                <img src='./img/book/5.png' alt=''></img>
                                <div className='book-services-card-details'>
                                    <h1>Group Guitar Coaching...</h1>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            star
                                        </span>
                                        <h2>4.5 (800k)</h2>
                                    </div>
                                    <h3>₹599</h3>
                                </div>
                            </div>

                            <div className='book-services-card'>
                                <img src='./img/book/6.png' alt=''></img>
                                <div className='book-services-card-details'>
                                    <h1>Private Drum Classes - For...</h1>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            star
                                        </span>
                                        <h2>4.5 (800k)</h2>
                                    </div>
                                    <h3>₹599</h3>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div >
                    <br /><br />
                </div >

            </div>

            <div className='break-div'>
                <div className='break-div-content'>
                    <h1>Skin Care & Spa</h1>
                    <h2>Get Full Relaxation On Your Home Just For ₹1,599</h2>
                    <button className='btnTransparent'>Book Now</button>
                </div>
                <div className='break-div-img'>
                    <img src='./img/add/2_large.png' alt=''></img>
                </div>
            </div>

            <br></br>

            <div className='container-fluid'>

                <div className='all-headings'>
                    <h1>Activities</h1>
                    <span>See all</span>
                </div>

                <div className="row no-gutters partners-div">
                    <div className="col-md-12 col-md-offset-1">
                        <OwlCarousel
                            className="owl-theme"
                            loop={true}
                            nav={false}
                            autoplay={false}
                            smartSpeed={3000}
                            autoplayTimeout={3000}
                            autoplayHoverPause={false}
                            dots={false}
                            center={true}
                            margin={10}
                            stagePadding={50}
                            responsive={activitiesCarousel.responsive} >
                            <div className='activity-card'>
                                <h1>Stress Releif</h1>
                                <div>
                                    <img src='./img/activities/1.png' alt=''></img>
                                </div>
                            </div>

                            <div className='activity-card'>
                                <h1>Partner Yoga</h1>
                                <div>
                                    <img src='./img/activities/2.png' alt=''></img>
                                </div>
                            </div>
                            <div className='activity-card'>
                                <h1>Face Treatment</h1>
                                <div>
                                    <img src='./img/activities/3.png' alt=''></img>
                                </div>
                            </div>
                            <div className='activity-card'>
                                <h1>Zumba Fitness</h1>
                                <div>
                                    <img src='./img/activities/4.png' alt=''></img>
                                </div>
                            </div>
                            <div className='activity-card'>
                                <h1>Yoga & More</h1>
                                <div>
                                    <img src='./img/activities/5.png' alt=''></img>
                                </div>
                            </div>
                            <div className='activity-card'>
                                <h1>Kid's Play</h1>
                                <div>
                                    <img src='./img/activities/6.png' alt=''></img>
                                </div>
                            </div>
                            <div className='activity-card'>
                                <h1>Painting & Art</h1>
                                <div>
                                    <img src='./img/activities/7.png' alt=''></img>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div >
                    <br /><br />
                </div >
            </div>

            <br></br><br></br>
        </>
    )
}
