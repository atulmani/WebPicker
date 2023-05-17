import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import UserProfileCard from './UserProfileCard';
import Loading from './Loading';

export default function MemberList(props) {
    // console.log('in MemberList props : ', props);
    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [filterParticipantList, setFilterParticipantList] = useState([]);
    const [selectUser, setSelectUser] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [allMemberList, setAllMemberList] = useState([]);
    const [participantList, setParticipantList] = useState([])

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
    // useEffect(() => {
    //     // console.log(allMemberList[0]);
    //     if (selectUser === '' && allMemberList.length > 0) {
    //         // setSelectUser(allMemberList[0].PlayerID);
    //         // console.log('SelectUser', selectUser);
    //         getUserDetail(allMemberList[0].PlayerID)
    //     }
    // }, [selectUser])

    useEffect(() => {
        // console.log('user', user);
        async function getPlayerList() {
            var para1 = {};
            var setUser = '';
            if (user.isLoggedIn) {
                if (user.userInfo !== null) {
                    para1 = {
                        userID: userDetails.id,
                    };
                    // console.log(para1);
                    setLoading(true);
                    let participant = {};
                    let userParticipant = [];
                    const ret1 = httpsCallable(functions, "getRegisteredParticant");
                    ret1(para1).then(async (result) => {
                        // console.log('result : ', result);
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
                            if (setUser === '') {
                                setUser = element.PlayerID;

                            }

                            dob = (element.DateOfBirth) ? new Date(element.DateOfBirth._seconds * 1000) : new Date();
                            dob = dob === '' ? '' : dob.toLocaleDateString("en-IN", options);
                            userParticipant.push({
                                ...participant,
                                dob: dob,
                                searchKey: element.UserName + element.PlayerID
                            });

                        });

                        // console.log(userParticipant);
                        setAllMemberList(userParticipant);
                        setSelectUser(setUser);
                        setFilterParticipantList(userParticipant);
                        //setValuesFromChild(showSideflag, memberlist, showAddflag, playercode)
                        props.setValuesFromChild(!props.showSideBar, filterParticipantList, props.addNewFlag, setUser)


                        // props.setMemberList(userParticipant, setUser);
                        // props.openSideBar(!props.showSideBar);
                        setLoading(false);
                    });
                } else {
                    navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
                }
            }
        }
        getPlayerList();

    }, [])


    function searchEvent(key) {

        if (key !== '') {
            var newArray = allMemberList.filter(function (el) {
                return el.searchKey.toUpperCase().includes(key.toUpperCase());
            }
            );
            // console.log(newArray);
            setFilterParticipantList(newArray);
        } else {
            setFilterParticipantList(allMemberList);
        }
    }
    function getUserDetail(player) {
        // console.log('userDetail', player)
        setSelectUser(player);
        //setValuesFromChild(showSideflag, memberlist, showAddflag, playercode)
        props.setValuesFromChild(!props.showSideBar, filterParticipantList, false, player)
        // props.setMemberList(filterParticipantList, player);
        // props.openSideBar(!props.showSideBar);

        // props.addNewMember(false, player);
        // props.setMemberList(userParticipant, selectUser);
    }

    function userEdit(playercode) {
        // console.log('userEdit', playercode)
        setSelectUser(playercode);
        //setValuesFromChild(showSideflag, memberlist, showAddflag, playercode)
        props.setValuesFromChild(props.showSideBar, filterParticipantList, true, playercode)

        // props.addNewMember(true, playercode);

    }
    // console.log('filterParticipantList : ', filterParticipantList)
    return (
        <div className={props.showSideBar ? 'user-profile-side' : 'user-profile-side close'}>

            <div className='user-profile-side-close-icon' onClick={(e) => {
                props.openSideBar(!props.showSideBar);
            }
            } >
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

                <div className={props.addNewFlag ? 'user-profile-side-card add-profile active' : 'user-profile-side-card add-profile'} onClick={() => {
                    setSelectUser('');
                    props.addNewMember(true, '');
                }
                }>
                    <span className="material-symbols-outlined">
                        add
                    </span>
                </div>

                {filterParticipantList && filterParticipantList.map((participant) => {
                    return <div className={selectUser === participant.PlayerID && !props.addNewFlag ? 'user-profile-side-card active' : 'user-profile-side-card'} key={participant.PlayerID}>
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
                            <div onClick={() => {
                                // console.log('participant.PlayerID : ', participant.PlayerID)
                                userEdit(participant.PlayerID)
                            }}>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                                <h4>EDIT</h4>
                            </div>
                            <div onClick={() => {
                                // console.log('participant.PlayerID : ', participant.PlayerID)
                                getUserDetail(participant.PlayerID)
                            }}>


                                <span className="material-symbols-outlined">
                                    page_info
                                </span>
                                <h4>DETAILS</h4>
                            </div>
                        </div>
                    </div>
                })}

            </div>

        </div >
    )
}
