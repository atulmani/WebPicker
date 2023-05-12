import React from 'react'

export default function Popup(props) {

    const handlePopup = (action) => {
        // console.log('Popup Action:', action)

        if (action == 'CANCEL')
            props.setPopupReturn(false)

        if (action == 'CONFIRM')
            props.setPopupReturn(true)

        props.setShowPopupFlag(false)
    }

    return (
        <div className={props.showPopupFlag ? 'pop-up-div open' : 'pop-up-div'}>
            <div>
                <p>
                    {props.msg}
                </p><br />
                <button onClick={() => handlePopup('CANCEL')} className='btn cancel' style={{ margin: '0 20px' }}>CANCEL</button>
                <button onClick={() => handlePopup('CONFIRM')} className='btn' style={{ margin: '0 20px' }}>CONFIRM</button>
            </div>
        </div>
    )
}
