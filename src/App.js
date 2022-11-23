import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setLogin] = React.useState(false);
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
        .catch(err => {
          setError(error);
        })
      return () => mounted = false;
    }
    getUserAccess();
  }, [])

  return (
    <AppContext.Provider value={{isLoggedIn, setLogin}}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home access={access}/>} />
          <Route path="/home/myposts" element={<Userpost access={access} />} />
          <Route path="/post/category/:slug" element={<ByCategory access={access} />} />
          <Route path="/post/tag/:slug" element={<ByTag access={access} />} />
          <Route path="/post/:id" element={<ById access={access} />} />
          <Route path="/profile" element={<Profile access={access} />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/admin/login" element={<Adminlogin />} />
        </Routes>
      </BrowserRouter>
    // </AppContext.Provider>
  );
}

export default App;
