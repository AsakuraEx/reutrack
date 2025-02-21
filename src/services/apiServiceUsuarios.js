import api from "@/lib/axios";

export default {
    
    //Obtiene los usuarios registrados, además filtra por estado para el caso del empleado
    getUsuarios(estado, limit, page){
        
        let url = '/usuarios?'
        
        //Si existe el estado, agrega el parametro de forma dinámica
        if(estado){
            url = url + `estado=${estado}&`
        }

        if(limit){
            url = url + `limit=${limit}&`
        }

        if(page){
            url = url + `page=${page}&`
        }

        return api.get(url);
    },

    //Obtiene la información de un solo usuario mediante su id
    getUsuario(id){
        return api.get(`/usuarios/${id}`)
    },

    //Metodo para realizar el inicio de sesión en la aplicación
    iniciarSesion(email, password){
        return api.post(`/auth/login`, {email:email, password:password})
    },

    //Metodo para realizar el cierre de la sesión de la aplicación
    cerrarSesion(idToken){
        return api.post(`/auth/logout`, {id: idToken})
    },

    //Modifica el estado del usuario (id) con el estado actual
    cambiarEstado(id, estado){
        if(estado == 4){       
            return api.patch(`/usuarios/updateStatus`, {id: id, id_estado: 5})
        }else{
            return api.patch(`/usuarios/updateStatus`, {id: id, id_estado: 4})
        }
    },

    //Crea el usuario con los campos requeridos
    crearUsuario(data){
        return api.post('/usuarios/create', data)
    },

    //Metodo para actualizar la contraseña del usuario
    actualizarContraseña(id, old, password, first_session){
        console.log('CONSUMIENDO EL ENDPOINT')
        return api.patch(`/usuarios/updatepassword`, {
            id_usuario:id, 
            oldpassword: old,
            password: password, 
            first_session:first_session})
    },

    //Modifica la información del usuario
    actualizarUsuario(id, data){
        return api.patch(`/usuarios/${id}`, data)
    }
}