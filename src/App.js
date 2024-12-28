import './styles/App.css';
import {useEffect, useState} from "react";
import {AuthContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/navbar/Navbar";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
        }}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <BrowserRouter>
                    <Navbar/>
                    <AppRouter/>
                </BrowserRouter>
            )}
        </AuthContext.Provider>
    );
}

export default App;
