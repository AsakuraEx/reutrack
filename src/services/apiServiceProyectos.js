import api from "@/lib/axios";

export default {

    //Obtiene todos los proyectos, opcionalmente puede ingresar un estado y realiza la busqueda mediante el estado
    getProyectos(estado, limit, page){
        var url = '/proyectos?'

        //Se agrega dinamicamente el estado si existe
        if(estado){
            url = url + `estado=${estado}&`
        }

        if(limit){
            url = url + `limit=${limit}&`
        }

        if(page){
            url = url + `page=${page}&`
        }

        return api.get(url)
    },

    //Obtiene los datos completos de un solo proyecto
    getProyecto(id){
        return api.get(`/proyectos/${id}`);
    },

    //Crea un proyecto completamente nuevo, recibe un objeto proyecto el cual contiene todos los campos necesarios de la tabla
    crearProyecto(proyecto){
        return api.post('/proyectos/create', proyecto)
    },

    deleteProyecto(data){
        return api.delete(`/proyectos/delete`, data)
    },

    //Obtiene todas las versiones, opcionalmente puede consultar todas las versiones de un proyecto y el estado que posea
    getVersiones(idProyecto, estado, limit, page){
        
        //Se parte de una dirección base
        var url = `/versiones?`
        
        //En caso que exista el id del proyecto lo agrega a la url
        if(idProyecto){
            url = url + `id_proyecto=${idProyecto}&`
        }

        //En caso que exista el estado de la version, lo agrega a la url
        if(estado){
            url = url + `id_estado=${estado}&`
        }

        if(limit){
            url = url + `limit=${limit}&`
        }

        if(page){
            url = url + `page=${page}&`
        }

        //Solicita por get al endpoint construido dinamicamente
        return api.get(url)
    },

    //Obtiene una sola versión de un proyecto, se utiliza el id de la versión
    getVersion(id){
        return api.get(`/versiones/version/${id}`)
    },

    //Crea una versión nueva, el objeto versión ya lleva el id del proyecto asociado
    crearVersion(version){
        return api.post('/versiones/create', version)
    },

    // Realiza la cancelación de una versión pendiente, el estado se envía directamente debido a que es el único campo que modifica
    cancelarVersion(id){
        return api.patch(`/versiones/cancelar/${id}`, { estado: 'Cancelado' })
    },

    // Realiza la actualización de la versión agregando el acta de aceptación y cambia el estado a finalizado
    finalizarVersion(id, enlace){
        return api.patch(`/versiones/finalizar/${id}`, { acta_aceptacion: enlace, estado: 'Finalizado'})
    },
    


}