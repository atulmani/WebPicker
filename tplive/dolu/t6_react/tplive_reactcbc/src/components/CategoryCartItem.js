import React from 'react'

export default function CategoryCartItem(props) {
    return (
        <div className="col-lg-12 col-md-12 col-sm-12" style={{ padding: '0' }}>
            <div style={{ padding: '10px' }}>
                {/* {console.log(props)} */}

                <div className={props && props.eventDetails && props.eventDetails.PaymentStatus.toUpperCase() === 'PENDING' ?
                    "reg-category-card active payment-pending" : "reg-category-card active payment-completed"}>

                    <div className="display-flex-div">
                        <div className="category-details">
                            <h1>{props && props.eventDetails && props.eventDetails.CategoryName}</h1>

                            {props && props.eventDetails && props.eventDetails.Gender.toUpperCase() === 'FEMALE' && props.eventDetails.EventType.toUpperCase() === 'SINGLE' ? <div className="category-icons">
                                <span className="material-symbols-outlined female">
                                    woman
                                </span>
                            </div> :
                                props && props.eventDetails.Gender.toUpperCase() === 'FEMALE' && props.eventDetails.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                    <span className="material-symbols-outlined female">
                                        woman
                                    </span>
                                    <span className="material-symbols-outlined female">
                                        woman
                                    </span>
                                </div> :
                                    props && props.eventDetails.Gender.toUpperCase() === 'MIXED' && props.eventDetails.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                        <span className="material-symbols-outlined female">
                                            woman
                                        </span>
                                        <span className="material-symbols-outlined male">
                                            man
                                        </span>
                                    </div> :
                                        props && props.eventDetails.Gender.toUpperCase() === 'MALE' && props.eventDetails.EventType.toUpperCase() === 'SINGLE' ? <div className="category-icons">
                                            <span className="material-symbols-outlined male">
                                                man
                                            </span>
                                        </div> :
                                            props && props.events.eventDetails.toUpperCase() === 'MALE' && props.eventDetails.EventType.toUpperCase() === 'DOUBLE' ? <div className="category-icons">
                                                <span className="material-symbols-outlined male">
                                                    man
                                                </span>
                                                <span className="material-symbols-outlined male">
                                                    man
                                                </span>
                                            </div> :
                                                props && props.eventDetails.Gender.toUpperCase() === 'FEMALE' && props.eventDetails.EventType.toUpperCase() === 'TEAM' ? <div className="category-icons">
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                    <span className="material-symbols-outlined female">
                                                        woman
                                                    </span>
                                                </div> :
                                                    props && props.eventDetails.Gender.toUpperCase() === 'MALE' && props.eventDetails.EventType.toUpperCase() === 'TEAM' ? <div className="category-icons">
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                        <span className="material-symbols-outlined male">
                                                            man
                                                        </span>
                                                    </div> :
                                                        <div className="category-icons">
                                                            <span className="material-symbols-outlined female">
                                                                woman
                                                            </span>
                                                            <span className="material-symbols-outlined female">
                                                                woman
                                                            </span>
                                                            <span className="material-symbols-outlined male">
                                                                man
                                                            </span>
                                                            <span className="material-symbols-outlined male">
                                                                man
                                                            </span>
                                                        </div>
                            }

                            {props && props.eventDetails && props.eventDetails.PartnerPlayerID !== '' && <h3>
                                <strong>Partner : </strong>{props.eventDetails.PartnerPlayerName}
                                {props.eventDetails.RegType === 'Partner' ? ' (registered by Partner)' : ''}
                            </h3>}
                        </div>

                        <div className="category-fees">
                            <h2 style={{ position: 'relative', top: '5px' }}><span>₹ </span>
                                <span>{props && props.eventDetails && props.eventDetails.Fees}</span>
                            </h2>
                        </div>

                    </div>
                    {props && props.eventDetails && props.eventDetails.PaymentStatus.toUpperCase() === 'PENDING' &&
                        <div className="payment-status pending">
                            <h1>Payment Pending</h1>
                        </div>
                    }
                    {props && props.eventDetails && props.eventDetails.PaymentStatus.toUpperCase() === 'COMPLETED' &&
                        <div className="payment-status completed">
                            <h1>Payment Completed</h1>
                        </div>
                    }
                </div>
            </div>
        </div >

    )
}
