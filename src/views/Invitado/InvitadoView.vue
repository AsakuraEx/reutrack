<template>
    <div class="min-h-screen py-12">
        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Lista de Asistencia</h1>  
        
        <form class="flex flex-col gap-8 md:gap-0" @submit.prevent="agregarParticipante">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <Textfield 
                    v-model:campo="formData.participante" 
                    :label="'Participante: *'"  
                    :requerido="true"
                    :tipo="'text'"
                />
    
                <Textfield 
                    v-model:campo="formData.institucion" 
                    :label="'Institución o Dependencia: *'" 
                    :requerido="true"
                    :tipo="'text'"
                />
    
                <Textfield 
                    v-model:campo="formData.cargo" 
                    :label="'Cargo: *'" 
                    :requerido="true" 
                    :tipo="'text'"
                />
    
                <Textfield 
                    v-model:campo="formData.dui" 
                    :label="'DUI: *'" 
                    :requerido="true" 
                    :tipo="'text'"
                    :pattern="regexDui"
                    :mascara="'########-#'"
                />
                
                <Textfield 
                    v-model:campo="formData.telefono" 
                    :label="'Teléfono: *'" 
                    :requerido="true"
                    :tipo="'text'"
                    :pattern="regexTel"
                />
                    
                <Textfield 
                    v-model:campo="formData.correo" 
                    :label="'Correo Electrónico: *'" 
                    :requerido="true" 
                    :tipo="'email'"
                />

            </div>
            <div class="mx-auto mt-6 w-full lg:w-32">
                <BtnSubmit />
            </div>

        </form>
    </div>
</template>

<script setup>
    import { useReunionStore } from '@/stores/reuniones';
    import { uid } from 'uid';
    import { onMounted, reactive, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Textfield from '@/components/Textfield.vue';
    import BtnSubmit from '@/components/BtnSubmit.vue';

    const route = useRoute()
    const router = useRouter()
    const {id} = route.params     //Se obtiene el id de la reunion actual
    const idReunion = id
    const store = useReunionStore()
    const formData = ref({
            participante: '',
            institucion: '',
            cargo: '',
            dui: '',
            telefono: '',
            correo: '',
            id_reunion: idReunion,
        })
    //Representan cadenas de validacion para textfield
    const regexDui = "[0-9]{8}-[0-9]{1}$"
    const regexTel = "[2,6,7]{1}[0-9]{7}$"

    const agregarParticipante = async () => {
        
        await store.agregarParticipante(formData.value)
        router.push({name: 'agradecimiento'})

    }
</script>
