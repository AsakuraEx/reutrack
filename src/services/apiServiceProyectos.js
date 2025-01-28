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
        return api.post('/proyectos/create', proyecto)
    },
    getVersiones(idProyecto, estado){
        
        var url = `/versiones`
        
        if(idProyecto){
            url = url + `/${idProyecto}`
        }

        if(estado){
            url = url + `/${estado}`
        }
        return api.get(url)
    },
    getVersion(id){
        return api.get(`/versiones/version/${id}`)
    },
    crearVersion(version){
        return api.post('/versiones/create', version)
    },
    cancelarVersion(id){
        return api.patch(`/versiones/${id}`, { estado: 'Cancelado' })
    },
    finalizarVersion(id, enlace){
        return api.patch(`/versiones/finalizar/${id}`, { acta_aceptacion: enlace, estado: 'Finalizado'})
    },
    


}