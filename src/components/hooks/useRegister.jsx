import {useState} from "react";
import AuthService from "../../api/AuthService";
import {redirect} from "react-router-dom";

export default function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (formData) => {
        setIsLoading(true);
        try {
            await AuthService.register(formData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
        redirect("/login");
    };

    return {register, isLoading, error};
}
