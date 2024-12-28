import axios from "axios";

const API_URL = "http://localhost:8000/api";

export default class AuthService {
    static async register(data) {
        try {
            const response = await axios.post(`${API_URL}/register`, data);
            return {data: response.data};
        } catch (error) {
            if (!error.response) return {message: "No server response"};
            if (error.response.status === 409) {
                return {message: error.response.data.detail};
            }
            if (error.response.status === 422) {
                const validationErrors = error.response.data.detail;
                if (Array.isArray(validationErrors) && validationErrors.length > 0) {
                    return {message: validationErrors[0].msg || "Validation Error"};
                }
                return {message: "Validation Error"};
            }
            return {message: error.response.data?.detail || "An error occurred"};
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
            if (error.response.status === 422) {
                const validationErrors = error.response.data.detail;
                if (Array.isArray(validationErrors) && validationErrors.length > 0) {
                    return {message: validationErrors[0].msg || "Validation Error"};
                }
                return {message: "Validation Error"};
            }
        }
        return {message: "Login failed"};
    }
}