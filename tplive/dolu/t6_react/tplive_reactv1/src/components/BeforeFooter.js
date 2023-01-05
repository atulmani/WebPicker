import React from 'react'

export default function BeforeFooter() {
    return (
        <>
            <div className="container-fluid background-img-div">
                <div className="large row no-gutters">
                    <div style={{ padding: '2.5% 4%', color: '#fff' }} className="col-lg-6">
                        <div className="heading" style={{ color: '#fff' }}>
                            <span className="material-symbols-outlined">
                                monitoring
                            </span>
                            <h4 style={{ fontWeight: '1000' }}>Grow with us</h4>
                        </div>
                        <hr style={{ backgroundCcolor: '#fff' }} /><br /><br />
                        <p className="text-para">

                            We will be happy to provide our services to all the Event Organizers
                            of District, State & National Sports Associations, Sports Academies, Schools,
                            Corporates, Townships, Societies and every enthusiastic Sports lover to
                            encourage Sports with health and happiness in their locality

                        </p><br /><br />
                        <div style={{ display: 'flex', justifyContent: 'space-around' }} className="">
                            <a href="/" style={{ textAlign: 'center' }}>
                            </a>
                            <a href="/" style={{ textAlign: 'center' }}>
                            </a><br />

                        </div>
                    </div>

                    <div style={{ paddingTop: '10%' }} className="col-lg-6">

                        <div className="">

                            <img className="" style={{ borderRadius: '60px 0 0 60px', position: 'relative', float: 'right' }}
                                src="/img/wight_bg.gif" alt="" />


                        </div>

                    </div>

                </div>
            </div >
            <div className="small">

                <div className="container-fluid">
                    <div className="row no-gutters background-img-div">
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '2.5% 4%', color: '#fff' }}
                            className="col-sm-12">
                            <div className="heading" style={{ color: '#fff' }}>
                                <span className="material-symbols-outlined">
                                    monitoring
                                </span>
                                <h4 style={{ fontWeight: '1000' }}>Grow with us</h4>
                            </div>
                            <hr style={{ backgroundColor: '#fff' }} /><br /><br />
                            <p className="text-para">
                                We will be happy to provide our services to all the Event Organizers
                                of District, State & National Sports Associations, Sports Academies, Schools,
                                Corporates, Townships, Societies and every enthusiastic Sports lover to
                                encourage Sports with health and happiness in their locality
                            </p>
                            <br /><br />


                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 10px 30px' }} className="col-sm-12">

                            <img className="" style={{ borderRadius: '30px 0 0 30px', width: '100%' }} src="./img/wight_bg.gif"
                                alt="" />

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
