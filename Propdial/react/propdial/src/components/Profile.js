import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const PasswordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, logout, replaceEmail, replacePassword, setProfile } = useAuth();
    const navigate = useNavigate();

    function updateEmail(e) {
        e.preventDefault();
        if (passwordRef.current.value !== PasswordConfirmRef.current.value) {
            return setError('New Password & Confirmation Password does not match');
        }

        setError("");
        setLoading(true);
        if (emailRef.current.value !== currentUser.email) {
            console.log('new email:', emailRef.current.value);
            replaceEmail(emailRef.current.value)
                .then(() => {
                    console.log('Email updated successfully');
                    navigate('/login');
                })
                .catch((error) => {
                    console.log(error);
                    setError('Failed to update current email', error);
                });
        }
        else {
            setError('Logged in email & new email is same');
        }

        setLoading(false);
    }
    function updatePassword(e) {
        e.preventDefault();

        setError("");
        setLoading(true);
        replacePassword(passwordRef.current.value)
            .then(() => {
                console.log('password has been updated successfully');
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to update password', error);
            });

        setLoading(false);
    }

    function updateProfile(e) {
        e.preventDefault();

        setError("");
        setLoading(true);
        setProfile('atul tripathi', '')
            .then(() => {
                console.log('profile updated successfully');
                // navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to update profile', error);
            });

        setLoading(false);
    }

    function handleLogout() {

        setError("");
        setLoading(true);
        logout()
            .then(() => {
                console.log('logout successfully');
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to logout', error);
            });

        setLoading(false);
    }



    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* <strong>Email: </strong> {currentUser.email}<br></br>
                    <strong>Display Name: </strong> {currentUser.displayName}<br></br>
                    <strong>PhotoURL: </strong> {currentUser.photoURL}<br></br> */}


                    <h4 className='text-center mb-4'>Update Password</h4>

                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            {/* <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} /> */}
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same' />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={PasswordConfirmRef} />
                        </Form.Group>
                        <br></br><br></br>
                        <Button disabled={loading} className='w-100' onClick={updateEmail} >Update Email</Button>
                        <br></br><br></br>
                        <Button disabled={loading} className='w-100' onClick={updatePassword} >Update Password</Button>
                        <br></br><br></br>
                        <Button disabled={loading} className='w-100' onClick={updateProfile} >Update Profile</Button>
                    </Form>


                </Card.Body>

            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
