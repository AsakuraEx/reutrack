import api from "@/lib/axios";

export default {
    
    //Puede consultar todas las reuniones de acuerdo al estado, código, proyecto o usuario
    consultarReuniones(estado, limite, codigo, proyecto, usuario){
        let url = '/reuniones?'

        //Agrega un estado a la URL base en caso que exista
        if(estado){
            url = url + `&estado=${estado}`
        }

        //Agrega un limite a la URL base en caso que exista (Probablemente se elimine este parametro)
        if(limite){
            url = url + `&_limit=${limite}`
        }

        //Agrega un codigo a la URL base en caso que exista
        if(codigo){
            url = url + `&codigo=${codigo}`
        }

        //Agrega un proyecto a la URL base en caso que exista
        if(proyecto){
            url = url + `&proyecto=${proyecto}`
        }

        //Agrega un usuario que generó a la URL base en caso que exista
        if(usuario){
            url = url + `&id_usuario=${usuario}`
        }

        return api.get(url)
    },

    //Crea una reunion con la data requerida
    guardarReunion(data){
        return api.post('/reuniones', data)
    },

    //Marca la reunión como cancelada y no puede realizar ninguna otra acción
    cancelarReunion(id){
        return api.patch(`/reuniones/${id}`, {estado: 2})
    },

    //Consulta una reunión especifica mediante su id
    consultarReunion(id){
        return api.get(`/reuniones/${id}`)
    },

    //Marca la reunión como finalizada
    finalizarReunion(idReunion){
        return api.patch(`/reuniones/${idReunion}`, {estado: 'Finalizado'})
    },

    //Consulta todos los encargados que fueron registrados en una reunión especifica
    consultarEncargados(reunion){
        return api.get(`/encargados/${reunion}`)
    },

    //Guarda encargados agregados mediante el formulario
    agregarEncargado(data){
        return api.post('/encargados', data)
    },

    //Elimina permanentemente un encargado mientra la reunión esta activa
    eliminarEncargado(id){
        return api.delete(`/encargados/${id}`)
    },

    //Se utiliza para registrar asistencia de la reunión, ya sea desde usuario registrado, como usuario sin cuenta
    agregarParticipante(data){
        return api.post('/asistencia', data)
    },

    //Permite visualizar los participantes que se estan agregando en una reunión, solicita un id de reunión
    consultarParticipantes(reunion){
        return api.get(`/asistencia/${reunion}`)
    },

    //Elimina completamente la asistencia de un participante mientras la reunión está activa.
    eliminarAsistencia(id){
        return api.delete(`/asistencia/${id}`)
    },

    //Agrega los puntos tratados en la reunión
    agregarPuntos(data){
        return api.post('/puntoreunion', data)
    },
    
    //Consulta los puntos tratados en la reunión
    consultarPuntos(reunion){
        return api.get(`/puntoreunion/${reunion}`)
    },

    //Elimina de forma permanente los puntos tratados en la reunión, durante la misma
    eliminarPuntos(id){
        return api.delete(`/puntoreunion/${id}`)
    },

    //Agrega los acuerdos tratados en la reunión
    agregarAcuerdo(data){
        return api.post('/acuerdocompromiso', data)
    },

    //Consultalos acuerdos tratados en la reunión
    consultarAcuerdo(reunion){
        return api.get(`/acuerdocompromiso/${reunion}`)
    },

    //Elimina permanentemente los acuerdos tratados en la reunión
    eliminarAcuerdo(id){
        return api.delete(`/acuerdocompromiso/${id}`)
    },

    // Guarda la información del campo "Descripción de la reunión", además de finalizar la reunión
    agregarMinuta(data){
        return api.post('/minutareunion', data)
    },

    // Consulta la información ingresada
    consultarMinuta(reunion){
        return api.get(`/minutareunion/${reunion}`)
    },
}