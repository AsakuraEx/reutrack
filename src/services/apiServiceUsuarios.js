import api from "@/lib/axios";

export default {
    getUsuarios(){
        return api.get('/usuarios');
    },
    iniciarSesion(email){
        return api.get(`/usuarios?correo=${email}`)
    }
}