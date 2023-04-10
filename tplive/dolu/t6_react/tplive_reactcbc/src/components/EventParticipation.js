import React from 'react'
import '../css/EventParticipation.css'
export default function EventParticipation(props) {


    return (
        <>
            <br />
            <br></br>

            <select name="" className="total-participants-select" id="">
                <option value="">All</option>
                {props.eventDetails && props.eventDetails.CategoryDetails && props.eventDetails.CategoryDetails.map((cat) => {
                    <option value="" key={cat.CategoryName}>cat.CategoryName</option>

                })}

            </select>
            <br /><br />
            <div className="total-participants-outter-div">
                <div className="total-participants-div-letter">
                    <h1>A</h1>
                </div>
                <br />
                <div className="total-participants-div-content">
                    <div>
                        <a href="">Aditya Tripathi</a>
                    </div>
                    <div>
                        <a href="">Arjun Bhagat</a>
                    </div>
                </div>

                <div className="total-participants-div-content">
                    <div>
                        <a href="">Arunesh Hari</a>
                    </div>
                    <div>

                    </div>
                </div>
                <br />
                <div className="total-participants-div-letter">
                    <h1>P</h1>
                </div>
                <br />
                <div className="total-participants-div-content">
                    <div>
                        <a href="">Pravararchith Rudrakshala Matam</a>
                    </div>
                    <div>
                        <a href="">Pranav Krishnamurti</a>
                    </div>
                </div>

                <div className="total-participants-div-content">
                    <div>
                        <a href="">Vedic Nagaphane</a>
                    </div>
                    <div>
                        <a href="">Prateek Koundilya</a>
                    </div>
                </div>

                <div className="total-participants-div-content">
                    <div>
                        <a href="">Shreyansh Jaiswal</a>
                    </div>
                    <div>
                        <a href="">Prabhu Kannan</a>
                    </div>
                </div>

                <div className="total-participants-div-content">
                    <div>
                        <a href="">Kavin Thangam</a>
                    </div>
                    <div>
                        <a href="">Manik Shrama</a>
                    </div>
                </div>
                <br />

                <div className="total-participants-div-letter">
                    <h1>P</h1>
                </div>
                <br />
                <div className="total-participants-div-content">
                    <div>
                        <a href="">Pravararchith Rudrakshala Matam</a>
                    </div>
                    <div>
                        <a href="">Pranav Krishnamurti</a>
                    </div>
                </div>

                <div className="total-participants-div-content">
                    <div>
                        <a href="">Vedic Nagaphane</a>
                    </div>
                    <div>
                        <a href="">Prateek Koundilya</a>
                    </div>
                </div>

                <div className="total-participants-div-content">
                    <div>
                        <a href="">Shreyansh Jaiswal</a>
                    </div>
                    <div>
                        <a href="">Prabhu Kannan</a>
                    </div>
                </div>

                <div className="total-participants-div-content">
                    <div>
                        <a href="">Kavin Thangam</a>
                    </div>
                    <div>
                        <a href="">Manik Shrama</a>
                    </div>
                </div>
                <br />
            </div>

        </>
    )
}
