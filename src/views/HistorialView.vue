<script setup>

    import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline } from '@mdi/js';
    import { mdiFilePdfBox } from '@mdi/js';

    const path = mdiTrashCanOutline;
    const path1 = mdiFilePdfBox;

</script>

<template>

    <Header />

    <div class="container mx-auto min-h-[75vh] space-y-4 px-2">        
        <h1 class="uppercase text-2xl font-extrabold text-purple-300 text-center my-12">
            Historial de Reuniones
        </h1>
    
        <div class="flex flex-col lg:flex-row gap-2">
            <div class="flex flex-col lg:w-2/5">
                <label class="text-xl">Desde</label>
                <input type="date" class="bg-transparent border p-1 rounded w-full">
            </div>

            <div class="flex flex-col lg:w-2/5">
                <label class="text-xl">Hasta</label>
                <input type="date" class="bg-transparent border p-1 rounded w-full">
            </div>

            <div class="flex lg:w-1/5 justify-end gap-2 items-end">
                <button class="bg-slate-300 hover:bg-slate-500 w-1/2 h-fit font-bold text-black px-4 py-2 rounded">Filtrar</button>
                <button class="bg-white hover:bg-slate-200 w-1/2 h-fit font-bold text-black px-4 py-2 rounded">Limpiar</button>
            </div>

        </div>

        <!-- LISTADO DE CARDS-->
        <div class="flex flex-col gap-3">

            <!-- CARD DE REUNION -->
            <div class="border bg-transparent p-3 flex flex-col lg:flex-row gap-4 justify-between items-center rounded">
                <div>
                    <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
                    <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
                    <span class="font-light italic">08/01/2025 11:30 A.M</span>
                    <div class="bg-blue-500 w-fit px-3 py-1 rounded font-bold">
                        Reunión Finalizada
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-full lg:w-fit">
                    <RouterLink :to="{name:'detalle'}" class="border rounded bg-transparent hover:bg-sky-400 hover:border-sky-400 px-3 py-1 transition-colors duration-300 text-center">
                        Ver Detalle de Reunión
                    </RouterLink>
                    <button class="bg-transparent hover:border-purple-500 hover:bg-purple-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300">
                        <svg-icon type="mdi" :path="path1"></svg-icon>
                        Generar PDF
                    </button>
                </div>
            </div>
            
            <!-- CARD DE REUNION -->
            <div class="border bg-transparent p-3 flex flex-col lg:flex-row gap-4 justify-between items-center rounded">
                <div>
                    <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
                    <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
                    <span class="font-light italic">08/01/2025 11:30 A.M</span>
                    <div class="bg-yellow-500 w-fit px-3 py-1 rounded font-bold">
                        Reunión Iniciada
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-full lg:w-fit">
                    <button class="bg-transparent hover:border-red-500 hover:bg-red-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300">
                        <svg-icon type="mdi" :path="path"></svg-icon>
                        Eliminar Reunión
                    </button>
                </div>
            </div>

            <!-- CARD DE REUNION -->
            <div class="border bg-transparent p-3 flex flex-col lg:flex-row gap-4 justify-between items-center rounded">
                <div>
                    <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
                    <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
                    <span class="font-light italic">08/01/2025 11:30 A.M</span>
                    <div class="bg-blue-500 w-fit px-3 py-1 rounded font-bold">
                        Reunión Finalizada
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-full lg:w-fit">
                    <RouterLink :to="{name:'detalle'}" class="border rounded bg-transparent hover:bg-sky-400 hover:border-sky-400 px-3 py-1 transition-colors duration-300 text-center">
                        Ver Detalle de Reunión
                    </RouterLink>
                    <button class="bg-transparent hover:border-purple-500 hover:bg-purple-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300">
                        <svg-icon type="mdi" :path="path1"></svg-icon>
                        Generar PDF
                    </button>
                </div>
            </div>
            
            <!-- CARD DE REUNION -->
            <div class="border bg-transparent p-3 flex flex-col lg:flex-row gap-4 justify-between items-center rounded">
                <div>
                    <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
                    <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
                    <span class="font-light italic">08/01/2025 11:30 A.M</span>
                    <div class="bg-yellow-500 w-fit px-3 py-1 rounded font-bold">
                        Reunión Iniciada
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-full lg:w-fit">
                    <button class="bg-transparent hover:border-red-500 hover:bg-red-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300">
                        <svg-icon type="mdi" :path="path"></svg-icon>
                        Eliminar Reunión
                    </button>
                </div>
            </div>
    
        </div>

    </div>

    <Footer />
</template>

