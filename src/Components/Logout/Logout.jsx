import { logout } from '../../Services/userService'

function Logout() {
    const exit = () => {
        logout()
            .then((data) => {
                if (data.success) {
                    window.location.href = "/";
                }
            })
            .catch((err) => console.log(err));
    }
    return (
        exit()
    )
}

export default Logout