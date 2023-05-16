import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"

export default function ProjectSummary({ booking }) {
  const { deleteDocument } = useFirestore('bookings')
  const { user } = useAuthContext()
  const history = useHistory()

  console.log(booking)

  const handleClick = () => {
    deleteDocument(booking.id)
    history.push('/')
  }

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{booking.short_description}</h2>
        <p className="due-date">
          Booking due by {booking.bookingDate.toDate().toDateString()}
        </p>
        <p className="details">
          {booking.details}
        </p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {booking.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === booking.createdBy.id && (
        <button className="btn" onClick={handleClick}>Mark as Complete</button>
      )}
    </div>
  )
}