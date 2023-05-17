import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

// styles
import './PropertyList.css'

export default function PropertyList({ properties }) {
    // console.log('properties: ', properties)


    return (
        // <div className="property-list">
        //     {properties.length === 0 && <p>No Property Yet!</p>}
        //     {properties.map(property => (
        //         <Link to={`/properties/${property.id}`} key={property.id}>
        //             <h4>{property.name}</h4>
        //             <p>Onboarding at {property.onboardingDate.toDate().toDateString()}</p>
        //             <div className="assigned-to">
        //                 <p><strong>Assigned to:</strong></p>
        //                 <ul>
        //                     {property.assignedUsersList.map(user => (
        //                         <li key={user.photoURL}>
        //                             <Avatar src={user.photoURL} />
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         </Link>
        //     ))}
        // </div>

        <div className='row no-gutters'>
            {properties.length === 0 && <p>No Property Yet!</p>}
            {properties.map(property => (
                <Link to={`/properties/${property.id}`} key={property.id} style={{ textDecoration: 'none' }} >
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className="property-status-padding-div">
                            <div className="profile-card-div" style={{ position: 'relative' }}>
                                <div class={"event-id " + property.category}>
                                    <h5>{property.category}</h5>
                                </div>
                                <div className="address-div" style={{ paddingBottom: '5px' }}>
                                    <div className="icon">
                                        <span className="material-symbols-outlined" style={{ color: 'var(--darkgrey-color)' }}>
                                            home
                                        </span>
                                    </div>
                                    <div className="address-text">
                                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                                            <h5 style={{ margin: '0' }}>{property.unitNumber}</h5>
                                            <small style={{ margin: '0' }}>{property.society}, {property.locality} ({property.city})</small>
                                        </div>
                                        <div className="">
                                            <span className="material-symbols-outlined">
                                                chevron_right
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tenant-profile-property-detail">
                                    <div className="tenant-profile-property-detail-inner-div">
                                        <div>
                                            <h1>Onboarding Date</h1>
                                            <h2>{property.onboardingDate.toDate().toDateString()}</h2>
                                        </div>
                                        <div>
                                            <h1>Pending</h1>
                                            <h2>₹ 60,000</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="secondary-details-inside-display">
                                    <h5
                                        style={{
                                            textAlign: 'center',
                                            padding: '10px 0 0 0',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            color: '#666',
                                            margin: '0'
                                        }}>
                                        Vedic Nagaphane - PropDail Agent</h5>
                                    <div className="property-contact-div property-media-icons-horizontal"
                                        style={{ flexDirection: 'row', width: '100%', height: 'auto' }}>
                                        <div>
                                            <span className="material-symbols-outlined">
                                                call
                                            </span>
                                            <h1>Call</h1>
                                        </div>
                                        <div>
                                            <img src="./img/whatsapp_square_icon.png" alt="" />
                                            <h1>WhatsApp</h1>
                                        </div>
                                        <div>
                                            <span className="material-symbols-outlined">
                                                alternate_email
                                            </span>
                                            <h1>Mail</h1>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
