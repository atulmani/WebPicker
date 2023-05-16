import { useCollection } from '../../../hooks/useCollection'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
// import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../../hooks/useLogout'

// components
import Filters from '../../../components/Filters'
import PropertyList from '../../../components/PropertyList'

// styles
import './AdminDashboard.css'

export default function AdminDashboard() {
    const { user } = useAuthContext()
    const { logout, isPending } = useLogout()
    const { documents, error } = useCollection('properties')
    const [filter, setFilter] = useState('all')
    // const navigate = useNavigate();

    useEffect(() => {
        let flag = user && user.roles && user.roles.includes('admin');
        if (!flag) {
            logout()
        }
    }, [user, logout])

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const properties = documents ? documents.filter(document => {
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
            case 'residential':
            case 'commercial':
            case 'active':
            case 'inactive':
                // console.log(document.category, filter)
                return document.category === filter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <div className='page-title'>
                <span className="material-symbols-outlined">
                    dashboard_customize
                </span>
                <h1>Admin Dashboard </h1>
            </div><br />

            <div className="row no-gutters">
                <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: '10px' }}>
                    <div className="rent-tenant-card">
                        <div>
                            <h6>Rent Balance</h6>
                            <h1 style={{ color: 'red' }}>₹42,000</h1>
                            <h2>Cut-off Date : 12 Jun'23</h2>
                            {/* <h4>Due Date Exceeded : ₹100</h4> */}
                            <button className="mybutton button5"
                                style={{ background: 'var(--blue-color)', color: '#fff', fontWeight: 'bolder' }}>Details</button>
                        </div>
                        {/* <div>
                            <h6>PropDial Commission</h6>
                            <h2 style={{fontSize: '1.2rem',color: '#666'}}>₹10,000</h2>
                            <button style={{float: 'right'}} className="mybutton button5">Pay Now</button>
                        </div> */}
                    </div>

                </div>

                <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: '10px' }}>

                    <div className="tenant-dashboard-ticket-card">
                        <div className="ticket-round-left"></div>
                        <div className="ticket-round-right"></div>
                        <h1 className="tenant-dashboard-ticket-card-heading">Tickets</h1>
                        <hr />
                        <div className="tenant-dashboard-ticket-card-content">
                            <div>
                                <h1>Pending Tickets</h1>
                                <h2>10</h2>
                                <h3>Last Raised Date</h3>
                                <h4>15 Jan 2023</h4>
                            </div>
                            <div>
                                <h1>Closed Tickets</h1>
                                <h2>30</h2>
                                <button className="mybutton button5">Raise Ticket</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <br />
            {/* <div className='row no-gutters'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className="property-status-padding-div">
                        <div className="profile-card-div">
                            <div className="address-div" style={{ paddingBottom: '5px' }}>
                                <div className="icon">
                                    <span className="material-symbols-outlined">
                                        home
                                    </span>
                                </div>
                                <div className="address-text">
                                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                                        <h5 style={{ margin: '0' }}>A 504, HIGH MONT</h5>
                                        <small style={{ margin: '0' }}>Hinjewadi, Pune - 411027</small>
                                    </div>
                                    <div className="">
                                        <span className="material-symbols-outlined">
                                            chevron_right
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="tenant-profile-property-detail">
                                <div className="tenant-profile-property-detail-inner-div">
                                    <div>
                                        <h1>Onboarding Date</h1>
                                        <h2>5 Jan 2021</h2>
                                    </div>
                                    <div>
                                        <h1>Deposit</h1>
                                        <h2>₹ 60,000</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="secondary-details-inside-display">
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '10px 0 0 0',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        color: '#666',
                                        margin: '0'
                                    }}>
                                    Vedic Nagaphane - PropDail Agent</h5>
                                <div className="property-contact-div property-media-icons-horizontal"
                                    style={{ flexDirection: 'row', width: '100%', height: 'auto' }}>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            call
                                        </span>
                                        <h1>Call</h1>
                                    </div>
                                    <div>
                                        <img src="./img/whatsapp_square_icon.png" alt="" />
                                        <h1>WhatsApp</h1>
                                    </div>
                                    <div>
                                        <span className="material-symbols-outlined">
                                            alternate_email
                                        </span>
                                        <h1>Mail</h1>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div> */}

            {error && <p className="error">{error}</p>}
            {documents && <Filters changeFilter={changeFilter} />}
            {properties && <PropertyList properties={properties} />}
        </div>
    )
}
