import React from 'react';
import './CustomerServices.css';

export default function CustomerServices() {
    return (
        <>
            <div className='customer-services-heading'>
                <img src='./img/customerServices/1.png' alt=''></img>
                <div className='back-search-btn-div'>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>

                    <span className="material-symbols-outlined">
                        search
                    </span>
                </div>
            </div>

            <br></br>

            <div className='container-fluid'>
                <div className='customer-services-below-heading'>
                    <h1>Salon Prime For Kids & Men</h1>

                    <div>
                        <span className="material-symbols-outlined">
                            star
                        </span>

                        <small>4.87 (417K Bookings)</small>
                    </div>

                    <div>
                        <span className="material-symbols-outlined">
                            history
                        </span>

                        <small>At Your Door In 60-75 Mins</small>
                    </div>
                </div>
            </div>
            <hr className='big-hr'></hr>

            <div className='container-fluid'>
                <div className='all-headings'>
                    <h1>Hair Color</h1>
                    {/* <span>See all</span> */}
                </div>

                <div className='row no-gutters'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>

                        <div className='customer-services-card'>
                            <div className='customer-services-card-details'>
                                <h1>Hair Color <strong>(Only Application)</strong></h1>
                                <div>
                                    <span className="material-symbols-outlined">
                                        star
                                    </span>
                                    <small>4.80 (35.5K Reviews)</small>
                                </div>

                                <div className='border-bottom-div'>
                                    <h2>₹199</h2>
                                    <h3>30 mins</h3>
                                </div>
                                <h4>
                                    Please Provide Your Own Hair Color; <br></br>
                                    We'll Bring Everything Else
                                </h4>

                                <h5>View Details</h5>
                            </div>

                            <div className='customer-services-card-img'>
                                <img src='./img/customerServices/card/1.png' alt=''></img>
                                <button className='btnTransparent'>Add</button>
                            </div>
                        </div>

                    </div>

                    <div className='col-lg-6 col-md-6 col-sm-12'>

                        <div className='customer-services-card'>
                            <div className='customer-services-card-details'>
                                <h1>Hair Cutting <strong>(Only Men's Parlor)</strong></h1>
                                <div>
                                    <span className="material-symbols-outlined">
                                        star
                                    </span>
                                    <small>4.80 (35.5K Reviews)</small>
                                </div>

                                <div className='border-bottom-div'>
                                    <h2>₹199</h2>
                                    <h3>30 mins</h3>
                                </div>
                                <h4>
                                    Please Provide Your Own Hair Color; <br></br>
                                    We'll Bring Everything Else
                                </h4>

                                <h5>View Details</h5>
                            </div>

                            <div className='customer-services-card-img'>
                                <img src='./img/customerServices/card/2.png' alt=''></img>
                                <button className='btnTransparent'>Add</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <hr className='big-hr'></hr>


            <div className='container-fluid'>
                <div className='all-headings'>
                    <h1>Packages</h1>
                    {/* <span>See all</span> */}
                </div>

                <div className='row no-gutters'>

                    <div className='col-lg-6 col-md-6 col-sm-12'>

                        <div className='customer-services-card'>
                            <div className='customer-services-card-details'>
                                <h1>Hair Cutting + Beard Grooming + Relaxing Head Massage</h1>
                                <div>
                                    <span className="material-symbols-outlined">
                                        star
                                    </span>
                                    <small>4.80 (35.5K Reviews)</small>
                                </div>

                                <div className='border-bottom-div'>
                                    <h2>₹199</h2>
                                    <h3>1 hr 5 mins</h3>
                                </div>
                                <h4 className='details-list'>
                                    <strong>Haircut: </strong>
                                    Haircut For Men
                                </h4>
                                <h4 className='details-list'>
                                    <strong>Shave / Beard Grooming: </strong>
                                    Beard Trimming & Styling
                                </h4>
                                <h4 className='details-list'>
                                    <strong>Massage: </strong>
                                    10 min Relaxing Massage
                                </h4>

                                <button className='btnTransparent'>Edit Your Package</button>
                            </div>

                            <div className='customer-services-card-img'>
                                <img src='./img/customerServices/card/2.png' alt=''></img>
                                <button className='btnTransparent'>Add</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}
