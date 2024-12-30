import classes from './navbar.module.css';
import InputButton from "../ui/button/InputButton";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";
import MyModal from "../ui/modal/MyModal";
import CreateLinkForm from "../../pages/CreateLinkForm";

export default function Navbar({onNewLink}) {
    const {isAuth, setIsAuth, setToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

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

    const handleUserRedirect = () => {
        navigate("/me");
    }

    return (
        <nav className={classes.nav}>
            <div className={classes.links}>
                {isAuth ? (
                    <>
                        <InputButton onClick={handleUserRedirect}>Me</InputButton>
                        <InputButton onClick={() => setModal(true)}>New Link</InputButton>
                        <MyModal visible={modal} setVisible={setModal}>
                            <CreateLinkForm onNewLink={onNewLink}/>
                        </MyModal>
                        <InputButton onClick={handleLogout}>Logout</InputButton>
                    </>
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