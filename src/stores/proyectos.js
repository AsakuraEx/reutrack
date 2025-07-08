import apiServiceProyectos from "@/services/apiServiceProyectos";       //Importa el servicio de consultas de api - proyectos
import { defineStore } from "pinia";                                    //Importa el uso de pinia para generar stores
import { ref } from "vue";                                              //Importa ref para generar variables reactivas en vue


export const useProyectoStore = defineStore('proyectos', ()=>{          //Inicializa el store, define el id 'proyectos'

    //Define una variable mensaje para mostrar ya sea errores o mensajes de exito
    const message = ref({                                                               
        tipo: '',
        mensaje: '' 
    })

    function enviarMensaje(tipo, mensaje){        //Función para enviar mensajes de exito o error
        
        if(message.value){
            limpiarMensaje()
        }

        message.value = { tipo, mensaje }

        console.log(message.value);          //Muestra el mensaje en consola
    }

    function limpiarMensaje(){          //Función para limpiar el mensaje
        message.value.tipo = '';                 //Asigna un tipo vacio
        message.value.mensaje = '';              //Asigna un mensaje vacio
    }

    async function eliminarProyecto(id, id_usuario){
        try{

            const { status } = await apiServiceProyectos.deleteProyecto(id, id_usuario)

            if(status === 200){
                message.value.tipo = 'Exito',
                message.value.mensaje = 'Se ha eliminado el proyecto correctamente, se almacenó en la bitácora.'
            }

            return status


        }catch(e){
            console.error(e)
        }
    }

    //Función del store asincrona para mostrar proyectos
    async function mostrarProyectos(estado, limit, page){
        try{
            const {status, data} = await apiServiceProyectos.getProyectos(estado, limit, page);      //Realiza la petición y extraye por destructuración el status y la data
            
            //Si la respuesta es 200, retorna la data
            if(status === 200){                                               
                return data;
            }

        }catch(e){
            //Si no se logra realizar la petición, captura el error y lo muestra de forma generica
            console.error(e)
        }
    }

    //Función asincrona del store para cancelar una versión
    async function cancelarVersion(id){
        try{
            //Realiza la peticion
            const {status} = await apiServiceProyectos.cancelarVersion(id);
            //Si el status es 200, guarda un mensaje de exito
            if(status === 200){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La versión se canceló exitosamente!'

                //Posterior a 3 segundos, se elimina de la variable la información
                //Se utiliza para generar alertas reactivas
                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }

    //Función asincrona del store para consultar un proyecto especifico mediante su id
    async function consultarProyecto(id){
        try {
            //Realiza la petición y extrae el status y la data
            const {status, data} = await apiServiceProyectos.getProyecto(id);

            //Si el status es 200 retorna la data
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e);
        }
    }

    //Finaliza la versión mediante su id y la url el cual es la url del acta de aceptacion
    async function finalizarVersion(id, url){

        try{
            const {status} = await apiServiceProyectos.finalizarVersion(id, url)
            if(status === 200){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La version se finalizó exitosamente!'

                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }
        }catch(e){
            console.error(e)
        }
    }

    //Crea un proyecto
    async function crearProyecto(proyecto){
        try{
            const {status} = await apiServiceProyectos.crearProyecto(proyecto)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡El proyecto se creó exitosamente!'


            }
        }catch(e){
            console.error(e)
        }
    }

    //Crea una versión
    async function crearVersion(version) {
        try{
            const {status} = await apiServiceProyectos.crearVersion(version)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La versión se creó exitosamente!'

            }
        }catch(e){
            console.error(e)
        } 
    }

    //Muestra las versiones mediante un id de proyecto y un estado
    async function mostrarVersiones(idProyecto, estado, limit, page) {
        try{
            const {status, data} = await apiServiceProyectos.getVersiones(idProyecto, estado, limit, page);
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
    }

    //Consulta una versión especifica
    async function consultarVersion(id){
        try {
            const {status, data} = await apiServiceProyectos.getVersion(id);
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e);
        }
    }

    //Retorna todas las funciones o variables creadas en el store para ser consumidas por un componente
    return {
        message,
        mostrarProyectos,
        consultarProyecto,
        eliminarProyecto,
        finalizarVersion,
        crearProyecto,
        crearVersion,
        mostrarVersiones,
        cancelarVersion,
        consultarVersion,
        enviarMensaje,
        limpiarMensaje
    }
})