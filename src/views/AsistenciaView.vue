<script setup>
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import Stepper from '../../src/components/Stepper.vue'
    import Textfield from '@/components/Textfield.vue';
    import BtnSubmit from '@/components/BtnSubmit.vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline } from '@mdi/js';
    import { useRoute, useRouter } from 'vue-router';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { uid } from 'uid';

    //Variables del sistema
    const path = mdiTrashCanOutline;
    const route = useRoute()
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;
    const store = useReunionStore()
    const router = useRouter()
    const usuarioRol = sessionStorage.getItem('rol')

    //Variable que representa el formulario
    const formData = ref({
        participante: '',
        institucion: '',
        cargo: '',
        dui: '',
        telefono: '',
        correo: '',
        id_reunion: idReunion,
        id: ""
    })

    //Variable que representa la lista de participantes
    const participantes = ref([]);

    //Representan cadenas de validacion para textfield
    const regexDui = "[0-9]{8}-[0-9]{1}$"
    const regexTel = "[2,6,7]{1}[0-9]{7}$"

    //Pull de funciones que se cargan al montar el componente
    onMounted(async ()=>{
        if(sessionStorage.getItem('token') == null){
            router.push({name: 'login'})
        }
        formData.value.id = uid()
        participantes.value = await store.obtenerParticipantes(idReunion)
    })

    // Variables con diferentes funcionalidades del sistema
    const agregarParticipante = async () => {
        await store.agregarParticipante(formData.value)
        participantes.value = await store.obtenerParticipantes(idReunion)
        Object.assign(formData.value, {
            participante: '',
            institucion: '',
            cargo: '',
            dui: '',
            telefono: '',
            correo: '',
            id_reunion: idReunion,
            id: uid()
            
        })
    }

    const eliminarAsistencia = async (id) => {
        await store.eliminarAsistencia(id)
        participantes.value = await store.obtenerParticipantes(idReunion)
    }

    //Comprueba si existen participantes en el array, retorna un booleano
    const existenParticipantes = computed(()=>{
        return participantes.value.length > 0;
    })
</script>

<template>
    
        
    <Header :rol="usuarioRol"/>
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="3"/>

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

        <!-- TABLA DE DATOS DE ASISTENCIA -->
        <div class="overflow-x-auto px-4">
            <table class="w-full mt-8">
                <thead>
                    <tr class="font-bold text-lg border-b-2">
                        <td class="py-2">Participante</td>
                        <td class="py-2">DUI</td>
                        <td class="py-2">Cargo</td>
                        <td class="py-2">Institución</td>
                        <td class="py-2">Teléfono</td>
                        <td class="py-2">Correo Electrónico</td>
                        <td class="py-2">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-if="!existenParticipantes">
                        <td colspan="7" class="py-2 text-center text-gray-300">No existen participantes registrados en esta reunion...</td>
                    </tr>
                    <tr class="border-b" v-for="x in participantes">
                        <td class="py-2">{{ x.participante }}</td>
                        <td class="py-2">{{ x.dui }}</td>
                        <td class="py-2">{{ x.cargo }}</td>
                        <td class="py-2">{{ x.institucion }}</td>
                        <td class="py-2">{{ x.telefono }}</td>
                        <td class="py-2">{{ x.correo }}</td>
                        <td class="py-2">
                            <button
                                @click="eliminarAsistencia(x.id)" 
                                class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="flex justify-between px-4 mt-12">

            <RouterLink 
                :to="{name: 'encargados', params:{id: idReunion}}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Anterior
            </RouterLink>

            <RouterLink 
                :to="{name: 'minuta', params:{id: idReunion}}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Siguiente
            </RouterLink>

            
        </div>

    </div>

    <Footer />
</template>

