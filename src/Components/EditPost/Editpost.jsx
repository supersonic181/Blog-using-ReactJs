import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { getCategory, getTag, updatePost } from '../../Services/postServices';

function Editpost(props) {
    const [category, setCategory] = React.useState([]);
    const [caterror, setCaterror] = React.useState(false);
    const [tag, setTag] = React.useState([]);
    const [tagid, setTagid] = React.useState([]);
    const [tagName, setTagname] = React.useState([]);
    const [tagerror, setTagerror] = React.useState(false);

    const addToTagList = (e) => {
        const id = e.target.value;
        const name = e.target[e.target.value].innerHTML;
        if(!tagid.includes(id)){
            setTagid((prevValue) => [...prevValue, id]);
        }
        if(!tagName.includes(name)){
            setTagname((prevValue) => [...prevValue, name]);
        }
    }

    React.useEffect(() => {
        async function getAllCategory() {
            let mounted = true;
            await getCategory()
                .then(data => {
                    if (mounted) {
                        setCategory(data);
                    }
                })
                .catch(err => {
                    setCaterror(err.message);
                })
            return () => mounted = false;
        }
        getAllCategory();
    }, [])

    const categoryList = category.map((ele) => {
        return (
            <option value={ele.id} key={ele.id.toString()}>{ele.name}</option>
        );
    });

    React.useEffect(() => {
        async function getAllTag() {
            let mounted = true;
            await getTag()
                .then(data => {
                    if (mounted) {
                        setTag(data);
                    }
                })
                .catch(err => {
                    setTagerror(err.message);
                })
            return () => mounted = false;
        }
        getAllTag();
    }, [])

    const tagList = tag.map((ele) => {
        return (
            <option value={ele.id} key={ele.id.toString()}>{ele.name}</option>
        );
    });

    const removeTag = (name) => {
        setTagname(current =>
            current.filter(element => {
                return element !== name;
            }))
    }

    const selectedTagList = tagName.map((ele, count) => {
        return (
            <Button variant='primary' onClick={() => removeTag(ele)} key={count.toString()}>{ele}</Button>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const {title, body, category} = e.target.elements;
        
        updatePost(props.id, title.value, body.value, category.value, tagid)
        .then((data) => {
            window.location.href = "/home/myposts";
        })
        .catch((err) => {
            // setError(err.message);
            console.log(err);
        })
    }

    return (
        <div>
            <Form className='border border-1 border-dark mt-2 p-2' onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Title</Form.Label>
                    <Form.Control type="text" id="title" placeholder="Blog Title" defaultValue={props.title} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Body</Form.Label>
                    <Form.Control as="textarea" id="body" rows={3} defaultValue={props.body} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Category</Form.Label>
                    {caterror && <div className="alert alert-danger d-flex align-items-center" role="alert">
                        {caterror}
                    </div>}
                    <Form.Select id="category">
                        <option>Open this select menu</option>
                        {categoryList}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Tag</Form.Label>
                    {tagerror && <div className="alert alert-danger d-flex align-items-center" role="alert">
                        {tagerror}
                    </div>}
                    <Form.Select name="tag" onChange={addToTagList}>
                        <option>Open this select menu</option>
                        {tagList}
                    </Form.Select>
                    <Stack className='pt-2' direction='horizontal' gap={1}>{selectedTagList}</Stack>
                </Form.Group>

                <div className='d-flex justify-content-end'>
                    <Button variant="success" type="submit">
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Editpost