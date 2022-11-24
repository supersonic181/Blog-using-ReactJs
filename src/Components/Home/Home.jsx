import React from 'react'
import Navbar from '../Navbar/Header'
import CreatePost from '../CreatePost/CreatePost'
import { Container } from 'react-bootstrap'
import Viewpost from '../ViewPost/Viewpost'
import { getAllPost } from '../../Services/postServices'
import Adminheader from '../Admin/Adminheader'

function Home(props) {
    const [allPost, setAllPost] = React.useState([]);
    const [error, setError] = React.useState(false);

    let adminPanel = false;

    if (props.access == "Admin") {
        adminPanel = true;
    }

    React.useEffect(() => {
        async function getPost() {
            let mounted = true;
            await getAllPost()
                .then(data => {
                    if (mounted) {
                        setAllPost(data);
                    }
                })
                .catch(err => {
                    setError(err.message);
                })
            return () => mounted = false;
        }
        getPost();
    }, [])

    const ViewAllPost = allPost.map((ele) => {
        const tagName = ele.tagname.split(',');
        const tagSlug = ele.tagslug.split(',');
        const date = new Date(ele.created_at).toString();

        let edit = false, del = false;
        if (props.access == "Admin") {
            edit = true;
            del = true;
        }
        else if (props.access == "Moderator") {
            edit = false;
            del = true;
        }
        else if (props.access == "Editor") {
            edit = true; del = false;
        }

        return (
            <Viewpost
                key={ele.id}
                id={ele.id}
                access={props.access}
                authorname={ele.name}
                title={ele.title}
                body={ele.body}
                categoryname={ele.categoryname}
                categoryslug={ele.categoryslug}
                tagname={tagName}
                tagslug={tagSlug}
                createdate={date}
                showmore={true}
                delete={del}
                edit={edit}
            />
        )
    })
    return (
        <>
            <Navbar access={props.access} />
            {adminPanel && <Adminheader />}
            <Container>
                <CreatePost />
                <hr></hr>
                <h1>All Blogs</h1>
                {ViewAllPost}
            </Container>
        </>
    )
}

export default Home