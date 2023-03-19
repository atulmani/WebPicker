import React from 'react';
import '../css/ProfileEdit.css';

export default function ProfileEdit() {

    function numberLimit(){
        // if (this.defaultValue.length > this.maxLength) this.defaultValue = this.defaultValue.slice(0, this.maxLength)
    }


  return (
    <div>
      
        <div className="container-fluid">
            <br/>

            <div className="white-div">
                <div className="add-staff-document-form">
                    <h1>Edit Profile</h1>
                    <hr/><br/>

                    <div className="row no-gutters">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="Name" type="text" name="" maxLength="30" required/>
                                <span style={{fontWeight: '500'}}>Name</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="Phone Number" type="text" className="active" readOnly name=""
                                    maxLength="11" required value="85306 42886"/>
                                <span style={{fontWeight: '500'}}>Phone Number</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="Email" type="email" name="" maxLength="40" required />
                                <span style={{fontWeight: '500'}}>Email</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="Apartment" type="text" name="" maxLength="40" required />
                                <span style={{fontWeight: '500'}}>Flat No / Society</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="Locality" type="text" name="" maxLength="40" required />
                                <span style={{fontWeight: '500'}}>Locality</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="City" type="text" name="" maxLength="40" required />
                                <span style={{fontWeight: '500'}}>City</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="State" type="text" name="" maxLength="40" required />
                                <span style={{fontWeight: '500'}}>State</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="input-box">
                                <input title="Pin Code" type="number"
                                    onInput={numberLimit}
                                    name="" maxLength={6} required/>
                                <span style={{fontWeight: '500'}}>Pin Code</span>
                                <b></b>
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="add-staff-document-save-btn">
                                <a href="profile.html" style={{textDecoration: 'none'}}>
                                    <button className="mybutton button5">SAVE</button>
                                </a>
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
