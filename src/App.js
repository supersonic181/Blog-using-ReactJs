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
import { AppContext } from "./Components/Helper/AppContext";
import { Navigate } from 'react-router-dom';
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import Cookies from "js-cookie";

function App() {

  console.log(process.env.REACT_APP_NAME);
  // const [isLoggedIn, setLogin] = React.useState(null);
  const [error, setError] = React.useState();
  const [access, setAccess] = React.useState('User');


  // const jwt = Cookies.get('jwt');
  // React.useEffect(() => {
  //   if (jwt) {
  //     setLogin(true);
  //   }
  //   else {
  //     setLogin(false);
  //   }
  // }, [jwt]);

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

    // <AppContext.Provider value={{ isLoggedIn, setLogin }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Adminlogin />} />

        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/home" element={<Home access={access} />} />
        <Route path="/home/myposts" element={<Userpost access={access} />} />
        <Route path="/post/category/:slug" element={<ByCategory access={access} />} />
        <Route path="/post/tag/:slug" element={<ByTag access={access} />} />
        <Route path="/post/:id" element={<ById access={access} />} />
        <Route path="/profile" element={<Profile access={access} />} />
        <Route path="/logout" element={<Logout />} />
        {/* </Route> */}

        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </BrowserRouter>
    // </AppContext.Provider>
  );
}

// const ProtectedRoute = () => {
//   const {isLoggedIn} = React.useContext(AppContext);
//   if (!isLoggedIn) {
//     // user is not authenticated
//     return <Navigate to="/" />;
//   }
//   return <Outlet />
// }

export default App;
