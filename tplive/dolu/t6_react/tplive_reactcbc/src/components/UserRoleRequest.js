import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useUserAuth } from '../context/UserAuthcontext';
import { useNavigate } from 'react-router-dom';
import { functions } from '../firebase.js'
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";


export default function UserRoleRequest() {
    const { user } = useUserAuth();
    const [userDetails, setUserDetails] = useState(window.localStorage.getItem('userProfile') ? JSON.parse(window.localStorage.getItem('userProfile')) : {});
    const [userRole, setUserRole] = useState([]);
    const [requestedRoleList, setRequestedRoleList] = useState(null);
    const selectedRole = useRef([]);
    const [roleList, setRoleList] = useState(['PARTICIPANT', 'ADMIN', 'ORGANIZER', 'REFREE', 'SUPPORT']);
    const navigate = useNavigate();
    const [requestRole, setRequestRole] = useState([]);
    useEffect(() => {
        if (user.isLoggedIn) {
            let roleRequest = [];
            if (user.userInfo !== null) {
                if (user.userInfo.uid === userDetails.id) {
                    roleList.forEach(async element => {
                        if (userDetails.UserRole.findIndex(e => e.TYPE === element) < 0) {
                            roleRequest.push(element);
                        }
                    });
                    // getRoleRequest();
                    //get role request from DB

                }
            }
            else {
                navigate("/PhoneSignUp", { state: { url: 'ExportEventEntry' } });
            }
        }
        else {
        }
    }, [user])

    async function getRoleRequest() {
        var para1 = {};
        para1 = {
            UserID: userDetails.id,
        };
        // console.log('getRegisteredEvents para1', para1)
        const ret1 = httpsCallable(functions, "getRequestedRoleForUser");
        ret1(para1).then(async (result) => {
            setRequestedRoleList(result.data);
        });
    }

    function funSelectedRole(type, selected) {
        let index = -1;
        if (selected) {
            selectedRole.current.push(type);
        } else {
            index = selectedRole.current.findIndex(type);

            selectedRole.current = selectedRole.current.splice(index, 1)
        }
        // console.log(selectedRole.current);

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

                                {requestRole.map((role) => (

                                    <div className="col-6" style={{ padding: '10px' }} key={role}>
                                        <input type="checkbox" className="checkbox" style={{ width: '0px' }}
                                            onChange={(e) => {
                                                funSelectedRole(role, e.target.checked)
                                            }}
                                            name="userRole" id={"reg" + role} value={role}
                                            checked={selectedRole.current.includes(role) ? true : false} />
                                        <label style={{ height: '40px', border: '1px solid #ddd' }}
                                            className="checkbox-label" id={"reg" + role.TYPE + "Label"}
                                            htmlFor={"reg" + role}>
                                            <i className="fas fa-plus"
                                                style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                            <i className="fas fa-check"
                                                style={{ paddingTop: '9px', paddingRight: '5px', fontSize: '0.6rem' }}></i>
                                            <span>{role}</span>
                                        </label>
                                    </div>
                                ))}

                                <span className="already-active"
                                    style={{ position: 'absolute', left: '12px', top: '-5px', background: 'none' }}>Role Request
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
