import React from 'react'

export default function More() {
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

                <div className="row no-gutters large">
                    <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }} >
                        <a href="https://tournamentplanner.in/screens/TPLive_FAQ.aspx" className="more-links">
                            <img src="./img/faq.svg" width="100%" alt="" />
                            <span>FAQ</span>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }}>
                        <a href="https://tournamentplanner.in/screens/TPLive_UserGuide.aspx" className="more-links">
                            <img src="./img/user_guide.svg" width="100%" alt="" />
                            <span>User Guide</span>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }}>
                        <a href="https://tournamentplanner.in/screens/TPLIVE_Estimator.aspx" className="more-links">
                            <img src="./img/calculator.svg" width="100%" alt="" />
                            <span>Calculator</span>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6" style={{ padding: '10px' }}>
                        <a href="https://tournamentplanner.in/screens/TPLive_Wall.aspx" className="more-links">
                            <img src="./img/team.svg" width="100%" alt="" />
                            <span>TPLiVE WALL</span>
                        </a>
                    </div>
                </div>

                <div className="small">
                    <div className="row no-gutters">
                        <div className="col-6" style={{ padding: '10px' }}>
                            <a href="https://tournamentplanner.in/screens/TPLive_FAQ.aspx" className="more-links">
                                <img src="./img/faq.svg" width="100%" alt="" />
                                <span>FAQ</span>
                            </a>
                        </div>
                        <div className="col-6" style={{ padding: '10px' }}>
                            <a href="https://tournamentplanner.in/screens/TPLive_UserGuide.aspx" className="more-links">
                                <img src="./img/user_guide.svg" width="100%" alt="" />
                                <span>User Guide</span>
                            </a>
                        </div>
                        <div className="col-6" style={{ padding: '10px' }}>
                            <a href="https://tournamentplanner.in/screens/TPLIVE_Estimator.aspx" className="more-links">
                                <img src="./img/calculator.svg" width="100%" alt="" />
                                <span>Calculator</span>
                            </a>
                        </div>
                        <div className="col-6" style={{ padding: '10px' }}>
                            <a href="https://tournamentplanner.in/screens/TPLive_Wall.aspx" className="more-links">
                                <img src="./img/team.svg" width="100%" alt="" />
                                <span>TPLiVE WALL</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section >



    )
}
