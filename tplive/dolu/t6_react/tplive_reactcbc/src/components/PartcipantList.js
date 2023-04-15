import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';

export default function PartcipantList() {

    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [participantList, setParticipantList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
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
        if (user.isLoggedIn) {
            if (user.userInfo !== null) {
                para1 = {
                    userID: userDetails.id,
                };
                let participant = {};
                let userParticipant = [];
                setShowLoading(true);
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
                    setParticipantList(userParticipant);
                    setShowLoading(false);
                });

            } else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
    }, [])

    function showRegisteredEvent() {
        console.log('in showRegisteredEvent');
    }
    return (
        <div className="row no-gutters">

            {participantList && participantList.map((participant) => {
                return <div key={participant.id} className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0px' }} >
                    <div style={{ padding: '10px' }}>
                        <div className="event-registration-participant-card"
                            onClick={showRegisteredEvent}>
                            <div className="participant-name-div">

                                <div>
                                    <h1>{participant.UserName}</h1>
                                </div>
                            </div>
                            <div className="participant-card-arrow">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            })}
        </div>
    )
}
