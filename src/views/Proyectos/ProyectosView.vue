<script setup>

    //imports necesarios del sistema
    import { onMounted, ref, watch } from 'vue';
    import { RouterLink } from 'vue-router';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import Paginacion from '@/components/Paginacion.vue';
    import { jwtDecode } from 'jwt-decode';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiGit, mdiPlus } from '@mdi/js';
    import { useUsuarioStore } from '@/stores/usuarios';

    //definición de variables
    const path2 = mdiPlus
    const path = mdiGit
    const decoded = jwtDecode(localStorage.getItem('token'))
    const usuarioRol = decoded.id_rol
    const arrayProyectos = ref([]);
    const paginacion = ref({})
    const store = useProyectoStore();
    const storeUs = useUsuarioStore();
    
    onMounted(async ()=>{
        const response = await store.mostrarProyectos(null, 10, 1);
        arrayProyectos.value = response.data
        paginacion.value = response
    })

    watch(() => store.message, (newValue) => {
        if(newValue.tipo !== ''){
            storeUs.MostrarMensaje('success', newValue.mensaje, 3000);
        }
    }, {deep: true})

    const control = ref(1) //Control de paginacion


    const siguiente = () => {
        
        
        if(control.value === paginacion.value.totalPages){
            return
        }else{
            control.value++;
            const response = store.mostrarProyectos(null, 10, control.value);
            arrayProyectos.value = response.data
            paginacion.value = response
        }
    }

    const anterior = () => {
        
        if(control.value === 1){
            return
        }else{
            control.value--;
            const response = store.mostrarProyectos(null, 10, control.value);
            arrayProyectos.value = response.data
            paginacion.value = response
        }
    }

    //Función que ayuda a transformar cualquier fecha a formato dd-mm-yyyy hh:mm tt
    const transformarFecha = (fecha) => {
    
        const nuevaFecha = new Date(fecha)

        const fechaFormateada = nuevaFecha.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',   // Hora en formato de dos dígitos
            minute: '2-digit', // Minutos en formato de dos dígitos
            second: '2-digit', // Segundos en formato de dos dígitos
            hour12: true
        });

        return fechaFormateada
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
                Nuevo proyecto
            </RouterLink>
        </div>

        <div class="overflow-x-auto mt-12">
            <table class="w-full">
                <thead class="uppercase text-xl font-bold border-b-2 w-full">
                    <tr>
                        <td class="px-3">Proyecto</td>
                        <td class="px-3">Creado por</td>
                        <td class="px-3">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-if="arrayProyectos" v-for="item in arrayProyectos">
                        <td class="py-2 px-3 w-3/5">{{ item.nombre }}</td>
                        <td class="py-2 px-3 w-1/5">
                            <p>
                                {{ item.usuario.nombre }}
                            </p>
                            <p class="text-gray-500 italic text-sm">
                                {{ transformarFecha(item.createdAt) }}
                            </p>
                        </td>
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

        </div>
        
        <Paginacion 
            :paginacion="paginacion"
            @siguiente="siguiente"
            @anterior="anterior"
            :control="control"
        />
    </div>

    <Footer />

</template>

