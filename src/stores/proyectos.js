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

    async function cancelarVersion(id){
        try{
            const {status} = await apiServiceProyectos.cancelarVersion(id);
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

    async function crearVersion(version) {
        try{
            const {status} = await apiServiceProyectos.crearVersion(version)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La versión se creó exitosamente!'

                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)


            }
        }catch(e){
            console.error(e)
        } 
    }

    async function mostrarVersiones(idProyecto, estado) {
        try{
            const {status, data} = await apiServiceProyectos.getVersiones(idProyecto, estado);
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
    }

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

    return {
        message,
        mostrarProyectos,
        consultarProyecto,
        finalizarVersion,
        crearProyecto,
        crearVersion,
        mostrarVersiones,
        cancelarVersion,
        consultarVersion

    }
})