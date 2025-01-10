<script setup>

    //imports necesarios del sistema
    import { onMounted, ref } from 'vue';
    import { uid } from 'uid';
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import Stepper from '../../src/components/Stepper.vue'
    import Textfield from '@/components/Textfield.vue';
    import Select from '@/components/Select.vue';
import { useProyectoStore } from '@/stores/proyectos';

    //definición de variables
    const store = useProyectoStore()
    const codigo = ref("");
    const arrayProyectos = ref([]);

    //instrucciones que se cargan al mostrar la vista
    onMounted(async ()=>{
        //Se genera el codigo aleatorio con la libreria uid
        codigo.value = uid(6);
        //Se solicita la lista de proyectos "Pendiente" (no cancelados ni finalizados)
        arrayProyectos.value = await store.mostrarProyectos('Pendiente');
    })


</script>

<template>
    
    <Header />


    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="1"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Datos Generales de la Reunión</h1> 
        
        <h1 class="text-2xl font-black text-center py-12 px-4 text-purple-500">Codigo de Reunión: {{ codigo }}</h1>  
        
        <form class="flex flex-col gap-4 md:gap-8">

            <Select :label="'Proyecto asociado: *'" :opciones="arrayProyectos" />

            <Textfield :label="'Nombre de la reunión: *'" />

            <Textfield :label="'Lugar de la reunión: *'" />

            <div class="flex justify-end px-4">

                <RouterLink 
                    :to="{name: 'encargados'}"
                    class="animate-pulse hover:animate-none bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Iniciar Reunión
                </RouterLink>

            </div>

        </form>



    </div>

    <Footer />
</template>
