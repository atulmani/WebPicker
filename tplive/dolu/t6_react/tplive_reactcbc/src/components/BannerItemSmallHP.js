import React, { Component } from 'react'

export default class BannerItemSmallHP extends Component {
    render() {
        return (
            <div className="item">
                <div className="new-event-card">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <img src={this.props.eventLogoURL} width="100%" alt="" />
                </div>
            </div>
        )
    }
}
