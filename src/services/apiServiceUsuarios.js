import api from "@/lib/axios";

export default {
    getUsuarios(estado){
        let url = '/usuarios?'
        if(estado){
            url = url + `estado=${estado}`
        }
        return api.get(url);
    },
    getUsuario(id){
        return api.get(`/usuarios/${id}`)
    },
    iniciarSesion(email, password){
        return api.post(`/auth/login`, {email:email, password:password})
    },
    cerrarSesion(idToken){
        return api.post(`/auth/logout`, {id: idToken})
    },
    cambiarEstado(id, estado){
        if(estado === 'activo'){
            return api.patch(`/usuarios/${id}`, {estado: 'inactivo'})
        }else{
            return api.patch(`/usuarios/${id}`, {estado: 'activo'})
        }
    },
    crearUsuario(data){
        return api.post('/usuarios', data)
    },
    actualizarContraseña(id, password){
        return api.patch(`/usuarios/${id}`, {contraseña: password})
    },
    actualizarUsuario(id, data){
        return api.patch(`/usuarios/${id}`, data)
    }
}