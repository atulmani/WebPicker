import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
// import { useUserAuth } from '../context/UserAuthcontext';
// import { auth } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid)
            console.log(children);
            return children;
        } else {
            return <Navigate to={{
                pathname: "/PhoneSignUp",
                state: { id: 1, url: children[1].type.name }
            }}></Navigate>
            // User is signed out
            // ...
        }
    });

    // console.log(users);
    // if (!users) {
    //     return <Navigate to={{
    //         pathname: "/PhoneSignUp",
    //         state: { id: 1, url: children[1].type.name }
    //     }}></Navigate>
    // }
    // return children;
}


export default ProtectedRoute;