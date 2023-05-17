import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

// styles
import './ProjectList.css'

export default function ProjectList({ bookings }) {
  // console.log(bookings)

  return (
    <div className="project-list">
      {bookings.length === 0 && <p> No bookings yet!</p>}
      {bookings.map(booking => (
        <Link to={`/bookings/${booking.id}`} key={booking.id}>
          <h4>{booking.short_description}</h4>
          <p>Due by {booking.bookingDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p><strong>Assigned to:</strong></p>
            <ul>
              {booking.assignedUsersList.map(user => (
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
