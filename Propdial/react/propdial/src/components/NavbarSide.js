import React from 'react';
import '../css/NavbarSide.css';
import { useNavigate } from 'react-router-dom'
import { useUserAuth, useGetUserDetails } from '../context/UserAuthcontext';

export default function NavbarSide() {
    const { logout } = useUserAuth();
    const navigate = useNavigate();


    function clickLogout() {
        logout();
        // console.log('clickLogout user:', users);
        navigate('/Login');
    }
    return (
        <>

            <div className="side-navbar mobile-side-navbar-style" style={{ height: 'calc(100% - 40px)', background: '#fff' }}>

                <div className='closeBtn'>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>

                <ul>

                    <li style={{ background: '#EB542E' }} className="side-navbar-profile-div active">

                        <a href="/login/profile.html">


                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }} className="">

                                <div style={{
                                    position: 'relative',
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                }}>
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            left: '7px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bolder',
                                            color: 'rgb(235, 84, 46)',
                                        }}>
                                        AT
                                    </span>
                                </div>

                                <div style={{ padding: '5px 0 0 10px', width: '70%' }} className="">
                                    <div style={{ display: 'flex', flexDirection: 'column' }} className="">
                                        <h6 style={{
                                            fontSize: '0.9rem',
                                            marginTop: '4px',
                                            marginBottom: '2px'
                                        }}>Atul Tripathi
                                        </h6>
                                        <h6 style={{ fontSize: '0.6rem' }}>Edit Profile</h6>
                                    </div>
                                </div>
                                <div style={{ paddingTop: '10px', width: '10%', overflow: 'hidden' }} className="">
                                    <span className="material-symbols-outlined">
                                        navigate_next
                                    </span>
                                </div>
                            </div>



                        </a>
                    </li><br />
                    <li>
                        <b></b>
                        <b></b>
                        <a href="/admin/dashboard.html">
                            <span className="material-symbols-outlined">
                                home
                            </span>
                            <small>Dashboard</small>
                        </a>
                    </li>

                    <li>
                        <b></b>
                        <b></b>
                        <a href="/admin/propertyList.html">
                            <span className="material-symbols-outlined">
                                description
                            </span>
                            <small>Property List</small>

                        </a>
                    </li>

                    <li>
                        <b></b>
                        <b></b>
                        <a href="createProperty.html">
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            <small>Add Property</small>
                        </a>
                    </li>

                    <li>
                        <a href="/">
                            <b></b>
                            <b></b>
                            <span className="material-symbols-outlined">
                                handyman
                            </span>
                            <small>Enquiries</small>
                        </a>
                    </li>

                    <li>
                        <a href="/">
                            <b></b>
                            <b></b>
                            <span className="material-symbols-outlined">
                                volunteer_activism
                            </span>
                            <small>Refer & Earn</small>
                        </a>
                    </li>

                    <li>
                        <div onClick={clickLogout}>
                            <b></b>
                            <b></b>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <small>Logout</small>
                        </div>
                    </li>
                </ul>
            </div>


        </>
    )
}
