import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/HPLastSection.css'
export default class HPLastSection extends Component {
    render() {
        return (
            <div className="last-div">
                <img src="/img/TPLiVE_text.png" width="140px" alt="" />
                <Link to="/TermsAndConditions">Terms & Conditions </Link>
                <Link to="/PrivacyPolicy"> Privacy Policy</Link>
                <Link to="/ContactUs"> Contact Us</Link>

                <small>Version 2.0</small>
                <br className="small" /><br className="small" />
            </div>

        )
    }
}
