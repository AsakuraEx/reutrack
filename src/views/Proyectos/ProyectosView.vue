<script setup>

    //imports necesarios del sistema
    import { onMounted, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import Paginacion from '@/components/Paginacion.vue';

    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiGit, mdiPlus } from '@mdi/js';

    const path2 = mdiPlus
    const path = mdiGit
    const usuarioRol = sessionStorage.getItem('rol')
    //definición de variables
    const arrayProyectos = ref([]);
    const paginacion = ref({})
    const store = useProyectoStore();
    const estados = {
        Iniciado: 'bg-yellow-200 text-yellow-800',
        Finalizado: 'bg-blue-200 text-blue-800',
        Cancelado: 'bg-red-200 text-red-800'
    }

    const claseEstado = (estado) => {
        return `${estados[estado]}`
    }

    
    onMounted(async ()=>{
        const response = await store.mostrarProyectos(null, 10, 1);
        arrayProyectos.value = response.data
        paginacion.value = response
    })

    const control = ref(1)


    const siguiente = async () => {
        
        
        if(control.value === paginacion.value.totalPages){
            console.log("Ya no puede incrementar mas")
        }else{
            control.value++;
            const response = await store.mostrarProyectos(null, 10, control.value);
            arrayProyectos.value = response.data
            paginacion.value = response
        }
    }

    const anterior = async () => {
        
        if(control.value === 1){
            console.log("Ya no puede decrementar mas")
        }else{
            control.value--;
            console.log(control.value)
            const response = await store.mostrarProyectos(null, 10, control.value);
            arrayProyectos.value = response.data
            console.log(response.data)
            paginacion.value = response
        }
    }



</script>

<template>

    <Header :rol="usuarioRol"/>

    <div class="container mx-auto px-4 min-h-[75vh]">

        <div class="flex justify-center flex-col lg:flex-row lg:justify-between items-center border mt-16 p-4 rounded-md">
            <h1 class="text-purple-300 font-extrabold text-2xl uppercase">Proyectos</h1>
            <RouterLink 
                :to="{name: 'nuevoproyecto'}" 
                class="border px-3 py-1 bg-purple-400 border-purple-400 hover:bg-purple-300 font-bold rounded flex gap-2"
            >
                <svg-icon type="mdi" :path="path2"></svg-icon>
                Nuevo Proyecto
            </RouterLink>
        </div>

        <div class="overflow-x-auto mt-12">
            <table class="w-full">
                <thead class="uppercase text-xl font-bold border-b-2 w-full">
                    <tr>
                        <td class="px-3">Proyecto</td>
                        <td class="px-3">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-if="arrayProyectos" v-for="item in arrayProyectos">
                        <td class="py-2 px-3 w-4/5">{{ item.nombre }}</td>
                        <td class="py-2">
                            <RouterLink
                                :to="{name: 'versiones', params:{id: item.id}}"
                                class="border px-3 py-1 rounded hover:bg-blue-500 hover:border-blue-500 transition-colors duration-300 flex gap-2 w-fit"
                            >
                                <svg-icon type="mdi" :path="path"></svg-icon>
                                Detalle de versiones
                            </RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Paginacion 
                :paginacion="paginacion"
                @siguiente="siguiente"
                @anterior="anterior"
            />
        </div>

    </div>

    <Footer />

</template>

