import { logout } from '../../Services/userService'
import { AppContext } from '../Helper/AppContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function Logout() {
    const { isLoggedIn, setLogin } = useContext(AppContext);
    const exit = () => {
        logout()
            .then((data) => {
                if (data.success) {
                    setLogin(false);
                }
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            {exit}
            {!isLoggedIn && <Navigate to={"/"} replace={true} />}
        </>
    )
}

export default Logout