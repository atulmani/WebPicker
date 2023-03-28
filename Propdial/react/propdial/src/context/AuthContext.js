import React, { useContext, useState, useEffect } from 'react'
import {
    getAuth,
    onAuthStateChanged,
    signInWithPhoneNumber,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    signOut,
    RecaptchaVerifier,
    GoogleAuthProvider,
    signInWithPopup,
    updateEmail,
    updatePassword,
    updateProfile
} from "firebase/auth";

import { auth } from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        console.log('Email', email);
        console.log('Password', password);

        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        console.log('Email', email);
        console.log('Password', password);

        return signInWithEmailAndPassword(auth, email, password);
    }

    function replaceEmail(email) {
        return updateEmail(auth.currentUser, email);
    }

    function replacePassword(password) {
        return updatePassword(auth.currentUser, password);
    }

    function setProfile(newDisplayName, newPhotoURL) {
        return updateProfile(auth.currentUser, {
            displayName: newDisplayName, photoURL: newPhotoURL
        })
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = { currentUser, signup, login, replaceEmail, replacePassword, setProfile, logout }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
