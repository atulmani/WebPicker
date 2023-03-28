import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function adminDashboard() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

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
                    <h2 className='text-center mb-4'>Dashboard</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <strong>Email: </strong> {currentUser.email}

                    <Link to='/profile' className='btn btn-primary w-100 mt-3'>
                        Update Profile
                    </Link>
                </Card.Body>

            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
