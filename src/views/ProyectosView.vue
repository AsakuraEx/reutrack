<script setup>

    import { RouterLink } from 'vue-router';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

</script>

<template>

    <Header />

    <div class="container mx-auto px-4 min-h-[75vh]">

        <div class="flex justify-center flex-col lg:flex-row lg:justify-between items-center border mt-16 p-4 rounded-md">
            <h1 class="text-purple-300 font-extrabold text-2xl uppercase">Proyectos</h1>
            <RouterLink :to="{name: 'nuevoproyecto'}" class="border px-3 py-1 bg-purple-400 border-purple-400 hover:bg-purple-300 font-bold rounded">Nuevo Proyecto</RouterLink>
        </div>

        <div class="overflow-x-auto mt-12">
            <table class="w-full">
                <thead class="uppercase text-xl font-bold border-b-2 w-full">
                    <tr>
                        <td class="px-3">Proyecto</td>
                        <td class="px-3">Version</td>
                        <td class="px-3">Creado por</td>
                        <td class="px-3">Estado</td>
                        <td class="px-3">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b">
                        <td class="py-2 px-3">Tamizaje Metabolico - SIS </td>
                        <td class="py-2 px-3">Sprint 2</td>
                        <td class="py-2 px-3">Francisco Josue Escobar Quintanilla</td>
                        <td class="py-2 px-3">
                            <div class="bg-yellow-100 text-yellow-600 font-bold text-center w-24 rounded">
                                En curso
                            </div>
                        </td>
                        <td class="py-2 w-48">
                            <button class="border px-3 py-1 rounded hover:bg-blue-500 hover:border-blue-500 transition-colors duration-300">Finalizar</button>
                            <button class="border px-3 py-1 rounded hover:bg-red-500 hover:border-red-500 transition-colors duration-300">Cancelar</button>
                        </td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2 px-3">SISMED</td>
                        <td class=" py-2 px-3">Sprint 10</td>
                        <td class=" py-2 px-3">Ivan Alessandro Mendoza Landaverde</td>
                        <td class="py-2 px-3">
                            <div class="bg-blue-100 text-blue-600 font-bold text-center w-24 rounded">
                                Finalizado
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    <Footer />

</template>

