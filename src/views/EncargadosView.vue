<script setup>
    //imports generales del proyecto
    import { onMounted,ref, computed, reactive } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { useUsuarioStore } from '@/stores/usuarios';
    import { useRoute } from 'vue-router';
    import { uid } from 'uid';
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import Stepper from '../../src/components/Stepper.vue'
    import Select from '@/components/Select.vue';

    //imports para iconos
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline } from '@mdi/js';
    import BtnSubmit from '@/components/BtnSubmit.vue';

    const path = mdiTrashCanOutline;

    //store donde se almacena la logica de la vista
    const store = useUsuarioStore();
    const storeReu = useReunionStore();
    const route = useRoute();

    //variables o statements de la vista
    const arrayEncargados = ref([]);
    const listaEncargados = ref([]);    
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;
    const formData = reactive({
        id: '',
        id_usuario: 0,
        id_reunion: id

    })

    //Funcion que monitorea cuando un array 
    const existenEncargados = computed(()=>{
        return listaEncargados.value.length > 0
    })

    onMounted(async ()=>{
        formData.id = uid()
        arrayEncargados.value = await store.mostrarEncargados() //Se obtiene informacion para el select
        listaEncargados.value = await storeReu.obtenerEncargados(id) //Se obtiene información para la tabla
    })

    const agregarEncargado = async () => {
        await storeReu.agregarEncargado(formData, id)   
        listaEncargados.value = await storeReu.obtenerEncargados(id) 

        Object.assign(formData, {
            id: uid(),
            id_usuario: 0,
            id_reunion: id
        })
    }

    const eliminarEncargado = async (encargado) => {
        await storeReu.eliminarEncargado(encargado)
        listaEncargados.value = await storeReu.obtenerEncargados(id) 
    }
    

</script>

<template>
    
        
    <Header />
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="2"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Encargados de la reunión</h1>     
    
        <div class="flex gap-4 flex-col">

            <div>
        
                <form class="flex flex-col md:flex-row gap-4" @submit.prevent="agregarEncargado()">
                    <Select 
                        :opciones="arrayEncargados" 
                        :requerido="true"
                        v-model:campo="formData.id_usuario"
                    />

                    <BtnSubmit />

                </form>


            </div>

            <table>
                <thead>
                    <tr class="font-bold text-lg border-b-2">
                        <td class="py-2">Nombre</td>
                        <td class="py-2">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-if="!existenEncargados">
                        <td class="py-2" colspan="2">No existen encargados para esta reunión...</td>
                    </tr>
                    <tr class="border-b" v-for="encargado in listaEncargados">
                        <td class="py-2">{{ encargado.id }} {{ encargado.id_usuario }} {{ encargado.id_reunion }}</td>
                        <td class="py-2">
                            <button 
                                class="bg-red-500 hover:bg-red-400 p-1 rounded"
                                @click="eliminarEncargado(encargado.id)"
                            >
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-end px-4">

                <RouterLink 
                    :to="{name: 'asistencia', params:{id: idReunion}}"
                    class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                    v-if="existenEncargados"
                >
                    Siguiente
                </RouterLink>

                
            </div>

        </div>

    </div>

    <Footer />

</template>

