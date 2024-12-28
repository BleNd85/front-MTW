import classes from "./style.module.css";
import FormInput from "../components/ui/input/FormInput";
import InputButton from "../components/ui/button/InputButton";
import useAuth from "../components/hooks/useAuth";
import {useState} from "react";
import "../styles/App.css"

export default function Login() {
    const {login, isLoading, error} = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const data = {
        username: formData.username,
        password: formData.password
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(data);
    }

    const getError = () => {
        return error;
    }

    return (
        <div className={"registration-page"}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h1 className={"pageLabel"}>Sign In</h1>
                <FormInput placeholder={"Username"}
                           label={"Username"}
                           name="username"
                           value={formData.username}
                           onChange={handleInputChange}/>
                <FormInput placeholder={"Password"}
                           label={"Password"}
                           type={"password"}
                           name="password"
                           value={formData.password}
                           onChange={handleInputChange}/>
                {getError() && <div className={"error-message"}>{getError()}</div>}
                <InputButton type={"submit"}>
                    {isLoading ? "Signing In..." : "Sign In"}
                </InputButton>
            </form>
        </div>
    )
}