import '../css/More.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class More extends Component {
    render() {
        return (
            <section>
                <div className="container"><br />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="heading">
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                            <h4 style={{ fontEeight: '1000' }}>More Links</h4>
                        </div>
                    </div><br />

                    <div className='large'>
                        <div className="row no-gutters">
                            <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }} >
                                <Link to="/FAQ" className="more-links">
                                    <img src="./img/faq.svg" width="100%" alt="" />
                                    <span>FAQ</span>
                                </Link>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }}>
                                <a href="/UserGuide" className="more-links">
                                    <img src="./img/user_guide.svg" width="100%" alt="" />
                                    <span>User Guide</span>
                                </a>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }}>
                                <Link to="/Calculators" className="more-links">
                                    <img src="./img/calculator.svg" width="100%" alt="" />
                                    <span>Calculator</span>
                                </Link>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }}>
                                <Link to="/ContactUs" className="more-links">
                                    <img src="./img/team.svg" width="100%" alt="" />
                                    <span>Support</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="small">
                        <div className="row no-gutters">
                            <div className="col-6" style={{ padding: '10px' }}>
                                <Link to="/FAQ" className="more-links">
                                    <img src="./img/faq.svg" width="100%" alt="" />
                                    <span>FAQ</span>
                                </Link>
                            </div>
                            <div className="col-6" style={{ padding: '10px' }}>
                                <a href="/UserGuide" className="more-links">
                                    <img src="./img/user_guide.svg" width="100%" alt="" />
                                    <span>User Guide</span>
                                </a>
                            </div>
                            <div className="col-6" style={{ padding: '10px' }}>
                                <Link to="/Calculators" className="more-links">
                                    <img src="./img/calculator.svg" width="100%" alt="" />
                                    <span>Calculator</span>
                                </Link>
                            </div>
                            <div className="col-6" style={{ padding: '10px' }}>
                                <Link to="/ContactUs" className="more-links">
                                    <img src="./img/team.svg" width="100%" alt="" />
                                    <span>Support</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div><br />
                <hr />
            </section >

        )
    }
}
