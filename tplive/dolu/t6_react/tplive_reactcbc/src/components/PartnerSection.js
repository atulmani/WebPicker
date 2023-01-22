import '../css/PartnerSection.css'
import React, { Component } from 'react'
// import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class PartnerSection extends Component {
    componentDidMount() {
        // alert("test");
        // var owl = document.getElementById("partners-carousel");

        // var owl = $("#partners-carousel");
        // let owlCarousel = $.fn.owlCarousel; //accessing jquery function
        // // let magnificPopup = $.fn.magnificPopup; //accessing jquery function
        // $('.partners-carousel').owlCarousel({ //call directly on mount
        // });

        // $('.popup-gallery').magnificPopup({
        // });
    }
    state = {
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
    render() {
        return (

            // <div id="demo" className="carousel slide" data-bs-ride="carousel">

            //     <div className="carousel-indicators">
            //         <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
            //         <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
            //         <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            //     </div>

            //     <div className="carousel-inner">
            //         <div className="carousel-item active">
            //             <img src="/img/partner/1.png" alt="Los Angeles" className="d-block w-100" />
            //         </div>
            //         <div className="carousel-item">
            //             <img src="/img/partner/2.png" alt="Los Angeles" className="d-block w-100" />
            //         </div>
            //         <div className="carousel-item">
            //             <img src="/img/partner/3.png" alt="Los Angeles" className="d-block w-100" />
            //         </div>
            //     </div>

            //     <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
            //         <span className="carousel-control-prev-icon"></span>
            //     </button>
            //     <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            //         <span className="carousel-control-next-icon"></span>
            //     </button>
            // </div>

            // <OwlCarousel items={3}
            //     className="owl-theme"
            //     loop
            //     nav={false}
            //     autoplay
            //     smartSpeed={3000}
            //     autoplayTimeout={3000}
            //     autoplayHoverPause={false}
            //     dots={false}
            //     center={true}
            //     margin={20} >
            //     <div ><img className="img" src={'/img/partner/1.png'} /></div>
            //     <div><img className="img" src={'/img/partner/2.png'} /></div>
            //     <div><img className="img" src={'/img/partner/3.png'} /></div>
            //     <div><img className="img" src={'/img/partner/4.png'} /></div>
            //     <div><img className="img" src={'/img/partner/5.png'} /></div>
            //     <div><img className="img" src={'/img/partner/6.png'} /></div>
            //     <div><img className="img" src={'/img/partner/7.png'} /></div>
            // </OwlCarousel>



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
                                responsive={this.state.responsive} >
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
                </div ><br /><br />
            </div >


        )
    }
}
