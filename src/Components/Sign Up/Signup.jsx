import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register } from '../../Services/userService';

function Signup() {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, name, password } = e.target.elements;
        register(email.value, name.value, password.value)
            .then((data) => {
                setError(false);
                setSuccess("User registered succesfully! Please continue with login");
            })
            .catch((err) => {
                setSuccess(false);
                setError(err.message);
                console.log(err);
            })
    }
    return (
        <div>
            <Form className="position-absolute top-50 start-50 translate-middle border border-dark p-3 w-50 bg-light" onSubmit={handleSubmit}>
                <h2 className='text-center'>Sign Up</h2>
                {error && <div className="alert alert-danger d-flex align-items-center" role="alert">
                    {error}
                </div>}
                {success && <div className="alert alert-success d-flex align-items-center" role="alert">
                    {success}
                </div>}
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Email address</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Name</Form.Label>
                    <Form.Control type="text" id="name" placeholder="Username" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Password</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Password" required/>
                </Form.Group>

                <div className='d-flex justify-content-center'>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </div>

                <div className='text-center pt-2'>
                    <a href='/'>Already a user? Login</a>
                </div>
            </Form>
        </div>
    )
}

export default Signup;