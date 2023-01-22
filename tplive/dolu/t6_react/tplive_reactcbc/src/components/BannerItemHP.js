/* eslint-disable no-useless-constructor */
import '../css/BannerItemHP.css'
import React, { Component } from 'react'

export default class BannerItemHP extends Component {

    constructor() {
        super();
        this.state = {
            imageURL: "",
            sportCode: "",
            rating: "",
            buttonText: '',
            buttonStyle: '',
            sCode: ''
        }
    }
    componentDidMount() {
        if (this.props.eventMode === 'FIXTURE') {
            this.setState({
                buttonStyle: 'linear-gradient(to right,#73e336,#08bf1a)',
                buttonText: 'Draw'
            })

        } else if (this.props.eventMode === 'BOOK') {
            this.setState({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'Book'
            })

        } else if (this.props.eventMode === 'CLOSED') {
            this.setState({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'Closed'
            })
        } else if (this.props.eventMode === 'HOLD') {
            this.setState({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'On Hold'
            })

        } else if (this.props.eventMode === 'CANCELLED') {
            this.setState({
                buttonStyle: 'linear-gradient(to right,#ff5f95, #e62525)',
                buttonText: 'Cancelled'
            })
        } else {
            this.setState({
                buttonText: 'Details'
            })
        }

        switch (this.props.sportName.toUpperCase()) {
            case 'BADMINTON':
                this.setState({
                    sCode: 'BD',
                    imageURL: this.props.eventLogoURL ? this.props.eventLogoURL : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=e6aad2a0-7715-4714-991b-82042fd12b41'
                });
                break;
            case 'CARROM': this.setState({
                sCode: 'CR',
                imageURL: this.props.eventLogoURL ? this.props.eventLogoURL : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fcarrom.webp?alt=media&token=e7d92e92-bfe1-4ed9-9064-62d8e6a7dda6'
            });
                break;
            case 'CHESS': this.setState({
                sCode: 'CH',
                imageURL: this.props.eventLogoURL ? this.props.eventLogoURL : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fchess.webp?alt=media&token=9d10730d-3a38-435f-9bb7-c89aa2334b2c'
            });
                break;
            case 'SQUASH': this.setState({
                sCode: 'SQ',
                imageURL: this.props.eventLogoURL ? this.props.eventLogoURL : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fsquash.webp?alt=media&token=89e9d559-8cab-4504-a123-26ee966e88b0'
            });
                break;
            case 'TABLE TENNIS': this.setState({
                sCode: 'TT',
                imageURL: this.props.eventLogoURL ? this.props.eventLogoURL : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Ftabletennis.webp?alt=media&token=8f1dd9cb-95c8-4b0e-b30d-aedbd8386984'
            });
                break;
            case 'TENNIS': this.setState({
                sCode: 'TN',
                imageURL: this.props.eventLogoURL ? this.props.eventLogoURL : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Ftennis.webp?alt=media&token=72fdf3fc-3bb6-4994-8b84-32780c57abec'
            });
                break;
            default: this.setState({
                sCode: 'BD',
                imageURL: this.props.eventLogoURL ? this.props.eventLogoURL : 'https://firebasestorage.googleapis.com/v0/b/tplive-prod.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=e6aad2a0-7715-4714-991b-82042fd12b41'
            });
        };


    }
    render() {
        return (
            <>
                {/* let  {eventName, organizerName, eventID, eventType, location, location, entryFee, eventDate} = this.props; */}
                <div className="event-display-card">
                    <div className="row no-gutters">
                        <div className="col-lg-5 col-md-12 col-sm-12">
                            <div className="content">
                                <h1>{this.props.eventName}</h1>
                                <h2>{this.props.organizerName}</h2>
                                <div style={{ position: 'relative' }}>
                                    <h3 className="rating">
                                        <div className=""><span className="material-symbols-outlined">star</span><span
                                            className="material-symbols-outlined">star</span><span
                                                className="material-symbols-outlined">star</span><span
                                                    className="material-symbols-outlined">star</span><span
                                                        className="material-symbols-outlined">star</span><small>100</small></div>
                                    </h3>
                                </div>
                                <div className="details">
                                    <div className="">
                                        <h3>{this.props.location}</h3>
                                        <h4>Location</h4>
                                    </div>
                                    <div className="">
                                        <h3>{this.props.eventDate}</h3>
                                        <h4>Event Date</h4>
                                    </div>
                                    <div className="">
                                        <h3>{this.props.entryFee}</h3>
                                        <h4>Entry Fee</h4>
                                    </div>
                                </div>
                                <div className="button-div">
                                    <button type="button" onClick={this.btnClickEvent}
                                        className="mybutton button5 event-card-button" name="button"
                                        style={{ background: this.state.buttonStyle }}><span>{this.state.buttonText}</span></button>
                                    {this.props.isLive &&
                                        <a className="circle blink" href={"https://tournamentplanner.in/screens/TPLive_Draws.aspx?SCode=" + this.state.sCode + "&TCode=" + this.props.eventCode}>
                                            <div className=""></div>
                                            <h1>LiVE</h1>
                                        </a>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <div className="image"><img
                                src={this.state.imageURL}
                                width="100%" alt="" /></div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="mobile-content">
                                <div className="mobile-content-below-div">
                                    <div>
                                        <h1>{this.props.eventName}</h1>
                                        <h2 style={{ color: '#aaa', margin: '0' }}>{this.props.organizerName}</h2>
                                        <div style={{ position: 'relative' }}>
                                            <h3 className="rating">
                                                <div className="">
                                                    <span className="material-symbols-outlined">{(1 <= this.state.rating) ? 'star' : 'grade'}</span>
                                                    <span className="material-symbols-outlined">{(2 <= this.state.rating) ? 'star' : 'grade'}</span>
                                                    <span className="material-symbols-outlined">{(3 <= this.state.rating) ? 'star' : 'grade'}</span>
                                                    <span className="material-symbols-outlined">{(4 <= this.state.rating) ? 'star' : 'grade'}</span>
                                                    <span className="material-symbols-outlined">{(5 <= this.state.rating) ? 'star' : 'grade'}</span>
                                                    <small>{this.props.ratingCount ? this.props.ratingCount : 100}</small>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="button-div">
                                        <button type="button"
                                            onClick={this.btnClickEvent}
                                            className="mybutton button5 event-card-button" name="button"
                                            style={{ background: this.state.buttonStyle }}><span>{this.state.buttonText}</span></button>
                                        <div style={{ textAlign: 'right' }}>
                                            <h5 style={{ color: '#fff', margin: '0', transform: 'translateY(3px)' }}>{this.props.location}</h5>
                                            <div className="" style={{ display: 'flex', alignItems: 'center', transform: 'translateY(-3px)' }}>
                                                {!this.props.isLive && <h5 style={{ color: '#fff', position: 'relative', top: '5px' }}>{this.props.entryFee}</h5>}

                                                {this.props.isLive && <div className="">
                                                    <a href="/" className="circle blink">
                                                        <div className="" style={{ top: '15px' }}></div>
                                                        <h1>LiVE</h1>
                                                    </a>
                                                </div>}
                                                <span
                                                    style={{ color: '#fff', position: 'relative', left: '-0px', paddingLeft: '10px', fontSize: '1.3rem' }}>|</span>
                                                <h5
                                                    style={{ color: '#fff', position: 'relative', top: '5px', left: '-0px', paddingLeft: '10px' }}>
                                                    {this.props.eventDate}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    btnClickEvent = () => {

        window.location.href = "https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx?SCode=" + this.state.sCode + "&TCode=" + this.props.eventCode;

    }
}
