import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('bookings')
  const [filter, setFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const bookings = documents ? documents.filter(document => {
    switch (filter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if (u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'category1':
      case 'category2':
      case 'category3':
      case 'category4':
        console.log(document.category, filter)
        return document.category === filter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {bookings && <ProjectList bookings={bookings} />}
    </div>
  )
}
