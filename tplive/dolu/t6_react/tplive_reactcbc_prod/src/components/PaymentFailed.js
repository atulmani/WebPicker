import React from 'react'
import { useEffect } from 'react'


export default function PaymentFailed(props) {
    const { response } = props.state
    useEffect(() => {
        // console.log(response);
    }, []);

    return (
        <div>
            payment failed
        </div>
    )
}
