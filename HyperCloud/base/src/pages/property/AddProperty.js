import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

// styles
import './AddProperty.css'

const categories = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
]

export default function AddProperty() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('properties')
    const { user } = useAuthContext()
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])

    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [onboardingDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('active')
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
            setFormError('Please select a property category.')
            return
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assign the property to at least 1 user')
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

        const property = {
            name,
            details,
            assignedUsersList,
            status,
            createdBy,
            category: category.value,
            onboardingDate: timestamp.fromDate(new Date(onboardingDate)),
            comments: []
        }

        await addDocument(property)
        if (!response.error) {
            navigate('/')
        }
    }

    return (
        <div>
            <div className='page-title'>
                <span className="material-symbols-outlined">
                    real_estate_agent
                </span>
                <h1>Add Property </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="row no-gutters">
                        <div className="col-lg-4 col-md-6 col-sm-12">

                            <div className="property-form-border-div" style={{ border: 'none', paddingBottom: '0' }}>
                                <h1 className="owner-heading">Unit Number</h1>
                                <div className="location-search">
                                    <input type="text" required placeholder="Enetr Property Unit Number..."
                                        name="" value="" />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        drive_file_rename_outline
                                    </span>
                                </div>
                            </div>

                            {/* <label>
                                <div className='form-field-title'>
                                    <span className="material-symbols-outlined">
                                        badge
                                    </span>
                                    <h1>Unit No </h1>
                                    <input
                                        required
                                        type="text"
                                        maxLength={70}
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>
                            </label> */}
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <label>
                                <div className='form-field-title'>
                                    <span className="material-symbols-outlined">
                                        badge
                                    </span>
                                    <h1>Property Details </h1>
                                    <textarea
                                        required
                                        type="text"
                                        maxLength={70}
                                        onChange={(e) => setDetails(e.target.value)}
                                        value={details}
                                    />
                                </div>
                            </label>
                        </div>
                        {/* <label>
                            <div className='form-field-title'>
                            <span className="material-symbols-outlined">
                                badge
                            </span>
                            <h1>Owners</h1>
                            <Select className='select'
                                onChange={(option) => setAssignedUsers(option)}
                                options={users}
                                isMulti
                            />
                            </div>
                        </label> */}
                        <div className="col-lg-6 col-md-6 col-sm-12">

                            {/* <label>
                                <h1>test</h1>
                                <Select className='select'
                                    onChange={(option) => setAssignedUsers(option)}
                                    options={users}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? 'grey' : 'red',
                                            background: 'yellow',
                                            zIndex: '999'
                                        }),
                                    }}
                                    isMulti
                                />
                            </label> */}
                            <label>
                                <div className='form-field-title'>
                                    <span className="material-symbols-outlined">
                                        badge
                                    </span>
                                    <h1>Country</h1>
                                    <Select
                                        onChange={(option) => setCategory(option)}
                                        options={categories}
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div style={{ position: 'relative' }}>
                                <label>
                                    <span style={{
                                        position: 'absolute',
                                        top: '37px',
                                        right: '5px',
                                        color: 'var(--blue-color)',
                                        background: '#eee',
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: '999',
                                        pointerEvents: 'none'
                                    }} className="material-symbols-outlined">
                                        badge
                                    </span>
                                    <h1>test</h1>
                                    <Select className='select'
                                        onChange={(option) => setAssignedUsers(option)}
                                        options={users}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                outline: 'none',
                                                background: '#eee',
                                                borderBottom: ' 3px solid var(--blue-color)'
                                            }),
                                        }}
                                        isMulti
                                    />
                                </label>
                            </div>

                            <label>
                                <h1 style={{ fontSize: '0.9rem', fontWeight: 'bolder', paddingLeft: '4px', color: 'var(--blue-color)' }}>Country</h1>
                                <Select
                                    onChange={(option) => setCategory(option)}
                                    options={categories}
                                />
                            </label>
                        </div>
                        <label>
                            <span>Set Onboarding Date:</span>
                            <input
                                required
                                type="date"
                                onChange={(e) => setDueDate(e.target.value)}
                                value={onboardingDate}
                            />
                        </label>




                        <button className="btn">Add Property</button>

                        {formError && <p className="error">{formError}</p>}
                    </div>
                </form>
                <br /><hr />
                <br /><br /><br /><br />
            </div >
        </div >
    )
}

