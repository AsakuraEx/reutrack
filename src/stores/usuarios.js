import { defineStore } from "pinia";
import apiServiceUsuarios from "@/services/apiServiceUsuarios";

export const useUsuarioStore = defineStore('usuarios', ()=>{

    async function mostrarUsuarios(){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuarios();
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
    }

    async function cambiarEstado(id, estado){
        try{
            const {status} = await apiServiceUsuarios.cambiarEstado(id, estado);
            if(status === 200){
                console.log("Estado actualizado")
            }

        }catch(e){
            console.error(e)
        }
    }

    async function mostrarEncargados(){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuarios('activo');
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
        
    }

    async function iniciarSesion(email){
        try{
            const {status, data} = await apiServiceUsuarios.iniciarSesion(email)
            if(status === 200){
                return data;
            }
        }catch(e){
            console.error(e)
        }
    }

    return {
        mostrarEncargados,
        iniciarSesion,
        mostrarUsuarios,
        cambiarEstado
    }
})