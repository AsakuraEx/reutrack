<script setup>

    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue';
    import DatePicker from '@/components/DatePicker.vue';
    import CardHistorial from '@/components/CardHistorial.vue';

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

            <DatePicker 
                :label="'Desde'" 
            />
            

            <DatePicker 
                :label="'Hasta'" 
            />

            <div class="flex lg:w-1/5 justify-end gap-2 items-end">
                <button class="bg-slate-300 hover:bg-slate-500 w-1/2 h-fit font-bold text-black px-4 py-2 rounded">Filtrar</button>
                <button class="bg-white hover:bg-slate-200 w-1/2 h-fit font-bold text-black px-4 py-2 rounded">Limpiar</button>
            </div>

        </div>

        <!-- LISTADO DE CARDS-->
        <div class="flex flex-col gap-3">

            <CardHistorial 
                :titulo="'Reunión para toma de requerimiento en ISBM'"
                :lugar="'Oficinas centrales de ISBM'"
                :fecha="'08-01-2025 11:30 A.M'"
                :estado="'iniciado'"
            />

            <CardHistorial 
                :titulo="'Reunión de Tamizaje Metabolico SIS'"
                :lugar="'Megacentro de Vacunación'"
                :fecha="'08-01-2025 11:30 A.M'"
                :estado="'finalizado'"
            />

            <CardHistorial 
                :titulo="'Reunión para coordinar implementación nacional de RRI'"
                :lugar="'MINSAL - Despacho de Ministro'"
                :fecha="'08-01-2025 11:30 A.M'"
                :estado="'cancelado'"
            />
    
        </div>

    </div>

    <Footer />
</template>

