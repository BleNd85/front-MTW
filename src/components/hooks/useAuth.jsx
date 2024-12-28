import {useContext, useState} from "react";
import AuthService from "../../api/AuthService";
import {AuthContext} from "../../context";

export default function useAuth() {
    const {setIsAuth, setToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (formData) => {
        setIsLoading(true);
        try {
            const response = await AuthService.login(formData);
            if (response.data) {
                const token = response.data.access_token;
                setToken(token);
                setIsAuth(true);
                localStorage.setItem("token", token);
                localStorage.setItem("auth", "true");
            }
        } catch (error) {
            console.log("Error response:", error.response);
            if (error.response && error.response.data && error.response.data.detail) {
                const errorDetails = error.response.data.detail;
                setError(errorDetails[0].msg || "An error occurred");
            } else {
                setError(error.message || "An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };
    const logout = () => {
        setToken('');
        setIsAuth(false);
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
    };

    return {login, logout, isLoading, error};
}
