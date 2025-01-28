import axios from "axios";    //Importa la libreria axios para realizar peticiones

const jsonServerURL = import.meta.env.VITE_JSONSERVER_URL;    //url utilizada en el metodo axios create, apunta a json-server, se configura en env
const baseURL = import.meta.env.VITE_BASE_URL;    //url utilizada en el metodo axios create, apunta al backend, se configura en env
const localURL = import.meta.env.VITE_LOCAL_URL;  //url utilizada en el metodo axios create, apunta al backend local, se configura en env


// Creando la variable a exportar
const api = axios.create({
    baseURL: baseURL
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

// Valida la respuesta recibida para determinar si el token es invalido o ha expirado
api.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response && error.response.status === 401) {
    // Redirigir al login si el token es inválido o ha expirado
    console.error("Token inválido o expirado. Redirigiendo al login...");
    sessionStorage.clear()
    }
    return Promise.reject(error);
}
);

//Realiza el export de la instancia axios
export default api;