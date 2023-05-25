import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthcontext';

import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import { useNavigate, Link } from 'react-router-dom';


export default function RegisteredEvent() {

    const { user } = useUserAuth();

    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [showLoading, setShowLoading] = useState(false);
    const [registrationDetails, setRegistrationDetails] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (user.isLoggedIn && userDetails !== null) {
            if (user.userInfo !== null) {
                var para = {};
                para = {
                    UserID: userDetails.id,
                };
                const getAllRegisteredEventForUserID = httpsCallable(functions, "getAllRegisteredEventForUserID");

                getAllRegisteredEventForUserID(para).then(async (result) => {

                    console.log(result.data);
                });
            }
            else {
                navigate("/PhoneSignUp", { state: { url: 'RegisteredEvent' } });
            }
        }
        else {
        }
    }, [user])


    return (
        <div>

        </div>
    )
}
