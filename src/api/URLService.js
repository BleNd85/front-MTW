import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export default class URLService {
    static async getUrls(page) {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.get(`${API_URL}/me/urls`, {
                headers,
                params: {page}
            });
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw new Error("No server response");
            }
            if (error.response.status === 401) {
                throw new Error("User is unauthorized.");
            }
            if (error.response.status === 402) {
                throw new Error("Validation Error.");
            }
            throw new Error(error.response.data?.detail || "An error occurred");
        }
    }

    static async CreateLink(url) {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.post(`${API_URL}/me/urls`, {url}, {headers});
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.detail[0].msg);
        }
    }

    static async getRedirects(short) {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await axios.get(`${API_URL}/me/links/${short}/redirects`, {headers});
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.detail[0].msg);
        }
    }
}



