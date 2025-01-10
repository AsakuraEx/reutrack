<template>
    <div class="border p-2 flex flex-col w-full md:w-1/3 gap-4">
        <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
        <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
        <span class="font-light italic">08/01/2025 11:30 A.M</span>

        <RouterLink :to="{name:'detalle'}" class="border rounded bg-transparent hover:bg-slate-400 px-3 py-1 transition-colors duration-300 text-center">Ver Detalle de Reunión</RouterLink>
    </div>
</template>

<script setup>

</script>