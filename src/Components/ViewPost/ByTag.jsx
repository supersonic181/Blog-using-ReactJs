import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getAllPostByTag } from '../../Services/postServices';
import Header from '../Navbar/Header';
import Viewpost from './Viewpost';
import { AppContext } from '../Helper/AppContext';
import { Navigate } from 'react-router-dom'

function ByTag(props) {
    const [allPost, setAllPost] = React.useState([]);
    const [error, setError] = React.useState(false);
    const { isLoggedIn } = useContext(AppContext);

    const slug = useParams();

    React.useEffect(() => {
        async function getPost(slug) {
            let mounted = true;
            await getAllPostByTag(slug)
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
        getPost(slug.slug);
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
                showmore={true}
                delete={del}
                edit={edit}
            />
        )
    })

    return (
        <div>
            <Header />
            <Container>
                <h2>All posts:-</h2>
                {ViewAllPost}
            </Container>

            {/* {!isLoggedIn && <Navigate to={"/"} replace={true} />} */}
        </div>
    )
}

export default ByTag