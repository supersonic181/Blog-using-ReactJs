import React, { useContext } from 'react'
import { getAllUserPost } from '../../Services/postServices';
import { Container } from 'react-bootstrap';
import Header from '../Navbar/Header';
import Viewpost from './Viewpost';
import { AppContext } from '../Helper/AppContext';
import { Navigate } from 'react-router-dom'

function Userpost(props) {
    const [allPost, setAllPost] = React.useState([]);
    const [error, setError] = React.useState(false);
    const { isLoggedIn } = useContext(AppContext);

    React.useEffect(() => {
        async function getPost() {
            let mounted = true;
            await getAllUserPost()
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

        return (
            <Viewpost
                key={ele.id}
                id={ele.id}
                authorname={ele.name}
                title={ele.title}
                body={ele.body}
                categoryname={ele.categoryname}
                categoryslug={ele.categoryslug}
                tagname={tagName}
                tagslug={tagSlug}
                createdate={date}
                showmore={true}
                delete={true}
                edit={true}
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

            {!isLoggedIn && <Navigate to={"/"} replace={true} />}
        </div>
    )
}

export default Userpost