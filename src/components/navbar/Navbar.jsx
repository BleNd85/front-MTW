import classes from './navbar.module.css';
import InputButton from "../ui/button/InputButton";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";

export default function Navbar() {
    const {isAuth, setIsAuth, setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuth(false);
        setToken('');
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const handleRegisterRedirect = () => {
        navigate("/register");
    };

    return (
        <nav className={classes.nav}>
            <div className={classes.links}>
                {isAuth ? (
                    <InputButton onClick={handleLogout}>Logout</InputButton>
                ) : (
                    <>
                        <InputButton onClick={handleLoginRedirect}>Login</InputButton>
                        <InputButton onClick={handleRegisterRedirect}>Register</InputButton>
                    </>
                )}
            </div>
        </nav>
    )
}