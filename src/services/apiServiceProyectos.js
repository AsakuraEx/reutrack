import api from "@/lib/axios";

export default {

    getProyectos(estado){
        var url = '/proyectos?'

        if(estado){
            url = url + `estado=${estado}`
        }

        return api.get(url)
    },
    getProyecto(id){
        return api.get(`/proyectos/${id}`);
    },
    cancelarProyecto(id){
        return api.patch(`/proyectos/${id}`, { estado: 'Cancelado' })
    },
    finalizarProyecto(id, enlace){
        return api.patch(`/proyectos/${id}`, { acta_aceptacion: enlace, estado: 'Finalizado'})
    },
    crearProyecto(proyecto){
        return api.post('/proyectos', proyecto)
    }


}