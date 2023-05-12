import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"

export default function PropertyDetails({ property }) {
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('properties')
    // const [newComment, setNewComment] = useState('')

    // const { deleteDocument } = useFirestore('properties')
    // const { user } = useAuthContext()
    // const history = useHistory()

    // const handleClick = () => {
    const handleClick = async (e) => {
        // deleteDocument(property.id)
        // history.push('/')
        e.preventDefault();

        await updateDocument(property.id, {
            status: 'inactive',
        })
    }


    return (
        <div>
            <div className="property-summary">
                <h2 className="page-title">{property.name}</h2>
                <p className="due-date">
                    Property onboarding at {property.onboardingDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {property.details}
                </p>
                <h4>Property assigned to:</h4>
                <div className="assigned-users">
                    {property.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === property.createdBy.id && (
                <button className="btn" onClick={handleClick}>Mark as Inactive</button>
            )}
        </div>
    )
}