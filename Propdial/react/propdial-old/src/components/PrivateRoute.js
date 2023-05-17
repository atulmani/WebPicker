// import React from 'react'
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'

// export default function PrivateRoute({ component: Component, ...rest }) {
//     const { currentUser } = useAuth();

//     return (
//         <Route>
//             {rest}
//             render = {props => {
//                 return currentUser ? <Component {...props} /> : <Navigate to='/login'></Navigate>
//             }}
//         </Route>

//     )
// }


import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
// import { useUserAuth } from '../context/UserAuthcontext';
// import { auth } from '../firebase';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute(props) {
    const { Component } = props;
    const navigate = useNavigate();
    // useEffect(() => {
    //     const { currentUser } = useAuth();
    //     if (!currentUser) {
    //         navigate('/login');
    //         // <Navigate to='/login'></Navigate>
    //     }
    // });
    useEffect(() => {
        let login = localStorage.getItem('login');
        if (!login) {
            navigate('/login');
        }
    });

    return (
        <div>
            <Component />
        </div>
    )


}


// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ component: Component, authed, ...rest }) => (
//     <Route
//         {...rest}
//         element={authed ? <Component /> : <Navigate to="/login" replace />}
//     />
// );

//export default PrivateRoute;

