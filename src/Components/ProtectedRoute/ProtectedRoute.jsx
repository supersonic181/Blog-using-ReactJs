import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Helper/AppContext";

export const ProtectedRoute = () => {
    const { isLoggedIn } = useContext(AppContext);
    console.log(isLoggedIn);
    if (!isLoggedIn) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return <Outlet />
};