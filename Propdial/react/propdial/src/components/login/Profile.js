// import React from 'react';
import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../../css/login/Profile.css';
import { useUserAuth, useGetUserDetails } from '../../context/UserAuthcontext';

export default function Profile() {
    // const { user } = useUserAuth();

    const { logout, users, user } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(users);
        // console.log(users.current);
        // if (!users.current) {
        //     navigate('/Login');
        // }

        if (user.isLoggedIn) {
            if (user.userInfo === null) {

                navigate("/Login");
            }
        }


        // setURL(props.url ? "/" + props.url : "/")
    }, [user]);

    function clickLogout() {
        logout();
        // console.log('clickLogout user:', users);
        navigate('/Login');
    }



    return (
        <>

            <div className="container-fluid">

                <div className="profile-card-div">
                    <div className="content">
                        <div className="user-name">
                            <div className="user-logo-parent-div">
                                <div className="user-logo">
                                    <h4>AT</h4>
                                </div>
                            </div>

                            <div className="details">
                                <h5>Atul Tripathi</h5>
                                <p>atulmani@gmail.com</p>
                                <p style={{ marginTop: '2px' }}>98227 52885</p>
                            </div>

                            <div className="edit">
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="edit-profile-div">
                        <small>See Your Dashboard and Other Details</small>
                        <div className="">
                            <div className="">

                            </div>
                            <a href="/"><button type="button" className="mybutton button5"
                                style={{
                                    height: '32px',
                                    fontSize: '0.7rem',
                                    width: '100px'
                                }}>Dashboard</button></a>
                        </div>
                    </div>
                </div>



                <div className="row no-gutters">
                    <div className="col-lg-6">
                        <div className='padding-div'>
                            <div className="profile-card-div">
                                <div className="address-div">
                                    <div className="icon">
                                        <span className="material-symbols-outlined">
                                            home
                                        </span>
                                    </div>

                                    <div className="address-text">
                                        <h5>A 504, HIGH MONT</h5>
                                        <div className="">
                                            <span className="material-symbols-outlined">
                                                chevron_right
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="add-address">
                                    <small>
                                        <span className="material-symbols-outlined">
                                            add
                                        </span>
                                    </small>
                                    <small>Add an property</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='padding-div'>
                            <div className="profile-card-div large">
                                <div className="address-div">
                                    <div className="icon">
                                        <span className="material-symbols-outlined">
                                            apartment
                                        </span>
                                    </div>

                                    <div className="address-text">
                                        <h5>Hinjewadi Housing Agents</h5>
                                        <div className="">
                                            <span className="material-symbols-outlined">
                                                chevron_right
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="add-address">
                                    <small>
                                        <span className="material-symbols-outlined">
                                            pin_drop
                                        </span>
                                    </small>
                                    <small>Properties Near Me</small>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="vehicle-div">

                    <h1 className="all-heading">My Properties</h1>

                    <div className="">
                        <div className="row">
                            <div className="col-md-12 col-md-offset-1">
                                <div id="vehicle-list" className="owl-carousel owl-theme">
                                    <div className="item" style={{ margin: '10px 0' }}>
                                        <div className="vehicle-card">
                                            <div className="">
                                                <span className="material-symbols-outlined">
                                                    house
                                                </span>

                                                <h5>C-202 Sri Adinath</h5>
                                                <small>Sector 3 Kharghar Navi Mumbai</small>
                                            </div>
                                            <div className="newWave wave1 battery7"></div>
                                            <div className="newWave wave2 battery7"></div>
                                            <div className="newWave wave3 battery7"></div>
                                            <div className="battery">
                                                <span>10%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item" style={{ margin: '10px 0' }}>
                                        <div className="vehicle-card">
                                            <div className="">
                                                <span className="material-symbols-outlined">
                                                    storefront
                                                </span>

                                                <h5>S-21 Shobha Shopping Complex</h5>
                                                <small>Sector 35 Vashi Navi Mumbai</small>
                                            </div>
                                            <div className="newWave wave1 battery7"></div>
                                            <div className="newWave wave2 battery7"></div>
                                            <div className="newWave wave3 battery7"></div>
                                            <div className="battery">
                                                <span>10%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item" style={{ margin: '10px 0' }}>
                                        <div className="vehicle-card">
                                            <div className="">
                                                <span className="material-symbols-outlined">
                                                    apartment
                                                </span>

                                                <h5>Inorbit Mall</h5>
                                                <small>Palm Beach Road, Belapur CBD</small>
                                            </div>
                                            <div className="newWave wave1 battery7"></div>
                                            <div className="newWave wave2 battery7"></div>
                                            <div className="newWave wave3 battery7"></div>
                                            <div className="battery">
                                                <span>10%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item" style={{ margin: '10px 0' }}>
                                        <div className="vehicle-card">
                                            <div className="add-vehicle-card">
                                                <span className="material-symbols-outlined">
                                                    add
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <br />
                    </div>

                    <div className="row no-gutters">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className='padding-div'>
                                <div className="profile-card-div">
                                    <div className="address-div">
                                        <div className="icon" style={{ background: 'rgba(84,204,203,)' }}>
                                            <span className="material-symbols-outlined">
                                                security
                                            </span>
                                        </div>

                                        <div className="address-text">
                                            <h5>Security alert list</h5>
                                            <div className="">
                                                <span className="material-symbols-outlined">
                                                    chevron_right
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style={{
                                        margin: '0',
                                        border: 'none',
                                        borderBottom: '1px solid #ddd'
                                    }} />

                                    <div className="address-div">
                                        <div className="icon" style={{ background: 'rgba(84,204,203,)' }}>
                                            <span className="material-symbols-outlined">
                                                sms
                                            </span>
                                        </div>

                                        <div className="address-text">
                                            <h5>Support & Feedback</h5>
                                            <div className="">
                                                <span className="material-symbols-outlined">
                                                    chevron_right
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className='padding-div'>
                                <div className="profile-card-div">
                                    <div className="address-div">
                                        <div className="icon" style={{ background: 'rgba(84,204,203,)' }}>
                                            <span className="material-symbols-outlined">
                                                lock_open
                                            </span>
                                        </div>

                                        <div className="address-text">
                                            <h5>Change Password</h5>
                                            <div className="">
                                                <span className="material-symbols-outlined">
                                                    chevron_right
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style={{
                                        margin: '0',
                                        border: 'none',
                                        borderBottom: '1px solid #ddd'
                                    }} />

                                    <div className="address-div">
                                        <div className="icon" style={{ background: 'rgba(84,204,203,)' }}>
                                            <span className="material-symbols-outlined">
                                                logout
                                            </span>
                                        </div>

                                        <div className="address-text" onClick={clickLogout}>
                                            <h5>Logout</h5>
                                            <div className="">
                                                <span style={{ opacity: '0' }} className="material-symbols-outlined">
                                                    chevron_right
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

            <div className="last-div">
                <img src="../img/logo_manu_transparent.png" width="180px" alt="" />
                <a href="/">Terms & Conditions | Privacy Policy</a>
                <small>Version 2.54.0</small>
            </div><br className="small" /><br className="small" />

        </>
    )
}
