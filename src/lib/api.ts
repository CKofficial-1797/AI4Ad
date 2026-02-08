import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_XANO_URL,
});


export default apiClient;