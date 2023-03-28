import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginEmail() {

    const loginStorage = () => {
        localStorage.setItem('login', true);
    }



    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser, login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let loginStorage = localStorage.getItem('login');
        if (loginStorage) {
            navigate('/profile');
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();

        // try {
        setError("");
        setLoading(true);
        login(emailRef.current.value, passwordRef.current.value)
            .then(() => {
                console.log('login successfully');
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to login', error);
            });
        // }
        // catch (error) {
        //     setError('Failed to create an account 2', error);
        // }

        setLoading(false);

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <strong>Current User: </strong> {currentUser && currentUser.email}

                    <Form onSubmit={handleSubmit}>
                        <br></br>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <br></br><br></br>

                        <Button disabled={loading} className='w-100' type='submit'>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                You don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}
