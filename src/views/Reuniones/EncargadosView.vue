<script setup>
    //imports generales del proyecto
    import { onMounted,ref, computed, reactive, watch } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { useUsuarioStore } from '@/stores/usuarios';
    import { useRoute, useRouter } from 'vue-router';

    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    import Stepper from '@/components/Stepper.vue'
    import Select2 from '@/components/Select2.vue';

    //imports para iconos
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline } from '@mdi/js';
    import BtnSubmit from '@/components/BtnSubmit.vue';
    import { jwtDecode } from 'jwt-decode';

    const path = mdiTrashCanOutline;

    //store donde se almacena la logica de la vista
    const decoded = jwtDecode(localStorage.getItem('token'))
    const error = ref('')
    const store = useUsuarioStore();
    const storeReu = useReunionStore();
    const route = useRoute();
    const router = useRouter()
    const usuarioRol = decoded.id_rol

    //variables o statements de la vista
    const arrayEncargados = ref([]);
    const listaEncargados = ref([]);   
    const reunion = ref({}); 
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;
    const formData = reactive({
        id_usuario: null,
        id_reunion: id

    })

    //Funcion que monitorea cuando un array 
    const existenEncargados = computed(()=>{
        return listaEncargados.value.length > 0
    })

    onMounted(async ()=>{
        arrayEncargados.value = await store.mostrarEncargados() //Se obtiene informacion para el select
        listaEncargados.value = await storeReu.obtenerEncargados(id) //Se obtiene información para la tabla
        reunion.value = await storeReu.obtenerReunion(idReunion)
        store.MostrarMensaje('info', 'Los datos de la reunión se cargaron correctamente', 5000)
        if(reunion.value.id_estado != 1){
            router.push({name:'historial'})
        }
        if(!(!!listaEncargados.value.find(encargado => encargado.id_usuario === decoded.id)) && decoded.id_rol !== 1){
            router.push({name:'historial'})
        }
    })

    const agregarEncargado = async () => {

        if (listaEncargados.value.some(encargado => encargado.id_usuario === Number(formData.id_usuario))) {
            error.value = 'El encargado ya fue agregado en la tabla'
            store.MostrarMensaje('error', error.value, 3000)
            return;
        }else{
            await storeReu.agregarEncargado(formData)   
            listaEncargados.value = await storeReu.obtenerEncargados(id) 
            store.MostrarMensaje('success', 'Encargado agregado correctamente', 3000)
    
            Object.assign(formData, {
                id_usuario: null,
                id_reunion: id
            })
        }
        
    }

    const eliminarEncargado = async (encargado) => {
        try{
            await storeReu.eliminarEncargado(encargado)
            listaEncargados.value = await storeReu.obtenerEncargados(id) 
            store.MostrarMensaje('success', 'Encargado eliminado correctamente', 3000)
        }catch(e){
            store.MostrarMensaje('error', 'Error al eliminar el encargado: ' + e.message, 3000)
        }

    }
    

</script>

<template>
    
        
    <Header :rol="usuarioRol"/>
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="2"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Encargados de la reunión</h1>     
        <p class="text-purple-500 text-center text-xl">Código: <b>{{ reunion.codigo }}</b></p>
    
        <div role="alert" class="alert alert-error" v-if="error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span> {{ error }} </span>
          </div>

        <div class="flex gap-4 flex-col pt-12">

            <div>
        
                <form class="flex flex-col md:flex-row gap-4" @submit.prevent="agregarEncargado()">

                    <Select2 
                        :opciones="arrayEncargados" 
                        :requerido="true"
                        v-model:campo="formData.id_usuario"
                    />

                    <BtnSubmit />

                </form>


            </div>

            <div class="px-4">
                <table class="w-full">
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
                            <td class="py-2">{{ encargado.usuario.nombre }}</td>
                            <td class="py-2">
                                <button 
                                    v-if="encargado.id_usuario!==reunion.id_usuario"
                                    v-show="encargado.id_usuario!==decoded.id"
                                    class="bg-red-500 hover:bg-red-400 p-1 rounded"
                                    @click="eliminarEncargado(encargado.id)"
                                >
                                    <svg-icon type="mdi" :path="path"></svg-icon>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

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

