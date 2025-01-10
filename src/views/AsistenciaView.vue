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

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Lista de Asistencia</h1>  
        
        <form class="flex flex-col gap-8 md:gap-0">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div class="flex flex-col w-full px-2 py-2 gap-4 items-center">
                    <label class="text-xl px-4 text-center">
                        Participante:
                    </label>
                    <input 
                        type="text" 
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
    
                <div class="flex flex-col w-full px-2 py-2 gap-4 items-center">
                    <label class="text-xl px-4 md:text-left text-center">
                        Institución o Dependencia:
                    </label>
                    <input 
                        type="text" 
                        name="lugarReunion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
    
                <div class="flex flex-col w-full px-2 py-2 gap-4 items-center">
                    <label class="text-xl px-4 md:text-left text-center">
                        Cargo:
                    </label>
                    <input 
                        type="text" 
                        name="lugarReunion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
    
                <div class="flex flex-col w-full px-2 py-2 gap-4 items-center">
                    <label class="text-xl px-4 md:text-left text-center">
                        DUI:
                    </label>
                    <input 
                        type="text" 
                        name="lugarReunion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
                
                <div class="flex flex-col w-full px-2 py-2 gap-4 items-center">
                    <label class="text-xl px-4 md:text-left text-center">
                        Teléfono:
                    </label>
                    <input 
                        type="text" 
                        name="lugarReunion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
                    
                <div class="flex flex-col w-full px-2 py-2 gap-4 items-center">
                    <label class="text-xl px-4 md:text-left text-center">
                        Correo Electronico:
                    </label>
                    <input 
                        type="text" 
                        name="lugarReunion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
            </div>

            <div class="px-4 mt-8 mx-auto">
                <button class="bg-purple-500 hover:bg-purple-400 transition-colors duration-300 py-2 rounded w-32">
                    Agregar
                </button>
            </div>

        </form>

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
                    <tr class="border-b">
                        <td class="py-2">Francisco Josue Escobar Quintanilla</td>
                        <td class="py-2">05482299-1</td>
                        <td class="py-2">Técnico Informático</td>
                        <td class="py-2">Ministerio de Salud</td>
                        <td class="py-2">7008-6814</td>
                        <td class="py-2">francisco.escobar@salud.gob.sv</td>
                        <td class="py-2">
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </td>
                    </tr>
    
                    <tr class="border-b">
                        <td class="py-2">Ivan Alessandro Mendoza Landaverde</td>
                        <td class="py-2">05482299-1</td>
                        <td class="py-2">Técnico Informático</td>
                        <td class="py-2">Ministerio de Salud</td>
                        <td class="py-2">7008-6814</td>
                        <td class="py-2">ivan.mendoza@salud.gob.sv</td>
                        <td class="py-2">
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex justify-between px-4 mt-12">

            <RouterLink 
                :to="{name: 'encargados'}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Anterior
            </RouterLink>

            <RouterLink 
                :to="{name: 'minuta'}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Siguiente
            </RouterLink>

            
        </div>

    </div>

    <Footer />
</template>

