import {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import {AuthContext} from "../context";
import {authedRoutes, publicRoutes} from "./router";

export default function AppRouter() {
    const {isAuth, isAuthLoading} = useContext(AuthContext);

    return (isAuth
        ?
        <Routes>
            {authedRoutes.map(route => <Route
                key={route.path}
                element={route.element}
                path={route.path}
                exact={route.exact}/>
            )}
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route => <Route
                key={route.path}
                element={route.element}
                path={route.path}
                exact={route.exact}/>
            )}
        </Routes>)
}