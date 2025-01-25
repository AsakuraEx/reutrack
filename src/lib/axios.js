import axios from "axios";

const jsonServerURL = import.meta.env.VITE_JSONSERVER_URL;
const baseURL = import.meta.env.VITE_BASE_URL;
const localURL = import.meta.env.VITE_LOCAL_URL;

const api = axios.create({
    baseURL: baseURL,
})

// Agregar el token dinámicamente antes de cada solicitud
api.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

api.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response && error.response.status === 401) {
    // Redirigir al login si el token es inválido o ha expirado
    console.error("Token inválido o expirado. Redirigiendo al login...");
    sessionStorage.clear()
    router.push({name: 'login'});
    }
    return Promise.reject(error);
}
);

export default api;