import React from 'react'
import { Link } from 'react-router-dom'
export default function EventPartcipantCard(props) {
    function callParticipantDetails(player) {
        console.log('player : ', player);
        props.callParticipantDetails(player.ParticipantID, player.ParticipantUserID);
    }
    return (
        <>

            <div className="total-participants-div-letter">
                <h1>{props.pList.firstCharector}</h1>
            </div>
            <br />

            <div className="total-participants-div-content">
                {props.pList && props.pList.playerList.map((player) => {
                    return (<div>
                        {/* <a href="">{player.PlayerName}</a> */}

                        <a onClick={() =>
                            callParticipantDetails(player)}>{player.PlayerName} </a>

                    </div>)


                })}

                {/* <div>
                    <a href="">Aditya Tripathi</a>
                </div>
                <div>
                    <a href="">Arjun Bhagat</a>
                </div>
                <div>
                    <a href="">Aditya Tripathi</a>
                </div>
                <div>
                    <a href="">Arjun Bhagat</a>
                </div> */}

            </div>

        </>
    )
}
