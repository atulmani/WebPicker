import React from 'react'

export default function PartnerSection() {
    return (
        <div className="" style={{ background: '#333C5D' }}>
            <div className="container"><br />
                <div className="heading" style={{ color: '#fff' }}>
                    <span className="material-symbols-outlined">
                        handshake
                    </span>
                    <h4 style={{ fontWeight: '1000' }}> Our Partners</h4>
                </div><br />
                <div className="row no-gutters partners-div">
                    <div className="col-md-12 col-md-offset-1">
                        <div id="partners-carousel" className="row">

                            {/* <div id="partners-carousel" className="owl-carousel owl-theme"> */}
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

                        </div>
                    </div>
                    <br /><br />
                </div>
            </div><br /><br />
        </div>

    )
}
