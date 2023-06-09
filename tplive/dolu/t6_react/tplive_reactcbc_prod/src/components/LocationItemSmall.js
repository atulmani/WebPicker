import "../css/LocationItem.css"

import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

export default function LocationItemSmall(props) {
    const [location, setLocation] = useState({
        City: props.City,
        EventCount: props.EventCount,
        LocationImage: props.LocationImage ? props.LocationImage : 'puneicon_blank.png'
    });

    useEffect(() => {
        // console.log('LocationItemLarge', props);
        setLocation({
            City: props.City,
            EventCount: props.EventCount,
            LocationImage: props.LocationImage
        })
    }, []);



    return (
        <div className="col-4" style={{ padding: '10px' }}>
            <Link to="/" onClick={() => {
                window.localStorage['userLocation'] = location.City;
                props.setCity(location.City);
            }} className="genre-locoation-card">
                <div className="">
                    <img src={location.LocationImage ? "img/" + location.LocationImage : "img/puneicon_blank.png"} alt="" />
                </div>
                <h2>{props.City}</h2>
                <h3><span id="allCnt">{location.EventCount}</span> Events</h3>
            </Link>
        </div>
    )
}
