import { defineStore } from "pinia";
import apiServiceUsuarios from "@/services/apiServiceUsuarios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useUsuarioStore = defineStore('usuarios', ()=>{
    
    const User = ref({})    //Objeto de usuario

    const router = useRouter()
    const limiteInactividad = 120 * 60 * 1000; // 15 minutos
    let inactividad = null;     //Define la inactividad

    const errorInactividad = ref('')
    const message = ref({
        tipo: '',
        mensaje: '' 
    })

    const LoginExitoso = ref(true)

    function setLoginExitoso(value){
        LoginExitoso.value = !LoginExitoso.value;
    }

    function MostrarMensaje(tipo, mensaje, tiempo){
        
        toast(mensaje || 'No hay un mensaje ingresado', {
            theme: 'colored',
            autoClose: tiempo || 1000,
            type: tipo || 'info',
            position: "top-right",
        });

    }

    //Valida que la contraseña anterior sea correcta, se utiliza en el cambio de contraseña
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

    //Muestra el listado de usuarios
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

    //Cambia el estado, se envia el estado actual y se actualiza con el estado contrario
    async function cambiarEstado(id, estado){
        try{
            const {status} = await apiServiceUsuarios.cambiarEstado(id, estado);
            if(status === 200){
                
            }

        }catch(e){
            console.error(e)
        }
    }

    //Solicita mostrar todos los usuarios activos, se utiliza en el paso encargados de la reunión
    async function mostrarEncargados(){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuarios(4,null,1);
            if(status === 200){
                return data.data;
            }

        }catch(e){
            console.error(e)
        }
        
    }

    //Metodo para iniciar sesión
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

    //Verificación de 2FA
    async function verify2FA(email, code){
        try{
            const {status, data} = await apiServiceUsuarios.verify2FA(email, code)
            if(status === 200){

                //Se decodifica el token y se almacena en una variable
                const decoded = jwtDecode(data.token)
                
                //Se accede al estado y se evalua si esta deshabilitado
                if(decoded.id_estado === 5){
                    const errores = "El usuario al que intenta acceder está deshabilitado."
        
                    return errores
                }
    
                //Guarda el token en session storage
                localStorage.setItem('token', data.token)

                return data;
            }
            errorInactividad.value = ''
        }catch(e){
            console.error(e)
        }
    }

    //Metodo de creacion de usuarios
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

    //Actualiza las contraseñas en la pantalla de cambio de contraseña
    async function actualizarContraseña(id, oldpassword, password, sesion){
        try{
            const {status, data} = await apiServiceUsuarios.actualizarContraseña(id, oldpassword, password, sesion)

            if(status === 200){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡Se actualizó la contraseña!'
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

    //Obtiene un usuario especifico mediante el id
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

    //Actualiza el usuario mediante el id y la data es el objeto que contiene los cambios del reigstro
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

    //Cierra sesión a demanda
    async function cerrarSesion(id){
        try{

            const { status } = await apiServiceUsuarios.cerrarSesion(id)

            if( status === 200) {
                router.push({name: 'login'})
            }

            errorInactividad.value = ''
            localStorage.clear()
            router.push({name:'login'})

        }catch(e){
            console.error(e)
        }
    }

    //Cierra sesión por inactividad
    async function cerrarSesionInactividad(id){
        try{

            const { status } = await apiServiceUsuarios.cerrarSesion(id)

            if( status === 200) {
                router.push({name: 'login'})
            }

            localStorage.clear()
            //Muestra el mensaje de cierre de sesión por inactividad
            errorInactividad.value = 'Se ha cerrado su sesión por inactividad'
            router.push({name:'login'})
            
        }catch(e){
            console.error(e)
        }

    }

    //Función que se encarga de limpiar la inactividad y volverla a ejecutar
    const reiniciarTiempo = (id) => {
        clearTimeout(inactividad)
        inactividad = setTimeout(()=>{
            cerrarSesionInactividad(id)
        }, limiteInactividad)

    }

    //Función que evalua si se presionan teclas o se mueve el mouse dentro de la app, de esta manera se intuye que el usuario esta activo
    const detectarActividad = () => {
        document.addEventListener('mousemove', reiniciarTiempo)
        document.addEventListener('keydown', reiniciarTiempo)
    }

    //Se elimina toda la detección de actividad
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
        verify2FA,
        MostrarMensaje,
        setLoginExitoso,
        errorInactividad,
        LoginExitoso,
        User
    }
})