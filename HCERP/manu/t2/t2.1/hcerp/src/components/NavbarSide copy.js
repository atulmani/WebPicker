import React, { useEffect, useRef, useState } from 'react';
import '../css/NavbarSide.css';

import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavbarSide(props) {

    // const { state } = useLocation();
    // const { show } = state;
    // let show = false;
    // const showSideNavbar = useRef(props.show);
    // const [showSideNavbar, setShowSideNavbar] = useState(props.show);

    function sideNavbarActive(){
        console('clicked');
    }

    // function closeSideNavbar(){
    //     setShowSideNavbar(false);
    //     console.log('showSideNavbar : ',showSideNavbar);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     // if(!showSideNavbar)
    //     showSideNavbar.current =  props.show;
    //     console.log('showSideNavbar : ',showSideNavbar);
    //   });

    return (
        <div>


             <div className={"side-navbar mobile-side-navbar" }>

                {/* <div className="closeBtn" onClick={closeSideNavbar}>
                    <span className="material-symbols-outlined" id="closeBtn">
                        close
                    </span>
                </div> */}

                <ul>

                    <li style={{ background: '#DBE8E1', padding: '0 5px' }}>

                        <a href="profile.html" className="parent-name">


                            <div className="side-navbar-profile-div active">
                                <div className="side-navbar-profile-div-border-left"></div>

                                <div className="side-navbar-profile-div-circle">
                                    <div>
                                        <span>KS</span>
                                    </div>
                                </div>

                                <div className="side-navbar-profile-div-name">
                                    <div className="">
                                        <h6>Khushi Soni
                                        </h6>
                                        <h5>Student</h5>
                                    </div>
                                </div>
                                <div className="side-navbar-profile-div-arrow">
                                    <span className="material-symbols-outlined">
                                        navigate_next
                                    </span>
                                </div>
                            </div>

                        </a>
                    </li><br />

                    <div className="side-navbar-social-media-div">
                        <div>
                            <span className="material-symbols-outlined">
                                settings
                            </span>
                        </div>
                        <div>
                            <span className="material-symbols-outlined">
                                dashboard_customize
                            </span>
                        </div>
                        <div>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                        </div>
                    </div>

                    <li className="" id="adminDashboardHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    dashboard_customize
                                </span>
                                <small>Admin Dashboard</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="adminDashboardArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="adminDashboardOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="userDashboardHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <a className="parent-name" href="/">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    home
                                </span>
                                <small>User Dashboard</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="userDashboardArrow">
                                    arrow_right
                                </span>

                            </a>
                        </div>

                        <div className="collapse-side-div" id="userDashboardOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="masterHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    manage_accounts
                                </span>
                                <small>Master</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="masterArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="masterOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="reportsHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    insert_chart
                                </span>
                                <small>Reports</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="reportsArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="reportsOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="staffHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    groups
                                </span>
                                <small>Staff</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="staffArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="staffOptions">
                            <div>
                                <a className="" href="staffDocuments.html">
                                    Document List
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="studentHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    badge
                                </span>
                                <small>Student</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="studentArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="studentOptions">
                            <div>
                                <a href="/">
                                    Add Document
                                    <div></div>
                                </a>
                                <a href="/">
                                    Document List
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="adminToolsHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    build
                                </span>
                                <small>Admin Tools</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="adminToolsArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="adminToolsOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="schoolHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    school
                                </span>
                                <small>School</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="schoolArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="schoolOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="prospectusHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    menu_book
                                </span>
                                <small>Prospectus</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="prospectusArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="prospectusOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="feesHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    currency_rupee
                                </span>
                                <small>Fees</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="feesArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="feesOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="marksEntryHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    fact_check
                                </span>
                                <small>Marks Entry</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="marksEntryArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="marksEntryOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="expensesHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    payments
                                </span>
                                <small>Expenses</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="expensesArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="expensesOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="vendorHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    handshake
                                </span>
                                <small>Vendor</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="vendorArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="vendorOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="loanHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    credit_card
                                </span>
                                <small>Loan</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="loanArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="loanOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="allowanceHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    group_work
                                </span>
                                <small>Allowance</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="allowanceArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="allowanceOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="webManagementHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    laptop_mac
                                </span>
                                <small>Web Management</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="webManagementArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="webManagementOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="jobsHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    work
                                </span>
                                <small>Jobs</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="jobsArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="jobsOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="salaryHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    currency_rupee
                                </span>
                                <small>Salary</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="salaryArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="salaryOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="studentPanelHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    dock_to_bottom
                                </span>
                                <small>Student Panel</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="studentPanelArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="studentPanelOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="smsHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    sms
                                </span>
                                <small>SMS</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="smsArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="smsOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="evolutionHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    track_changes
                                </span>
                                <small>Evolution</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="evolutionArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="evolutionOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="paymentGatewayHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    smartphone
                                </span>
                                <small>Payment Gateway</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="paymentGatewayArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="paymentGatewayOptions">
                            <div>
                                <a href="/">
                                    First Sub Item
                                    <div></div>
                                </a>
                                <a href="/">
                                    Second Sub Item
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="" id="settingsHead">
                        <b></b>
                        <b></b>
                        <div onClick={sideNavbarActive}>
                            <div className="parent-name">
                                <div className="active-border"></div>
                                <span className="material-symbols-outlined">
                                    tune
                                </span>
                                <small>Settings</small>
                                <span className="material-symbols-outlined collapse-side-arrow" id="settingsArrow">
                                    arrow_right
                                </span>

                            </div>
                        </div>

                        <div className="collapse-side-div" id="settingsOptions">
                            <div>
                                <a href="/">
                                    Genral Settings
                                    <div></div>
                                </a>
                                <a href="/">
                                    Mobile Configuration
                                    <div></div>
                                </a>
                                <a href="/">
                                    Wallet Settings
                                    <div></div>
                                </a>
                                <a href="/">
                                    Email Configuration
                                    <div></div>
                                </a>
                                <a href="/">
                                    Payment Settings
                                    <div></div>
                                </a>
                            </div>
                        </div>
                    </li>

                </ul>

                <br className="small"/>
                <br className="small"/>
                <br className="small"/>
                <br className="small"/>
                <br className="small"/>
            </div>

        </div>
    )
}
