import {useEffect, useState} from "react";
import UserService from "../../api/UserService";

export default function useFetchUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        setUser(null);
        setError(null);
        setIsLoading(true);
        const fetchUser = async () => {
            if (!token) {
                setError("No token found. Please log in.");
                setIsLoading(false);
                return;
            }
            try {
                const userData = await UserService.getMe();
                setUser(userData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [token]);
    return {user, isLoading, error};
}