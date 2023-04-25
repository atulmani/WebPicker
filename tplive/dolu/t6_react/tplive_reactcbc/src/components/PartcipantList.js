import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import UserProfileCard from './UserProfileCard';
import Loading from './Loading';
export default function PartcipantList() {

    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [participantList, setParticipantList] = useState([]);
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
        if (user.isLoggedIn) {
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
                    setLoading(false);
                });

            } else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
    }, [])

    // function showRegisteredEvent(obj) {
    //     console.log('in showRegisteredEvent', obj);
    //     navigate('/UsersEvents', { state: { playerDetails: obj } });
    // }
    return (
        <div className="row no-gutters">
            {/* {loading && <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_9yosyj7r.json" background="transparent" speed="1" loop autoplay></lottie-player>} */}

            {loading && <Loading ></Loading>}

            {participantList && participantList.map((participant) => {
                return <> <UserProfileCard key={participant.id} participantDetails={participant} calledFrom="ParticipantList" ></UserProfileCard>

                </>
            })}
        </div >
    )
}
