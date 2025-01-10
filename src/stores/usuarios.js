import { defineStore } from "pinia";
import apiServiceUsuarios from "@/services/apiServiceUsuarios";

export const useUsuarioStore = defineStore('usuarios', ()=>{

    async function mostrarEncargados(){
        try{
            const {status, data} = await apiServiceUsuarios.getUsuarios();
            if(status === 200){
                return data;
            }

        }catch(e){
            console.error(e)
        }
        
    }

    return {
        mostrarEncargados
    }
})