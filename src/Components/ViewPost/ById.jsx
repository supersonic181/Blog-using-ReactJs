import React from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getAllPostByID } from '../../Services/postServices';
import Header from '../Navbar/Header';
import Viewpost from './Viewpost';

function ById(props) {
    const [allPost, setAllPost] = React.useState([]);
    const [error, setError] = React.useState(false);

    const post = useParams();

    React.useEffect(() => {
        async function getPost(id) {
            let mounted = true;
            await getAllPostByID(id)
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
        getPost(post.id);
    }, [])

    const ViewAllPost = allPost.map((ele) => {
        const tagName = ele.tagname.split(',');
        const tagSlug = ele.tagslug.split(',');
        const date = new Date(ele.created_at).toString();

        let edit = false, del = false;
        if (props.access == "Admin") {
            edit = true; del = true;
        }
        else if (props.access == "Moderator") {
            edit = false; del = true;
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
                showmore={false}
                delete={del}
                edit={edit}
            />
        )
    })

    return (
        <div>
            <Header />
            <Container>
                <h2>Complete Post</h2>
                {ViewAllPost}
            </Container>
        </div>
    )
}

export default ById