import React, { Component } from 'react'
import BannerItemHP from './BannerItemHP'
import BannerItemSmallHP from './BannerItemSmallHP'
import Loading from './Loading'
// import functions from '@react-native-firebase/functions';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class HomePage extends Component {
    // eslint-disable-next-line no-useless-constructor
    eventList = [{
        eventID: '1',
        eventName: 'first event',
        organizerName: 'Anita',
        eventType: 'Badminton',
        location: 'Pune',
        entryFee: '200',
        eventDate: '12-Dec-2022',
        eventLogoURL: '/img/badminton.webp'
    },
    {
        eventID: '2',
        eventName: 'second event',
        organizerName: 'Anita T',
        eventType: 'Badminton',
        location: 'Bangalore',
        entryFee: '2000',
        eventDate: '13-Dec-2022',
        eventLogoURL: '/img/badminton.webp'

    },
    {
        eventID: '3',
        eventName: 'third event',
        organizerName: 'Mini',
        eventType: 'Badminton',
        location: 'Delhi',
        entryFee: '800',
        eventDate: '29-Dec-2022',
        eventLogoURL: '/img/badminton.webp'

    },
    {
        eventID: '4',
        eventName: 'first event',
        organizerName: 'Anita',
        eventType: 'Badminton',
        location: 'Pune',
        entryFee: '200',
        eventDate: '12-Dec-2022',
        eventLogoURL: '/img/badminton.webp'

    },
    {
        eventID: '5',
        eventName: 'fifth event',
        organizerName: 'Anita',
        eventType: 'Badminton',
        location: 'Pune',
        entryFee: '200',
        eventDate: '12-Dec-2022',
        eventLogoURL: '/img/badminton.webp'

    }]
    constructor() {
        super();
        this.state = {
            eventList: this.eventList,
            loading: true,
            userLocation: 'All'
        }
    }
    render() {
        return (
            <div>
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

                    {/* {this.state.loading && <Loading></Loading>} */}


                    <div style={{ paddingTop: '0px' }}>
                        {/* <div id="big" className="owl-carousel owl-theme">
                            {this.state.eventList.map((event) => {
                                return <div id="big" className="col-lg-4 col-md-6 col-sm-6" key={event.eventID}>

                                    <BannerItemHP eventName={event.eventName} eventType={event.eventType} eventDate={event.eventDate}
                                        eventID={event.eventID} organizerName={event.organizerName}
                                        location={event.location}
                                        entryFee={event.entryFee}
                                        eventLogoURL={event.eventLogoURL} />


                                </div>
                            })}
                        </div> */}

                        <OwlCarousel items={3}
                            className="owl-theme"
                            loop
                            nav={false}
                            autoplay
                            smartSpeed={3000}
                            autoplayTimeout={3000}
                            autoplayHoverPause={false}
                            dots={false}
                            center={true}
                            margin={20} >

                            {this.state.eventList.map((event) => {
                                return <div id="big" key={event.eventID}>

                                    <BannerItemHP eventName={event.eventName} eventType={event.eventType} eventDate={event.eventDate}
                                        eventID={event.eventID} organizerName={event.organizerName}
                                        location={event.location}
                                        entryFee={event.entryFee}
                                        eventLogoURL={event.eventLogoURL} />


                                </div>
                            })}

                        </OwlCarousel>

                        <br />
                        {/* <div id="thumbs" className="owl-carousel owl-theme"> */}
                        <div className='row'>
                            {this.state.eventList.map((event) => {
                                return <div id="thumbs" className="col-lg-6 col-md-6 col-sm-12" key={event.eventID}>

                                    <BannerItemSmallHP eventLogoURL={event.eventLogoURL}></BannerItemSmallHP>
                                </div>

                            })}
                            {/* {this.state.loading = false} */}
                        </div>
                    </div><br /><br className="large" />
                </div>

            </div >
        )
    }

    callOnChange() {

    }

    // getEventList(filter) {
    //     var para = {};
    //     if (this.state.userLocation === undefined || this.state.userLocation === "" || this.state.userLocation === null) {
    //         // this.setState(this.state.userLocation = "All");
    //         // document.getElementById('location').innerHTML = "Location";
    //     } else {
    //         // document.getElementById('location').innerHTML = this.state.userLocation;
    //     }
    //     para = {
    //         eventStatus: "Active",
    //         City: this.state.userLocation,
    //     };
    //     // console.log(para);
    //     var ret = "";

    //     ret = functions.httpsCallable("getAllEventWithEventStatusAndLocation");
    //     // console.log('getAllEventWithEventStatusAndLocation');
    //     //}
    //     let index = 0
    //     ret(para).then(results => {

    //         for (index = 0; index < results.data.length; index++) {
    //         }
    //         // document.getElementById('loading').style.display = 'none';
    //     })
    //         .then(function (res) {
    //             //activate first item of both pard items

    //         });
    //     // });
    // }

}

