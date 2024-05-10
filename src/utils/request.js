import axios from 'axios';
import storageService from "@/service/storageService.js";

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 1000 * 5,
    headers: { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` },
});

export default service