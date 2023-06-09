import '../css/Loading.css'
import React from 'react'

export default function Loading(props) {
    return (

        <div className="event-loading" id="eventLoading">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_9yosyj7r.json" background="transparent"
                speed="1" style={{ width: props.width ? props.width : '270px', height: props.height ? props.height : '100%' }} loop autoplay></lottie-player>
        </div>
    )
}


