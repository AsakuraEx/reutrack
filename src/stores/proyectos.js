import apiServiceProyectos from "@/services/apiServiceProyectos";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useProyectoStore = defineStore('proyectos', ()=>{

    const message = ref({
        tipo: '',
        mensaje: '' 
    })

    async function mostrarProyectos(estado){
        try{
            const {status, data} = await apiServiceProyectos.getProyectos(estado);
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
    }

    async function cancelarProyecto(id){
        try{
            const {status} = await apiServiceProyectos.cancelarProyecto(id);
            if(status === 200){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡El proyecto se canceló exitosamente!'


                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }

    async function consultarProyecto(id){
        try {
            const {status, data} = await apiServiceProyectos.getProyecto(id);
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e);
        }
    }

    async function finalizarProyecto(id, url){

        try{
            const {status} = await apiServiceProyectos.finalizarProyecto(id, url)
            if(status === 200){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡El proyecto se finalizó exitosamente!'

                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }
        }catch(e){
            console.error(e)
        }
    }

    async function crearProyecto(proyecto){
        try{
            const {status} = await apiServiceProyectos.crearProyecto(proyecto)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡El proyecto se creó exitosamente!'

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
        message,
        mostrarProyectos,
        cancelarProyecto,
        consultarProyecto,
        finalizarProyecto,
        crearProyecto
    }
})