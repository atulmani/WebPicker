import { useCollection } from '../../../hooks/useCollection'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
// import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../../hooks/useLogout'

// components
import Filters from '../../../components/Filters'
import PropertyList from '../../../components/PropertyList'
// import BillList from '../../../components/BillList'

// styles
// import './UserDashboard.css'
const propertyFilter = ['ALL', 'RESIDENTIAL', 'COMMERCIAL', 'INACTIVE'];

export default function PGOwnerDashboard() {
    const { user } = useAuthContext()
    const { logout, isPending } = useLogout()

    console.log('user uid:', user.uid)

    const { documents: propertiesdocuments, error: propertieserror } = useCollection('properties')
    // const { documents: propertiesdocuments, error: propertieserror } =
    //     useCollection('properties', ["taggedUsersList", "array-contains", { id: user.uid }])
    // const { documents: propertiesdocuments, error: propertieserror } =
    //     useCollection('properties', ["taggedUsersList.id", "==", user.uid])
    // const { documents: propertiesdocuments, error: propertieserror } =
    //     useCollection('properties', ["city", "==", "PUNE"])

    // const { documents: propertiesdocuments, error: propertieserror } =
    //     useCollection('properties', ["uid", "==", user.uid])
    // const { documents: billsdocuments, error: billserror } = useCollection('bills')


    console.log('property documents:', propertiesdocuments)

    const [filter, setFilter] = useState('ALL')
    // const navigate = useNavigate();

    useEffect(() => {
        let flag = user && user.roles && user.roles.includes('owner');
        if (!flag) {
            logout()
        }
    }, [user])

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }


    // const bills = billsdocuments ? billsdocuments.filter(document => {
    //     let filteredProperty = false
    //     switch (filter) {
    //         case 'PENDING':
    //             document.taggedUsersList.forEach(u => {
    //                 if (u.id === user.uid && document.status.toUpperCase() === 'PENDING') {
    //                     filteredProperty = true
    //                 }
    //             })
    //             return filteredProperty
    //         case 'PMS':
    //             document.taggedUsersList.forEach(u => {
    //                 if (u.id === user.uid && document.status.toUpperCase() === 'PMS') {
    //                     filteredProperty = true
    //                 }
    //             })
    //             return filteredProperty
    //         case 'BROKERAGE':
    //             document.taggedUsersList.forEach(u => {
    //                 if (u.id === user.uid && document.billType.toUpperCase() === 'BROKERAGE') {
    //                     filteredProperty = true
    //                 }
    //             })
    //             return filteredProperty
    //         case 'MAINTENANCE':
    //             document.taggedUsersList.forEach(u => {
    //                 if (u.id === user.uid && document.billType.toUpperCase() === 'MAINTENANCE') {
    //                     filteredProperty = true
    //                 }
    //             })
    //             return filteredProperty
    //         case 'INACTIVE':
    //             document.taggedUsersList.forEach(u => {
    //                 if (u.id === user.uid && document.status.toUpperCase() === 'INACTIVE') {
    //                     filteredProperty = true
    //                 }
    //             })
    //             return filteredProperty
    //         default:
    //             return true
    //     }
    // }) : null

    // const { documents: billsdocuments, error: billserror } = useCollection('bills', ['propertyid', '==', 'nPqfiXtuJpNGXxd2NoOn'])
    // console.log('billdocument:', billsdocuments)

    const properties = propertiesdocuments ? propertiesdocuments.filter(document => {
        let filteredProperty = false
        switch (filter) {
            case 'ALL':
                document.taggedUsersList.forEach(u => {
                    if (u.id === user.uid) {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            case 'RESIDENTIAL':
                document.taggedUsersList.forEach(u => {
                    if (u.id === user.uid && document.category.toUpperCase() === 'RESIDENTIAL') {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            case 'COMMERCIAL':
                document.taggedUsersList.forEach(u => {
                    if (u.id === user.uid && document.category.toUpperCase() === 'COMMERCIAL') {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            case 'INACTIVE':
                document.taggedUsersList.forEach(u => {
                    if (u.id === user.uid && document.status.toUpperCase() === 'INACTIVE') {
                        filteredProperty = true
                    }
                })
                return filteredProperty
            default:
                return true
        }
    }) : null




    return (

        <div>
            <h2 className="page-title">Owner Dashboard</h2>
            <div className="row no-gutters">
                <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: '10px' }}>
                    <div className="rent-tenant-card">
                        <div>
                            <h6>Rent Balance</h6>
                            <h1 style={{ color: 'red' }}>
                                42000
                                {/* {propertiesdocuments.map(property => (
                                    console.log(property)
                                ))} */}


                            </h1>
                            <h2>Cut-off Date : 12 Jun'23</h2>
                            {/* <h4>Due Date Exceeded : ₹100</h4> */}
                            <button className="mybutton button5"
                                style={{ background: 'var(--blue-color)', color: '#fff', fontWeight: 'bolder' }}>Details</button>
                        </div>
                        {/* <div>
                            <h6>Propdial Commission</h6>
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
            <hr />
            <div>
                <div className='page-title'>
                    <span className="material-symbols-outlined">
                        real_estate_agent
                    </span>
                    <h1>Properties </h1>
                </div>
                {propertieserror && <p className="error">{propertieserror}</p>}
                {/* {billserror && <p className="error">{billserror}</p>} */}
                {propertiesdocuments && <Filters changeFilter={changeFilter} filterList={propertyFilter} filterLength={properties.length} />}
                {/* {billsdocuments && <Filters changeFilter={changeFilter} />} */}
                {properties && <PropertyList properties={properties} />}
                {/* {bills && <BillList bills={bills} />} */}
            </div>
            <div className="row no-gutters">

                <div className="col-lg-6" style={{ padding: '2%' }}>
                    <h5 style={{ paddingLeft: '2%', fontWeight: 'bolder' }}>ANALYTICS</h5><br />

                    <div className="profile-card-div">
                        <div className="address-div" style={{ padding: '8px 10px 4px 10px' }}>
                            <div className="icon">
                                <span className="material-symbols-outlined">
                                    payments
                                </span>
                            </div>

                            <div className="address-text">
                                <div style={{ textAlign: 'left', position: 'relative', top: '-1px', }}>
                                    <h5 style={{ fontWeight: 'bolder' }}>Payments</h5>
                                    <h5 style={{ margin: '0', fontSize: '0.8rem', color: '#888' }}>1,708</h5>
                                </div>
                                <div className="" style={{ position: 'relative', top: '-6px' }}>
                                    <h6 style={{ margin: '0', fontSize: '1.4rem', fontWeight: '600', color: '#444' }}>₹84,538
                                    </h6>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="profile-card-div">
                        <div className="address-div" style={{ padding: '8px 10px 4px 10px' }}>
                            <div className="icon">
                                <span className="material-symbols-outlined">
                                    local_library
                                </span>
                            </div>

                            <div className="address-text">
                                <div style={{ textAlign: 'left', position: 'relative', top: '-1px' }}>
                                    <h5 style={{ fontWeight: 'bolder' }}>Bills</h5>
                                    <h5 style={{ margin: '0', fontSize: '0.8rem', color: '#888' }}>152</h5>
                                </div>
                                <div className="" style={{ position: 'relative', top: '-6px' }}>
                                    <h6 style={{ margin: '0', fontSize: '1.4rem', fontWeight: '600', color: '#444' }}>₹6,907
                                    </h6>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="profile-card-div">
                        <div className="address-div" style={{ padding: '8px 10px 4px 10px' }}>
                            <div className="icon">
                                <span className="material-symbols-outlined">
                                    article
                                </span>
                            </div>

                            <div className="address-text">
                                <div style={{ textAlign: 'left', position: 'relative', top: '-1px' }}>
                                    <h5 style={{ fonWweight: ' bolde' }}>Documents</h5>
                                    <h5 style={{ margin: '0', fontSize: '0.8rem', color: '#888' }}>742</h5>
                                </div>
                                <div className="" style={{ position: 'relative', top: '-6px' }}>
                                    <h6 style={{ margin: '0', fontSize: '1.4rem', fontWeight: '600', color: '#444' }}>742
                                    </h6>
                                </div>
                            </div>
                        </div>

                    </div><br />

                    <div className="dashboardCardBoxoffer">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
                                    aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img style={{ width: '100%', height: '100%' }} src="./assets/img/banner1.png" className="d-block w-100" alt="Ads 1" />
                                </div>
                                <div className="carousel-item">
                                    <img style={{ width: '100%', height: '100%' }} src="./assets/img/banner2.png" className="d-block w-100" alt="Ads 2" />
                                </div>

                            </div>
                        </div>
                    </div><br className="small" />
                </div >
                <div className="col-lg-3 col-6" style={{ padding: '2%' }}>
                    <h5 style={{ paddingLeft: '2%', fontWeight: 'bolder' }}>HOME SERVICES</h5><br />
                    <div className="addon-service">
                        <div className="">
                            <center>
                                <img src="./assets/img/1.png" alt="" />

                                <h5 className="addon-service-h5">Salon at Home</h5>
                            </center>
                        </div>
                    </div><br />
                    <div className="addon-service">
                        <div className="">
                            <center>
                                <img src="./assets/img/2.png" alt="" />

                                <h5 className="addon-service-h5">Diagonstic Test</h5>
                            </center>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-6" style={{ padding: '2%' }}>
                    <h5 style={{ visibility: 'hidden' }}>Home SERVICES</h5><br />

                    <div className="addon-service">
                        <div className="">
                            <center>
                                <img src="./assets/img/3.png" alt="" />

                                <h5 className="addon-service-h5">Packaging</h5>
                            </center>
                        </div>
                    </div><br />
                    <div className="addon-service">
                        <div className="">
                            <center>
                                <img src="./assets/img/4.png" alt="" />

                                <h5 className="addon-service-h5">Paint & Whitewashing</h5>
                            </center>
                        </div>

                    </div>
                </div>


            </div >
            <br className="small" />
        </div >
    )
}
