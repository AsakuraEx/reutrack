import api from "@/lib/axios";

export default {
    guardarReunion(data){
        return api.post('/reuniones', data)
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
}