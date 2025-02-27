import { defineStore } from "pinia";
import apiServiceUsuarios from "@/services/apiServiceUsuarios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";

export const useUsuarioStore = defineStore('usuarios', ()=>{
    
    const User = ref({})

    const router = useRouter()
    const limiteInactividad = 120 * 60 * 1000; // 15 minutos
    let inactividad = null;

    const errorInactividad = ref('')
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

    async function mostrarUsuarios(estado,limit, page){
        try{
            const response = await apiServiceUsuarios.getUsuarios(estado,limit, page);
            if(response.status === 200){
                return response.data;
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
            const {status, data} = await apiServiceUsuarios.getUsuarios(4,null,1);
            if(status === 200){
                console.log(data)
                return data.data;
            }

        }catch(e){
            console.error(e)
        }
        
    }

    async function iniciarSesion(email, password){
        try{
            const response = await apiServiceUsuarios.iniciarSesion(email, password)
            if(response.status === 200){

                return response;
            }
            errorInactividad.value = ''
        }catch(e){
            console.error(e)
        }
    }

    async function verify2FA(email, code){
        try{
            const {status, data} = await apiServiceUsuarios.verify2FA(email, code)
            if(status === 200){

                const decoded = jwtDecode(data.token)
                
                if(decoded.id_estado === 5){
                    const errores = "El usuario al que intenta acceder está deshabilitado."
        
                    return errores
                }
    
                sessionStorage.setItem('token', data.token)

                return data;
            }
            errorInactividad.value = ''
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

    async function actualizarContraseña(id, oldpassword, password, sesion){
        try{
            const {status, data} = await apiServiceUsuarios.actualizarContraseña(id, oldpassword, password, sesion)

            if(status === 200){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡Se actualizó la contraseña!'
                console.log(data)
                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
                
                return data
                
            }
        }catch(e){
            console.error(e)
        }
    }

    async function obtenerUsuario(id){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuario(id);
            if(status === 200){
                User.value = data
                return data;
            }

        }catch(e){
            console.error(e)
        }     
    }

    async function actualizarUsuario(id, data){
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

    async function cerrarSesion(id){
        try{

            const { status } = await apiServiceUsuarios.cerrarSesion(id)

            if( status === 200) {
                router.push({name: 'login'})
            }

            errorInactividad.value = ''
            sessionStorage.clear()
            router.push({name:'login'})

        }catch(e){
            console.error(e)
        }
    }

    async function cerrarSesionInactividad(id){
        try{

            const { status } = await apiServiceUsuarios.cerrarSesion(id)

            if( status === 200) {
                router.push({name: 'login'})
            }

            sessionStorage.clear()
            errorInactividad.value = 'Se ha cerrado su sesión por inactividad'
            router.push({name:'login'})
            
        }catch(e){
            console.error(e)
        }

    }

    const reiniciarTiempo = (id) => {
        clearTimeout(inactividad)
        inactividad = setTimeout(()=>{
            cerrarSesionInactividad(id)
        }, limiteInactividad)

    }

    const detectarActividad = () => {
        document.addEventListener('mousemove', reiniciarTiempo)
        document.addEventListener('keydown', reiniciarTiempo)
    }

    const cancelarDeteccionActividad = () => {
        clearTimeout(inactividad);
        document.removeEventListener('mousemove', reiniciarTiempo);
        document.removeEventListener('keydown', reiniciarTiempo);
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
        actualizarUsuario,
        cerrarSesion,
        detectarActividad,
        cancelarDeteccionActividad,
        reiniciarTiempo,
        errorInactividad,
        User,
        verify2FA
    }
})