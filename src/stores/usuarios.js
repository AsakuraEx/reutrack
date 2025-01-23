import { defineStore } from "pinia";
import apiServiceUsuarios from "@/services/apiServiceUsuarios";
import { ref } from "vue";

export const useUsuarioStore = defineStore('usuarios', ()=>{
    
    const message = ref({
        tipo: '',
        mensaje: '' 
    })

    async function validarContraseñaAnterior(id, oldpassword){
        
        let usuario;

        try{
            const {status, data} = await apiServiceUsuarios.getUsuario(id);
            if(status === 200){
                usuario = data;

                if(usuario.contraseña === oldpassword){
                    return true
                }else {
                    return false
                }
            }

        }catch(e){
            console.error(e)
        }        
    }

    async function mostrarUsuarios(){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuarios();
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
    }

    async function cambiarEstado(id, estado){
        try{
            const {status} = await apiServiceUsuarios.cambiarEstado(id, estado);
            if(status === 200){
                console.log("Estado actualizado")
            }

        }catch(e){
            console.error(e)
        }
    }

    async function mostrarEncargados(){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuarios('activo');
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
        
    }

    async function iniciarSesion(email){
        try{
            const {status, data} = await apiServiceUsuarios.iniciarSesion(email)
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    async function crearUsuario(data){
        try{
            const {status} = await apiServiceUsuarios.crearUsuario(data)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡El usuario se creó exitosamente!'

                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)


            }
        }catch(e){
            console.error(e)
        }
    }

    async function actualizarContraseña(id, password){
        try{
            const {status} = await apiServiceUsuarios.actualizarContraseña(id, password)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La contraseña se cambio!'

                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)


            }
        }catch(e){
            console.error(e)
        }
    }

    async function obtenerUsuario(id){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuario(id);
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }     
    }

    async function actualizarUsuario (id, data){
        try{
            const {status} = await apiServiceUsuarios.actualizarUsuario(id, data)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡El usuario se actualizó!'

                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)


            }
        }catch(e){
            console.error(e)
        }
    } 

    return {
        mostrarEncargados,
        iniciarSesion,
        mostrarUsuarios,
        cambiarEstado,
        crearUsuario,
        actualizarContraseña,
        validarContraseñaAnterior,
        obtenerUsuario,
        actualizarUsuario
    }
})