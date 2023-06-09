import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function UserProfileCard(props) {
    const [dob, setDob] = useState();
    let navigate = useNavigate();
    const [year, setYear] = useState(0);
    useEffect(() => {
        // console.log('in useEffect');
        // console.log(props);
        var dobtemp = new Date(props.participantDetails.DateOfBirth._seconds * 1000);
        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        dobtemp = dobtemp.toLocaleDateString("en-US", options);
        setDob(dobtemp)
        var ageDifMs = Date.now() - new Date(dobtemp);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        setYear(Math.abs(ageDate.getUTCFullYear() - 1970));

    }, []);
    function moveToRegCategory(e) {
        e.preventDefault();
        // console.log('moveToRegCategory');
        navigate("/RegistrationCategory", { state: { id: 1, participantDetails: props.participantDetails } });
        //redirect to regCategory.html?id=" + playerid
    }

    function showRegisteredEvent() {
        // console.log('in showRegisteredEvent', obj);
        navigate('/UsersEvents', { state: { playerDetails: props.participantDetails } });
    }
    return (
        <div className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0px' }} >
            <div style={{ padding: '10px' }}>
                <div className="event-registration-participant-card"
                    onClick={props.calledFrom === 'ParticipantList' ? showRegisteredEvent : moveToRegCategory}>
                    <div className="participant-name-div">
                        <div>
                            {

                                props.participantDetails.Gender === 'Male' &&
                                <span className="material-symbols-outlined male">
                                    man
                                </span>}
                            {
                                props.participantDetails.Gender === 'Female' &&
                                <span className="material-symbols-outlined female">
                                    woman
                                </span>}
                        </div>
                        <div>
                            <h1>{props.participantDetails.UserName}</h1>
                            <h2>{dob} - {year} Years</h2>
                        </div>
                    </div>
                    <div className="participant-card-arrow">
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
