import { createContext, useContext, useEffect, useState, useRef } from "react";
import { auth } from '../firebase'
import { useUserAuth } from '../context/UserAuthcontext';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";

const userProfileDetailsContext = createContext();

export function UserProfilecontext({ children }) {
    const userDetails = useRef(null);
    let { users } = useUserAuth();

    useEffect(() => {
        // console.log('from UserProfilecontext', users);
        if (users) {
            var para1 = {};

            para1 = {
                userID: users.uid
            };

            const ret1 = httpsCallable(functions, "getProfileDetails");

            ret1(para1).then(async (result) => {
                userDetails.userProfile = {
                    id: result.data.pID,
                    PlayerID: result.data.PlayerID,
                    Address: result.data.Address,
                    AlternatePhone: result.data.AlternatePhone,
                    City: result.data.City,
                    Country: result.data.Country,
                    DateOfBirth: result.data.DateOfBirth,
                    Email: result.data.Email,
                    Gender: result.data.Gender,
                    Phone: result.data.Phone,
                    Pincode: result.data.Pincode,
                    ProfilePicURL: result.data.ProfilePicURL,
                    State: result.data.State,
                    UserName: result.data.UserName,
                    UserRole: result.data.UserRole,
                }

            });
        }
    }, []);
    return <userProfileDetailsContext.Provider value={{ userDetails }}>{children}</userProfileDetailsContext.Provider>
}

export function useUserProfile() {
    return useContext(userProfileDetailsContext);
}