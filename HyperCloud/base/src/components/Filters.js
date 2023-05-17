import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import './Filters.css';
// import { useNavigate } from 'react-router-dom'

// const filterList = ['all', 'admin', 'active', 'inactive'];

const superAdminUserFilterList = ['all', 'admin', 'active', 'inactive'];
const adminUserFilterList = ['all', 'active', 'inactive'];
const userPropertyFilterList = ['all', 'residential', 'commercial', 'inactive'];


let filterList;

export default function Filters({ changeFilter }) {
    const { user } = useAuthContext()
    const [currentFilter, setCurrentFilter] = useState('all')
    // const navigate = useNavigate();

    if (user.roles.includes('superadmin')) {
        filterList = superAdminUserFilterList
    }
    if (user.roles.includes('admin')) {
        filterList = adminUserFilterList
    }
    if (user.roles.includes('user')) {
        filterList = userPropertyFilterList
    }

    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
        changeFilter(newFilter)
    }

    return (
        <div className="project-filter">
            <nav>
                {/* <p>Filter by: </p> */}
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        <span>{f}</span>
                    </button>
                ))}
            </nav>
        </div>
    )
}