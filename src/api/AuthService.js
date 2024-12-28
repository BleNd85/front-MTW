import axios from "axios";

const API_URL = "http://localhost:8000/api";

export default class AuthService {
    static async register(data) {
        try {
            const response = await axios.post(`${API_URL}/register`, data);
            return {data: response.data};
        } catch (error) {
            if (!error.response) throw new Error("No server response");
            if (error.response.status === 409) {
                throw new Error(error.response.data.detail || "Username is already taken");
            }
            if (error.response.status === 422) {
                const validationErrors = error.response.data.detail;
                if (Array.isArray(validationErrors) && validationErrors.length > 0) {
                    throw new Error(validationErrors[0].msg || "Validation Error");
                }
                throw new Error("Validation Error");
            }
            throw new Error(error.response.data?.detail || "An error occurred");
        }
    }

    static async login(data) {
        try {
            const params = new URLSearchParams();
            params.append("grant_type", "password");
            params.append("username", data.username);
            params.append("password", data.password);

            const response = await axios.post(`${API_URL}/login`, params, {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            });
            return {data: response.data};
        } catch (error) {
            if (!error.response) return {message: "No server response"};
            if (error.response.status === 401) {
                throw new Error("Invalid username or password");
            }
            if (error.response.status === 422) {
                const validationErrors = error.response.data.detail;
                if (Array.isArray(validationErrors) && validationErrors.length > 0) {
                    throw new Error(validationErrors[0].msg || "Validation Error");
                }
                throw new Error("Validation Error");
            }
        }
        return {message: "Login failed"};
    }
}