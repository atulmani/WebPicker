import '../css/Loading.css'
import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (

            <div className="event-loading" id="eventLoading">
                <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_98vgucqb.json" background="transparent"
                    speed="1" style={{ width: '270px', height: '100%' }} loop autoplay></lottie-player>
            </div>
        )
    }
}
