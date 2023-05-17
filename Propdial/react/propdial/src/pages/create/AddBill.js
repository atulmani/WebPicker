import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

// styles
import './AddBill.css'
import { el } from 'date-fns/locale'

// const categories = [
//     { value: 'residential', label: 'Residential' },
//     { value: 'commercial', label: 'Commercial' },
// ]

export default function AddBill() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('bills')
    const { user } = useAuthContext()
    const { documents } = useCollection('users')
    // const { document, error } = useDocument('countries', 'COUNTRY')
    const [users, setUsers] = useState([])
    // const [countries, setCountries] = useState([])
    const [toggleFlag, setToggleFlag] = useState(false)

    // form field values
    const [propertyid, setPropertyID] = useState('')
    const [billSubject, setbillSubject] = useState('')
    const [billDetails, setbillDetails] = useState('')
    const [billPayer, setBillPayer] = useState([]) //Owners, Co-Owners, Executive 
    const [billType, setBillType] = useState('')
    const [billAmount, setAmount] = useState('')
    const [agencyCommissionAmount, setagencyCommissionAmount] = useState('')
    const [taxAmount, setTaxAmount] = useState('')
    const [adjustmentAmount, setadjustmentAmount] = useState('')
    const [billTotalAmount, setTotalAmount] = useState('')
    const [status, setStatus] = useState('pending')
    const [billDueDate, setBillDueDate] = useState('')
    const [formError, setFormError] = useState(null)

    const billTypeOptions = [
        { value: 'RENT', label: 'RENT' },
        { value: 'AMC', label: 'AMC' },
        { value: 'MISCELLANEOUS', label: 'MISCELLANEOUS' }
    ];
    const billTypeOptionsSorted = billTypeOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
    );

    // create user values for react-select
    useEffect(() => {
        if (documents) {
            setUsers(documents.map(user => {
                var userDetails = user.displayName + '(' + user.roles + ')';
                // console.log('userDetails:', userDetails)
                return { value: { ...user, id: user.id }, label: userDetails }
            }))
        }

    }, [documents])

    const usersSorted = users.sort((a, b) =>
        a.label.localeCompare(b.label)
    );

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        // if (!category) {
        //     setFormError('Please select a property category.')
        //     return
        // }
        if (billPayer.length < 1) {
            setFormError('Please assign the bill to at least 1 user')
            return
        }

        const billPayerList = billPayer.map(u => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const createdBy = {
            displayName: user.displayName + '(' + user.roles + ')',
            photoURL: user.photoURL,
            id: user.uid
        }

        const bill = {
            propertyid,
            billSubject,
            billDetails,
            billPayerList,
            billType: billType.label,
            billAmount,
            agencyCommissionAmount,
            taxAmount,
            adjustmentAmount,
            billTotalAmount,
            status,
            createdBy,
            billDueDate: timestamp.fromDate(new Date(billDueDate))
        }

        await addDocument(bill)
        console.log('addDocument:', bill)
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
                <h1>Add Bill </h1>
            </div>
            <div style={{ overflow: 'hidden' }}>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="row no-gutters">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="property-form-border-div" style={{ border: 'none', paddingBottom: '0' }}>
                                <h1 className="owner-heading">Property ID</h1>
                                <div className="location-search">
                                    <input
                                        required
                                        type="text"
                                        placeholder="property id"
                                        maxLength={70}
                                        onChange={(e) => setPropertyID(e.target.value)}
                                        value={propertyid}
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
                                <h1 className="owner-heading">Bill Subject</h1>
                                <input
                                    required
                                    type="text"
                                    onChange={(e) => setbillSubject(e.target.value)}
                                    value={billSubject}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div>
                                <h1 className="owner-heading">Bill Due Date</h1>
                                <input
                                    required
                                    type="date"
                                    onChange={(e) => setBillDueDate(e.target.value)}
                                    value={billDueDate}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">

                            <div className="property-form-border-div">

                                <h1 className="owner-heading">Payer</h1>
                                <div className="location-search">
                                    {/* <select className="" name="">
                                        <option value="" selected disabled>Select Owner</option>
                                        <option value="">Atul Tripathi</option>
                                        <option value="">Vinay Prajapati</option>
                                    </select> */}
                                    <Select className=''
                                        onChange={(option) => setBillPayer(option)}
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

                                <h1 className="owner-heading">Bill Type</h1>
                                <div className="location-search">
                                    {/* <select className="" name="">
                                        <option value="" selected>India</option>
                                        <option value="">Denmark</option>
                                        <option value="">Malasia</option>
                                        <option value="">China</option>
                                    </select> */}
                                    <Select className=''
                                        onChange={(option) => setBillType(option)}
                                        options={billTypeOptionsSorted}
                                        value={billType}
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
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="btn">Add Bill</button>
                        {formError && <p className="error">{formError}</p>}
                    </div>
                    <br />
                </form>
            </div >
        </div >
    )
}

