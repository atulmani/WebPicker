import React from 'react'
import { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthcontext';

import { useNavigate } from 'react-router-dom';

export default function UserRole() {
    const { user } = useUserAuth();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [userRole, setUserRole] = useState([]);
    const [selectedRole, setSelectedRole] = useState(window.localStorage.getItem('SelectedRole') ? JSON.parse(window.localStorage.getItem('SelectedRole')) : {});

    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLoggedIn) {
            if (user.userInfo !== null) {
                setUserRole(userDetails.UserRole);
                let lUserRole = JSON.parse(window.localStorage.getItem('SelectedRole'));
                // console.log(lUserRole);
                if (lUserRole && lUserRole.uid === userDetails.id) {
                    setSelectedRole(lUserRole)
                } else {
                    setSelectedRole({
                        uid: userDetails.id,
                        selectedRole: 'PARTICIPANT'
                    })
                }
            }
            else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
        else {
        }
    }, [user])

    function funSelectedRole(type) {

        setSelectedRole({
            uid: userDetails.id,
            selectedRole: type
        })
        window.localStorage.setItem("SelectedRole", JSON.stringify({
            uid: userDetails.id,
            selectedRole: type
        }));
    }

    return (
        <div>
            <div className="row no-gutters">

                <div className="col-lg-12 col-md-12 col-sm-12">

                    <div className="reg-first-form-gender-section">
                        <div className="gender-section-inside-div"
                            style={{
                                position: 'relative', padding: '15px 5px'
                            }}>
                            < div className="row no-gutters" >

                                {userRole.map((role) => (

                                    <div className="col-6" style={{ padding: '10px' }} key={role.TYPE}>
                                        <input type="radio" className="checkbox" style={{ width: '0px' }}
                                            onChange={(e) => {
                                                e.target.checked && funSelectedRole(role.TYPE)
                                            }}
                                            name="userRole" id={"reg" + role.TYPE} value={role.TYPE}
                                            checked={selectedRole.selectedRole === role.TYPE ? true : false} />
                                        <label style={{ height: '40px', border: '1px solid #ddd' }}
                                            className="checkbox-label" id={"reg" + role.TYPE + "Label"}
                                            htmlFor={"reg" + role.TYPE}>
                                            <i className="fas fa-plus"
                                                style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                            <i className="fas fa-check"
                                                style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                            <span style={{ fontSize: '0.7rem' }}>{role.TYPE}</span>
                                        </label>
                                    </div>
                                ))}



                                {/* {userRole.findIndex(e => e.TYPE === 'PARTICIPANT') >= 0 && <div className="col-6">
                                    <input type="radio" className="checkbox" style={{ width: '0px' }}
                                        onChange={(e) => {
                                            e.target.checked && setSelectedRole('PARTICIPANT')
                                        }}
                                        name="userRole" id="regParticipant" value="PARTICIPANT"
                                        checked={selectedRole === 'PARTICIPANT' ? true : false} />
                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                        className="checkbox-label" id="regParticipantLabel"
                                        htmlFor="regParticipant">
                                        <i className="fas fa-plus"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <i className="fas fa-check"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <span>Participant</span>
                                    </label>
                                </div>}

                                {userRole.findIndex(e => e.TYPE === 'ADMIN') >= 0 && <div className="col-6">
                                    <input type="radio" className="checkbox" style={{ width: '0px' }}
                                        onChange={(e) => {
                                            e.target.checked && setSelectedRole('ADMIN')
                                        }}

                                        name="userRole" id="regAdmin" value="ADMIN"
                                        checked={selectedRole === 'ADMIN' ? true : false} />
                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                        className="checkbox-label" id="regAdmin"
                                        htmlFor="regAdmin">
                                        <i className="fas fa-plus"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <i className="fas fa-check"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <span>Admin</span>
                                    </label>
                                </div>}
                                {userRole.findIndex(e => e.TYPE === 'ORGANIZER') >= 0 && <div className="col-6">
                                    <input type="radio" className="checkbox" style={{ width: '0px' }}
                                        onChange={(e) => {
                                            e.target.checked && setSelectedRole('ORGANIZER')
                                        }}

                                        name="userRole" id="regOrganizer" value="ORGANIZER"
                                        checked={selectedRole === 'ORGANIZER' ? true : false} />
                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                        className="checkbox-label" id="regOrganizer"
                                        htmlFor="regOrganizer">
                                        <i className="fas fa-plus"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <i className="fas fa-check"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <span>Organizer</span>
                                    </label>
                                </div>}
                                {userRole.findIndex(e => e.TYPE === 'REFREE') >= 0 && <div className="col-6">
                                    <input type="radio" className="checkbox" style={{ width: '0px' }}
                                        onChange={(e) => {
                                            e.target.checked && setSelectedRole('REFREE')
                                        }}

                                        name="userRole" id="regRefree" value="REFREE"
                                        checked={selectedRole === 'REFREE' ? true : false} />
                                    <label style={{ height: '40px', border: '1px solid #ddd' }}
                                        className="checkbox-label" id="regRefree"
                                        htmlFor="regRefree">
                                        <i className="fas fa-plus"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <i className="fas fa-check"
                                            style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                        <span>Refree</span>
                                    </label>
                                </div>} */}

                                <span className="already-active"
                                    style={{ position: 'absolute', left: '12px', top: '-5px', background: 'none' }}>Selectd Role
                                </span>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>


            </div>
        </div>
    )
}
