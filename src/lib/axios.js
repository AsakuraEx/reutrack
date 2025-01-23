import axios from "axios";

const jsonServerURL = import.meta.env.VITE_JSONSERVER_URL;
const baseURL = import.meta.env.VITE_BASE_URL;
const localURL = import.meta.env.VITE_LOCAL_URL;

const api = axios.create({
    baseURL: baseURL,
})

export default api;