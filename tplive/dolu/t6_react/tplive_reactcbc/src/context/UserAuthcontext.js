import { createContext, useContext, useEffect, useState, useRef } from "react";
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
    signInWithPopup
} from "firebase/auth";
import { auth, functions } from '../firebase'
import { httpsCallable } from "firebase/functions";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const users = useRef(null);
    const userDetails = useRef(null);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }
    function logout() {
        return signOut(auth)
    }
    function setUpRecapcha(number) {
        const recaptchaVerifier = new RecaptchaVerifier('recapcha-container', {}, auth);
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    }
    useEffect(() => {
        const unsubscrib = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            users.current = currentUser
            console.log('users : ', users);
        });
        return () => {
            unsubscrib();
        }
    }, []);
    return <userAuthContext.Provider value={{ login, signUp, logout, googleSignIn, setUpRecapcha, user, users, userDetails }}>{children}</userAuthContext.Provider>
}
export function useUserAuth() {
    return useContext(userAuthContext);
}

