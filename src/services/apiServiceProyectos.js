import api from "@/lib/axios";

export default {

    getProyectos(estado){
        var url = '/proyectos?'

        if(estado){
            url = url + `estado=${estado}`
        }

        return api.get(url)
    },
    cancelarProyecto(id){
        return api.patch(`/proyectos/${id}`, { estado: 'Cancelado' })
    }

}