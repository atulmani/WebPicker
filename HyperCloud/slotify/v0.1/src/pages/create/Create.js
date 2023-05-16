import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router'
import Select from 'react-select'

// styles
import './Create.css'

const categories = [
  { value: 'category1', label: 'Category1' },
  { value: 'category2', label: 'Category2' },
  { value: 'category3', label: 'Category3' },
  { value: 'category4', label: 'Category4' },
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('bookings')
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  // form field values
  const [short_description, setShortDescription] = useState('')
  const [details, setDetails] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(documents.map(user => {
        return { value: { ...user, id: user.id }, label: user.displayName }
      }))
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a boking category.')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the booking to at least 1 user')
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const booking = {
      short_description,
      details,
      assignedUsersList,
      createdBy,
      category: category.value,
      bookingDate: timestamp.fromDate(new Date(bookingDate)),
      comments: []
    }

    await addDocument(booking)
    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Booking</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Booking Short Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setShortDescription(e.target.value)}
            value={short_description}
          />
        </label>
        <label>
          <span>Booking Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Booking Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setBookingDate(e.target.value)}
            value={bookingDate}
          />
        </label>
        <label>
          <span>Booking Category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Booking</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
