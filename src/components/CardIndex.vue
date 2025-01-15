<template>
    <div class="border p-2 flex flex-col w-full md:w-1/3 gap-4">
        <p class="text-xl font-bold">{{ reunion.nombre }}</p>
        <p class="font-light text-slate-300">Lugar de Reunion: <b>{{ reunion.lugar }}</b></p>
        <span class="font-light italic">{{ reunion.fecha }}</span>

        <RouterLink :to="{name:'detalle', params: {id: reunion.id}}" class="border rounded bg-transparent hover:bg-slate-400 px-3 py-1 transition-colors duration-300 text-center">Ver Detalle de Reunión</RouterLink>
    </div>
</template>

<script setup>

    defineProps({
        reunion: {
            type:Object,
            required:true
        }
    })

</script>