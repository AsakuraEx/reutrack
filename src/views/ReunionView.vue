<script setup>
    
    import { onMounted, ref } from 'vue';
    import { uid } from 'uid';
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import Stepper from '../../src/components/Stepper.vue'

    const codigo = ref("");

    onMounted(()=>{
        codigo.value = uid(6);
    })

</script>

<template>
    
    <Header />


    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper />

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Datos Generales de la Reunión</h1> 
        
        <h1 class="text-2xl font-black text-center py-12 px-4 text-purple-500">Codigo de Reunión: {{ codigo }}</h1>  
        
        <form class="flex flex-col gap-4 md:gap-8">

            <div class="flex flex-col md:flex-row gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left w-72 text-center">
                    Nombre de la reunión:
                </label>
                <input 
                    type="text" 
                    name="nombreReunion"
                    class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                >
            </div>

            <div class="flex flex-col md:flex-row gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left w-72 text-center">
                    Lugar de la reunión:
                </label>
                <input 
                    type="text" 
                    name="lugarReunion"
                    class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                >
            </div>

            <div class="flex justify-end px-4">

                <RouterLink 
                    :to="{name: 'encargados'}"
                    class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Iniciar Reunión
                </RouterLink>

            </div>

        </form>



    </div>

    <Footer />
</template>
