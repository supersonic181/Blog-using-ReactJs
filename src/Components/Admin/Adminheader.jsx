import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Modal, Form, Button } from 'react-bootstrap';
import { addCategory, addTag, getAllAccess, updateUserAccess } from '../../Services/admin';

function Adminheader() {
  const [showC, setShowC] = React.useState(false);
  const [showT, setShowT] = React.useState(false);
  const [showM, setShowM] = React.useState(false);

  const [addedCategory, setCategory] = React.useState(false);
  const [addedTag, setTag] = React.useState(false);
  const [updateAccess, setUpdateAccess] = React.useState(false);
  const [allAccessLevel, setAccessLevel] = React.useState([]);
  const [accessError, setAccessError] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleShowC = () => setShowC(true);
  const handleShowT = () => setShowT(true);
  const handleShowM = () => setShowM(true);


  const handleCloseC = () => {
    setShowC(false);
    setCategory(false);
    setError(false);
  };

  const handleCloseT = () => {
    setShowT(false);
    setTag(false);
    setError(false);
  };

  const handleCloseM = () => {
    setShowM(false);
    setUpdateAccess(false);
    setError(false);
  };

  React.useEffect(() => {
    async function getAccess() {
      let mounted = true;
      await getAllAccess()
        .then(data => {
          if (mounted) {
            setAccessLevel(data);
          }
        })
        .catch(err => {
          setAccessError(err.message);
        })
      return () => mounted = false;
    }
    getAccess();
  }, [])

  const accessList = allAccessLevel.map((ele) => {
    return (
      <option value={ele.level} key={ele.id.toString()}>{ele.name}</option>
    );
  });

  const handleCategory = (e) => {
    e.preventDefault();
    const { name, slug } = e.target.elements;

    addCategory(name.value, slug.value)
      .then((data) => {
        name.value = '';
        slug.value = '';
        setCategory("Data added successfully");
      })
      .catch((err) => {
        setError(err.message);
      })
  }

  const handleTag = (e) => {
    e.preventDefault();
    const { name, slug } = e.target.elements;

    addTag(name.value, slug.value)
      .then((data) => {
        name.value = '';
        slug.value = '';
        setTag("Data added successfully");
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
      })
  }

  const handleManage = (e) => {
    e.preventDefault();
    const { email, access } = e.target.elements;
    updateUserAccess(email.value, access.value)
      .then((data) => {
        email.value = '';
        access.value = '';
        setUpdateAccess("Data updated successfully");
      })
      .catch((err) => {
        setError(err);
      })
  }

  return (
    <>
      <Navbar bg="info" variant='light' expand="lg">
        <Container>
          <Navbar.Brand href="/home">Admin Panel</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav" className="fw-bold justify-content-end">
            <Nav>
              <Nav.Link onClick={handleShowC}>Add Category</Nav.Link>
              <Nav.Link onClick={handleShowT}>Add Tag</Nav.Link>
              <Nav.Link onClick={handleShowM}>Manage Access</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showC} onHide={handleCloseC}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleCategory}>
            {addedCategory && <div className="alert alert-success d-flex align-items-center" role="alert">
              {addedCategory}
            </div>}
            {error && <div className="alert alert-danger d-flex align-items-center" role="alert">
              {error}
            </div>}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name='name' autoFocus required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control type='text' name='slug' required />
            </Form.Group>
            <Button variant='success' type='Submit'>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showT} onHide={handleCloseT}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTag}>
            {addedTag && <div className="alert alert-success d-flex align-items-center" role="alert">
              {addedTag}
            </div>}
            {error && <div className="alert alert-danger d-flex align-items-center" role="alert">
              {error}
            </div>}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name='name' autoFocus required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control type='text' name='slug' required />
            </Form.Group>
            <Button variant='success' type='Submit'>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
          <Modal.Title>Update Access Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleManage}>
            {updateAccess && <div className="alert alert-success d-flex align-items-center" role="alert">
              {updateAccess}
            </div>}
            {error && <div className="alert alert-danger d-flex align-items-center" role="alert">
              {error}
            </div>}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name='email' autoFocus required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Access</Form.Label>
              {accessError && <div className="alert alert-danger d-flex align-items-center" role="alert">
                {accessError}
              </div>}
              <Form.Select id="access" name="access">
                <option>Open this select menu</option>
                {accessList}
              </Form.Select>
            </Form.Group>
            <Button variant='success' type='Submit'>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Adminheader