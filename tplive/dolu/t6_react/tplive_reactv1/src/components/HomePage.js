import React from 'react'
import BannerItemHP from './BannerItemHP'
import BannerItemSmallHP from './BannerItemSmallHP'

export default function HomePage() {
    return (
        <div>
            <div className="" id="fullContent">

                <div className="city-select-div" style={{ display: 'none' }}>
                    <div className="search">
                        <input type="text" onChange={callOnChange()} placeholder="Enter city" name="" value="" />
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


                <div className="event-loading" id="eventLoading">
                    {/* <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_98vgucqb.json" background="transparent"
                        speed="1" style={{ width: '270px', height: '100%' }} loop autoplay></lottie-player> */}
                </div>


                <div style={{ paddingTop: '0px' }}>
                    <div id="big" className="owl-carousel owl-theme">
                        <BannerItemHP></BannerItemHP>
                        <BannerItemHP></BannerItemHP>
                    </div>
                    <br />
                    <div id="thumbs" className="owl-carousel owl-theme">
                        <BannerItemSmallHP></BannerItemSmallHP>
                        <BannerItemSmallHP></BannerItemSmallHP>

                    </div>
                </div><br /><br className="large" />
            </div>

        </div >
    )
}
function callOnChange() {

}