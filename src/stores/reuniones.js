import { ref } from "vue";  
import apiServiceReunion from "@/services/apiServiceReunion";   //Conexión al servicio API de reunion
import { defineStore } from "pinia";                //Define la creación de un store de pinia

export const useReunionStore = defineStore('reuniones', () => {
    
    //Variable de mensaje para enviar información inicialmente de exito
    //No es utilizable
    const message = ref({
        tipo: '',
        mensaje: '' 
    })

    //Mediante el código de reunión se busca una reunión especifica
    async function obtenerReunionActual(codigo){
        try{
            //Extrae el status y la data y la retorna
            const response = await apiServiceReunion.ObtenerReunionActual(codigo)
            if(response.status === 200){
                return response;
            }
        }catch(e){
            console.error(e)
        }    
    }

    //Función que extraer la última reunión generada
    async function obtenerUltimaReunion(){
        try{
            const response = await apiServiceReunion.consultarUltimaReunion()
            if(response.status === 200){
                return response.data;
            }
        }catch(e){
            console.error(e)
        }
    }

    //FUNCION QUE OBTIENE TODAS LAS REUNIONES
    //Se puede buscar por estado, definir limite, agregar codigo, obtener por proyecto, definir la pagina y el rango de fechas
    async function obtenerReuniones(estado, limite, codigo, proyecto, usuario, page, desde, hasta){
        try{
            const {status, data} = await apiServiceReunion.consultarReuniones(estado, limite, codigo, proyecto, usuario, page, desde, hasta)
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

            if(status === 201){
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La reunión se inicio exitosamente!'
            }
        }catch(e){
            console.log(e)
        }

    }

    //Llamada de API para marcar la reunión cancelada, solamente se debe pasar el ID
    async function cancelarReunion(id){
        try{
            await apiServiceReunion.cancelarReunion(id);
        }catch(e){
            console.error(e)
        }

    }

    //Obtiene una reunión especifica por ID, similar a obtenerReuniónActual
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
                //Genera un mensaje de exito, esto actualmente no se utiliza
                message.value.tipo = 'Exito';
                message.value.mensaje = '¡La reunión se inicio exitosamente!'

                //Limpia el mensaje enviado a los 3 seg
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

    //Función que reactiva una reunión, actualmente no se utiliza
    async function ReactivarReunión(idReunion, justificación){
        // Esta función requiere un ID de reunión para reactivarla
        // Almacenará la justificación del usuario para reactivar la reunión
        // Cambiará el estado de la reunión a 'Iniciado' y asignará un nuevo código al campo "Reactivación"
        // Redirigirá al usuario a la vista de encargados
    }

    async function obtenerDetalleReunion(idReunion){
        try{
            const {status, data} = await apiServiceReunion.obtenerDetalle(idReunion);

            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
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
        actualizarMinuta,
        obtenerDetalleReunion,
        message
    }
}
)