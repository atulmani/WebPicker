import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import UserProfileCard from './UserProfileCard';
import Loading from './Loading';
import '../css/Events.css';

export default function PartcipantList() {

    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [participantList, setParticipantList] = useState([]);
    const [filterParticipantList, setFilterParticipantList] = useState([]);

    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // if (user.isLoggedIn) {
        //     if (user.userInfo !== null) {
        //         var para = {};
        //         para = {
        //             UserID: userDetails.id,
        //         };
        //         const getAllRegisteredEventForUserID = httpsCallable(functions, "getAllRegisteredEventForUserID");

        //         getAllRegisteredEventForUserID(para).then(async (result) => {

        //             console.log(result.data);
        //         });
        //     }
        //     else {
        //         navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
        //     }
        // }
        // else {
        // }
        var para1 = {};

        console.log(userDetails.id, '::user::', user);
        if (user.isLoggedIn && userDetails !== null) {
            if (user.userInfo !== null) {
                para1 = {
                    userID: userDetails.id,
                };
                setLoading(true);
                let participant = {};
                console.log(para1);
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
                        userParticipant.push(participant);
                    });
                    console.log(userParticipant);
                    setParticipantList(userParticipant);
                    setFilterParticipantList(userParticipant);
                    setLoading(false);
                });

            } else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
    }, [user, userDetails])

    function searchEvent(key) {

        if (key !== '') {
            var newArray = participantList.filter(function (el) {
                return el.UserName.toUpperCase().includes(key.toUpperCase());
            }
            );
            // console.log(newArray);
            setFilterParticipantList(newArray);
        } else {
            setFilterParticipantList(participantList);
        }
    }
    // function showRegisteredEvent(obj) {
    //     console.log('in showRegisteredEvent', obj);
    //     navigate('/UsersEvents', { state: { playerDetails: obj } });
    // }
    return (
        <div className="row no-gutters">
            {/* {loading && <lottie-player   ie-player src="https://assets5.lottiefiles.com/packages/lf20_9yosyj7r.json" background="transparent" speed="1" loop autoplay></lottie-player>} */}

            {loading && <Loading ></Loading>}

            {participantList.length > 5 && <div >
                <br className='small'></br>
                <br className='small'></br>
                <div className='event-search-div'>
                    <div>
                        <input type="text" id="userName" placeholder='participant to search' onChange={(e) => {
                            setSearchKey(e.target.value);
                            searchEvent(e.target.value)

                        }} value={searchKey} />
                        {/* <button className="mybutton button5" onClick={() => {
                            searchEvent();

                        }}>
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </button> */}
                    </div>
                </div>

            </div>
            }

            {filterParticipantList && filterParticipantList.map((participant) => {
                return <> <UserProfileCard key={participant.id} participantDetails={participant} calledFrom="ParticipantList" ></UserProfileCard>

                </>
            })}
        </div >
    )
}
