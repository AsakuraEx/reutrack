import api from "@/lib/axios";

export default {
    
    ObtenerReunionActual(codigo){
        return api.get(`/reuniones/reunion-actual/${codigo}`);
    },

    //Puede consultar todas las reuniones de acuerdo al estado, código, proyecto o usuario
    consultarReuniones(estado, limite, codigo, proyecto, usuario){
        let url = '/reuniones?'

        //Agrega un estado a la URL base en caso que exista
        if(estado){
            url = url + `estado=${estado}&`
        }

        //Agrega un limite a la URL base en caso que exista (Probablemente se elimine este parametro)
        if(limite){
            url = url + `_limit=${limite}&`
        }

        //Agrega un codigo a la URL base en caso que exista
        if(codigo){
            url = url + `codigo=${codigo}&`
        }

        //Agrega un proyecto a la URL base en caso que exista
        if(proyecto){
            url = url + `proyecto=${proyecto}&`
        }

        //Agrega un usuario que generó a la URL base en caso que exista
        if(usuario){
            url = url + `id_usuario=${usuario}&`
        }

        return api.get(url)
    },

    consultarUltimaReunion(){
        return api.get('/reuniones/ultima')
    },

    //Crea una reunion con la data requerida
    guardarReunion(data){
        return api.post('/reuniones/create', data)
    },

    //Marca la reunión como cancelada y no puede realizar ninguna otra acción
    cancelarReunion(id){
        return api.patch(`/reuniones/delete/${id}`, {estado: 2})
    },

    //Consulta una reunión especifica mediante su id
    consultarReunion(id){
        return api.get(`/reuniones/${id}`)
    },

    //Marca la reunión como finalizada
    finalizarReunion(idReunion){
        return api.patch(`/reuniones/finalizar/${idReunion}`)
    },

    //Consulta todos los encargados que fueron registrados en una reunión especifica
    consultarEncargados(codigoReu){
        return api.get(`/encargados/${codigoReu}`)
    },

    //Guarda encargados agregados mediante el formulario
    agregarEncargado(data){
        return api.post('/encargados/create', data)
    },

    //Elimina permanentemente un encargado mientra la reunión esta activa
    eliminarEncargado(id){
        return api.delete(`/encargados/delete/${id}`)
    },

    //Se utiliza para registrar asistencia de la reunión, ya sea desde usuario registrado, como usuario sin cuenta
    agregarParticipante(data){
        return api.post('/asistencia/create', data)
    },

    //Permite visualizar los participantes que se estan agregando en una reunión, solicita un id de reunión
    consultarParticipantes(reunion){
        return api.get(`/asistencia/${reunion}`)
    },

    //Elimina completamente la asistencia de un participante mientras la reunión está activa.
    eliminarAsistencia(id){
        return api.delete(`/asistencia/delete/${id}`)
    },

    //Agrega los puntos tratados en la reunión
    agregarPuntos(data){
        return api.post('/puntoreunion/create', data)
    },
    
    //Consulta los puntos tratados en la reunión
    consultarPuntos(reunion){
        return api.get(`/puntoreunion/${reunion}`)
    },

    //Elimina de forma permanente los puntos tratados en la reunión, durante la misma
    eliminarPuntos(id){
        return api.delete(`/puntoreunion/delete/${id}`)
    },

    //Agrega los acuerdos tratados en la reunión
    agregarAcuerdo(data){
        return api.post('/acuerdocompromiso/create', data)
    },

    //Consultalos acuerdos tratados en la reunión
    consultarAcuerdo(reunion){
        return api.get(`/acuerdocompromiso/${reunion}`)
    },

    //Elimina permanentemente los acuerdos tratados en la reunión
    eliminarAcuerdo(id){
        return api.delete(`/acuerdocompromiso/delete/${id}`)
    },

    // Guarda la información del campo "Descripción de la reunión", además de finalizar la reunión
    agregarMinuta(data){
        return api.post('/minutareunion/create', data)
    },

    // Consulta la información ingresada
    consultarMinuta(reunion){
        return api.get(`/minutareunion/${reunion}`)
    },
}