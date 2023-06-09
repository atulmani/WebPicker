import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import ReactWhatsapp from 'react-whatsapp';
import '../css/Calculator.css';

export default function FAQ() {
    const [showFlag, setShowFlag] = useState(1);
    const setFlag = (flag) => {
        // console.log('flag : ', flag, ' showFlag : ', showFlag);
        if (showFlag === flag) {
            setShowFlag(0)
        } else {
            setShowFlag(flag)

        }

    }

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

                        <div className="container">
                            <br /><br />
                            <div className="heading">
                                <span className="material-symbols-outlined">
                                    free_cancellation
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>Frequently Asked Questions</h4>
                            </div><br />

                            <div>


                                <br /><br />

                                <div className='row no-gutters'>
                                    <div className='col-lg-12'>

                                        <div className={showFlag === 1 ? 'calculator-div open' : 'calculator-div '}>
                                            <div className='calculator-heading' onClick={() => setFlag(1)}>
                                                <h1>
                                                    What is TPLiVE?
                                                    <span className="material-symbols-outlined">
                                                        expand_more
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='calculator-content'>
                                                <p style={{ margin: '0' }}>TPLiVE - TournamentPlanner LiVE is a startup whose aspiration is to join hands with
                                                    Digital India and Go-Green. Our mission is to automate any Sports &amp; non-Sports event
                                                    planning &amp; execution digitally, thereby eliminating uses of paper. Organizing any
                                                    event manually is always a challenge starting from registration forms distribution
                                                    &amp; collection, payment collection, participant name publish, draws or fixtures &amp;
                                                    event schedule preparation &amp; publish, score management, publish result till prize
                                                    distribution &amp; event photo gallery.</p>
                                            </div>
                                        </div >

                                    </div>
                                    <div className='col-lg-12'>


                                        <div className={showFlag === 2 ? 'calculator-div open' : 'calculator-div '}>
                                            <div className='calculator-heading' onClick={() => setFlag(2)}>
                                                <h1>
                                                    How many Sports covered in TPLiVE?
                                                    <span className="material-symbols-outlined">
                                                        expand_more
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='calculator-content'>
                                                <p style={{ margin: '0' }}>This product supports 20+ Sports (most of the indoor &amp; outdoor Sports)</p>
                                            </div>
                                        </div >

                                    </div>
                                    <div className='col-lg-12'>


                                        <div className={showFlag === 3 ? 'calculator-div open' : 'calculator-div '}>
                                            <div className='calculator-heading' onClick={() => setFlag(3)}>
                                                <h1>
                                                    Who can use this product?
                                                    <span className="material-symbols-outlined">
                                                        expand_more
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='calculator-content'>
                                                <p style={{ margin: '0' }}>
                                                    All Organizers, Sponsors, Participants, Sports Committees, Sports Academies, Schools, Corporates, Townships, Societies and every enthusiastic Sports lovers can use this product.
                                                </p>
                                            </div>
                                        </div >

                                    </div>
                                    <div className='col-lg-12'>


                                        <div className={showFlag === 4 ? 'calculator-div open' : 'calculator-div '}>
                                            <div className='calculator-heading' onClick={() => setFlag(4)}>
                                                <h1>
                                                    How to create a Event?
                                                    <span className="material-symbols-outlined">
                                                        expand_more
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='calculator-content'>
                                                <p style={{ margin: '0' }}>
                                                    Organizers can reach TPLiVE team through whatsup <ReactWhatsapp style={{ border: 'none' }} number="91-848-496-6096" message="Hello Team, I want to create event in TPLiVE, please assists.">(+84849666096) </ReactWhatsapp> to create event in the system.
                                                </p>
                                            </div>
                                        </div >

                                    </div>
                                    <div className='col-lg-12'>


                                        <div className={showFlag === 5 ? 'calculator-div open' : 'calculator-div '}>
                                            <div className='calculator-heading' onClick={() => setFlag(5)}>
                                                <h1>
                                                    How it works?
                                                    <span className="material-symbols-outlined">
                                                        expand_more
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='calculator-content'>
                                                <p style={{ margin: '0' }}>
                                                    Organizers can reach us to create event in the system. Organizers can get autogenerated email with all the event details. Once event is active, it will be populated under Events section on the website. Accordingly the Participants can register for the event. Once Participant registration completed, Fixtures or DRAWS & event schedule will be generated and published accordingly.</p>
                                            </div>
                                        </div >

                                    </div>
                                    <div className='col-lg-12'>

                                        <div className={showFlag === 6 ? 'calculator-div open' : 'calculator-div '}>
                                            <div className='calculator-heading' onClick={() => setFlag(6)}>
                                                <h1>
                                                    Does TPLivE promots advertisement?
                                                    <span className="material-symbols-outlined">
                                                        expand_more
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='calculator-content'>
                                                <p style={{ margin: '0' }}>
                                                    Ofcourse, we would be more than happy to join hands with all the academies & classes (sports & non-sports) and publish the details on the website under TPLiVE-WALL section.
                                                </p>
                                            </div>
                                        </div >

                                    </div>

                                    <div className='col-lg-12'>


                                        <div className='calculator-div open'>
                                            <div className='calculator-heading' >
                                                <h1>
                                                    <strong>More Questions?</strong>
                                                    <span className="material-symbols-outlined">
                                                        expand_more
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='calculator-content'>
                                                <p style={{ margin: '0' }}>
                                                    You can contact us at
                                                    <br />
                                                    <strong>Whatsapp:</strong> <ReactWhatsapp style={{ border: 'none' }} number="91-848-496-6096" message="Hello Team, I want to connect with TPLiVE, please assists.">(+84849666096) </ReactWhatsapp>
                                                    <br />
                                                    <strong>Email:</strong> <a href="mailto:connect@tplive.in">connect@tplive.in</a>
                                                </p>
                                            </div>
                                        </div >

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
