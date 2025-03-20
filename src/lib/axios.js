import axios from "axios";    //Importa la libreria axios para realizar peticiones
import { useRouter } from "vue-router";

const baseURL = import.meta.env.VITE_BASE_URL;    //url utilizada en el metodo axios create, apunta al backend, se configura en env
const router = useRouter()

// Creando la variable a exportar
const api = axios.create({
    baseURL: baseURL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
})


// Agregar el token dinámicamente antes de cada solicitud
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Valida la respuesta recibida para determinar si el token es invalido o ha expirado
api.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response && error.response.status === 401) {
    // Redirigir al login si el token es inválido o ha expirado
    console.error("Token inválido o expirado");
    localStorage.clear()
    router.push({name: 'NoAutenticado'})
    }
    return Promise.reject(error);
}
);

//Realiza el export de la instancia axios
export default api;