import React, { useEffect, useState } from 'react'
import "./BookingList.css"
import { useFetchJSON } from "../hooks/useFetchJSON"
import users from "../database/users.json";

export default function UserList() {
    // const [bookings, setBookings] = useState([]);
    // const [url, setURL] = useState('http://localhost:3000/users');
    // const [url, setURL] = useState('database/db.json');
    // const { data: users, isLoading, error } = useFetchJSON(url);

    // useEffect(() => {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(json => setBookings(json));
    // }, [url])

    // useEffect(() => {
    //     fetch('http://localhost:3000/bookings?status=OPEN')
    //         .then(response => response.json())
    //         .then(json => setBookings(json));
    // }, [])


    // return (        
    // <div className='booking-list' >
    //     <h2>User List</h2>
    //     {isLoading && <div>Loading Use List</div>}
    //     {error && <div>{error}</div>}
    //     <ul>
    //         {
    //             users && users.map(user => (
    //                 <li key={user.id}>
    //                     <h3>{user.name}</h3>
    //                     <p>{user.mobile}</p>
    //                     <p>{user.status}</p>
    //                 </li>
    //             ))
    //         }
    //     </ul>
    // </div>

    // )

    return (
        <>
            <div>
                <h1>User List</h1>
                {
                    users && users.map((user) => (
                        <div key={user.id}>
                            <h1>
                                ID: {user.id}<br></br>
                                {user.name}<br></br>
                                {user.status}
                            </h1>
                        </div>
                    ))
                }

            </div>
        </>
    )
}
