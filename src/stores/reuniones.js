import { ref } from "vue";
import apiServiceReunion from "@/services/apiServiceReunion";
import { defineStore } from "pinia";

export const useReunionStore = defineStore('reuniones', () => {
    
    const message = ref({
        tipo: '',
        mensaje: '' 
    })

    async function obtenerReunionActual(codigo){
        try{
            const {status, data} = await apiServiceReunion.ObtenerReunionActual(codigo)
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }    
    }

    async function obtenerUltimaReunion(){
        try{
            const {status, data} = await apiServiceReunion.consultarUltimaReunion()
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    //FUNCION QUE OBTIENE TODAS LAS REUNIONES
    async function obtenerReuniones(estado, limite, codigo, proyecto, usuario){
        try{
            const {status, data} = await apiServiceReunion.consultarReuniones(estado, limite, codigo, proyecto, usuario)
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    //FUNCION DE GUARDA EN LA TABLA REUNION, GENERA EL CODIGO Y EMPIEZA UNA REUNION
    async function iniciarReunion(data){

        try{
            const { status } = await apiServiceReunion.guardarReunion(data)
            console.log(status)
            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La reunión se inicio exitosamente!'


                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }
        }catch(e){
            console.log(e)
        }

    }

    async function cancelarReunion(id){
        try{
            await apiServiceReunion.cancelarReunion(id);
        }catch(e){
            console.error(e)
        }

    }

    async function obtenerReunion(id){
        try{
            const {status, data} = await apiServiceReunion.consultarReunion(id)
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    //OBTIENE LOS ENCARGADOS DE LA REUNION Y LOS CARGA EN LA TABLA
    async function obtenerEncargados(reunion){
        try{
            const {status, data} = await apiServiceReunion.consultarEncargados(reunion);

            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    //GUARDA LOS ENCARGADOS EN LA REUNION CORRESPONDIENTE
    async function agregarEncargado(data){
        try{
            const {status} = await apiServiceReunion.agregarEncargado(data);

            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La reunión se inicio exitosamente!'


                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }

    //ELIMINA LOS ENCARGADOS DE LA TABLA
    async function eliminarEncargado(id){
        await apiServiceReunion.eliminarEncargado(id);
    }

    //MUESTRA LOS PARTICIPANTES DE LA REUNION
    async function obtenerParticipantes(reunion){
        try{
            const {status, data} = await apiServiceReunion.consultarParticipantes(reunion);

            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    //  ELIMINA LOS PARTICIPANTES DE LA REUNION
    async function eliminarAsistencia(id){
        await apiServiceReunion.eliminarAsistencia(id);
    }

    // AGREGA UN PARTICIPANTE A LA REUNION
    async function agregarParticipante(data){
        try{
            const {status} = await apiServiceReunion.agregarParticipante(data);

            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡Se agrego el participante a la lista de asistencia!'


                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }

    //MUESTRA LOS PUNTOS DE LA REUNION
    async function obtenerPuntos(reunion){
        try{
            const {status, data} = await apiServiceReunion.consultarPuntos(reunion);

            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    //  ELIMINA LOS PUNTOS DE LA REUNION
    async function eliminarPuntos(id){
        await apiServiceReunion.eliminarPuntos(id);
    }

    // AGREGA UN PUNTO A LA REUNION
    async function agregarPuntos(data){
        try{
            const {status} = await apiServiceReunion.agregarPuntos(data);

            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡Se agrego el punto a la reunion!'


                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }

    //MUESTRA LOS ACUERDOS DE LA REUNION
    async function obtenerAcuerdos(reunion){
        try{
            const {status, data} = await apiServiceReunion.consultarAcuerdo(reunion);

            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }
    
    //  ELIMINA LOS ACUERDOS DE LA REUNION
    async function eliminarAcuerdos(id){
        await apiServiceReunion.eliminarAcuerdo(id);
    }

    // AGREGA UN ACUERDO A LA REUNION
    async function agregarAcuerdos(data){
        try{
            const {status} = await apiServiceReunion.agregarAcuerdo(data);

            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡Se agrego el acuerdo a la reunion!'


                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }
    
    // Guarda la minuta
    async function GuardarMinuta(data){
        try{
            const {status} = await apiServiceReunion.agregarMinuta(data);

            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡Se finalizó la reunión exitosamente!'


                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }

    // Guarda la minuta
    async function actualizarMinuta(id, data){
        try{
            const {status} = await apiServiceReunion.actualizarMinuta(id, data);

            if(status === 200){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡Se actualizo la reunión exitosamente!'
                console.log("Se actualizó la minuta de reunión")

                setTimeout(()=>{
                    message.value.tipo = "",
                    message.value.mensaje = ""
                },3000)
            }

        }catch(e){
            console.error(e)
        }
    }

    // OBTIENE LA MINUTA
    async function obtenerMinuta(reunion){
        try{
            const {status, data} = await apiServiceReunion.consultarMinuta(reunion);

            if(status === 200){
                return data[0];
            }
        }catch(e){
            console.error(e)
        }
    }

    //FINALIZA LA REUNION
    async function FinalizarReunion(idReunion){
        await apiServiceReunion.finalizarReunion(idReunion)
    }

    return {
        obtenerReuniones,
        obtenerReunion,
        iniciarReunion,
        cancelarReunion,
        obtenerEncargados,
        agregarEncargado,
        eliminarEncargado,
        obtenerParticipantes,
        agregarParticipante,
        eliminarAsistencia,
        obtenerPuntos,
        agregarPuntos,
        eliminarPuntos,
        obtenerAcuerdos,
        agregarAcuerdos,
        eliminarAcuerdos,
        GuardarMinuta,
        obtenerMinuta,
        FinalizarReunion,
        obtenerUltimaReunion,
        obtenerReunionActual,
        actualizarMinuta
    }
}
)