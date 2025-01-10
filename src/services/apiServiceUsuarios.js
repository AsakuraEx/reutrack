import api from "@/lib/axios";

export default {
    getUsuarios(){
        return api.get('/usuarios');
    }
}