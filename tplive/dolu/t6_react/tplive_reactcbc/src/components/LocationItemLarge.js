import "../css/LocationItem.css"
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { NavLink, useHistory, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


export default function LocationItemLarge(props) {
    // console.log(props)
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
        // <div className="col-lg-2 col-md-3 col-sm-6" onClick={this.locationSelect} style={{ padding: '10px' }}>
        <div className="col-lg-2 col-md-3 col-sm-6" style={{ padding: '10px' }}>

            <Link to="/" onClick={() => {
                // console.log('in set localStorage from LocationItemLarge ')
                window.localStorage['userLocation'] = JSON.stringify(location.City);
                props.setCity(location.City);
            }} className="genre-locoation-card">
                <div className="">
                    <img src={location.LocationImage ? "img/" + location.LocationImage : "img/puneicon_blank.png"} alt="" />
                </div>
                <h2>{props.City}</h2>
                <h3><span id="allCnt1">{location.EventCount}</span> Events</h3>
            </Link>
        </div >

    )
}

// locationSelect = () => {
//     // console.log('locationSelect');
//     // console.log(this.state.City, this.props.City);
//     localStorage['userLocation'] = JSON.stringify(this.props.City);
//     // const navigate = useNavigate();
//     //  navigate.push("/");

//     // let history = useHistory();
//     // history.push('/');
//     // let navigate = useNavigate();
//     // this.props.history.push("/");
//     //window.location.href = "/";

// }

// }
