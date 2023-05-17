import { useCollection } from '../../hooks/useCollection'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
// import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

// components
import Filters from '../../components/Filters'
import PropertyList from '../../components/PropertyList'

// styles
import './UserDashboard.css'

export default function UserDashboard() {
    const { user } = useAuthContext()
    const { logout, isPending } = useLogout()
    const { documents, error } = useCollection('properties')
    const [filter, setFilter] = useState('all')
    // const navigate = useNavigate();

    useEffect(() => {
        let flag = user && user.roles && user.roles.includes('user');
        if (!flag) {
            logout()
        }
    }, [user, logout])

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const properties = documents ? documents.filter(document => {
        let filteredProperty = false
        switch (filter) {
            case 'all':
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid) {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            case 'residential':
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid && document.category === 'residential') {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            case 'commercial':
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid && document.category === 'commercial') {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            case 'active':
            case 'inactive':
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid && document.status === 'inactive') {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            // return document.status === filter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className="page-title">User Dashboard</h2>
            <div>
                {error && <p className="error">{error}</p>}
                {documents && <Filters changeFilter={changeFilter} />}
                {properties && <PropertyList properties={properties} />}
            </div>

        </div>
    )
}
