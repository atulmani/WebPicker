import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

// styles
import './AddProperty.css'
import { el } from 'date-fns/locale'

const categories = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
]

export default function AddProperty() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('properties')
    const { user } = useAuthContext()
    const { documents } = useCollection('users')
    const { document, error } = useDocument('countries', 'COUNTRY')
    const [users, setUsers] = useState([])
    // const [countries, setCountries] = useState([])
    const [toggleFlag, setToggleFlag] = useState(false)

    // form field values
    const [unitNumber, setUnitNumber] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([]) //Owners, Co-Owners, Executive 
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [locality, setLocality] = useState('')
    const [society, setSociety] = useState('')
    const [category, setCategory] = useState('residential') //Residential/Commercial
    const [purpose, setPurpose] = useState('') //Rent/Sale/RentSaleBoth
    const [status, setStatus] = useState('active')
    const [onboardingDate, setDueDate] = useState('')
    const [formError, setFormError] = useState(null)

    const toggleBtnClick = () => {
        // console.log('toggleClick Category:', toggleFlag)
        if (toggleFlag)
            setCategory('residential')
        else
            setCategory('commercial')

        setToggleFlag(!toggleFlag);
    };

    // console.log('documentCountry: ', document);
    // console.log('purpose value: ', purpose);


    const countryOptions = [
        { value: 'IND', label: 'INDIA' },
        { value: 'USA', label: 'USA' }
    ];
    const countryOptionsSorted = countryOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
    );
    const stateOptions = [
        { value: 'MH', label: 'MAHARASHTRA' },
        { value: 'DEL', label: 'DELHI' },
        { value: 'UP', label: 'UTTAR PRADESH' }
    ];
    const stateOptionsSorted = stateOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
    );
    const cityOptions = [
        { value: '1', label: 'DELHI' },
        { value: '2', label: 'MUMBAI' },
        { value: '3', label: 'NOIDA' },
        { value: '4', label: 'GURGAON' }
    ];
    const cityOptionsSorted = cityOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
    );
    const localityOptions = [
        { value: '1', label: 'MALVIYA NAGAR' },
        { value: '2', label: 'SECTOR 5' },
        { value: '3', label: 'SECTOR 105' },
        { value: '4', label: 'M G ROAD' }
    ];
    const localityOptionsSorted = localityOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
    );
    const societyOptions = [
        { value: '1', label: 'AVON PARADISE' },
        { value: '2', label: 'DREAM LAND' },
        { value: '3', label: 'VISON FLORA' },
        { value: '4', label: 'PLATINUM VISTA' }
    ];
    const societyOptionsSorted = societyOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
    );


    // create user values for react-select
    useEffect(() => {
        if (documents) {
            setUsers(documents.map(user => {
                return { value: { ...user, id: user.id }, label: user.displayName }
            }))
        }

    }, [documents])

    const usersSorted = users.sort((a, b) =>
        a.label.localeCompare(b.label)
    );

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
            unitNumber,
            assignedUsersList,
            country: country.label,
            state: state.label,
            city: city.label,
            locality: locality.label,
            society: society.label,
            category,
            purpose,
            status,
            createdBy,
            onboardingDate: timestamp.fromDate(new Date(onboardingDate)),
            comments: []
        }

        await addDocument(property)
        console.log('addDocument:', property)
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

            <div className="row no-gutters" style={{ margin: '20px 0 10px 0' }}>

                {/* <div className="col-lg-6 col-md-6 col-sm-12"
                    style={{ background: 'rgb(188, 236, 224, 0.5)', padding: ' 0 10px' }}> */}
                <div className="col-lg-6 col-md-6 col-sm-12"
                    style={{ background: 'rgba(var(--green-color), 0.5)', padding: ' 0 10px', borderRadius: '8px 0px 0px 8px' }}>
                    <div className="residential-commercial-switch" style={{ height: 'calc(100% - 10px)' }}>
                        <span className={toggleFlag ? '' : 'active'} style={{ color: 'var(--blue-color)' }}>Residential</span>

                        <div className={toggleFlag ? 'toggle-switch on commercial' : 'toggle-switch off residential'} style={{ padding: '0 10px' }}>
                            {/* <small>{toggleFlag ? 'On' : 'Off'}</small> */}
                            <div onClick={toggleBtnClick}>
                                <div></div>
                            </div>
                        </div>
                        <span className={toggleFlag ? 'active' : ''} style={{ color: 'var(--red-color)' }}>Commercial</span>
                    </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-12"
                    style={{ background: 'rgb(188, 236, 224, 0.5)', padding: '10px 10px 0 10px' }}> */}
                <div className="col-lg-6 col-md-6 col-sm-12"
                    style={{ background: 'rgba(var(--green-color), 0.5)', padding: '10px 10px 0 10px', borderRadius: '0px 8px 8px 0px' }}>
                    <div className="details-radio">
                        <div></div>
                        <div className='details-radio-inner'>
                            <div className="row no-gutters">
                                <div className="col-6" style={{ padding: '0 5px' }}>
                                    <input type="checkbox" className="checkbox" style={{ width: '0px' }}
                                        name="BusinessType" id="businessTypeRent" value="Rent"
                                        onClick={() => setPurpose('rent')}
                                    />
                                    <label className="checkbox-label" for="businessTypeRent">
                                        <span className="material-symbols-outlined add">
                                            add
                                        </span>
                                        <span className="material-symbols-outlined done">
                                            done
                                        </span>
                                        <small>Rent</small>
                                    </label>
                                </div>

                                <div className="col-6" style={{ padding: '0 5px' }}>
                                    <input type="checkbox" className="checkbox" style={{ width: '0px' }}
                                        name="BusinessType" id="businessTypeSale" value="Sale"
                                        onClick={() => setPurpose('sale')}
                                    />
                                    <label className="checkbox-label" for="businessTypeSale">
                                        <span className="material-symbols-outlined add">
                                            add
                                        </span>
                                        <span className="material-symbols-outlined done">
                                            done
                                        </span>
                                        <small>Sale</small>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ overflow: 'hidden' }}>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="row no-gutters">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="property-form-border-div" style={{ border: 'none', paddingBottom: '0' }}>
                                <h1 className="owner-heading">Unit Number</h1>
                                <div className="location-search">
                                    {/* <input type="text" required placeholder="Enetr Property Unit Number..."
                                        name="" /> */}
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. A-504"
                                        maxLength={70}
                                        onChange={(e) => setUnitNumber(e.target.value)}
                                        value={unitNumber}
                                    />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        drive_file_rename_outline
                                    </span>
                                </div>

                            </div>
                            <br />


                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div>
                                <h1 className="owner-heading">Onboarding Date</h1>
                                <input
                                    required
                                    type="date"
                                    onChange={(e) => setDueDate(e.target.value)}
                                    value={onboardingDate}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">

                            <div className="property-form-border-div">

                                <h1 className="owner-heading">Owner Name</h1>
                                <div className="location-search">
                                    {/* <select className="" name="">
                                        <option value="" selected disabled>Select Owner</option>
                                        <option value="">Atul Tripathi</option>
                                        <option value="">Vinay Prajapati</option>
                                    </select> */}
                                    <Select className=''
                                        onChange={(option) => setAssignedUsers(option)}
                                        options={usersSorted}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                outline: 'none',
                                                background: '#eee',
                                                borderBottom: ' 1px solid var(--blue-color)'
                                            }),
                                        }}
                                        isMulti
                                    />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        person
                                    </span>
                                </div><br />

                                <h1 className="owner-heading">Country</h1>
                                <div className="location-search">
                                    {/* <select className="" name="">
                                        <option value="" selected>India</option>
                                        <option value="">Denmark</option>
                                        <option value="">Malasia</option>
                                        <option value="">China</option>
                                    </select> */}
                                    <Select className=''
                                        onChange={(option) => setCountry(option)}
                                        options={countryOptionsSorted}
                                        value={country}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                outline: 'none',
                                                background: '#eee',
                                                borderBottom: ' 1px solid var(--blue-color)'
                                            }),
                                        }}
                                    />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        public
                                    </span>
                                </div><br />

                                <h1 className="owner-heading">State</h1>
                                <div className="location-search">
                                    <Select className=''
                                        onChange={(option) => setState(option)}
                                        options={stateOptionsSorted}
                                        value={state}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                outline: 'none',
                                                background: '#eee',
                                                borderBottom: ' 1px solid var(--blue-color)'
                                            }),
                                        }}
                                    />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        emoji_transportation
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">

                            <div className="property-form-border-div" style={{ border: 'none', }}>
                                <h1 className="owner-heading">City</h1>
                                <div className="location-search">
                                    <Select className=''
                                        onChange={(option) => setCity(option)}
                                        options={cityOptionsSorted}
                                        value={city}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                outline: 'none',
                                                background: '#eee',
                                                borderBottom: ' 1px solid var(--blue-color)'
                                            }),
                                        }}
                                    />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        apartment
                                    </span>
                                </div><br />

                                <h1 className="owner-heading">Lacality</h1>
                                <div className="location-search">
                                    <Select className=''
                                        onChange={(option) => setLocality(option)}
                                        options={localityOptionsSorted}
                                        value={locality}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                outline: 'none',
                                                background: '#eee',
                                                borderBottom: ' 1px solid var(--blue-color)'
                                            }),
                                        }}
                                    />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        holiday_village
                                    </span>
                                </div><br />

                                <h1 className="owner-heading">Society</h1>
                                <div className="location-search">
                                    <Select className=''
                                        onChange={(option) => setSociety(option)}
                                        options={societyOptionsSorted}
                                        value={society}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                outline: 'none',
                                                background: '#eee',
                                                borderBottom: ' 1px solid var(--blue-color)'
                                            }),
                                        }}
                                    />
                                    <div className="underline"></div>
                                    <span className="material-symbols-outlined">
                                        home
                                    </span>
                                </div>

                                <br />
                            </div>

                        </div>

                        {/* <div className="col-lg-4 col-md-6 col-sm-12">

                            <label>
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
                            </label>

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
                        </div> */}
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
                        {/* <div className="col-lg-6 col-md-6 col-sm-12">
                            <label>
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
                            </label>
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
                        </div> */}
                        {/* <div className="col-lg-6 col-md-6 col-sm-12">
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
                        </div> */}
                        {/* <label>
                            <span>Set Onboarding Date:</span>
                            <input
                                required
                                type="date"
                                onChange={(e) => setDueDate(e.target.value)}
                                value={onboardingDate}
                            />
                        </label> */}


                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="btn">Add Property</button>
                        {formError && <p className="error">{formError}</p>}
                    </div>
                    <br />
                </form>
                {/* <br /><hr />
                <br /><br /><br /><br /> */}
                {/* <div className="row no-gutters section-btn-div">
                    <div className="col-12">
                        <div className="section-btn">
                            <a href="propertyList.html" style={{ textDecoration: 'none', width: '100%' }}>
                                <button type="button" name="button" onclick="addPropertyMenu('Details')"
                                    className="mybutton button5">
                                    Add
                                </button>
                            </a>

                        </div>
                    </div>
                </div> */}
            </div >

        </div >
    )
}

