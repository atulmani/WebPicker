import React from 'react';
import './Bird.css'

export default function Bird(props) {
    return (
        <div className='bird' style={{ top: props.top + 'px', width: '80px', height: '80px' }}>
            {/* <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_cc9cxym5.json" background="transparent" speed="0.6" style={{ width: '130%', height: '130%' }} loop autoplay></lottie-player> */}
            <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_Q1Ptzp.json" background="transparent" speed="0.8" loop autoplay></lottie-player>
        </div>
    )
}
