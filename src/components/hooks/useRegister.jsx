import {useState} from "react";
import AuthService from "../../api/AuthService";
import {useNavigate} from "react-router-dom";

export default function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const register = async (formData) => {
        setIsLoading(true);
        try {
            await AuthService.register(formData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
        navigate("/login");
    };

    return {register, isLoading, error};
}
