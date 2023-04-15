import React, { useRef } from 'react';
import '../css/Square.css'

export default function Square(props) {

    // const boxName = useRef(props.name);

    return (
        <div className={'square ' + props.name} style={{ pointerEvents: props.disable ? 'none' : 'all' }} onClick={props.onClick}>
            <h5>{props.value}</h5>
        </div>
    )
}
