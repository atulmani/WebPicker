import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

// styles
import './PropertyList.css'

export default function PropertyList({ properties }) {
    console.log('properties: ', properties)


    return (
        <div className="property-list">
            {properties.length === 0 && <p>No Property Yet!</p>}
            {properties.map(property => (
                <Link to={`/properties/${property.id}`} key={property.id}>
                    <h4>{property.name}</h4>
                    <p>Onboarding at {property.onboardingDate.toDate().toDateString()}</p>
                    <div className="assigned-to">
                        <p><strong>Assigned to:</strong></p>
                        <ul>
                            {property.assignedUsersList.map(user => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
