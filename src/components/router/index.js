import Registration from "../../pages/Registration";
import Login from "../../pages/Login";
import Main from "../../pages/Main";
import User from "../../pages/User";

export const publicRoutes = [
    {path: "/register", element: <Registration/>},
    {path: "/login", element: <Login/>},
    {path: "/", element: <Main/>},
    {path: "*", element: <Main/>}
]
export const authedRoutes = [
    {path: "/me", element: <User/>},
    {path: "/", element: <Main/>},
    {path: "*", element: <User/>},
]