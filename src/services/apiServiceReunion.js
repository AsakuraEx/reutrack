import api from "@/lib/axios";

export default {
    consultarReuniones(estado, limite, codigo){
        let url = '/reuniones?_sort=fecha&_order=desc'

        if(estado){
            url = url + `&estado=${estado}`
        }

        if(limite){
            url = url + `&_limit=${limite}`
        }

        if(codigo){
            url = url + `&codigo=${codigo}`
        }

        return api.get(url)
    },
    guardarReunion(data){
        return api.post('/reuniones', data)
    },
    cancelarReunion(id){
        return api.patch(`/reuniones/${id}`, {estado: 'Cancelado'})
    },
    consultarReunion(id){
        return api.get(`/reuniones/${id}`)
    },
    finalizarReunion(idReunion){
        return api.patch(`/reuniones/${idReunion}`, {estado: 'Finalizado'})
    },
    consultarEncargados(reunion){
        return api.get(`/encargados?id_reunion=${reunion}`)
    },
    agregarEncargado(data){
        return api.post('/encargados', data)
    },
    eliminarEncargado(id){
        return api.delete(`/encargados/${id}`)
    },
    agregarParticipante(data){
        return api.post('/asistencia', data)
    },
    consultarParticipantes(reunion){
        return api.get(`/asistencia?id_reunion=${reunion}`)
    },
    eliminarAsistencia(id){
        return api.delete(`/asistencia/${id}`)
    }
    ,
    agregarPuntos(data){
        return api.post('/puntoreunion', data)
    },
    consultarPuntos(reunion){
        return api.get(`/puntoreunion?id_reunion=${reunion}`)
    },
    eliminarPuntos(id){
        return api.delete(`/puntoreunion/${id}`)
    },
    agregarAcuerdo(data){
        return api.post('/acuerdocompromiso', data)
    },
    consultarAcuerdo(reunion){
        return api.get(`/acuerdocompromiso?id_reunion=${reunion}`)
    },
    eliminarAcuerdo(id){
        return api.delete(`/acuerdocompromiso/${id}`)
    },
    agregarMinuta(data){
        return api.post('/minutareunion', data)
    },
    consultarMinuta(reunion){
        return api.get(`/minutareunion?id_reunion=${reunion}`)
    },
}