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
    crearProyecto(proyecto){
        return api.post('/proyectos', proyecto)
    },
    getVersiones(idProyecto, estado){
        
        var url = '/versiones?'

        if(idProyecto){
            url = url + `id_proyecto=${idProyecto}&`
        }
        
        if(estado){
            url = url + `estado=${estado}&`
        }
        return api.get(url)
    },
    getVersion(id){
        return api.get(`/versiones/${id}`)
    },
    crearVersion(version){
        return api.post('/versiones', version)
    },
    cancelarVersion(id){
        return api.patch(`/versiones/${id}`, { estado: 'Cancelado' })
    },
    finalizarVersion(id, enlace){
        return api.patch(`/versiones/${id}`, { acta_aceptacion: enlace, estado: 'Finalizado'})
    },
    


}