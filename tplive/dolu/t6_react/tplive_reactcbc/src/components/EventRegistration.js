import React from 'react'
import { useUserAuth } from '../context/UserAuthcontext'

export default function EventRegistration() {
    const { users, logout } = useUserAuth();
    const handleLogOut = async () => {
        try {
            await logout();
        } catch (err) {

        }
    }
    return (
        <div>
            {console.log(users)}
            in Event Registration : {(users.current.phoneNumber)}
            {console.log(users.current.phoneNumber)}
            <br></br>
            {users && users.email}
            {/* <button type="button" className="mybutton" name="button" onClick={handleLogOut}>Log Out</button> */}
        </div>
    )
}
