import './styles/App.css';
import {useEffect, useState} from "react";
import {AuthContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/navbar/Navbar";
import Loader from "./components/ui/loader/Loader";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshUrls, setRefreshUrls] = useState(() => () => {
    });

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true);
            setToken(localStorage.getItem("token"));
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth, setIsAuth,
            token, setToken,
            isLoading, setIsLoading,
            refreshUrls, setRefreshUrls
        }}>
            {isLoading ? (
                <div><Loader/></div>
            ) : (
                <BrowserRouter>
                    <Navbar onNewLink={refreshUrls}/>
                    <AppRouter/>
                </BrowserRouter>
            )}
        </AuthContext.Provider>
    );
}

export default App;
