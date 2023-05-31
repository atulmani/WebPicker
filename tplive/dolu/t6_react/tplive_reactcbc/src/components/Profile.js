import React, { useState, useEffect } from 'react';
import '../css/Profile.css'
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useUserAuth } from '../context/UserAuthcontext';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../context/useLocalStorage";
import { Link, NavLink, useLocation } from 'react-router-dom'


export default function Profile() {
    const { users, user, logout } = useUserAuth();
    const [userID, setUserID] = useState();
    const [userDetails, setUserDetails] = useLocalStorage('userProfile', null);

    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            if (window.confirm('Are you sure you wish to Logout !!')) {
                await logout();
                navigate("/")
            }

        } catch (err) {

        }
    }
    useEffect(() => {
        // getPlayerList();
        if (user.isLoggedIn && userDetails !== null) {
            if (user.userInfo) {
                console.log('userDetails: ', userDetails);
            }
        }
        else {
            navigate("/PhoneSignUp", { state: { url: 'Profile' } });
        }
    }, [])

    var getInitials = function (string) {
        var names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };
    console.log('userDetails.PlayerID', userDetails);
    return (
        <div className='container-fluid'>
            <br></br>
            <div className='profile-heading-card'>
                <div className='profile-heading-card-img'>
                    <h1>{userDetails && getInitials(userDetails.UserName)}</h1>
                </div>
                <div className='profile-heading-card-details'>
                    <h2>Hi {userDetails && userDetails.UserName}</h2>
                    <h3>{userDetails && userDetails.Email}</h3>
                </div>
                <div className='profile-heading-card-arrow'>
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </div>
            </div>

            <br></br>

            <div className='profile-notification-div' >

                <div className='profile-notification-div-inner' onClick={() => navigate("/UserProfile", {
                    state: {
                        id: 1,
                        propsIsNew: true,
                        propsSelectedPlayer: ''
                    }
                })}>
                    <div>
                        <span style={{ cursor: "pointer" }} className="material-symbols-outlined">
                            add
                        </span>
                    </div>
                    <h1>Add Members</h1>
                </div>
                <div className='profile-notification-div-inner' onClick={() => navigate("/UserProfile", {
                    state: {
                        id: 2,
                        propsIsNew: false,
                        propsSelectedPlayer: userDetails.PlayerID
                    }
                })} >
                    <div>
                        <span style={{ cursor: "pointer" }} className="material-symbols-outlined">
                            person
                        </span>

                    </div>
                    <h1>Members</h1>
                </div>


                <div className='profile-notification-div-inner' onClick={() => handleLogOut()}>
                    <div>
                        <span style={{ cursor: "pointer" }} className="material-symbols-outlined">
                            logout
                        </span>
                    </div>
                    <h1>Logout</h1>
                </div>

            </div>

            <br></br>

            <div className='profile-cards'>
                <h1 className='profile-cards-heading'>MY PARTICIPATION</h1>

                <div className='profile-cards-inner padding-difference'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            local_mall
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>View/Manage Participation</h1>
                        <h2>Track Your Participation  Details</h2>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>

                <div className='profile-cards-inner padding-difference'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>Participation History</h1>
                        <h2>Your Past Participation Details</h2>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>

            </div>

            <br></br>

            <div className='profile-cards'>
                <h1 className='profile-cards-heading'>Match Details</h1>

                <div className='profile-cards-inner'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            redeem
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>Match Summary</h1>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>

                <div className='profile-cards-inner'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            package
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>Head 2 Head</h1>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>


            </div>

            <br></br>

            <div className='profile-cards'>
                <h1 className='profile-cards-heading'>SETTINGS</h1>

                <div className='profile-cards-inner padding-difference'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            translate
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>Language</h1>
                        <h2>English</h2>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>

                <div className='profile-cards-inner padding-difference'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            supervisor_account
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>Profile</h1>
                        <h2>Change / Update Profile</h2>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className='profile-cards-inner padding-difference'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            language
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>Country</h1>
                        <h2>India</h2>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>

                <div className='profile-cards-inner'>
                    <div className='profile-cards-inner-circle'>
                        <span className="material-symbols-outlined">
                            move_to_inbox
                        </span>
                    </div>
                    <div className='profile-cards-inner-content'>
                        <h1>Wallet</h1>
                    </div>
                    <div className='profile-cards-inner-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>

            </div>

        </div >
    )
}
