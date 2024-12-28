import {useEffect, useState} from "react";
import UserService from "../../api/UserService";

export default function useFetchUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
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
    }, []);
    return {user, isLoading, error};
}