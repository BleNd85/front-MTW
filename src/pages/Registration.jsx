import classes from "./style.module.css";
import "../styles/App.css"
import FormInput from "../components/ui/input/FormInput";
import InputButton from "../components/ui/button/InputButton";
import useRegister from "../components/hooks/useRegister";
import {useState} from "react";

export default function RegistrationForm() {
    const {register, isLoading, error} = useRegister();
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        secondName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const validateForm = () => {
        const errors = {};

        if (formData.firstName.length < 2 || formData.firstName.length > 32) {
            errors.firstName = "First name must be 2 to 32 characters.";
        }

        if (formData.secondName.length < 2 || formData.firstName.length > 32) {
            errors.secondName = "Second name must be 2 to 32 characters.";
        }

        if (formData.username.length < 6) {
            errors.username = "Username must be at least 6 characters long.";
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            errors.username = "Username can only contain letters.";
        }

        if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        } else if (formData.password.length > 256) {
            errors.password = "Password cannot exceed 256 characters.";
        }

        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validateForm()) {
            return;
        }
        const full_name = `${formData.firstName} ${formData.secondName}`;

        const dataToSend = {
            username: formData.username,
            password: formData.password,
            full_name: full_name
        };

        register(dataToSend);
    }
    const getFirstError = () => {
        if (error) {
            return error;
        }
        const allErrors = Object.values(formErrors);
        return allErrors.find((err) => err) || null;
    };


    return (
        <div className={"registration-page"}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h1 className={"pageLabel"}>Join Us!</h1>
                <FormInput placeholder={"First name"}
                           label={"First Name"}
                           name="firstName"
                           value={formData.firstName}
                           onChange={handleInputChange}
                           error={formErrors.firstName}/>
                <FormInput placeholder={"Second name"}
                           label={"Last Name"}
                           name="secondName"
                           value={formData.secondName}
                           onChange={handleInputChange}
                           error={formErrors.secondName}/>
                <FormInput placeholder={"Username"}
                           label={"Username"}
                           name="username"
                           value={formData.username}
                           onChange={handleInputChange}
                           error={formErrors.username}/>
                <FormInput placeholder={"Password"}
                           label={"Password"}
                           type={"password"}
                           name="password"
                           value={formData.password}
                           onChange={handleInputChange}
                           error={formErrors.password}/>
                <FormInput placeholder={"Password"}
                           label={"Confirm Password"}
                           type={"password"}
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleInputChange}
                           error={formErrors.confirmPassword}/>
                {getFirstError() && <div className={"error-message"}>{getFirstError()}</div>}
                <InputButton type={"submit"}>
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </InputButton>
            </form>
        </div>
    )
}