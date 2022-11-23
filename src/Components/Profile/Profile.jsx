import React, { useContext } from 'react'
import Navbar from '../Navbar/Header';
import Adminheader from '../Admin/Adminheader';
import { AppContext } from '../Helper/AppContext';
import { Navigate } from 'react-router-dom'
import { Container, Stack, Modal, Col, Form, Row, Button } from 'react-bootstrap';
import { getUserProfile, updateUserProfile } from '../../Services/userService';

function Profile(props) {
  const [profile, setProfile] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const { isLoggedIn } = useContext(AppContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let adminPanel = false;

  if (props.access == "Admin") {
    adminPanel = true;
  }

  React.useEffect(() => {
    async function getProfile() {
      let mounted = true;
      await getUserProfile()
        .then(data => {
          if (mounted) {
            setProfile(data[0]);
          }
        })
        .catch(err => {
          setError(err.message);
        })
      return () => mounted = false;
    }
    getProfile();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, password } = e.target.elements;
    console.log(email.value, name.value, password.value);
    updateUserProfile(email.value, name.value, password.value)
      .then((data) => {
        window.location.reload(true);
      })
      .catch((err) => setError(err));
  }
  return (
    <>
      <Navbar access={props.access} />
      {adminPanel && <Adminheader />}
      <div>
        <Container>
          <Form>
            {error && <div className="alert alert-danger d-flex align-items-center" role="alert">
              {error}
            </div>}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className='fw-bold'>
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={profile.email} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className='fw-bold'>
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={profile.name} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className='fw-bold'>
                Access Type
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={profile.access} required />
              </Col>
            </Form.Group>

            <Stack gap="1" direction='horizontal'>
              <Button variant="primary" onClick={handleShow}>Update</Button>
              <Button variant="danger" onClick={() => window.location.href = "/logout"}>Logout</Button>
            </Stack>
          </Form>
        </Container>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {error &&
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  {error}
                </div>}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' defaultValue={profile.email} autoFocus />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='name' defaultValue={profile.name} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' />
              </Form.Group>
              <Button variant='success' type='Submit'>Update</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
      {!isLoggedIn && <Navigate to={"/"} replace={true} />}
    </>
  )
}

export default Profile