import React, { Component } from 'react'
import '../css/HPLastSection.css'
export default class HPLastSection extends Component {
    render() {
        return (
            <div className="last-div">
                <img src="/img/TPLiVE_text.png" width="140px" alt="" />
                <a href="https://tournamentplanner.in/screens/TPLive_Terms.aspx">Terms & Conditions </a>
                <a href="https://tournamentplanner.in/screens/TPLive_Terms.aspx"> Privacy Policy</a>
                <small>Version 2.0</small>
                <br className="small" /><br className="small" />
            </div>

        )
    }
}
