import {useState} from "react";
import AuthService from "../../api/AuthService";

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
    };

    return {register, isLoading, error};
}
