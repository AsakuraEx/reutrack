<script setup>
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import Stepper from '../../src/components/Stepper.vue'
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline } from '@mdi/js';

    const path = mdiTrashCanOutline;
</script>

<template>
    
        
    <Header />
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper />

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Encargados de la reunión</h1>     
    
        <div class="flex gap-4 flex-col">

            <div class="flex flex-col md:flex-row gap-4">
                <select class="bg-transparent text-white border rounded p-4 w-full">
                    <option class="text-gray-900" value="">Seleccione un encargado...</option>
                    <option class="text-gray-900" value="">Francisco Josue Escobar Quintanilla</option>
                    <option class="text-gray-900" value="">Ivan Alessandro Mendoza Landaverde</option>
                </select>

                <button class="bg-purple-500 hover:bg-purple-400 transition-colors duration-300 py-2 rounded w-full lg:w-32">
                    Agregar
                </button>

            </div>

            <table>
                <thead>
                    <tr class="font-bold text-lg border-b-2">
                        <td class="py-2">Nombre</td>
                        <td class="py-2">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b">
                        <td class="py-2">Francisco Josue Escobar Quintanilla</td>
                        <td class="py-2">
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </td>
                    </tr>

                    <tr class="border-b">
                        <td class="py-2">Ivan Alessandro Mendoza Landaverde</td>
                        <td class="py-2">
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-between px-4">

                <RouterLink 
                    :to="{name: 'reunion'}"
                    class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Anterior
                </RouterLink>

                <RouterLink 
                    :to="{name: 'asistencia'}"
                    class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Siguiente
                </RouterLink>

                
            </div>

        </div>

    </div>

    <Footer />

</template>

