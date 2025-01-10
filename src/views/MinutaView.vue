<script setup>

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Stepper from '@/components/Stepper.vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline } from '@mdi/js';
    import { ref } from 'vue';

    const path = mdiTrashCanOutline;

    const textarea = ref("");

</script>

<template>

    <Header />
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="4"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Descripción de la reunión</h1> 

        <form class="px-4 space-y-8">

            <div class="space-y-4">
                <h2 class="text-xl font-bold">Puntos de la reunión</h2>
                <!-- FORMULARIO DE PUNTOS DE LA REUNION-->
                <div class="flex flex-col lg:flex-row gap-4">

                    <!-- CAMPO DE TEXTO Y BOTON-->
                    <div class="flex flex-col gap-2 lg:w-1/2">
                        <div class="flex flex-col gap-2">
                            <label>Punto Tratado:</label>
                            <input type="text" class="bg-transparent border rounded outline-purple-300 w-full p-2">
                        </div>
                        <button class="bg-purple-500 hover:bg-purple-400 transition-colors duration-300 py-2 rounded w-full lg:w-52">
                            Agregar
                        </button>
                    </div>

                    <!-- LISTADO DE CARDS-->
                    <div class="flex flex-col gap-3 lg:w-1/2">
                        <!-- CARD DE ANOTACION POR PUNTO TRATADO-->
                        <div class="border bg-transparent p-3 flex justify-between items-center rounded">
                            <p>
                                Primer punto tratado de la reunión "x"
                            </p>
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </div>

                        <div class="border bg-transparent p-3 flex justify-between items-center rounded">
                            <p>
                                Segundo punto tratado de la reunión "x"
                            </p>
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </div>

                        <div class="border bg-transparent p-3 flex justify-between items-center rounded">
                            <p>
                                Tercer punto tratado de la reunión "x"
                            </p>
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </div>

                    </div>

                </div>
            </div>


            <div class="space-y-4">
                <h2 class="text-xl font-bold">Descripción de la reunión</h2>
                <textarea 
                    class="border bg-transparent w-full h-80 p-2"
                    v-model="textarea"
                >
                </textarea>
            </div>

            <div class="space-y-4">
                <h2 class="text-xl font-bold">Acuerdos y Compromisos</h2>
                <!-- FORMULARIO DE ACUERDOS Y COMPROMISOS-->
                <div class="flex flex-col lg:flex-row gap-4">

                    <!-- CAMPO DE TEXTO Y BOTON-->
                    <div class="flex flex-col gap-2 lg:w-1/2">
                        <div class="flex flex-col gap-2">
                            <label>Acuerdo o Compromiso:</label>
                            <input type="text" class="bg-transparent border rounded outline-purple-300 w-full p-2">
                        </div>
                        <button class="bg-purple-500 hover:bg-purple-400 transition-colors duration-300 py-2 rounded w-full lg:w-52">
                            Agregar
                        </button>
                    </div>

                    <!-- LISTADO DE CARDS-->
                    <div class="flex flex-col gap-3 lg:w-1/2">
                        <!-- CARD DE ANOTACION POR ACUERDO O COMPROMISO-->
                        <div class="border bg-transparent p-3 flex justify-between items-center rounded">
                            <p>
                                Compromiso: El equipo se compromete a ...
                            </p>
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </div>

                        <div class="border bg-transparent p-3 flex justify-between items-center rounded">
                            <p>
                                Acuerdo: Mediante un dialogo realizado por la entidad...
                            </p>
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        </form>

        <div class="flex justify-between px-4 mt-12">

            <RouterLink 
                :to="{name: 'asistencia'}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Anterior
            </RouterLink>

            <RouterLink 
                :to="{name: 'historial'}"
                class="bg-purple-500 hover:bg-purple-400 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center animate-pulse hover:animate-none"
            >
                Finalizar Reunión
            </RouterLink>

            
        </div>

    </div>

    

    <Footer/>
</template>

