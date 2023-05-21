import React from 'react';
import './CustomerServiceDetails.css';

export default function CustomerServiceDetails() {
    return (
        <>
            <div className='customer-service-details-full '>
                <span className="material-symbols-outlined customer-service-details-close">
                    close
                </span>

                <div className='customer-service-details-inner'>
                    <div className='customer-service-details-heading'>
                        <div>
                            <h1>Haircut For Men</h1>
                            <h2>
                                <span className="material-symbols-outlined">
                                    star
                                </span>
                                4.83 (933.7K)
                            </h2>

                            <div>
                                <h3>₹249</h3>
                                <h4>30 mins</h4>
                            </div>
                        </div>
                        <div>
                            <button className='btnTransparent' style={{
                                background: '#fff',
                                border: '1px solid var(--brown)',
                                color: 'var(--brown)',
                            }}>Add</button>
                        </div>
                    </div>

                    <hr className='big-hr' style={{ marginBottom: '0' }}></hr>

                    <div className='customer-service-details-features'>
                        <div className='all-headings'>
                            <h1>The Features</h1>
                        </div>
                        <div className='row no-gutters'>

                            <div className='col-4'>
                                <div className='customer-service-details-features-card'>
                                    <img src='./img/customerServiceDetails/card/1.png' alt=''></img>
                                    <h1>Customised Hairstyles</h1>
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='customer-service-details-features-card'>
                                    <img src='./img/customerServiceDetails/card/2.png' alt=''></img>
                                    <h1>Hygenic & Clean</h1>
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='customer-service-details-features-card'>
                                    <img src='./img/customerServiceDetails/card/3.png' alt=''></img>
                                    <h1>Mess-Free Work</h1>
                                </div>
                            </div>

                        </div>
                    </div>

                    <hr className='big-hr' style={{ marginTop: '0' }}></hr>

                    <div style={{ padding: '10px 20px 0 20px' }}>
                        <div className='all-headings'>
                            <h1>About The Process</h1>
                        </div>
                    </div>

                    <div className='customer-service-details-process'>

                        <div className='customer-service-details-process-card'>
                            <div>
                                <h1>1</h1>
                            </div>
                            <h2>Consultation</h2>
                            <h3>
                                Professional understands customer needs and hair condition to suggest suitable options
                            </h3>
                        </div>

                        <div className='customer-service-details-process-card'>
                            <div>
                                <h1>2</h1>
                            </div>
                            <h2>Set-up</h2>
                            <h3>
                                Sanitisation of tools and placement of cape, mirror, floor sheet
                            </h3>
                        </div>

                        <div className='customer-service-details-process-card'>
                            <div>
                                <h1>3</h1>
                            </div>
                            <h2>Parting & Sectioning</h2>
                            <h3>
                                Detangling of hair followed by dividing it into small sections
                            </h3>
                        </div>

                        <div className='customer-service-details-process-card'>
                            <div>
                                <h1>4</h1>
                            </div>
                            <h2>Hair Cut</h2>
                            <h3>
                                Spraying of water, followed by cutting of hair as per the desired hair style with the cape on
                            </h3>
                        </div>

                        <div className='customer-service-details-process-card'>
                            <div>
                                <h1>5</h1>
                            </div>
                            <h2>Confirmation</h2>
                            <h3>
                                Rechecking of the output with customer and working on suggestions (if any) for desired results
                            </h3>
                        </div>

                        <div className='customer-service-details-process-card'>
                            <div>
                                <h1>6</h1>
                            </div>
                            <h2>Clean Up</h2>
                            <h3>
                                Removal of all the hair stands, sanitisation of tools and clean up of the surrounding area
                            </h3>
                        </div>

                    </div>

                </div>

            </div >
        </>
    )
}
