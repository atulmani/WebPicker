import React from 'react';
import '../css/Profile.css';

export default function Profile() {


    function addStaffDocumentMoreOptions(){
        console.log('hi');
    }



  return (
    <div>
      
        <div className="container-fluid">

            <br/>

            <div className="white-div" style={{borderRadius: '8px 8px 0 0'}}>
                <div className="profile-head-div">
                    <div className="profile-head-div-circle">
                        <div>
                            <h1>KS</h1>
                        </div>
                    </div>
                    <div className="profile-head-div-name">
                        <h2>Khushi Soni</h2>
                        <h3>+91 85306 42886</h3>
                        <h4>khushisoni@gmail.com</h4>
                        <h5>
                            <span>Flat# 201, ABC Society</span>,
                            <span>Wakad</span>, <span>Pune</span>,
                            <span>Maharashtra</span> - <span>411057</span>
                        </h5>
                    </div>
                    <a href="profileEdit.html" className="profile-head-div-edit-btn">
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    </a>
                </div>
            </div>
            <div className="below-profile-head-div">
                <h1>Go To Your Study Material, Study Books & Assignments</h1>
                <button className="mybutton button5">Study Material</button>
            </div>

            <br/>

            <div className="white-div">
                <a href="wallet.html" className="profile-wallet">

                    <div>
                        <h1>Wallet <span>Balance</span></h1>
                        <h2>₹ 864<span>.90</span></h2>
                    </div>
                    <div>
                        <span className="material-symbols-outlined">
                            account_balance_wallet
                        </span>
                    </div>
                    <div className="profile-wallet-arrow">
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </div>

                </a>
            </div>

            <br/>

            <div className="all-headings">
                <h1>Documents</h1>
                <div className="dot one"></div>
                <div className="dot two"></div>
            </div>
            <br></br>

            <div className="row">
                <div className="col-md-12 col-md-offset-1">
                    <div id="profile-document-list" className="owl-carousel owl-theme">

                        <div className="item" style={{margin: '20px 0'}}>
                            <div style={{padding: '10px'}}>
                                <div className="add-staff-document-img-upload">
                                    <div className="add-staff-document-img-div">
                                        <img src="./img/aadhar.png"
                                            onClick={addStaffDocumentMoreOptions} alt=""/>
                                    </div>
                                    <div className="add-staff-document-img-content">
                                        <h1>Aadhar Card - 8652 8763 0562</h1>
                                        <div className="left-border"></div>
                                        <div className="add-staff-document-img-more-option"
                                            onClick={addStaffDocumentMoreOptions}>
                                            <span className="material-symbols-outlined">
                                                more_vert
                                            </span>
                                        </div>

                                        <div id="aadharCardMoreOtions"
                                            className="add-staff-document-img-more-option-div">
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    photo_camera
                                                </span>
                                                <small>Camera</small>
                                                <div></div>
                                            </div>
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    upload
                                                </span>
                                                <small>Upload</small>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div style={{padding: '10px'}}>
                                <div className="add-staff-document-img-upload">
                                    <div className="add-staff-document-img-div">
                                        <img src="./img/pan.png"
                                            onClick={addStaffDocumentMoreOptions} alt=""/>
                                    </div>
                                    <div className="add-staff-document-img-content">
                                        <h1>PAN Card - AAAAA1234A</h1>
                                        <div className="left-border"></div>
                                        <div className="add-staff-document-img-more-option"
                                            onClick={addStaffDocumentMoreOptions}>
                                            <span className="material-symbols-outlined">
                                                more_vert
                                            </span>
                                        </div>

                                        <div id="panCardMoreOtions" className="add-staff-document-img-more-option-div">
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    photo_camera
                                                </span>
                                                <small>Camera</small>
                                                <div></div>
                                            </div>
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    upload
                                                </span>
                                                <small>Upload</small>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div style={{padding: '10px'}}>
                                <div className="add-staff-document-img-upload">
                                    <div className="add-staff-document-img-div">
                                        <img src="./img/upload_dl.svg"
                                            onClick={addStaffDocumentMoreOptions}
                                            alt=""/>
                                    </div>
                                    <div className="add-staff-document-img-content">
                                        <h1>Driving License</h1>
                                        <div className="left-border"></div>
                                        <div className="add-staff-document-img-more-option"
                                            onClick={addStaffDocumentMoreOptions}>
                                            <span className="material-symbols-outlined">
                                                more_vert
                                            </span>
                                        </div>

                                        <div id="drivingLicenseCardMoreOtions"
                                            className="add-staff-document-img-more-option-div">
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    photo_camera
                                                </span>
                                                <small>Camera</small>
                                                <div></div>
                                            </div>
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    upload
                                                </span>
                                                <small>Upload</small>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div style={{padding: '10px'}}>
                                <div className="add-staff-document-img-upload">
                                    <div className="add-staff-document-img-div">
                                        <img src="./img/upload_document.svg"
                                            onClick={addStaffDocumentMoreOptions} alt=""/>
                                    </div>
                                    <div className="add-staff-document-img-content">
                                        <h1>Document 4</h1>
                                        <div className="left-border"></div>
                                        <div className="add-staff-document-img-more-option"
                                            onClick={addStaffDocumentMoreOptions}>
                                            <span className="material-symbols-outlined">
                                                more_vert
                                            </span>
                                        </div>

                                        <div id="document4CardMoreOtions"
                                            className="add-staff-document-img-more-option-div">
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    photo_camera
                                                </span>
                                                <small>Camera</small>
                                                <div></div>
                                            </div>
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    upload
                                                </span>
                                                <small>Upload</small>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div style={{padding: '10px'}}>
                                <div className="add-staff-document-img-upload">
                                    <div className="add-staff-document-img-div">
                                        <img src="./img/upload_document.svg"
                                            onClick={addStaffDocumentMoreOptions} alt=""/>
                                    </div>
                                    <div className="add-staff-document-img-content">
                                        <h1>Document 5</h1>
                                        <div className="left-border"></div>
                                        <div className="add-staff-document-img-more-option"
                                            onClick={addStaffDocumentMoreOptions}>
                                            <span className="material-symbols-outlined">
                                                more_vert
                                            </span>
                                        </div>

                                        <div id="document5CardMoreOtions"
                                            className="add-staff-document-img-more-option-div">
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    photo_camera
                                                </span>
                                                <small>Camera</small>
                                                <div></div>
                                            </div>
                                            <div className="add-staff-document-img-more-option-div-inner">
                                                <span className="material-symbols-outlined">
                                                    upload
                                                </span>
                                                <small>Upload</small>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <br/><br/><br/><br/>
            
            <div className="all-headings">
                <h1>Subject Assignments</h1>
                <div className="dot one"></div>
                <div className="dot two"></div>
            </div>
            <br/><br/>

            <div className="row">
                <div className="col-md-12 col-md-offset-1">
                    <div id="profile-assignment-list" className="owl-carousel owl-theme">

                        <div className="item" style={{margin: '20px 0'}}>
                            <div className="white-div">
                                <div className="profile-assignment-card">
                                    <div className="profile-assignment-card-img" style={{background: '#92dae0'}}>
                                        <img src="./img/english_icon.png" alt=""/>
                                    </div>
                                    <div>
                                        <h1>ENGLISH</h1>
                                        <h2>12 ASSIGNMENTS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div className="white-div">
                                <div className="profile-assignment-card">
                                    <div className="profile-assignment-card-img" style={{background: '#e09292'}}>
                                        <img src="./img/maths_icon.png" alt=""/>
                                    </div>
                                    <div>
                                        <h1>MATHEMATICS</h1>
                                        <h2>3 ASSIGNMENTS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div className="white-div">
                                <div className="profile-assignment-card">
                                    <div className="profile-assignment-card-img" style={{background: '#dce092'}}>
                                        <img src="./img/science_icon.png" alt=""/>
                                    </div>
                                    <div>
                                        <h1>SCIENCE</h1>
                                        <h2>127 ASSIGNMENTS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div className="white-div">
                                <div className="profile-assignment-card">
                                    <div className="profile-assignment-card-img" style={{background: '#92e0be'}}>
                                        <img style={{width: '100%'}} src="./img/hindi_icon.png" alt=""/>
                                    </div>
                                    <div>
                                        <h1>HINDI</h1>
                                        <h2>1 ASSIGNMENTS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div className="white-div">
                                <div className="profile-assignment-card">
                                    <div className="profile-assignment-card-img" style={{background: '#e3c5fa'}}>
                                        <img src="./img/socialScience_icon.png" alt=""/>
                                    </div>
                                    <div>
                                        <h1>SOCIAL SCIENCE</h1>
                                        <h2>23 ASSIGNMENTS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item" style={{margin: '20px 0'}}>
                            <div className="white-div">
                                <div className="profile-assignment-card">
                                    <div className="profile-assignment-card-img" style={{background: '#d6e092'}}>
                                        <img src="./img/painting_icon.png" alt=""/>
                                    </div>
                                    <div>
                                        <h1>PAINTING</h1>
                                        <h2>5 ASSIGNMENTS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <hr/><br/>

            <div className="row no-gutters">
                <div className="col-lg-6 col-md-12 col-sm-12">

                    <div className="padding-div">
                        <div className="white-div" style={{padding: '0 10px'}}>
                            <div className="settings-div">
                                <div className="icon">
                                    <span className="material-symbols-outlined">
                                        sell
                                    </span>
                                </div>

                                <div className="address-text">
                                    <h5>Offers & Cashback</h5>
                                    <div className="">
                                        <span className="material-symbols-outlined">
                                            chevron_right
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr style={{margin: '0',border: 'none', borderBottom: '1px solid #ddd'}} />

                            <div className="settings-div">
                                <div className="icon">
                                    <span className="material-symbols-outlined">
                                        sms
                                    </span>
                                </div>

                                <div className="address-text">
                                    <h5>Help & Support</h5>
                                    <div className="">
                                        <span className="material-symbols-outlined">
                                            chevron_right
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">

                    <div className="padding-div">


                        <div className="white-div" style={{padding: '0 10px'}}>
                            <div className="settings-div">
                                <div className="icon">
                                    <span className="material-symbols-outlined">
                                        tune
                                    </span>
                                </div>

                                <div className="address-text">
                                    <h5>Settings</h5>
                                    <div className="">
                                        <span className="material-symbols-outlined">
                                            chevron_right
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr style={{margin: '0',border: 'none', borderBottom: '1px solid #ddd'}} />

                            <div className="settings-div">
                                <div className="icon">
                                    <span className="material-symbols-outlined">
                                        logout
                                    </span>
                                </div>

                                <div className="address-text">
                                    <h5>Logout</h5>
                                    <div className="">
                                        <span className="material-symbols-outlined">
                                            chevron_right
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>


            <br/><br/><br/>
        </div>

    </div>
  )
}
