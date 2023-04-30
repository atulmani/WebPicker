import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import UserProfileCard from './UserProfileCard';
import Loading from './Loading';

export default function MemberList(props) {
    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [participantList, setParticipantList] = useState([]);
    const [filterParticipantList, setFilterParticipantList] = useState([]);

    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(false);
    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };

    var options = {
        year: '2-digit',
        // year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    let dob = '';
    useEffect(() => {
        var para1 = {};

        console.log(userDetails.id, '::user::', user);
        var selectUser = '';
        if (user.isLoggedIn) {
            if (user.userInfo !== null) {
                para1 = {
                    userID: userDetails.id,
                };
                setLoading(true);
                let participant = {};
                // console.log(para1);
                let userParticipant = [];
                const ret1 = httpsCallable(functions, "getRegisteredParticant");
                ret1(para1).then(async (result) => {
                    result.data.forEach(async element => {
                        participant = {
                            id: element.id,
                            City: element.City,
                            Country: element.Country,
                            DateOfBirth: element.DateOfBirth,
                            District: element.District,
                            Email: element.Email,
                            Gender: element.Gender,
                            ParticipantID: element.ParticipantID,
                            Phone: element.Phone,
                            Pincode: element.Pincode,
                            State: element.State,
                            UserName: element.UserName,
                            UserID: element.UserID,
                            PlayerID: element.PlayerID,
                        };
                        if (selectUser === '') {
                            selectUser = element.PlayerID;
                        }
                        dob = (element.DateOfBirth) ? new Date(element.DateOfBirth._seconds * 1000) : '';
                        dob = dob === '' ? '' : dob.toLocaleDateString("en-IN", options);
                        userParticipant.push({
                            ...participant,
                            dob: dob,
                            searchKey: element.UserName + element.PlayerID
                        });

                    });
                    // console.log(userParticipant);
                    setParticipantList(userParticipant);
                    setFilterParticipantList(userParticipant);
                    setLoading(false);
                    props.setMemberList(filterParticipantList, selectUser);
                });
            } else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
    }, [])

    function searchEvent(key) {

        if (key !== '') {
            var newArray = participantList.filter(function (el) {
                return el.searchKey.toUpperCase().includes(key.toUpperCase());
            }
            );
            // console.log(newArray);
            setFilterParticipantList(newArray);
        } else {
            setFilterParticipantList(participantList);
        }
    }
    function userDetail(player) {
        console.log('userDetail', player)
        props.setMemberList(filterParticipantList, player);
        // props.setMemberList(userParticipant, selectUser);
    }

    function userEdit() {
        console.log('userEdit')
    }
    return (
        <div className='user-profile-side'>

            <div className='user-profile-side-close-icon'>
                <span className="material-symbols-outlined">
                    close
                </span>
            </div>

            <div className='user-profile-side-search'>
                <input type="text" placeholder='Search by name or Playercode' onChange={(e) => {
                    setSearchKey(e.target.value);
                    searchEvent(e.target.value)

                }} value={searchKey} />
                <span className="material-symbols-outlined">
                    search
                </span>
            </div>
            {loading && <Loading></Loading>}
            <hr style={{ marginBottom: '0' }} />

            <div style={{ padding: '10px' }}>
                {filterParticipantList && filterParticipantList.map((participant) => {
                    return <div className='user-profile-side-card' key={participant.PlayerID}>
                        {/* {console.log(participant.PlayerID)} */}

                        <div className='user-profile-side-card-arrow'>
                            <span className="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                        <h1>{participant.UserName} ({participant.PlayerID})</h1>
                        <div className='user-profile-side-card-details'>
                            <div className={participant.Gender === 'Male' ? 'male' : 'female'}>
                                <span className="material-symbols-outlined">
                                    {participant.Gender === 'Male' ? 'man' : 'woman'}
                                </span>
                                <h2>{participant.Gender === 'Male' ? 'Male' : 'Female'}</h2>
                            </div>
                            <h3><strong>DOB : </strong> {participant.dob} </h3>
                        </div>

                        <div className='hover-details-div'>
                            <div onClick={userEdit}>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                                <h4>EDIT</h4>
                            </div>
                            <div onClick={() => userDetail(participant.PlayerID)}>
                                <span className="material-symbols-outlined">
                                    page_info
                                </span>
                                <h4>DETAILS</h4>
                            </div>
                        </div>
                    </div>
                })}

                <div className='user-profile-side-card'>
                    <div className='user-profile-side-card-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                    <h1>Pravararchith Rudrakshala Matam</h1>
                    <div className='user-profile-side-card-details'>
                        <div className='male'>
                            <span className="material-symbols-outlined">
                                man
                            </span>
                            <h2>Male</h2>
                        </div>
                        <h3><strong>DOB : </strong> 07-Feb-2006 </h3>
                    </div>

                    <div className='hover-details-div'>
                        <div>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                            <h4>EDIT</h4>
                        </div>
                        <div>
                            <span className="material-symbols-outlined">
                                page_info
                            </span>
                            <h4>DETAILS</h4>
                        </div>
                    </div>
                </div>

                <div className='user-profile-side-card'>
                    <div className='user-profile-side-card-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                    <h1>Aditya Tripathi</h1>
                    <div className='user-profile-side-card-details'>
                        <div className='male'>
                            <span className="material-symbols-outlined">
                                man
                            </span>
                            <h2>Male</h2>
                        </div>
                        <h3><strong>DOB : </strong> 12-Jun-2007 </h3>
                    </div>

                    <div className='hover-details-div'>
                        <div>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                            <h4>EDIT</h4>
                        </div>
                        <div>
                            <span className="material-symbols-outlined">
                                page_info
                            </span>
                            <h4>DETAILS</h4>
                        </div>
                    </div>
                </div>

                <div className='user-profile-side-card'>
                    <div className='user-profile-side-card-arrow'>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                    <h1>Mini</h1>
                    <div className='user-profile-side-card-details'>
                        <div className='female'>
                            <span className="material-symbols-outlined">
                                woman
                            </span>
                            <h2>Female</h2>
                        </div>
                        <h3><strong>DOB : </strong> 07-Feb-2006 </h3>
                    </div>

                    <div className='hover-details-div'>
                        <div>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                            <h4>EDIT</h4>
                        </div>
                        <div>
                            <span className="material-symbols-outlined">
                                page_info
                            </span>
                            <h4>DETAILS</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
