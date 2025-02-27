<script setup>

    //imports necesarios del sistema
    import { onMounted, ref } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import ModalFinalizar from '@/components/ModalFinalizar.vue';
    import ModalCancelar from '@/components/ModalCancelar.vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import svgIcon from '@jamescoyle/vue-icon';
    import { mdiPlus } from '@mdi/js';
    import Paginacion from '@/components/Paginacion.vue';
    import { jwtDecode } from 'jwt-decode';

    
    //definición de variables
    const path2 = mdiPlus
    const route = useRoute()
    const store = useProyectoStore();
    const decoded = jwtDecode(sessionStorage.getItem('token'))
    const usuarioRol = decoded.id_rol

    const { id } = route.params;
    const idProyecto = id;    
    
    const proyecto = ref({});
    const arrayVersiones = ref([]);
    const modalActual = ref({
        id_proyecto: id,
        nombre: '',
        id: ''
    });
    const estados = {
        Iniciado: 'bg-yellow-200 text-yellow-800',
        Finalizado: 'bg-blue-200 text-blue-800',
        Cancelado: 'bg-red-200 text-red-800'
    }

    const claseEstado = (estado) => {
        return `${estados[estado]}`
    }

    const mostrarModal = async (id) => {
        modalActual.value = await store.consultarVersion(id);
    }


    onMounted(async ()=>{
        proyecto.value = await store.consultarProyecto(id)
        const response = await store.mostrarVersiones(id, null, 10, 1);
        arrayVersiones.value = response.data

        paginacion.value = response
    })

    const control = ref(1)
    const paginacion = ref({})

    const siguiente = async () => {
        
        
        if(control.value === paginacion.value.totalPages){
            return
        }else{
            control.value++;
            const response = await store.mostrarVersiones(id, null, 10, control.value);
            arrayVersiones.value = response.data
            paginacion.value = response
        }
    }

    const anterior = async () => {
        
        if(control.value === 1){
            return
        }else{
            control.value--;
            const response = await store.mostrarVersiones(id, null, 10, control.value);
            arrayVersiones.value = response.data
            paginacion.value = response
        }
    }

</script>

<template>

    <Header :rol="usuarioRol"/>

    <div class="container mx-auto px-4 min-h-[75vh]">

        <div class="flex justify-center flex-col lg:flex-row lg:justify-between items-center border mt-16 p-4 rounded-md">
            <h1 class="text-purple-300 font-extrabold text-2xl uppercase">Versiones de {{ proyecto.nombre }} </h1>
            <RouterLink 
                :to="{name: 'nuevaversion', params:{id: idProyecto}}" 
                class="border px-3 py-1 bg-purple-400 border-purple-400 hover:bg-purple-300 font-bold rounded flex gap-2"
            >
                <svg-icon type="mdi" :path="path2"></svg-icon>
                Nueva Version
            </RouterLink>
        </div>

        <div class="overflow-x-auto mt-12">
            <table class="w-full">
                <thead class="uppercase text-xl font-bold border-b-2 w-full">
                    <tr>
                        <td class="px-3">Version</td>
                        <td class="px-3">Descripción</td>
                        <td class="px-3">Acta</td>
                        <td class="px-3">Creado por</td>
                        <td class="px-3">Estado</td>
                        <td class="px-3">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-if="arrayVersiones" v-for="item in arrayVersiones">
                        <td class="py-2 px-3">{{ item.nombre }}</td>
                        <td class="py-2 px-3">{{ item.descripcion }}</td>
                        <td class="py-2 px-3">
                            <a 
                                v-if="item.acta_aceptacion"
                                class="text-blue-300 hover:text-blue-500" 
                                :href="item.acta_aceptacion"
                                target="_blank"
                            >
                                Ver Acta
                            </a>
                        </td>
                        <td class="py-2 px-3">{{ item.usuario.nombre }}</td>
                        <td class="py-2 px-3">
                            <div class="-bold text-center w-24 rounded" :class="claseEstado(item.estado.nombre)">
                                {{ item.estado.nombre }}
                            </div>
                        </td>
                        <td class="flex gap-2 py-2 w-fit">
                            <button
                                onclick="modalFinalizar.showModal()"
                                v-if="item.estado.nombre === 'Iniciado'" 
                                class="border px-3 py-1 rounded hover:bg-blue-500 hover:border-blue-500 transition-colors duration-300"
                                @click="mostrarModal(item.id)"
                            >
                                Finalizar
                            </button>
                            <button 
                                v-if="item.estado.nombre === 'Iniciado'"
                                onclick="modalCancelar.showModal()" 
                                class="border px-3 py-1 rounded hover:bg-red-500 hover:border-red-500 transition-colors duration-300"
                                @click="mostrarModal(item.id)"
                            >
                                Borrar
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- MODAL PARA FINALIZAR -->
            <ModalFinalizar 
                :version="modalActual" 
                v-model:datos="arrayVersiones"
            />

            <!-- MODAL PARA CANCELAR -->
            <ModalCancelar 
                :version="modalActual"
                v-model:datos="arrayVersiones"
            />

        </div>

        <Paginacion 
            :paginacion="paginacion"
            @anterior="anterior"
            @siguiente="siguiente"
            :control="control"
        />

    </div>

    <Footer />

</template>
