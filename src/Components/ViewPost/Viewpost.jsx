
import React from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { deletePostById } from '../../Services/postServices';
import Editpost from '../EditPost/Editpost';
import Modal from 'react-bootstrap/Modal';

function Viewpost(props) {
    const [error, setError] = React.useState();
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCategory = (slug) => {
        window.location.href = "/post/category/" + slug;
    }

    const handleTag = (slug) => {
        window.location.href = "/post/tag/" + slug;
    }

    const deletePost = (id) => {

        deletePostById(id)
            .then((data) => {
                if (data.protoco141 == true) {
                    window.location.href = "/home/mypost";
                }
            })
            .catch((err) => {
                setError(err.message);
                console.log(err);
            })
    }
    return (
        <>

            <Container className='border border-1 border-dark pt-2 mb-2 bg-light'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div>
                        <h2>{props.title}</h2>
                    </div>
                    <div>
                        {props.edit && <Button variant='primary' className='me-1' size="sm" onClick={handleShow}>Edit</Button>}
                        {props.delete && <Button variant='danger' size="sm" onClick={() => deletePost(props.id)}>Delete</Button>}
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className='fw-bold me-1'>Category:</div>
                    <Button variant='primary' size='sm' onClick={() => handleCategory(props.categoryslug)}>{props.categoryname}</Button>
                </div>
                <h4 className='mt-2 mb-3'>{props.body}{props.showmore && <a href={"/post/" + props.id} className="text-secondary fs-6">...show more</a>}</h4>
                <div className="d-flex align-items-center">
                    <div className='fw-bold me-1'>Tags:</div>
                    <Stack direction='horizontal' gap={1}>
                        {props.tagname.map((ele, index) => {
                            return (
                                <Button variant='info' size='sm' key={index} onClick={() => handleTag(props.tagslug[index])}>{ele}</Button>
                            )
                        })}
                    </Stack>
                </div>
                <div className='d-flex justify-content-between'>
                    <p>written by:- {props.authorname}</p>
                    <p>{props.createdate}</p>
                </div>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Editpost id={props.id} title={props.title} body={props.body}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Viewpost