import React, { useEffect, useState } from 'react'
import "./BookingList.css"
import { useFetchJSON } from "../hooks/useFetchJSON"

export default function BookingList() {
    // const [bookings, setBookings] = useState([]);

    const [url, setURL] = useState('http://localhost:3000/users');
    const { data: bookings, isLoading, error } = useFetchJSON(url);

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


    return (
        <div className='booking-list' >
            <h2>Booking List</h2>
            {isLoading && <div>Loading Bookings</div>}
            {error && <div>{error}</div>}
            <ul>
                {
                    bookings && bookings.map(booking => (
                        <li key={booking.id}>
                            <h3>{booking.title}</h3>
                            <p>{booking.mobile}</p>
                            <p>{booking.name}</p>
                            <p>{booking.date}</p>
                            <p>{booking.status}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
