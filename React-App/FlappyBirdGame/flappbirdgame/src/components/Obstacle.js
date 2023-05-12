import React from 'react';
import './Obstacle.css';

export default function Obstacle(props) {
    return (
        <div className='obstacle'
            style={{
                top: props.top + 'px',
                width: props.width + 'px',
                height: props.height + 'px',
                left: props.left + 'px'
            }}>

        </div>
    )
}
