import api from "@/lib/axios";

export default {
    getUsuarios(estado){
        let url = '/usuarios?'
        if(estado){
            url = url + `estado=${estado}`
        }
        return api.get(url);
    },
    iniciarSesion(email){
        return api.get(`/usuarios?correo=${email}`)
    },
    cambiarEstado(id, estado){
        if(estado === 'activo'){
            return api.patch(`/usuarios/${id}`, {estado: 'inactivo'})
        }else{
            return api.patch(`/usuarios/${id}`, {estado: 'activo'})
        }
    }
}