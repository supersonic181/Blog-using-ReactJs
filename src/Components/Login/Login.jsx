import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../../Services/userService';

function Login() {
    const [error, setError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        login(email.value, password.value)
            .then((data) => {
                window.location.href = "/home";
            })
            .catch((err) => {
                setError(err.message);
                console.log(err);
            })
    }
    return (
        <div>
            <Form className="position-absolute top-50 start-50 translate-middle border border-dark p-3 w-50 bg-light" onSubmit={handleSubmit}>
                <h2 className='text-center'>Login</h2>
                {error && <div className="alert alert-danger d-flex align-items-center" role="alert">
                    {error}
                </div>}
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Email address</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Password</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Password" required />
                </Form.Group>

                <div className='d-flex justify-content-center'>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </div>

                <div className='text-center pt-2'>
                    <a href='/signup'>New User? Sign Up</a>
                </div>
            </Form>
        </div>
    )
}

export default Login;