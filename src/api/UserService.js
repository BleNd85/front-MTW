import axios from "axios";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");
const headers = {
    Authorization: `Bearer ${token}`
};

export default class UserService {
    static async getMe() {
        try {
            const response = await axios.get(`${API_URL}/me`, {headers});
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw new Error("No server response");
            }
            if (error.response.status === 401) {
                throw new Error("Unauthorized: Invalid or missing token");
            }
            throw new Error(error.response.data?.detail || "An error occurred");
        }
    }
}
