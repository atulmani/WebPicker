import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {

        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        // console.log({ 'alert alert-{props.alert.type} alert-dismissible fade show'});
        // props.alert && <div className={'alert alert-{props.alert.type} alert-dismissible fade show'} role="alert" >
        props.alert && <div className='alert alert-success alert-dismissible fade show' role="alert" >

            <strong>
                {capitalize(props.alert.type)}
            </strong>:{props.alert.msg}
            {/* <br></br>
            <strong>
                {props.alert.type}
            </strong>:{props.alert.msg} */}
        </div>
    )
}
