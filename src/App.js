import * as React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Signup from "./Components/Sign Up/Signup";
import Logout from "./Components/Logout/Logout";
import Profile from "./Components/Profile/Profile";
import ByCategory from "./Components/ViewPost/ByCategory";
import ByTag from "./Components/ViewPost/ByTag";
import ById from "./Components/ViewPost/ById";
import Userpost from "./Components/ViewPost/Userpost";
import Adminlogin from "./Components/Admin/Adminlogin";
import { getAccessLevel } from "./Services/userService";

function App() {

  console.log(process.env.REACT_APP_NAME);
  // const [isLoggedIn, setLogin] = React.useState(null);
  const [error, setError] = React.useState();
  const [access, setAccess] = React.useState('User');

  React.useEffect(() => {
    async function getUserAccess() {
      let mounted = true;
      await getAccessLevel()
        .then(data => {
          if (mounted) {
            setAccess(data);
          }
        })
        .catch((err) => {
          setError(err);
        })
      return () => mounted = false;
    }
    getUserAccess();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Adminlogin />} />

        <Route path="/home" element={<Home access={access} />} />
        <Route path="/home/myposts" element={<Userpost access={access} />} />
        <Route path="/post/category/:slug" element={<ByCategory access={access} />} />
        <Route path="/post/tag/:slug" element={<ByTag access={access} />} />
        <Route path="/post/:id" element={<ById access={access} />} />
        <Route path="/profile" element={<Profile access={access} />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
